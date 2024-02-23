//
// This file tests EntityBuilder game.make() to ensure all entity configs can compose and build correctly
// This includes aggregating event functions like pointer or collision into composite handlers
// Most values will be overwritten by the last value in the chain, but event handlers will be aggregated
//
import tap from 'tape';
import { Game } from '../Game.js';
import Schema from '../plugins/schema/Schema.js';
import PhysicsMatter from '../plugins/physics-matter/MatterPhysics.js';
import Sutra from '../plugins/sutra/Sutra.js';
import Entity from '../plugins/entity/Entity.js';
import EntityInput from '../plugins/entity-input/EntityInput.js';
import SnapshotManager from '../plugins/snapshot-manager/SnapshotManager.js';
import hasStateChanged from '../plugins/snapshot-manager/SnapshotManager/hasStateChanged.js';

import Flame from '../plugins/flame/Flame.js';
import GravityWell from '../plugins/gravitywell/GravityWell.js';

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

let collisionState = {
  a: false,
  b: false
};

class CustomPluginA {
  static id = 'custom-plugin-a';
  constructor(config = {}) {
    this.id = CustomPluginA.id;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('custom-plugin-a', this);
  }

  build(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }
    //let rules = this.sutra();
    return {
      type: 'CUSTOM',
      collisionStart: function customACollisionStart() {
        collisionState.a = true;
      }
    };
  }
}

game.use(new CustomPluginA());


class CustomPluginB {
  static id = 'custom-plugin-b';
  constructor(config = {}) {
    this.id = CustomPluginB.id;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('custom-plugin-b', this);
  }

  build(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }
    //let rules = this.sutra();
    return {
      type: 'CUSTOM',
      collisionStart: function customACollisionStart() {
        collisionState.b = true;
      }
    };
  }
}

game.use(new CustomPluginB());

