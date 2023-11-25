// PhysXPhysics.js - Marak Squires 2023
// THIS FILE IS WIP - NOT COMPLETE

import PhysicsInterface from '../physics-matter/PhysicsInterface.js'

import updateEngine from './lib/updateEngine.js';
import checkForMovedBodies from './lib/checkForMovedBodies.js';

// Body methods
import applyForce from './lib/body/applyForce.js';
import applyAngularForce from './lib/body/applyAngularForce.js';
import applyTorque from './lib/body/applyTorque.js';
import rotateBody from './lib/body/rotateBody.js';
import getBodyPosition from './lib/body/getBodyPosition.js';
import getBodyRotation from './lib/body/getBodyRotation.js';
import getLinearVelocity from './lib/body/getLinearVelocity.js';

// Helpers for creating shapes
import createRectangle from './lib/shapes/createRectangle.js';
import createCircle from './lib/shapes/createCircle.js';

import quaternionToEuler from './lib/math/quaternionToEuler.js';

let scene;

var lastBox = null;

// TODO: move collisions into seperate file / plugin
// Constants for collision layers
const COLLISION_LAYER_1 = 1;
const COLLISION_LAYER_2 = 2;

class PhysXPhysics extends PhysicsInterface {
  static id = 'physics-physx';
  static removable = false;
  constructor(config) {
    super();

    this.id = PhysXPhysics.id;
    this.updateEngine = updateEngine;
    this.applyForce = applyForce;
    this.rotateBody = rotateBody;
    this.getBodyPosition = getBodyPosition;
    this.getBodyRotation = getBodyRotation;
    this.checkForMovedBodies = checkForMovedBodies;
    this.getLinearVelocity = getLinearVelocity;
    this.scene = null;
    this.lastFrame = 0;
    this.dimension = 3;
    this.physics = null;

    this.namespace = 'physics';
    //this.Vector = Matter.Vector;
    //this.Body = Matter.Body;
    this.Body = {
      applyForce: this.applyForce.bind(this),
      applyAngularForce: applyAngularForce.bind(this),
      applyTorque: applyTorque.bind(this),
      rotate: this.rotateBody.bind(this)
    };
    this.Bodies = {
      rectangle: createRectangle.bind(this),
      circle: createCircle.bind(this)
    }
    //this.Composite = Matter.Composite;
    //this.Events = Matter.Events;

    this.preUpdateListeners = [];
    this.postUpdateListeners = [];

    this.dynamicBodies = []; // This array will store your dynamic bodies

  }

  init(game) {

    game.physics = this;
    this.game = game;
    let self = this;

    game.loadScripts([
      '/physx-js-webidl.js'
    ], () => {
      PhysXObjectAvailable(function () {
        self.physXReady();
      })
    });

    // PhysXObjectAvailable may not be necessary, the PhysX() should immediately be available
    function PhysXObjectAvailable(callback) {
      if (typeof PhysX !== 'undefined') {
        callback();
      }
      // try again in 10ms
      else {
        setTimeout(function () {
          PhysXObjectAvailable(callback);
        }, 10);
      }
    }
  }

  physXReady() {
    let game = this.game;
    let self = this;
    PhysX().then(function (PhysX) {
      self.PhysX = PhysX;
      game.PhysX = PhysX;
      var version = PhysX.PHYSICS_VERSION;
      console.log('PhysX loaded! Version: ' + ((version >> 24) & 0xff) + '.' + ((version >> 16) & 0xff) + '.' + ((version >> 8) & 0xff));
      // game.physicsReady.push(self.name);

      //
      // Init scene, allocator, foundation
      //
      var allocator = new PhysX.PxDefaultAllocator();
      var errorCb = new PhysX.PxDefaultErrorCallback();
      var foundation = PhysX.CreateFoundation(version, allocator, errorCb);
      console.log('Created PxFoundation');

      var tolerances = new PhysX.PxTolerancesScale();
      var physics = PhysX.CreatePhysics(version, foundation, tolerances);
      self.physics = physics;
      console.log('Created PxPhysics');

      // create scene
      var tmpVec = new PhysX.PxVec3(0, 0, 0);
      var sceneDesc = new PhysX.PxSceneDesc(tolerances);
      sceneDesc.set_gravity(tmpVec);
      sceneDesc.set_cpuDispatcher(PhysX.DefaultCpuDispatcherCreate(0));
      sceneDesc.set_filterShader(PhysX.DefaultFilterShader());
      self.scene = physics.createScene(sceneDesc);
      console.log('Created scene');

      // create a default material
      var material = physics.createMaterial(0.5, 0.5, 0.5);

      // create default simulation shape flags
      var shapeFlags = new PhysX.PxShapeFlags(PhysX.PxShapeFlagEnum.eSCENE_QUERY_SHAPE | PhysX.PxShapeFlagEnum.eSIMULATION_SHAPE | PhysX.PxShapeFlagEnum.eVISUALIZATION);

      // clean up temp objects
      PhysX.destroy(shapeFlags);
      PhysX.destroy(sceneDesc);
      PhysX.destroy(tolerances);
      console.log('Created scene objects');

      game.physicsReady = true;


    });

  }

