export default function inflateSelect(entityElement, entityData) {
  let game = this.game;
  let select = document.createElement('select');


  const defaultOptionStyles = {
    fontSize: '28px',
    cursor: 'pointer',
    backgroundColor: '#f2f2f2',
    color: 'black',
    border: 'none', // Ensure no border for the select element
    borderRadius: '8px', // Optional: Match container's border-radius if desired
    appearance: 'none', // Removes default browser styling
    transition: 'background-color 0.3s ease', // Smooth transition for background color
  };


  // remove background and border
  //entityElement.style.backgroundColor = 'transparent';
  //entityElement.style.border = 'none';
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
        // immediately update the entity value to the selected option
        // Remark: we may want to move this down until the select is appended to the entityElement
        //game.updateEntity(entityData.id, { value: option.value });
      }

      // Apply default styles
      Object.assign(option.style, defaultOptionStyles);

      select.appendChild(option);
    });
  }

  // Apply default and custom styles
  applySelectStyles(game, entityElement, select, entityData);

  // Append the select element to the entityElement
  entityElement.appendChild(select);

  return entityElement;
}

function applySelectStyles(game, entityElement, select, entityData) {

  const defaultSelectStyles = {
    paddingLeft: '10px',

    margin: '0',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#f2f2f2',
    color: 'black',
    border: 'none', // Ensure no border for the select element
    borderRadius: '8px', // Optional: Match container's border-radius if desired
    appearance: 'none', // Removes default browser styling
    transition: 'background-color 0.3s ease', // Smooth transition for background color
  };
  const defaultSelectEntityHolderStyle = {
    position: 'relative',
    width: entityData.width + 'px',
    height: entityData.height + 'px',
    padding: '0', // Adjust padding to be handled by the select element inside
    borderRadius: '8px', // Rounded corners for the container
    //backgroundColor: '#f2f2f2', // Match select background color
    //border: '1px solid #ccc', // Singular border on the container
    'boxShadow': '0 2px 4px rgba(0,0,0,0.1)', // Subtle shadow for depth
    transition: 'box-shadow 0.3s ease, border-color 0.3s ease', // Smooth transition for shadow and border color
  };


  // Apply default styles
  Object.assign(select.style, defaultSelectStyles);
  Object.assign(entityElement.style, defaultSelectEntityHolderStyle);

  // Additional style adjustments for the focus state of the select element
  select.addEventListener('focus', () => {
    entityElement.style.borderColor = 'lightblue'; // Highlight border color on focus
    entityElement.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)'; // Deeper shadow on focus
  });

  select.addEventListener('blur', () => {
    entityElement.style.borderColor = '#ccc'; // Revert border color on blur
    entityElement.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'; // Revert shadow on blur
  });

  entityElement.addEventListener('mouseenter', () => {
    entityElement.style.borderColor = 'lightblue'; // Highlight border color on hover
    entityElement.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)'; // Deeper and more pronounced shadow for a "pop" effect
    entityElement.style.transform = 'translateY(-2px)'; // Slightly raise the element for a 3D effect
    entityElement.style.transition = 'all 0.2s ease-out'; // Smooth transition for all properties
  });

  entityElement.addEventListener('mouseleave', () => {
    entityElement.style.borderColor = '#ccc'; // Revert border color on mouse leave
    entityElement.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'; // Revert shadow on mouse leave
    entityElement.style.transform = 'translateY(0)'; // Reset the position of the element
    entityElement.style.transition = 'all 0.2s ease-in'; // Smooth transition for all properties
  });

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

  select.addEventListener('click', (event) => {
    event.stopPropagation();
    alert('hi')
    
  });


  // Event listeners for interactive styles and entity updates
  select.addEventListener('focus', () => {
    select.style.borderColor = '#80bdff';
    select.style.boxShadow = '0 0 0 0.2rem rgba(0,123,255,.25)';
  });

  select.addEventListener('blur', () => {
    select.style.borderColor = '#ccc';
    select.style.boxShadow = 'none';
  });

  select.addEventListener('change', function (event) {
    let _select = event.target;
    // Update entity value in ECS on select change
    game.updateEntity(entityData.id, { value: _select.value });
  });
}

function convertColorToHex(color) {
  // Ensure color conversion logic is consistent with your needs
  return typeof color === 'number' ? `#${color.toString(16)}` : color;
}
