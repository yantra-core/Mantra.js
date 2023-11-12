import BitBuffer from './binary/BitBuffer.js';
import BitStream from './binary/BitStream.js';

// TODO: enum and schema definitions should be dynamic through contructor
// Enum mapping for player types
const entityTypes = {
  'PLAYER': 0,
  'BULLET': 1,
  'BLOCK': 2,
  'BORDER': 3,
  'BODY': 4
  // ... other types
};

const actionTypes = {
  'gametick': 0,
  'assign_id': 1,
  'become_ticker': 2,
  'pong': 3
  // ... other action types
};

let bufferSize = 1024 * 512;

// Define schema with type declarations
// TODO: flatten / truncate the float64 values into smaller ints with fixed precision
// see: Float2Int.js from AYYO Games
const schema = {
  id: 'UInt32',
  name: 'UTF8String',
  type: 'UInt8',
  positionX: 'Float64',
  positionY: 'Float64',
  velocityX: 'Float64',
  velocityY: 'Float64',
  rotation: 'Float64',
  mass: 'Float64',
  width: 'Float64',
  height: 'Float64',
  health: 'Float64',
  depth: 'Float64',
  lifetime: 'Float64',
  radius: 'Float64',
  isSensor: 'Boolean',
  isStatic: 'Boolean',
  destroyed: 'Boolean',
  owner: 'ASCIIString',
  maxSpeed: 'Float64'
};

class PlayerCodec {
  constructor() {
    this.buffer = new BitBuffer(bufferSize);
    this.stream = new BitStream(this.buffer);
  }

  encodePlayer(originalPlayer, stream = null) {

    let localStream = stream || new BitStream(new BitBuffer(bufferSize));
    localStream.offset = 0;

    let bitmask = 0;
    let index = 0;
    // Create a shallow copy of the player object
    let player = { ...originalPlayer };

    // Flatten nested properties
    if (player.position) {
      player.positionX = player.position.x;
      player.positionY = player.position.y;
      delete player.position;
    }
    if (player.velocity) {
      player.velocityX = player.velocity.x;
      player.velocityY = player.velocity.y;
      delete player.velocity;
    }

    // Convert the 'type' field from string to its numeric value
    if (typeof player.type !== undefined && entityTypes[player.type] !== undefined) {
      player.type = entityTypes[player.type];
    } else {
      // console.error("Invalid entity type:", player.type);
      // Handle the error or set a default value
    }

    // Calculate bitmask, excluding properties with null values
    for (let key in schema) {
      if (player[key] !== undefined && player[key] !== null) {
        bitmask |= 1 << index;
      }
      index++;
    }


    // Write bitmask first
    localStream.writeUInt32(bitmask);

    // Write player data based on bitmask, excluding null values
    index = 0;

    // Inside encodePlayer method
    for (let key in schema) {
      if (bitmask & (1 << index) && player[key] !== null) {
        if (schema[key] === 'Boolean') {
          localStream.writeUInt8(player[key] ? 1 : 0);  // Convert Boolean to 0 or 1
        }
        else if (schema[key] === 'ASCIIString' || schema[key] === 'UTF8String') {
          // Convert string to bytes
          let stringBytes = Buffer.from(player[key], 'utf8'); // Use 'utf8' for UTF8String
          // console.log('writing stringBytes', player[key], stringBytes.length)
          // Write the length of the string
          localStream.writeUInt8(stringBytes.length);
          // Write each byte of the string
          for (let i = 0; i < stringBytes.length; i++) {
            localStream.writeUInt8(stringBytes[i]);
          }
        } else {
          localStream[`write${schema[key]}`](player[key]);
        }
      }
      index++;
    }

    let bytesUsed = Math.ceil(localStream.offset / 8);
    let finalBuffer = new BitBuffer(bytesUsed * 8);
    finalBuffer.byteArray.set(localStream.bitBuffer.byteArray.subarray(0, bytesUsed));

    return finalBuffer;
  }

