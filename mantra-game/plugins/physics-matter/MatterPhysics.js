// MatterPhysics.js - Marak Squires 2023
import Matter from 'matter-js';
import PhysicsInterface from './PhysicsInterface.js';
import Collisions from '../collisions/Collisions.js';

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

    this.dimension = 2;

    // TODO: add all collision events
    //
    // collisionStart is used for initial collision detection ( like bullets or mines or player ship contact )
    //
    //
    // collisionActive is used for continuous collision detection ( like touching a planet )
    ////
    // collisionEnd is currently not being used
    //

  }

  setGravity(x = 0, y = 0) {
    // console.log('setting gravity', x, y)
    this.engine.gravity.x = x;
    this.engine.gravity.y = y;
  }

  init (game) {

    this.engine = Matter.Engine.create()

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
    this.onAfterUpdate(this.engine, (event) => {

      // Remark: should this and bodyMap be replaced with a more generic mapping
      // in order to allow non-physics backed entities to exist in the game?
      for (const body of event.source.world.bodies) {

        let entity = this.game.getEntity(body.myEntityId);

        if (entity && body.isSleeping !== true && body.myEntityId) {

          //
          // Clamp max speed
          //
          let maxSpeed = 100; // TODO: move to config
          if (entity.maxSpeed) {
            maxSpeed = entity.maxSpeed;
          }
          limitSpeed(body, maxSpeed);

          //
          // Apply locked properties  ( like entity cannot move x or y position, etc )
          //
          this.lockedProperties(body);

          // If this is the client and we are in online mode,
          // do not update local physics for remote players, only update local physics for the local player
          // This may be changed in the future or through configuration
          if (this.game.isClient && this.game.onlineMode && entity.type === 'PLAYER' && entity.id !== game.currentPlayerId) {
            // In online mode, if the entity is a player and that player is not the current player, skip updating physics
            // continue; // Skip updating physics for remote players
          }

          if (this.game.isClient) {
            // this is the logic for updating *all* entities positions
            // this should probably be in entity-movement plugin
            /*            */
            // console.log(body.myEntityId, body.position)
            let ent = this.game.entities.get(body.myEntityId);
            // console.log('client ent', ent.id ,body.position)
            // console.log('this.game.localGameLoopRunning', this.game.localGameLoopRunning)
            if (this.game.localGameLoopRunning) {
              // check if body position has changed

              let bodyPosition = {
                x: truncateToStringWithPrecision(body.position.x, 3),
                y: truncateToStringWithPrecision(body.position.y, 3)
              };
              let entPosition = {
                x: truncateToStringWithPrecision(ent.position.x, 3),
                y: truncateToStringWithPrecision(ent.position.y, 3)
              }

              // TODO: add this same kind of logic for server as well?
              // delta encoding will filter this; however it would be better to do it here as well
              if (bodyPosition.x !== entPosition.x || bodyPosition.y !== entPosition.y) {
                this.game.changedEntities.add(body.myEntityId);
              }
              // TODO: rotation / velocity as well, use flag isChanged

              // check it z position is undefined on body ( 2D physics )
              // if there is no z position, check for previous z position on entity and use that
              // if there is no previous z position on entity, use 0

              let position = { x: body.position.x, y: body.position.y };
              if (typeof body.position.z === 'undefined') {
                if (typeof ent.position.z === 'undefined') {
                  position.z = 0;
                } else {
                  position.z = ent.position.z;
                }
              }

              this.game.components.velocity.set(body.myEntityId, { x: body.velocity.x, y: body.velocity.y });
              this.game.components.position.set(body.myEntityId, position);
              this.game.components.rotation.set(body.myEntityId, body.angle);
            }

            if (ent.type === 'BULLET') {
              this.game.changedEntities.add(body.myEntityId);
              this.game.components.velocity.set(body.myEntityId, { x: body.velocity.x, y: body.velocity.y });
              this.game.components.position.set(body.myEntityId, { x: body.position.x, y: body.position.y });
              this.game.components.rotation.set(body.myEntityId, body.angle);
            }

          } else {
            // this is the logic for updating *all* entities positions
            // this should probably be in entity-movement plugin

            let ent = this.game.getEntity(body.myEntityId);
            //console.log('server ent', ent)
            this.game.changedEntities.add(body.myEntityId);
            this.game.components.velocity.set(body.myEntityId, { x: body.velocity.x, y: body.velocity.y });
            this.game.components.position.set(body.myEntityId, { x: body.position.x, y: body.position.y });
            this.game.components.rotation.set(body.myEntityId, body.angle);

          }

        }

      }
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
  addToWorld(engine, body) {
    Matter.World.add(engine.world, body);
  }

  removeBody (body) {
    Matter.World.remove(this.engine.world, body);
  }

  setMass (body, mass) {
    Matter.Body.setMass(body, mass);
  }

  // Equivalent to World.remove()
  removeFromWorld(engine, body) {
    Matter.World.remove(engine.world, body);
  }

  // Equivalent to Engine.update()
  updateEngine(engine, delta) {
    Matter.Engine.update(engine, delta);
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
    Matter.Events.on(engine, 'afterUpdate', callback);
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

  collisionStart(game, callback) {
    Matter.Events.on(game.engine, 'collisionStart', (event) => {
      for (let pair of event.pairs) {
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;

        const entityIdA = bodyA.myEntityId;
        const entityIdB = bodyB.myEntityId;
    
        const entityA = this.game.getEntity(entityIdA);
        const entityB = this.game.getEntity(entityIdB);
        
        bodyA.entity = entityA;
        bodyB.entity = entityB;
        
        game.emit('collisionStart', { pair, bodyA, bodyB })
        callback(pair, bodyA, bodyB);
      }
    });
  }

  collisionActive(game, callback) {
    Matter.Events.on(game.engine, 'collisionActive', (event) => {
      for (let pair of event.pairs) {
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;
        game.emit('collision::active', { pair, bodyA, bodyB })
        callback(pair, bodyA, bodyB);
      }
    });
  }

  collisionEnd(game, callback) {
    Matter.Events.on(game.engine, 'collisionEnd', (event) => {
      for (let pair of event.pairs) {
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;
        game.emit('collision::end', { pair, bodyA, bodyB })
        callback(pair, bodyA, bodyB);
      }
    });
  }

  // Remark: This may not work as expected, since the callback is not the same function reference
  // TODO: remove anonymous functions for collision handlers and have them be returned named functions
  removeCollisionStart(game, callback) {
    Matter.Events.off(game.engine, 'collisionStart', callback);
  }

  removeCollisionActive(game, callback) {
    Matter.Events.off(game.engine, 'collisionActive', callback);
  }

  removeCollisionEnd(game, callback) {
    Matter.Events.off(game.engine, 'collisionEnd', callback);
  }

  lockedProperties(body) {
    let eId = body.myEntityId;
    let ent = this.game.getEntity(eId);
    if (ent && ent.lockedProperties) {
      if (ent.lockedProperties.position) {
        let currentPosition = body.position;
        if (typeof ent.lockedProperties.position.x === 'number') {
          currentPosition.x = ent.lockedProperties.position.x;
        }
        if (typeof ent.lockedProperties.position.y === 'number') {
          currentPosition.y = ent.lockedProperties.position.y;
        }
        Matter.Body.setPosition(body, currentPosition);
      }
    }
  }
  
}

export default MatterPhysics;

function limitSpeed(body, maxSpeed) {
  let speed = Matter.Vector.magnitude(body.velocity);
  if (speed > maxSpeed) {
    let newVelocity = Matter.Vector.mult(Matter.Vector.normalise(body.velocity), maxSpeed);
    Matter.Body.setVelocity(body, newVelocity);
  }
}



/*

class MatterPhysics extends PhysicsInterface {
  constructor(workerMode = false) {
    super();
    if (workerMode) {
      this.initWorkerMode();
    } else {
      this.initDirectMode();
    }
  }

  initWorkerMode() {
    this.worker = new Worker('matterWorker.js');
    this.worker.onmessage = this.handleWorkerMessages.bind(this);
    this.pendingRequests = new Map();
    this.requestId = 0;

    return new Proxy(this, {
      get(target, prop) {
        if (typeof target[prop] === 'function') {
          return function (...args) {
            return target.postMessageToWorker(prop, args);
          }
        }
        return target[prop];
      }
    });
  }

  initDirectMode() {
    // Here, directly bind Matter.js methods to this class
    // for example, this.createEngine = Matter.Engine.create;
    // and so on for all other methods
  }

}

// 1:1 mapping use function, not proxy, simple call to object
class MatterPhysics extends PhysicsInterface {
  constructor() {
    // ...

    if (workerMode) {
    if (isNode) {
      // Node.js environment
      const { fork } = require('child_process');
      this.worker = fork('path/to/matterWorker.js');
    } else {
      // Browser environment
      this.worker = new Worker('matterWorker.js');
    }
    this.worker.onmessage = this.handleWorkerMessages.bind(this);
    // Additional setup...
  } else {
    this.initDirectMode();
  }


  }

  handleWorkerMessages(event) {
    if (event.data.command === 'engineUpdated') {
      // Handle the updated physics state
      // Update your game entities with the new physics data
    }
  }

  createEngine(options) {
    this.worker.postMessage({ command: 'createEngine', options });
  }

  updateEngine(delta) {
    this.worker.postMessage({ command: 'updateEngine', delta });
  }

  // ... other methods
}


*/

const truncateToStringWithPrecision = (value, precision = 3) => {
  return value.toFixed(precision);
};
