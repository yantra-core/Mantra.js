export default function inflateCheckbox(entityElement, entityData) {
  if (Array.isArray(entityData.options)) {
    entityData.options.forEach(optionData => {
      let label = document.createElement('label');
      let checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = optionData.value;

      if (optionData.checked) {
        checkbox.checked = true;
      }

      label.appendChild(checkbox);
      label.append(optionData.label);
      entityElement.appendChild(label);
    });
  }

  // Optional: Apply custom styles to checkboxes
  // No default styling function provided, adapt if needed

  return entityElement;
}
