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

tap.test('game class', (t) => {

  t.test('createEntity() function - good data', (t) => {
    const entityId = 1;
    const entity = game.createEntity({
      id: entityId,
      type: 'TEST',
      width: 33,
      height: 44,
      radius: 55,
      position: { x: 10, y: 20 }
      
    });

    t.equal(game.getComponent(entityId, 'position').x, 10);
    t.equal(game.getComponent(entityId, 'position').y, 20);

    t.equal(game.getComponent(entityId, 'width'), 33);
    t.equal(game.getComponent(entityId, 'height'), 44);
    t.equal(game.getComponent(entityId, 'radius'), 55);
    
    t.equal(game.getComponent(entityId, 'type'), 'TEST');
    t.equal(entity.id, entityId);
    t.end();
  });

  t.test('createEntity() function - bad data should throw', (t) => {

    let failed = false;
    let errMessage = null;
    try {
      let ent =  game.createEntity({
        id: 1,
        type: 'TEST',
        position: { x: NaN, y: 20 }
      });
  
    } catch (err) {
      failed = true;
      errMessage = err.message;

    }

    t.equal(failed, true);
    t.equal(errMessage, 'Invalid position for entity');
    t.end();
  });
 
  t.test('removeEntity() function', (t) => {
    const entityId = 3;
    game.createEntity({
      id: entityId,
      type: 'TEST',
      position: { x: 10, y: 20 }
    });
    
    game.removeEntity(entityId);

    const pendingRemoval = game.getEntity(entityId);
    t.equal(pendingRemoval.destroyed, true);

    game.gameTick();
    game.systems['entity'].cleanupDestroyedEntities();


    const removedEntity = game.getEntity(entityId);
    t.equal(removedEntity, null);
    t.end();
  });

});
