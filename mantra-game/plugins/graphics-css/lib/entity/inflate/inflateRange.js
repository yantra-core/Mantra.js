export default function inflateRange(entityElement, entityData) {
  let range = document.createElement('input');
  range.type = 'range';
  range.value = entityData.value || 100; // Default value if none provided

  if (entityData.min) {
    range.min = entityData.min;
  }

  if (entityData.max) {
    range.max = entityData.max;
  }

  if (entityData.step) {
    range.step = entityData.step;
  }

  // Apply default and custom range styles
  applyRangeStyles(range, entityData);
  console.log('rrrrr', range)
  // Append the range input to the entityElement
  entityElement.appendChild(range);

  if (entityData.width) {
    entityElement.style.width = `${entityData.width}px`;
  }

  if (entityData.color) {
    entityElement.style.color = convertColorToHex(entityData.color);
  }

  // Event listener for range input changes
  range.addEventListener('input', function(event) {
    let _range = event.target;
    // Update entity value in ECS on range change
    game.updateEntity(entityData.id, { value: _range.value });
  });

  return entityElement;
}

function applyRangeStyles(range, entityData) {
  // Basic default styles for range input
  const defaultRangeStyles = {
    // Example default styles; adjust as needed
    display: 'block',
    width: '100%', // Takes full width of the container
    margin: '8px 0', // Adds some space around the slider
    cursor: 'pointer',
  };

  Object.assign(range.style, defaultRangeStyles, entityData.style);

  // Additional styling can be applied through entityData.style
}

function convertColorToHex(color) {
  return typeof color === 'number' ? `#${color.toString(16)}` : color;
}
