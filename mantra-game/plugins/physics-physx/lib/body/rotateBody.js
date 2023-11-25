export default function rotateBody(body, angle, axis, PhysX) {
  if (!body) {
    console.error('rotateBody requires a valid body to rotate');
    return;
  }

  const currentRotation = body.getGlobalPose().q;
  const additionalRotation = calculateRotationQuaternion(this.PhysX, angle, axis);

  // Inside rotateBody function, after quaternion multiplication
  const newRotation = quaternionMultiply(this.PhysX, currentRotation, additionalRotation);
  console.log('newRotation', newRotation.x, newRotation.y, newRotation.z);
  const normalizedRotation = normalizeQuaternion(this.PhysX, newRotation); // Normalize the quaternion
  console.log('normalizedRotation', normalizedRotation.x, normalizedRotation.y, normalizedRotation.z);
  body.setGlobalPose(new this.PhysX.PxTransform(body.getGlobalPose().p, normalizedRotation));


  let updatedRotation = this.getBodyRotation(body);
  console.log('updatedRotation', updatedRotation.x, updatedRotation.y, updatedRotation.z);
}

// Helper function to multiply quaternions
function quaternionMultiply(PhysX, a, b) {
  return new PhysX.PxQuat(
    a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
    a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
    a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
    a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z
  );
}

// Helper function to normalize a quaternion
function normalizeQuaternion(PhysX, q) {
  const length = Math.sqrt(q.x * q.x + q.y * q.y + q.z * q.z + q.w * q.w);
  return new PhysX.PxQuat(q.x / length, q.y / length, q.z / length, q.w / length);
}


// Helper function to create a rotation quaternion from an angle and axis
function calculateRotationQuaternion(PhysX, angle, axis) {
  const halfAngle = angle * 0.5;
  const sinHalfAngle = Math.sin(halfAngle);
  return new PhysX.PxQuat(
    axis.x * sinHalfAngle,
    axis.y * sinHalfAngle,
    axis.z * sinHalfAngle,
    Math.cos(halfAngle)
  );
}