import tap from 'tape';
import api from '../lib/index.js';
import BitBuffer from '../binary/BitBuffer.js';
import BitStream from '../binary/BitStream.js';

import testSchema from './fixtures/testSchema.js'

let logger = console.log;
logger = function noop () {};

const entityTypes = {
  'PLAYER': 0,
  'BULLET': 1,
  'BLOCK': 2,
  'BORDER': 3,
  'BODY': 4
  // ... other types
};

tap.test('encodeMessage should correctly encode various data types', (t) => {
  const testMessage = {
    id: 123,
    state: [
      { id: 1, name: 'player1', type: 'PLAYER' },
      { id: 2, name: 'block1', type: 'BLOCK' },
      { id: 3, name: 'bullet1', type: 'BULLET'}
    ]
  };

  const encodedBuffer = api.encode(testSchema, testMessage);
  t.ok(encodedBuffer instanceof BitBuffer, 'Encoded buffer should be an instance of BitBuffer');

  let stream = new BitStream(encodedBuffer);
  let readBitmask = stream.readUInt32();
  logger('Global bitmask:', readBitmask.toString(2));
  t.equal(readBitmask, 3, 'Bitmask should be 3 (11 in binary)');

  let readId = stream.readUInt16();
  logger('Read ID:', readId);
  t.equal(readId, testMessage.id, 'Encoded id should match the original id');

  let collectionLength = stream.readUInt16();
  logger('Collection length:', collectionLength);
  t.equal(collectionLength, testMessage.state.length, 'Collection length should match');

  let readCollectionItemBitmask = stream.readUInt32();
  logger('Collection Item Bitmask:', readCollectionItemBitmask.toString(2));
  t.equal(readCollectionItemBitmask, 33808, 'Collection ItemBitmask should be 3 (1000010000010000 in binary)');

  let itemId = stream.readUInt16();
  logger('Item ID:', itemId);

  t.end();
});


tap.test('encodeMessage with missing properties in collection items', (t) => {
  const testMessage = {
    id: 123,
    state: [
      { id: 1, name: 'player1' }, // 'type' missing
      { id: 2, type: 'BLOCK' }, // 'name' missing
      { id: 3 } // 'name' and 'type' missing
    ]
  };

  const encodedBuffer = api.encode(testSchema, testMessage);
  t.ok(encodedBuffer instanceof BitBuffer, 'Encoded buffer should be an instance of BitBuffer');

  let stream = new BitStream(encodedBuffer);

  let readBitmask = stream.readUInt32();

  // Assert that the bitmask is as expected (11 in binary, or 3 in decimal)
  t.equal(readBitmask, 3, 'Bitmask should be 3 (11 in binary)');

  let readId = stream.readUInt16();
  t.equal(readId, testMessage.id, 'Encoded id should match the original id');

  // Continue with the rest of the test, handling missing properties as needed...

  t.end();
});
