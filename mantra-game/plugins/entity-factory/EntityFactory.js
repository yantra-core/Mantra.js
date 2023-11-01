// TODO: decouple matter.js from EntityFactory
// todo: make this entity-factory plugin
import Entity from '../../Entity/Entity.js';

class EntityFactory {
  constructor() {

    //this.game = game;
    this.nextEntityId = 0;

    this.preCreateEntityHooks = [];
    this.postCreateEntityHooks = [];
    this.preUpdateEntityHooks = [];
    this.postUpdateEntityHooks = [];

  }

  init (game) {

    // bind game scope to this.game
    this.game = game;

    this.game.systemsManager.addSystem('entityFactory', this);

    // Bind some methods to parent Game scope for convenience
    // The most useful and common System methods are expected to be bound to Game
    // This allows developers to customcraft a clean Game API based on their needs
    this.game.createEntity = this.createEntity.bind(this);
    this.game.removeEntity = this.removeEntity.bind(this);
    this.game.getEntity = this.getEntity.bind(this);
    this.game.getEntities = this.getEntities.bind(this);
    this.game.updateEntity = this.updateEntity.bind(this);
    this.game.inflateEntity = this.inflateEntity.bind(this);

  }

  cleanupDestroyedEntities() {
    const destroyedComponentData = this.game.components.destroyed.data;
    for (let entityId in destroyedComponentData) {
      if (destroyedComponentData[entityId]) {

        // Remove entity from physics world
        let body = this.game.bodyMap[entityId];
        if (body) {
          //this.game.physics.removeFromWorld(this.game.engine, this.game.bodyMap[entityId]);
        } else {
          console.log('no body found for entity', entityId, 'cannot remove from world');
        }
        // Delete associated components for the entity using Component's remove method
        for (let componentType in this.game.components) {
          this.game.components[componentType].remove(entityId);
        }

        // Delete the entity from bodyMap
        delete this.game.bodyMap[entityId];


      }
    }
  }

  getEntity(entityId) {
    if (!this.game.bodyMap[entityId]) return null;

    const entity = {
      id: entityId
    };

    // Iterate over all registered components and fetch their data if available
    for (const componentType in this.game.components) {
      const componentData = this.game.getComponent(entityId, componentType);
      if (componentData) {
        entity[componentType] = componentData;
      }
    }

    return entity;
  }

  removeEntity(entityId) {
    let ent = this.game.getEntity(entityId);
    // console.log(this.game.bodyMap)
    this.game.removedEntities.add(entityId)

    if (ent && this.game.systems.mesh && ent.mesh) {
      this.game.systems.mesh.removeMesh(entityId);
    }

    let body = this.game.bodyMap[entityId];
    if (body) {
      this.game.components.destroyed.set(entityId, true);
      // We'll actually remove the entity in cleanupDestroyedEntities() function
    }
  }

  getEntities() {
    const entities = {};

    for (const entityId in this.bodyMap) { // Remark: This assumes all entities are physics bodies, will need to changes this later
      entities[entityId] = this.getEntity(entityId);
    }

    return entities;
  }

  updateEntity(entityData) {

    // console.log(this.game)
    // let allBodies = this.game.physics.Composite.allBodies(this.game.engine.world);
    //console.log('bodyMap', this.game.bodyMap)

    const entityId = entityData.id;

    let fullState = this.game.getEntity(entityId);

    // if the state doesn't exist, return error
    if (!fullState) {
      console.log('This should not happen, if a new state came in it should be created');
      return;
    }

    // Remove destroyed entities
    if (entityData.destroyed) {
      this.removeEntity(entityId);
      return;
    }

    // can we remove the bullet check here? it shouldn't be sent if its not needed?
    if (entityData.position /*&& entityData.id !== window.currentPlayerId*/) { // client-side prediction flag
      // Online Mode: Incremental position updates
      this.game.components.position.set(entityId, { x: entityData.position.x, y: entityData.position.y });
    }

    if (typeof entityData.rotation !== 'undefined') {
      this.game.components.rotation.set(entityId, entityData.rotation);
    }

  }

