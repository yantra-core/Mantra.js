// InputLegend.js - Marak Squires 2023
class InputLegend {
  static id = 'input-legend';

  constructor(config = {}) {
    this.id = InputLegend.id;
    this.highlightedKeys = {};
  }

  init(game) {
    this.game = game;
    this.listenForEntityInput();
  }

  drawTable() {
    let game = this.game;
    let entityInputSystem = game.systemsManager.getSystem('entityInput');
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

    let controlsView = document.createElement('div');
    controlsView.id = "controlsView";

    let closeButton = document.createElement('span');
    closeButton.id = "closeButton";
    closeButton.className = "closeButton";
    closeButton.textContent = 'X';
    closeButton.addEventListener('click', function () {
      controlsView.style.display = 'none';
    });

    controlsView.appendChild(closeButton);
    controlsView.appendChild(table);
    document.body.appendChild(controlsView);
  }

  listenForEntityInput(entity) {
    let game = this.game;
    let self = this;

    game.on('entityInput::handleInputs', (entityId, data) => {
      if (data) {
        let currentInputs = data.controls;
        for (let key in this.highlightedKeys) {
          document.getElementById(`row-${key}`).style.backgroundColor = '';
        }
        this.highlightedKeys = {};

        for (let key in currentInputs) {
          let row = document.getElementById(`row-${key}`);
          if (row && currentInputs[key]) {
            row.style.backgroundColor = 'yellow';
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

  destroy() {
    clearInterval(this.clearHighlightsInterval);
  }
}

export default InputLegend;