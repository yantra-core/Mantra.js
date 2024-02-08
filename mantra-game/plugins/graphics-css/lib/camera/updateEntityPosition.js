export default function updateEntityPosition(entityElement, entityData) {
  let position = entityData.position;
  let rotation = entityData.rotation;
  let type = entityData.type;
  let width = entityData.width;
  let height = entityData.height;

  if (typeof entityData.radius === 'number') {
    width = entityData.radius;
    height = entityData.radius;
  }

  // Field of view (FoV) dimensions
  let fovWidth = window.outerWidth;
  let fovHeight = window.outerHeight;

  fovWidth = 600;
  fovHeight = 600;

  /* Remark: Removed 2/7/2024
            Entities are no longer transformed per camera
            Instead entities are transformed per game holder
            Camera will apply transforms to the game holder

    Reason: Performance, we don't need to transform every entity per camera

    let adjustedPosition = {
      x: position.x - (this.scene.cameraPosition.x -  window.innerWidth / 2),
      y: position.y - (this.scene.cameraPosition.y - window.outerHeight / 2)
    };
  */

  let adjustedPosition = {
    x: position.x,
    y: position.y
  };
  // Check if the entity is within the field of view
  // Remark: Field of View is disabled ( for now ), it *should* be working as expected,
  //         the current implementation will hide the entity, we should removeEntity() instead
  if (true || isWithinFieldOfView(game, position, this.cameraPosition, width, height, fovWidth, fovHeight)) {
    let domX = adjustedPosition.x - width / 2;
    let domY = adjustedPosition.y - height / 2;

    // Convert rotation to degrees
    let angle = rotation * (180 / Math.PI);

    // Apply transformation to the entity
    this.setTransform(entityData, entityElement, domX, domY, rotation, angle);
    entityElement.style.display = ''; // Make sure the element is visible
  } else {
    /*
    if (entityData.type !== 'BACKGROUND' || entityData.type !== 'building') {
      // Hide the entity if it's outside the field of view
      entityElement.style.display = 'none';
    }
    */
  }

  if (entityData.style && entityData.style.display === 'none') {
    entityElement.style.display = 'none';
  }

  return entityElement;
}

function isWithinFieldOfView(game, position, cameraPosition, width, height, fovWidth, fovHeight) {
  // Calculate the center position of the entity
  const entityCenterX = position.x + width / 2;
  const entityCenterY = (position.y + height / 2);

  // Calculate the distance from the entity center to the camera position
  const distanceX = entityCenterX - cameraPosition.x;
  const distanceY = entityCenterY - cameraPosition.y + 100;

  // Calculate the maximum allowed distance for an entity to be within the FoV
  // This can be half of the FoV width or height, depending on how you define the FoV area
  const maxDistance = Math.min(fovWidth, fovHeight);

  let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  // console.log('distance', distance, maxDistance)
  // Check if the entity is within the distance
  return distance <= maxDistance;
}
