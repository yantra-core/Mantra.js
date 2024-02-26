export default function inflateButton(entityElement, entityData) {
  // Create the button
  let button = document.createElement('button');

  console.log('entityData', entityData)
  if (typeof entityData.meta === 'object' && entityData.meta.disabled === true) {
    button.disabled = true;
  }

  // Set button text if provided
  if (entityData.text) {
    button.innerHTML = entityData.text;
  }

  // Apply default and custom button styles
  applyButtonStyles(button, entityData);

  // Append the button to the entityElement
  entityElement.appendChild(button);

  // Optional: Set width and color of the entityElement if provided
  if (entityData.width) {
    entityElement.style.width = `${entityData.width}px`;
  }

  if (entityData.color) {
    entityElement.style.color = convertColorToHex(entityData.color);
  }

  // Event listeners for hover and pressed states
  button.addEventListener('mouseover', () => {
    button.style.backgroundColor = '#e6e6e6'; // Lighter shade for hover
  });

  button.addEventListener('mouseout', () => {
    button.style.backgroundColor = defaultButtonStyles.backgroundColor; // Default background color
  });

  button.addEventListener('mousedown', () => {
    button.style.backgroundColor = '#cccccc'; // Darker shade for pressed
  });

  button.addEventListener('mouseup', () => {
    button.style.backgroundColor = '#e6e6e6'; // Lighter shade for hover
  });

  return entityElement;
}

const defaultButtonStyles = {
  border: 'none',
  padding: '15px 32px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
  borderRadius: '12px',
  backgroundColor: '#f2f2f2',
  color: 'black',
  transition: 'background-color 0.4s ease, color 0.4s ease',
};

function applyButtonStyles(button, entityData) {
  Object.assign(button.style, defaultButtonStyles, entityData.style);
}

function convertColorToHex(color) {
  return typeof color === 'number' ? `#${color.toString(16)}` : color;
}
