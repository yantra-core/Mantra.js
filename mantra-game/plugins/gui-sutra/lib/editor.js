import gui from '../../gui-editor/gui.js';
import componentsSelect from './editor/componentsSelect.js';
const editor = {};

editor.showFunctionEditor = function showFunctionEditor(conditionalName, conditional) {

  let guiContent = this.sutraFormView.querySelector('.gui-content');

  let title = document.createElement('h3');
  title.textContent = `Edit Function: ${conditionalName}`;
  guiContent.appendChild(title);

  let textarea = document.createElement('textarea');
  textarea.value = conditional.toString(); // Convert function to string
  guiContent.appendChild(textarea);

  let saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.classList.add('save-button');
  saveButton.onclick = () => {
    const updatedFunction = new Function('return ' + textarea.value)();
    this.behavior.updateCondition(conditionalName, updatedFunction); // Assuming such a method exists
    this.redrawBehaviorTree(); // Redraw to reflect changes
  };

  guiContent.appendChild(saveButton);
}

editor.showObjectEditor = function showObjectEditor(conditionalName, conditional, operators) {
  let self = this;
  let guiContent = this.sutraFormView.querySelector('.gui-content');
  // Main container for the editor
  let editorContainer = document.createElement('div');
  editorContainer.className = 'conditional-editor-container';
  guiContent.appendChild(editorContainer);

  let form = document.createElement('form');
  form.className = 'conditional-form';
  editorContainer.appendChild(form);

  // Descriptive text
  let description = document.createElement('div');
  description.innerHTML = `<span class="sutra-keyword">property</span> refers to current context values <br/><span class="sutra-keyword">gamePropertyPath</span>  refers to global 'game.data'`;
  form.appendChild(description);

  // if global 
  //  such as gameState.ents[entity.type] or ents.BLOCK.length in game.data.

  // Radio buttons for property type selection
  let propertyRadio = createRadio('propertyType', 'property', 'Local Property');
  let gamePropertyRadio = createRadio('propertyType', 'gamePropertyPath', 'Global Game Property');
  form.appendChild(propertyRadio.container);
  form.appendChild(gamePropertyRadio.container);

  // Event listener to toggle input fields
  propertyRadio.input.addEventListener('change', toggleFields);
  gamePropertyRadio.input.addEventListener('change', toggleFields);

  // Function to create radio buttons
  function createRadio(name, value, label) {
    let container = document.createElement('div');

    let input = document.createElement('input');
    input.type = 'radio';
    input.name = name;
    input.value = value;
    input.id = value;

    let labelElement = document.createElement('label');
    labelElement.textContent = label;
    labelElement.setAttribute('for', value);

    container.appendChild(input);
    container.appendChild(labelElement);

    return { container, input };
  }

  // Function to toggle visibility of input fields
  function toggleFields() {
    // set all field values to empty string
    /*
    let fields = form.querySelectorAll('.field-input');
    fields.forEach(field => {
      field.value = '';
    });
    */

    propertySelectContainer.style.display = propertyRadio.input.checked ? 'block' : 'none';
    gamePropertyFieldContainer.style.display = gamePropertyRadio.input.checked ? 'block' : 'none';
  }

  // Create form fields
  let propertyFieldContainer = createField('property', conditional.property || '');
  let components = [];
  if (typeof game !== 'undefined' && game.components) {
    components = Object.keys(game.components);
  }
  let propertySelectContainer = componentsSelect('property', components);
  let gamePropertyFieldContainer = createField('gamePropertyPath', conditional.gamePropertyPath || '');

  form.appendChild(propertySelectContainer);
  form.appendChild(gamePropertyFieldContainer);

  // Function to create input fields
  function createField(name, value) {
    let fieldContainer = document.createElement('div');
    fieldContainer.className = 'field-container';

    let label = document.createElement('label');
    label.textContent = name;
    label.className = 'field-label';
    label.classList.add('sutra-keyword');
    fieldContainer.appendChild(label);

    let input = document.createElement('input');
    input.type = 'text';
    input.name = name;
    input.value = value;
    input.className = 'field-input';
    fieldContainer.appendChild(input);

    return fieldContainer;
  }

  /*
  // We need to always show "property" and "gameProperty", even if they are empty
  if (typeof conditional.property === 'undefined') {
    conditional.property = '';
  }
  if (typeof conditional.gameProperty === 'undefined') {
    conditional.gamePropertyPath = '';
  }
  */

  // Create form fields based on the conditional's properties
  for (let key in conditional) {
    if (key === 'op') continue; // Skip 'op' here, it will be handled separately

    if (key === 'property' || key === 'gamePropertyPath') {
      continue; // Skip these, they were handled above
      //label.classList.add('sutra-keyword');
    }

    let fieldContainer = document.createElement('div');
    fieldContainer.className = 'field-container';
    form.appendChild(fieldContainer);

    let label = document.createElement('label');
    label.textContent = key;
    label.className = 'field-label';
    fieldContainer.appendChild(label);

    let input = document.createElement('input');
    input.type = 'text';
    input.name = key;
    input.value = conditional[key];
    input.className = 'field-input';
    fieldContainer.appendChild(input);
  }

  let opContainer = document.createElement('div');
  opContainer.className = 'operator-container';
  form.appendChild(opContainer);

  let opLabel = document.createElement('label');
  opLabel.textContent = 'OP';
  opLabel.classList.add('sutra-keyword');
  opContainer.appendChild(opLabel);

  let select = document.createElement('select');
  select.name = 'op';
  select.className = 'operator-select';
  opContainer.appendChild(select);

  operators.forEach(operator => {
    let option = document.createElement('option');
    option.value = operator;
    option.text = operator;
    select.appendChild(option);
    if (conditional.op === operator) {
      option.selected = true;
    }
  });

  let saveButton = document.createElement('button');
  saveButton.type = 'submit';
  saveButton.textContent = 'Save';
  saveButton.className = 'save-button';
  form.appendChild(saveButton);

  saveButton.onclick = (event) => {
    event.preventDefault();

    // check to see which radio button is checked
    let propertyType = form.querySelector('input[name="propertyType"]:checked').value;


    // get the existing condition
    let existingCondition = this.behavior.getCondition(conditionalName);
    // create a new array of conditions
    let newConditionObj = [];
    // add the existing condition to the new array
    if (Array.isArray(existingCondition)) {
      existingCondition.forEach((cond, index) => {
        newConditionObj.push(cond);
      });
    } else {
      newConditionObj.push(existingCondition);
    }

    // get the form data
    const formData = self.serializeFormToJSON(form);

    if (propertyType === 'property') {
      // removes the gamePropertyPath property
      delete formData.gamePropertyPath;
    }
    if (propertyType === 'gamePropertyPath') {
      // removes the property property
      delete formData.property;
    }

    // add a new condition to the new array
    newConditionObj.push(formData);
    console.log('updating', conditionalName, newConditionObj)
    self.behavior.updateCondition(conditionalName, newConditionObj, true);
    // get the update condition to verify it was updated
    let updatedCondition = this.behavior.getCondition(conditionalName);
    console.log('updatedCondition', updatedCondition);
  };
  // Initially set field visibility
  if (conditional.property !== undefined) {
    propertyRadio.input.checked = true;
  } else if (conditional.gamePropertyPath !== undefined) {
    gamePropertyRadio.input.checked = true;
  }
  toggleFields(); // Call this to set initial field visibility
};




