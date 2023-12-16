export default function inflateBox(entityElement, entityData) {
  // For other entities, create a rectangle
  let hexColor = 'white';
  if (typeof entityData.color !== 'undefined' && entityData.color !== null) {
    // entityData.color is int number here we need a hex
    hexColor = '#' + entityData.color.toString(16);
  }

  entityElement.style.width = entityData.width + 'px';
  entityElement.style.height = entityData.height + 'px';
  entityElement.style.borderRadius = '10px';  // Optional: to make it rounded

  // set initial rotation of the entity
  if (typeof entityData.rotation !== 'undefined' && entityData.rotation !== null) {
    //entityElement.style.transform = `rotate(${entityData.rotation}deg)`;
  }

  // set border color to black
  entityElement.style.border = '1px solid black';
  entityElement.style.background = hexColor;  // Move this line here
  return entityElement;
}