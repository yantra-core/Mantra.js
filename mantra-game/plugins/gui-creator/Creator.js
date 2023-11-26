// Creator.js - WIP - Intended to be a GUI for sending data to emitters by name
class Creator {
  static id = 'gui-creator';

  constructor(config = {}) {
    this.id = Creator.id;
  }

  init(game) {
    this.game = game;
    this.drawEmitterList();

  }

  drawEmitterList() {
    let emitters = Object.keys(this.game.emitters);

    // Create Dropdown
    let dropdown = document.createElement('select');
    dropdown.id = "emittersDropdown";

    let emittersKeys = Object.keys(this.game.emitters);
    // sort
    emittersKeys.sort();
    emittersKeys.forEach(emitterName => {
      let option = document.createElement('option');
      option.value = emitterName;
      option.textContent = emitterName;
      dropdown.appendChild(option);
    });

    // Create Method List Container
    let methodList = document.createElement('div');
    methodList.id = "methodList";

    // Event Listener for Emitter Selection
    dropdown.addEventListener('change', (event) => {
      this.updateMethodList(event.target.value, methodList);
    });

    // Append Elements to the Document
    let container = document.createElement('div');
    container.id = "emittersContainer";
    container.appendChild(dropdown);
    container.appendChild(methodList);
    document.body.appendChild(container);

    // Initialize with the first emitter
    this.updateMethodList(emitters[0], methodList);
  }

  updateMethodList(emitterName, methodListContainer) {
    methodListContainer.innerHTML = '';
    console.log('emitterName', emitterName)
    let methods = Object.keys(this.game.emitters[emitterName] || {});
    methods.forEach(method => {
      let form = document.createElement('form');
      form.onsubmit = (e) => {
        e.preventDefault();
        console.log('ahhh', emitterName, method, form)
        this.invokeMethod(emitterName, method, form);
      };

      let button = document.createElement('button');
      button.type = 'submit';
      button.textContent = method;

      let input = document.createElement('textarea');
      input.placeholder = 'Enter entityData as JSON';

      form.appendChild(input);
      form.appendChild(button);
      methodListContainer.appendChild(form);
    });
  }
  invokeMethod(emitterName, methodName, form) {
    let entityData = {};
    /*
    try {
      entityData = JSON.parse(form.querySelector('textarea').value);
    } catch (e) {
      console.error('Invalid JSON input:', e);
    }
    */
    console.log(`Invoked ${emitterName}::${methodName} with`, entityData);
    console.log('this.game.emitters', emitterName, this.game.emitters)
    let fn = emitterName.split('::')[1];
    this.game.emitters[emitterName][fn](entityData);
    // Add actual invocation logic here, passing entityData
  }

  destroy() {
    // Clean up if necessary
  }
}

export default Creator;