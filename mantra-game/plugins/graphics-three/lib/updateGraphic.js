export default function updateGraphic(entityData) {
  // Assuming 'graphics-three' now refers to a Group rather than a Mesh
  const group = this.game.components.graphics.get([entityData.id, 'graphics-three']);
  if (!group) {
    console.error('No group found for entity', entityData.id);
    return;
  }

  // Check and update group rotation if needed
  let hasRotationChanged = false;
  if (typeof entityData.rotation === 'object' && entityData.rotation !== null) {
    // 3D rotation
    hasRotationChanged = group.rotation.x !== entityData.rotation.x || group.rotation.y !== entityData.rotation.y || group.rotation.z !== entityData.rotation.z;
    if (hasRotationChanged) {
      group.rotation.set(entityData.rotation.x, entityData.rotation.y, entityData.rotation.z);
    }
  } else {
    // 2D / 2.5D rotation (assuming around Y axis)
    hasRotationChanged = group.rotation.y !== entityData.rotation;
    if (hasRotationChanged) {
      group.rotation.set(0, entityData.rotation, 0);
    }
  }

  // Get the current group position
  let currentGroupPosition = group.position.clone();
  // Compare the current group position with the entityData position
  // Only update the group position if the entityData position has changed
  //console.log("CHECKING POS UPDATE POSITON OF GROUP", currentGroupPosition)

  if (-currentGroupPosition.x !== entityData.position.x || currentGroupPosition.y !== entityData.position.z) {
    if (typeof entityData.position.z !== 'number') {
      entityData.position.z = 0;
    }
    // console.log("UPDATING POSITON OF GROUP", entityData.position, group)
    group.position.set(-entityData.position.x, entityData.position.z, -entityData.position.y);
  }

}
