import tap from 'tape';
import { Game } from '../Game.js';
import PhysicsMatter from '../plugins/physics-matter/MatterPhysics.js';
import Entity from '../plugins/entity/Entity.js';
import EntityInput from '../plugins/entity-input/EntityInput.js';
import SnapshotManager from '../plugins/snapshot-manager/SnapshotManager.js';
import Graphics from '../plugins/graphics/Graphics.js';

const game = new Game({
  loadDefaultPlugins: false,
  msgpack: false,
  deltaCompression: false,
  protobuf: false,
  deltaEncoding: true,
  isClient: false
});

game.use(new PhysicsMatter());
game.use(new Entity());
game.use(new EntityInput());
game.use(new SnapshotManager());
game.use(new Graphics());

tap.test('Basic Texture Tests', (t) => {
  t.test('Can get null texture on empty entity', (t) => {
    let texture = game.getTexture({});
    t.ok(texture === null, 'Texture should be null');
    t.end();
  });

});