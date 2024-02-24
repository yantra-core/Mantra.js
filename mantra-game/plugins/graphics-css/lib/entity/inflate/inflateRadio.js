export default function inflateRadio(entityElement, entityData) {

  if (entityData.meta && entityData.meta.options) {
    let options = entityData.meta.options;
    if (Array.isArray(options)) {
      options.forEach(optionData => {
        let label = document.createElement('label');
        let radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = entityData.groupName; // Ensure all radio buttons have the same 'name' attribute
        radio.value = optionData.value;
  
        if (optionData.checked) {
          radio.checked = true;
        }
  
        label.appendChild(radio);
        label.append(optionData.label);
        entityElement.appendChild(label);
      });
    }
  }
  
  // Optional: Apply custom styles to radio buttons
  // No default styling function provided, adapt if needed

  return entityElement;
}
