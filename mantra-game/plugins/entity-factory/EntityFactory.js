// TODO: decouple matter.js from EntityFactory, see code comments
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

  init(game) {

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
          // i think we need to uncomment this?
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

    if (ent && this.game.systems.graphics && ent.graphics) {
      this.game.systems.graphics.removeGraphic(entityId);
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

    if (entityData.position) {
      // If position is not lockedProperties, use the new value from entityData
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
      body: true,
      shape: 'triangle',
      position: { x: 0, y: 0 },
      velocity: { x: 0, y: 0 },
      rotation: 0,
      mass: 100,
      density: 100,
      health: 100,
      height: 100,
      width: 100,
      lifetime: Infinity,
      maxSpeed: 9999,
      isStatic: false,
      isSensor: false,
      restitution: 0,
      owner: 'server',
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

    const { type, position, mass, density, velocity, isSensor, isStatic, lockedProperties, width, height, radius, shape, maxSpeed, health, owner, lifetime } = config;
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

    // iterate through props of lockedProperties and for each prop we find, use as key name
    // to lookup the current entity value and set it to the lockedProperties value
    // we will later reference this lockedProperties value when updating the entity
    if (lockedProperties) {
      console.log("Processing lockedProperties properties");
      for (let key in lockedProperties) {
        let currentVal = this.game.components[key].get(entityId);
        if (currentVal !== undefined && currentVal !== null) {
          if (typeof lockedProperties[key] === 'object' && !Array.isArray(lockedProperties[key])) {
            // If lockedProperties[key] is an object, iterate through its keys
            for (let subKey in lockedProperties[key]) {
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
    } else {
      this.game.bodyMap[entityId] = {
        id: entityId
      }

    }

    this.postCreateEntityHooks.forEach(fn => fn(entity));

    // get updated entity with components
    let updatedEntity = this.game.getEntity(entityId);

    return updatedEntity;
  }

  inflateEntity(entityData) { // TODO: ensure creator_json API can inflate without graphics / client deps

    let game = this.game;

    // takes outside state and performs update/destroy/create depending
    // on the current local state of the entity and incoming state

    // if the incoming state is pending destroy, just remove it immediately and return
    if (entityData.destroyed === true) {
      game.removeEntity(entityData.id);
      game.removeGraphic(entityData.id);
      return;
    }

    // this isn't a destroyed state, attempt to get a copy of the local state by id
    let localEntity = game.getEntity(entityData.id);

    if (!localEntity) {
      // no local copy of the state exists, create a new entity
      let ent = game.createEntity(entityData);
    } else {
      // a local copy of the state exists, update it
      game.updateEntity(entityData);
    }

    let updated = game.getEntity(entityData.id);
    if (game.systems.graphics) {

      // if there are no graphics, create them
      if (!updated.graphics) {
        game.createGraphic(entityData);
      } else {
        game.updateGraphic(updated);
      }
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
        body = this.game.physics.Bodies.fromVertices(config.position.x, config.position.y, triangleVertices, commonBodyConfig);
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

}


*/
