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
    this.addOption(selectBox, 'Select World...', 'Client');
    this.addOption(selectBox, '2D Platform', 'Platform');
    //this.addOption(selectBox, '2D Overhead', 'BabylonGraphics');
    this.addOption(selectBox, 'YCraft Crafting World', 'YCraft');
    this.addOption(selectBox, 'Sutra Tree World', 'Sutra');
    this.addOption(selectBox, 'XState Machines', 'XState');

    // this.addOption(selectBox, 'Experimental 3D Space Flight', 'Space');
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
    /*
    this.game.on('plugin::ready::graphics-phaser', () => {
      this.selectElement('PhaserGraphics');
    });
    this.game.on('plugin::ready::graphics-babylon', () => {
      this.selectElement('BabylonGraphics');
    });
    */
    // Add event listener to the select box
    this.selectBox.addEventListener('change', (event) => {
      this.handleSelectionChange(event);
    });
  }

  handleSelectionChange(event) {
    let game = this.game;
    this.showLoadingSpinner();

    let selectedWorld = event.target.value;
    // alert(selectedWorld)
    game.systems.entity.clearAllEntities();
    let worldName = 'XState';
    worldName = 'Sutra';
    worldName = selectedWorld;
    let worldInstance = new WORLDS.worlds[worldName]();
    worldInstance.init(game);

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
