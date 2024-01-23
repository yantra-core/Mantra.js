export default function updateGraphic(entityData) {
  const mesh = this.game.components.graphics.get([entityData.id, 'graphics-three']);
  if (!mesh) {
    console.error('No mesh found for entity', entityData.id);
    return;
  }

  // Update mesh position and rotation
  if (typeof entityData.rotation === 'object' && entityData.rotation !== null) {
    // 3D
    mesh.rotation.set(entityData.rotation.x, entityData.rotation.y, entityData.rotation.z);

  } else {
    // 2D / 2.5D
    mesh.rotation.set(0, entityData.rotation, 0);
  }
  
  // TODO: Add support for 3D position with entityData.position.z if available
  mesh.position.set(-entityData.position.x, 1, -entityData.position.y);

}