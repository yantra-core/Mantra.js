// EntityEditor.js
import gui from '../gui-editor/gui.js';

class EntityEditor {
  static id = 'gui-entity-editor';

  constructor(config = {}) {
    this.id = EntityEditor.id;
    this.game = null;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem(this.id, this);
    // Initialize UI elements here

    // Check for cash
    if (typeof $ === 'undefined') {
      console.log('$ is not defined, attempting to load cash from vendor');
      game.loadScripts([
        '/vendor/cash.min.js'
      ], () => {
        console.log('All jQuery scripts loaded sequentially, proceeding with initialization');
        this.cashReady();
      });
    } else {
      this.cashReady();
    }
  }

  cashReady() {
    this.createEntityEditorUI();
  }

  createEntityEditorUI() {
    // TODO: Create UI elements for entity editing
    // This could include form fields for different properties

    // Check if the entityView window already exists
    this.entityEditor = document.getElementById('entityEditor');

    if (!this.entityEditor) {
      // Use gui.window() to create the window
      this.entityEditor = gui.window('entityEditor', 'Entity Editor', function () {
        self.game.systemsManager.removeSystem(EntityEditor.id);
      })

    }

  }

  setEntity(entity, parent = null, prefix = '') {
    const guiContent = parent ? parent : $('.gui-content', this.entityEditor);
    if (!parent) {
      guiContent.empty(); // Clear existing content only if it's the root call
      $('<form>', { id: 'entity-edit-form' }).appendTo(guiContent);
    }
    
    const form = $('#entity-edit-form');

    for (const key in entity) {
      if (!entity.hasOwnProperty(key)) continue;
      const inputName = prefix ? `${prefix}[${key}]` : key;

      if (typeof entity[key] === 'object' && entity[key] !== null) {
        const fieldSet = $('<fieldset>').appendTo(form);
        $('<legend>').text(key).appendTo(fieldSet);
        this.setEntity(entity[key], fieldSet, inputName); // Recursive call for nested objects
      } else {
        const fieldContainer = $('<div>', { class: 'form-field' }).appendTo(form);
        $('<label>', { text: key, for: 'entity-' + inputName }).appendTo(fieldContainer);
        $('<input>', { 
          type: 'text',
          id: 'entity-' + inputName,
          name: inputName,
          value: entity[key],
          class: 'entity-input'
        }).appendTo(fieldContainer);
      }
    }

    if (!parent) {
      let saveButton = $('<button>', { text: 'Save', type: 'submit' });
      // disable save button ( for now )
      saveButton.prop('disabled', true);
      saveButton.appendTo(form);
      form.on('submit', (e) => {
        e.preventDefault();
        this.saveEntity();
      });
    }
  }


  saveEntity() {
    const updatedEntity = {};
    $('#entity-edit-form .entity-input').each(function() {
      const input = $(this);
      const inputName = input.attr('name');
      // Code to parse inputName and assign value to updatedEntity at correct nested location
      // ...
    });
    // TODO: Update the entity in the game's data structure
    console.log('Updated Entity: ', updatedEntity);
  }

  createNewEntity() {
    // TODO: Implement creation of a new entity
  }

  editEntity(entity) {
    // TODO: Load the entity properties into the form for editing
  }

  saveEntity() {
    // TODO: Save the changes made to the entity
  }

  deleteEntity(entityId) {
    // TODO: Implement deletion of an entity
  }

  unload() {
    // TODO: Remove the plugin's UI elements from the DOM
  }
}

export default EntityEditor;