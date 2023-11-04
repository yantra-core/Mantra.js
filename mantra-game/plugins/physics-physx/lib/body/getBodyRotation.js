import quaternionToEuler from '../math/quaternionToEuler.js';

export default function getBodyRotation(body) {
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