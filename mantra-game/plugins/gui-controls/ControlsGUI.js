// ControlsGUI.js - Marak Squires 2023
import gui from '../gui-editor/gui.js';
class ControlsGUI {
  static id = 'gui-controls';

  constructor(config = {}) {
    this.id = ControlsGUI.id;
    this.highlightedKeys = {};
  }

  init(game) {
    this.game = game;
    this.listenForEntityInput();
    this.game.systemsManager.addSystem(this.id, this);
    // this.drawTable();
  }

  drawTable() {
    let game = this.game;

    if (!game.systems['entity-input']) {
      console.log('entity-input system not found, skipping drawTable');
      return;
    }

    let entityInputSystem = game.systemsManager.getSystem('entity-input');
    let controls = entityInputSystem.controlMappings;

    let table = document.createElement('table');
    table.id = "controlsTable";
    let headerHTML = '<tr><th>Key</th><th>Action</th></tr>';
    table.innerHTML = headerHTML;

    for (let key in controls) {
      let row = table.insertRow();
      row.id = `row-${key}`;
      let cellKey = row.insertCell();
      let cellAction = row.insertCell();
      cellKey.textContent = key;
      cellAction.textContent = controls[key];
    }

    // Use gui.window() to create the window
    this.controlsView = gui.window('controlsView', 'Input Controls', function(){
      game.systemsManager.removeSystem(ControlsGUI.id);
    });
    this.controlsView.appendChild(table);
  }

  listenForEntityInput(entity) {
    let game = this.game;
    let self = this;

    game.on('entityInput::handleInputs', (entityId, data, sequenceNumber) => {
      if (data) {
        let currentInputs = data.controls;
        for (let key in this.highlightedKeys) {
          document.getElementById(`row-${key}`).style.backgroundColor = '';
        }
        this.highlightedKeys = {};

        for (let key in currentInputs) {
          let row = document.getElementById(`row-${key}`);
          if (row && currentInputs[key]) {
            row.style.backgroundColor = '#00ff00';
            this.highlightedKeys[key] = true;
          }
        }
      }
    });

    game.on('inputStrategyRegistered', function (strategies) {
      strategies.forEach(function (strategy) {
        self.drawTable();
      });
    });

    this.clearHighlightsInterval = setInterval(this.clearHighlights.bind(this), 500);
  }

  clearHighlights() {
    for (let key in this.highlightedKeys) {
      document.getElementById(`row-${key}`).style.backgroundColor = '';
    }
    this.highlightedKeys = {};
  }

  unload () {
    // Remove the onAny listener
    if (this.listener) {
      this.game.offAny(this.listener);
      this.listener = null;
    }
    // remove all html elements
    this.controlsView.remove();
    // clear the interval
    clearInterval(this.clearHighlightsInterval);
  }
}

export default ControlsGUI;