// DecodingVisitor.js - Marak Squires 2023
import Visitor from './Visitor.js';
import BitStream from '../binary/BitStream.js'; // Import BitStream

let logger = function noop () {};

class DecodingVisitor extends Visitor {
  constructor(buffer) {
    super();
    this.buffer = buffer;  // Buffer containing the encoded data
    this.bitPosition = 0;
    this.stream = new BitStream(buffer); // Use BitStream

  }

  visitObject(schema) {
    // logger("Visiting Object with schema:", schema);
    let decodedObject = {};
    let localBitmask = this.readBitmask();
    logger("Decoded Bitmask:", localBitmask.toString(2));

    const sortedKeys = Object.keys(schema).sort();
    // logger("Sorted Keys:", sortedKeys);

    for (const key of sortedKeys) {
      // logger(`Visiting field: ${key}, Bit Position: ${this.bitPosition}`);
      if (this.isFieldPresent(localBitmask, this.bitPosition)) {
        logger(`Field ${key} is present, decoding.`);
        decodedObject[key] = this.visitField(schema[key]);
        logger(`Decoded field [${key}]:`, decodedObject[key]);
      } else {
        logger(`Field ${key} is not present, skipping.`);
      }

      this.bitPosition++;
    }

    logger("Decoded object:", decodedObject);
    return decodedObject;
  }

  visitField(field) {
    // logger("Visiting Field:", field);
    if (field.type === 'Record') {
      logger("Decoding nested Record");
      const nestedVisitor = new DecodingVisitor(this.stream);
      logger('nestedVisitor field.schema', field.schema)
      return nestedVisitor.visitObject(field.schema);
    } else if (field.type === 'Collection') {
      return this.decodeCollection(field.schema);
    } else {
      return this.decodeField(field.type, field);
    }
  }

  readBitmask() {
    logger("Reading bitmask");
    const bitmask = this.stream.readUInt32(); // Use BitStream to read bitmask
    logger("Read Bitmask:", bitmask.toString(2));
    return bitmask;
  }

  isFieldPresent(bitmask, position) {
    return (bitmask & (1 << position)) !== 0;
  }

  decodeCollection(schema) {
    logger("Decoding collection");
    const length = this.stream.readUInt16();
    logger(`Collection length read as: ${length}`);
    let collection = [];

    for (let i = 0; i < length; i++) {
      logger(`Decoding item ${i + 1}/${length} of the collection.`);
      // Read the bitmask for the current item
      const itemBitmask = this.stream.readUInt32();
      logger(`Item bitmask read as: ${itemBitmask.toString(2)}`);

      // Create a new DecodingVisitor for the item
      const itemVisitor = new DecodingVisitor(this.stream);
      const item = itemVisitor.visitObject(schema, itemBitmask);

      collection.push(item);
      logger(`Item ${i + 1} decoded`);
    }

    logger(`Decoded collection:`, collection);
    return collection;
  }

  decodeField(type, fieldSchema) {
    logger(`Decoding field of type: ${type}, at offset: ${this.offset}`);

    switch (type) {
      case 'Int10':
        // Inline logic to decode Int10
        break;
      case 'UInt10':
        // Inline logic to decode UInt10
        break;
      case 'UInt12':
        // Inline logic to decode UInt12
        break;
      case 'UInt16':
        const valueUInt16 = this.stream.readUInt16();
        return valueUInt16;
      case 'UTF8String':

        let length = this.stream.readUInt8();
        let utf8Bytes = [];
        for (let i = 0; i < length; i++) {
          utf8Bytes.push(this.stream.readUInt8());
        }
        return Buffer.from(utf8Bytes).toString('utf8');
      case 'Enum':
        const enumIndex = this.stream.readUInt8();
        return this.getEnumKeyByValue(fieldSchema.enum, enumIndex);
      case 'Boolean':
        const valueBoolean = this.stream.readUInt8();
        return valueBoolean === 1;
      case 'Int32':
        const valueInt32 = this.stream.readInt32();
        return valueInt32;
      case 'Float64':
        const valueFloat64 = this.stream.readFloat64();
        return valueFloat64;
      case 'ASCIIString':
        const lengthAscii = this.stream.readUInt8();
        const valueAscii = this.stream.toString('ascii', lengthAscii);
        return valueAscii;
      // ... other cases ...
      default:
        throw new Error(`Unrecognized field type: ${type}`);
    }
    logger(`Field decoded, new offset: ${this.offset}`);

  }

  getEnumKeyByValue(enumObj, value) {
    return Object.keys(enumObj).find(key => enumObj[key] === value);
  }

  // Entry function for decoding
  decode(schema) {
    logger("Starting decoding process");

    return this.visitObject(schema);
  }


}

export default DecodingVisitor;
