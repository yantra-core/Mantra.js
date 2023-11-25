// Game.js

// Entity Component System
// TODO: we have Entity.js do we even use it in Game scope? I think only EntityFactory uses it?
import Component from './Component/Component.js';
import SystemsManager from './System/SystemsManager.js';
import Machine from './Machine/Machine.js';

import ActionRateLimiter from './Component/ActionRateLimiter.js';

// Snapshots
import SnapshotManager from './plugins/snapshots/SnapShotManager/SnapshotManager.js';

import eventEmitter from './lib/eventEmitter.js';
import localGameLoop from './lib/localGameLoop.js';
import onlineGameLoop from './lib/onlineGameLoop.js';

// Main game loop / game tick
import gameTick from './lib/gameTick.js';

// Default Game.start(fn) logic if none provided ( creates a single player and border )
import defaultGameStart from './lib/start/defaultGameStart.js';

// Plugins
import loadPluginsFromConfig from './lib/loadPluginsFromConfig.js';
import plugins from './plugins.js';

class Game {
  constructor({
    // game modes
    isClient = true,
    isEdgeClient = false,
    isServer = false,
    isOfflineMode,
    // game options
    loadDefaultPlugins = true, // auto-laods default plugins based on pluginsConfig
    width = 1600,
    height = 900,
    // game systems / auto-load based on pluginsConfig
    physics = 'matter',
    graphics = ['babylon'],
    collisions = true,
    camera = 'follow',
    keyboard = true,
    mouse = true,
    gamepad = true,
    lifetime = true,
    // data compression
    protobuf = false,
    msgpack = false,
    deltaCompression = false,
    deltaEncoding = true,
    options = {} } = {}) {

    if (isServer) {
      // override default
      isClient = false;
    }

    // config scope for convenience
    const config = {
      isClient,
      isEdgeClient,
      isServer,
      loadDefaultPlugins,
      width,
      height,
      physics,
      graphics,
      collisions,
      camera,
      keyboard,
      mouse,
      gamepad,
      lifetime,
      isOfflineMode,
      protobuf,
      msgpack,
      deltaCompression,
      deltaEncoding,
      options
    };

    this.config = config;

    // Define the scriptRoot variable for loading external scripts
    // To support demos and CDN based Serverless Games, we default scriptRoot to yantra.gg
    this.scriptRoot = 'https://yantra.gg/mantra';

    // Could be another CDN or other remote location
    // For local development, try this.scriptRoot = './';
    if (options.scriptRoot) {
      this.scriptRoot = options.scriptRoot;
    }

    console.log(`new Game(${JSON.stringify(config, true, 2)})`);

    // Bind eventEmitter methods to maintain correct scope
    this.on = eventEmitter.on.bind(eventEmitter);
    this.off = eventEmitter.off.bind(eventEmitter);
    this.once = eventEmitter.once.bind(eventEmitter);
    this.emit = eventEmitter.emit.bind(eventEmitter);
    this.onAny = eventEmitter.onAny.bind(eventEmitter);
    this.listenerCount = eventEmitter.listenerCount.bind(eventEmitter);

    this.bodyMap = {};
    this.systems = {};

    this.snapshotQueue = [];

    this.tick = 0;

    // Game settings
    this.width = width;
    this.height = height;

    // TODO: Physics pipeline
    // Remark: Currently, only (1) physics engine is supported at a time
    //  If we want to run multiple physics engines, we'll want to make this array
    // this.physics = [];

    this.changedEntities = new Set();
    this.removedEntities = new Set();

    this.isClient = isClient;
    this.isEdgeClient = isEdgeClient;
    this.isServer = isServer;

    this.localGameLoopRunning = false;
    this.onlineGameLoopRunning = false;

    this.currentPlayerId = null;

    // ComponentManager.js? If so, what does it do and is it needed for our ECS?
    // Remark: I don't think we need to explicitly define components, we can just add them as needed
    this.components = {
      type: new Component('type', this),           // string type, name of Entity
      destroyed: new Component('destroyed', this), // boolean, if true, entity is pending destroy and will be removed from game
      position: new Component('position', this),   // object, { x: 0, y: 0, z: 0 }
      velocity: new Component('velocity', this),
      rotation: new Component('rotation', this),
      mass: new Component('mass', this),
      density: new Component('density', this),
      width: new Component('width', this),
      height: new Component('height', this),
      depth: new Component('depth', this),
      radius: new Component('radius', this),
      isSensor: new Component('isSensor', this),
      owner: new Component('owner', this)
    };

    // define additional components for the game
    this.components.health = new Component('health', this);
    this.components.target = new Component('target', this);
    this.components.lifetime = new Component('lifetime', this);
    this.components.creationTime = new Component('creationTime', this);
    this.components.BulletComponent = new Component('BulletComponent', this);
    this.components.graphics = new Component('graphics', this);
    this.components.lockedProperties = new Component('lockedProperties', this);
    this.components.actionRateLimiter = new ActionRateLimiter('actionRateLimiter', this);


    // Systems Manager
    this.systemsManager = new SystemsManager(this);

    // snapshotManager doesn't seem optional as plugin, not sure game loop can run without basic snapshots interface / api
    this.snapshotManager = new SnapshotManager(this);

    // Graphics rendering pipeline
    this.graphics = [];

    // Graphics could take time to load and be ready
    // as each Graphics plugin becomes ready, this array will be populated with the plugin name
    // Game.connect() and Game.start() will wait for all Graphics to be ready before proceeding
    // Remark: We could use this same ready pattern for all Plugins / Systems
    this.graphicsReady = [];
    this.physicsReady = false;

    this.gameTick = gameTick.bind(this);
    this.localGameLoop = localGameLoop.bind(this);
    this.onlineGameLoop = onlineGameLoop.bind(this);
    this.loadPluginsFromConfig = loadPluginsFromConfig.bind(this);

    // this.plugins represents all possible plugins the Game has access to
    this.plugins = plugins;

    // this._plugins represents all plugin instances that have been loaded
    this._plugins = {};

    this.loadedPlugins = [];
    // load default plugins
    if (loadDefaultPlugins) {
      this.loadPluginsFromConfig({
        physics,
        graphics,
        collisions,
        keyboard,
        mouse,
        gamepad,
        lifetime
      });
    }


  }

