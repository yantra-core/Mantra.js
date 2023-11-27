import tap from 'tap';
import { Game } from '../Game.js';
import Schema from '../plugins/schema/Schema.js';
import PhysicsMatter from '../plugins/physics-matter/MatterPhysics.js';
import Entity from '../plugins/entity/Entity.js';
import EntityInput from '../plugins/entity-input/EntityInput.js';
import hasStateChanged from '../plugins/snapshots/SnapShotManager/hasStateChanged.js';

import TimersComponent from '../Component/TimersComponent.js';

const game = new Game({
  loadDefaultPlugins: false,
  msgpack: false,
  deltaCompression: false,
  protobuf: false,
  deltaEncoding: true
});

game.use(new PhysicsMatter());
game.use(new Entity());
game.use(new EntityInput());


tap.test('TimersComponent functionality', (t) => {
  const entityId = 1;
  game.createEntity({
    id: entityId,
    type: 'TEST',
    width: 33,
    height: 44,
    radius: 55,
    position: { x: 10, y: 20 }
  });

  const timers = new TimersComponent('timers', entityId);
  game.addComponent(entityId, timers);

  t.test('setTimer() function', (t) => {
    timers.setTimer('test-timer', 1); // 1 second timer
    t.ok(timers.timers['test-timer'], 'Timer should be set');
    t.end();
  });


  t.test('checkTimer() function before completion', (t) => {
    t.notOk(timers.checkTimer('test-timer'), 'Timer should not be completed yet');
    t.end();
  });

  t.test('simulate timer completion', (t) => {
    // Simulate the passage of time
    setTimeout(() => {
      t.ok(timers.checkTimer('test-timer'), 'Timer should be completed');
      t.end();
    }, 1100); // Slightly longer than the timer duration
  });

  t.test('resetTimer() function', (t) => {
    timers.resetTimer('test-timer');
    t.notOk(timers.checkTimer('test-timer'), 'Timer should be reset and not completed');
    t.end();
  });

  t.test('removeTimer() function', (t) => {
    timers.removeTimer('test-timer');
    t.notOk(timers.timers['test-timer'], 'Timer should be removed');
    t.end();
  });

  t.test('setIntervalTimer() function', (t) => {
    timers.setTimer('interval-timer', 0.5, true); // 0.5 second interval timer
    t.ok(timers.timers['interval-timer'], 'Interval timer should be set');
    t.end();
  });

  t.test('simulate interval timer', (t) => {
    let count = 0;
    const interval = setInterval(() => {
      let result = timers.checkTimer('interval-timer');
      if (result === 'intervalCompleted') {
        count++;
      }
      if (count === 3) { // Check if the timer triggers 3 times
        clearInterval(interval);
        t.pass('Interval timer triggered multiple times');
        t.end();
      }
    }, 600);
  });

  t.test('removeIntervalTimer() function', (t) => {
    timers.removeTimer('interval-timer');
    t.notOk(timers.timers['interval-timer'], 'Interval timer should be removed');
    t.end();
  });

  t.end();
});
