export default function rotateBody(body, angle) {
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
