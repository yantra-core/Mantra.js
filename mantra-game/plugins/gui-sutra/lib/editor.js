const editor = {};


editor.createConditional = function createConditional(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const type = formData.get('conditionalType');
  if (type === 'function') {
    // Logic to create and add custom function conditional
    const func = new Function('return ' + formData.get('conditionalFunction'))();
    this.behavior.addCondition('customFunction', func);
  } else {
    // Logic to create and add DSL object conditional
    const dsl = {
      op: formData.get('dslOperator'),
      property: formData.get('dslProperty'),
      value: formData.get('dslValue')
    };
    this.behavior.addCondition('customDSL', dsl);
  }

  // Redraw behavior tree or update UI as needed
  this.redrawBehaviorTree();
}

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


editor.showAddConditionalForm = function showAddConditionalForm() {
  let editorContainer = document.getElementById('editorContainer');
  if (!editorContainer) {
    editorContainer = document.createElement('div');
    editorContainer.id = 'editorContainer';
    this.sutraView.appendChild(editorContainer);
  }
  editorContainer.innerHTML = ''; // Clear previous content

  // Form to choose between custom function or DSL object
  let form = document.createElement('form');
  form.innerHTML = `
    <label>
      <input type="radio" name="conditionalType" value="function" checked>
      Custom Function
    </label>
    <label>
      <input type="radio" name="conditionalType" value="dsl">
      DSL Object
    </label>
    <div id="conditionalInputContainer"></div>
    <button type="submit">Create Conditional</button>
  `;
  editorContainer.appendChild(form);

  // Event listener for radio button change
  form.elements.conditionalType.forEach(radio => {
    radio.addEventListener('change', (e) => this.onConditionalTypeChange(e.target.value));
  });

  // Event listener for form submission
  form.addEventListener('submit', (e) => this.createConditional(e));
}

editor.onConditionalTypeChange = function onConditionalTypeChange(type) {
  // Update form based on selected type
  let inputContainer = document.getElementById('conditionalInputContainer');
  if (type === 'function') {
    // Provide a textarea for custom function input
    inputContainer.innerHTML = '<textarea name="conditionalFunction"></textarea>';
  } else {
    // Provide inputs for DSL object properties
    inputContainer.innerHTML = `
      <input name="dslProperty" placeholder="Property">
      <input name="dslValue" placeholder="Value">
      <select name="dslOperator">
        ${this.behavior.getOperators().map(op => `<option value="${op}">${op}</option>`).join('')}
      </select>
    `;
  }
}


export default editor;