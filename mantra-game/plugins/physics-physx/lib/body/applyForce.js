export default function applyForce(body, position, force) {
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