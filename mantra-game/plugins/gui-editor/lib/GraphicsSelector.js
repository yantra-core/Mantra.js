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
    this.addOption(selectBox, 'Babylon.js', 'BabylonGraphics');
    this.addOption(selectBox, 'Phaser 3', 'PhaserGraphics');
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
    // TODO: Implement what happens when the selection changes
    console.log('Selected:', event.target.value);
    console.log('this.game.systems', this.game.systems)
    if (typeof this.game.systems['graphics-babylon'] !== 'undefined') {
      this.game.systemsManager.removeSystem('graphics-babylon');
    }

    if (this.game.systems['graphics-phaser']) {
      this.game.systemsManager.removeSystem('graphics-phaser');
    }
    
    // for now, TODO: pass actual config from previous instance
    this.game.use(event.target.value, { camera: 'follow' });

    // for now, remove later
    if (event.target.value === 'BabylonGraphics') {
      this.game.use('StarField');
    }
  }

}

export default GraphicsSelector;
