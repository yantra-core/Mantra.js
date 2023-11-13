import BitBuffer from './binary/BitBuffer.js';
import BitStream from './binary/BitStream.js';
let bufferSize = 1024 * 512;

class CodecForge {
  constructor(schema) {
    this.schema = schema;
    this.fieldTypes = this.createFieldTypesMap(schema);

  }

  createFieldTypesMap(schema, prefix = '') {
    let map = {};
    for (let key in schema) {
      const prefixedKey = prefix ? `${prefix}.${key}` : key;
      if (schema[key].type === 'Record' || schema[key].type === 'Collection') {
        Object.assign(map, this.createFieldTypesMap(schema[key].schema, prefixedKey));
      } else {
        map[prefixedKey] = schema[key].type;
      }
    }
    return map;
  }

  initializeEncode() {
    let localStream = new BitStream(new BitBuffer(bufferSize));
    localStream.offset = 0;
    return localStream;
  }

  encodeMessage(msg) {
    let localStream = this.initializeEncode();
    let bitmask = this.createBitmask(msg);
    localStream.writeUInt32(bitmask);
    this.encodeObject(localStream, msg, this.schema);
    return this.createFinalBuffer(localStream);
  }

  encodeObject(stream, object, schema, index = null) {
    for (let key in schema) {
      if (object.hasOwnProperty(key)) {
        let fieldType = schema[key].type;

        if (fieldType === 'Collection') {
          this.encodeCollection(stream, object[key], schema[key].schema);
        } else if (fieldType === 'Record') {
          this.encodeObject(stream, object[key], schema[key].schema, index);
        } else {
          this.encodeField(stream, object[key], fieldType, key, schema[key]);
        }
      }
    }
  }

