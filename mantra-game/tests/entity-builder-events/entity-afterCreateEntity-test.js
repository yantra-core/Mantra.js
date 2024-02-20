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

// Assuming the existing imports and setup code is already included here

tap.test('Entity lifecycle events - Entity.afterCreateEntity integration', (t) => {
  let createEntityState = false;

  // Test adding a single afterCreateEntity event handler
  t.test('Adding a single Entity.afterCreateEntity event handler', (t) => {
    const entityConfig = game.build()
      .afterCreateEntity(() => { createEntityState = true; }) // Add an afterCreateEntity handler that modifies 'createEntityState'
      .build();

    // Simulate the entity creation event
    if (typeof entityConfig.afterCreateEntity === 'function') {
      entityConfig.afterCreateEntity();
    }

    // Verify that the afterCreateEntity event handler was executed
    t.equal(createEntityState, true, 'Entity.afterCreateEntity event handler should be executed');
    createEntityState = false; // Reset the state for the next test
    t.end();
  });

  // Test stacking multiple afterCreateEntity event handlers
  t.test('Stacking multiple Entity.afterCreateEntity event handlers', (t) => {
    let executionOrder = [];

    const entityConfig = game.build()
      .afterCreateEntity(() => executionOrder.push('first'))  // First afterCreateEntity handler
      .afterCreateEntity(() => executionOrder.push('second')) // Second afterCreateEntity handler
      .build();

    // Simulate the entity creation event
    if (typeof entityConfig.afterCreateEntity === 'function') {
      entityConfig.afterCreateEntity();
    }

    // Verify that both afterCreateEntity event handlers were executed in order
    t.deepEqual(executionOrder, ['first', 'second'], 'All Entity.afterCreateEntity event handlers should execute in the order they were added');
    t.end();
  });

  // Test that afterCreateEntity event handlers from different entities do not interfere
  t.test('Entity.afterCreateEntity event handlers on separate entities do not interfere', (t) => {
    let entity1CreateState = false;
    let entity2CreateState = false;

    const entityConfig1 = game.build()
      .afterCreateEntity(() => entity1CreateState = true) // afterCreateEntity handler for the first entity
      .build();

    const entityConfig2 = game.build()
      .afterCreateEntity(() => entity2CreateState = true) // afterCreateEntity handler for the second entity
      .build();

    // Simulate the entity creation event for the first entity
    if (typeof entityConfig1.afterCreateEntity === 'function') {
      entityConfig1.afterCreateEntity();
    }

    // Verify that only the first entity's afterCreateEntity event handler was executed
    t.equal(entity1CreateState, true, 'First entity Entity.afterCreateEntity event handler should fire');
    t.equal(entity2CreateState, false, 'Second entity Entity.afterCreateEntity event handler should not fire');
    t.end();
  });

  // Add more tests as needed for other scenarios you want to cover
});