  createEntity(config) {

    this.preCreateEntityHooks.forEach(fn => fn(entityData));

    let entityId = this._generateId();

    let defaultConfig = {
      id: entityId,
      position: { x: 0, y: 0 },
      velocity: { x: 0, y: 0 },
      rotation: 0,
      mass: 100,
      density: 100,
      health: 100,
      lifetime: Infinity,
      isStatic: false,
      isSensor: false,
      owner: 'server',
      destroyed: false,
      type: 'PLAYER'
    };

    // merge config with defaultConfig
    config = { ...defaultConfig, ...config };

    entityId = config.id;
    const entity = new Entity(entityId);

    const { type, position, mass, density, velocity, isSensor, isStatic, width, height, radius, health, owner, lifetime } = config;
    let { x, y } = position;

    // Using game's API to add components
    // alert(type)
    this.game.addComponent(entityId, 'type', type || 'PLAYER');
    this.game.addComponent(entityId, 'position', position);
    this.game.addComponent(entityId, 'velocity', velocity);
    this.game.addComponent(entityId, 'rotation', config.rotation);
    this.game.addComponent(entityId, 'mass', mass);
    this.game.addComponent(entityId, 'density', density);
    this.game.addComponent(entityId, 'health', health);
    this.game.addComponent(entityId, 'width', width);
    this.game.addComponent(entityId, 'height', height);
    this.game.addComponent(entityId, 'radius', radius);

    this.game.addComponent(entityId, 'owner', owner);
    this.game.addComponent(entityId, 'lifetime', lifetime);
    this.game.addComponent(entityId, 'destroyed', false);
    this.game.addComponent(entityId, 'creationTime', Date.now());  // Current time in milliseconds
    this.game.addComponent(entityId, 'isSensor', isSensor);
    this.game.addComponent(entityId, 'isStatic', isStatic);

    const triangleVertices = [
      { x: x, y: y - 32 },
      { x: x - 32, y: y + 32 },
      { x: x + 32, y: y + 32 }
    ];

    // replace with physics.addBody()
    const body = this.game.physics.Bodies.fromVertices(x, y, triangleVertices, {
      mass: mass,
      isSensor: isSensor,
      isStatic: isStatic,
      inertia: Infinity,
      density: density,
      restitution: 0
    });

    body.myEntityId = entityId;
    this.game.physics.addToWorld(this.game.engine, body);
    this.game.bodyMap[entityId] = body;

    if (velocity && (velocity.x !== 0 || velocity.y !== 0)) {
      this.game.physics.setVelocity(body, velocity);
    }

    if (position) {
      this.game.physics.setPosition(body, position);
    }

    this.postCreateEntityHooks.forEach(fn => fn(entity));

    // get updated entity with components
    let updatedEntity = this.game.getEntity(entityId);

    // TODO: move to BulletPlugin
    if (type === 'BULLET') {
      // set friction to 0 for bullets
      // this.game.physics.setFriction(body, 0);
      // TODO: make this config with defaults
      body.friction = 0;
      body.frictionAir = 0;
      body.frictionStatic = 0;

    }

    return updatedEntity;
  }

  inflateEntity (entityData) { // TODO: ensure creator_json API can inflate without mesh / client deps

    let game = this.game;

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
      if (game.systems.mesh) {
        // TODO: createMesh needs to be createGraphic, and use pipeline to create for all graphics interfaces
        let mesh = game.systems.mesh.createMesh(entityData);
        game.components.mesh.set(entityData.id, mesh);
      }
      return;
    }

    // a local copy of the state exists, update it
    game.updateEntity(entityData);
    
    let updated = game.getEntity(entityData.id);

    if (game.systems.mesh) {
      // if there is no mesh, create one
      if (!updated.mesh) {
        // TODO: createMesh needs to be createGraphic, and use pipeline to create for all graphics interfaces
        let mesh = game.systems.mesh.createMesh(entityData);
        game.components.mesh.set(entityData.id, mesh);
      } else {
        game.updateGraphic(updated);
      }
    }

  }

  _generateId() {
    return this.nextEntityId++;
  }
}

export default EntityFactory;

/* refactor to use this pattern */
/*
import Entity from './Entity.js';
const entity = new Entity(entityId);

class CustomPhysicsFactory {
  // Add methods as per the physics library
  createBody(entityConfig) {
    // Mantra specicfic implementation
  }

  updateBody(body) {
    // Mantra specicfic implementation
  }

  setPosition(body) {
    // Mantra specicfic implementation
    // setPosition() is in matter.js could be diff elsewhere
  }

  // ... other methods for managing physics bodies
}


*/
