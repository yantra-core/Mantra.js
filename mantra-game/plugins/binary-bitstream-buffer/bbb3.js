import BitBuffer from './binary/BitBuffer.js';
import BitStream from './binary/BitStream.js';
let encoder = new TextEncoder();
let decoder = new TextDecoder('utf-8');


class PlayerCodec {
  constructor(schema, actionTypes) {
    this.schema = schema;
    this.actionTypes = actionTypes;
    this.buffer = new BitBuffer(bufferSize);
    this.stream = new BitStream(this.buffer);
  }

  encodeMessage(msg) {
    let localStream = new BitStream(new BitBuffer(bufferSize));
    localStream.offset = 0;

    let flattenedMsg = this.flattenObject(msg);
    flattenedMsg = this.flattenAndConvertEnums(flattenedMsg, this.schema);
    let bitmask = this.createBitmask(flattenedMsg);
    localStream.writeUInt32(bitmask);

    let flattenedSchemaKeys = this.getFlattenedKeys(this.schema);
    for (let key of flattenedSchemaKeys) {
      console.log('kkkk', key, flattenedMsg[key])
      if (this.isFieldPresent(bitmask, key) && flattenedMsg[key] !== undefined && flattenedMsg[key] !== null) {
        let fieldType = this.determineType(key);
        this.encodeField(localStream, flattenedMsg[key], fieldType, key);
      }
    }

    return this.createFinalBuffer(localStream);
  }

  decodeMessage(buffer) {
    let localStream = new BitStream(buffer);
    localStream.offset = 0;
    let bitmask = localStream.readUInt32();

    let flattenedMessage = {};
    let flattenedSchemaKeys = this.getFlattenedKeys(this.schema);

    for (let key of flattenedSchemaKeys) {
      if (this.isFieldPresent(bitmask, key)) {
        let fieldType = this.determineType(key);
        flattenedMessage[key] = this.decodeField(localStream, fieldType, key);
      } else {
        // If the field is not present, set it to null or skip it entirely
        // Uncomment the line below if you want to explicitly set missing fields to null
        // flattenedMessage[key] = null;
      }
    }

    return this.reconstructObject(flattenedMessage);
  }



  decodeCollection(stream, itemSchema) {
    let collection = [];
    let length = stream.readUInt16(); // Read the length of the collection

    for (let i = 0; i < length; i++) {
      let item = {};
      for (let key in itemSchema) {
        // Decode each field of the item based on its type
        item[key] = this.decodeField(stream, itemSchema[key].type, key);
      }
      collection.push(item);
    }

    return collection;
  }

  encodeCollection(collection, stream, itemSchema) {
    // First, write the length of the collection
    stream.writeUInt16(collection.length);

    // Then, encode each item in the collection
    collection.forEach(item => {
      for (let key in itemSchema) {
        // Encode each field of the item based on its type
        this.encodeField(stream, item[key], itemSchema[key].type, key);
      }
    });
  }


  encodeField(stream, value, type, key) {


    console.log('encoding field', key, value, type)
    switch (type) {
      case 'Int10':
        stream.writeInt10(value);
        break;
      case 'UInt10':
        stream.writeUInt10(value);
        break;
      case 'UInt12':
        stream.writeUInt12(value);
        break;
      case 'UInt16':
        stream.writeUInt16(value);
        break;
      case 'UTF8String':
        let utf8Bytes = Buffer.from(value, 'utf8');
        stream.writeUInt8(utf8Bytes.length);
        for (let byte of utf8Bytes) {
          stream.writeUInt8(byte);
        }
        break;
      case 'Enum':
        stream.writeUInt8(value);
        break;
      case 'Boolean':
        stream.writeUInt8(value ? 1 : 0);
        break;
      case 'Int32':
        stream.writeInt32(value);
        break;
      case 'Float64':
        stream.writeFloat64(value);
        break;
      case 'ASCIIString':
        let asciiBytes = Buffer.from(value, 'ascii');
        stream.writeUInt8(asciiBytes.length);
        for (let byte of asciiBytes) {
          stream.writeUInt8(byte);
        }
        break;

      // ... other cases ...
    }

  }

