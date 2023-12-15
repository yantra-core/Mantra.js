export default function inflateBox(entityElement, entityData) {
  // For other entities, create a rectangle
  let hexColor = 'blue';
  if (typeof entityData.color !== 'undefined' && entityData.color !== null) {
    // entityData.color is int number here we need a hex
    hexColor = '#' + entityData.color.toString(16);
  }

  console.log('entityData', entityData)
  console.log('hexColor', hexColor)
  entityElement.style.width = entityData.width + 'px';
  entityElement.style.height = entityData.height + 'px';
  entityElement.style.borderRadius = '10px';  // Optional: to make it rounded
  entityElement.style.background = hexColor;  // Move this line here
  return entityElement;
}