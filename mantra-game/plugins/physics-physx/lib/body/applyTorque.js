function applyTorque(body, torqueAmount, axis) {

  // Calculate the torque vector based on the specified axis
  const torqueVector = new this.PhysX.PxVec3(
    torqueAmount * axis.x,
    torqueAmount * axis.y,
    torqueAmount * axis.z
  );

  // Apply the torque to the body
  body.addTorque(torqueVector, this.PhysX.eFORCE, true);

  // Logging for debugging purposes
  console.log(`Applied torque: ${torqueVector.x}, ${torqueVector.y}, ${torqueVector.z}`);
}

export default applyTorque;
