import quaternionToEuler from '../math/quaternionToEuler.js';

// Wrap the angle between -π and π
function wrapAngle(angle) {
  angle %= 2 * Math.PI; // wrap to [0, 2π]
  if (angle > Math.PI) {
    angle -= 2 * Math.PI; // wrap to [-π, π]
  } else if (angle < -Math.PI) {
    angle += 2 * Math.PI; // wrap to [-π, π] if negative
  }
  return angle;
}

export default function getBodyRotation(body) {
  if (!body) {
    console.error('getBodyRotation requires a valid body');
    return null;
  }

  const pose = body.getGlobalPose();
  const orientation = pose.q; // Assuming 'q' is the quaternion orientation

  // Convert the quaternion to Euler angles
  const euler = quaternionToEuler(orientation);
  

  //console.log('POST Body Rotation (Euler):', euler);

  // Return the angles in radians, wrapped correctly
  return euler;
}
