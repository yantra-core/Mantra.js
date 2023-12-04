import actionForm from './actionForm.js';

export default function dataForm(node, indentLevel = 0) {

  this.createDataContainer = createDataContainer.bind(this);
  this.createNestedDataContainer = createNestedDataContainer.bind(this);
  this.redrawComponent = redrawComponent.bind(this);
  this.showAddPropertyForm = showAddPropertyForm.bind(this);
  this.addPropertyToNestedNode = addPropertyToNestedNode.bind(this);
  this.createObjectInput = createObjectInput.bind(this);
  this.createValueInput = createValueInput.bind(this);
  this.actionForm = actionForm.bind(this);

  // "With" context container for data
  let dataContainer = document.createElement('div');
  dataContainer.className = 'data-container';
  // Add with-container class
  dataContainer.classList.add('with-container');
  // dataContainer.classList.add('collapsed');

  // set data-path attribute to sutraPath
  dataContainer.setAttribute('data-path', node.sutraPath);

  // "With" context label
  let withLabel = document.createElement('label');
  withLabel.className = 'with-label';
  withLabel.innerHTML = `<span class="sutra-keyword">WITH</span>`;
  dataContainer.setAttribute('data-path', node.sutraPath);

  // Append the label directly to the data container
  dataContainer.appendChild(withLabel);

  // Create and append the data content to the data container
  let dataContent = this.createDataContainer(node, indentLevel);
  dataContainer.appendChild(dataContent);


  // Add "Add Property" button
  let addButton = document.createElement('button');
  addButton.innerText = 'Add Property';
  addButton.onclick = () => this.showAddPropertyForm(node, indentLevel, dataContainer);
  dataContainer.appendChild(addButton);

  return dataContainer;

}

function createDataContainer(node, indentLevel = 0) {
  console.log('creating a data container', node, indentLevel);
  let dataContainer = document.createElement('div');
  dataContainer.className = 'action-form';

  Object.keys(node.data).forEach(key => {
    let path = key;
    // Check if the value is an object and not null
    if (typeof node.data[key] === 'object' && node.data[key] !== null) {
      let nestedLabel = this.createLabel(key, indentLevel);
      dataContainer.appendChild(nestedLabel);
      let nestedContainer = this.createNestedDataContainer(node.data[key], indentLevel + 1, path);
      nestedContainer.dataset.key = key; // Optional: set a data attribute for the key
      dataContainer.appendChild(nestedContainer);

      let addButton = document.createElement('button');
      addButton.innerText = 'Add Property';
      addButton.onclick = () => this.showAddPropertyForm(node, indentLevel, dataContainer);

      // Add indentation to the button based on the indent level
      addButton.style.marginLeft = `${indentLevel + 1 * 20}px`; // adjust 20px to your preference

      dataContainer.appendChild(addButton);


    } else {
      let inputGroup = this.createInputGroup(node, key, indentLevel, path);
      dataContainer.appendChild(inputGroup);
    }
  });

  return dataContainer;
}

function showAddPropertyForm(node, indentLevel, parentElement) {
  let self = this;
  let form = document.createElement('form');
  let typeSelect = createTypeSelect();
  let valueInput = this.createValueInput('string'); // default type is string

  // Updating value input based on type selection
  typeSelect.onchange = function () {
    let selectedType = this.value;
    form.replaceChild(self.createValueInput(selectedType, indentLevel), valueInput);
    valueInput = form.elements.value;
  };

  form.appendChild(createLabelInputPair('Key', 'text', 'key'));
  form.appendChild(typeSelect);
  form.appendChild(valueInput);
  form.appendChild(createButton('Save', 'submit'));
  form.appendChild(createButton('Cancel'));

  // Cancel button functionality
  form.lastChild.onclick = function (event) {
    event.preventDefault();
    parentElement.removeChild(form);
  };

  form.onsubmit = function (event) {
    event.preventDefault();
    let key = event.target.elements.key.value;
    let value = parseValueFromInput(valueInput, typeSelect.value);

    if (indentLevel > 0) {
      // For nested objects, update the nestedNode instead of the main node
      self.addPropertyToNestedNode(node, key, value, parentElement, indentLevel);
    } else {
      addPropertyToNode(node, key, value);
      self.redrawComponent(node, indentLevel, parentElement);
    }
  };
  parentElement.appendChild(form);
}

function addPropertyToNestedNode(nestedNode, key, value, parentElement, indentLevel) {
  nestedNode[key] = value;
  // Redraw the nested object container
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
  let newDataContent = this.createDataContainer({ data: nestedNode }, indentLevel);
  parentElement.appendChild(newDataContent);
  parentElement.appendChild(createButton('Add Nested Property', 'button', () => this.showAddPropertyForm(nestedNode, indentLevel, parentElement)));
}

