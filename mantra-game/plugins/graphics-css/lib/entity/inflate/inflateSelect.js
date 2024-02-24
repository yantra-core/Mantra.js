export default function inflateSelect(entityElement, entityData) {
  // Create the select element
  let select = document.createElement('select');
  if (entityData.meta &&  entityData.meta.options) {
    let options = entityData.meta.options;
    // Populate the select element with options
    if (Array.isArray(options)) {
      options.forEach(optionData => {
        let option = document.createElement('option');
        option.value = optionData.value;
        option.textContent = optionData.label;
        // Optional: Set the option as selected
        if (optionData.selected) {
          option.selected = true;
        }
        select.appendChild(option);
      });
    }
  }

  // Apply default and custom select styles
  applySelectStyles(select, entityData);

  // Append the select element to the entityElement
  entityElement.appendChild(select);

  // Optional: Set width and color of the entityElement if provided
  if (entityData.width) {
    entityElement.style.width = `${entityData.width}px`;
  }

  if (entityData.color) {
    entityElement.style.color = convertColorToHex(entityData.color);
  }

  return entityElement;
}

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

function applySelectStyles(select, entityData) {
  Object.assign(select.style, defaultSelectStyles, entityData.style);

  // Add focus and change event listeners for interactive styles
  select.addEventListener('focus', () => {
    select.style.borderColor = '#80bdff';
    select.style.boxShadow = '0 0 0 0.2rem rgba(0,123,255,.25)';
  });

  select.addEventListener('blur', () => {
    select.style.borderColor = '#ccc';
    select.style.boxShadow = 'none';
  });

  // change event
  select.addEventListener('change', function(event) {
    let _select = event.target;
    // Update entity value in ECS on select change
    game.updateEntity(entityData.id, { value: _select.value });
    
  });

}

function convertColorToHex(color) {
  return typeof color === 'number' ? `#${color.toString(16)}` : color;
}
