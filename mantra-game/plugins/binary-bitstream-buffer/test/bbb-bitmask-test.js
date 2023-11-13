import tap from 'tape';
import PlayerCodec from '../bbb4.js';

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

const playerSchema = {
  id: { type: 'UInt16' },
  name: { type: 'UTF8String' },
  type: { type: 'Enum', enum: entityTypes }
}

const snapshotSchema = {
  id: { type: 'UInt16' },
  state: {
    type: 'Collection',
    schema: playerSchema
  }
}

tap.test('No properties', (t) => {
  const codec = new PlayerCodec(playerSchema);

  const msg = {}; // Empty message
  const expectedBitmask = 0b0; // No fields present
  const result = codec.createBitmask(msg);

  t.equal(result, expectedBitmask, 'Bitmask should be 0 for no properties');
  t.end();
});

tap.test('Partial field presence', (t) => {
  const codec = new PlayerCodec(playerSchema);

  // Message with only 'id' and 'type' fields
  const msg = {
    id: 123,
    type: 'PLAYER'
  };

  const expectedBitmask = 0b101; // Assuming 'id' is bit 0 and 'type' is bit 2
  const result = codec.createBitmask(msg);

  t.equal(result, expectedBitmask, 'Bitmask should correctly represent partial field presence');
  t.end();
});

tap.test('Regular properties', (t) => {
  const codec = new PlayerCodec(playerSchema);

  const msg = {
    id: 123,
    name: 'player1',
    type: 'PLAYER'
  };

  const expectedBitmask = 0b111; // All fields are present
  const result = codec.createBitmask(msg);
  t.equal(result, expectedBitmask, 'Bitmask should match for regular properties');
  t.end();
});

tap.test('Nested props for regular properties', (t) => {
  const codec = new PlayerCodec(snapshotSchema);

  const msg = {
    id: 123,
    state: [
      { id: 1, name: 'player1', type: 'PLAYER' },
      { id: 2, name: 'player2', type: 'PLAYER' },
      { id: 3, name: 'player3', type: 'BLOCK' }
    ]
  };

  const expectedBitmask = 0b1111; // Bitmask for 'id', 'state.id', 'state.name', and 'state.type'
  const result = codec.createBitmask(msg);
  t.equal(result, expectedBitmask, 'Bitmask should match for nested properties');
  t.end();
});
