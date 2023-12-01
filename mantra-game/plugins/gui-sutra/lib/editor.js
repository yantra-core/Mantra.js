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

  // Main container for the editor
  let editorContainer = document.createElement('div');
  editorContainer.className = 'conditional-editor-container';
  guiContent.appendChild(editorContainer);

  let form = document.createElement('form');
  form.className = 'conditional-form';
  editorContainer.appendChild(form);

  // We need to always show "property" and "gameProperty", even if they are empty
  // create default empty values if they don't exist
  if (typeof conditional.property === 'undefined') {
    conditional.property = '';
  }
  if (typeof conditional.gameProperty === 'undefined') {
    conditional.gameProperty = '';
  }

  // Create form fields based on the conditional's properties
  for (let key in conditional) {
    if (key === 'op') continue; // Skip 'op' here, it will be handled separately

    let fieldContainer = document.createElement('div');
    fieldContainer.className = 'field-container';
    form.appendChild(fieldContainer);

    let label = document.createElement('label');
    label.textContent = key + ':';
    label.className = 'field-label';
    fieldContainer.appendChild(label);

    let input = document.createElement('input');
    input.type = 'text';
    input.name = key;
    input.value = conditional[key];
    input.className = 'field-input';
    fieldContainer.appendChild(input);
  }

  // Container for operator selection
  let opContainer = document.createElement('div');
  opContainer.className = 'operator-container';
  form.appendChild(opContainer);

  let opLabel = document.createElement('label');
  opLabel.textContent = 'Operator:';
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

  // Save button
  let saveButton = document.createElement('button');
  saveButton.type = 'submit';
  saveButton.textContent = 'Save';
  saveButton.className = 'save-button';
  form.appendChild(saveButton);

  saveButton.onclick = (event) => {
    event.preventDefault();
    console.log("SAVING CONDITIONAL", conditionalName, form)
    this.saveConditional(conditionalName, form);
  };
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

  // Create and append the 'Path' element
  let pathElement = document.createElement('div');
  pathElement.innerHTML = `<strong class="sutra-keyword">Path:</strong> ${humanPath}`;
  nodeInfo.appendChild(pathElement);

  // Create and append the 'If' element
  let ifElement = document.createElement('div');
  ifElement.innerHTML = `<strong class="sutra-keyword">If:</strong> ${node.if}`;
  nodeInfo.appendChild(ifElement);

  if (typeof node.then[0].action !== 'undefined') {
    // Create and append the 'Then' element
    let thenElement = document.createElement('div');
    thenElement.innerHTML = `<strong class="sutra-keyword">Then:</strong> ${node.then[0].action}`;
    nodeInfo.appendChild(thenElement);
  }

  // Append the entire node info to the GUI content
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
  console.log('creating conditional form', conditionalName, node)
  let self = this;
  // Create the form element
  let form = document.createElement('form');
  form.className = 'sutra-form';

  // Create the radio group div
  let radioGroupDiv = document.createElement('div');
  radioGroupDiv.className = 'radio-group';
  // Add radio buttons to radioGroupDiv as needed

  // Create the conditional input container div
  let conditionalInputContainer = document.createElement('div');
  conditionalInputContainer.id = `conditionalInputContainer-${conditionalName}`;
  conditionalInputContainer.className = 'input-container';

  // Create the remove condition button
  let removeConditionButton = document.createElement('button');
  removeConditionButton.type = 'submit';
  removeConditionButton.className = 'remove-condition-button';
  removeConditionButton.textContent = 'Remove Entire If Condition';

  removeConditionButton.onclick = (event) => {
    event.preventDefault();

    // find the node in the tree based on sutraPath
    // let originalNode = this.behavior.findNode(node.sutraPath);
    // remove the node from the tree
    this.behavior.removeNode(node.sutraPath);

    // close the editor window since we deleted the condition we were editing
    let sutraFormView = document.getElementById('sutraFormView');
    if (sutraFormView) {
      sutraFormView.remove();
    }

    //this.behavior.removeCondition(conditionalName);
    this.redrawBehaviorTree();
  };

  // Append the created elements to the form
  form.appendChild(radioGroupDiv);
  form.appendChild(conditionalInputContainer);
  form.appendChild(removeConditionButton);

  // Append the form to the DOM or a parent element as required
  // Example: document.body.appendChild(form); or parentElement.appendChild(form);

  let conditional = this.behavior.getCondition(conditionalName);
  console.log('conditional', conditional);

  // Handling when conditional is an array
  if (Array.isArray(conditional)) {
    // Create a container for each condition in the array
    conditional.forEach((cond, index) => {
      let container = document.createElement('div');
      container.id = `conditional-${conditionalName}-${index}`;
      container.className = 'conditional-array-item';

      // Depending on the type of condition (function or object), call the appropriate editor
      if (typeof cond === 'function') {
        this.showFunctionEditor(`${conditionalName}-${index}`, cond, container);
      } else if (typeof cond === 'object') {
        this.showObjectEditor(`${conditionalName}-${index}`, cond, this.behavior.operators, container);
      } else {
        console.log('Unknown conditional type in array');
      }

      // Append the container to the form
      form.querySelector('#conditionalInputContainer-' + conditionalName).appendChild(container);
    });
  } else if (typeof conditional === 'function') {
    this.showFunctionEditor(conditionalName, conditional);
  } else if (typeof conditional === 'object') {
    this.showObjectEditor(conditionalName, conditional, this.behavior.operators);
  } else {
    console.log('Unknown conditional type');
  }

  let guiContent = this.sutraFormView.querySelector('.gui-content');
  guiContent.appendChild(form);

  form.addEventListener('submit', function (e) {
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