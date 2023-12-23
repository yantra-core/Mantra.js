class WorldSelector {
  constructor(game) {
    this.game = game;
    this.selectBox = this.createElements(); // Now returns the select box element
    this.lastLoadedWorld = null;
    this.addEventListeners();
  }

  createElements() {
    // Create the select box
    let selectBox = document.createElement('select');
    selectBox.id = 'graphicsSelect';
    selectBox.style.maxHeight = '45px';

    // TODO: Populate the select box with options as needed
    // Example: this.addOption(selectBox, 'Option 1', 'value1');

    // adds a choose your world option
    this.addOption(selectBox, 'Choose Your World', 'Choose');

    this.addOption(selectBox, 'Home World', 'Home');
    this.addOption(selectBox, 'Platform World', 'Platform');
    // this.addOption(selectBox, 'Space World', 'Platform');
    //this.addOption(selectBox, '2D Overhead', 'BabylonGraphics');

    // adds separator option
    this.addOption(selectBox, '------Tutorial Worlds-----', '----------------', true);


    this.addOption(selectBox, 'YCraft World', 'YCraft');
    this.addOption(selectBox, 'Sutra World', 'Sutra');
    this.addOption(selectBox, 'XState World', 'XState');

    // this.addOption(selectBox, 'Experimental 3D Space Flight', 'Space');
    return selectBox;
  }

  selectElement(value) {
    // Select the option with the given value
    this.selectBox.value = value;
  }

  addOption(selectBox, text, value, disabled) {
    let option = document.createElement('option');
    option.text = text;
    option.value = value;
    if (disabled) {
      option.disabled = true;
    }
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

  // TODO: refactor world change logic to separate function
  handleSelectionChange(event) {
    let game = this.game;
    let that = this;
    this.showLoadingSpinner();

    let selectedWorld = event.target.value;

    // check to see if game.worlds has any entries
    // if so, unload them if they have an unload method
    if (game.worlds.length > 0) {
      game.worlds.forEach((world, i) => {
        if (world.unload) {
          // alert(`Unloading ${world.id}`);
          console.log(world.id, 'world.unload', world.unload)
          // remove the world from the game.worlds array
          // TODO: we could move this logic into Game.js
          game.worlds.splice(i, 1);
          world.unload();
        }
      });
    }

    game.systems.entity.clearAllEntities(false);
    let worldName = 'XState';
    worldName = 'Sutra';
    worldName = selectedWorld;
    
    let worldClass = WORLDS.worlds[worldName];
    let worldInstance = new worldClass();

    game.on('plugin::loaded::' + worldInstance.id, function () {
      that.hideLoadingSpinner();
    });

    game.use(worldInstance);
    
  }

  showLoadingSpinner() {
    document.body.style.cursor = 'wait';
  }

  hideLoadingSpinner() {
    document.body.style.cursor = 'default';
  }


}

export default WorldSelector;
