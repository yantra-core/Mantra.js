// TODO: possibly remove this file

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
