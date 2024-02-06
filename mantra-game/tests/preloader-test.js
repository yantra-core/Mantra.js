import tap from 'tape';
import sinon from 'sinon';
import { Game } from '../Game.js';

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

let game;

tap.test('Preloader unit tests', (t) => {
  t.test('preloader is available on a new game', (t) => {
    game = new Game({ loadDefaultPlugins: false });
    t.ok(game.preloader, 'game has a preloader');
    t.end();
  });

  t.test('preloader can load an image', async (t) => {
    const mockUrl = 'mock-image-url';
    game.preloader.addAsset(mockUrl, 'image', 'placeholder');
    console.log(game.preloader.assets)

    t.ok(game.preloader.assets.length > 0, 'asset was added to preloader');
    t.ok(!game.preloader.assets[0].loaded, 'asset has not yet been loaded');

    // Mock the appendChild to ensure it's called
    const appendSpy = sinon.spy(document.body, 'appendChild');

    await game.preloader.loadAll();

    t.ok(appendSpy.called, 'appendChild was called');
    appendSpy.restore(); // Clean up the spy

    // check that the image was loaded
    t.ok(game.preloader.assets.length > 0, 'asset count remains the same');
    t.ok(game.preloader.assets[0].loaded, 'asset is now loaded');

    t.end();
  });

  t.test('preloader retrieves an asset by key', (t) => {
    const testKey = 'testAsset';
    game.preloader.addAsset('mock-url', 'image', testKey);
    const retrievedAsset = game.preloader.getItem(testKey);
    t.equal(retrievedAsset.key, testKey, 'correct asset was retrieved by key');
    t.end();
  })

  t.test('preloader handles loading multiple assets', async (t) => {
    // Add multiple assets
    game.preloader.addAsset('mock-url-1', 'image', 'asset1');
    game.preloader.addAsset('mock-url-2', 'image', 'asset2');

    await game.preloader.loadAll();

    // Verify all assets are marked as loaded
    const allLoaded = game.preloader.assets.every(asset => asset.loaded);
    t.ok(allLoaded, 'all assets are loaded');
    // Remark: decouple tests with new Preloader per test when required
    t.ok(game.preloader.assets.length === 4, 'multiple assets were added to the preloader');
    t.end();
  });

  t.test('preloader will emit preloader::loaded event when all assets are loaded', async (t) => {
    const loadedSpy = sinon.spy();
    game.on('preloader::loaded', loadedSpy);
    game.preloader.addAsset('mock-url-3', 'image', 'asset3');

    await game.preloader.loadAll();

    t.ok(loadedSpy.called, 'preloader::loaded event was emitted');
    t.end();
  })
  
  t.test('preloader can load a custom format', async (t) => {
    /*
    game.preloader.createLoader('model-fbx', async (url)=>{
      
    }); //*/
    game.preloader.createLoader('model-fbx', loaderSpy);
    const loaderSpy = sinon.spy();
    // Add multiple assets
    game.preloader.addAsset('mock-url-1', 'model-fbx', 'asset1');
    game.preloader.addAsset('mock-url-2', 'model-fbx', 'asset2');
  
    await game.preloader.loadAll();
  
    // Verify all assets are marked as loaded
    const allLoaded = game.preloader.assets.every(asset => asset.loaded);
    t.ok(allLoaded, 'all assets are loaded');
    t.same(loaderSpy.callCount, 2, 'the loader was called once for each asset');
    // Remark: decouple tests with new Preloader per test when required
    //t.ok(game.preloader.assets.length === 4, 'multiple assets were added to the preloader');
    t.end();
  });

});

/* TODO: better behavior for preload fails, current behavior is to not throw error

t.test('preloader handles asset loading failure', async (t) => {
    // Override the Image mock to simulate an error
    global.Image = class extends global.Image {
      constructor() {
        super();
        setTimeout(() => this.onerror && this.onerror(), 0);
      }
    };

    game.preloader.addAsset('invalid-url', 'image', 'invalidAsset');
    try {
      await game.preloader.loadAll();
      t.fail('should have thrown an error for failed asset loading');
    } catch (error) {
      t.pass('loading failure was correctly handled');
    } finally {
      // Reset the Image mock to its original state for subsequent tests
      global.Image = class extends global.Image {
        constructor() {
          super();
          setTimeout(() => this.onload && this.onload(), 0);
        }
      };
    }
    t.end();
  });

  */