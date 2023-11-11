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
  positionX: 'Float32',
  positionY: 'Float32',
  velocityX: 'Float32',
  velocityY: 'Float32',
  rotation: 'Float32',
};

class PlayerCodec {
  constructor(bufferSize = 1024) {
    this.buffer = new BitBuffer(bufferSize);
    this.stream = new BitStream(this.buffer);
  }

  encodePlayer(player) {
    this.stream.offset = 0;
    let bitmask = 0;
    let index = 0;

    // Flatten nested properties
    // TODO: un-hardcode this so that bbb can deal with nested objects
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
    // Remark: do we need to the same with undefined? perhaps not
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

    // truncate buffer to number of bytes used ( minimal size )
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
    if (player.type !== undefined) {
      player.type = Object.keys(entityTypes)[player.type];
    }
    return player;
  }
}

export default PlayerCodec;