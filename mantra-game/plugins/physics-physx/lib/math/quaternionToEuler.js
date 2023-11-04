// Helper function to convert quaternion to Euler angles in radians
export default function quaternionToEuler(quaternion) {

  // TODO: better rotation logic
  const sinr_cosp = 2 * (quaternion.w * quaternion.x + quaternion.y * quaternion.z);
  const cosr_cosp = 1 - 2 * (quaternion.x * quaternion.x + quaternion.y * quaternion.y);
  const roll = Math.atan2(sinr_cosp, cosr_cosp);

  const sinp = 2 * (quaternion.w * quaternion.y - quaternion.z * quaternion.x);
  let pitch;
  if (Math.abs(sinp) >= 1)
    pitch = Math.copySign(Math.PI / 2, sinp); // use 90 degrees if out of range
  else
    pitch = Math.asin(sinp);

  const siny_cosp = 2 * (quaternion.w * quaternion.z + quaternion.x * quaternion.y);
  const cosy_cosp = 1 - 2 * (quaternion.y * quaternion.y + quaternion.z * quaternion.z);
  const yaw = Math.atan2(siny_cosp, cosy_cosp);

  return { x: roll, y: pitch, z: yaw };
}
