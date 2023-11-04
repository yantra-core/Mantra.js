// PhysXPhysics.js - Marak Squires 2023
// THIS FILE IS WIP - NOT COMPLETE

import PhysicsInterface from '../physics-matter/PhysicsInterface.js'

import applyForce from './lib/applyForce.js';
import rotateBody from './lib/rotateBody.js';
import getBodyPosition from './lib/getBodyPosition.js';
import getBodyRotation from './lib/getBodyRotation.js';

import quaternionToEuler from './lib/math/quaternionToEuler.js';

let lastFrame = 0;
let scene;
let canvas;
let context;
let colors = {};

let _physics = null;
var lastBox = null;

// setup debug drawing stuff
const { mat4, vec4, vec3 } = glMatrix;
const viewMatrix = mat4.create();
const projectionMatrix = mat4.create();
const viewProjectionMatrix = mat4.create();
const tmpVec4 = vec4.create();

class PhysXPhysics extends PhysicsInterface {
  constructor(config) {
    super();

    this.applyForce = applyForce;
    this.rotateBody = rotateBody;
    this.getBodyPosition = getBodyPosition;
    this.getBodyRotation = getBodyRotation;

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

    PhysX().then(function (PhysX) {
      self.PhysX = PhysX;
      game.PhysX = PhysX;
      var version = PhysX.PHYSICS_VERSION;
      console.log('PhysX loaded! Version: ' + ((version >> 24) & 0xff) + '.' + ((version >> 16) & 0xff) + '.' + ((version >> 8) & 0xff));
      game.physicsReady = true;
      // game.physicsReady.push(self.name);


      colors = {
        [PhysX.PxDebugColorEnum.eARGB_BLACK]: [0, 0, 0],
        [PhysX.PxDebugColorEnum.eARGB_RED]: [1, 0, 0],
        [PhysX.PxDebugColorEnum.eARGB_GREEN]: [0, 1, 0],
        [PhysX.PxDebugColorEnum.eARGB_BLUE]: [0, 0, 1],
        [PhysX.PxDebugColorEnum.eARGB_YELLOW]: [1, 1, 0],
        [PhysX.PxDebugColorEnum.eARGB_MAGENTA]: [1, 0, 1],
        [PhysX.PxDebugColorEnum.eARGB_CYAN]: [0, 1, 1],
        [PhysX.PxDebugColorEnum.eARGB_WHITE]: [1, 1, 1],
        [PhysX.PxDebugColorEnum.eARGB_GREY]: [0.5, 0.5, 0.5],
        [PhysX.PxDebugColorEnum.eARGB_DARKRED]: [0.5, 0, 0],
        [PhysX.PxDebugColorEnum.eARGB_DARKGREEN]: [0, 0.5, 0],
        [PhysX.PxDebugColorEnum.eARGB_DARKBLUE]: [0, 0, 0.5],
      };


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
      scene = physics.createScene(sceneDesc);
      console.log('Created scene');

      // create a default material
      var material = physics.createMaterial(0.5, 0.5, 0.5);

      // create default simulation shape flags
      var shapeFlags = new PhysX.PxShapeFlags(PhysX.PxShapeFlagEnum.eSCENE_QUERY_SHAPE | PhysX.PxShapeFlagEnum.eSIMULATION_SHAPE | PhysX.PxShapeFlagEnum.eVISUALIZATION);

      /*
      // create a few temporary objects used during setup
      var tmpPose = new PhysX.PxTransform(PhysX.PxIDENTITYEnum.PxIdentity);
      var tmpFilterData = new PhysX.PxFilterData(1, 1, 0, 0);

      // create a large static box with size 20x1x20 as ground
      var groundGeometry = new PhysX.PxBoxGeometry(10, 0.5, 10);   // PxBoxGeometry uses half-sizes
      var groundShape = physics.createShape(groundGeometry, material, true, shapeFlags);
      var ground = physics.createRigidStatic(tmpPose);
      groundShape.setSimulationFilterData(tmpFilterData);
      ground.attachShape(groundShape);
      scene.addActor(ground);

      // create a few dynamic boxes with size 1x1x1, which will fall on the ground
      var boxGeometry = new PhysX.PxBoxGeometry(0.5, 0.5, 0.5);   // PxBoxGeometry uses half-sizes
      for (var y = 0; y < 10; y++) {
        tmpVec.set_x(0); tmpVec.set_y(y * 2 + 5); tmpVec.set_z(0);
        tmpPose.set_p(tmpVec);
        var boxShape = physics.createShape(boxGeometry, material, true, shapeFlags);
        var box = physics.createRigidDynamic(tmpPose);
        boxShape.setSimulationFilterData(tmpFilterData);
        box.attachShape(boxShape);
        scene.addActor(box);
        lastBox = box;
      }
      PhysX.destroy(groundGeometry);
      PhysX.destroy(boxGeometry);
      PhysX.destroy(tmpFilterData);
      PhysX.destroy(tmpPose);
      PhysX.destroy(tmpVec);

      */
      // clean up temp objects
      PhysX.destroy(shapeFlags);
      PhysX.destroy(sceneDesc);
      PhysX.destroy(tolerances);
      console.log('Created scene objects');

      canvas = document.getElementById('physx-canvas');
      context = canvas.getContext('2d');

      // TODO: debug view, see debugDraw.js code comments
      // setupDebugDrawer(PhysX, scene);

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

  // Equivalent to Engine.update()
  updateEngine(engine) {

    let hrtime = new Date().getTime();

    if (!scene) {
      return;
    }

    // Call pre-update listeners
    for (const listener of this.preUpdateListeners) {
      listener({ source: this });
    }

    var timeStep = Math.min(0.03, (hrtime - lastFrame));
    // console.log('timeStep', timeStep)
    scene.simulate(timeStep);
    scene.fetchResults(true);

    // Call post-update listeners
    for (const listener of this.postUpdateListeners) {
      listener({ source: this });
    }

    // Your additional logic for checking moved bodies, etc.
    this.checkForMovedBodies();


    // use debug drawer interface to draw boxes on a canvas.
    // in a real world application you would query the box poses and update your graphics boxes accordingly
    // debugDraw(this.PhysX, scene);

    // var lastBoxPos = lastBox.getGlobalPose().get_p();
    // console.log('Last box position: ' + lastBoxPos.get_x() + ", " + lastBoxPos.get_y() + ", " + lastBoxPos.get_z());

    lastFrame = hrtime;
    //requestAnimationFrame(loop);
  }
  // Equivalent to Bodies.rectangle()

  checkForMovedBodies() {
    // Retrieve all the dynamic bodies from the scene
    // const dynamicBodies = scene.getDynamicBodies(); // This function will need to be implemented based on your setup

    this.dynamicBodies.forEach((body) => {
      // If the body is awake, it has potentially moved and you can broadcast its new state
      const entityId = body.userData; // Assuming you store entityId in the userData of the body
      let myEntityId = body.myEntityId;
      //this.broadcastBodyState(entityId, body);
      //console.log('eee', myEntityId, body)
      let bodyPosition = this.getBodyPosition(body);
      let ent = this.game.getEntity(myEntityId);
      //console.log('ent', ent)
      //console.log('bodyPosition', bodyPosition)
      this.game.changedEntities.add(body.myEntityId);
      //this.game.components.velocity.set(body.myEntityId, { x: body.velocity.x, y: body.velocity.y });
      this.game.components.position.set(body.myEntityId, { x: bodyPosition.x, y: bodyPosition.y });
      let bodyRotation = this.getBodyRotation(body);
      // console.log('bodyRotation', bodyRotation)
      this.game.components.rotation.set(body.myEntityId, bodyRotation.x);
      //if (body.isAwake()) {}
    });
  }

  // Override the createRectangle method to use PhysX
  createRectangle(x, y, width, height, options) {
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

    let boxActor;
    options.isStatic = false;
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
        // boxActor.updateMassAndInertia(options.density);
      }
    }

    // Attach the shape to the actor
    boxActor.attachShape(boxShape);

    // Add the actor to the scene
    scene.addActor(boxActor);

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
    // Matter.Body.setVelocity(body, velocity);
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

}

export default PhysXPhysics;
  