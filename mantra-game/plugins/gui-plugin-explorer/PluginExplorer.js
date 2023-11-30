// PluginExplorer.js - Marak Squires 2023
import gui from '../gui-editor/gui.js';

class PluginExplorer {
  static id = 'gui-plugin-explorer';

  constructor(config = {}) {
    this.id = PluginExplorer.id;
    this.pluginInstances = [];
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem(this.id, this);
  }

  drawPluginForm(pluginInstance, pluginClass) {
    // document.body.innerHTML = '';

    let container = document.getElementById('pluginContainer');

    // Clear a specific container instead of the entire body
    // ;
    if (!container) {
      console.log('PluginExplorer: container not found, creating one');
      container = gui.window('pluginExplorer', 'Plugin Explorer', function(){
        game.systemsManager.removeSystem(PluginExplorer.id);
      });
    }

    let guiContent = container.querySelector('.gui-content');

    // container.innerHTML = '';

    // Get static methods and properties
    const staticMembers = Object.getOwnPropertyNames(pluginClass);

    // Get static methods
    const staticMethods = Object.getOwnPropertyNames(pluginClass)
      .filter(prop => typeof pluginClass[prop] === 'function');

    // Get instance methods
    const instanceMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(pluginInstance))
      .filter(prop => typeof pluginInstance[prop] === 'function' && prop !== 'constructor');

    // Get instance properties (non-methods)
    const instanceProperties = Object.getOwnPropertyNames(pluginInstance)
      .filter(prop => typeof pluginInstance[prop] !== 'function');

    // Create a container for the form
    const formContainer = document.createElement('div');
    formContainer.id = `${pluginInstance.constructor.name}-form`;
    formContainer.className = 'plugin-form-container';

    // Function to create forms for methods
    const createMethodForm = (method, isStatic) => {
      const form = document.createElement('form');
      form.id = `${method}-form`;
      form.className = 'method-form';
      form.innerHTML = `
        <label class="method-label" for="${method}-input">${isStatic ? 'Static: ' : ''}${method}</label>
        <input class="method-input" type="text" id="${method}-input" name="${method}-input">
        <button class="submit-button" type="submit">Execute</button>
      `;

      // Event listener for form submission
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const input = form.querySelector(`#${method}-input`).value;
        const result = isStatic ? pluginClass[method](input) : pluginInstance[method](input);
        console.log(`Result of ${method}:`, result); // Handle the result as needed
      });

      return form;
    };

    // Add forms for static methods and display static properties
    staticMembers.forEach(member => {
      if (typeof pluginClass[member] === 'function') {
        formContainer.appendChild(createMethodForm(member, true));
      } else {
        if (member === 'prototype') return; // Skip prototype (not needed)
        let value = pluginClass[member];
        if (typeof value === 'object') {
          // value = JSON.stringify(value, true, 2);
          value = '[ Object ]';
        }
        const staticPropDiv = document.createElement('div');
        staticPropDiv.className = 'property-display';
        staticPropDiv.innerHTML = `<strong>Static ${member}:</strong> ${value}`;
        formContainer.appendChild(staticPropDiv);
      }
    });

    // Add forms for instance methods
    instanceMethods.forEach(method => {
      formContainer.appendChild(createMethodForm(method, false));
    });

    // Display instance properties
    instanceProperties.forEach(property => {
      const propDiv = document.createElement('div');
      let value = pluginInstance[property];
      if (typeof value === 'object') {
        // TODO: circular reference check
        // value = JSON.stringify(value, true, 2);
        value = '[ Object ]';
      }
      propDiv.className = 'property-display';
      propDiv.innerHTML = `<strong>${property}:</strong> ${value}`;
      formContainer.appendChild(propDiv);
    });

    // Append the form container to your specified container
    guiContent.appendChild(formContainer);

    // Append the form container to your specified container
    //container.appendChild(formContainer);
  }


  // Additional methods as required...
}

export default PluginExplorer;

// TODO: add method to simulate game state / replay gametate
// should depend on separate plugin for replaying game state / could be chronocontrol related 