  addPreUpdateListener(listener) {
    this.preUpdateListeners.push(listener);
  }

  addPostUpdateListener(listener) {
    this.postUpdateListeners.push(listener);
  }

  // Equivalent to Engine.create()
  createEngine(options) {
    return Matter.Engine.create(options);
  }

  // Equivalent to World.add()
  addToWorld(engine, body) {
    //Matter.World.add(engine.world, body);
  }

  // Equivalent to World.remove()
  removeFromWorld(engine, body) {
    Matter.World.remove(engine.world, body);
  }

  // Custom method to get a body's velocity
  getBodyVelocity(body) {
    return body.velocity;
  }

  onBeforeUpdate(engine, callback) {
    Matter.Events.on(engine, 'beforeUpdate', callback);
  }


  onAfterUpdate(engine, callback) {
    Matter.Events.on(engine, 'afterUpdate', callback);
  }

  setPosition(body, position) {
    //Matter.Body.setPosition(body, position);
  }

  setVelocity(body, velocity) {
    // TODO: refactor consuming apis to applying force, not set velocity
    this.applyForce(body, { x: 0, y: 0, z: 0 }, {
      x: velocity.x * 1000,
      y: velocity.y * 1000,
      z: velocity.z || 0
    });
    /*
    return;
    console.log('incoming velocity', velocity)
    const velocityVec = new this.PhysX.PxVec3(
      velocity.x * 1000,
      velocity.y * 1000,
      velocity.z || 0 // If z is not provided, assume 0
    );
    console.log('setVelocity', velocityVec, body)
    body.setLinearVelocity(body, velocityVec);
    */
  }

  collisionStart(game, callback) {
    /*
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
    */
  }

  collisionActive(game, callback) {
    /*
    Matter.Events.on(game.engine, 'collisionActive', (event) => {
      for (let pair of event.pairs) {
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;
        game.emit('collisionActive', { pair, bodyA, bodyB })
        callback(pair, bodyA, bodyB);
      }
    });
    */
  }

  collisionEnd(game, callback) {
    /*
    Matter.Events.on(game.engine, 'collisionEnd', (event) => {
      for (let pair of event.pairs) {
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;
        game.emit('collisionEnd', { pair, bodyA, bodyB })
        callback(pair, bodyA, bodyB);
      }
    });
    */
  }

  // Utility function to multiply two quaternions if not available in PhysX API
  quaternionMultiply(q1, q2) {
    return new this.PhysX.PxQuat(
      q1.w * q2.x + q1.x * q2.w + q1.y * q2.z - q1.z * q2.y,  // X
      q1.w * q2.y - q1.x * q2.z + q1.y * q2.w + q1.z * q2.x,  // Y
      q1.w * q2.z + q1.x * q2.y - q1.y * q2.x + q1.z * q2.w,  // Z
      q1.w * q2.w - q1.x * q2.x - q1.y * q2.y - q1.z * q2.z   // W
    );
  }

  // Helper function to normalize a quaternion
  normalizeQuaternion(q) {
    const length = Math.sqrt(q.x * q.x + q.y * q.y + q.z * q.z + q.w * q.w);
    return new this.PhysX.PxQuat(q.x / length, q.y / length, q.z / length, q.w / length);
  }


}

export default PhysXPhysics;
