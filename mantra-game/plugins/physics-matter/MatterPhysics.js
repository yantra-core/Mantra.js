// MatterPhysics.js - Marak Squires 2023
import Matter from 'matter-js';
import PhysicsInterface from './PhysicsInterface.js';

class MatterPhysics extends PhysicsInterface {
  constructor(config) {
    super();

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

  init (game) {

    this.engine = Matter.Engine.create()
    this.engine.gravity.x = 0;
    this.engine.gravity.y = 0;
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
          let maxSpeed = 10;
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
          if (this.game.isClient && this.game.onlineMode && entity.type === 'PLAYER' && entity.id !== window.currentPlayerId) {
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
            if (this.game.localGameLoopRunning || entity.type === 'BULLET') {
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
        game.emit('collisionActive', { pair, bodyA, bodyB })
        callback(pair, bodyA, bodyB);
      }
    });
  }

  collisionEnd(game, callback) {
    Matter.Events.on(game.engine, 'collisionEnd', (event) => {
      for (let pair of event.pairs) {
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;
        game.emit('collisionEnd', { pair, bodyA, bodyB })
        callback(pair, bodyA, bodyB);
      }
    });
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