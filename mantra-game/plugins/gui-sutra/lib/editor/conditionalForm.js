
export default function createConditionalForm (conditionalName, node) {
  console.log('creating conditional form', conditionalName, node)
  let self = this;
  // Create the form element

  /*
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

  // Append the created elements to the form
  form.appendChild(radioGroupDiv);
  form.appendChild(conditionalInputContainer);
  // form.appendChild(removeConditionButton);
  // form.appendChild(addConditionBelowButton);
  */
  // Append the form to the DOM or a parent element as required
  // Example: document.body.appendChild(form); or parentElement.appendChild(form);

  let conditional = this.behavior.getCondition(conditionalName);
  console.log('conditional', conditional);

  if (!conditional) {
    console.log('condition not found', conditionalName);
    conditional = {
      op: '==',
      property: 'type',
      value: 'block'
    }
  }


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
      let guiContent = this.sutraFormView.querySelector('.gui-content');
      guiContent.appendChild(container);

      // Append the container to the form
      //form.querySelector('#conditionalInputContainer-' + conditionalName).appendChild(container);
    });
  } else if (typeof conditional === 'function') {
    this.showFunctionEditor(conditionalName, conditional);
  } else if (typeof conditional === 'object') {
    this.showObjectEditor(conditionalName, conditional, this.behavior.operators);
  } else {
    console.log('Unknown conditional type');
  }


  let guiContent = this.sutraFormView.querySelector('.gui-content');
  let footer = document.createElement('div');
  footer.className = 'footer';
  footer.innerHTML = `<h3>Individual Condition Footer</h3>`;
  guiContent.appendChild(footer);


}
