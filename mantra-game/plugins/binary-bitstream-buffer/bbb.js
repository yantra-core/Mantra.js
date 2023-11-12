import BitBuffer from './binary/BitBuffer.js';
import BitStream from './binary/BitStream.js';
let encoder = new TextEncoder();
let decoder = new TextDecoder('utf-8');
const actionTypes = {
  'gametick': 0,
  'assign_id': 1,
  'become_ticker': 2,
  'pong': 3
  // ... other action types
};

let bufferSize = 1024 * 512;

// TODO: we'd expect these values to be in the schema as well
// Enum mapping for player types
const entityTypes = {
  'PLAYER': 0,
  'BULLET': 1,
  'BLOCK': 2,
  'BORDER': 3,
  'BODY': 4
  // ... other types
};

const schema = {
  id: { type: 'UInt12' },
  name: { type: 'UTF8String' },
  type: { type: 'Enum', enum: entityTypes },
  position: {
    type: 'Record',
    schema: {
      x: { type: 'Int32' },
      y: { type: 'Int32' }
    }
  },
  velocity: {
    type: 'Record',
    schema: {
      x: { type: 'Int32' },
      y: { type: 'Int32' }
    }
  },
  rotation: { type: 'Int32' },
  mass: { type: 'Float64' },
  width: { type: 'Float64' },
  height: { type: 'Float64' },
  health: { type: 'Float64' },
  depth: { type: 'Float64' },
  lifetime: { type: 'Float64' },
  radius: { type: 'Float64' },
  isSensor: { type: 'Boolean' },
  isStatic: { type: 'Boolean' },
  destroyed: { type: 'Boolean' },
  owner: { type: 'ASCIIString' },
  maxSpeed: { type: 'Float64' }

};

let playerData = {
  id: 1,
  name: 'Bunny',
  type: 'BLOCK',
  position: { x: 10, y: 20 },
  velocity: { x: 1, y: 1 },
  rotation: 0,
  //mass: 100,
  width: 100,
  height: 100,
  health: 100,
  depth: 10,
  lifetime: 1000,
  radius: 100,
  isSensor: true,
  isStatic: true,
  destroyed: true,
  owner: 'test',
  maxSpeed: 100,
}


class PlayerCodec {
  constructor() {
    this.buffer = new BitBuffer(bufferSize);
    this.stream = new BitStream(this.buffer);
  }

  encodePlayer(originalPlayer, stream = null) {
    let localStream = stream || new BitStream(new BitBuffer(bufferSize));
    localStream.offset = 0;

    // Flatten nested properties and handle enums
    let player = this.flattenObject(originalPlayer);

    // Convert Enums
    player = this.flattenAndConvertEnums(player, schema);

    // Calculate bitmask, excluding properties with null values
    let bitmask = this.calculateBitmask(player, schema);

    // Write bitmask and player data
    this.writePlayerData(localStream, player, schema, bitmask);

    // Create final buffer
    return this.createFinalBuffer(localStream);
  }

  decodePlayer(buffer) {
    this.stream = new BitStream(buffer);
    this.stream.offset = 0;
    let bitmask = this.stream.readUInt32();

    let player = this.readPlayerData(this.stream, schema, bitmask);

    // Reconstruct nested structures
    return this.reconstructObject(player);
  }

  flattenObject(object, prefix = '') {
    let flattened = {};
  
    for (let key in object) {
      let prefixedKey = prefix ? `${prefix}.${key}` : key;
      if (object[key] !== null && typeof object[key] === 'object' && !(object[key] instanceof Array)) {
        Object.assign(flattened, this.flattenObject(object[key], prefixedKey));
      } else {
        flattened[prefixedKey] = object[key];
      }
    }
  
    // Sort flattened keys based on schema order
    const schemaOrderedKeys = this.getFlattenedKeys(schema);
    let sortedFlattened = {};
    schemaOrderedKeys.forEach(key => {
      if (key in flattened) {
        sortedFlattened[key] = flattened[key];
      }
    });
  
    return sortedFlattened;
  }
  
  flattenAndConvertEnums(flattenedObject, schema) {
    let converted = {};
  
    // Add missing properties from schema with null values and sort
    const flattenedKeys = this.getFlattenedKeys(schema);
    flattenedKeys.forEach(key => {
      if (!(key in flattenedObject)) {
        flattenedObject[key] = null;
      }
    });
  
    // Sort flattenedObject keys based on schema order
    let sortedFlattenedObject = {};
    flattenedKeys.forEach(key => {
      sortedFlattenedObject[key] = flattenedObject[key];
    });
  
    for (let key in sortedFlattenedObject) {
      // Process enum conversion and other values
      let schemaKey = key.split('.')[0];
      if (schema[schemaKey] && schema[schemaKey].type === 'Enum') {
        if (sortedFlattenedObject[key] !== undefined && sortedFlattenedObject[key] in schema[schemaKey].enum) {
          converted[key] = schema[schemaKey].enum[sortedFlattenedObject[key]];
        } else {
          converted[key] = sortedFlattenedObject[key];
        }
      } else {
        converted[key] = sortedFlattenedObject[key];
      }
    }
  
    return converted;
  }
  

  getFlattenedKeys(schema, prefix = '') {
    let keys = [];

    for (let key in schema) {
      let prefixedKey = prefix ? `${prefix}.${key}` : key;

      if (schema[key].type === 'Record') {
        keys = keys.concat(this.getFlattenedKeys(schema[key].schema, prefixedKey));
      } else {
        keys.push(prefixedKey);
      }
    }

    return keys;
  }


  reconstructObject(flattened) {
    let reconstructed = {};

    for (let key in flattened) {
      let parts = key.split('.');
      let last = parts.pop();
      let deep = parts.reduce((acc, val) => acc[val] = acc[val] || {}, reconstructed);
      deep[last] = flattened[key];
    }

    return reconstructed;
  }

