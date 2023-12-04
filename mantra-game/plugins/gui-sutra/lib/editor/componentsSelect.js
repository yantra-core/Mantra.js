export default function componentsSelect(id, components) {


  let fieldContainer = document.createElement('div');
  fieldContainer.className = 'field-container';

  let label = document.createElement('label');
  label.textContent = id;
  label.className = 'field-label';
  label.classList.add('sutra-keyword');
  fieldContainer.appendChild(label);


  const select = document.createElement('select');
  select.id = id;
  select.name = id;
  components.forEach((component) => {
    const option = document.createElement('option');
    option.value = component;
    option.text = component;
    select.appendChild(option);
  });
  fieldContainer.appendChild(select);

  return fieldContainer;
}