// Adjust createConditional to handle both creating and updating conditionals
editor.createConditional = function createConditional(e, node) {

  e.preventDefault();
  const formData = new FormData(e.target);
  const type = formData.get('conditionalType');
  let conditionalName = node ? node.action : 'newConditional'; // Default name for new conditional

  if (type === 'function') {
    // Logic to create and add custom function conditional
    const func = new Function('return ' + formData.get('conditionalFunction'))();
    this.behavior.updateCondition(conditionalName, func);
  } else {
    // Logic to create and add DSL object conditional
    const dsl = {
      op: formData.get('dslOperator'),
      property: formData.get('dslProperty'),
      value: formData.get('dslValue')
    };
    this.behavior.updateCondition(conditionalName, dsl);
  }

  // Redraw behavior tree or update UI as needed
  this.redrawBehaviorTree();
}

editor.onConditionalTypeChange = function onConditionalTypeChange(type, node) {
  // Update form based on selected type
  let inputContainer = document.getElementById('conditionalInputContainer');
  if (type === 'function') {
    // Provide a textarea for custom function input
    let functionValue = node && typeof node.condition === 'function' ? node.condition.toString() : '';
    inputContainer.innerHTML = `<textarea name="conditionalFunction">${functionValue}</textarea>`;
  } else {
    // Provide inputs for DSL object properties
    let propertyValue = node && node.condition && node.condition.property ? node.condition.property : '';
    let valueValue = node && node.condition && node.condition.value ? node.condition.value : '';
    let selectedOp = node && node.condition && node.condition.op ? node.condition.op : '';
    inputContainer.innerHTML = `
      <input name="dslProperty" placeholder="Property" value="${propertyValue}">
      <input name="dslValue" placeholder="Value" value="${valueValue}">
      <select name="dslOperator">
        ${this.behavior.getOperators().map(op =>
      `<option value="${op}" ${op === selectedOp ? 'selected' : ''}>${op}</option>`
    ).join('')}
      </select>
    `;
  }
}

export default editor;