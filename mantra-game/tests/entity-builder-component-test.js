import tap from 'tape';
import { Game } from '../Game.js';
import Schema from '../plugins/schema/Schema.js';
import PhysicsMatter from '../plugins/physics-matter/MatterPhysics.js';
import Entity from '../plugins/entity/Entity.js';
import EntityInput from '../plugins/entity-input/EntityInput.js';
import SnapshotManager from '../plugins/snapshot-manager/SnapshotManager.js';
import hasStateChanged from '../plugins/snapshot-manager/SnapshotManager/hasStateChanged.js';

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


tap.test('EntityBuilder configuration', (t) => {
  // Test for basic properties
  t.test('Basic properties', (t) => {
    const entityConfig = game.make()
      .type('NPC')
      .name('Test Entity')
      .kind('Enemy')
      .build();

    t.equal(entityConfig.type, 'NPC', 'Type should be NPC');
    t.equal(entityConfig.name, 'Test Entity', 'Name should be Test Entity');
    t.equal(entityConfig.kind, 'Enemy', 'Kind should be Enemy');
    t.end();
  });

  // Test for positioning and movement
  t.test('Positioning and movement', (t) => {
    const entityConfig = game.make()
      .position(100, 200)
      .startingPosition(50, 50)
      .velocity(10, -5)
      .rotation(90)
      .build();

    t.deepEqual(entityConfig.position, { x: 100, y: 200, z: 0 }, 'Position should be (100, 200)');
    t.deepEqual(entityConfig.startingPosition, { x: 50, y: 50  }, 'Starting position should be (50, 50)');
    t.deepEqual(entityConfig.velocity, { x: 10, y: -5 }, 'Velocity should be (10, -5)');
    t.equal(entityConfig.rotation, 90, 'Rotation should be 90');
    t.end();
  });

  // Test for physical properties
  t.test('Physical properties', (t) => {
    const entityConfig = game.make()
      .mass(10)
      .density(2)
      .build();

    t.equal(entityConfig.mass, 10, 'Mass should be 10');
    t.equal(entityConfig.density, 2, 'Density should be 2');
    t.end();
  });

  // Test for health and scoring
  t.test('Health and scoring', (t) => {
    const entityConfig = game.make()
      .health(100)
      .score(50)
      .build();

    t.equal(entityConfig.health, 100, 'Health should be 100');
    t.equal(entityConfig.score, 50, 'Score should be 50');
    t.end();
  });

  // Test for dimensions and appearance
  t.test('Dimensions and appearance', (t) => {
    const entityConfig = game.make()
      .size(50, 60)
      .radius(15)
      .shape('circle')
      .color('red')
      .build();

    t.deepEqual(entityConfig.size, { width: 50, height: 60, depth: 60 }, 'Size should be 50x60x60');
    t.equal(entityConfig.radius, 15, 'Radius should be 15');
    t.equal(entityConfig.shape, 'circle', 'Shape should be circle');
    t.equal(entityConfig.color, 16711680, 'Color should be red as int');
    t.end();
  });

  // Final test for event handlers
  t.test('Event handlers', (t) => {
    const handler1 = function() {}; // Define a handler function
    const handler2 = function() {}; // Define another handler function

    const entityConfig = game.make()
      .pointerdown(handler1)
      .collisionStart(handler2)
      // Assuming collisionEnd method exists
      .collisionEnd(handler1)

    // t.equal(entityConfig.pointerdown, handler1, 'Pointerdown handler should be set');
    t.equal(typeof entityConfig.collisionStart, 'function', 'CollisionStart handler should be set');
    t.equal(typeof entityConfig.collisionEnd, 'function', 'CollisionEnd handler should be set');
    t.end();
  });

});