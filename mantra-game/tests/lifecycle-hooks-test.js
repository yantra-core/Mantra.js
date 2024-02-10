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

tap.test('Lifecycle hooks - Add and trigger hook', (t) => {
  const lifecycle = game.lifecycle;
  let testData = null;

  // Define a test hook
  lifecycle.addHook('beforeCreateEntity', (entityData) => {
    testData = entityData;
  });

  // Define test entity data
  const testEntityData = { id: 1, name: 'Test Entity' };

  // Trigger the hook
  lifecycle.triggerHook('beforeCreateEntity', testEntityData);

  // Assertions
  t.same(testData, testEntityData, 'beforeCreateEntity hook should modify testData');
  t.end();
});

// Test triggering a hook that has no callbacks
tap.test('Lifecycle hooks - Trigger hook without callbacks', (t) => {
  const lifecycle = game.lifecycle;
  // TODO: replace with sinon
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
    // TODO: replace with sinon

  const consoleWarnSpy = sinon.spy(console, 'warn');

  // Attempt to add a hook to a non-existent lifecycle event
  lifecycle.addHook('nonExistentEvent', () => {});

  // Assertions
  t.ok(consoleWarnSpy.called, 'Adding a hook to a non-existent lifecycle event should call console.warn');
  consoleWarnSpy.restore(); // Clean up the spy
  t.end();
});