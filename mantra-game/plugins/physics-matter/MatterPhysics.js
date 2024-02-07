// MatterPhysics.js - Marak Squires 2023
import Matter from 'matter-js';
import PhysicsInterface from './PhysicsInterface.js';
import Collisions from '../collisions/Collisions.js';

import initEngine from './lib/initEngine.js';
import collisionStart from './lib/collisionStart.js';
import collisionActive from './lib/collisionActive.js';
import collisionEnd from './lib/collisionEnd.js';

import onAfterUpdate from './lib/onAfterUpdate.js';
import setBodySize from './lib/setBodySize.js';
import lockedProperties from './lib/lockedProperties.js';
import limitSpeed from './lib/limitSpeed.js';
import setGravity from './lib/setGravity.js';

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
    this.useWorker = false; // not yet available through config

    this.dimension = 2;

    this.Matter = Matter;

    this.initEngine = initEngine.bind(this);

    //
    // collisionStart is used for initial collision detection ( like bullets or mines or player ship contact )
    //
    // collisionActive is used for continuous collision detection ( like touching a planet )
    //
    // collisionEnd is used for when a collision ends ( after an active and started collision is no longer happening )
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
    this.setGravity = setGravity.bind(this);

    this.wrapMethods();

  }

  wrapMethods() {
    const methodNames = [
      'collisionStart',
      'collisionActive',
      'collisionEnd',
      // 'onAfterUpdate',
      'setBodySize',
      'lockedProperties',
      'limitSpeed',
      'addToWorld',
      'updateEngine',
      'setGravity',
      'setVelocity',
      'setPosition',
      'setRotation',
      'applyForce'
      // Add other method names here...
    ];
    let that = this;
    methodNames.forEach(methodName => {
      const originalMethod = this[methodName];
      this[methodName] = (...args) => {
        if (this.useWorker) {
          // Delegate to worker
          // console.log('calling worker method', methodName, args)
          this.postMessageToWorker(methodName, args);
        } else {
          // Call the original method
          // console.log('calling original method', methodName, args)
          return originalMethod.call(that, ...args);
        }
      };
    });
  }

  initWorkerMode() {
    this.worker = new Worker('worker-matter.js');
    this.worker.onmessage = this.handleWorkerMessage.bind(this);

    // Send a message to the worker to initialize the engine
    this.postMessageToWorker('initEngine', { config: this.game.config });
  }

  postMessageToWorker(action, data) {
    this.worker.postMessage({ action, data });
  }

  handleWorkerMessage(event) {
    const { action, ...messageData } = event.data;
    switch (action) {
      case 'engineInitialized':
        console.log('Engine initialized in worker');
        game.physicsReady = true;

        break;
      case 'engineUpdated':
        // Handle engine updated message, such as syncing state back to the main thread entities
        //console.log('Engine updated in worker', event.data.worldState);
        this.onAfterUpdate(event.data.worldState);
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

    // TODO: register as system, takes some consideration to make collision event namespaces "internal" as to not collide
    // game.systemsManager.addSystem('physics', this);

    //
    // Set gravity defaults if missing from game config
    //
    if (typeof game.config.gravity === 'undefined') {
      game.config.gravity = { x: 0, y: 0 };
    }

    if (typeof game.config.gravity.x === 'undefined') {
      game.config.gravity.x = 0;
    }

    if (typeof game.config.gravity.y === 'undefined') {
      game.config.gravity.y = 0;
    }

    game.physics = this;

    if (this.useWorker) {
      // Experimental support for running matter as web worker, close to working, see code comments
      this.initWorkerMode();
    } else {
      this.initDirectMode();
    }

  }

  initDirectMode() {
    let game = this.game;
    this.initEngine(game.config);

    let that = this;

    Matter.Events.on(this.engine, 'afterUpdate', function (event) {

      let worldState = [];
      //
      // REMARK: TODO: remove this O(n) by allowing afterUpdate to accept single body instead of array
      //
      /*
      for (const body of event.source.world.bodies) {

        if (body.isSleeping !== true && body.myEntityId) {
          let bodyState = {
            id: body.id,
            myEntityId: body.myEntityId,
            position: body.position,
            angle: body.angle,
            velocity: body.velocity,
            angularVelocity: body.angularVelocity,
            isSleeping: body.isSleeping,
            isStatic: body.isStatic,
            isSensor: body.isSensor,
            positionPrev: body.positionPrev,
            parts: body.parts
          };
          worldState.push(bodyState);
        }
      }
      */

      that.onAfterUpdate(event);
    });

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
  addToWorld(body) {
    Matter.World.add(this.engine.world, body);
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