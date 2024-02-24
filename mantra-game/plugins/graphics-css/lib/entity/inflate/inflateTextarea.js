export default function inflateTextarea(entityElement, entityData) {
  let textarea = document.createElement('textarea');
  textarea.textContent = entityData.text || ''; // Default text if none provided

  // Apply default and custom textarea styles
  applyTextareaStyles(textarea, entityData);

  // Append the textarea to the entityElement
  entityElement.appendChild(textarea);

  if (entityData.width) {
    textarea.style.width = `${entityData.width}px`;
  }

  if (entityData.height) {
    textarea.style.height = `${entityData.height}px`;
  }

  if (entityData.color) {
    textarea.style.color = convertColorToHex(entityData.color);
  }

  return entityElement;
}

function applyTextareaStyles(textarea, entityData) {
  // Define and apply default styles for textarea here
  // Similar to applySelectStyles function
}
