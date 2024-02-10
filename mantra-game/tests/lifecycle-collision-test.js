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
// beforeCollisionStart, beforeCollisionActive, beforeCollisionEnd
// afterCollisionStart, afterCollisionActive, afterCollisionEnd
tap.test('Lifecycle hooks - beforeHandleInput', (t) => {
  const lifecycle = game.lifecycle;
  lifecycle.clearAllHooks();

  let _beforeCollisionStart = false,
      _beforeCollisionActive = false,
      _beforeCollisionEnd = false,
      _afterCollisionStart = false,
      _afterCollisionActive = false,
      _afterCollisionEnd = false;

  //
  // Before
  //

  // start
  lifecycle.addHook('beforeCollisionStart', (entityA, entityB, pair) => {
    _beforeCollisionStart = true;
    // console.log('beforeCollisionStart hook triggered', entityA, entityB, pair);
  });

  // active
  lifecycle.addHook('beforeCollisionActive', (entityA, entityB, pair) => {
    _beforeCollisionActive = true;
    // console.log('beforeCollisionActive hook triggered', entityA, entityB, pair);
  });

  // end
  lifecycle.addHook('beforeCollisionEnd', (entityA, entityB, pair) => {
    _beforeCollisionEnd = true;
    // console.log('beforeCollisionEnd hook triggered', entityA, entityB, pair);
  });

  //
  // After
  //
  // start
  lifecycle.addHook('afterCollisionStart', (entityA, entityB, pair) => {
    _afterCollisionStart = true;
    // console.log('afterCollisionStart hook triggered', entityA, entityB, pair);
  });

  // active
  lifecycle.addHook('afterCollisionActive', (entityA, entityB, pair) => {
    _afterCollisionActive = true;
    // console.log('afterCollisionActive hook triggered', entityA, entityB, pair);
  });

  // end
  lifecycle.addHook('afterCollisionEnd', (entityA, entityB, pair) => {
    _afterCollisionEnd = true;
    // console.log('afterCollisionEnd hook triggered', entityA, entityB, pair);
  });
  
  // create two ents right next to each other
  let entA = game.createEntity({
    position: { x: 0, y: 0 },
    width: 10,
    height: 10,
    isSensor: true,
    collisionActive: true,
    collisionEnd: true
  });

  let entB = game.createEntity({
    position: { x: 0, y: 0 },
    width: 10,
    height: 10,
    isSensor: true,
    collisionActive: true,
    collisionEnd: true
  });

  game.setGravity(0, 0);

  // start
  game.gameTick();

  // active
  game.gameTick();
  
  // end 
  // separate the ents
  game.updateEntity({ id: entA.id, position: { x: -100, y: 100 } });
  // setPosition() will also work
  // game.setPosition(entA.id, { x: -100, y: 100 });

  game.gameTick();
  game.gameTick();

  t.ok(_beforeCollisionStart, 'beforeCollisionStart hook should have been triggered');
  t.ok(_beforeCollisionActive, 'beforeCollisionActive hook should have been triggered');
  t.ok(_beforeCollisionEnd, 'beforeCollisionEnd hook should have been triggered');

  t.ok(_afterCollisionStart, 'afterCollisionStart hook should have been triggered');
  t.ok(_afterCollisionActive, 'afterCollisionActive hook should have been triggered');
  t.ok(_afterCollisionEnd, 'afterCollisionEnd hook should have been triggered');
  
  t.end();
});
