import BitBuffer from './binary/BitBuffer.js';
import BitStream from './binary/BitStream.js';

// Enum mapping for player types
const entityTypes = {
  'PLAYER': 0,
  // ... other types
};

const actionTypes = {
  'GAMETICK': 0,
  // ... other action types
};


// Define schema with type declarations
const schema = {
  id: 'UInt16',
  type: 'UInt8',
  positionX: 'Float64',
  positionY: 'Float64',
  velocityX: 'Float64',
  velocityY: 'Float64',
  rotation: 'Float64',
};

class PlayerCodec {
  constructor(bufferSize = 1024 * 2) {
    this.buffer = new BitBuffer(bufferSize);
    this.stream = new BitStream(this.buffer);
  }

  encodePlayer(originalPlayer, stream = null) {

    let localStream = stream || new BitStream(new BitBuffer(1024 * 2));
    localStream.offset = 0;

    console.log('streamstreamstream', localStream)
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

    // Calculate bitmask, excluding properties with null values
    for (let key in schema) {
      if (player[key] !== undefined && player[key] !== null) {
        bitmask |= 1 << index;
      }
      index++;
    }

    // Write bitmask first
    localStream.writeUInt8(bitmask);

    // Write player data based on bitmask, excluding null values
    index = 0;
    for (let key in schema) {
      if (bitmask & (1 << index) && player[key] !== null) {
        localStream[`write${schema[key]}`](player[key]);
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
    let bitmask = this.stream.readUInt8();

    // Read player data based on bitmask
    let index = 0;
    for (let key in schema) {
      if (bitmask & (1 << index)) {
        player[key] = this.stream[`read${schema[key]}`]();
      } else {
        // If the property was not encoded, do not include it in the final object
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
      let tempStream = new BitStream(new BitBuffer(1024 * 2));
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
    console.log('playerCount', playerCount)
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
    let localBuffer = new BitBuffer(1024 * 2);
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