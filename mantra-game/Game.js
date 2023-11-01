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

class Game {
  constructor({ isClient, width, height, isOfflineMode, plugins, options }) {

    this.on = eventEmitter.on;
    this.off = eventEmitter.off;
    this.emit = eventEmitter.emit;

    this.bodyMap = {};
    this.systems = {};

    this.snapshotQueue = [];

    // Game settings
    this.width = width || 1600;
    this.height = height || 900;

    // TODO: Physics pipeline
    // Remark: Currently, only (1) physics engine is supported at a time
    //  If we want to run multiple physics engines, we'll want to make this array
    // this.physics = [];

    this.changedEntities = new Set();
    this.removedEntities = new Set();

    this.isClient = isClient;

    this.localGameLoopRunning = false;
    this.onlineGameLoopRunning = false;

    // ComponentManager.js? If so, what does it do and is it needed for our ECS?
    // Remark: I don't think we need to explicitly define components, we can just add them as needed
    this.components = {
      type: new Component('type'),           // string type, name of Entity
      destroyed: new Component('destroyed'), // boolean, if true, entity is pending destroy and will be removed from game
      position: new Component('position'),
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
    this.components.mesh = new Component('mesh');
    this.components.graphics = new Component('graphics');

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

    this.gameTick = gameTick.bind(this);
    this.localGameLoop = localGameLoop.bind(this);
    this.onlineGameLoop = onlineGameLoop.bind(this);

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


  // TODO: can we encapsulate this into Component class?
  addComponent(entityId, componentType, data) {
    if (!this.components[componentType]) {
      this.components[componentType] = new Component(componentType);
    }
    this.components[componentType].set(entityId, data);
  }
  getComponent(entityId, componentType) {
    return this.components[componentType] ? this.components[componentType].get(entityId) : null;
  }

  // Helper method for getting a System by name
  getSystem(systemName) {
    return this.systemsManager.getSystem(systemName);
  }

  updateGraphic (entityData) {
    this.graphics.forEach(function(graphicsInterface){
      graphicsInterface.updateGraphic(entityData);
    });
  }

}

export { Game };