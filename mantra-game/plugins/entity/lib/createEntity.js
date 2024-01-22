import EntityClass from '../../../Entity/Entity.js';
// TODO: remove TimersComponent import, use game reference instead ( reduce imported code )
import TimersComponent from '../../../Component/TimersComponent.js';

export default function createEntity(config) {
  // TODO: if config is string, use that as type property with default settings
  // second argument is merged options hash
  // console.log('createEntity', config)

  let entityId = this._generateId();

  let defaultConfig = {
    id: entityId,
    name: null,
    kind: null,
    body: true,
    shape: 'triangle',
    color: null,
    position: { x: 0, y: 0, z: 0 },
    startingPosition: null,
    velocity: { x: 0, y: 0, z: 0 },
    rotation: 0,
    mass: 100,
    density: 100,
    health: Infinity,
    score: 0,
    // radius: null,
    height: 100,
    width: 100,
    depth: 10,
    lifetime: Infinity,
    maxSpeed: 9999,
    isStatic: false,
    isSensor: false,
    restitution: 0,
    items: null,
    sutra: null,
    owner: 0, // 0 = server
    inputs: null,
    destroyed: false,
    type: 'PLAYER',
    friction: 0.1,  // Default friction
    frictionAir: 0.01, // Default air friction
    frictionStatic: 0.5, // Default static friction
    lockedProperties: null, // object hash of properties that should never be updated
    actionRateLimiter: null, // object hash of state history
    timers: null, // object hash timers for TimersComponent.js
    yCraft: null, // object hash of properties for YCraft.js
    text: null,
    style: null,
    texture: null,
    collisionActive: false,
    collisionStart: true,
    collisionEnd: false
  };

  // merge config with defaultConfig
  config = { ...defaultConfig, ...config };

  entityId = config.id;
  const entity = new EntityClass(entityId);

  /*
  entity.getTimer = (timerId) => {
    return this.game.components.timers.get(entityId, timerId);
  };
  */

  if (!config.startingPosition) {
    config.startingPosition = config.position;
  }

  const { name, type, kind, position, rotation, startingPosition, mass, density, velocity, isSensor, isStatic, lockedProperties, width, height, depth, radius, shape, color, maxSpeed, health, score, items, sutra, owner, inputs, lifetime, yCraft, text, style, texture, collisionActive, collisionStart, collisionEnd } = config;
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
  this.game.addComponent(entityId, 'name', name || null);
  this.game.addComponent(entityId, 'kind', kind);
  this.game.addComponent(entityId, 'position', position);
  this.game.addComponent(entityId, 'startingPosition', startingPosition);
  this.game.addComponent(entityId, 'velocity', velocity);
  this.game.addComponent(entityId, 'rotation', rotation);
  this.game.addComponent(entityId, 'mass', mass);
  this.game.addComponent(entityId, 'density', density);
  this.game.addComponent(entityId, 'health', health);
  this.game.addComponent(entityId, 'score', score);
  this.game.addComponent(entityId, 'width', width);
  this.game.addComponent(entityId, 'height', height);
  this.game.addComponent(entityId, 'depth', depth);
  this.game.addComponent(entityId, 'radius', radius);
  this.game.addComponent(entityId, 'shape', shape);
  this.game.addComponent(entityId, 'color', color);
  this.game.addComponent(entityId, 'maxSpeed', maxSpeed);
  this.game.addComponent(entityId, 'owner', owner);
  this.game.addComponent(entityId, 'items', items);
  this.game.addComponent(entityId, 'sutra', sutra);
  this.game.addComponent(entityId, 'inputs', inputs);
  this.game.addComponent(entityId, 'lifetime', lifetime);
  this.game.addComponent(entityId, 'destroyed', false);
  this.game.addComponent(entityId, 'creationTime', Date.now());  // Current time in milliseconds
  this.game.addComponent(entityId, 'isSensor', isSensor);
  this.game.addComponent(entityId, 'isStatic', isStatic);
  this.game.addComponent(entityId, 'lockedProperties', lockedProperties);
  this.game.addComponent(entityId, 'actionRateLimiter', {});
  // TODO: clean up API contract with Component
  this.game.addComponent(entityId, 'timers', new TimersComponent('timers', entityId, this.game));
  this.game.addComponent(entityId, 'yCraft', yCraft);
  this.game.addComponent(entityId, 'text', text);
  this.game.addComponent(entityId, 'style', style);
  this.game.addComponent(entityId, 'texture', texture);
  this.game.addComponent(entityId, 'collisionActive', collisionActive);
  this.game.addComponent(entityId, 'collisionStart', collisionStart);
  this.game.addComponent(entityId, 'collisionEnd', collisionEnd);

  if (config.body) {
    let body = this.createBody({
      width: width,
      height: height,
      radius: radius,
      type: type,
      shape: shape,
      position: position,
      velocity: velocity,
      rotation: rotation,
      mass: mass,
      density: density,
      isStatic: isStatic,
      isSensor: isSensor,
      restitution: config.restitution,
      friction: config.friction,
      frictionAir: config.frictionAir,
      frictionStatic: config.frictionStatic
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
    if (typeof rotation !== 'undefined') {
      if (this.game.physics && this.game.physics.setRotation) {
        this.game.physics.setRotation(body, rotation);
      }
    }
  } else {
    // immediately add to changedEntities
    // this.game.changedEntities.add(entityId);
  }

  // Add the entity to the game entities scope
  // TODO: new Entity() should do this
  // console.log('setting id', entityId, 'to entity')
  this.game.entities.set(entityId, {
    id: entityId
  });
  // console.log("SETTING CHANGED", entityId)
  this.game.changedEntities.add(entityId);

  // get updated entity with components
  let updatedEntity = this.game.getEntity(entityId);

  if (typeof updatedEntity.pendingRender === 'undefined') {
    updatedEntity.pendingRender = {};
  }
  this.game.graphics.forEach(function (graphicsInterface) {
    updatedEntity.pendingRender[graphicsInterface.id] = true;
  });

  // updates entity in the ECS entity Map scope
  this.game.entities.set(entityId, updatedEntity);

  // updates entity in the flat game.data scope
  this.game.data.ents = this.game.data.ents || {};
  this.game.data.ents._ = this.game.data.ents._ || {};
  this.game.data.ents._[entityId] = updatedEntity;
  this.game.data.ents[updatedEntity.type] = this.game.data.ents[updatedEntity.type] || [];
  this.game.data.ents[updatedEntity.type].push(updatedEntity);

  if (this.game.systems.rbush) {
    this.game.systems.rbush.addEntity(updatedEntity);
  }

  return updatedEntity;
}