import gui from '../../gui-editor/gui.js';

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
  saveButton.onclick = () => {
    const updatedFunction = new Function('return ' + textarea.value)();
    this.behavior.updateCondition(conditionalName, updatedFunction); // Assuming such a method exists
    this.redrawBehaviorTree(); // Redraw to reflect changes
  };

  guiContent.appendChild(saveButton);
}

editor.showObjectEditor = function showObjectEditor(conditionalName, conditional, operators) {


  let guiContent = this.sutraFormView.querySelector('.gui-content');
  // console.log('showObjectEditor', conditionalName, conditional, operators)
  // let editorContainer = document.getElementById('editorContainer'); // Editor container
  // editorContainer.innerHTML = ''; // Clear previous content

  let title = document.createElement('h3');
  title.textContent = `Edit Object: ${conditionalName}`;
  guiContent.appendChild(title);

  let form = document.createElement('form');
  form.className = 'conditional-form'; // Add class for styling
  guiContent.appendChild(form);

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
    console.log("SAVING CONDITIONAL", conditionalName, form)
    this.saveConditional(conditionalName, form);
  };
  buttonCell.appendChild(saveButton);
}

editor.showConditionalsForm = function showConditionalsForm(node) {
  // If the node is undefined, assume we are at tree root
  if (typeof node === 'undefined') {
    node = {
      sutraPath: 'tree',
      action: 'newConditional'
    };
  }

  console.log('node', node);

  let sutraFormView = document.getElementById('sutraFormView');
  if (!sutraFormView) {
    this.sutraFormView = gui.window('sutraFormView', 'Sutra Form Editor', function () {
      let sutraFormView = document.getElementById('sutraFormView');
      if (sutraFormView) {
        sutraFormView.remove();
      }
    });
  }

  let guiContent = this.sutraFormView.querySelector('.gui-content');
  guiContent.innerHTML = ''; // Clear previous content

  let nodeInfo = document.createElement('div');
  nodeInfo.className = 'node-info'; 
  let humanPath = this.behavior.getReadableSutraPath(node.sutraPath) || 'root';
  nodeInfo.innerHTML = `<strong>Path:</strong> ${humanPath}<br><strong>Action:</strong> ${node.action}`;
  guiContent.appendChild(nodeInfo);

  // Handle array of conditionals
  if (Array.isArray(node.if)) {
    node.if.forEach(conditionalName => {
      this.createConditionalForm(conditionalName, node);
    });
  } else {
    this.createConditionalForm(node.if, node);
  }

  gui.bringToFront(this.sutraFormView);
}

editor.createConditionalForm = function createConditionalForm(conditionalName, node) {
  let self = this;
  let form = document.createElement('form');
  form.className = 'sutra-form';
  form.innerHTML = `
    <div class="radio-group">
      <!-- Radio buttons here -->
    </div>
    <div id="conditionalInputContainer-${conditionalName}" class="input-container"></div>
    <button type="submit" class="save-button">Save Conditional</button>
    <button type="submit" class="remove-button">Remove Conditional</button>

  `;

  let conditional = this.behavior.getCondition(conditionalName);
  console.log('conditional', conditional);

  let operators = this.behavior.operators;
  if (typeof conditional === 'function') {
    this.showFunctionEditor(conditionalName, conditional);
  } else if (typeof conditional === 'object') {
    this.showObjectEditor(conditionalName, conditional, operators);
  } else {
    console.log('Unknown conditional type');
  }

  let guiContent = this.sutraFormView.querySelector('.gui-content');
  guiContent.appendChild(form);
  /*
  form.elements.conditionalType.forEach(radio => {
    radio.addEventListener('change', (e) => this.onConditionalTypeChange(e.target.value, node));
  });
  */
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log("SAVING CONDITIONAL", conditionalName, form)
    self.saveConditional(conditionalName, form);
  });
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