  calculateBitmask(flattenedObject, schema) {
    let bitmask = 0;
    let index = 0;
  
    const flattenedKeys = this.getFlattenedKeys(schema);
  
    for (let key of flattenedKeys) {
      if (key in flattenedObject && flattenedObject[key] !== null) {
        bitmask |= 1 << index;
      }
      index++;
    }
    return bitmask;
  }

  writePlayerData(stream, flattenedObject, schema, bitmask) {

    stream.writeUInt32(bitmask);
    let index = 0;

    for (let key in flattenedObject) {
      // console.log("flattenedObject[key]", flattenedObject[key])
      if (bitmask & (1 << index) && key in flattenedObject) {
        // Determine the type based on the key
        // You might need a function to determine the type based on the flattened key
        let type = this.determineType(key);
        // console.log("Writing key:", key, "type:", type, "value:", flattenedObject[key]); // Inside writePlayerData

        // Handle writing data based on the determined type
        switch (type) {
          case 'UInt12':
            stream.writeUInt12(flattenedObject[key]);
            break;
          case 'UTF8String':
            let utf8Bytes = Buffer.from(flattenedObject[key], 'utf8');
            stream.writeUInt8(utf8Bytes.length);
            for (let byte of utf8Bytes) {
              stream.writeUInt8(byte);
            }
            break;
          case 'Enum':
            stream.writeUInt8(flattenedObject[key]);
            break;
          case 'Boolean':
            stream.writeUInt8(flattenedObject[key] ? 1 : 0);
            break;
          case 'Int32':
            stream.writeInt32(flattenedObject[key]);
            break;
          case 'Float64':
            stream.writeFloat64(flattenedObject[key]);
            break;
          case 'ASCIIString':
            let asciiBytes = Buffer.from(flattenedObject[key], 'ascii');
            stream.writeUInt8(asciiBytes.length);
            for (let byte of asciiBytes) {
              stream.writeUInt8(byte);
            }
            break;

          // ... other cases ...
        }
      }
      index++;
    }
  }

  readPlayerData(stream, schema, bitmask) {
    let flattenedObject = {};
    let index = 0;

    // Assuming you have a way to get all flattened keys
    let flattenedKeys = this.getFlattenedKeys(schema);
    // console.log("Flattened keys used:", flattenedKeys); // In readPlayerData

    for (let key of flattenedKeys) {
      if (bitmask & (1 << index)) {
        // Determine the type based on the key
        let type = this.determineType(key);
        // console.log("Reading key:", key, "type:", type); // Inside readPlayerData

        // Handle reading data based on the determined type
        switch (type) {
          case 'UInt12':
            flattenedObject[key] = stream.readUInt12();
            break;
          case 'UTF8String':
            let length = stream.readUInt8();
            let utf8Bytes = new Uint8Array(length);
            for (let i = 0; i < length; i++) {
              utf8Bytes[i] = stream.readUInt8();
            }
            flattenedObject[key] = decoder.decode(utf8Bytes);
            break;
          case 'Enum':
            let enumValue = stream.readUInt8();
            flattenedObject[key] = this.getKeyByValue(schema[key].enum, enumValue);
            break;
          case 'Boolean':
            flattenedObject[key] = stream.readUInt8() === 1;
            break;
          case 'Int32':
            flattenedObject[key] = stream.readInt32();
            break;
          case 'Float64':
            flattenedObject[key] = stream.readFloat64();
            break;
          case 'ASCIIString':
            let asciiLength = stream.readUInt8();
            let asciiBytes = new Uint8Array(asciiLength);
            for (let i = 0; i < asciiLength; i++) {
              asciiBytes[i] = stream.readUInt8();
            }
            flattenedObject[key] = decoder.decode(asciiBytes);

            // flattenedObject[key] = Buffer.from(asciiBytes).toString('ascii');
            break;
        }
      } else {
        // flattenedObject[key] = null;
      }
      index++;
    }

    return flattenedObject;
  }


  createFinalBuffer(stream) {
    let bytesUsed = Math.ceil(stream.offset / 8);
    let finalBuffer = new BitBuffer(bytesUsed * 8);
    finalBuffer.byteArray.set(stream.bitBuffer.byteArray.subarray(0, bytesUsed));

    return finalBuffer;
  }

  
  determineType(flattenedKey) {
    // console.log('determineType', flattenedKey)
    let parts = flattenedKey.split('.');
    let currentSchema = schema;
    for (let part of parts) {
      if (currentSchema[part]) {
        if (currentSchema[part].type === 'Record') {
          currentSchema = currentSchema[part].schema;
        } else {
          // console.log('returning type', currentSchema[part].type)
          return currentSchema[part].type;
        }
      } else {
        return null; // Or handle error
      }
    }
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
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





let playerData2 = {
  id: 1,
  type: 'BLOCK',
  name: 'Bunny',
}

playerData2 = playerData;

/*
const playerCodec2 = new PlayerCodec();

const finalBuffer2 = playerCodec2.encodePlayer(playerData2);
console.log("Buffer contents after encoding:", finalBuffer2.byteArray);
console.log(playerData2)
const decodedPlayer2 = playerCodec2.decodePlayer(finalBuffer2);
console.log('why type returning PLAYER instead of BLOCK?', decodedPlayer2)
*/



//const playerCodec = new PlayerCodec();

//const finalBuffer = playerCodec.encodePlayer(playerData);
//console.log("Buffer contents after encoding:", finalBuffer.byteArray);
//console.log(playerData)
//const decodedPlayer = playerCodec.decodePlayer(finalBuffer);
//console.log('works as expected', decodedPlayer)


export default PlayerCodec;