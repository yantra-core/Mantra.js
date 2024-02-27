export default function inflateText(entityElement, entityData) {
  // Create a container for the text
  
  entityElement.innerText = entityData.text;

  // Ensure the background is transparent by default
  entityElement.style.backgroundColor = 'transparent';

  // Apply custom styles from entityData.style
  if (entityData.style) {
    for (let key in entityData.style) {
      entityElement.style[key] = entityData.style[key];
    }
  }

  // Set width if provided
  if (entityData.width) {
    entityElement.style.width = `${entityData.width}px`;
  }

  // Convert and set color if provided
  if (entityData.color) {
    let hexColor;
    // Convert integer color to hex format
    if (typeof entityData.color === 'number') {
      hexColor = `#${entityData.color.toString(16).padStart(6, '0')}`; // Ensure proper hex format with padding
    } else {
      hexColor = entityData.color; // Assume it's already a string in a valid format
    }
    entityElement.style.color = hexColor;
  }
  return entityElement;
}
