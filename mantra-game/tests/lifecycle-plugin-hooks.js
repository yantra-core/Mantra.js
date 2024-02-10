import tap from 'tape';
import { Game } from '../Game.js';
import Client from '../plugins/client/Client.js';
import Schema from '../plugins/schema/Schema.js';
import PhysicsMatter from '../plugins/physics-matter/MatterPhysics.js';
import Entity from '../plugins/entity/Entity.js';
import EntityInput from '../plugins/entity-input/EntityInput.js';
import SnapshotManager from '../plugins/snapshot-manager/SnapshotManager.js';
import Bullet from '../plugins/bullet/Bullet.js';
import sinon from 'sinon';

const game = new Game({
  isServer: true,
  loadDefaultPlugins: false,
  msgpack: false,
  deltaCompression: false,
  protobuf: false,
  deltaEncoding: true
});

game.use(new Client());
game.use(new Schema());
game.use(new PhysicsMatter());
game.use(new Entity());
game.use(new EntityInput());
game.use(new SnapshotManager());
game.use(new Bullet());


tap.test('Lifecycle hooks - custom plugin methods', (t) => {
  const lifecycle = game.lifecycle;
  console.log(game.lifecycle)

  //lifecycle.clearAllHooks();

  let _before_Bullet_fireBullet = false,
    _after_Bullet_fireBullet = false;

  let beforeEntId = null,
    afterEntId = null;

  // plugin names are hooked with underscore to separate the namespace from internal hooks
  lifecycle.addHook('before_bullet_fireBullet', (entityId, bulletConfig) => {
    _before_Bullet_fireBullet = true;
    beforeEntId = entityId;
    // set the bulletConfig to something else
    bulletConfig.width = 111;
  });

  lifecycle.addHook('after_bullet_fireBullet', (entityId) => {
    _after_Bullet_fireBullet = true;
    afterEntId = entityId;
  });

  game.start(function () {

    console.log(game.lifecycle)

    // create a player
    let player = game.createEntity();

    // have that player fire a bullet
    let b = game.systems.bullet.fireBullet(player.id);

    t.ok(_before_Bullet_fireBullet, 'before_Bullet_fireBullet hook should have been triggered');
    t.ok(_after_Bullet_fireBullet, 'after_Bullet_fireBullet hook should have been triggered');

    t.ok(beforeEntId === player.id, 'before_Bullet_fireBullet hook should have been triggered with the correct entityId');
    t.ok(afterEntId === player.id, 'after_Bullet_fireBullet hook should have been triggered with the correct entityId');

    t.ok(b.width === 111, 'bullet width should have been modified by the hook');

    // not stopping the game loop RAF?
    game.stop();
    game.localGameLoopRunning = false;
    t.end();

    // why is this needed? will CI still pass?
    // see above comment of game not stopping, check localGameLoop.js
    process.exit(0);

  });

});