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
  console.log('compressedState5', compressedState5)
  t.same(compressedState5.position, { x: 4, y: 4 }, 'Position should be show delta');
  t.equal(compressedState5.rotation, 7, 'Rotation should show delta');



  console.log(result2.state)
  t.end();
});


