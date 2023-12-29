export default function updateEntityPosition(entityElement, { position, width, height, rotation = 0 }) {
  // Adjust the position based on the camera position
  //console.log("og position", position, this.cameraPosition)
  const adjustedPosition = {
    x: position.x - this.cameraPosition.x + window.outerWidth / 2,
    y: position.y - this.cameraPosition.y + window.outerHeight / 2
  };

  const domX = adjustedPosition.x - width / 2;
  const domY = adjustedPosition.y - height / 2;

  // console.log(position, adjustedPosition, domX, domY)

  // convert rotation to degrees
  let angle = rotation * (180 / Math.PI);

  this.setTransform(entityElement, domX, domY, rotation, angle);

  // console.log('updated position', position, adjustedPosition, domX, domY)

  return entityElement;
}