  update(deltaTime) {
    // Call update method of SystemsManager, which delegate to all Systems which have an update method
    this.systemsManager.update(deltaTime);
  }

  render() {
    // Call render method of SystemsManager, which will delegate to all Graphics systems
    this.systemsManager.render();
  }

  start(cb) {
    let game = this;
    if (typeof cb !== 'function') {
      console.log('No game.start() was callback provided. Using default callback.');
      console.log("You can provide a callback to game.start() to create your game's entities and systems.");
      // Default local game start function if none provided
      cb = function () {
        defaultGameStart(game);
      };
    }

    if (!this.systems.client) {
      game.use(new plugins.Client('Bunny', game.config));
    }

    let client = this.getSystem('client');
    client.start(cb);

    /*
    // Example Machine usage
    // TODO: better integration with game lifecycle
    Machine.createMachine(game);
    Machine.sendEvent('START');
    console.log('Current State:', Machine.getCurrentState());
    game.Machine = Machine;
    Machine.loadEntities(game);
    */

  }

  stop() {
    let client = this.getSystem('client');
    client.stop();
  }

  connect(url) {
    let client = this.getSystem('client');
    client.connect(url);
  }

  disconnect() {
    let client = this.getSystem('client');
    client.disconnect();
  }

  // All Systems are Plugins, but not all Plugins are Systems
  use(pluginInstance) {
    if (typeof pluginInstance.id === 'undefined') {
      console.log('Error with pluginInstance', pluginInstance)
      throw new Error('All plugins must have a static id property');
    }
    this.loadedPlugins.push(pluginInstance.id);
    this.emit('plugin::loaded', pluginInstance.id);
    pluginInstance.init(this, this.engine, this.scene);
    this._plugins[pluginInstance.id] = pluginInstance;
    return this;
  }

  removePlugin(pluginName) {
    let plugin = this._plugins[pluginName];
    if (plugin) {
      // check to see if plugin is a system, if so remove the system
      if (this.systems[plugin.id]) {
        this.removeSystem(plugin.id);
      }
      // next see if plugin has unload method, if so call it
      if (typeof plugin.unload === 'function') {
        plugin.unload();
      }
      delete this._plugins[pluginName];
    }
  }
  
  addComponent(entityId, componentType, data) {
    if (!this.components[componentType]) {
      this.components[componentType] = new Component(componentType, this);
    }
    // Initialize an empty map for the actionRateLimiter component
    // TODO: remove this hard-coded check for actionRateLimiter
    if (componentType === 'actionRateLimiter') {
      data = new Map();
    }
    this.components[componentType].set(entityId, data);
  }
  
  getComponent(entityId, componentType) {
    return this.components[componentType] ? this.components[componentType].get(entityId) : null;
  }

  addSystem(systemName, system) {
    return this.systemsManager.addSystem(systemName, system);
  }

  getSystem(systemName) {
    return this.systemsManager.getSystem(systemName);
  }

  removeSystem(systemName) {
    return this.systemsManager.removeSystem(systemName.toLowerCase());
  }

  updateGraphic(entityData) {
    this.graphics.forEach(function (graphicsInterface) {
      graphicsInterface.updateGraphic(entityData);
    });
  }

  // allows for custom player creation logic, or default player creation logic
  createPlayer(playerConfig) {
    return new Promise((resolve, reject) => {
      console.log(this.listenerCount('player::joined'))
      if (this.listenerCount('player::joined') === 0) {
        let result = this.defaultCreatePlayer(playerConfig);
        resolve(result);
      } else {
        // Attach a one-time listener for handling the response
        this.once('player::created', (entity) => {
          resolve(entity);
        });
        // Emit the player::joined event
        this.emit('player::joined', playerConfig);
      }
    });
  }

  defaultCreatePlayer(playerConfig) {
    console.log('creating default player')

    return this.createEntity({
      type: 'PLAYER',
      shape: 'triangle',
      width: 200,
      height: 200,
      position: {
        x: 0,
        y: 0
      },
    });
  }

  setPlayerId(playerId) {
    // console.log('setting playerID', playerId)
    this.currentPlayerId = playerId;
  }

  // TODO: move to separate function
  // Loads external js script files sequentially
  loadScripts(scripts, finalCallback) {
    if (this.isServer) {
      return;
    }
    const loadScript = (index) => {
      if (index < scripts.length) {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        // Prepend the scriptRoot to the script src
        script.src = this.scriptRoot + scripts[index];
        script.onload = () => {
          console.log(`${scripts[index]} loaded`);
          loadScript(index + 1); // Load the next script
        };
        document.head.appendChild(script);
      } else {
        finalCallback(); // All scripts have been loaded
      }
    };

    loadScript(0); // Start loading the first script
  }

}

export { Game, plugins };