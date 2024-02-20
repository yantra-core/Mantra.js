import tap from 'tape';
import { Game } from '../../Game.js';
import Schema from '../../plugins/schema/Schema.js';
import PhysicsMatter from '../../plugins/physics-matter/MatterPhysics.js';
import Sutra from '../../plugins/sutra/Sutra.js';
import Entity from '../../plugins/entity/Entity.js';
import EntityInput from '../../plugins/entity-input/EntityInput.js';
import SnapshotManager from '../../plugins/snapshot-manager/SnapshotManager.js';
import hasStateChanged from '../../plugins/snapshot-manager/SnapshotManager/hasStateChanged.js';

import Flame from '../../plugins/flame/Flame.js';
import GravityWell from '../../plugins/gravitywell/GravityWell.js';

const game = new Game({
  loadDefaultPlugins: false,
  msgpack: false,
  deltaCompression: false,
  protobuf: false,
  deltaEncoding: true
});

game.use(new Schema());
game.use(new PhysicsMatter());
game.use(new Entity());
game.use(new EntityInput());
game.use(new SnapshotManager());
game.use(new Sutra());
game.use(new Flame());
game.use(new GravityWell());


tap.test('Entity pointer events integration', (t) => {

  // List of all pointer events to test
  const pointerEvents = [
    'pointerdown', 'pointerup', 'pointermove', 
    'pointerenter', 'pointerleave', 'pointerover', 'pointerout'
  ];

  pointerEvents.forEach(event => {

    // Test adding a single handler for each pointer event
    t.test(`Adding a single Entity.${event} event handler`, (t) => {
      let eventState = false;
      const entityConfig = game.build()
        [event](() => { eventState = true; }) // Add an event handler that modifies 'eventState'
        .build();

      // Simulate the pointer event
      if (typeof entityConfig[event] === 'function') {
        entityConfig[event]();
      }

      // Verify that the event handler was executed
      t.equal(eventState, true, `Entity.${event} event handler should be executed`);
      t.end();
    });

    // Test stacking multiple handlers for each pointer event
    t.test(`Stacking multiple Entity.${event} event handlers`, (t) => {
      let executionOrder = [];
      const entityConfig = game.build()
        [event](() => executionOrder.push('first'))  // First event handler
        [event](() => executionOrder.push('second')) // Second event handler
        .build();

      // Simulate the pointer event
      if (typeof entityConfig[event] === 'function') {
        entityConfig[event]();
      }

      // Verify that both event handlers were executed in order
      t.deepEqual(executionOrder, ['first', 'second'], `All Entity.${event} event handlers should execute in the order they were added`);
      t.end();
    });

  });

  // Add more tests as needed for other scenarios you want to cover
});
