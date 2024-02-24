export default function inflateInput(entityElement, entityData) {
  // Create the input element
  let input = document.createElement('input');

  // Set input type if provided, default to 'text'
  input.type = entityData.type || 'text';

  // Set input value if provided
  if (entityData.value) {
    input.value = entityData.value;
  }

  // Set input placeholder if provided
  if (entityData.placeholder) {
    input.placeholder = entityData.placeholder;
  }

  // Apply default and custom input styles
  applyInputStyles(input, entityData);

  // Append the input element to the entityElement
  entityElement.appendChild(input);

  // Optional: Set width of the entityElement if provided
  if (entityData.width) {
    input.style.width = `${entityData.width}px`;
  }

  // Optional: Set color of the input text if provided
  if (entityData.color) {
    input.style.color = convertColorToHex(entityData.color);
  }


  // Event listener for input changes
  input.addEventListener('input', function(event) {
    let _input = event.target;
    // Update entity value in ECS on range change
    game.updateEntity(entityData.id, { value: _input.value });
  });

  return entityElement;
}

const defaultInputStyles = {
  padding: '10px',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'text',
  borderRadius: '4px',
  backgroundColor: '#fff',
  color: '#333',
  border: '1px solid #ccc',
  appearance: 'none', // Removes default browser styling
  transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
};

function applyInputStyles(input, entityData) {
  Object.assign(input.style, defaultInputStyles, entityData.style);

  // Add focus and change event listeners for interactive styles
  input.addEventListener('focus', () => {
    input.style.borderColor = '#80bdff';
    input.style.boxShadow = '0 0 0 0.2rem rgba(0,123,255,.25)';
  });

  input.addEventListener('blur', () => {
    input.style.borderColor = '#ccc';
    input.style.boxShadow = 'none';
  });
}

function convertColorToHex(color) {
  return typeof color === 'number' ? `#${color.toString(16)}` : color;
}