  decodePlayer(buffer) {
    this.stream = new BitStream(buffer);
    this.stream.offset = 0;
    let player = {};
    let bitmask = this.stream.readUInt32();

    // Read player data based on bitmask
    let index = 0;

    // Inside decodePlayer method
    for (let key in schema) {
      if (bitmask & (1 << index)) {
        if (schema[key] === 'Boolean') {
          player[key] = this.stream.readUInt8() === 1;
        }
        else if (schema[key] === 'ASCIIString' || schema[key] === 'UTF8String') {
          let length = this.stream.readUInt8();
          let stringBytes = new Uint8Array(length);
          for (let i = 0; i < length; i++) {
            stringBytes[i] = this.stream.readUInt8();
          }
          // Convert byte array back to string using TextDecoder
          const decoder = new TextDecoder('utf-8');
          player[key] = decoder.decode(stringBytes);
        } else {
          player[key] = this.stream[`read${schema[key]}`]();
        }
      } else {
        delete player[key];
      }
      index++;
    }

    // Reconstruct nested structures
    // TODO: remove hard-coded reference to position and velocity
    if (player.positionX !== undefined && player.positionY !== undefined) {
      player.position = { x: player.positionX, y: player.positionY };
      delete player.positionX;
      delete player.positionY;
    }
    if (player.velocityX !== undefined && player.velocityY !== undefined) {
      player.velocity = { x: player.velocityX, y: player.velocityY };
      delete player.velocityX;
      delete player.velocityY;
    }
    // TODO: make this work for multiple enum properties, not just type
    if (player.type !== undefined) {
      player.type = Object.keys(entityTypes)[player.type];
    }
    return player;
  }

  encodePlayers(players) {
    let totalSize = 0;
    let encodedPlayersData = [];

    players.forEach(player => {
      let tempStream = new BitStream(new BitBuffer(1024 * 4));
      let encodedPlayer = this.encodePlayer(player, tempStream);
      encodedPlayersData.push(encodedPlayer);
      totalSize += encodedPlayer.byteLength + 2; // +2 for player size
    });

    let combinedBuffer = new BitBuffer(totalSize * 8 + 16); // +16 for player count
    let combinedStream = new BitStream(combinedBuffer);

    combinedStream.writeUInt16(players.length); // Write player count

    encodedPlayersData.forEach(encodedPlayer => {
      combinedStream.writeUInt16(encodedPlayer.byteLength); // Write player size
      for (let i = 0; i < encodedPlayer.byteLength; i++) {
        combinedStream.writeUInt8(encodedPlayer.byteArray[i]);
      }
    });

    return combinedBuffer;
  }


  decodePlayers(buffer) {
    let stream = new BitStream(buffer);
    let players = [];
    let playerCount = stream.readUInt16();
    for (let i = 0; i < playerCount; i++) {
      let playerSize = stream.readUInt16();
      let playerBuffer = new BitBuffer(playerSize * 8);
      let playerStream = new BitStream(playerBuffer);

      // Copy the relevant bytes for this player
      for (let j = 0; j < playerSize; j++) {
        playerStream.writeUInt8(stream.readUInt8());
      }

      players.push(this.decodePlayer(playerBuffer));
    }

    return players;
  }

  encodeMessage(msg) {
    let localBuffer = new BitBuffer(bufferSize);
    let localStream = new BitStream(localBuffer);

    // Encoding 'action' as an enum
    localStream.writeUInt8(actionTypes[msg.action]);
    localStream.writeUInt32(msg.lastProcessedInput);
    localStream.writeUInt32(msg.snapshot.id);

    // Encoding player array
    const encodedPlayers = this.encodePlayers(msg.snapshot.state);
    const playerSize = encodedPlayers.byteLength;

    // Write the size of the encoded players buffer
    localStream.writeUInt32(playerSize);

    // Manually write each byte of the encoded players buffer
    for (let i = 0; i < playerSize; i++) {
      localStream.writeUInt8(encodedPlayers.byteArray[i]);
    }

    // Calculate final buffer size and create final buffer
    let bytesUsed = Math.ceil(localStream.offset / 8);
    let finalBuffer = new BitBuffer(bytesUsed * 8);
    finalBuffer.byteArray.set(localBuffer.byteArray.subarray(0, bytesUsed));

    return finalBuffer;
  }


  decodeMessage(buffer) {
    let localStream = new BitStream(buffer);
    localStream.offset = 0;

    let message = {};

    // Decoding non-player fields
    message.action = Object.keys(actionTypes)[localStream.readUInt8()];
    message.lastProcessedInput = localStream.readUInt32();
    message.snapshot = { id: localStream.readUInt32() };

    // Read the total size of the encoded player array
    const totalPlayersSize = localStream.readUInt32();

    // Decode the player array
    let playerBuffer = new BitBuffer(totalPlayersSize * 8);
    for (let i = 0; i < totalPlayersSize; i++) {
      playerBuffer.byteArray[i] = localStream.readUInt8();
    }

    message.snapshot.state = this.decodePlayers(playerBuffer);

    return message;
  }

}

export default PlayerCodec;