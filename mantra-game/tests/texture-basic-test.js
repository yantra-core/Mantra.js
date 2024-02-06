import tap from 'tape';
import { Game } from '../Game.js';
import PhysicsMatter from '../plugins/physics-matter/MatterPhysics.js';
import Entity from '../plugins/entity/Entity.js';
import EntityInput from '../plugins/entity-input/EntityInput.js';
import SnapshotManager from '../plugins/snapshot-manager/SnapshotManager.js';
import Graphics from '../plugins/graphics/Graphics.js';

let mockRoot = 'http://mock-url.com/';


const game = new Game({
  loadDefaultPlugins: false,
  msgpack: false,
  deltaCompression: false,
  protobuf: false,
  deltaEncoding: true,
  isClient: false,
  options: {
    assetRoot: mockRoot
  },
});

game.use(new PhysicsMatter());
game.use(new Entity());
game.use(new EntityInput());
game.use(new SnapshotManager());
game.use(new Graphics());

// Mock the Image class
global.Image = class {
  constructor() {
    this.onload = null;
    this.onerror = null;
    this.src = '';

    // Add a simple style object
    this.style = {};

    // Simulate async loading behavior
    setTimeout(() => {
      // You could add logic here to simulate successful or failed image loading
      this.onload && this.onload();
    }, 0);
  }
};

// Mock the document object
global.document = {
  body: {
    appendChild: () => { }
  }
};


tap.test('Basic Texture Tests', (t) => {
  t.test('Can get null texture on empty entityData', (t) => {
    let texture = game.getTexture({});
    t.ok(texture === null, 'Texture should be null');
    t.end();
  });

  t.test('Can get image sprite texture based on entityData.texture', async (t) => {

    game.preloader.addAsset('mock-url-1', 'image', 'asset1');
    game.preloader.addAsset('mock-url-2', 'image', 'asset2');

    await game.preloader.loadAll();

    // Verify all assets are marked as loaded
    const allLoaded = game.preloader.assets.every(asset => asset.loaded);
    t.ok(allLoaded, 'all assets are loaded');

    console.log(' game.preloader.assets',  game.preloader.assets)
    let entityData = {
      texture: 'asset1'
    };
    let texture = game.getTexture(entityData.texture);
    t.ok(texture.url === mockRoot + 'mock-url-1', 'Texture url should match');
    t.ok(texture.key === 'asset1', 'Texture key should match');
    t.end();
  });

});