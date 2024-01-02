import SelectPicker from '../../graphics-css/lib/SelectPicker.js';

class WorldSelector {
  constructor(game) {
    this.game = game;
    this.selectBox = this.createElements(); // Now returns the select box element
    this.lastLoadedWorld = null;
    this.currentWorld = null;

    this.pickerCreated = false;

    this.addEventListeners();
  }

  createElements() {
    let game = this.game;
    // Create the select box
    let selectBox = document.createElement('select');
    selectBox.id = 'graphicsSelect';
    selectBox.style.maxHeight = '45px';
    // hide by default
    selectBox.style.display = 'none';

    // TODO: Populate the select box with options as needed
    // Example: this.addOption(selectBox, 'Option 1', 'value1');

    // adds a choose your world option
    this.addOption(selectBox, 'Choose Your World', 'Choose');

    this.addOption(selectBox, 'Home World', 'Home');
    this.addOption(selectBox, 'Platform World', 'Platform');
    this.addOption(selectBox, 'Music World', 'Music');

    // this.addOption(selectBox, 'Space World', 'Platform');
    //this.addOption(selectBox, '2D Overhead', 'BabylonGraphics');

    // adds separator option
    // this.addOption(selectBox, '------Tutorial Worlds-----', '----------------', true);


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
    let that = this;
    let game = this.game;
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

    this.selectPicker = new SelectPicker(this.selectBox, function(worldName){
      game.switchWorlds(worldName);
    }, game);

    game.on('entityInput::handleInputs', (entityId, input) => {
      if (input.controls && input.controls.I !== undefined) {
        if (input.controls.I === false) {
          console.log("FALSE")
        }
        toggleModalOnKeyPress(input.controls.I);
      }
    });

    let isKeyDown = false;

    function toggleModalOnKeyPress(isKeyPressed) {
      if (isKeyPressed && !isKeyDown) {
        // Key is pressed down for the first time
        isKeyDown = true;
        toggleModal();
      } else if (!isKeyPressed && isKeyDown) {
        // Key is released
        isKeyDown = false;
        //toggleModal();
      }
    }

    function toggleModal() {
      if (that.selectPicker.showingModal) {
        that.selectPicker.hideModal();
      } else {
        that.selectPicker.showModal();
      }
    }

    game.on('world::loaded', function (pluginInstance) {
      // alert('loaded')
      console.log("world::loaded", pluginInstance.constructor.name, pluginInstance.id);
      let worldName = pluginInstance.constructor.name
      //console.log('world::loaded', worldName, pluginInstance);
      that.selectElement(worldName);
      //that.hideLoadingSpinner();
    });

  }

  // TODO: refactor world change logic to separate function
  handleSelectionChange(event) {
    let game = this.game;
    let that = this;
    this.showLoadingSpinner();

    let selectedWorld = event.target.value;

    switchWorld(selectedWorld);

    // alert('close modal')
    // hide the modal if showing
    this.selectPicker.hideModal();

    this.game.switchWorlds(selectedWorld);

    // update the dropdown to show the current world
    this.selectElement(selectedWorld);


  }

  showLoadingSpinner() {
    document.body.style.cursor = 'wait';
  }

  hideLoadingSpinner() {
    document.body.style.cursor = 'default';
  }


}

export default WorldSelector;

