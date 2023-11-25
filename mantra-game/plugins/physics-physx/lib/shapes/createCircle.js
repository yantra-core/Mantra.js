export default function createCircle(x, y, radius, options = {}) {

  console.log('incoming options', x, y, radius);
  // Inside the createCircle function, after creating the boxShape
  // Define filter data for the collision layers
  let filterData = new this.PhysX.PxFilterData(
    1, // Word0 (own layer)
    0, // Word1 (layer to collide with)
    0,                 // Word2 (not used in this context)
    0                  // Word3 (not used in this context)
  );

  // Ensure the PhysX instance is loaded and available
  if (!this.PhysX) {
    console.error("PhysX is not initialized.");
    return;
  }

  // Create the box geometry with half extents
  const sphereGeometry = new this.PhysX.PxSphereGeometry(radius);
  // Retrieve default material from the PhysX scene
  const material = this.physics.createMaterial(0.5, 0.5, 0.6);

  // Create shape flags for the actor
  let shapeFlags = new this.PhysX.PxShapeFlags(
    this.PhysX.PxShapeFlagEnum.eSCENE_QUERY_SHAPE |
    this.PhysX.PxShapeFlagEnum.eVISUALIZATION
  );

  if (options && options.isSensor) {
    shapeFlags |= this.PhysX.PxShapeFlagEnum.eTRIGGER_SHAPE; // Add trigger shape flag for sensors
  } else {
    shapeFlags |= this.PhysX.PxShapeFlagEnum.eSIMULATION_SHAPE; // Regular simulation shape
  }

  // Setup the pose for the new actor (position and orientation)
  const transform = new this.PhysX.PxTransform(
    new this.PhysX.PxVec3(x, y, 0),
    new this.PhysX.PxQuat(this.PhysX.PxIDENTITYEnum.PxIdentity)
  );

  // Create the box shape
  const sphereShape = this.physics.createShape(sphereGeometry, material, false, shapeFlags);

  // Set the simulation filter data
  sphereShape.setSimulationFilterData(filterData);

  let sphereActor;
  // options.isStatic = false;
  // Check if the body is static or dynamic based on the 'isStatic' option
  if (options && options.isStatic) {
    // Create a static actor for the box
    console.log('creating a static actor');
    sphereActor = this.physics.createRigidStatic(transform);
  } else {
    console.log('creating a dynamic actor')
    // Create a dynamic actor for the box
    sphereActor = this.physics.createRigidDynamic(transform);
    // Add the body to the list of dynamic bodies
    this.dynamicBodies.push(sphereActor);


    // Correcting mass calculation for a sphere
    if (options && options.density) {
      console.log('options.density', options.density);
      const volume = (4 / 3) * Math.PI * Math.pow(radius, 3); // Volume of a sphere
      let mass = options.density * volume;
      console.log('Calculated mass', mass);
      sphereActor.setMass(10);
      //sphereActor.updateMassAndInertia(mass); // Update inertia based on mass
    }


    if (options && options.velocity) {
      // Create a force vector
      const forceVec = new this.PhysX.PxVec3(
        options.velocity.x,
        options.velocity.y,
        options.velocity.z || 0 // If z is not provided, assume 0
      );
  
      console.log('Applying force vector:', forceVec);
  
      // Apply the force to the center of mass of the body
      // This might depend on your specific PhysX wrapper's API
      sphereActor.addForce(forceVec, this.PhysX.PxForceModeEnum.eFORCE, true);
  }
  


    if (options && options.velocity) {

      // TODO: create a force vector
      // this.Body.applyForce(body, bodyPosition, force);

      // apply velocity
      // is this not correct? do we need to make this a vector?
      // You need to create a PxVec3 for the velocity
      /*
      console.log("setting velocity", options.velocity)
      const velocityVec = new this.PhysX.PxVec3(
        100,
        100,
        100 // If z is not provided, assume 0
      );



      console.log('velocityVec', velocityVec)

      // Use the created PxVec3 to set the linear velocity
      sphereActor.setLinearVelocity(velocityVec);
      */

    }

  
  }

  // Attach the shape to the actor
  sphereActor.attachShape(sphereShape);

  // Add the actor to the scene
  this.scene.addActor(sphereActor);

  // Clean up temporary objects to avoid memory leaks
  this.PhysX.destroy(sphereGeometry);
  // Does shapeFlags need to be manually destroy, or is it destroyed when the shape is destroyed?
  // this.PhysX.destroy(shapeFlags);
  this.PhysX.destroy(transform);

  // Return the created box actor
  console.log('returning the sphereActor', sphereActor);
  return sphereActor;
}