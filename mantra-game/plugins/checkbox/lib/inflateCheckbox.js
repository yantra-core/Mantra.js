// inflateCheckbox.js - Marak Squires 2024
export default function inflateCheckbox(entityElement, entityData) {
  if (Array.isArray(entityData.meta.options)) {
    entityData.meta.options.forEach(optionData => {
      let label = document.createElement('label');
      let checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = optionData.value;

      if (optionData.checked) {
        checkbox.checked = true;
      }

      if (entityData.meta.labelFirst === true) {
        label.append(optionData.label);
        label.appendChild(checkbox);
      } else {
        //label.appendChild(checkbox);
        //label.append(optionData.label);
        label.append(optionData.label);
        label.appendChild(checkbox);

      }

      // apply all styles entityData.styles to the label
      if (entityData.styles) {
        Object.keys(entityData.styles).forEach(styleKey => {
          label.style[styleKey] = entityData.styles[styleKey];
        });
      }

      // add change event for checkbox
      checkbox.addEventListener('change', function() {
        game.updateEntity(entityData.id, { value: checkbox.checked });
        //entityData.change(checkbox.checked);
      });
      // TODO: change / click events
      /*
      if (typeof entityData.pointerdown === 'function') {
        label.addEventListener('click', entityData.pointerdown);
      }
      */

      // Wrap the label (which contains the checkbox) with a control div
      const wrappedLabel = wrapControl(label, 'form-control-checkbox'); // 'form-control-checkbox' is an example class name
      entityElement.appendChild(wrappedLabel);
    });
  }
  

  return entityElement;
}

// Utility function to wrap an element with a form control div
// TODO: move this to a class function on a common utility class for UI components
function wrapControl(element, className) {
  const wrapperDiv = document.createElement('div');
  wrapperDiv.className = className; // Set the class name for styling
  wrapperDiv.appendChild(element); // Wrap the original element
  return wrapperDiv;
}