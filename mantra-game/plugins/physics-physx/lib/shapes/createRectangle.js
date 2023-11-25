export default function createRectangle(x, y, width, height, options = {}) {

  // Inside the createRectangle function, after creating the boxShape
  // Define filter data for the collision layers
  let filterData = new this.PhysX.PxFilterData(
    1, // Word0 (own layer)
    0, // Word1 (layer to collide with)
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
  const material = this.physics.createMaterial(0.5, 0.5, 0.6);

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
  const boxShape = this.physics.createShape(boxGeometry, material, false, shapeFlags);

  // Set the simulation filter data
  boxShape.setSimulationFilterData(filterData);

  let boxActor;
  // options.isStatic = false;
  // Check if the body is static or dynamic based on the 'isStatic' option
  if (options && options.isStatic) {
    // Create a static actor for the box
    console.log('creating a static actor');
    boxActor = this.physics.createRigidStatic(transform);
  } else {
    console.log('creating a dynamic actor')
    // Create a dynamic actor for the box
    boxActor = this.physics.createRigidDynamic(transform);
    // Add the body to the list of dynamic bodies
    this.dynamicBodies.push(boxActor);

    // If options has a density property, set the mass and inertia
    if (options && options.density) {
      // Assuming you have some way to calculate the volume or mass from density
      // Since density = mass / volume, you would rearrange to mass = density * volume
      // Calculate the volume of the box. For a box, volume = width * height * depth
      let volume = width * height * 1; // Assuming '100' is your depth here
      let mass = options.density * volume;
      console.log('SETTING MASS', mass);
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

    let inertiaTensor = {
      x: 10,
      y: 10,
      z: 10
    };

    // boxActor.setMassSpaceInertiaTensor(new this.PhysX.PxVec3(inertiaTensor.x, inertiaTensor.y, inertiaTensor.z));

    /*
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
    */

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