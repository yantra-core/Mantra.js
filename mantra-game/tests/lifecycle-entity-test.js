import tap from 'tape';
import { Game } from '../Game.js';
import Schema from '../plugins/schema/Schema.js';
import PhysicsMatter from '../plugins/physics-matter/MatterPhysics.js';
import Entity from '../plugins/entity/Entity.js';
import EntityInput from '../plugins/entity-input/EntityInput.js';
import SnapshotManager from '../plugins/snapshot-manager/SnapshotManager.js';
import sinon from 'sinon';

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


//
// beforeCreateEntity
//
tap.test('Lifecycle hooks - Add and trigger hook', (t) => {
  const lifecycle = game.lifecycle;
  lifecycle.clearAllHooks();

  let testData = null;

  // Define a test hook
  lifecycle.addHook('beforeCreateEntity', (entityData) => {
    entityData.name = 'Mutated Entity';
    return entityData;
  });

  // Define test entity data
  const mutatedEntityData = { name: 'Mutated Entity' };

  let ent = game.createEntity({
    name: 'Test Entity'
  });

  // Assertions
  t.same(ent.name, mutatedEntityData.name, 'beforeCreateEntity hook should modify testData');
  t.end();
});

tap.test('Lifecycle hooks - Sequence of multiple hooks', (t) => {
  const lifecycle = game.lifecycle; // Assuming game.lifecycle is an instance of LifecycleHooks
  lifecycle.clearAllHooks();

  // First hook to modify data
  lifecycle.addHook('beforeCreateEntity', (data) => {
    data.meta = data.meta || {};
    data.meta.modifications = data.meta.modifications || [];
    data.meta.modifications.push('first');
    return data;
  });

  // Second hook to further modify data
  lifecycle.addHook('beforeCreateEntity', (data) => {
    data.meta.modifications.push('second');
    return data;
  });

  // Third hook to add final modifications
  lifecycle.addHook('beforeCreateEntity', (data) => {
    data.meta.modifications.push('third');
    return data;
  });

  // Initial entity data
  let entityData = { name: 'Original Entity', meta: { modifications: [] } };

  // Assuming game.createEntity() internally calls lifecycle.triggerHook() for 'beforeCreateEntity' event
  let ent = game.createEntity(entityData);

  // Expected modifications after all hooks have run
  const expectedModifications = ['first', 'second', 'third'];

  // Assertions
  t.same(ent.meta.modifications, expectedModifications, 'Hooks should modify data in sequence');
  t.end();
});

//
// afterCreateEntity
//
tap.test('Lifecycle hooks - afterCreateEntity', (t) => {
  const lifecycle = game.lifecycle;
  lifecycle.clearAllHooks();

  // Define a test hook
  lifecycle.addHook('afterCreateEntity', (entityData) => {
    entityData.name = 'Mutated Entity';
    return entityData;
  });

  // Define test entity data
  const mutatedEntityData = { name: 'Mutated Entity' };

  let ent = game.createEntity({
    name: 'Test Entity'
  });

  // Assertions
  t.same(ent.name, mutatedEntityData.name, 'afterCreateEntity hook should modify testData');
  t.end();
});

//
// beforeUpdateEntity
//
tap.test('Lifecycle hooks - beforeUpdateEntity', (t) => {
  const lifecycle = game.lifecycle;
  lifecycle.clearAllHooks();

  // Define a test hook
  lifecycle.addHook('beforeUpdateEntity', (entityData) => {
    entityData.name = 'Mutated Entity';
    return entityData;
  });

  // Define test entity data
  const mutatedEntityData = { name: 'Mutated Entity' };

  let ent = game.createEntity({
    name: 'Test Entity'
  });

  // Update the entity
  ent.name = 'Updated Entity';
  game.updateEntity(ent);

  // Assertions
  t.same(ent.name, mutatedEntityData.name, 'beforeUpdateEntity hook should modify testData');
  t.end();
});

//
// afterUpdateEntity
//
tap.test('Lifecycle hooks - afterUpdateEntity', (t) => {
  const lifecycle = game.lifecycle;
  lifecycle.clearAllHooks();
  // Define a test hook
  lifecycle.addHook('afterUpdateEntity', (entityData) => {
    entityData.name = 'Mutated Entity';
    return entityData;
  });

  // Define test entity data
  const mutatedEntityData = { name: 'Mutated Entity' };

  let ent = game.createEntity({
    name: 'Test Entity'
  });

  // Update the entity
  ent.name = 'Updated Entity';
  let finalUpdate = game.updateEntity(ent);

  // Assertions
  t.same(finalUpdate.name, mutatedEntityData.name, 'afterUpdateEntity hook should modify testData');
  t.end();
});

//
// beforeRemoveEntity
//
tap.test('Lifecycle hooks - beforeRemoveEntity', (t) => {
  const lifecycle = game.lifecycle;

  // Create a Sinon spy
  const hookSpy = sinon.spy();

  // Define a test hook using the Sinon spy
  lifecycle.addHook('beforeRemoveEntity', hookSpy);

  // Simulate creating and then removing an entity
  let ent = game.createEntity({ name: 'Test Entity' });
  game.removeEntity(ent);

  // Assertions
  t.ok(hookSpy.called, 'beforeRemoveEntity hook should be called');
  t.end();
});

//
// afterRemoveEntity
//
tap.test('Lifecycle hooks - afterRemoveEntity', (t) => {
  const lifecycle = game.lifecycle;

  // Create a Sinon spy
  const hookSpy = sinon.spy();

  // Define a test hook using the Sinon spy
  lifecycle.addHook('afterRemoveEntity', hookSpy);

  // Simulate creating and then removing an entity
  let ent = game.createEntity({ name: 'Test Entity' });
  game.removeEntity(ent);

  // Assertions
  t.ok(hookSpy.called, 'afterRemoveEntity hook should be called');
  t.end();
});

//
// beforeCleanupRemovedEntities
//
tap.test('Lifecycle hooks - beforeCleanupRemovedEntities', (t) => {
  const lifecycle = game.lifecycle;

  // Create a Sinon spy
  const hookSpy = sinon.spy();

  // Define a test hook using the Sinon spy
  lifecycle.addHook('beforeCleanupRemovedEntities', hookSpy);

  // Simulate creating and then removing an entity
  let ent = game.createEntity({ name: 'Test Entity' });
  game.removeEntity(ent);

  // move game forward in time to trigger cleanup
  game.gameTick();

  // Assertions
  t.ok(hookSpy.called, 'beforeCleanupRemovedEntities hook should be called');
  t.end();
});

//
// afterCleanupRemovedEntities
//
tap.test('Lifecycle hooks - afterCleanupRemovedEntities', (t) => {
  const lifecycle = game.lifecycle;

  // Create a Sinon spy
  const hookSpy = sinon.spy();

  // Define a test hook using the Sinon spy
  lifecycle.addHook('afterCleanupRemovedEntities', hookSpy);

  // Simulate creating and then removing an entity
  let ent = game.createEntity({ name: 'Test Entity' });
  game.removeEntity(ent);

  // move game forward in time to trigger cleanup
  game.gameTick();

  // Assertions
  t.ok(hookSpy.called, 'afterCleanupRemovedEntities hook should be called');
  t.end();
});