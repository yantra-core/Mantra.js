import BitBuffer from './binary/BitBuffer.js';
import BitStream from './binary/BitStream.js';

let player = {
  id: 123, 
  type: 'PLAYER',
  position: { x: 0, y: 100 },
  velocity: { x: 10.2, y: 9.2 }
};

// Enum mapping for player types
const playerTypes = {
  'PLAYER': 0,
  // ... other types
};

// Creating a BitBuffer
let buffer = new BitBuffer(1024);

// Creating a BitStream for writing
let stream = new BitStream(buffer);

// Encoding the player data
stream.writeUInt16(player.id);
stream.writeUInt8(playerTypes[player.type]);
stream.writeFloat32(player.position.x);
stream.writeFloat32(player.position.y);
stream.writeFloat32(player.velocity.x);
stream.writeFloat32(player.velocity.y);

console.log(stream)

// Creating a BitStream for reading
stream.offset = 0; // Resetting the offset to start from the beginning

// Decoding the player data
let decodedPlayer = {
  id: stream.readUInt16(),
  type: Object.keys(playerTypes)[stream.readUInt8()], // reverse mapping
  position: {
    x: stream.readFloat32(),
    y: stream.readFloat32()
  },
  velocity: {
    x: stream.readFloat32(),
    y: stream.readFloat32()
  }
};

console.log(decodedPlayer)


const schema = {
  id: 0,
  type: 1,
  positionX: 2,
  positionY: 3,
  velocityX: 4,
  velocityY: 5
};

const reverseSchema = Object.keys(schema).reduce((acc, key) => {
  acc[schema[key]] = key;
  return acc;
}, {});

function decodePlayer(stream, buffer) {
  let totalSize = buffer.byteLength;
  console.log('totalSize', totalSize)
  let player = {};
  while (stream.offset < totalSize) {
    let keyId = stream.readUInt8();
    let key = reverseSchema[keyId];
    switch (key) {
      case 'id':
        player.id = stream.readUInt16();
        break;
      case 'type':
        player.type = Object.keys(playerTypes)[stream.readUInt8()];
        break;
      case 'positionX':
        player.position = player.position || {};
        player.position.x = stream.readFloat32();
        break;
      case 'positionY':
        player.position = player.position || {};
        player.position.y = stream.readFloat32();
        break;
      case 'velocityX':
        player.velocity = player.velocity || {};
        player.velocity.x = stream.readFloat32();
        break;
      case 'velocityY':
        player.velocity = player.velocity || {};
        player.velocity.y = stream.readFloat32();
        break;
      // Add cases for other keys if necessary
    }
  }
  return player;
}


function encodePlayer(stream, player) {
  stream.writeUInt8(schema.id);
  stream.writeUInt16(player.id);

  stream.writeUInt8(schema.type);
  stream.writeUInt8(playerTypes[player.type]);

  stream.writeUInt8(schema.positionX);
  stream.writeFloat32(player.position.x);

  stream.writeUInt8(schema.positionY);
  stream.writeFloat32(player.position.y);

  stream.writeUInt8(schema.velocityX);
  stream.writeFloat32(player.velocity.x);

  stream.writeUInt8(schema.velocityY);
  stream.writeFloat32(player.velocity.y);
}

let playerData = {
  id: 123,
  type: 'PLAYER',
  position: { x: 0, y: 100 },
  velocity: { x: 10.2, y: 9.2 }
};

// Creating a BitBuffer
let buffer2 = new BitBuffer(1024);

// Creating a BitStream for writing
let stream2 = new BitStream(buffer2);

let encodedPlayer = encodePlayer(stream2, playerData);

console.log(encodedPlayer);
stream2.offset = 0; // Resetting the offset to start from the beginning

let decodedPlayer2 = decodePlayer(stream2, buffer2);
console.log(decodedPlayer2)