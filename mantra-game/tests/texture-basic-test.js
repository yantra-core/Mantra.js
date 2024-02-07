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

    let entityData = {
      texture: 'asset1'
    };
    let texture = game.getTexture(entityData.texture);
    t.ok(texture.url === mockRoot + 'mock-url-1', 'Texture url should match');
    t.ok(texture.key === 'asset1', 'Texture key should match');
    t.end();
  });

  t.test('Can get image sprite texture from spritesheet based on entityData.texture', async (t) => {

    let gameSheet =  {
      type: 'spritesheet',
      url: '/img/game/sheets/loz_spritesheet.png',
      frameTags: {
        ayyoKey: {
          frames: [
            { x: -640, y: -656 },
          ]
        },
  
        ayyoDoor: {
          frames: [
            { x: -656, y: -656 },
          ]
        },
  
        player: {
          rate: 100,
          frames: [
            { x: -592, y: -16 },
            { x: -640, y: -16 },
            { x: -592, y: -16 },
            { x: -640, y: -16 },
            { x: -656, y: -16 },
            { x: -640, y: -16 },
            { x: -640, y: -16 },
            { x: -608, y: -16 },
  
          ]
        }

      }
    };

    game.preloader.addAsset('mock-url-3', 'spritesheet', 'game-sheet', gameSheet);

    await game.preloader.loadAll();

    // Verify all assets are marked as loaded
    const allLoaded = game.preloader.assets.every(asset => asset.loaded);
    t.ok(allLoaded, 'all assets are loaded');

    let entityData = {
      texture: {
        sheet: 'game-sheet',
        sprite: 'player'
      }
    };
    let texture = game.getTexture(entityData.texture);
    t.ok(texture.url === mockRoot + 'mock-url-3', 'Texture url should match');

    // sprite name should match with position
    t.ok(texture.sprite.x === -592, 'Texture frame x should match');
    t.ok(texture.sprite.y === -16, 'Texture frame y should match');
    t.ok(texture.sprite.name === 'player', 'Texture frame name should match');

    t.end();
  });

  t.test('Can get fbx model based on entityData.texture', async (t) => {

    let gameSheet =  {
      type: 'model',
      url: '/game/models/characterMedium.fbx'
    };

    game.preloader.loadModel = function stub () {
      return {
        // empty model, put meta here
      };
    }

    game.preloader.addAsset('mock-url-3', 'model-fbx', 'customModel', gameSheet);

    await game.preloader.loadAll();

    // Verify all assets are marked as loaded
    const allLoaded = game.preloader.assets.every(asset => asset.loaded);
    t.ok(allLoaded, 'all assets are loaded');

    let entityData = {
      texture: {
        model: 'customModel'
      }
    };
    let texture = game.getTexture(entityData.texture);
    t.ok(texture.url === mockRoot + 'mock-url-3', 'Texture url should match');
    // key should be the same as the model name
    t.ok(texture.key === 'customModel', 'Texture key should match');

    t.end();
  });


});