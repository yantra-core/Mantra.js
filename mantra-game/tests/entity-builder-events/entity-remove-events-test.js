/* WIP 
import tap from 'tape';
import { Game } from '../../Game.js';
import Schema from '../../plugins/schema/Schema.js';
import PhysicsMatter from '../../plugins/physics-matter/MatterPhysics.js';
import Sutra from '../../plugins/sutra/Sutra.js';
import Entity from '../../plugins/entity/Entity.js';
import EntityInput from '../../plugins/entity-input/EntityInput.js';
import SnapshotManager from '../../plugins/snapshot-manager/SnapshotManager.js';
import hasStateChanged from '../../plugins/snapshot-manager/SnapshotManager/hasStateChanged.js';

import Flame from '../../plugins/flame/Flame.js';
import GravityWell from '../../plugins/gravitywell/GravityWell.js';

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

tap.test('Removing Entity.onUpdate event handlers', (t) => {
  let updateState = false;

  // Define an onUpdate handler
  const onUpdateHandler = () => { updateState = true; };

  // Set up an entity with the onUpdate handler
  const entityConfig = game.make().onUpdate(onUpdateHandler);
  const entity = entityConfig.createEntity();

  // Trigger the update event to test the handler
  entity.update();

  // Verify that the onUpdate event handler was executed
  t.equal(updateState, true, 'Entity.onUpdate event handler should be executed');
  updateState = false; // Reset the state for the next test
  console.log('onUpdateHandler', entity.id ,onUpdateHandler)
  // Remove the onUpdate event handler using the original function reference
  game.removeEntityUpdateHandler(entity.id, onUpdateHandler);

  // get frech version of entity
  let updatedEntity = game.getEntity(entity.id);
  console.log('updatedEntity', updatedEntity.update)
  // Trigger the update event again after removing the handler

  updatedEntity.update.toString();
  updatedEntity.update();
  // Verify that the onUpdate event handler was not executed after removal
  t.equal(updateState, false, 'Entity.onUpdate event handler should not be executed after removal');

  t.end();
});

*/