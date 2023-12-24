import tap from 'tape';
import { Game } from '../Game.js'; 
import GameStateManager from '../lib/gamestate/GameStateManager.js';
import plugins from '../plugins.js'; 

// Initialize the game with necessary plugins
const game = new Game({
  height: 600,
  width: 800,
  loadDefaultPlugins: false,
  msgpack: false,
  deltaCompression: false,
  protobuf: false,
  deltaEncoding: true
});

// Include necessary plugins
game.use(new plugins.Schema());
game.use(new plugins.Entity());
game.use(new plugins.EntityInput());
game.use(new plugins.SnapshotManager());
game.use(new plugins.Block({ MIN_BLOCK_SIZE: 10000 }));

// Mock storage object
const mockStorage = {
  data: {},
  set(key, value) {
    this.data[key] = value;
  },
  get(key) {
    return this.data[key] || null;
  }
};

// Initialize GameStateManager with the real game object and storage
const gameStateManager = new GameStateManager(game, mockStorage);

// Test serializing state
tap.test('toJSON should return correct string', (t) => {
  // Setup: Modify game's state
  // e.g., game.createEntity(...) or game.use(...)

  const serializedState = gameStateManager.toJSON();
  const expectedState = JSON.stringify(game.data); // Assuming game.data is the current state

  // Assertions
  t.equal(serializedState, expectedState, 'Serialized state should match game data state');

  const stateObj = JSON.parse(serializedState);
  // Assert game dimensions
  t.equal(stateObj.width, 800);
  t.equal(stateObj.height, 600);

  // Assert FPS and camera settings
  t.equal(stateObj.FPS, 60);
  t.ok(stateObj.camera.follow);
  t.equal(stateObj.camera.currentZoom, 1);

  // Assert plugins
  t.ok(stateObj.plugins.schema);
  t.ok(stateObj.plugins.entity);
  t.ok(stateObj.plugins['entity-input']);
  t.ok(stateObj.plugins['snapshot-manager']);
  t.ok(stateObj.plugins.block);
  // t.equal(stateObj.plugins.block.MIN_BLOCK_SIZE, 10000);

  t.end();
});

// Test deserializing state
tap.test('hydrate should correctly apply state to game', (t) => {
  // Create a test state
  const testState = JSON.stringify(/* a specific game state to test */);

  gameStateManager.hydrate(testState);

  // Assertions: Check if game.data reflects the deserialized state
  // e.g., t.same(game.data, /* expected state */, 'Game data should match deserialized state');

  t.end();
});

// Test saving and loading state
tap.test('saveState and loadState should persist and retrieve state', (t) => {
  // Modify game's state
  // e.g., game.createEntity(...) or game.use(...)

  gameStateManager.saveState();

  // Reset or modify game state
  // e.g., game.resetState() or alter game.data

  gameStateManager.loadState();

  // Assertions: Check if loaded state matches saved state
  // e.g., t.same(game.data, /* expected state */, 'Loaded state should match saved state');

  t.end();
});
