// TODO: afterUpdateEntity using game.updateEntity(entity.id, updatedEntityData)})

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

tap.test('Entity lifecycle events - Entity.afterUpdateEntity integration', (t) => {
  let updateEntityState = false;

  // Test adding a single afterUpdateEntity event handler
  t.test('Adding a single Entity.afterUpdateEntity event handler', (t) => {
    const entity = game.make()
      .afterUpdateEntity(() => { updateEntityState = true; }) // Add an afterUpdateEntity handler that modifies 'updateEntityState'
      .createEntity();

    // Simulate the entity update event
    const updatedEntityData = {}; // Define your updated entity data here
    game.updateEntity(entity.id, updatedEntityData);

    // Verify that the afterUpdateEntity event handler was executed
    t.equal(updateEntityState, true, 'Entity.afterUpdateEntity event handler should be executed');
    updateEntityState = false; // Reset the state for the next test
    t.end();
  });

  // Test stacking multiple afterUpdateEntity event handlers
  t.test('Stacking multiple Entity.afterUpdateEntity event handlers', (t) => {
    let executionOrder = [];

    const entity = game.make()
      .afterCreateEntity((entity) => {
        // Setup initial entity state here, if needed
      })
      .afterUpdateEntity(() => executionOrder.push('first'))  // First afterUpdateEntity handler
      .afterUpdateEntity(() => executionOrder.push('second')) // Second afterUpdateEntity handler
      .createEntity();

    // Simulate the entity update event
    const updatedEntityData = {}; // Define your updated entity data here
    game.updateEntity(entity.id, updatedEntityData);

    // Verify that both afterUpdateEntity event handlers were executed in order
    t.deepEqual(executionOrder, ['first', 'second'], 'All Entity.afterUpdateEntity event handlers should execute in the order they were added');
    t.end();
  });

  // Test that afterUpdateEntity event handlers from different entities do not interfere
  t.test('Entity.afterUpdateEntity event handlers on separate entities do not interfere', (t) => {
    let entity1UpdateState = false;
    let entity2UpdateState = false;

    const entity1 = game.make()
      .afterCreateEntity((entity) => {
        // Setup initial entity1 state here, if needed
      })
      .afterUpdateEntity(() => entity1UpdateState = true) // afterUpdateEntity handler for the first entity
      .createEntity();

    const entity2 = game.make()
      .afterCreateEntity((entity) => {
        // Setup initial entity2 state here, if needed
      })
      .afterUpdateEntity(() => entity2UpdateState = true) // afterUpdateEntity handler for the second entity
      .createEntity();

    // Simulate the entity update event for the first entity
    const updatedEntityData1 = {}; // Define your updated entity1 data here
    game.updateEntity(entity1.id, updatedEntityData1);

    // Verify that only the first entity's afterUpdateEntity event handler was executed
    t.equal(entity1UpdateState, true, 'First entity Entity.afterUpdateEntity event handler should fire');
    t.equal(entity2UpdateState, false, 'Second entity Entity.afterUpdateEntity event handler should not fire');
    t.end();
  });

  // Add more tests as needed for other scenarios you want to cover
});