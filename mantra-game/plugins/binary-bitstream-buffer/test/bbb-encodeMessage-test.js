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

const codec = new PlayerCodec(snapshotSchema);

tap.test('encodeMessage should correctly encode various data types', (t) => {
  const testMessage = {
    id: 123,
    state: [
      { id: 1, name: 'player1', type: 'PLAYER' },
      { id: 2, name: 'block1', type: 'BLOCK' },
      { id: 3, name: 'bullet1', type: 'BULLET'}
    ]
  };

  const encodedBuffer = codec.encodeMessage(testMessage);
  t.ok(encodedBuffer instanceof BitBuffer, 'Encoded buffer should be an instance of BitBuffer');

  let stream = new BitStream(encodedBuffer);
  let readBitmask = stream.readUInt32();

  console.log('readBitmask', readBitmask.toString(2))

  let readId = stream.readUInt16();
  t.equal(readId, testMessage.id, 'Encoded id should match the original id');

  // Reading the collection
  let collectionLength = stream.readUInt16();
  t.equal(collectionLength, testMessage.state.length, 'Collection length should match');
  for (let i = 0; i < collectionLength; i++) {
    let itemId = stream.readUInt16();
    let itemNameLength = stream.readUInt8();
    let itemNameBytes = new Uint8Array(itemNameLength);
    for (let j = 0; j < itemNameLength; j++) {
      itemNameBytes[j] = stream.readUInt8();
    }
    let itemName = Buffer.from(itemNameBytes).toString('utf8');
    let itemType = stream.readUInt8();

    t.equal(itemId, testMessage.state[i].id, `Item ${i} id should match`);
    t.equal(itemName, testMessage.state[i].name, `Item ${i} name should match`);
    t.equal(itemType, entityTypes[testMessage.state[i].type], `Item ${i} type should match`);
  }
  
  t.end();
});