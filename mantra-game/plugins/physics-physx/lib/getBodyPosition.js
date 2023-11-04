export default function getBodyPosition(body) {
  if (!body) {
    console.error('getBodyPosition requires a body');
    return null;
  }

  // Access the global pose of the body
  const transform = body.getGlobalPose();

  // Retrieve the position from the transform
  const position = transform.p; // 'p' typically stands for position in PhysX's PxTransform

  // Return a new object with the position values
  return {
    x: position.x,
    y: position.y,
    z: position.z
  };
}