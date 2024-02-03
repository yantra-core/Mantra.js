import tap from 'tape';
import { Game } from '../Game.js';
import RBush from '../plugins/rbush/RBush.js';
import Schema from '../plugins/schema/Schema.js';
import Tile from '../plugins/tile/Tile.js';
import PhysicsMatter from '../plugins/physics-matter/MatterPhysics.js';
import Entity from '../plugins/entity/Entity.js';
import EntityInput from '../plugins/entity-input/EntityInput.js';
import SnapshotManager from '../plugins/snapshot-manager/SnapshotManager.js';

const game = new Game({
  loadDefaultPlugins: false,
  msgpack: false,
  deltaCompression: false,
  protobuf: false,
  deltaEncoding: true
});

game.use(new PhysicsMatter());
game.use(new Entity());
game.use(new EntityInput());
game.use(new SnapshotManager());
game.use(new Tile());

tap.test('Tile plugin integration tests', (t) => {
  t.test('create a new tile with coordinates', (t) => {

    let tile1;

    let tileConfig = {
      kind: 'bush',
      isStatic: true
    };

    let x = 10;
    let y = 20;
    let z = -16;

    tile1 = game.systems.tile.createTile(tileConfig, x, y, z);

    t.equal(tile1.kind, 'bush');
    t.equal(tile1.position.x, 10);
    t.equal(tile1.position.y, 20);
    t.equal(tile1.position.z, -16);

    t.end();
  });

  t.test('create a new tile with coordinates and z position override', (t) => {

    let tile1;

    let tileConfig = {
      kind: 'bush',
      isStatic: true,
      z: 16
    };

    let x = 10;
    let y = 20;
    let z = -16;

    tile1 = game.systems.tile.createTile(tileConfig, x, y, z);

    t.equal(tile1.kind, 'bush');
    t.equal(tile1.position.x, 10);
    t.equal(tile1.position.y, 20);
    t.equal(tile1.position.z, 16);

    t.end();
  });

  t.test('create a new tile with custom size', (t) => {

    let tile1;

    let tileConfig = {
      kind: 'bush',
      isStatic: true,
      size: {
        width: 32,
        height: 32,
        depth: 32
      }
    };

    let x = 10;
    let y = 20;
    let z = -16;

    tile1 = game.systems.tile.createTile(tileConfig, x, y, z);

    t.equal(tile1.kind, 'bush');
    t.equal(tile1.position.x, 10);
    t.equal(tile1.position.y, 20);
    t.equal(tile1.position.z, -16);

    t.equal(tile1.width, 32);
    t.equal(tile1.height, 32);
    t.equal(tile1.depth, 32);

    t.end();
  });

});