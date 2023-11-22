// EntityFactory.js - Marak Squires 2023
import Entity from '../../Entity/Entity.js';

class EntityFactory {

  static id = 'entity-factory';
  static removable = false;

  constructor() {
    this.id = EntityFactory.id;
    this.nextEntityId = 1; // 0 is reserved for server
  }

  init(game) {

    // bind game scope to this.game
    this.game = game;

    // init a new Map to store entities
    game.entities = new Map();

    this.game.systemsManager.addSystem(this.id, this);

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

  getEntity(entityId) {
    
    if (typeof entityId === 'string') {
      entityId = parseInt(entityId); // for now, this can be removed when we switch Component.js to use Maps
    }

    if (!this.game.entities.has(entityId)) {
      return null;
    }

    const entity = {};

    // Iterate over all registered components and fetch their data if available
    for (const componentType in this.game.components) {
      const componentData = this.game.getComponent(entityId, componentType);
      if (componentData) {
        entity[componentType] = componentData;
      }
    }

    if (Object.keys(entity).length === 0) {
      return null;
    }

    entity.id = entityId;

    return entity;

  }

  removeEntity(entityId) {
    let ent = this.game.entities.get(entityId);
    if (ent && this.game.systems.graphics && ent.graphics) {
      // Is this best done here? or in the graphics plugin?
      this.game.systems.graphics.removeGraphic(entityId);
    }
    if (ent) {
      this.game.components.destroyed.set(entityId, true);
      // update the entity with the destroyed state
      let updatedEntity = this.game.getEntity(entityId);
      this.game.entities.set(entityId, updatedEntity);
    }
  }

  cleanupDestroyedEntities() {
    const destroyedComponentData = this.game.components.destroyed.data;
    for (let entityId in destroyedComponentData) {
      if (destroyedComponentData[entityId]) {
        // Removes the body from the physics engine
        if (typeof this.game.physics.removeBody === 'function') {
          // TODO: fix this
          if (this.game.bodyMap[entityId]) {
            this.game.physics.removeBody(this.game.bodyMap[entityId]);
          } else {
            console.log('No body found for entityId', entityId);
          }
        }
        // Delete associated components for the entity using Component's remove method
        for (let componentType in this.game.components) {
          this.game.components[componentType].remove(entityId);
        }
        this.game.entities.delete(entityId);
      }
    }
  }

  // Update the getEntities method to return the game.entities
  getEntities() {
    return this.game.entities;
  }

  updateEntity(entityData) {

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

    let ent = this.game.entities.get(entityId);

    // not a component property yet, just ad-hoc on client
    ent.pendingRender = {};
    this.game.graphics.forEach(function (graphicsInterface) {
      ent.pendingRender[graphicsInterface.id] = true;
    });

    if (entityData.position) {
      this.game.components.position.set(entityId, { x: entityData.position.x, y: entityData.position.y, z: entityData.position.z });
    }

    if (typeof entityData.rotation !== 'undefined') {
      this.game.components.rotation.set(entityId, entityData.rotation);
    }

  }

  createEntity(config) {
    // console.log('createEntity', config)
    let entityId = this._generateId();

    let defaultConfig = {
      id: entityId,
      body: true,
      shape: 'triangle',
      position: { x: 0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
      rotation: 0,
      mass: 100,
      density: 100,
      health: 100,
      height: 100,
      width: 100,
      depth: 10,
      lifetime: Infinity,
      maxSpeed: 9999,
      isStatic: false,
      isSensor: false,
      restitution: 0,
      owner: 0, // 0 = server
      destroyed: false,
      type: 'PLAYER',
      friction: 0.1,  // Default friction
      frictionAir: 0.01, // Default air friction
      frictionStatic: 0.5, // Default static friction
      lockedProperties: null // object hash of properties that should never be updated
    };

    // merge config with defaultConfig
    config = { ...defaultConfig, ...config };

    entityId = config.id;
    const entity = new Entity(entityId);

    const { type, position, mass, density, velocity, isSensor, isStatic, lockedProperties, width, height, depth, radius, shape, maxSpeed, health, owner, lifetime } = config;
    let { x, y } = position;

    /*
    if (typeof config.position !== 'undefined') {
      position.x = config.position.x;
      position.y = config.position.y;
    }
    */

    // console.log('position', position, 'width', width, 'height', height)
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
    this.game.addComponent(entityId, 'depth', depth);
    this.game.addComponent(entityId, 'radius', radius);
    this.game.addComponent(entityId, 'shape', shape);
    this.game.addComponent(entityId, 'maxSpeed', maxSpeed);

    this.game.addComponent(entityId, 'owner', owner);
    this.game.addComponent(entityId, 'lifetime', lifetime);
    this.game.addComponent(entityId, 'destroyed', false);
    this.game.addComponent(entityId, 'creationTime', Date.now());  // Current time in milliseconds
    this.game.addComponent(entityId, 'isSensor', isSensor);
    this.game.addComponent(entityId, 'isStatic', isStatic);
    this.game.addComponent(entityId, 'lockedProperties', lockedProperties);
 
    if (config.body) {
      let body = this.createBody(config);
      body.myEntityId = entityId;
      this.game.physics.addToWorld(this.game.engine, body);
      this.game.bodyMap[entityId] = body;
      if (velocity && (velocity.x !== 0 || velocity.y !== 0)) {
        this.game.physics.setVelocity(body, velocity);
      }
      if (position) {
        this.game.physics.setPosition(body, position);
      }
    }


    // Add the entity to the game entities scope
    // TODO: new Entity() should do this
    // console.log('setting id', entityId, 'to entity')
    this.game.entities.set(entityId, {
      id: entityId
    });

    // get updated entity with components
    let updatedEntity = this.game.getEntity(entityId);

    if (typeof updatedEntity.pendingRender === 'undefined') {
      updatedEntity.pendingRender = {};
    }
    this.game.graphics.forEach(function (graphicsInterface) {
      updatedEntity.pendingRender[graphicsInterface.id] = true;
    });

    this.game.entities.set(entityId, updatedEntity);

    return updatedEntity;
  }


  applyLockedProperties(entityId, lockedProperties) {
    // Check and apply locked properties
    if (lockedProperties) {
      console.log("Processing lockedProperties properties");
      for (let key in lockedProperties) {
        let currentVal = this.game.components[key].get(entityId);
        console.log('currentVal', currentVal, 'key', key, lockedProperties)
        if (currentVal !== undefined && currentVal !== null) {
          if (typeof lockedProperties[key] === 'object' && !Array.isArray(lockedProperties[key])) {
            // If lockedProperties[key] is an object, iterate through its keys
            console.log('lockedProperties[key]', lockedProperties[key])
            for (let subKey in lockedProperties[key]) {
              console.log('subKey', subKey, lockedProperties[key][subKey])
              if (lockedProperties[key][subKey] === true) {  // only process if the value is true
                let nestedVal = currentVal[subKey];
                if (nestedVal !== undefined && nestedVal !== null) {
                  console.log('Setting lockedProperties property', `${key}.${subKey}`, 'to', nestedVal);
                  this.game.components['lockedProperties'].set(entityId, { [key]: { [subKey]: nestedVal } });
                } else {
                  console.log('Error: No such component or invalid value for', `${key}.${subKey}`);
                }
              }
            }
          } else if (lockedProperties[key] === true) {  // if lockedProperties[key] is not an object and the value is true
            console.log('Setting lockedProperties property', key, 'to', currentVal);
            this.game.components['lockedProperties'].set(entityId, { [key]: currentVal });
          }
        } else {
          console.log('Error: No such component or invalid value for', key);
        }
      }
    }
  }

  inflateEntity(entityData) { // TODO: ensure creator_json API can inflate without graphics / client deps
    let game = this.game;
    // console.log('inflateEntity', entityData)
    // takes outside state and performs update/destroy/create depending
    // on the current local state of the entity and incoming state
    // if the incoming state is pending destroy, just remove it immediately and return
    if (entityData.destroyed === true) {
      game.removeGraphic(entityData.id);
      game.removeEntity(entityData.id);
      return;
    }

    // Check if the entity is marked for local removal
    // This could happen if client-side prediction has removed an entity,
    // and the server still has an update for it in the queue
    if (this.game.removedEntities.has(entityData.id)) {
      console.log('Skipping update for locally removed entity:', entityData.id);
      return;
    }

    // this isn't a destroyed state, attempt to get a copy of the local state by id
    let localEntity = game.entities.get(entityData.id);
    if (!localEntity) {
      // no local copy of the state exists, create a new entity
      if (typeof entityData.height === 'undefined' || typeof entityData.width === 'undefined') {
        // Remark: This shouldn't happen, there is an issue where local destroyed entities are still being considered updated
        // and the local system thinks we should create a new entity on the state update; however the state is stale and
        // the entity is already destroyed, so we do not wish to update the state, skip for now
        // TODO: we should resolve this with unit tests and ensure syncronization between server and client
        return;
      }
      game.createEntity(entityData);
    } else {
      // a local copy of the state exists, update it
      game.updateEntity(entityData);
    }

  }

  // TODO: move this to PhysicsPlugin
  createBody(config) {
    let commonBodyConfig = {
      mass: config.mass,
      isSensor: config.isSensor,
      isStatic: config.isStatic,
      inertia: Infinity,
      density: config.density,
      restitution: config.restitution,
      friction: config.friction,
      frictionAir: config.frictionAir,
      frictionStatic: config.frictionStatic
    };

    if (config.type === "BULLET") {
      config.shape = 'circle';
    }

    // console.log("CREATING NEW BODY", config)
    let body;
    switch (config.shape) {
      case 'rectangle':
        body = this.game.physics.Bodies.rectangle(config.position.x, config.position.y, config.width, config.height, commonBodyConfig);
        break;
      case 'circle':
        body = this.game.physics.Bodies.circle(config.position.x, config.position.y, config.radius, commonBodyConfig);
        break;
      case 'triangle':
      default:
        const triangleVertices = [
          { x: config.position.x, y: config.position.y - 32 },
          { x: config.position.x - 32, y: config.position.y + 32 },
          { x: config.position.x + 32, y: config.position.y + 32 }
        ];
        // TODO: add this support to PhysxPlugin
        //body = this.game.physics.Bodies.fromVertices(config.position.x, config.position.y, triangleVertices, commonBodyConfig);
        body = this.game.physics.Bodies.rectangle(config.position.x, config.position.y, config.width, config.height, commonBodyConfig);
        break;
    }

    // TODO: move to BulletPlugin ?
    if (config.type === 'BULLET') {
      // set friction to 0 for bullets
      // this.game.physics.setFriction(body, 0);
      // TODO: make this config with defaults
      body.friction = 0;
      body.frictionAir = 0;
      body.frictionStatic = 0;

    }

    return body;
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

*/
