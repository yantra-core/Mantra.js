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

import plugins from './plugins.js';

class Game {
  constructor({ 
    isClient,
    isServer = false,
    loadPlugins = true, // will auto-load default plugins based on default config if true
    width = 1600,
    height = 900,
    physics = 'matter',
    graphics = ['babylon'],
    collisions,
    keyboard = true,
    mouse = true,
    isOfflineMode,
    options } = {}) {

    // config scope for convenience
    const config = {
      isClient,
      isServer,
      loadPlugins,
      width,
      height,
      physics,
      graphics,
      collisions,
      keyboard,
      mouse,
      isOfflineMode,
      options
    };

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
      type: new Component('type'),           // string type, name of Entity
      destroyed: new Component('destroyed'), // boolean, if true, entity is pending destroy and will be removed from game
      position: new Component('position'),   // object, { x: 0, y: 0, z: 0 }
      velocity: new Component('velocity'),
      rotation: new Component('rotation'),
      mass: new Component('mass'),
      density: new Component('density'),
      width: new Component('width'),
      height: new Component('height'),
      radius: new Component('radius'),
      owner: new Component('owner'), // is this actually required property?
    };

    // define additional components for the game
    this.components.health = new Component('health');
    this.components.target = new Component('target');
    this.components.lifetime = new Component('lifetime');
    this.components.creationTime = new Component('creationTime');
    this.components.BulletComponent = new Component('BulletComponent');
    this.components.graphics = new Component('graphics');
    this.components.lockedProperties = new Component('lockedProperties');

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

    // load default plugins
    if (loadPlugins) {
      this.loadPluginsFromConfig({
        physics,
        graphics,
        collisions,
        keyboard,
        mouse
      });
    }

  }

  loadPluginsFromConfig({ physics, graphics, collisions, keyboard, mouse }) {

    this.use(new plugins.EntityFactory())

    if (physics === 'matter') {
      this.use(new plugins.MatterPhysics());
    }

    if (physics === 'physx') {
      this.use(new plugins.PhysXPhysics());
    }

    if (collisions) {
      this.use(new plugins.Collision());
    }


    this.use(new plugins.EntityInput());
    this.use(new plugins.EntityMovement());

    if (!this.isServer) {

      if (keyboard) {
        this.use(new plugins.Keyboard(keyboard));
      }

      if (mouse) {
        this.use(new plugins.Mouse());
      }

      // TODO: move to Graphics.loadFromConfig() ?
      if (graphics) {
        if (typeof graphics === 'string') {
          graphics = [graphics];
        }

        // Ensure the gameHolder div exists
        let gameHolder = document.getElementById('gameHolder');
        if (!gameHolder) {
          gameHolder = document.createElement('div');
          gameHolder.id = 'gameHolder';
          document.body.appendChild(gameHolder); // Append to the body or to a specific element as needed
        }

        this.use(new plugins.Graphics()); // camera configs
        if (graphics.includes('babylon')) {
          this.use(new plugins.BabylonGraphics());
        }
        if (graphics.includes('css')) {
          this.use(new plugins.CSSGraphics());
        }
        if (graphics.includes('phaser')) {
          this.use(new plugins.PhaserGraphics());
        }
      }
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

  addSystem (systemName, system) {
    return this.systemsManager.addSystem(systemName, system);
  }

  getSystem(systemName) {
    return this.systemsManager.getSystem(systemName);
  }

  updateGraphic (entityData) {
    this.graphics.forEach(function(graphicsInterface){
      graphicsInterface.updateGraphic(entityData);
    });
  }
  
  // loads external js script files sequentially
  loadScripts(scripts, finalCallback) {
    const loadScript = (index) => {
      if (index < scripts.length) {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = scripts[index];
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