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
// beforeHandleInput
//
tap.test('Lifecycle hooks - beforeHandleInput', (t) => {
  const lifecycle = game.lifecycle;
  lifecycle.clearAllHooks();

  let trigger = false;

  // Define a test hook
  lifecycle.addHook('beforeHandleInput', (entityId, input, sequence) => {
    trigger = true;
    console.log('beforeHandleInput hook triggered', entityId, input, sequence);
  });
  
  let player = game.createEntity();

  let entityInputSystem = game.systemsManager.getSystem('entity-input');
  entityInputSystem.handleInputs(player.id, {
    controls: { SPACE: true }
  }, 1);


  t.ok(trigger, 'beforeHandleInput hook should have been triggered');
  
  t.end();
});

//
// afterHandleInput
//
tap.test('Lifecycle hooks - afterHandleInput', (t) => {
  const lifecycle = game.lifecycle;
  lifecycle.clearAllHooks();

  let trigger = false;

  // Define a test hook
  lifecycle.addHook('afterHandleInput', (entityId, input, sequence) => {
    trigger = true;
    console.log('afterHandleInput hook triggered', entityId, input, sequence);
  });
  
  let player = game.createEntity();

  let entityInputSystem = game.systemsManager.getSystem('entity-input');
  entityInputSystem.handleInputs(player.id, {
    controls: { SPACE: true }
  }, 1);

  t.ok(trigger, 'beforeHandleInput hook should have been triggered');
  
  t.end();

});
