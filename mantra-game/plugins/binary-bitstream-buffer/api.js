import BitBuffer from './binary/BitBuffer.js';
import BitStream from './binary/BitStream.js';

// Enum mapping for player types
const entityTypes = {
  'PLAYER': 0,
  // ... other types
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
  constructor(bufferSize = 1024) {
    this.buffer = new BitBuffer(bufferSize);
    this.stream = new BitStream(this.buffer);
  }

  encodePlayer(originalPlayer) {
    this.stream.offset = 0;
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
    this.stream.writeUInt8(bitmask);

    // Write player data based on bitmask, excluding null values
    index = 0;
    for (let key in schema) {
        if (bitmask & (1 << index) && player[key] !== null) {
            this.stream[`write${schema[key]}`](player[key]);
        }
        index++;
    }

    // truncate buffer to number of bytes used (minimal size)
    let bytesUsed = Math.ceil(this.stream.offset / 8);
    let finalBuffer = new BitBuffer(bytesUsed * 8);
    finalBuffer.byteArray.set(this.buffer.byteArray.subarray(0, bytesUsed));

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
    let totalSize = players.reduce((sum, player) => sum + this.encodePlayer(player).byteLength + 2, 2); // +2 for size, +2 for player count
    let combinedBuffer = new BitBuffer(totalSize * 8);
    let combinedStream = new BitStream(combinedBuffer);

    // Write the number of players first
    combinedStream.writeUInt16(players.length);

    players.forEach(player => {
      let encodedPlayer = this.encodePlayer(player);
      let playerSize = encodedPlayer.byteLength;

      // Write the size of the encoded player
      combinedStream.writeUInt16(playerSize);

      // Manually append each byte of the encoded player
      for (let i = 0; i < playerSize; i++) {
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

}

export default PlayerCodec;