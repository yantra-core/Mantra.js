import Component from '../../Component/Component.js';
import SystemsManager from '../../System/SystemsManager.js';

// Game instances are event emitters
import eventEmitter from '../eventEmitter.js';

// Game tick, called once per tick from game loop
import gameTick from '../gameTick.js';

// Game loops, TODO: make game loops plugins / configurable
// Local game loop is for single machine games ( no networking )
import localGameLoop from '../localGameLoop.js';
// Online game loop is for multiplayer games ( networking )
import onlineGameLoop from '../onlineGameLoop.js';

import Lifecycle from './Lifecycle.js';

// Action Rate Limiter, suitable for any Systems action that should be rate limited
import ActionRateLimiter from '../../Component/ActionRateLimiter.js';
import TimersComponent from '../../Component/TimersComponent.js';

// Game local data storage
import storage from '../storage/storage.js';

// Loads plugins from config, can be disabled with gameConfig.loadDefaultPlugins = false
import loadPluginsFromConfig from '../loadPluginsFromConfig.js';

import Preloader from "./Preloader.js";

// Utility function for loading external assets
import loadScripts from '../util/loadScripts.js';
import loadCSS from '../util/loadCSS.js';

import switchWorlds from '../switchWorlds.js';
import createDefaultPlayer from '../createDefaultPlayer.js';

