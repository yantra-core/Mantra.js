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
// beforeUpdate
//
tap.test('Lifecycle hooks - beforeUpdate', (t) => {
  const lifecycle = game.lifecycle;
  lifecycle.clearAllHooks();

  let ticks = 0;

  // Define a test hook
  lifecycle.addHook('beforeUpdate', (delta) => {
    ticks++;
  });

  game.gameTick();

  // 1 game tick
  t.ok(ticks === 1, 'beforeUpdate hook should not have been triggered yet');
  
  t.end();
});

//
// afterUpdate
//
tap.test('Lifecycle hooks - afterUpdate', (t) => {
  const lifecycle = game.lifecycle;
  lifecycle.clearAllHooks();

  let ticks = 0;

  // Define a test hook
  lifecycle.addHook('afterUpdate', (delta) => {
    ticks++;
  });

  game.gameTick();

  // 1 game tick
  t.ok(ticks === 1, 'afterUpdate hook should have been triggered');

  t.end();
});