export default function inflateSelect(entityElement, entityData) {
  let select = document.createElement('select');
  
  // Populate the select element with options if available
  if (entityData.meta && entityData.meta.options && Array.isArray(entityData.meta.options)) {
    entityData.meta.options.forEach(optionData => {
      let option = document.createElement('option');
      option.value = optionData.value;
      option.textContent = optionData.label;

  // Set fontSize and other styles directly on the option if needed
  if (entityData.style && entityData.style.fontSize) {
    option.style.fontSize = entityData.style.fontSize;
  }
  // Apply other styles as needed
  if (entityData.style && entityData.style.color) {
    option.style.color = entityData.style.color;
  }

      if (optionData.selected) {
        option.selected = true;
      }
      select.appendChild(option);
    });
  }

  // Apply default and custom styles
  applySelectStyles(select, entityData);

  // Append the select element to the entityElement
  entityElement.appendChild(select);

  return entityElement;
}

function applySelectStyles(select, entityData) {

  const defaultSelectStyles = {
    padding: '10px 15px',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '8px',
    backgroundColor: '#f2f2f2',
    color: 'black',
    border: '1px solid #ccc',
    appearance: 'none', // Removes default browser styling
    transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
  };

  // Apply default styles
  Object.assign(select.style, defaultSelectStyles);

  // Set width and height if provided
  if (entityData.width) {
    select.style.width = `${entityData.width}px`;
  }
  if (entityData.height) {
    select.style.height = `${entityData.height}px`;
    // Adjust padding and font size based on height if necessary
    const adjustedPadding = Math.max(0, (entityData.height - 20) / 2); // Example adjustment
    // select.style.padding = `${adjustedPadding}px 15px`;
  }

  // Set color if provided
  if (entityData.color) {
    select.style.color = convertColorToHex(entityData.color);
  }

  // Apply custom styles from entityData
  if (entityData.style) {
    Object.assign(select.style, entityData.style);
  }

  // Event listeners for interactive styles and entity updates
  select.addEventListener('focus', () => {
    select.style.borderColor = '#80bdff';
    select.style.boxShadow = '0 0 0 0.2rem rgba(0,123,255,.25)';
  });

  select.addEventListener('blur', () => {
    select.style.borderColor = '#ccc';
    select.style.boxShadow = 'none';
  });

  select.addEventListener('change', function(event) {
    let _select = event.target;
    // Update entity value in ECS on select change
    game.updateEntity(entityData.id, { value: _select.value });
  });
}

function convertColorToHex(color) {
  // Ensure color conversion logic is consistent with your needs
  return typeof color === 'number' ? `#${color.toString(16)}` : color;
}