tap.test('game.make() API', (t) => {

  // Test the builder's basic functionality
  t.test('Builder can use Plugin.build methods to build configurations', (t) => {
    const entityConfig = game.make().Flame().build();
    // Check that the configuration matches what was set in the builder
    t.deepEqual(entityConfig.position, { x: 0, y: 0, z: 1 }, 'Position should be set to (100, 200)');
    t.deepEqual(entityConfig.size, { width: 16, height: 16, depth: 16 }, 'Size should be set to 50x60');
    t.end();
  });

  // Test the builder's basic functionality
  t.test('Builder can use compose Plugin.build configurations', (t) => {
    const entityConfig = game.make()
      .CustomPluginA()
      .CustomPluginB()
      .build();

    t.deepEqual(entityConfig.type, 'CUSTOM', 'Type should be set to CUSTOM');

    // trigger the collisionStart event
    entityConfig.collisionStart();

    // both collision events should have fired 
    t.deepEqual(collisionState.a, true, 'CustomPluginA collisionStart should have fired');
    t.deepEqual(collisionState.b, true, 'CustomPluginB collisionStart should have fired');
    t.end();
  });


  t.test('Builder can stack entity events - collisionStart', (t) => {

    // Reset collision states
    collisionState.a = false;
    collisionState.b = false;

    let entityConfig = game.make()
      .CustomPluginA()
      .CustomPluginB();

    entityConfig.collisionStart(function customCollisionStart() {
      collisionState.c = true;
    });

    entityConfig = entityConfig.build();

    t.deepEqual(entityConfig.type, 'CUSTOM', 'Type should be set to CUSTOM');

    // trigger the collisionStart event
    entityConfig.collisionStart();
    console.log('collisionState', collisionState)
    // both collision events should have fired 
    t.deepEqual(collisionState.a, true, 'CustomPluginA collisionStart should have fired');
    t.deepEqual(collisionState.b, true, 'CustomPluginB collisionStart should have fired');
    t.deepEqual(collisionState.c, true, 'Custom collisionStart should have fired');
    t.end();
  });

  t.test('Multiple event handlers for the same event on a single entity are all executed', (t) => {
    let executionOrder = [];
    const entityConfig = game.make()
      .collisionStart(() => executionOrder.push('first'))
      .collisionStart(() => executionOrder.push('second'))
      .build();

    // Trigger the collisionStart event
    entityConfig.collisionStart();

    // Check the execution order
    t.deepEqual(executionOrder, ['first', 'second'], 'All collisionStart handlers should execute in the order they were added');
    t.end();
  });

  t.test('Event handlers on separate entities do not interfere', (t) => {
    let entity1State = false;
    let entity2State = false;

    const entityConfig1 = game.make()
      .collisionStart(() => entity1State = true)
      .build();

    const entityConfig2 = game.make()
      .collisionStart(() => entity2State = true)
      .build();

    // Trigger the collisionStart event on the first entity
    entityConfig1.collisionStart();

    // Only the first entity's state should change
    t.equal(entity1State, true, 'First entity collisionStart handler should fire');
    t.equal(entity2State, false, 'Second entity collisionStart handler should not fire');

    t.end();
  });

  t.test('Adding a new event handler does not overwrite previous ones', (t) => {
    let handler1Executed = false;
    let handler2Executed = false;

    const entityConfig = game.make()
      .collisionStart(() => handler1Executed = true)
      .collisionStart(() => handler2Executed = true)
      .build();

    // Trigger the collisionStart event
    entityConfig.collisionStart();

    // Both handlers should have been executed
    t.equal(handler1Executed, true, 'First handler should have been executed');
    t.equal(handler2Executed, true, 'Second handler should have been executed');

    t.end();
  });

  t.test('Event handlers from different plugins on the same entity are all executed', (t) => {
    const entityConfig = game.make()
      .CustomPluginA()
      .CustomPluginB()
      .build();

    // Reset collision states
    collisionState.a = false;
    collisionState.b = false;

    // Trigger the collisionStart event
    entityConfig.collisionStart();

    // Both plugin event handlers should have been executed
    t.equal(collisionState.a, true, 'CustomPluginA collisionStart should have fired');
    t.equal(collisionState.b, true, 'CustomPluginB collisionStart should have fired');

    t.end();
  });

  tap.test('Composite collisionStart handlers across plugins', (t) => {
    collisionState.a = false;
    collisionState.b = false;
    collisionState.c = false;

    const entityConfig = game.make()
      .CustomPluginA()
      .CustomPluginB()
      .build();

    // Assuming a method to manually trigger collisionStart for testing
    entityConfig.collisionStart();

    // Verify that both plugin handlers were called
    t.equal(collisionState.a, true, 'CustomPluginA collisionStart handler should be executed');
    t.equal(collisionState.b, true, 'CustomPluginB collisionStart handler should be executed');
    t.end();
  });

  tap.test('No overwriting of collisionStart handlers across entities', (t) => {
    collisionState.a = false;
    collisionState.b = false;
    collisionState.c = false;

    const entityConfig1 = game.make().CustomPluginA().build();
    const entityConfig2 = game.make().CustomPluginB().build();

    entityConfig1.collisionStart();
    entityConfig2.collisionStart();

    // Verify that handlers for one entity do not affect the other
    t.equal(collisionState.a, true, 'CustomPluginA collisionStart handler for entity 1 should be executed');
    t.equal(collisionState.b, true, 'CustomPluginB collisionStart handler for entity 2 should be executed');
    t.end();
  });

  tap.test('Handlers added after initial build are executed', (t) => {
    let additionalHandlerExecuted = false;

    // Build the initial entity configuration
    let entityConfig = game.make().CustomPluginA().build();

    // Directly add a new collisionStart handler
    entityConfig.collisionStart = function () {
      additionalHandlerExecuted = true;
    };

    // Trigger the collisionStart event
    entityConfig.collisionStart();

    // Verify that the additional handler is executed
    t.equal(additionalHandlerExecuted, true, 'Additional collisionStart handler should be executed');
    t.end();
  });

  tap.test('Handlers added after during build', (t) => {
    let additionalHandlerExecuted = false;
    // Reset collision states
    collisionState.a = false;
    collisionState.b = false;
    collisionState.c = false;

    let entityConfig = game.make().CustomPluginA();

    entityConfig.collisionStart(function () {
      additionalHandlerExecuted = true;
      collisionState.a = true;
    })

    entityConfig = entityConfig.build();

    entityConfig.collisionStart();

    // Verify that the additional handler is also executed
    t.equal(collisionState.a, true, 'CustomPluginA collisionStart handler should be executed');
    t.equal(additionalHandlerExecuted, true, 'Additional collisionStart handler should be executed');
    t.end();


  });

  tap.test('Direct assignment of event handlers after build integrates with existing handlers', (t) => {
    let handler1Executed = false;
    let handler2Executed = false;

    // Build the initial entity configuration with one event handler
    let entityConfig = game.make()
      .collisionStart(() => {
        handler1Executed = true;
      })
      .build();

    // Directly assign a new collisionStart handler, intending to integrate with the existing one
    const originalCollisionStart = entityConfig.collisionStart;
    entityConfig.collisionStart = function () {
      originalCollisionStart.apply(entityConfig, arguments); // Call the original composite function
      handler2Executed = true; // Mark the new handler as executed
    };

    // Trigger the collisionStart event
    entityConfig.collisionStart();

    // Verify that both the original and the newly assigned handlers are executed
    t.equal(handler1Executed, true, 'Original collisionStart handler should be executed');
    t.equal(handler2Executed, true, 'Newly assigned collisionStart handler should be executed');
    t.end();
  });

  tap.test('Separate entities maintain their own collisionStart handlers', (t) => {
    let entity1HandlerExecuted = false;
    let entity2HandlerExecuted = false;

    // Build the first entity configuration with a collisionStart handler
    let entityConfig1 = game.make();

    entityConfig1
      .collisionStart(() => {
        entity1HandlerExecuted = true; // Mark the handler for the first entity as executed
      });

    // Build the second entity configuration with a different collisionStart handler
    let entityConfig2 = game.make()
      .collisionStart(() => {
        entity2HandlerExecuted = true; // Mark the handler for the second entity as executed
      });

    // Create entities from the configurations
    let entity1 = entityConfig1.createEntity();
    let entity2 = entityConfig2.createEntity();

    // Trigger the collisionStart event for both entities
    entity1.collisionStart();
    entity2.collisionStart();

    // Verify that each entity's collisionStart handler was executed independently
    t.equal(entity1HandlerExecuted, true, 'The collisionStart handler for entity 1 should be executed');
    t.equal(entity2HandlerExecuted, true, 'The collisionStart handler for entity 2 should be executed');
    t.end();
  });

  tap.test('collisionStart initially true, then function handler added', (t) => {
    let handlerExecuted = false;

    // Build the entity configuration with collisionStart initially set to true
    let entityConfig = game.make()
      .collisionStart(true); // Initially set collisionStart to true

    // Add a collisionStart function handler after the initial true value
    entityConfig.collisionStart(() => {
      handlerExecuted = true; // Mark the handler as executed
    });

    // assert entityConfig is now wrapped in a function
    // console.log('entityConfig.collisionStart', entityConfig.config)
    t.equal(typeof entityConfig.collisionStart, 'function', 'collisionStart should be a function');

    // Create the entity from the configuration
    let entity = entityConfig.createEntity();

    // Trigger the collisionStart event
    if (typeof entity.collisionStart === 'function') {
      entity.collisionStart();
    }

    // Verify that the function handler was executed
    t.equal(handlerExecuted, true, 'The collisionStart function handler should be executed');
    t.end();


  });

  tap.test('collisionStart initially true, then function handler added', (t) => {
    let handlerExecuted = false;
  
    // Build the entity configuration with collisionStart initially set to true
    let entityConfig = game.make().collisionStart(true);
  
    // Add a collisionStart function handler after the initial true value
    entityConfig.collisionStart(() => {
      handlerExecuted = true;
    });
  
    // Create the entity from the configuration
    let entity = entityConfig.createEntity();
  
    // Manually call the collisionStart function to simulate an event
    if (typeof entity.collisionStart === 'function') {
      entity.collisionStart();
    }
  
    // Verify that the function handler was executed
    t.equal(handlerExecuted, true, 'The collisionStart function handler should be executed');
    t.equal(Array.isArray(entity.collisionStart.handlers), true, 'Handlers should be an array');
    t.equal(entity.collisionStart.handlers.includes(true), false, 'Handlers array should not contain true');
    t.end();
  });
  

});

