import tap from 'tape'
import deltaCompression from '../plugins/snapshots/SnapShotManager/deltaCompression.js'

tap.test('compress function should return null when snapshot is null', (t) => {
  const snapshot = null;
  const result = deltaCompression.compress(snapshot);
  t.equal(result, null);
  t.end();
});

tap.test('compress function should return null when snapshot has no state property', (t) => {
  const snapshot = {};
  const result = deltaCompression.compress(snapshot);
  t.equal(result, null);
  t.end();
});

tap.test('compress function should compress state correctly', (t) => {
  deltaCompression.resetState();
  const state1 = {
    id: 1,
    position: { x: 2, y: 3 },
    rotation: 1,
  };

  const state2 = {
    id: 2,
    position: { x: 5, y: 6 },
    rotation: -7,
  };

  const snapshot = {
    state: [state1, state2],
  };


  // runs the first compression, should return the same data
  const result = deltaCompression.compress(snapshot);
  t.equal(result.state.length, 2, 'Result state should have 2 items');

  const compressedState1 = result.state[0];
  t.same(compressedState1.position, { x: 2, y: 3 }, 'Position should be the same when there is no previous state');
  t.equal(compressedState1.rotation, 1, 'Rotation should be the same when there is no previous state');

  const compressedState2 = result.state[1];
  t.same(compressedState2.position, { x: 5, y: 6 }, 'Position should be correctly compressed');
  t.equal(compressedState2.rotation, -7, 'Rotation should be correctly compressed');


  // re-running the same compression should result in all zeros
  const result2 = deltaCompression.compress(snapshot);

  const compressedState3 = result2.state[0];
  t.same(compressedState3.position, { x: 0, y: 0 }, 'Position should be the same when there is no previous state');
  t.equal(compressedState3.rotation, 0, 'Rotation should be the same when there is no previous state');

  const compressedState4 = result2.state[1];
  t.same(compressedState4.position, { x: 0, y: 0 }, 'Position should be correctly compressed');
  t.equal(compressedState4.rotation, 0, 'Rotation should be correctly compressed');


  // create a new snapshot with a new state showing movement
  // re-running compression should show the delta
  const state3 = {
    id: 1,
    position: { x: 6, y: 7 },
    rotation: 8,
  };

  const result3 = deltaCompression.compress({ state: [state3] });

  const compressedState5 = result3.state[0];
  t.same(compressedState5.position, { x: 4, y: 4 }, 'Position should be show delta');
  t.equal(compressedState5.rotation, 7, 'Rotation should show delta');

  t.end();
});

// Repeated State Changes Test
tap.test('compress and decompress should handle repeated state changes correctly', (t) => {
  deltaCompression.resetState();

  const initialState = {
    id: 1,
    position: { x: 10, y: 15 },
    rotation: 5
  };

  const secondState = {
    id: 1,
    position: { x: 10, y: 15 },
    rotation: 1
  };

  let snapshot = { state: [initialState] };
  let result = deltaCompression.compress(snapshot);
  result = deltaCompression.decompress(result);
  t.equal(result.state[0].position.x, 10, 'X position should have default state');

  let second = deltaCompression.compress({ state: [secondState] });

  t.equal(second.state[0].position.x, 0, 'X position should be zero since no new changes');
  t.equal(second.state[0].rotation, -4, 'rotation show delta change');
  t.end();

});

// Edge Case Values Test
tap.test('compress function should handle float precision to 3', (t) => {
  deltaCompression.resetState();

  const state = {
    id: 1,
    position: { x: 0.001, y: 0.002 },
    rotation: 0.003
  };

  let snapshot = { state: [state] };
  let compressed = deltaCompression.compress(snapshot);
  let decompressed = deltaCompression.decompress(compressed);

  t.same(decompressed.state[0].position, state.position, 'Position should not be lost due to precision truncation');
  t.equal(decompressed.state[0].rotation, state.rotation, 'Rotation should not be lost due to precision truncation');

  t.end();
});

// State Deletion Test
tap.test('compress function should handle state deletions correctly', (t) => {
  deltaCompression.resetState();

  const state = {
    id: 1,
    position: { x: 10, y: 20 },
    rotation: 30,
    destroy: true
  };

  let snapshot = { state: [state] };
  deltaCompression.compress(snapshot);
  deltaCompression.removeState(1);

  // Attempt to compress a new state with the same id after deletion
  const newState = { ...state, destroy: false };
  snapshot = { state: [newState] };
  let result = deltaCompression.compress(snapshot);

  // New state should be treated as a new entity, not a continuation
  t.same(result.state[0].position, newState.position, 'Position should be treated as new after deletion');
  t.equal(result.state[0].rotation, newState.rotation, 'Rotation should be treated as new after deletion');

  t.end();
});

// Robustness Against Invalid Inputs
tap.test('compress and decompress functions should handle invalid inputs gracefully', (t) => {
  deltaCompression.resetState();

  let invalidSnapshot = { state: [{ id: 1 }] }; // Missing position and rotation
  let result = deltaCompression.compress(invalidSnapshot);

  t.notOk(result.state[0].hasOwnProperty('position'), 'Should handle missing position gracefully');
  t.notOk(result.state[0].hasOwnProperty('rotation'), 'Should handle missing rotation gracefully');

  invalidSnapshot = { state: [{ id: 2, position: { x: NaN, y: NaN }, rotation: NaN }] }; // Corrupted data
  result = deltaCompression.compress(invalidSnapshot);

  t.ok(isNaN(result.state[0].position.x) && isNaN(result.state[0].position.y), 'Should handle NaN values gracefully');
  t.ok(isNaN(result.state[0].rotation), 'Should handle NaN rotation gracefully');

  t.end();
});

// Accumulation Consistency Test
tap.test('compress and decompress should maintain consistent accumulation over cycles', (t) => {
  deltaCompression.resetState();

  const state = {
    id: 1,
    position: { x: 1, y: 2 },
    rotation: 3
  };

  let snapshot = { state: [state] };
  let result;

  // Compress and decompress multiple times
  for (let i = 0; i < 5; i++) {
    result = deltaCompression.compress(snapshot);
    result = deltaCompression.decompress(result);
  }

  t.same(result.state[0].position, state.position, 'Position should remain consistent after multiple cycles');
  t.equal(result.state[0].rotation, state.rotation, 'Rotation should remain consistent after multiple cycles');

  t.end();
});