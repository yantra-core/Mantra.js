// PhysXPhysics.js - Marak Squires 2023
// THIS FILE IS WIP - NOT COMPLETE

import PhysicsInterface from '../physics-matter/PhysicsInterface.js'
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
      setupDebugDrawer(PhysX, scene);

      // simulate forever!
      // simulationLoop();

      function setupDebugDrawer() {
        canvas.width = 800;
        canvas.height = 600;

        // compute projection matrix
        mat4.lookAt(viewMatrix, [12, 15, 20], [0, 0, 0], [0, 1, 0])
        mat4.perspective(projectionMatrix, 45 * (Math.PI / 180), canvas.width / canvas.height, 0.01, 75);
        mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);

        // setup debug drawer
        const context = canvas.getContext('2d');
        scene.setVisualizationParameter(PhysX.eSCALE, 1);
        scene.setVisualizationParameter(PhysX.eWORLD_AXES, 1);
        scene.setVisualizationParameter(PhysX.eACTOR_AXES, 1);
        scene.setVisualizationParameter(PhysX.eCOLLISION_SHAPES, 1);
      }

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
    debugDraw(this.PhysX, scene);

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


  getBodyRotation2(body) {
    // Check if the body is valid
    if (!body) {
      console.error('getBodyRotation requires a valid body');
      return null;
    }

    // Get the global pose of the body, which contains the position and orientation
    const pose = body.getGlobalPose();

    // Extract the orientation part of the pose
    const orientation = pose.q; // Assuming 'q' is the property for orientation in the returned transform

    // Convert quaternion to Euler angles or an angle-axis representation if needed
    // Here, we'll convert it to Euler angles for simplicity.
    // Note: PhysX may provide a way to convert quaternion to Euler directly,
    // so please check the documentation for any such utility functions.
    const euler = quaternionToEuler(orientation);

    // Return the Euler angles as a generic object
    // Assuming the euler object contains the rotation in radians
    return {
      x: euler.x,
      y: euler.y,
      z: euler.z
    };
  }

  getBodyRotation(body) {
    if (!body) {
      console.error('getBodyRotation requires a valid body');
      return null;
    }

    const pose = body.getGlobalPose();
    const orientation = pose.q; // Assuming 'q' is the quaternion orientation

    // Convert the quaternion to a Z-axis rotation angle
    const angle = quaternionToEuler(orientation);

    // Return the angle in radians
    return angle;
  }


  rotateBody(body, angle) {
    // Make sure the body exists
    if (!body) {
        console.error('rotateBody requires a valid body to rotate');
        return;
    }
  
    // Create a quaternion representing the additional rotation
    // Assuming angle is in radians and we're rotating around the z-axis
    // since we're dealing with a 2D plane in a 3D space.
    const halfAngle = angle * 0.5;
    const sinHalfAngle = Math.sin(halfAngle);
    const cosHalfAngle = Math.cos(halfAngle);
    const additionalRotation = new this.PhysX.PxQuat(sinHalfAngle, 0, 0, cosHalfAngle);
  
    // Get the current transform of the body
    const transform = body.getGlobalPose();
  
    // Perform quaternion multiplication
    const newRotation = this.quaternionMultiply(transform.q, additionalRotation);
    console.log('newRotation', newRotation.x)
    // Normalize the new rotation to avoid numerical errors over time
    //const normalizedRotation = newRotation.normalize(); // Ensure that 'normalize()' method exists or implement it.
  
    // Set the new combined rotation back into the transform
    transform.q = newRotation;
    //console.log('normalizedRotation', normalizedRotation.x)

    // Update the body's transform
    body.setGlobalPose(transform, true); // true to wake the body up if it's asleep
  }
  
  rotateBody2D(body, angle) {
    if (!body) {
      console.error('rotateBody requires a valid body to rotate');
      return;
    }

    // Create a quaternion representing the rotation about the Z-axis
    const additionalRotation = new this.PhysX.PxQuat(angle, 0, 0, 1);

    // Get the current global pose of the body
    const transform = body.getGlobalPose();

    console.log('Current quaternion:', transform.q);
    console.log('Angle and additional rotation quaternion:', angle, additionalRotation);

    // Assuming 'rotate' is correct, apply the additional rotation
    const newRotation = transform.q.rotate(additionalRotation);

    console.log('New quaternion before normalization:', newRotation);

    // Normalize the new quaternion
    const normalized = newRotation.normalize();

    console.log('New quaternion after normalization:', normalized);

    // Update the transform with the new rotation
    transform.q = normalized;

    // Apply the updated transform to the body
    body.setGlobalPose(transform, true);

    // Retrieve and log the updated rotation for debugging
    //let updatedRotation = this.getBodyRotation(body);
    //console.log('Updated body rotation:', updatedRotation);
  }


  // TODO: implement method 
  applyForce(body, position, force) {
    if (!body || !force) {
      console.error('applyForce requires a body and a force');
      return;
    }

    force.z = 0;

    console.log("applyForce", body, position, force)

    let ogPos = this.getBodyPosition(body);
    console.log('ogPos', ogPos);

    // Convert the input force and position to a PxVec3, if they're not already.
    const pxForce = new this.PhysX.PxVec3(force.x, force.y, force.z);

    const pxPosition = position ? new this.PhysX.PxVec3(position.x, position.y, position.z) : undefined;
    body.addForce(pxForce, this.PhysX.PxForceModeEnum.eFORCE, pxPosition);

    // Check if the body is dynamic (i.e., can be moved by forces).
    if (body.isRigidDynamic && body.isRigidDynamic()) {
      // Add the force at the specific position. If no position is provided, it will apply the force at the center of mass.
    } else {
      //      console.error('applyForce can only be called on dynamic bodies');
    }

    // Clean up the created PxVec3 objects to avoid memory leaks
    this.PhysX.destroy(pxForce);
    if (pxPosition) this.PhysX.destroy(pxPosition);
  }

  getBodyPosition(body) {
    if (!body) {
      console.error('getBodyPosition requires a body');
      return null;
    }

    // Access the global pose of the body
    const transform = body.getGlobalPose();

    // Retrieve the position from the transform
    const position = transform.p; // 'p' typically stands for position in PhysX's PxTransform

    // Return a new object with the position values
    return {
      x: position.x,
      y: position.y,
      z: position.z
    };
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

function debugDraw(PhysX, scene) {
  if (!PhysX.NativeArrayHelpers) {
    return;
  }
  if (!canvas) {
    return;
  }
  canvas.width = canvas.width;    // clears the canvas

  const rb = scene.getRenderBuffer();
  for (let i = 0; i < rb.getNbLines(); i++) {
    const line = PhysX.NativeArrayHelpers.prototype.getDebugLineAt(rb.getLines(), i);
    const from = project(line.pos0.get_x(), line.pos0.get_y(), line.pos0.get_z());
    const to = project(line.pos1.get_x(), line.pos1.get_y(), line.pos1.get_z());
    drawLine(from, to, colors[line.get_color0()]);
  }
}


function project(x, y, z) {
  const result = vec4.transformMat4(tmpVec4, [x, y, z, 1], viewProjectionMatrix);
  const clipX = (result[0] / result[3]);
  const clipY = (result[1] / result[3]);
  return [(canvas.width / 2) * (1 + clipX), (canvas.height / 2) * (1 - clipY)];
}


function drawLine(from, to, color) {
  const [r, g, b] = color;

  context.beginPath();
  context.strokeStyle = `rgb(${255 * r}, ${255 * g}, ${255 * b})`;
  context.moveTo(...from);
  context.lineTo(...to);
  context.stroke();
}

// Helper function to convert quaternion to Euler angles in radians
function quaternionToEuler(quaternion) {
  // Placeholder for conversion logic
  // You'll need to implement this based on how you want to convert quaternions to Euler angles.
  // The following is just a conceptual placeholder and may not be correct.
  const sinr_cosp = 2 * (quaternion.w * quaternion.x + quaternion.y * quaternion.z);
  const cosr_cosp = 1 - 2 * (quaternion.x * quaternion.x + quaternion.y * quaternion.y);
  const roll = Math.atan2(sinr_cosp, cosr_cosp);

  const sinp = 2 * (quaternion.w * quaternion.y - quaternion.z * quaternion.x);
  let pitch;
  if (Math.abs(sinp) >= 1)
    pitch = Math.copySign(Math.PI / 2, sinp); // use 90 degrees if out of range
  else
    pitch = Math.asin(sinp);

  const siny_cosp = 2 * (quaternion.w * quaternion.z + quaternion.x * quaternion.y);
  const cosy_cosp = 1 - 2 * (quaternion.y * quaternion.y + quaternion.z * quaternion.z);
  const yaw = Math.atan2(siny_cosp, cosy_cosp);

  return { x: roll, y: pitch, z: yaw };
}

function quaternionToEuler2D(quaternion) {
  // Assuming the quaternion is {x, y, z, w}

  // Compute the quaternion's rotation around the Z-axis (yaw)
  const sinr_cosp = 2 * (quaternion.w * quaternion.x + quaternion.y * quaternion.z);
  const cosr_cosp = 1 - 2 * (quaternion.x * quaternion.x + quaternion.y * quaternion.y);
  const angle = Math.atan2(sinr_cosp, cosr_cosp);

  return angle; // The angle is in radians
}
  