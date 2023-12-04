// MANTRA - Yantra Works 2023
// Game.js - Marak Squires 2023

// Entity Component System
import Component from './Component/Component.js';
import SystemsManager from './System/SystemsManager.js';

// Game instances are event emitters
import eventEmitter from './lib/eventEmitter.js';

// Game loops
// TODO: move to plugins
// Local game loop is for single machine games ( no networking )
import localGameLoop from './lib/localGameLoop.js';
// Online game loop is for multiplayer games ( networking )
import onlineGameLoop from './lib/onlineGameLoop.js';


// Game tick, called once per tick from game loop
import gameTick from './lib/gameTick.js';

// Provides a default Game.start(fn) logic ( creates a single player and border )
// Bind to event `player::joined` to override default player creation logic
import defaultGameStart from './lib/start/defaultGameStart.js';

// Action Rate Limiter, suitable for any Systems action that should be rate limited
import ActionRateLimiter from './Component/ActionRateLimiter.js';
import TimersComponent from './Component/TimersComponent.js';

// Loads plugins from config, can be disabled with gameConfig.loadDefaultPlugins = false
import loadPluginsFromConfig from './lib/loadPluginsFromConfig.js';

// Utility function for loading external script assets
import loadScripts from './lib/util/loadScripts.js';

// The Game class is the main entry point for Mantra games
class Game {
  constructor({
    // game modes
    isClient = true,
    isEdgeClient = false,
    isServer = false,
    isOfflineMode,
    plugins = {}, // Plugin Classes that will be bound to the game instance
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

    this.data = {
      width: config.width,
      height: config.height,
      FPS: 60
    };

    // Define the scriptRoot variable for loading external scripts
    // To support demos and CDN based Serverless Games, we default scriptRoot to yantra.gg
    this.scriptRoot = 'https://yantra.gg/mantra';

    // Could be another CDN or other remote location
    // For local development, try this.scriptRoot = './';
    if (options.scriptRoot) {
      console.log("USING SCRIPT ROOT", options.scriptRoot)
      this.scriptRoot = options.scriptRoot;
    }

    console.log(`new Game(${JSON.stringify(config, true, 2)})`);

    // Bind eventEmitter methods to maintain correct scope
    this.on = eventEmitter.on.bind(eventEmitter);
    this.off = eventEmitter.off.bind(eventEmitter);
    this.once = eventEmitter.once.bind(eventEmitter);
    this.emit = eventEmitter.emit.bind(eventEmitter);
    this.onAny = eventEmitter.onAny.bind(eventEmitter);
    this.offAny = eventEmitter.offAny.bind(eventEmitter);
    this.listenerCount = eventEmitter.listenerCount.bind(eventEmitter);
    this.listeners = eventEmitter.listeners;
    this.emitters = eventEmitter.emitters;

    // Bind loadScripts from util
    this.loadScripts = loadScripts.bind(this);

    this.bodyMap = {};
    this.systems = {};

    this.snapshotQueue = [];

    this.tick = 0;

    // Game settings
    this.width = width;
    this.height = height;

    // Remark: Currently, only (1) physics engine is supported at a time
    // If we want to run multiple physics engines, we'll want to make this array
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
    this.components.health = new Component('color', this);
    this.components.health = new Component('health', this);
    this.components.target = new Component('target', this);
    this.components.lifetime = new Component('lifetime', this);
    this.components.creationTime = new Component('creationTime', this);
    this.components.BulletComponent = new Component('BulletComponent', this);
    this.components.graphics = new Component('graphics', this);
    this.components.lockedProperties = new Component('lockedProperties', this);
    this.components.actionRateLimiter = new ActionRateLimiter('actionRateLimiter', this);
    this.components.timers = new TimersComponent('timers', this);

    // Systems Manager
    this.systemsManager = new SystemsManager(this);

    // Graphics rendering pipeline
    this.graphics = [];

    this.gameTick = gameTick.bind(this);
    this.localGameLoop = localGameLoop.bind(this);
    this.onlineGameLoop = onlineGameLoop.bind(this);
    this.loadPluginsFromConfig = loadPluginsFromConfig.bind(this);

    // keeps track of game.use('PluginStringName') async loading
    // game.start() will wait for all plugins to be loaded before starting
    // this means any plugins which are game.use('PluginStringName') will "block" the game from starting
    this.loadingPluginsCount = 0;
    // this.plugins represents the initial plugins the Game wil have access to
    // subsequent plugins will be loaded dynamically with game.use()
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

  // TODO: hoist to systemsManager
  update(deltaTime) {
    // Call update method of SystemsManager, which delegate to all Systems which have an update method
    this.systemsManager.update(deltaTime);
  }

  render() {
    // Call render method of SystemsManager, which will delegate to all Graphics systems
    // TODO: should we remove this and hoist it to the systemsManager?
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
    // Wait for all systems to be ready before starting the game loop
    if (game.loadingPluginsCount > 0) {
      setTimeout(function () {
        game.start(cb);
      }, 4);
      return
    } else {
      console.log('All Plugins are ready! Starting Mantra Game Client...');

      if (game.systems.client) {
        let client = this.getSystem('client');
        client.start(cb);
      } else {
        console.log('Warning: No Client System found, will not start game loop.');
      }
    }
  }

  // TODO: move to client, let client hoist the connection logic to game
  stop() {
    let client = this.getSystem('client');
    client.stop();
  }

  connect(url) {
    let game = this;
    // Wait for all systems to be ready before starting the game loop
    if (game.loadingPluginsCount > 0) {
      setTimeout(function () {
        game.connect(url);
      }, 4);
      return
    } else {
      console.log('All Plugins are ready! Starting Mantra Game Client...');
      let client = this.getSystem('client');
      client.connect(url);
    }
  }

  disconnect() {
    let client = this.getSystem('client');
    client.disconnect();
  }

  // All Systems are Plugins, but not all Plugins are Systems
  // TODO: move to separate file
  use(pluginInstanceOrId, options = {}) {
    let game = this;

    // TODO: make this configurable
    let basePath = '/plugins/'; // Base path for loading plugins
    basePath = this.scriptRoot + basePath;
    //console.log("FOUND SCRIPT ROOT", this.scriptRoot)
    //console.log("LOADING FROM BASEPATH", basePath)
    // Check if the argument is a string (plugin ID)
    if (typeof pluginInstanceOrId === 'string') {
      const pluginId = pluginInstanceOrId;
      // Check if the plugin is already loaded or loading
      if (this._plugins[pluginId]) {
        console.log(`Plugin ${pluginId} is already loaded or loading.`);
        return this;
      }

      if (this.isServer) {
        // console.log('pluginId', pluginId, this.plugins)
        if (this.plugins[pluginId]) {
          console.log('loading plugin', pluginId, this.plugins[pluginId])
          return this.use(new this.plugins[pluginId](), options);
        }

        console.log(`Attempted to load plugin by string name "${pluginId}"on server, could not find! skipping`);
        return;
      }

      // Mark the plugin as loading
      this._plugins[pluginId] = { status: 'loading' };
      this.loadingPluginsCount++;
      this.emit('plugin::loading', pluginId);

      // Dynamically load the plugin script
      const scriptUrl = `${basePath}${pluginId}.js`;
      this.loadPluginScript(scriptUrl).then(function () {
        // The script is expected to call `game.use(pluginInstance)` after loading
        console.log(`Plugin ${pluginId} loaded.`, game.plugins, game._plugins);
        if (typeof PLUGINS === 'object') {
          //console.log('creating new instance', pluginId, PLUGINS[pluginId], PLUGINS)
          let pluginInstance = new PLUGINS[pluginId].default(options);
          game.use(pluginInstance);
          // check to see if pluginInstance is async, if so
          // we'll assume it will emit a ready event when it's ready
          if (pluginInstance.async) {
            // plugin must perform async operation before it's ready
            // plugin author *must* emit their own ready event game will not start
            // alert('plugin must perform async operation before it\'s ready');
          } else {
            game.loadingPluginsCount--;
            delete game._plugins[pluginId];
            game.emit('plugin::ready::' + pluginId, pluginInstance);
          }
        } else {
          // decrement loadingPluginsCount even if it fails
          // this means applications will attempt to load even if plugins fail
          delete game._plugins[pluginId];
          game.loadingPluginsCount--;
        }
      }).catch(function (err) {
        console.error(`Error loading plugin ${pluginId}:`, err);
        game._plugins[pluginId] = { status: 'error' };
        throw err;
      });

      return this;
    }

    // Handling plugin instances
    if (typeof pluginInstanceOrId.id === 'undefined') {
      console.log('Error with pluginInstance', pluginInstanceOrId);
      throw new Error('All plugins must have a static id property');
    }

    const pluginId = pluginInstanceOrId.id;
    this.loadedPlugins.push(pluginId);
    this.emit('plugin::loaded', pluginId);
    pluginInstanceOrId.init(this, this.engine, this.scene);
    this._plugins[pluginId] = pluginInstanceOrId;

    return this;
  }

  // Helper function to load plugin scripts
  loadPluginScript(scriptUrl) {
    console.log('loadPluginScript', scriptUrl)
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${scriptUrl}`));
      document.head.appendChild(script);
    });
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

  // TODO: move to componentManager
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

  // TODO: move to playerManager
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


}

export { Game };