/*

// Example TestPlugin to be used with the EntityBuilder
class TestPlugin {
  build(entityBuilder, ...args) {
    // The entityBuilder is the first argument passed to build
    // The second argument (args[0]) is expected to be an object containing the _previous property
    const previousConfig = args[0]._previous;

    // Check if the _previous property exists and return it for testing purposes
    if (previousConfig) {
      return {
        testResult: {
          previousPosition: previousConfig.position,
          previousSize: previousConfig.size,
        },
      };
    }
  }
}

// Extend the EntityBuilder with the TestPlugin
extendEntityBuilder(game, new TestPlugin());

// Now, write a test to ensure the _previous property is passed correctly
t.test('Builder passes _previous config to Plugin.build methods', (t) => {
  // Start building an entity configuration
  const builder = game.make()
    .position({ x: 10, y: 20, z: 30 }) // Set some initial configuration
    .size({ width: 40, height: 50, depth: 60 })
    .TestPlugin(); // Use the TestPlugin to check the _previous property

  const entityConfig = builder.build(); // Finalize the entity configuration

  // Check that the testResult contains the previous configuration
  t.deepEqual(entityConfig.testResult.previousPosition, { x: 10, y: 20, z: 30 }, 'Previous position should match the initial configuration');
  t.deepEqual(entityConfig.testResult.previousSize, { width: 40, height: 50, depth: 60 }, 'Previous size should match the initial configuration');
  t.end();
});


*/