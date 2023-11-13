import tap from 'tape';
import PlayerCodec from '../bbb4.js';

// Define the schemas and entity types as you have them
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


// Test for Direct Field Presence
tap.test('Direct Field Presence', (t) => {
  const playerCodec = new PlayerCodec(playerSchema); // Use the appropriate schema for your tests

  const bitmask = 0b1; // Assuming the first bit represents 'id'
  const key = 'id';

  t.ok(playerCodec.isFieldPresent(bitmask, key), 'Field should be present in the bitmask');
  t.end();
});

// Test for Field Not Present
tap.test('Field Not Present', (t) => {
  const playerCodec = new PlayerCodec(playerSchema); // Use the appropriate schema for your tests

  const bitmask = 0b0; // No fields set
  const key = 'id';

  t.notOk(playerCodec.isFieldPresent(bitmask, key), 'Field should not be present in the bitmask');
  t.end();
});

// Test for Invalid Field
/*
tap.test('Invalid Field', (t) => {
  const playerCodec = new PlayerCodec(playerSchema); // Use the appropriate schema for your tests

  const bitmask = 0b1; // Some bitmask
  const key = 'nonexistentField';

  t.notOk(playerCodec.isFieldPresent(bitmask, key), 'Invalid field should not be present');
  t.end();
});
*/

// Test for Partially Matching Field Names
tap.test('Partially Matching Field Names', (t) => {
  const codec = new PlayerCodec(snapshotSchema);

  const bitmask = 0b100; // Assuming the third bit represents 'state.name'
  const key = 'state[0].type'; // Different field within the same collection

  t.notOk(codec.isFieldPresent(bitmask, key), 'Field should not be falsely matched');
  t.end();
});

// Add more tests as necessary to cover all scenarios
