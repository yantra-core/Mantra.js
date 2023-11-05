// Legend.js - Marak Squires 2023

class Legend {
  constructor(config = {}) {
    this.name = 'LegendPlugin';
  }

  init(game) {
    this.game = game;
    let controls = game.systems.entityInput.controlMappings;

    let tableHTML = '<table id="controlsTable"><tr><th>Key</th><th>Action</th></tr>';
    for (let key in controls) {
      // Assign a unique ID to each row based on the key name
      tableHTML += `<tr id="row-${key}"><td>${key}</td><td>${controls[key]}</td></tr>`;
    }
    tableHTML += '</table>';
    // Add #controlsView to the DOM
    $('body').append('<div id="controlsView"><span id="closeButton">X</span>' + tableHTML + '</div>');

    // Attach event handler to close button
    $('#closeButton').on('click', function() {
      $('#controlsView').hide();
    });

    game.on('entityInput::handleInputs', function(data) {
      if (data[0]) {
        let currentInputs = data[1].controls;
        // Iterate through the currentInputs object
        for (let key in currentInputs) {
          // Use the unique ID to select the corresponding table row
          let row = $(`#row-${key}`);
          // Update the background color based on the boolean value
          if (currentInputs[key]) {
            row.css('background-color', 'yellow');  // Highlight with a yellow background color
          } else {
            row.css('background-color', '');  // Reset background color
          }
        }
        console.log('entityInput::handleInputs', data[1].controls);
      }
    });

  }
}

export default Legend;