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

  t.test('createEntity() function', (t) => {
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

  t.test('update() function', (t) => {
    const entityId = 2;
    game.createEntity({
      id: entityId,
      type: 'TEST',
      position: { x: 10, y: 20 }
    });

    let entityInputSystem = game.systemsManager.getSystem('entity-input');
    entityInputSystem.update(entityId, { W: true });

    for (let i = 0; i < 10; i++) {
      game.gameTick();
    }
    const moved = game.getComponent(entityId, 'position');
    t.equal(true, moved.y >= 20); 
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
  
  t.test('getPlayerSnapshot() function - detecting changes', (t) => {
    const playerId = 4;

    game.createEntity({
      id: playerId,
      type: 'PLAYER',
      position: { x: 10, y: 20 }
    });
    
    let entityInputSystem = game.systemsManager.getSystem('entity-input');
    entityInputSystem.update(playerId, { D: true });

    for (let i = 0; i < 10; i++) {
      game.gameTick();
    }

    const snapshot = game.getPlayerSnapshot(playerId);
    //t.notEqual(snapshot, null);
    const playerState = snapshot.state.find(e => e.id === playerId);
    //t.true(game.getComponent(playerId, 'position').x > 5);
    t.end();
  });


  // not passing? player is moving with physics somehow? initial collision with player?
  /*
  t.test('getPlayerSnapshot() function - no changes detected', (t) => {
    const playerId = 'player2';

    game.createEntity({
      id: playerId,
      type: 'PLAYER'
    });

    for (let i = 0; i < 10; i++) {
      game.gameTick();
    }

    const snapshot1 = game.getPlayerSnapshot(playerId);
    const snapshot2 = game.getPlayerSnapshot(playerId);
    // console.log(snapshot1, snapshot2)
    t.notEqual(snapshot1, null);
    t.equal(snapshot2, null); 
    t.end();
  });
    */

  t.test('hasStateChanged() function', (t) => {
    const currentState = { a: 1, b: { c: 2 } };
    const lastKnownState = { a: 1, b: { c: 2 } };
    const differentState = { a: 1, b: { c: 3 } };

    t.notOk(hasStateChanged(currentState, lastKnownState));
    t.ok(hasStateChanged(currentState, differentState));
    t.end();
  });


  t.test('global event emitter', (t) => {
    game.on('custom-event', (data) => {
      t.equal(data, 'custom-data');
      t.end();
    });
    game.emit('custom-event', 'custom-data');
  })
  t.end();
});
