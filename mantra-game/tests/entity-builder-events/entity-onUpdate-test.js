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


tap.test('Entity lifecycle events - Entity.update integration', (t) => {
  let updateState = false;

  // Test adding a single update event handler
  t.test('Adding a single Entity.update event handler', (t) => {
    const entityConfig = game.make()
      .onUpdate(() => { updateState = true; }) // Add an update handler that modifies 'updateState'
      .build();

    // Trigger the update event
    entityConfig.update();

    // Verify that the update event handler was executed
    t.equal(updateState, true, 'Entity.update event handler should be executed');
    updateState = false; // Reset the state for the next test
    t.end();
  });

  t.test('Stacking multiple Entity.update event handlers', (t) => {
    let executionOrder = [];

    const entityConfig = game.make()
      .onUpdate(() => executionOrder.push('first'))  // First update handler
      .onUpdate(() => executionOrder.push('second')) // Second update handler
      .build();

    // Trigger the update event
    entityConfig.update();

    // Verify that both update event handlers were executed in order
    t.deepEqual(executionOrder, ['first', 'second'], 'All Entity.update event handlers should execute in the order they were added');
    t.end();
  });
  // Test stacking multiple update event handlers
  // Test that update event handlers from different entities do not interfere
  t.test('Entity.update event handlers on separate entities do not interfere', (t) => {
    let entity1UpdateState = false;
    let entity2UpdateState = false;

    const entityConfig1 = game.make()
      .onUpdate(() => entity1UpdateState = true) // Update handler for the first entity
      .build();

    const entityConfig2 = game.make()
      .onUpdate(() => entity2UpdateState = true) // Update handler for the second entity
      .build();

    // Trigger the update event on the first entity
    entityConfig1.update();

    // Verify that only the first entity's update event handler was executed
    t.equal(entity1UpdateState, true, 'First entity Entity.update event handler should fire');
    t.equal(entity2UpdateState, false, 'Second entity Entity.update event handler should not fire');
    t.end();
  });


  // Assuming the existing imports and setup code is already included here

  tap.test('game.updateEntity integration with Entity.onUpdate event', (t) => {
    let initialUpdateState = false;
    let updatedUpdateState = false;

    // Set up an initial entity with an onUpdate handler
    const initialEntityConfig = game.make()
      .onUpdate(() => { initialUpdateState = true; });

    const entity = initialEntityConfig.createEntity();

    // Trigger the initial update event to test the initial handler
    entity.update();

    // Verify that the initial onUpdate event handler was executed
    t.equal(initialUpdateState, true, 'Initial Entity.onUpdate event handler should be executed');

    // Reset the state for testing the updated handler
    initialUpdateState = false;

    // Update the entity with a new onUpdate handler
    game.updateEntity(entity.id, {
      update: () => { updatedUpdateState = true; } // Updated onUpdate handler
    });

    // Assuming you have a way to get the updated entity configuration or directly trigger its update
    const updatedEntityConfig = game.getEntity(entity.id); // Hypothetical method to retrieve entity config
    updatedEntityConfig.update();

    // Verify that the both the initial and updated onUpdate event handlers were executed
    t.equal(initialUpdateState, true, 'Initial Entity.onUpdate event handler should not be executed after update');
    t.equal(updatedUpdateState, true, 'Updated Entity.onUpdate event handler should be executed');

    t.end();
  });

  tap.test('Entity lifecycle events - Entity.update integration', (t) => {
    // Test overwriting an Entity.update event handler
    
    t.test('Merging an Entity.update event handler', (t) => {
      let initialHandlerCalled = false;
      let newHandlerCalled = false;
    
      // Create an entity with an initial update event handler
      const entityConfig = game.make()
        .onUpdate(() => { initialHandlerCalled = true; })
        .build();
    
      // Trigger the update to confirm the initial handler works
      entityConfig.update();
      t.equal(initialHandlerCalled, true, 'Initial Entity.update event handler should be executed');
    
      // Create the entity in the ECS
      let createdEntity = game.createEntity(entityConfig);
    
      initialHandlerCalled = false; // Reset the initial handler flag

      createdEntity.update(); // Trigger the update to confirm the initial handler works

      t.equal(initialHandlerCalled, true, 'Initial Entity.update event handler should be executed after merging');

      initialHandlerCalled = false;

      //
      // Update the entity, which performs merge by default
      //
      let updatedEntity = game.updateEntity(createdEntity.id, {
        update: () => { newHandlerCalled = true; }
      });

      //
      // Verify the component value
      //
      let componentValue = game.components.update.get(updatedEntity.id);
      // Reset the initial handler flag
      initialHandlerCalled = false;
      // Trigger the componentValue to test if both handlers are called
      componentValue();
    
      // Verify that both the initial and new handlers were called
      t.equal(initialHandlerCalled, true, 'Initial Entity.update event handler should be executed after merging');
      // TODO: this test is failing? why?
      t.equal(newHandlerCalled, true, 'New Entity.update event handler should be executed after merging');

      //
      // Verify the updateEntity value
      //
      initialHandlerCalled = false;
      newHandlerCalled = false;

      updatedEntity.update();
      // Verify that both the initial and new handlers were called
      t.equal(initialHandlerCalled, true, 'Initial Entity.update event handler should be executed after merging');
      // TODO: this test is failing? why?
      t.equal(newHandlerCalled, true, 'New Entity.update event handler should be executed after merging');
    
      t.end();
    });
    
  });

});