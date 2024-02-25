export default function inflateImage(entityElement, entityData) {
  let element; // This can be an <img> or <canvas>
  // Check for imageData in meta and use it if available
  if (entityData.meta && typeof entityData.meta.imageData !== 'undefined') {
    if (entityData.meta.imageData instanceof HTMLCanvasElement) {
      // Directly use the canvas instead of converting it to a data URL
      element = entityData.meta.imageData;
    } else {
      console.error('Unsupported imageData type:', entityData.meta.imageData);
      return;
    }
  } else {
    // Fallback to creating an <img> if imageData is not available or not a canvas
    element = document.createElement('img');
    if (entityData.meta && entityData.meta.src) {
      element.src = entityData.meta.src;
    }
  }

  // Optional: Apply default and custom styles
  applyImageStyles(element, entityData);

  entityElement.appendChild(element);

  // Set dimensions if specified in entityData
  if (entityData.width) {
    element.style.width = `${entityData.width}px`;
  }
  if (entityData.height) {
    element.style.height = `${entityData.height}px`;
  }

  return entityElement;
}


function applyImageStyles(img, entityData) {
  // Define and apply default styles for img here
  // This function is similar to applyIframeStyles but for <img> elements
  // For example, setting a default border, margin, or any other styles
  img.style.border = 'none'; // Example default style

  // Apply any custom styles defined in entityData
  if (entityData.styles) {
    Object.keys(entityData.styles).forEach(styleKey => {
      img.style[styleKey] = entityData.styles[styleKey];
    });
  }
}