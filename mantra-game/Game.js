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
  constructor({ isClient, isOfflineMode, plugins, options }) {

    this.on = eventEmitter.on;
    this.off = eventEmitter.off;
    this.emit = eventEmitter.emit;

    this.bodyMap = {};
    this.systems = {};

    this.snapshotQueue = [];

    // TODO: make that that changed entities is set when an new entity is created
    // if we always wait for the next tick of physics, we will always be one tick behind
    this.changedEntities = new Set();
    this.removedEntities = new Set();

    this.isClient = isClient;

    this.localGameLoopRunning = false;
    this.onlineGameLoopRunning = false;

    // ComponentManager.js? If so, what does it do and is it needed for our ECS?
    // either way the components should be in Game.js
    // define required components for the game
    this.components = {
      type: new Component('type'),           // string type, name of Entity
      destroyed: new Component('destroyed'), // boolean, if true, entity is pending destroy and will be removed from game
      position: new Component('position'),
      velocity: new Component('velocity'),
      rotation: new Component('rotation'),
      mass: new Component('mass'),
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

    // Systems Manager
    this.systemsManager = new SystemsManager(this);

    // snapshotManager doesn't seem optional as plugin, not sure game loop can run without basic snapshots interface / api
    this.snapshotManager = new SnapshotManager(this);

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

  inflate(entityData) { // TODO: ensure creator_json API can inflate without mesh / client deps

    let game = this;

    // takes outside state and performs update/destroy/create depending
    // on the current local state of the entity and incoming state

    // if the incoming state is pending destroy, just remove it immediately and return
    if (entityData.destroyed === true) {
      game.removeEntity(entityData.id);
      game.systems.mesh.removeMesh(entityData.id);
      return;
    }

    // this isn't a destroyed state, attempt to get a copy of the local state by id
    let localEntity = game.getEntity(entityData.id);

    if (!localEntity) {
      // no local copy of the state exists, create a new entity
      let ent = game.createEntity(entityData);
      let mesh = game.systems.mesh.createMesh(entityData);
      game.components.mesh.set(entityData.id, mesh);
      return;
    }

    // a local copy of the state exists, update it
    game.updateEntity(entityData);
    
    let updated = game.getEntity(entityData.id);

    // if there is no mesh, create one
    if (!updated.mesh) {
      let mesh = game.systems.mesh.createMesh(entityData);
      game.components.mesh.set(entityData.id, mesh);
    } else {
      game.systems.mesh.updateMesh(updated);
    }

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

}

export { Game };