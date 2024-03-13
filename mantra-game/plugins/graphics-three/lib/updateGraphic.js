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
  if (typeof entityData.position.z !== 'number') {
    entityData.position.z = 0;
  }

  updateGroupPosition(group, entityData);

}

function truncateToDecimalPlaces(num, decimalPlaces) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(num * factor) / factor;
}

// Function to update the group's position if it has changed significantly
function updateGroupPosition(group, entityData) {
  // Truncate the incoming positions to reduce the frequency of updates
  const truncatedX = truncateToDecimalPlaces(-entityData.position.x, 4);
  const truncatedY = truncateToDecimalPlaces(entityData.position.z, 4);
  const truncatedZ = truncateToDecimalPlaces(-entityData.position.y, 4);

  // Check if the group's position differs significantly from the entity's position
  if (group.position.x !== truncatedX || group.position.y !== truncatedY || group.position.z !== truncatedZ) {
    // Only update the group's position if it has changed
    group.position.set(truncatedX, truncatedY, truncatedZ);
  }
}