// MatterPhysics.js - Marak Squires 2023
import Matter from 'matter-js';
import PhysicsInterface from './PhysicsInterface.js';
import Collisions from '../collisions/Collisions.js';

import collisionStart from './lib/collisionStart.js';
import collisionActive from './lib/collisionActive.js';
import collisionEnd from './lib/collisionEnd.js';

import onAfterUpdate from './lib/onAfterUpdate.js';
import setBodySize from './lib/setBodySize.js';
import lockedProperties from './lib/lockedProperties.js';
import limitSpeed from './lib/limitSpeed.js';

class MatterPhysics extends PhysicsInterface {

  static id = 'physics-matter';
  static removable = false;

  constructor(config) {
    super();

    this.id = MatterPhysics.id;
    this.namespace = 'physics';
    this.Vector = Matter.Vector;
    this.Body = Matter.Body;
    this.Bodies = Matter.Bodies;
    this.Composite = Matter.Composite;
    this.Events = Matter.Events;
    this.useWorker = false;

    this.dimension = 2;

    this.Matter = Matter;

    //
    // collisionStart is used for initial collision detection ( like bullets or mines or player ship contact )
    //
    // collisionActive is used for continuous collision detection ( like touching a planet )
    //
    // collisionEnd is currently not being used
    //
    // Remark: These namespaces collisionStart, collisionActive, etc, are considered from ECS perspective
    // If we register this plugin as a system these methods will be called on the system update, which is not what we want
    // In order to allow this plugin to be registered as a system, we would change these to _collisionStart, _collisionActive, etc

    this.collisionStart = collisionStart.bind(this);
    this.collisionActive = collisionActive.bind(this);
    this.collisionEnd = collisionEnd.bind(this);
    this.onAfterUpdate = onAfterUpdate.bind(this);
    this.setBodySize = setBodySize.bind(this);
    this.lockedProperties = lockedProperties.bind(this);
    this.limitSpeed = limitSpeed.bind(this);

  }

  setGravity(x = 0, y = 0) {
    // console.log('setting gravity', x, y)
    this.engine.gravity.x = x;
    this.engine.gravity.y = y;
  }

  initWorkerMode() {
    this.worker = new Worker('worker-matter.js');
    this.worker.onmessage = this.handleWorkerMessage.bind(this);

    // Send a message to the worker to initialize the engine
    this.postMessageToWorker('initEngine', { config: this.config });
  }

  postMessageToWorker(action, data) {
    this.worker.postMessage({ action, data });
  }

  handleWorkerMessage(event) {
    const { action, ...messageData } = event.data;
    switch (action) {
      case 'engineInitialized':
        console.log('Engine initialized in worker');
        break;
      case 'engineUpdated':
        // Handle engine updated message, such as syncing state back to the main thread entities
        break;
      case 'bodyCreated':
        console.log('Body created with ID:', messageData.bodyId);
        // Update your main thread entity to reference the body ID, or other relevant data
        break;
      // Handle other messages...
    }
  }

  init(game) {
    this.game = game;
    if (this.useWorker) {
      this.initWorkerMode();
    } else {
      this.initDirectMode();
    }
  }

  initDirectMode() {
    let game = this.game;
    this.engine = Matter.Engine.create()
    // game.systemsManager.addSystem('physics', this);

    // TODO: register system
    if (typeof game.config.gravity === 'undefined') {
      game.config.gravity = { x: 0, y: 0 };
    }

    if (typeof game.config.gravity.x === 'undefined') {
      game.config.gravity.x = 0;
    }

    if (typeof game.config.gravity.y === 'undefined') {
      game.config.gravity.y = 0;
    }

    this.engine.gravity.x = game.config.gravity.x;
    this.engine.gravity.y = game.config.gravity.y;
    this.world = this.engine.world;

    game.physics = this;
    game.engine = this.engine;
    game.world = this.world;

    this.game = game;

    game.physicsReady = true;

    // should this be onAfterUpdate? since we are serializing the state of the world?
    // i would assume we want that data *after* the update?
    let that = this;

    Matter.Events.on(this.engine, 'afterUpdate', function(event){
      that.onAfterUpdate(that.engine, that.game);
    });
  
    //this.onAfterUpdate(this.engine, this.onAfterUpdate);

    // TODO: configurable collision plugins
    game.use(new Collisions());
  }

  createBody(options) {
    return Matter.Body.create(options);
  }

  // Equivalent to Engine.create()
  createEngine(options) {
    return Matter.Engine.create(options);
  }

  // Equivalent to World.add()
  addToWorld(engine, body) {
    Matter.World.add(engine.world, body);
  }

  removeBody(body) {
    Matter.World.remove(this.engine.world, body);
  }

  setMass(body, mass) {
    Matter.Body.setMass(body, mass);
  }

  // Equivalent to World.remove()
  removeFromWorld(engine, body) {
    Matter.World.remove(engine.world, body);
  }

  // Equivalent to Engine.update()
  updateEngine(delta) {
    Matter.Engine.update(this.engine, delta);
  }

  // Equivalent to Bodies.rectangle()
  createRectangle(x, y, width, height, options) {
    return Matter.Bodies.rectangle(x, y, width, height, options);
  }

  // Equivalent to Body.applyForce()
  applyForce(body, position, force) {
    Matter.Body.applyForce(body, position, force);
  }

  // Custom method to get a body's position
  getBodyPosition(body) {
    return body.position;
  }

  // Custom method to get a body's velocity
  getBodyVelocity(body) {
    return body.velocity;
  }

  getBodyRotation(body) {
    return body.angle;
  }

  rotateBody(body, rotation) {
    Matter.Body.rotate(body, rotation);
  }

  onBeforeUpdate(engine, callback) {
    Matter.Events.on(engine, 'beforeUpdate', callback);
  }

  onAfterUpdate(engine, callback) {
    // Matter.Events.on(engine, 'afterUpdate', callback);
  }

  setRotation(body, rotation) {
    Matter.Body.setAngle(body, rotation);
  }

  setPosition(body, position) {
    Matter.Body.setPosition(body, position);
  }

  setVelocity(body, velocity) {
    Matter.Body.setVelocity(body, velocity);
  }

  // Remark: This may not work as expected, since the callback is not the same function reference
  // TODO: remove anonymous functions for collision handlers and have them be returned named functions
  removeCollisionStart(game, callback) {
    Matter.Events.off(this.engine, 'collisionStart', callback);
  }

  removeCollisionActive(game, callback) {
    Matter.Events.off(this.engine, 'collisionActive', callback);
  }

  removeCollisionEnd(game, callback) {
    Matter.Events.off(this.engine, 'collisionEnd', callback);
  }

  truncateToStringWithPrecision = (value, precision = 3) => {
    return value.toFixed(precision);
  };

}

export default MatterPhysics;
