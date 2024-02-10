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
// before.handleInput
//
tap.test('Lifecycle hooks - before.handleInput', (t) => {
  const lifecycle = game.lifecycle;
  lifecycle.clearAllHooks();

  let trigger = false;

  // Define a test hook
  lifecycle.addHook('before.handleInput', (entityId, input, sequence) => {
    trigger = true;
    console.log('before.handleInput hook triggered', entityId, input, sequence);
  });
  
  let player = game.createEntity();

  let entityInputSystem = game.systemsManager.getSystem('entity-input');
  entityInputSystem.handleInputs(player.id, {
    controls: { SPACE: true }
  }, 1);


  t.ok(trigger, 'before.handleInput hook should have been triggered');
  
  t.end();
});

//
// after.handleInput
//
tap.test('Lifecycle hooks - after.handleInput', (t) => {
  const lifecycle = game.lifecycle;
  lifecycle.clearAllHooks();

  let trigger = false;

  // Define a test hook
  lifecycle.addHook('after.handleInput', (entityId, input, sequence) => {
    trigger = true;
    console.log('after.handleInput hook triggered', entityId, input, sequence);
  });
  
  let player = game.createEntity();

  let entityInputSystem = game.systemsManager.getSystem('entity-input');
  entityInputSystem.handleInputs(player.id, {
    controls: { SPACE: true }
  }, 1);

  t.ok(trigger, 'before.handleInput hook should have been triggered');
  
  t.end();

});
