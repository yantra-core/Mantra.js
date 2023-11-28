// Inspector.js - Marak Squires 2023
import gui from '../gui-editor/gui.js';
class Inspector {
  static id = 'gui-inspector';

  constructor(config = {}) {
    this.id = Inspector.id;
    this.game = null;
    this.lastEntityState = {}; // Store the last state of the entity
    this.floatProperties = ['width', 'height', 'mass', 'health', 'lifetime', 'maxSpeed'];
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem(this.id, this);
  }

  update() {

    if (!this.game.selectedEntityId) {
      if (this.game.currentPlayerId) {
        this.game.selectedEntityId = this.game.currentPlayerId;
      }
    }

    // console.log('this.selectedEntityId', this.game.selectedEntityId)
    if (this.game.selectedEntityId) {
      let entity = this.game.getEntity(this.game.selectedEntityId);
      if (this.hasEntityChanged(entity)) {
        // TODO: add sliding CSS animation effect or javascript something
        this.drawTable(entity);
        this.updateLastEntityState(entity);
      }
    }

  }

  drawTable(entity) {
    let self = this;
    if (!entity) {
      // console.log('No entity found, skipping drawTable');
      return;
    }

    let table = document.createElement('table');
    table.id = "entityPropertiesTable";
    let headerHTML = '<tr><th>Property</th><th>Value</th></tr>';
    table.innerHTML = headerHTML;

    for (let key in entity) {
      let row = table.insertRow();
      let cellKey = row.insertCell();
      let cellValue = row.insertCell();
      cellKey.textContent = key;

      if (key === 'graphics') {
        cellValue.textContent = 'graphics';
      } else {
        this.renderValue(cellValue, entity[key], key);
      }
    }

    // Check if the entityView window already exists
    let entityView = document.getElementById('entityView');

    if (!entityView) {
      // Use gui.window() to create the window
      entityView = gui.window('entityView', 'Entity Inspector', function(){
        self.game.systemsManager.removeSystem(Inspector.id);
      })

      // Optional: add custom styles or classes to the window
      entityView.className += ' custom-inspector-class'; // Example
    } else {

      // Check if the entityPropertiesTable already exists and remove it if it does
      let existingTable = document.getElementById('entityPropertiesTable');
      if (existingTable) {
        existingTable.remove();
      }

    }

    /*
    // remove existing table if it exists
    let existingTable = document.getElementById('entityPropertiesTable');
    if (existingTable) {
      existingTable.remove();
    }
    */

    // append the table to div with class name gui-content that is child inside entityView
    let guiContent = entityView.querySelector('.gui-content');
    guiContent.appendChild(table);
    // entityView.append(table);
  }

  renderValue(cell, value, key) {
    if (typeof value === 'object' && value !== null) {
      let subTable = document.createElement('table');
      for (let subKey in value) {
        let subRow = subTable.insertRow();
        let subCellKey = subRow.insertCell();
        let subCellValue = subRow.insertCell();
        subCellKey.textContent = subKey;
        this.renderValue(subCellValue, value[subKey], subKey);
      }
      cell.appendChild(subTable);
    } else {
      if (key === 'creationTime') {
        value = new Date(value).toISOString();
      }
      else if (typeof value === 'number') {
        value = this.truncateToPrecision(value);
      }
      cell.textContent = value;
    }
  }

  // Remark: This should be implemented in the core of the EnitityFactory with a flag hasChanged=true
  hasEntityChanged(entity) {
    // Check if the entity has changed
    for (let key in entity) {
      if (typeof entity[key] !== 'object' && (!this.lastEntityState.hasOwnProperty(key) || this.lastEntityState[key] !== entity[key])) {
        // console.log('Found a change at first level', key, this.lastEntityState[key], entity[key])
        return true; // Found a change at first level
      }

      if (typeof entity[key] === 'object' && entity[key] !== null) {
        let subObject = entity[key];
        let lastSubObject = this.lastEntityState[key] || {};

        for (let subKey in subObject) {
          if (!lastSubObject.hasOwnProperty(subKey) || lastSubObject[subKey] !== subObject[subKey]) {
            // console.log('Found a change at second level', subKey, lastSubObject[subKey], subObject[subKey])
            return true; // Found a change at second level
          }
        }
      }
    }
    return false; // No change found
  }

  // Remark: This should be implemented in the core of the EnitityFactory with a flag hasChanged=true
  updateLastEntityState(entity) {
    // Update the last entity state for future comparisons
    this.lastEntityState = {};

    for (let key in entity) {
      if (typeof entity[key] === 'object' && entity[key] !== null) {
        this.lastEntityState[key] = { ...entity[key] }; // Shallow copy for second-level objects
      } else {
        this.lastEntityState[key] = entity[key];
      }
    }
  }

  truncateToPrecision(value, precision = 4) {
    return Number(value.toFixed(precision));
  }

  unload() {
    // Remove the plugin's UI elements from the DOM
    let entityView = document.getElementById('entityView');
    if (entityView) {
      entityView.remove();
    }

  }

}

export default Inspector;