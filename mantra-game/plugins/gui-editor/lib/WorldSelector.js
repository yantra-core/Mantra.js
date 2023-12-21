class WorldSelector {
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
    this.addOption(selectBox, 'Current World', 'Client');
    this.addOption(selectBox, '2D Platformer', 'BabylonGraphics');
    this.addOption(selectBox, '2D Overhead', 'BabylonGraphics');
    this.addOption(selectBox, 'YCraft Contraptions', 'BabylonGraphics');
    this.addOption(selectBox, 'Sutra Behavior Trees', 'BabylonGraphics');
    this.addOption(selectBox, 'XState Machines', 'BabylonGraphics');

    this.addOption(selectBox, '3D Flight', 'PhaserGraphics');
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


    game.systems.entity.clearAllEntities();
    let worldInstance = new WORLDS.worlds['XState']();
    worldInstance.init(game);

    console.log(game.systems['xstate'])

    //console.log(WORLDS.worlds['XState'])
    // WORLDS.worlds['XState'].init();

    this.hideLoadingSpinner();
    
  }

  showLoadingSpinner() {
    document.body.style.cursor = 'wait';
  }

  hideLoadingSpinner() {
    document.body.style.cursor = 'default';
  }


}

export default WorldSelector;