  decodeField(stream, type, key) {

    let value = null;
    switch (type) {
      case 'Int10':
        value = stream.readInt10();
        break;
      case 'UInt10':
        value = stream.readUInt10();
        break;
      case 'UInt12':
        value = stream.readUInt12();
        break;
      case 'UInt16':
        value = stream.readUInt16();
        break;
      case 'UTF8String':
        let length = stream.readUInt8();
        let utf8Bytes = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
          utf8Bytes[i] = stream.readUInt8();
        }
        value = decoder.decode(utf8Bytes);
        break;
      case 'Enum':
        let enumValue = stream.readUInt8();
        value = this.getKeyByValue(this.schema[key].enum, enumValue);
        break;
      case 'Boolean':
        value = stream.readUInt8() === 1;
        break;
      case 'Int32':
        value = stream.readInt32();
        break;
      case 'Float64':
        value = stream.readFloat64();
        break;
      case 'ASCIIString':
        let asciiLength = stream.readUInt8();
        let asciiBytes = new Uint8Array(asciiLength);
        for (let i = 0; i < asciiLength; i++) {
          asciiBytes[i] = stream.readUInt8();
        }
        value = decoder.decode(asciiBytes);

        // flattenedObject[key] = Buffer.from(asciiBytes).toString('ascii');
        break;
    }

    // Add cases for other types...
    console.log('got back decoded value for property', key, value)
    return value; // Default case if type is not recognized
  }

  createFinalBuffer(stream) {
    let bytesUsed = Math.ceil(stream.offset / 8);
    let finalBuffer = new BitBuffer(bytesUsed * 8);
    finalBuffer.byteArray.set(stream.bitBuffer.byteArray.subarray(0, bytesUsed));

    return finalBuffer;
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  flattenObject(object, prefix = '') {
    let flattened = {};

    for (let key in object) {
      let value = object[key];
      let prefixedKey = prefix ? `${prefix}.${key}` : key;

      if (value !== null && typeof value === 'object' && !(value instanceof Array)) {
        Object.assign(flattened, this.flattenObject(value, prefixedKey));
      } else if (value !== undefined) {
        flattened[prefixedKey] = value;
      }
    }

    // Sort flattened keys based on schema order
    const schemaOrderedKeys = this.getFlattenedKeys(this.schema);
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
    const flattenedKeys = this.getFlattenedKeys(this.schema);
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

  determineType(flattenedKey) {
    // console.log('determineType', flattenedKey)
    let parts = flattenedKey.split('.');
    let currentSchema = this.schema;
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


  createBitmask(msg) {
    let flattenedMsg = this.flattenObject(msg);
    let flattenedSchemaKeys = this.getFlattenedKeys(this.schema);
    let bitmask = 0;

    for (let i = 0; i < flattenedSchemaKeys.length; i++) {
      console.log('flattenedMsg', flattenedMsg[flattenedSchemaKeys[i]])
      if (flattenedMsg.hasOwnProperty(flattenedSchemaKeys[i]) && flattenedMsg[flattenedSchemaKeys[i]] !== undefined && flattenedMsg[flattenedSchemaKeys[i]] !== null) {
        bitmask |= (1 << i);
      }
    }

    return bitmask;
  }


  booleanArrayToBinary(boolArray) {
    return boolArray.reduce((acc, val, i) => {
      if (val) acc |= (1 << i);
      return acc;
    }, 0);
  }

  isFieldPresent(bitmask, key) {
    let index = this.getFlattenedKeys(this.schema).indexOf(key);
    return (bitmask & (1 << index)) !== 0;
  }


}


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

const _schema = {
  id: { type: 'UInt16' },
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
  width: { type: 'Int32' },
  height: { type: 'Int32' },
  rotation: { type: 'Int32' }, // TODO: special case with radians->bytes optimization
  mass: { type: 'Int32' },
  health: { type: 'Int32' },
  depth: { type: 'Float64' },
  lifetime: { type: 'Int32' },
  radius: { type: 'Float64' },
  isSensor: { type: 'Boolean' },
  isStatic: { type: 'Boolean' },
  destroyed: { type: 'Boolean' },
  owner: { type: 'UInt16' },
  maxSpeed: { type: 'Int32' }

};

let players = [
  {

    id: 1,
    name: 'Bunny',
    type: 'PLAYER',
    position: { x: 10, y: 20 },
    velocity: { x: 1, y: 1 },
    width: 100,
    height: 100,
    rotation: 0,
    mass: 100,
    health: 100,
    depth: 10,
    lifetime: 1000,
    radius: 100,
    isSensor: true,
    isStatic: true,
    destroyed: true,
    owner: 0,
    maxSpeed: 100,
  },
  {
    id: 2,
    name: 'Turtle',
    type: 'BLOCK',
    rotation: 157
  },
  {
    id: 3,
    name: 'Turtle',

    type: 'PLAYER',
    //position: { x: 50, y: 60 },
    //velocity: { x: 3, y: 35 },
    rotation: 314
  }
];

let codec = new PlayerCodec(_schema, actionTypes);

console.log('before', players[1])
let msg = players[0];

let compressed = codec.encodeMessage(msg);

console.log(compressed);

let decompressed = codec.decodeMessage(compressed);

console.log(decompressed);
