// Legend.js - Marak Squires 2023

class Legend {
  constructor(config = {}) {
    this.name = 'LegendPlugin';
    this.highlightedKeys = {};  // Object to keep track of highlighted keys

  }

  init(game) {
    this.game = game;

    let entityInputSystem = game.systemsManager.getSystem('entityInput');
    let controls = entityInputSystem.controlMappings;

    let tableHTML = '<table id="controlsTable"><tr><th>Key</th><th>Action</th></tr>';
    for (let key in controls) {
      // Assign a unique ID to each row based on the key name
      tableHTML += `<tr id="row-${key}"><td>${key}</td><td>${controls[key]}</td></tr>`;
    }
    tableHTML += '</table>';
    // Add #controlsView to the DOM
    $('body').append('<div id="controlsView"><span id="closeButton">X</span>' + tableHTML + '</div>');

    // Attach event handler to close button
    $('#closeButton').on('click', function () {
      $('#controlsView').hide();
    });

    game.on('entityInput::handleInputs', (entityId, data) => {
      if (data) {
        let currentInputs = data.controls;
        // Reset the highlighting for all previously highlighted keys
        for (let key in this.highlightedKeys) {
          $(`#row-${key}`).css('background-color', '');
        }
        this.highlightedKeys = {};  // Reset highlightedKeys object for this tick
        // Iterate through the currentInputs object
        for (let key in currentInputs) {
          let row = $(`#row-${key}`);
          if (currentInputs[key]) {
            row.css('background-color', 'yellow');  // Highlight with a yellow background color
            this.highlightedKeys[key] = true;  // Store this key as highlighted
          }
        }
        // TODO: fix data signature of EE here, update EE tests
        // console.log('entityInput::handleInputs', data[1].controls);
      }
    });

    // Set up a timer to clear highlighted keys every little while
    // This is required since we only broadcast true inputs states, and assume false for all other inputs
    this.clearHighlightsInterval = setInterval(this.clearHighlights.bind(this), 500);

  }

  clearHighlights() {
    // Reset the highlighting for all previously highlighted keys
    for (let key in this.highlightedKeys) {
      $(`#row-${key}`).css('background-color', '');
    }
    this.highlightedKeys = {};  // Reset highlightedKeys object
  }

  // Make sure to clear the interval when the plugin is destroyed
  destroy() {
    clearInterval(this.clearHighlightsInterval);
  }

}

export default Legend;