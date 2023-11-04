export default function getLinearVelocity(body) {
  if (!body) {
    console.error('getBodyVelocity requires a body');
    return null;
  }

  // Access the velocity of the body
  // Assuming 'getLinearVelocity' is a method that exists in your API to get the velocity of a body
  const velocity = body.getLinearVelocity();

  // Return a new object with the velocity values
  // If your API does not directly return an object with x, y, z properties,
  // you might need to access or calculate them accordingly.
  return {
    x: velocity.x,
    y: velocity.y,
    z: velocity.z
  };
}
