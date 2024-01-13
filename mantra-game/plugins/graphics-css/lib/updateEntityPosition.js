export default function updateEntityPosition(entityElement, entityData) {

  let position = entityData.position;
  let rotation = entityData.rotation;
  let type = entityData.type;
  let width = entityData.width;
  let height = entityData.height;

  // Adjust the position based on the camera position
  if (type === 'BULLET') {
    // Some bug here, fix this in CSSGraphics
    position.x = position.x + 24;
    position.y = position.y + 24;
    //position.y = position.y + height / 2;
    // console.log("og position", position, this.cameraPosition)
  }

  const adjustedPosition = {
    x: position.x - this.cameraPosition.x + window.outerWidth / 2,
    y: position.y - this.cameraPosition.y + window.outerHeight / 2
  };

  let domX = adjustedPosition.x - width / 2;
  let domY = adjustedPosition.y - height / 2;

  // convert rotation to degrees
  let angle = rotation * (180 / Math.PI);

  this.setTransform(entityData, entityElement, domX, domY, rotation, angle);

  // console.log('updated position', position, adjustedPosition, domX, domY)

  return entityElement;
}