export default function construct(game, plugins = []) {

  // fetch the gamegame.config from localStorage
  let localData = storage.getAllKeysWithData();

  // Remark: We could merge game data back into the game.config / game.data

  // set the last local start time
  storage.set('lastLocalStartTime', Date.now());

  // Keeps a clean copy of current game state
  // Game.data scope can be used for applying game.configuration settings while game is running
  // Game.game.config scope is expected to be "immutablish" and should not be modified while game is running
  game.data = {
    width: game.config.width,
    height: game.config.height,
    FPS: 60,
    fieldOfView: game.config.fieldOfView, // global for game, not camera specific
    camera: {
      follow: game.config.camera.follow,
      currentZoom: game.config.camera.startingZoom,
    },
    chunks: {}
  };

  if (typeof game.data.camera.follow === 'undefined') {
    game.data.camera.follow = true;
  }

  if (typeof game.data.camera.currentZoom === 'undefined') {
    game.data.camera.currentZoom = 1;
  }

  console.log("Mantra starting...");

  // Define the scriptRoot variable for loading external scripts
  // To support demos and CDN based Serverless Games, we default scriptRoot to yantra.gg
  game.scriptRoot = 'https://yantra.gg/mantra';
  game.assetRoot = 'https://yantra.gg/mantra';

  // Could be another CDN or other remote location
  // For local development, try game.scriptRoot = './';
  if (game.config.options.scriptRoot) {
    console.log("Mantra is using the follow path as it's root:", game.config.options.scriptRoot)
    game.scriptRoot = game.config.options.scriptRoot;
  }

  if (game.config.options.assetRoot) {
    console.log("Mantra is using the follow path as it's asset root:", game.config.options.assetRoot)
    game.assetRoot = game.config.options.assetRoot;
  }

  console.log(`new Game(${JSON.stringify(game.config, true, 2)})`);

  // Bind eventEmitter methods to maintain correct scope
  game.on = eventEmitter.on.bind(eventEmitter);
  game.off = eventEmitter.off.bind(eventEmitter);
  game.once = eventEmitter.once.bind(eventEmitter);
  game.emit = eventEmitter.emit.bind(eventEmitter);
  game.onAny = eventEmitter.onAny.bind(eventEmitter);
  game.offAny = eventEmitter.offAny.bind(eventEmitter);
  game.listenerCount = eventEmitter.listenerCount.bind(eventEmitter);
  game.listeners = eventEmitter.listeners;
  game.emitters = eventEmitter.emitters;

  // Bind loadScripts from util
  game.loadScripts = loadScripts.bind(game);
  // Bind loadCSS from util
  game.loadCSS = loadCSS.bind(game);

  game.switchWorlds = switchWorlds.bind(game);

  // game.bodyMap = {};
  game.systems = {};
  game.storage = storage;

  game.snapshotQueue = [];

  game.lifecycle = new Lifecycle(game);

  game.tick = 0;

  // Keeps track of array of worlds ( Plugins with type="world" )
  // Each world is a Plugin and will run in left-to-right order
  // The current default behavior is single world, so worlds[0] is always the current world
  // Game.use(worldInstance) will add a world to the worlds array, running worlds in left-to-right order
  // With multiple worlds running at once, worlds[0] will always be the root world in the traversal of the world tree
  // TODO: move to worldManager
  game.worlds = []

  // Game settings
  game.width = game.config.width;
  game.height = game.config.height;

  // Remark: Currently, only (1) physics engine is supported at a time
  // If we want to run multiple physics engines, we'll want to make game array
  // game.physics = [];

  game.changedEntities = new Set();
  game.removedEntities = new Set();
  game.pendingRender = new Set();

  // spatial tree
  game.deferredEntities = {};

  // Preloader, for loading assets in client
  const preloader = new Preloader(game);
  game.preloader = preloader;


  game.queuedAssets = {};

  game.isClient = game.config.isClient;
  game.isEdgeClient = game.config.isEdgeClient;
  game.isServer = game.config.isServer;

  game.localGameLoopRunning = false;
  game.onlineGameLoopRunning = false;

  game.currentPlayerId = null;

  // ComponentManager.js? If so, what does it do and is it needed for our ECS?
  // Remark: I don't think we need to explicitly define components, we can just add them as needed
  game.components = {
    type: new Component('type', game),           // string type, name of Entity
    destroyed: new Component('destroyed', game), // boolean, if true, entity is pending destroy and will be removed from game
    position: new Component('position', game),   // object, { x: 0, y: 0, z: 0 }
    velocity: new Component('velocity', game),
    rotation: new Component('rotation', game),
    mass: new Component('mass', game),
    density: new Component('density', game),
    width: new Component('width', game),
    height: new Component('height', game),
    depth: new Component('depth', game),
    // Remark: height, width, depth are being removed in favor of size
    size: new Component('size', game),
    radius: new Component('radius', game),
    isSensor: new Component('isSensor', game),
    owner: new Component('owner', game),
    inputs: new Component('inputs', game),
    items: new Component('items', game),
    hasInventory: new Component('hasInventory', game),
    sutra: new Component('sutra', game),
    // meta property allows for arbitrary data to be attached to an entity
    // you should *not* use meta for any high-frequency data updates as it is not optimized for that
    // if you find yourself needing to put a larger amount of data in meta, consider creating a new component
    meta: new Component('meta', game),

    // boolean flag for if the entity is a collectable
    // collectable entities go into items[] of the entity when they collide
    collectable: new Component('collectable', game),

  };

  // define additional components for the game
  game.components.color = new Component('color', game);
  game.components.health = new Component('health', game);
  game.components.target = new Component('target', game);
  game.components.lifetime = new Component('lifetime', game);
  game.components.creationTime = new Component('creationTime', game);
  game.components.BulletComponent = new Component('BulletComponent', game);
  game.components.graphics = new Component('graphics', game);
  game.components.lockedProperties = new Component('lockedProperties', game);
  game.components.actionRateLimiter = new ActionRateLimiter('actionRateLimiter', game);

  // TODO: add body component and remove game.bodyMap[] API

  game.components.timers = new TimersComponent('timers', game);
  game.components.yCraft = new Component('yCraft', game);
  game.components.text = new Component('text', game);
  game.components.style = new Component('style', game);
  game.components.collisionActive = new Component('collisionActive', game);
  game.components.collisionStart = new Component('collisionStart', game);
  game.components.collisionEnd = new Component('collisionEnd', game);

  // stores a location to teleport to when the entity is touched
  game.components.exit = new Component('exit', game);

  // stores the creation tick time of the entity ( which game tick the entity was created )
  game.components.ctick = new Component('ctick', game);

  // Systems Manager
  game.systemsManager = new SystemsManager(game);

  // Graphics rendering pipeline
  game.graphics = [];

  game.gameTick = gameTick.bind(game);
  game.localGameLoop = localGameLoop.bind(game);
  game.onlineGameLoop = onlineGameLoop.bind(game);
  game.loadPluginsFromConfig = loadPluginsFromConfig.bind(game);
  game.createDefaultPlayer = createDefaultPlayer.bind(game);
  game.createPlayer = createDefaultPlayer.bind(game);

  // keeps track of game.use('PluginStringName') async loading
  // game.start() will wait for all plugins to be loaded before starting
  // game means any plugins which are game.use('PluginStringName') will "block" the game from starting
  game.loadingPluginsCount = 0;
  // game.plugins represents the initial plugins the Game wil have access to
  // subsequent plugins will be loaded dynamically with game.use()
  game.plugins = plugins;

  // game._plugins represents all plugin instances that have been loaded
  game._plugins = {};

  game.loadedPlugins = [];
  // load default plugins
  if (game.config.loadDefaultPlugins) {
    game.loadPluginsFromConfig({
      physics: game.config.physics,
      graphics: game.config.graphics,
      collisions: game.config.collisions,
      keyboard: game.config.keyboard,
      mouse: game.config.mouse,
      gamepad: game.config.gamepad,
      editor: game.config.editor,
      sutra: game.config.sutra,
      lifetime: game.config.lifetime,
      defaultMovement: game.config.defaultMovement
    });
  }

}