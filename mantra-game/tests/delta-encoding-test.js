import tap from 'tape';
import deltaEncoding from '../plugins/snapshot-manager/SnapshotManager/deltaEncoding.js';
import hasStateChanged from '../plugins/snapshot-manager/SnapshotManager/hasStateChanged.js';

// Mocking a snapshot of game state
const mockSnapshot = (id, type, owner, position = { x: 0, y: 0 }) => ({
  state: [{ id, type, owner, position }]
});

tap.test('deltaEncoding.encode - basic functionality', (t) => {
  let entityId = 'player1';
  let bulletId = 'bullet1';
  
  // Initial state
  let initialSnapshot = mockSnapshot(bulletId, 'BULLET', entityId, { x: 5, y: 5 });

  // Update state
  let updatedSnapshot = mockSnapshot(bulletId, 'BULLET', entityId, { x: 10, y: 10 });

  // Test encoding of a new entity
  let encoded = deltaEncoding.encode('player1', initialSnapshot);
  // console.log('encoded', encoded.state)

  t.equal(encoded.state.length, 1, 'should encode new entity state');
  
  // Test update without change
  encoded = deltaEncoding.encode('player1', initialSnapshot);
  t.equal(encoded, null, 'should not encode state if there are no changes');

  // Test update with change
  
  encoded = deltaEncoding.encode('player1', updatedSnapshot);

  t.equal(encoded.state.length, 1, 'should encode updated entity state');
  t.equal(encoded.state[0].position.x, 10, 'position x should be updated');
  t.equal(encoded.state[0].position.y, 10, 'position y should be updated');
  
  t.end();
});