  encodeField(stream, value, type, key, itemSchema) {


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
      // In encodeField, when handling an Enum
      case 'Enum':
        //const enumSchema = (index !== null) ? itemSchema : schema;
        //const enumValue = this.getEnumValue(value, enumSchema);
        //console.log("WRITING ENUM value", key, enumValue);
        console.log('itemSchema', itemSchema, key, value)
        let enumValue = itemSchema.enum[value];
        console.log("WRITING", enumValue)
        stream.writeUInt8(enumValue);
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


  getEnumValue(value, enumSchema) {
    if (value in enumSchema.enum) {
      return enumSchema.enum[value];
    } else {
      console.error(`Enum value '${value}' not found`);
      return null;
    }
  }

  encodeCollection(stream, collection, itemSchema) {
    // First, write the length of the collection
    stream.writeUInt16(collection.length);

    // Iterate over each item in the collection
    collection.forEach((item, index) => {
      // Encode each field in the item according to the item schema
      this.encodeObject(stream, item, itemSchema, index);
    });
  }


  // Initialize the decoding process with a BitStream
  initializeDecode(buffer) {
    return new BitStream(buffer);
  }
  decodeMessage(buffer) {
    let stream = this.initializeDecode(buffer);
    let bitmask = stream.readUInt32();
    return this.decodeObject(stream, this.schema, bitmask);
  }

  decodeObject(stream, schema, bitmask, index = 0) {
    let result = {};
    console.log(`Decoding object with schema: ${JSON.stringify(schema)}`);
    for (let key in schema) {
      console.log(`Checking field: ${key}, Index: ${index}`);
      if (this.isFieldPresent(bitmask, index) || bitmask === null) { // Adjusted for collections without a separate bitmask
        console.log(`Field present: ${key}`);
        let fieldType = schema[key].type;
        if (fieldType === 'Record') {
          result[key] = this.decodeObject(stream, schema[key].schema, bitmask);
        } else if (fieldType === 'Collection') {
          result[key] = this.decodeCollection(stream, schema[key].schema);
        } else {
          result[key] = this.decodeField(stream, schema[key]);
        }
      } else {
        console.log(`Field not present: ${key}`);
      }
      index++;
    }
    console.log(`Decoded object: ${JSON.stringify(result)}`);
    return result;
  }

  decodeCollection(stream, itemSchema) {
    let length = stream.readUInt16();
    let items = [];
    for (let i = 0; i < length; i++) {
      // Decode each item according to the item schema without reading a new bitmask
      items.push(this.decodeObject(stream, itemSchema, null));
    }
    return items;
  }


  decodeField(stream, fieldSchema, key) {
    let type = fieldSchema.type;
    switch (type) {
      case 'Int10':
        return stream.readInt10();
      case 'UInt10':
        return stream.readUInt10();
      case 'UInt12':
        return stream.readUInt12();
      case 'UInt16':
        return stream.readUInt16();
      case 'UTF8String':
        let length = stream.readUInt8();
        let utf8Bytes = [];
        for (let i = 0; i < length; i++) {
          utf8Bytes.push(stream.readUInt8());
        }
        return Buffer.from(utf8Bytes).toString('utf8');
      case 'Enum':
        let enumIndex = stream.readUInt8();
        return this.getEnumKeyByValue(fieldSchema.enum, enumIndex);
      case 'Boolean':
        return stream.readUInt8() === 1;
      case 'Int32':
        return stream.readInt32();
      case 'Float64':
        return stream.readFloat64();
      case 'ASCIIString':
        let asciiLength = stream.readUInt8();
        let asciiBytes = [];
        for (let i = 0; i < asciiLength; i++) {
          asciiBytes.push(stream.readUInt8());
        }
        return Buffer.from(asciiBytes).toString('ascii');
      // ... other cases ...
      default:
        console.error(`Unrecognized field type: ${type}`);
        return null;
    }
  }

  getEnumKeyByValue(enumObj, value) {
    return Object.keys(enumObj).find(key => enumObj[key] === value);
  }



  isFieldPresent(bitmask, index) {
    return (bitmask & (1 << index)) !== 0;
  }
  decodeRecord(stream, recordSchema) {
    // Decode a record (nested object)
  }
  createFinalBuffer(stream) {
    let bytesUsed = Math.ceil(stream.offset / 8);
    let finalBuffer = new BitBuffer(bytesUsed * 8);
    finalBuffer.byteArray.set(stream.bitBuffer.byteArray.subarray(0, bytesUsed));
    return finalBuffer;
  }

  encodeFields(localStream, flattenedMsg, bitmask) {
    console.log('aencodeFields', flattenedMsg, this.schema)
    let flattenedSchemaKeys = this.getFlattenedKeys(this.schema);
    console.log('flattenedSchemaKeys', flattenedSchemaKeys)
    for (let key of flattenedSchemaKeys) {
      if (this.isFieldPresent(bitmask, key)) {
        this.encodeFieldBasedOnType(localStream, flattenedMsg, key);
      }
    }
  }


  flattenObject(object, prefix = '') {
    let flattened = {};

    for (let key in object) {
      let value = object[key];
      let prefixedKey = prefix ? `${prefix}.${key}` : key;

      if (value !== null && typeof value === 'object') {
        if (Array.isArray(value)) {
          // Handle array elements
          value.forEach((item, index) => {
            Object.assign(flattened, this.flattenObject(item, prefixedKey + `[${index}]`));
          });
        } else {
          // Flatten nested objects
          Object.assign(flattened, this.flattenObject(value, prefixedKey));
        }
      } else if (value !== undefined) {
        flattened[prefixedKey] = value;
      }
    }

    return flattened;
  }


  reconstructObject(flattened) {
    let reconstructed = {};

    for (let key in flattened) {
      if (!flattened.hasOwnProperty(key)) continue;

      let parts = key.split('.');
      let currentValue = reconstructed;

      for (let i = 0; i < parts.length - 1; i++) {
        // Create nested objects based on the key parts
        currentValue[parts[i]] = currentValue[parts[i]] || {};
        currentValue = currentValue[parts[i]];
      }

      // Assign the value to the deepest key
      currentValue[parts[parts.length - 1]] = flattened[key];
    }

    return reconstructed;
  }


  encodeFieldBasedOnType(localStream, flattenedMsg, key) {
    const fieldType = this.fieldTypes[key];
    console.log('fieldTypefieldTypefieldType', key, fieldType)
    console.log('flattenedMsgflattenedMsg', flattenedMsg, key)
    console.log('og', this.originalMsg);

    if (fieldType) {
      this.encodeField(localStream, flattenedMsg[key], fieldType, key);
    } else {
      console.error(`Field type not found for key: ${key}`);
    }
  }
  createBitmask(msg) {
    let bitmask = 0;
    this.checkPresenceAndSetBitmask(this.schema, msg, 0, (bitIndex) => {
      bitmask |= (1 << bitIndex);
    });
    return bitmask;
  }

  checkPresenceAndSetBitmask(schema, object, index, setBit) {
    for (let key in schema) {
      if (schema[key].type === 'Record') {
        // Recursive call for nested objects
        if (object && object.hasOwnProperty(key)) {
          this.checkPresenceAndSetBitmask(schema[key].schema, object[key], index, setBit);
        }
      } else if (schema[key].type === 'Collection') {
        // Handle collection type
        if (object && Array.isArray(object[key]) && object[key].length > 0) {
          object[key].forEach((item) => {
            this.checkPresenceAndSetBitmask(schema[key].schema, item, index, setBit);
          });
        }
      } else {
        // Set bit if the field is present
        if (object && object.hasOwnProperty(key)) {
          setBit(index);
        }
        index++;
      }
    }
  }


  // Additional helper methods (e.g., for handling Enums)...
}

export default CodecForge;