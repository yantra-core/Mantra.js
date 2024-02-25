export default function inflateCanvas(entityElement, entityData) {
  let canvas;

  // Check if a canvas or canvas context is passed in entityData.meta.canvas
  if (entityData.meta && entityData.meta.canvas) {
    // Assuming entityData.meta.canvas could be a canvas element or a canvas context
    canvas = entityData.meta.canvas instanceof HTMLCanvasElement ? entityData.meta.canvas : entityData.meta.canvas.canvas;
  } else {
    // Create a new canvas if none is provided
    canvas = document.createElement('canvas');
    // Use entityData.width and entityData.height directly
    canvas.width = entityData.width || 300;
    canvas.height = entityData.height || 150;

    // Optional: Apply default and custom canvas styles
    applyCanvasStyles(canvas, entityData);
  }

  // Append the canvas to the entityElement if it's not already there
  // This check is important to avoid re-adding an existing canvas to the DOM
  if (!entityElement.contains(canvas)) {
    entityElement.appendChild(canvas);
  }

  // Adjust canvas dimensions using CSS for visual scaling if necessary
  // Use entityData.width and entityData.height directly for CSS styles
  if (entityData.width) {
    canvas.style.width = `${entityData.width}px`;
  }
  if (entityData.height) {
    canvas.style.height = `${entityData.height}px`;
  }

  // Additional logic to handle drawing on the canvas if an image is provided
  if (entityData.meta && entityData.meta.imageData) {
    const ctx = canvas.getContext('2d');

    // Check if imageData is actually an Image or Canvas element
    if (entityData.meta.imageData instanceof HTMLImageElement || entityData.meta.imageData instanceof HTMLCanvasElement) {
      // Draw the image or canvas onto the canvas
      ctx.drawImage(entityData.meta.imageData, 0, 0, canvas.width, canvas.height);
    } else if (entityData.meta.imageData instanceof ImageData) {
      // If it's ImageData, use putImageData
      ctx.putImageData(entityData.meta.imageData, 0, 0);
    } else {
      console.error('Unsupported imageData type:', entityData.meta.imageData);
    }
  }

  return entityElement;
}

function applyCanvasStyles(canvas, entityData) {
  // canvas.style.border = '1px solid #000'; // Example default style

  // Apply any custom styles defined in entityData
  if (entityData.styles) {
    Object.keys(entityData.styles).forEach(styleKey => {
      canvas.style[styleKey] = entityData.styles[styleKey];
    });
  }
}
