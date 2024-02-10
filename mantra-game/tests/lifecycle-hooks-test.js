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
  let testData = null;

  // Define a test hook
  lifecycle.addHook('beforeCreateEntity', (entityData) => {
    entityData.name = 'Mutated Entity';
    return entityData;
  });

  // Define test entity data
  const mutatedEntityData = { name: 'Mutated Entity' };

  // unit test use lifecycle.triggerHook
  let ent = lifecycle.triggerHook('beforeCreateEntity', mutatedEntityData);

  // Assertions
  t.same(ent.name, mutatedEntityData.name, 'beforeCreateEntity hook should modify testData');
  t.end();
});

tap.test('Lifecycle hooks - Sequence of multiple hooks', (t) => {
  const lifecycle = game.lifecycle; // Assuming game.lifecycle is an instance of LifecycleHooks

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

  let ent = lifecycle.triggerHook('beforeCreateEntity', entityData);

  // Expected modifications after all hooks have run
  const expectedModifications = ['first', 'second', 'third'];

  // Assertions
  t.same(ent.meta.modifications, expectedModifications, 'Hooks should modify data in sequence');
  t.end();
});

// Test triggering a hook that has no callbacks
tap.test('Lifecycle hooks - Trigger hook without callbacks', (t) => {
  const lifecycle = game.lifecycle;
  const consoleWarnSpy = sinon.spy(console, 'warn');

  // Trigger a hook that hasn't had any callbacks added
  lifecycle.triggerHook('nonExistentHook');

  // Assertions
  t.ok(consoleWarnSpy.called, 'Triggering a non-existent hook should call console.warn');
  consoleWarnSpy.restore(); // Clean up the spy
  t.end();
});


// Test adding a hook to a non-existent lifecycle event
tap.test('LifecycleHooks - Add hook to non-existent lifecycle event', (t) => {
  const lifecycle = game.lifecycle;
  const consoleWarnSpy = sinon.spy(console, 'warn');

  // Attempt to add a hook to a non-existent lifecycle event
  lifecycle.addHook('nonExistentEvent', () => { });

  // Assertions
  t.ok(consoleWarnSpy.called, 'Adding a hook to a non-existent lifecycle event should call console.warn');
  consoleWarnSpy.restore(); // Clean up the spy
  t.end();
});
