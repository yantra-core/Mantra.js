// Game.js

// Entity Component System
// TODO: we have Entity.js do we even use it in Game scope? I think only EntityFactory uses it?
import Component from './Component/Component.js';
import SystemsManager from './System/SystemsManager.js';

// Snapshots
import SnapshotManager from './plugins/snapshots/SnapShotManager/SnapshotManager.js';

import eventEmitter from './lib/eventEmitter.js';
import localGameLoop from './lib/localGameLoop.js';
import onlineGameLoop from './lib/onlineGameLoop.js';

// Main game loop / game tick
import gameTick from './lib/gameTick.js';

// Plugins
import loadPluginsFromConfig from './lib/loadPluginsFromConfig.js';
import plugins from './plugins.js';

class Game {
  constructor({
    isClient,
    isServer = false,
    loadDefaultPlugins = true, // will auto-load default plugins based on default config if true
    width = 1600,
    height = 900,
    physics = 'matter',
    graphics = ['babylon'],
    collisions,
    camera = 'follow',
    keyboard = true,
    mouse = true,
    lifetime = true,
    isOfflineMode,
    options = {}} = {}) {

    // config scope for convenience
    const config = {
      isClient,
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
      lifetime,
      isOfflineMode,
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

    this.on = eventEmitter.on;
    this.off = eventEmitter.off;
    this.emit = eventEmitter.emit;
    this.onAny = eventEmitter.onAny;

    this.bodyMap = {};
    this.systems = {};

    this.snapshotQueue = [];

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
    this.isServer = isServer;

    this.localGameLoopRunning = false;
    this.onlineGameLoopRunning = false;

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

    this.plugins = plugins;
    // load default plugins
    if (loadDefaultPlugins) {
      this.loadPluginsFromConfig({
        physics,
        graphics,
        collisions,
        keyboard,
        mouse,
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

  use(pluginInstance) {
    pluginInstance.init(this, this.engine, this.scene);
    return this;
  }

  addComponent(entityId, componentType, data) {
    if (!this.components[componentType]) {
      this.components[componentType] = new Component(componentType);
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

  updateGraphic(entityData) {
    this.graphics.forEach(function (graphicsInterface) {
      graphicsInterface.updateGraphic(entityData);
    });
  }

  // TODO: move to separate function
  // Loads external js script files sequentially
  loadScripts(scripts, finalCallback) {
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