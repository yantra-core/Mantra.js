class GraphicsSelector {
  constructor(game) {
    this.game = game;
    this.selectBox = this.createElements(); // Now returns the select box element
    this.addEventListeners();
  }

  createElements() {
    // Create the select box
    let selectBox = document.createElement('select');
    selectBox.id = 'graphicsSelect';
    // TODO: Populate the select box with options as needed
    // Example: this.addOption(selectBox, 'Option 1', 'value1');
    this.addOption(selectBox, 'Mantra CSS - v1.1.0', 'CSSGraphics');
    this.addOption(selectBox, 'Babylon.js - v6.25.0', 'BabylonGraphics');
    this.addOption(selectBox, 'Phaser 3 - v3.60.0', 'PhaserGraphics');
    return selectBox;
  }

  selectElement(value) {
    // Select the option with the given value
    this.selectBox.value = value;
  }

  addOption(selectBox, text, value) {
    let option = document.createElement('option');
    option.text = text;
    option.value = value;
    selectBox.add(option);
  }

  addEventListeners() {
    this.game.on('plugin::ready::graphics-phaser', () => {
      this.selectElement('PhaserGraphics');
    });
    this.game.on('plugin::ready::graphics-babylon', () => {
      this.selectElement('BabylonGraphics');
    });
    // Add event listener to the select box
    this.selectBox.addEventListener('change', (event) => {
      this.handleSelectionChange(event);
    });
  }

  handleSelectionChange(event) {
    let game = this.game;
    this.showLoadingSpinner();

    // Get the value of the selected graphics mode
    const selectedGraphicsMode = event.target.value;
    let selectGraphicsId;

    if (selectedGraphicsMode === 'BabylonGraphics') {
      selectGraphicsId = 'graphics-babylon';
    }

    if (selectedGraphicsMode === 'PhaserGraphics') {
      selectGraphicsId = 'graphics-phaser';
    }

    if (selectedGraphicsMode === 'CSSGraphics') {
      selectGraphicsId = 'graphics-css';
    }

    // Check if the selected graphics mode is already registered
    if (typeof this.game.systems[selectGraphicsId] === 'undefined') {
      this.game.use(selectedGraphicsMode, { camera: 'follow' });

      // Add event listeners for plugin ready events
      this.game.once(`plugin::ready::${selectGraphicsId}`, () => {

        // iterate through all existing graphics ( except this one ) and remove them
        this.game.graphics.forEach(function (graphics) {
          if (graphics.id !== selectGraphicsId) {
            game.systemsManager.removeSystem(graphics.id);
          }
        });

        this.hideLoadingSpinner();
      });
    }
  }

  showLoadingSpinner() {
    document.body.style.cursor = 'wait';
  }

  hideLoadingSpinner() {
    document.body.style.cursor = 'default';
  }


}

export default GraphicsSelector;
