import Visitor from './Visitor.js';
import BitStream from '../binary/BitStream.js';
import BitBuffer from '../binary/BitBuffer.js';
let bufferSize = 1024 * 512;

let logger = console.log;
logger = function noop () {};
class EncodingVisitor extends Visitor {
  constructor() {
    super();
    this.stream = new BitStream(new BitBuffer(bufferSize));
    this.stream.offset = 0;
    this.bitmask = 0;
    this.bitPosition = 0;
  }

  visitObject(object, schema) {
    // logger(`[visitObject] Start: object =`, object, "schema =", schema);

    // First pass: Calculate bitmask
    let localBitmask = this.calculateBitmask(object, schema);
    logger(`[visitObject] Calculated bitmask: ${localBitmask.toString(2)}`);

    // Write bitmask to stream
    this.writeBitmaskToLocalStream(localBitmask);

    // Second pass: Encode fields
    this.encodeFields(object, schema);

    // logger(`[visitObject] End: object =`, object, "schema =", schema);
    return localBitmask;
  }

  calculateBitmask(object, schema) {
    // logger(`[calculateBitmask] Start: object =`, object, "schema =", schema);
    let localBitmask = 0;
    const sortedKeys = Object.keys(schema).sort();
    let bitPosition = 0;

    for (const key of sortedKeys) {
      const field = schema[key];
      const fieldValue = object[key];
      // console.log('ffff', field, key, object)
      if (fieldValue !== undefined) {
        logger(`[calculateBitmask] Key: ${key}, Bit Position: ${bitPosition}, Field Value:`, fieldValue, `Updated Bitmask: ${localBitmask.toString(2)} offset ${this.stream.offset}`);
        localBitmask |= (1 << bitPosition);
      } else {
        logger(`[calculateBitmask] Skipping Key: ${key}, Bit Position: ${bitPosition}, Field Value:`, fieldValue, `Updated Bitmask: ${localBitmask.toString(2)}`);
      }

      bitPosition++;
    }

    logger(`[calculateBitmask] End: Calculated bitmask: ${localBitmask.toString(2)}`);
    return localBitmask;
  }

  encodeFields(object, schema) {
    // logger(`[encodeFields] Start: object =`, object, "schema =", schema);
    const sortedKeys = Object.keys(schema).sort();
    this.bitPosition = 0;

    for (const key of sortedKeys) {
      const field = schema[key];
      const fieldValue = object[key];

      if (fieldValue !== undefined) {
        logger(`[encodeFields] Field: ${key}, Bit Position: ${this.bitPosition}, Field Value:`, fieldValue);
        this.visitField(field, fieldValue);
      } else {
        logger(`[encodeFields] Skipping Field: ${key}, Bit Position: ${this.bitPosition}`);
      }

      this.bitPosition++;
    }
    logger(`[encodeFields] End`);
  }

  visitField(field, fieldValue) {
    let fieldBitmask = 0;

    if (field.type === 'Record') {
      if (fieldValue !== undefined) {
        fieldBitmask = 1;
        this.encodeNestedStructure(fieldValue, field.schema);
      }
    } else if (field.type === 'Collection') {
      if (Array.isArray(fieldValue) && fieldValue.length > 0) {
        fieldBitmask = 1;
        this.encodeCollection(fieldValue, field.schema);
      }
    } else {
      fieldBitmask = fieldValue !== undefined ? 1 : 0;
      if (fieldValue !== undefined) {
        this.encodeField(fieldValue, field.type, field);
      }
    }

    return fieldBitmask;
  }

  writeBitmaskToLocalStream(bitmask) {
    logger(`Writing bitmask ${bitmask.toString(2)} to stream at offset ${this.stream.offset}`);
    this.stream.writeUInt32(bitmask >>> 0);
  }

  encodeNestedStructure(object, schema) {
    logger("Encoding nested structure:", object);

    const nestedVisitor = new EncodingVisitor();
    nestedVisitor.visitObject(object, schema);
    logger('appendToStream offset', nestedVisitor.stream.offset)
    this.appendToStream(nestedVisitor.stream);
  }

  encodeCollection(collection, schema) {
    logger('Current offset', this.stream.offset)
    logger("Encoding collection of length:", collection.length)
  
    // Write the length of the collection
    logger('Offset before writing collection length', this.stream.offset);

    logger('writing collection.length', collection.length)
    this.stream.writeUInt16(collection.length);
    logger('Offset after writing collection length', this.stream.offset);
  
    collection.forEach(item => {
      // Create a new visitor for each item to generate its bitmask
      const itemVisitor = new EncodingVisitor();
      const itemBitmask = itemVisitor.createBitmask(item, schema);
      
      // Write the bitmask for the item
      logger(`Writing item bitmask ${itemBitmask.toString(2)} to stream`);
      this.stream.writeUInt32(itemBitmask >>> 0);
  
      // Now encode the item itself
      this.encodeNestedStructure(item, schema);
    });
  }
  
  appendToStream(otherStream) {
    logger('otherStream.offset', otherStream.offset);
    logger('this.stream.offset', this.stream.offset);

    // Calculate the number of bits to append
    const bitsToAppend = otherStream.offset;

    // Iterate through each bit in otherStream and append it to this.stream
    for (let i = 0; i < bitsToAppend; i++) {
        const bit = otherStream.bitBuffer._getBit(i);
        this.stream.bitBuffer._setBit(bit, this.stream.offset + i);
    }

    // Update the offset of this.stream
    this.stream.offset += bitsToAppend;
}


  encodeField(value, type, fullSchema) {
    let stream = this.stream;
    logger(`[encodeField] Start: type = ${type}, value =`, value, `Pre-offset: ${stream.offset}`);

    logger(`Encoding field of type ${type} with value:`, value);
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
        //logger("WRITING ENUM value", key, enumValue);
        // logger('itemSchema', fullSchema, type, value)
        let enumValue = fullSchema.enum[value];
        logger("WRITING", enumValue)
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

    logger(`[encodeField] End: type = ${type}, value =`, value, `Post-offset: ${stream.offset}`);

  }


  getEnumValue(value, enumSchema) {
    if (value in enumSchema.enum) {
      return enumSchema.enum[value];
    } else {
      console.error(`Enum value '${value}' not found`);
      return null;
    }
  }

  createBitmask(object, schema) {
    // logger("Creating bitmask for object:", object, "with schema:", schema);

    return this.visitObject(object, schema) >>> 0; // Force unsigned interpretation
  }

  getEncodedBuffer() {
    logger(`Returning encoded buffer with length: ${this.stream.offset}`);

    // Return the portion of the buffer that has been used
    return this.stream.bitBuffer.byteArray.slice(0, this.stream.offset);
  }

  getBitBuffer() {
    logger(`Returning BitBuffer instance`);

    return this.stream.bitBuffer;
  }

  // Additional methods like encodeInt32, encodeString, etc., can be added here
}

export default EncodingVisitor;
