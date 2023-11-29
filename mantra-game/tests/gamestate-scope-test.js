import tap from 'tape';
import { Game } from '../Game.js';
import Schema from '../plugins/schema/Schema.js';
import PhysicsMatter from '../plugins/physics-matter/MatterPhysics.js';
import Entity from '../plugins/entity/Entity.js';
import EntityInput from '../plugins/entity-input/EntityInput.js';

const game = new Game({
  height: 600,
  width: 800,
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

    t.equal(entity.id, entityId);

    // check that game.data contains updated view of gamestate
    const gameState = game.data;

    // entities should be stored in gamestate.ents._
    // this is special scope with array lookup by global entity id
    t.equal(gameState.ents._[entityId].position.x, 10);
    t.equal(gameState.ents._[entityId].position.y, 20);

    console.log('gameState.ents[entity.type]', gameState.ents[entity.type])
    // entity by type should be stored in gamestate.ents[entity.type]
    t.equal(Object.keys(gameState.ents[entity.type]).length, 1);

    // gameState should contain important metadata about the game world
    t.equal(gameState.width, 800);
    t.equal(gameState.height, 600);
    t.equal(gameState.FPS, 60);

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

    // get reference to entity from gamestate
    const gameState = game.data;
    const entity = gameState.ents._[entityId];

    // check that game.data contains updated view of gamestate
    t.equal(entity.position.x, 10);
    t.equal(entity.position.y, moved.y);

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

    // get reference to entity from gamestate
    const gameState = game.data;
    const entity = gameState.ents._[entityId];

    // find the entity in gameState.ents.TEST array by checking data.id
    const entityByType = gameState.ents.TEST.find(ent => ent.id === entityId);

    // check that game.data contains updated view of gamestate
    t.equal(entity, undefined);
    t.equal(entityByType, undefined);

    t.equal(removedEntity, null);
    t.end();
  });

  t.end();
});