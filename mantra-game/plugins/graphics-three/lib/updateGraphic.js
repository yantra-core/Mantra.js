export default function updateGraphic(entityData) {
  const mesh = this.game.components.graphics.get([entityData.id, 'graphics-three']);
  if (!mesh) {
    console.error('No mesh found for entity', entityData.id);
    return;
  }

  // Check and update mesh rotation if needed
  let hasRotationChanged = false;
  if (typeof entityData.rotation === 'object' && entityData.rotation !== null) {
    // 3D rotation
    hasRotationChanged = mesh.rotation.x !== entityData.rotation.x || mesh.rotation.y !== entityData.rotation.y || mesh.rotation.z !== entityData.rotation.z;
    if (hasRotationChanged) {
      mesh.rotation.set(entityData.rotation.x, entityData.rotation.y, entityData.rotation.z);
    }
  } else {
    // 2D / 2.5D rotation (assuming around Y axis)
    hasRotationChanged = mesh.rotation.y !== entityData.rotation;
    if (hasRotationChanged) {
      mesh.rotation.set(0, entityData.rotation, 0);
    }
  }

  // get the current mesh position
  let currentMeshPosition = mesh.position.clone();
  // compare the current mesh position with the entityData position
  // only update the mesh position if the entityData position has changed
  if (-currentMeshPosition.x !== entityData.position.x || currentMeshPosition.y !== entityData.position.z) {
    mesh.position.set(-entityData.position.x, entityData.position.z, -entityData.position.y);
  }

}