export default function getBodyRotation(body) {
  if (!body) {
    console.error('getBodyRotation requires a valid body');
    return null;
  }

  const pose = body.getGlobalPose();
  const orientation = pose.q; // Assuming 'q' is the quaternion orientation

  // Return the quaternion components directly
  return {
    x: orientation.x,
    y: orientation.y,
    z: orientation.z,
    w: orientation.w
  };
}
