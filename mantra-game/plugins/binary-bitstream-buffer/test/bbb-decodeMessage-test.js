import tap from 'tape';
import PlayerCodec from '../bbb4.js';
import BitBuffer from '../binary/BitBuffer.js';
import BitStream from '../binary/BitStream.js';

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

// Create a new instance of PlayerCodec with the test schema
const codec = new PlayerCodec(snapshotSchema);

tap.test('decodeMessage should correctly decode various data types', (t) => {
  // Test with a message containing various data types
  const testMessage = {
    id: 123,
    state: [
      { id: 1, name: 'player1', type: 'PLAYER' },
      { id: 2, name: 'block1', type: 'BLOCK' }
    ]
  };

  // Encode and then decode the message
  const encodedBuffer = codec.encodeMessage(testMessage);
  const decodedMessage = codec.decodeMessage(encodedBuffer);

  // Check if the decoded message matches the original message
  t.deepEqual(decodedMessage, testMessage, 'Decoded message should match the original message');


  t.end();
});