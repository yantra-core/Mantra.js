export default function applyAngularForce(body, force, axis) {
  if (!body) {
    console.error('applyAngularForce requires a valid body');
    return;
  }

  // Calculate the torque based on the axis and force magnitude
  const torque = new this.PhysX.PxVec3(axis.x * force, axis.y * force, axis.z * force);

  // Apply the torque to the body
  body.addTorque(torque, this.PhysX.PxForceMode.eFORCE, true);
}
