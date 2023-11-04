export default function rotateBody(body, angle, axis) {
  // Make sure the body exists
  if (!body) {
    console.error('rotateBody requires a valid body to rotate');
    return;
  }

  // Normalize the axis vector (axis must be a unit vector)
  const axisLength = Math.sqrt(axis.x * axis.x + axis.y * axis.y + axis.z * axis.z);
  const normalizedAxis = {
    x: axis.x / axisLength,
    y: axis.y / axisLength,
    z: axis.z / axisLength
  };

  // Create a quaternion representing the additional rotation
  // Assuming angle is in radians
  const halfAngle = angle * 0.5;
  const sinHalfAngle = Math.sin(halfAngle);
  const additionalRotation = new this.PhysX.PxQuat(
    normalizedAxis.x * sinHalfAngle, // x component of quaternion
    normalizedAxis.y * sinHalfAngle, // y component of quaternion
    normalizedAxis.z * sinHalfAngle, // z component of quaternion
    Math.cos(halfAngle)              // w (real) component of quaternion
  );

  // Get the current transform of the body
  const transform = body.getGlobalPose();

  // Perform quaternion multiplication
  const newRotation = this.quaternionMultiply(transform.q, additionalRotation);

  // Normalize the new rotation to avoid numerical errors over time
  const normalizedRotation = this.normalizeQuaternion(newRotation);

  // Set the new combined rotation back into the transform
  transform.q = normalizedRotation;

  // Update the body's transform
  body.setGlobalPose(transform, true); // true to wake the body up if it's asleep
}

// Helper function to multiply quaternions
function quaternionMultiply(a, b) {
  return new this.PhysX.PxQuat(
    a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
    a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
    a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
    a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z
  );
}

// Helper function to normalize a quaternion
function normalizeQuaternion(q) {
  const length = Math.sqrt(q.x * q.x + q.y * q.y + q.z * q.z + q.w * q.w);
  return new this.PhysX.PxQuat(q.x / length, q.y / length, q.z / length, q.w / length);
}
