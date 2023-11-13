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

const codec = new PlayerCodec(entitySchema);

tap.test('encodeMessage should correctly encode various data types', (t) => {
  const testMessage = { id: 1, name: 'player1', type: 'PLAYER' };

  const encodedBuffer = codec.encodeMessage(testMessage);
  t.ok(encodedBuffer instanceof BitBuffer, 'Encoded buffer should be an instance of BitBuffer');

  let stream = new BitStream(encodedBuffer);
  let readBitmask = stream.readUInt32();

  console.log('readBitmask', readBitmask.toString(2))

  let readId = stream.readUInt16();
  t.equal(readId, testMessage.id, 'Encoded id should match the original id');

  let readNameLength = stream.readUInt8();
  let readNameBytes = new Uint8Array(readNameLength);
  for (let i = 0; i < readNameLength; i++) {
    readNameBytes[i] = stream.readUInt8();
  }

  let readName = new TextDecoder('utf-8').decode(readNameBytes);
  t.equal(readName, testMessage.name, 'Encoded name should match the original name');


  let readType = stream.readUInt8();
  t.equal(readType, entityTypes[testMessage.type], 'Encoded type should match the original type');



  t.end();
});