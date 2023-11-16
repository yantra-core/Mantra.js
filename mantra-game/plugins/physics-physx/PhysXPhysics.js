// PhysXPhysics.js - Marak Squires 2023
// THIS FILE IS WIP - NOT COMPLETE

import PhysicsInterface from '../physics-matter/PhysicsInterface.js'

import updateEngine from './lib/updateEngine.js';
import checkForMovedBodies from './lib/checkForMovedBodies.js';

import applyForce from './lib/body/applyForce.js';
import rotateBody from './lib/body/rotateBody.js';
import getBodyPosition from './lib/body/getBodyPosition.js';
import getBodyRotation from './lib/body/getBodyRotation.js';
import getLinearVelocity from './lib/body/getLinearVelocity.js';

import quaternionToEuler from './lib/math/quaternionToEuler.js';

let scene;

let _physics = null;
var lastBox = null;

// TODO: move collisions into seperate file / plugin
// Constants for collision layers
const COLLISION_LAYER_1 = 1;
const COLLISION_LAYER_2 = 2;

class PhysXPhysics extends PhysicsInterface {
  static id = 'physics-physx';
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

    this.namespace = 'physics';
    //this.Vector = Matter.Vector;
    //this.Body = Matter.Body;
    this.Body = {
      applyForce: this.applyForce.bind(this),
      rotate: this.rotateBody.bind(this)
    };
    this.Bodies = {
      rectangle: this.createRectangle.bind(this)
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
      PhysXObjectAvailable(function(){
        self.physXReady();
      })
    });

    // PhysXObjectAvailable may not be necessary, the PhysX() should immediately be available
    function PhysXObjectAvailable (callback) {
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

  physXReady () {
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
      _physics = physics;
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

  // Override the createRectangle method to use PhysX
  createRectangle(x, y, width, height, options = {}) {

    // Inside the createRectangle function, after creating the boxShape
    // Define filter data for the collision layers
    let filterData = new this.PhysX.PxFilterData(
      1, // Word0 (own layer)
      1, // Word1 (layer to collide with)
      0,                 // Word2 (not used in this context)
      0                  // Word3 (not used in this context)
    );

    console.log('createRectangle', options)
    // Ensure the PhysX instance is loaded and available
    if (!this.PhysX) {
      console.error("PhysX is not initialized.");
      return;
    }

    // Compute half extents for the box geometry
    const hx = width / 2;
    const hy = height / 2;

    // Create the box geometry with half extents
    const boxGeometry = new this.PhysX.PxBoxGeometry(hx, hy, 100);
    // Retrieve default material from the PhysX scene
    const material = _physics.createMaterial(0.5, 0.5, 0.6);

    // Create shape flags for the actor
    const shapeFlags = new this.PhysX.PxShapeFlags(
      this.PhysX.PxShapeFlagEnum.eSCENE_QUERY_SHAPE |
      this.PhysX.PxShapeFlagEnum.eSIMULATION_SHAPE |
      this.PhysX.PxShapeFlagEnum.eVISUALIZATION
    );

    // Setup the pose for the new actor (position and orientation)
    const transform = new this.PhysX.PxTransform(
      new this.PhysX.PxVec3(x, y, 0),
      new this.PhysX.PxQuat(this.PhysX.PxIDENTITYEnum.PxIdentity)
    );

    // Create the box shape
    const boxShape = _physics.createShape(boxGeometry, material, false, shapeFlags);

    // Set the simulation filter data
    boxShape.setSimulationFilterData(filterData);

    let boxActor;
    // options.isStatic = false;
    // Check if the body is static or dynamic based on the 'isStatic' option
    if (options && options.isStatic) {
      // Create a static actor for the box
      console.log('creating a static actor');
      boxActor = _physics.createRigidStatic(transform);
    } else {
      console.log('creating a dynamic actor')
      // Create a dynamic actor for the box
      boxActor = _physics.createRigidDynamic(transform);
      // Add the body to the list of dynamic bodies
      this.dynamicBodies.push(boxActor);

      // If options has a density property, set the mass and inertia
      if (options && options.density) {
        // Assuming you have some way to calculate the volume or mass from density
        // Since density = mass / volume, you would rearrange to mass = density * volume
        // Calculate the volume of the box. For a box, volume = width * height * depth
        let volume = width * height * 1; // Assuming '100' is your depth here
        let mass = options.density * volume;
        console.log('SETTING MASS', mass)
        // Now set the mass of the dynamic actor
        boxActor.setMass(1);
      }

      if (options && options.velocity) {
        // apply velocity
        // is this not correct? do we need to make this a vector?
        // You need to create a PxVec3 for the velocity
        const velocityVec = new this.PhysX.PxVec3(
          options.velocity.x,
          options.velocity.y,
          options.velocity.z || 0 // If z is not provided, assume 0
        );

        console.log('velocityVec', velocityVec)

        // Use the created PxVec3 to set the linear velocity
        boxActor.setLinearVelocity(velocityVec);

      }

      // Lock the motion along the Z-axis
      const lockFlags =
        this.PhysX.PxRigidDynamicLockFlagEnum.eLOCK_LINEAR_Z |
        this.PhysX.PxRigidDynamicLockFlagEnum.eLOCK_ANGULAR_Z |
        this.PhysX.PxRigidDynamicLockFlagEnum.eLOCK_ANGULAR_X |
        this.PhysX.PxRigidDynamicLockFlagEnum.eLOCK_ANGULAR_Y;
      console.log('lockFlags', lockFlags)
      console.log(boxActor)
      // Not working?
      boxActor.setRigidDynamicLockFlags(lockFlags);

    }




    // Attach the shape to the actor
    boxActor.attachShape(boxShape);

    // Add the actor to the scene
    this.scene.addActor(boxActor);

    // Clean up temporary objects to avoid memory leaks
    this.PhysX.destroy(boxGeometry);
    this.PhysX.destroy(shapeFlags);
    this.PhysX.destroy(transform);

    // Return the created box actor
    console.log('returning the box actor', boxActor);
    return boxActor;
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

    const velocityVec = new this.PhysX.PxVec3(
      velocity.x,
      velocity.y,
      velocity.z || 0 // If z is not provided, assume 0
    );

    console.log('setVelocity', velocityVec, body)

    body.setLinearVelocity(body, velocityVec);
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
