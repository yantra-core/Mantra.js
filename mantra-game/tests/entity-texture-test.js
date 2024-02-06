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

tap.test('Entity Texture Tests', (t) => {

  t.test('Preload the textures to use for entity', async (t) => {

    game.preloader.addAsset('mock-url-1', 'image', 'asset1');
    game.preloader.addAsset('mock-url-2', 'image', 'asset2');

    await game.preloader.loadAll();

    // Verify all assets are marked as loaded
    const allLoaded = game.preloader.assets.every(asset => asset.loaded);
    t.ok(allLoaded, 'all assets are loaded');

  });

  t.test('createEntity() function - texture as string', (t) => {
    const entityId = 1;
    const entity = game.createEntity({
      id: entityId,
      type: 'TEST',
      texture: 'asset1',
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

    // asset the texture as string value
    t.equal(game.getComponent(entityId, 'texture'), 'asset1');

    t.end();
  });


  /*
  t.test('createEntity() function - texture as sprite and sprite sheet', (t) => {
    const entity = game.createEntity({
      id: entityId,
      type: 'TEST',
      texture: {

      },
      width: 33,
      height: 44,
      radius: 55,
      position: { x: 10, y: 20 }
    });


    t.end();
  });
  */

});