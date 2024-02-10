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
// before.create.entity
//
tap.test('Lifecycle hooks - Add and trigger hook', (t) => {
  const lifecycle = game.lifecycle;
  lifecycle.clearAllHooks();

  let testData = null;

  // Define a test hook
  lifecycle.addHook('before.createEntity', (entityData) => {
    entityData.name = 'Mutated Entity';
    return entityData;
  });

  // Define test entity data
  const mutatedEntityData = { name: 'Mutated Entity' };

  let ent = game.createEntity({
    name: 'Test Entity'
  });

  // Assertions
  t.same(ent.name, mutatedEntityData.name, 'before.create.entity hook should modify testData');
  t.end();
});

tap.test('Lifecycle hooks - Sequence of multiple hooks', (t) => {
  const lifecycle = game.lifecycle; // Assuming game.lifecycle is an instance of LifecycleHooks
  lifecycle.clearAllHooks();

  // First hook to modify data
  lifecycle.addHook('before.createEntity', (data) => {
    data.meta = data.meta || {};
    data.meta.modifications = data.meta.modifications || [];
    data.meta.modifications.push('first');
    return data;
  });

  // Second hook to further modify data
  lifecycle.addHook('before.createEntity', (data) => {
    data.meta.modifications.push('second');
    return data;
  });

  // Third hook to add final modifications
  lifecycle.addHook('before.createEntity', (data) => {
    data.meta.modifications.push('third');
    return data;
  });

  // Initial entity data
  let entityData = { name: 'Original Entity', meta: { modifications: [] } };

  // Assuming game.createEntity() internally calls lifecycle.triggerHook() for 'before.createEntity' event
  let ent = game.createEntity(entityData);

  // Expected modifications after all hooks have run
  const expectedModifications = ['first', 'second', 'third'];

  // Assertions
  t.same(ent.meta.modifications, expectedModifications, 'Hooks should modify data in sequence');
  t.end();
});

//
// after.create.entity
//
tap.test('Lifecycle hooks - after.create.entity', (t) => {
  const lifecycle = game.lifecycle;
  lifecycle.clearAllHooks();

  // Define a test hook
  lifecycle.addHook('after.createEntity', (entityData) => {
    entityData.name = 'Mutated Entity';
    return entityData;
  });

  // Define test entity data
  const mutatedEntityData = { name: 'Mutated Entity' };

  let ent = game.createEntity({
    name: 'Test Entity'
  });

  // Assertions
  t.same(ent.name, mutatedEntityData.name, 'after.create.entity hook should modify testData');
  t.end();
});

//
// before.update.entity
//
tap.test('Lifecycle hooks - before.update.entity', (t) => {
  const lifecycle = game.lifecycle;
  lifecycle.clearAllHooks();

  // Define a test hook
  lifecycle.addHook('before.updateEntity', (entityData) => {
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
  t.same(ent.name, mutatedEntityData.name, 'before.update.entity hook should modify testData');
  t.end();
});

//
// after.update.entity
//
tap.test('Lifecycle hooks - after.update.entity', (t) => {
  const lifecycle = game.lifecycle;
  lifecycle.clearAllHooks();
  // Define a test hook
  lifecycle.addHook('after.updateEntity', (entityData) => {
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
  t.same(finalUpdate.name, mutatedEntityData.name, 'after.update.entity hook should modify testData');
  t.end();
});

//
// before.removeEntity
//
tap.test('Lifecycle hooks - before.removeEntity', (t) => {
  const lifecycle = game.lifecycle;

  // Create a Sinon spy
  const hookSpy = sinon.spy();

  // Define a test hook using the Sinon spy
  lifecycle.addHook('before.removeEntity', hookSpy);

  // Simulate creating and then removing an entity
  let ent = game.createEntity({ name: 'Test Entity' });
  game.removeEntity(ent);

  // Assertions
  t.ok(hookSpy.called, 'before.removeEntity hook should be called');
  t.end();
});

//
// after.remove.entity
//
tap.test('Lifecycle hooks - after.remove.entity', (t) => {
  const lifecycle = game.lifecycle;

  // Create a Sinon spy
  const hookSpy = sinon.spy();

  // Define a test hook using the Sinon spy
  lifecycle.addHook('after.removeEntity', hookSpy);

  // Simulate creating and then removing an entity
  let ent = game.createEntity({ name: 'Test Entity' });
  game.removeEntity(ent);

  // Assertions
  t.ok(hookSpy.called, 'after.remove.entity hook should be called');
  t.end();
});

//
// before.cleanupRemovedEntities
//
tap.test('Lifecycle hooks - before.cleanupRemovedEntities', (t) => {
  const lifecycle = game.lifecycle;

  // Create a Sinon spy
  const hookSpy = sinon.spy();

  // Define a test hook using the Sinon spy
  lifecycle.addHook('before.cleanupRemovedEntities', hookSpy);

  // Simulate creating and then removing an entity
  let ent = game.createEntity({ name: 'Test Entity' });
  game.removeEntity(ent);

  // move game forward in time to trigger cleanup
  game.gameTick();

  // Assertions
  t.ok(hookSpy.called, 'before.cleanupRemovedEntities hook should be called');
  t.end();
});

//
// after.cleanupRemovedEntities
//
tap.test('Lifecycle hooks - after.cleanupRemovedEntities', (t) => {
  const lifecycle = game.lifecycle;

  // Create a Sinon spy
  const hookSpy = sinon.spy();

  // Define a test hook using the Sinon spy
  lifecycle.addHook('after.cleanupRemovedEntities', hookSpy);

  // Simulate creating and then removing an entity
  let ent = game.createEntity({ name: 'Test Entity' });
  game.removeEntity(ent);

  // move game forward in time to trigger cleanup
  game.gameTick();

  // Assertions
  t.ok(hookSpy.called, 'after.cleanupRemovedEntities hook should be called');
  t.end();
});