import tap from 'tape';
import BitBuffer from '../binary/BitBuffer.js';
import BitStream from '../binary/BitStream.js';
import PlayerCodec from '../bbb4.js';

const entityTypes = {
  'PLAYER': 0,
  'BULLET': 1,
  'BLOCK': 2,
  'BORDER': 3,
  'BODY': 4
  // ... other types
};

const entitySchema = {
  id: { type: 'UInt16' },
  name: { type: 'UTF8String' },
  type: { type: 'Enum', enum: entityTypes }
}

const snapshotSchema = {
  id: { type: 'UInt16' },
  state: {
    type: 'Collection',
    schema: entitySchema
  }
}


// Mock function to encode collection items into a stream
function encodeMockCollection(stream, collection) {
  stream.writeUInt16(collection.length); // Write the length of the collection

  collection.forEach(item => {
    if ('id' in item) {
      stream.writeUInt16(item.id);
    }
    if ('name' in item) {
      let utf8Bytes = Buffer.from(item.name, 'utf8');
      stream.writeUInt8(utf8Bytes.length);
      for (let byte of utf8Bytes) {
        stream.writeUInt8(byte);
      }
    }
    if ('type' in item) {
      stream.writeUInt8(entityTypes[item.type]);
    }
    // ... encode other fields ...
  });
}

// Test for decoding a collection
tap.test('Decoding a Collection', (t) => {
  const codec = new PlayerCodec(snapshotSchema);

  const mockCollection = [
      { id: 1, name: 'player1', type: 'PLAYER' },
      { id: 2, name: 'block1', type: 'BLOCK' }
      // ... more items ...
    ];

  

  let buffer = new BitBuffer(1024 * 10); // Arbitrarily large buffer size
  let stream = new BitStream(buffer);
  encodeMockCollection(stream, mockCollection);

  stream.offset = 0; // Reset the stream for reading

  const bitmask = 0b111; // Bitmask for both 'id' and 'name' present

  const decodedCollection = codec.decodeCollection(stream, entitySchema, bitmask);

  t.equal(decodedCollection.length, mockCollection.length, 'Decoded collection should have the same length as the original');
  t.deepEqual(decodedCollection, mockCollection, 'Decoded collection should match the original collection');
  t.end();
});