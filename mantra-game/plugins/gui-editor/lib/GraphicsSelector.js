import SelectPicker from "../../graphics-css/lib/SelectPicker.js";

class GraphicsSelector {
  constructor(editor) {
    this.editor = editor;
    this.game = editor.game; // Store the reference to the game logic
    this.selectBox = this.createElements(); // Now returns the select box element
    this.addEventListeners();
  }

  createElements() {
    let game = this.game;
    // Create the select box
    let selectBox = document.createElement('select');
    selectBox.id = 'graphicsSelect';

    // hides by default
    selectBox.style.display = 'none';

    selectBox.style.maxHeight = '45px';

    // tool tip hint
    selectBox.title = 'Select graphics mode.\nMantra supports hot-swapping and multiplexing of graphics modes.';
    // TODO: Populate the select box with options as needed
    // Example: this.addOption(selectBox, 'Option 1', 'value1');
    this.addOption(selectBox, 'CSSGraphics - v1.1.0', 'CSSGraphics');
    this.addOption(selectBox, 'Babylon.js - v6.25.0', 'BabylonGraphics');
    this.addOption(selectBox, 'Phaser 3 - v3.60.0', 'PhaserGraphics');
    this.selectPicker = new SelectPicker(selectBox, function(selectedGraphicsMode){
      game.systems.graphics.switchGraphics(selectedGraphicsMode);
    }, game);
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

    // TODO: figure out why cursor doesnt immediate change,
    //       when switching to BabylonGraphics
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

    game.systems.graphics.switchGraphics(selectedGraphicsMode);

    // USER INTENT: Change graphics mode
    // persist this intention to the local storage
    // so that it can be restored on next page load
    game.storage.set('graphics', selectedGraphicsMode);

  }

  showLoadingSpinner() {
    document.body.style.cursor = 'wait';
  }

  hideLoadingSpinner() {
    document.body.style.cursor = 'default';
  }

}

export default GraphicsSelector;