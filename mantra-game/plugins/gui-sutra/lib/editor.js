import gui from '../../gui-editor/gui.js';

const editor = {};


editor.showFunctionEditor = function showFunctionEditor(conditionalName, conditional) {
  let editorContainer = document.getElementById('editorContainer'); // Assuming you have a container for the editor
  editorContainer.innerHTML = ''; // Clear previous content

  let title = document.createElement('h3');
  title.textContent = `Edit Function: ${conditionalName}`;
  editorContainer.appendChild(title);

  let textarea = document.createElement('textarea');
  textarea.value = conditional.toString(); // Convert function to string
  editorContainer.appendChild(textarea);

  let saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.onclick = () => {
    const updatedFunction = new Function('return ' + textarea.value)();
    this.behavior.updateCondition(conditionalName, updatedFunction); // Assuming such a method exists
    this.redrawBehaviorTree(); // Redraw to reflect changes
  };

  editorContainer.appendChild(saveButton);
}

editor.showObjectEditor = function showObjectEditor(conditionalName, conditional, operators) {
  console.log('showObjectEditor', conditionalName, conditional, operators)
  let editorContainer = document.getElementById('editorContainer'); // Editor container
  editorContainer.innerHTML = ''; // Clear previous content

  let title = document.createElement('h3');
  title.textContent = `Edit Object: ${conditionalName}`;
  editorContainer.appendChild(title);

  let form = document.createElement('form');
  form.className = 'conditional-form'; // Add class for styling
  editorContainer.appendChild(form);

  let table = document.createElement('table');
  table.className = 'editor-table'; // Add class for styling
  form.appendChild(table);

  // Create form fields based on the conditional's properties
  for (let key in conditional) {
    if (key === 'op') continue; // Skip 'op' here, it will be handled separately

    let row = table.insertRow();
    let labelCell = row.insertCell();
    let inputCell = row.insertCell();

    let label = document.createElement('label');
    label.textContent = key;
    labelCell.appendChild(label);

    let input = document.createElement('input');
    input.type = 'text';
    input.name = key;
    input.value = conditional[key];
    inputCell.appendChild(input);
  }

  // Row for operators
  let opRow = table.insertRow();
  let opLabelCell = opRow.insertCell();
  let opSelectCell = opRow.insertCell();

  opLabelCell.appendChild(document.createTextNode('Operator'));

  let select = document.createElement('select');
  select.name = 'op';
  operators.forEach(operator => {
    let option = document.createElement('option');
    option.value = operator;
    option.text = operator;
    select.appendChild(option);
    if (conditional.op === operator) {
      option.selected = true;
    }
  });
  opSelectCell.appendChild(select);

  // Save button
  let buttonRow = table.insertRow();
  let buttonCell = buttonRow.insertCell();
  buttonCell.colSpan = 2; // Span across both columns

  let saveButton = document.createElement('button');
  saveButton.type = 'submit';
  saveButton.textContent = 'Save';
  saveButton.onclick = (event) => {
    event.preventDefault(); // Prevent form from submitting in the traditional way
    this.saveConditional(conditionalName, form);
  };
  buttonCell.appendChild(saveButton);
}

editor.showConditionalsForm = function showConditionalsForm(node) {

  if (typeof node === 'undefined') {
    // create default node with sutraPath of tree
    node = {
      sutraPath: 'tree',
      action: 'newConditional'
    };
  }

  console.log('opening window the context is', node);

  // Check if the Sutra Form Editor window exists
  let sutraFormView = document.getElementById('sutraFormView');
  if (!sutraFormView) {
    // Create the window if it doesn't exist
    this.sutraFormView = gui.window('sutraFormView', 'Sutra Form Editor', function () {
      // Handle window close event here if needed
    });
  }

  // Get gui-content from inside this.sutraFormView
  let guiContent = this.sutraFormView.querySelector('.gui-content');

  // Create or get the editor container
  let editorContainer = document.getElementById('editorContainer');
  if (!editorContainer) {
    editorContainer = document.createElement('div');
    editorContainer.id = 'editorContainer';
    guiContent.appendChild(editorContainer);
  }
  editorContainer.innerHTML = ''; // Clear previous content

  // Display the sutraPath and action at the top
  let nodeInfo = document.createElement('div');
  nodeInfo.className = 'node-info'; // Added class name

  nodeInfo.innerHTML = `<strong>Path:</strong> ${node.sutraPath}<br><strong>Action:</strong> ${node.action}`;
  editorContainer.appendChild(nodeInfo);

  // Form to choose between custom function or DSL object
  let form = document.createElement('form');
  form.className = 'sutra-form'; // Added class name

  form.innerHTML = `
  <div class="radio-group">
    <label class="radio-label">
      <input type="radio" name="conditionalType" value="dsl" class="radio-input">
      DSL Object
    </label>
    <label class="radio-label">
      <input type="radio" name="conditionalType" value="function" class="radio-input" checked>
      Custom Function
    </label>
  </div>
  <div id="conditionalInputContainer" class="input-container"></div>
  <button type="submit" class="save-button">Save Conditional</button>
`;
  editorContainer.appendChild(form);

  // Event listener for radio button change
  form.elements.conditionalType.forEach(radio => {
    radio.addEventListener('change', (e) => this.onConditionalTypeChange(e.target.value, node));
  });

  // Event listener for form submission
  form.addEventListener('submit', (e) => this.createConditional(e, node));

  // Trigger the radio button change event to populate the form
  let conditionalType = node && typeof node.condition === 'function' ? 'function' : 'dsl';
  form.elements.conditionalType.forEach(radio => {
    if (radio.value === conditionalType) {
      radio.checked = true;
      radio.dispatchEvent(new Event('change'));
    }
  });

  gui.bringToFront(this.sutraFormView);
}

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