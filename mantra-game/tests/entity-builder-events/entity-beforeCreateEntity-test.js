/* NOT IMPLEMENTED YET 

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


tap.test('Entity lifecycle events - Entity.beforeCreateEntity integration', (t) => {
  let beforeCreateState = false;
  // Test adding a single beforeCreateEntity event handler
  t.test('Adding a single Entity.beforeCreateEntity event handler', (t) => {
    const entityConfig = game.build()
      .beforeCreateEntity(() => { beforeCreateState = true; }) // Add a beforeCreateEntity handler that modifies 'beforeCreateState'
      .build();

    // Simulate the event just before entity creation
    if (typeof entityConfig.beforeCreateEntity === 'function') {
      entityConfig.beforeCreateEntity();
    }

    // Verify that the beforeCreateEntity event handler was executed
    t.equal(beforeCreateState, true, 'Entity.beforeCreateEntity event handler should be executed');
    beforeCreateState = false; // Reset the state for the next test
    t.end();
  });

  // Test stacking multiple beforeCreateEntity event handlers
  t.test('Stacking multiple Entity.beforeCreateEntity event handlers', (t) => {
    let executionOrder = [];

    const entityConfig = game.build()
      .beforeCreateEntity(() => executionOrder.push('first'))  // First beforeCreateEntity handler
      .beforeCreateEntity(() => executionOrder.push('second')) // Second beforeCreateEntity handler
      .build();

    // Simulate the event just before entity creation
    if (typeof entityConfig.beforeCreateEntity === 'function') {
      entityConfig.beforeCreateEntity();
    }

    // Verify that both beforeCreateEntity event handlers were executed in order
    t.deepEqual(executionOrder, ['first', 'second'], 'All Entity.beforeCreateEntity event handlers should execute in the order they were added');
    t.end();
  });

  // Test that beforeCreateEntity event handlers from different entities do not interfere
  t.test('Entity.beforeCreateEntity event handlers on separate entities do not interfere', (t) => {
    let entity1BeforeCreateState = false;
    let entity2BeforeCreateState = false;

    const entityConfig1 = game.build()
      .beforeCreateEntity(() => entity1BeforeCreateState = true) // beforeCreateEntity handler for the first entity
      .build();

    const entityConfig2 = game.build()
      .beforeCreateEntity(() => entity2BeforeCreateState = true) // beforeCreateEntity handler for the second entity
      .build();

    // Simulate the event just before entity creation for the first entity
    if (typeof entityConfig1.beforeCreateEntity === 'function') {
      entityConfig1.beforeCreateEntity();
    }

    // Verify that only the first entity's beforeCreateEntity event handler was executed
    t.equal(entity1BeforeCreateState, true, 'First entity Entity.beforeCreateEntity event handler should fire');
    t.equal(entity2BeforeCreateState, false, 'Second entity Entity.beforeCreateEntity event handler should not fire');
    t.end();
  });

  // Add more tests as needed for other scenarios you want to cover
});

*/