function createLabelInputPair(labelText, inputType, inputName) {
  let label = document.createElement('label');
  label.textContent = `${labelText}: `;
  label.classList.add('data-label');
  let input = document.createElement('input');
  input.type = inputType;
  input.name = inputName;
  label.appendChild(input);
  return label;
}

function createTypeSelect() {
  let select = document.createElement('select');
  let types = ['string', 'number', 'boolean', 'object', 'array', 'function', 'null'];
  types.forEach(type => {
    let option = document.createElement('option');
    option.value = type;
    option.textContent = type;
    select.appendChild(option);
  });
  return select;
}

function createValueInput(type, indentLevel = 0) {
  switch (type) {
    case 'boolean':
      let checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = 'value';
      return checkbox;

    case 'object':
      return this.createObjectInput(indentLevel + 1);
    case 'array':
      return createArrayInput();
    case 'function':
      return createFunctionInput();
    case 'null':
      let nullInput = document.createElement('input');
      nullInput.disabled = true;
      nullInput.name = 'value';
      return nullInput;
    default:
      let input = document.createElement('input');
      input.type = type;
      input.name = 'value';
      input.placeholder = 'Value';
      // input.classList.add('param-input');
      return input;
  }
}

function createObjectInput(indentLevel) {
  let self = this;
  let nestedNode = {}; // Initialize an empty object for nested data
  let container = document.createElement('div');
  container.className = `nested-data-container nested-level-${indentLevel}`;

  let addButton = document.createElement('button');
  addButton.textContent = 'Add Nested Property';
  addButton.onclick = function() {
    self.showAddPropertyForm(nestedNode, indentLevel + 1, container);
  };
  container.appendChild(addButton);

  return container;
}


function createArrayInput() {
  let container = document.createElement('div');
  let addButton = document.createElement('button');
  addButton.textContent = 'Add Item';
  addButton.onclick = function() {
    container.appendChild(createArrayItemInput());
  };
  container.appendChild(addButton);
  return container;
}

function createFunctionInput() {
  let textarea = document.createElement('textarea');
  textarea.placeholder = 'Enter function body here...';
  return textarea;
}

function createKeyValuePairInput() {
  let container = document.createElement('div');
  let keyInput = document.createElement('input');
  keyInput.placeholder = 'Key';
  let valueInput = this.createValueInput('string'); // default to string
  container.appendChild(keyInput);
  container.appendChild(valueInput);
  return container;
}

function createArrayItemInput() {
  let itemContainer = document.createElement('div');
  let itemInput = this.createValueInput('string'); // default to string
  let deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = function() {
    itemContainer.remove();
  };
  itemContainer.appendChild(itemInput);
  itemContainer.appendChild(deleteButton);
  return itemContainer;
}

function parseValueFromInput(input, type) {
  console.log('parseValueFromInput', input, type)
  switch (type) {
    case 'number':
      return parseFloat(input.value) || 0;
    case 'boolean':
      return input.checked;
    case 'null':
      return null;
    default:
      return input.value;
  }
}

function createButton(text, type = 'button') {
  let button = document.createElement('button');
  button.type = type;
  button.textContent = text;
  return button;
}

function addPropertyToNode(node, key, value) {
  // Assuming node.data is the object to update
  node.data[key] = value;
}

// TODO: what is going on with redrawComponent?
// it seems to not redraw actual component, just some sub-view
// it would be better if this instead just reloads the whole data view
// based on the current state of the tree
function redrawComponent(node, indentLevel, parentElement) {

  // get the exists gui-content
  let guiContent = this.sutraActionEditor.querySelector('.gui-content');
  // empty it
  guiContent.innerHTML = '';

  // redraw the node
  let dataContent = this.actionForm(node);
  guiContent.appendChild(dataContent);

  return;
  // Clear the existing content
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
  // Redraw the component
  let newDataContent = this.createDataContainer(node, indentLevel);
  parentElement.appendChild(newDataContent);
}

function createNestedDataContainer(nestedNode, indentLevel, path = '') {
  let nestedDataContainer = document.createElement('div');
  nestedDataContainer.className = 'nested-data-container nested-level-' + indentLevel;

  Object.keys(nestedNode).forEach(nestedKey => {
    let nestedPath = path ? `${path}.${nestedKey}` : nestedKey;
    // console.log('nestedPath', nestedPath)
    if (typeof nestedNode[nestedKey] === 'object' && nestedNode[nestedKey] !== null) {
      let nestedLabel = this.createLabel(nestedKey, indentLevel);
      nestedDataContainer.appendChild(nestedLabel);

      let innerNestedContainer = this.createNestedDataContainer(nestedNode[nestedKey], indentLevel + 1, nestedPath);
      innerNestedContainer.dataset.key = nestedKey; // Optional
      nestedDataContainer.appendChild(innerNestedContainer);
    } else {
      let inputGroup = this.createInputGroup({ data: nestedNode }, nestedKey, indentLevel, nestedPath);
      nestedDataContainer.appendChild(inputGroup);
    }
  });

  return nestedDataContainer;
}