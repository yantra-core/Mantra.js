//
// This file tests EntityBuilder game.make() to ensure all component properties are set correctly
//
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

tap.test('game.make() API', (t) => {
  // Test the builder's basic functionality
  t.test('Builder creates correct entity configuration', (t) => {
    const entityConfig = game.make()
      .color('red')
      .position(100, 200)
      .size(50, 60)
      .build();

    // Check that the configuration matches what was set in the builder
    // colors are stored as integers in the game, so we need to check the integer value
    t.equal(entityConfig.color, 16711680, 'Color should be set to red integer value');
    t.deepEqual(entityConfig.position, { x: 100, y: 200 }, 'Position should be set to (100, 200)');
    t.deepEqual(entityConfig.size, { width: 50, height: 60, depth: 60 }, 'Size should be set to 50x60x60');
    t.end();
  });

  // Test integration with createEntity()
  t.test('createEntity() with builder configuration', (t) => {
    const entityConfig = game.make()
      .color('red')
      .position(0, 0)
      .size(32, 32)
      .build();

    const entity = game.createEntity({
      ...entityConfig
    });

    // Check that the entity has the properties set through the builder
    t.equal(game.getComponent(entity.id, 'color'), 16711680, 'Entity color should be blue');
    t.deepEqual(game.getComponent(entity.id, 'position'), { x: 0, y: 0 }, 'Entity position should be (0, 0)');
    t.deepEqual(game.getComponent(entity.id, 'size'), { width: 32, height: 32, depth: 32 }, 'Entity size should be 32x32x32');
    t.end();
  });

  // Test integration with updateEntity()
  t.test('updateEntity() with builder configuration', (t) => {
    const entityConfig = game.make()
      .color('red')
      .position(0, 0)
      .size(32, 32)
      .build();

    const entity = game.createEntity({
      ...entityConfig
    });

    // Update the entity with the builder configuration
    game.updateEntity(entity.id, entityConfig);

    // Check that the entity has the properties set through the builder
    t.equal(game.getComponent(entity.id, 'color'), 16711680, 'Entity color should be red');
    t.deepEqual(game.getComponent(entity.id, 'position'), { x: 0, y: 0 }, 'Entity position should be (0, 0)');
    t.deepEqual(game.getComponent(entity.id, 'size'), { width: 32, height: 32, depth: 32 }, 'Entity size should be 32x32x32');
    t.end();
  });

});