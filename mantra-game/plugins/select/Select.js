// Select.js - Marak Squires 2024
import inflateSelect from './lib/inflateSelect.js';

export default class Select {
  static id = 'select';

  constructor(config = {}) {
    this.id = Select.id;
    this.options = config.options ||  [
      // default select
      { label: 'Please select an option...', value: 'default', selected: true },
      { label: 'Option 1: Be Awesome', value: 'option1' },
      { label: 'Option 2: Be kind to each other', value: 'option2' },
      { label: 'Option 3: GOTO 1', value: 'option3' }
    ]; // default options
  }

  init(game) {
    this.game = game;
    this.inflate = inflateSelect.bind(this);
    this.game.systemsManager.addSystem('select', this);
  }

  build(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0, z: 11 };
    }

    // Ensure entityData.options is an array of options
    if (!Array.isArray(entityData.options)) {
      entityData.options = this.options;
    }

    if (typeof entityData.options !== 'undefined') {
      entityData.meta = entityData.meta || {};
      entityData.meta.options = entityData.options;
    }

    // convert any string options to objects
    if (typeof entityData.meta.options !== 'undefined') {
      entityData.meta.options = entityData.meta.options.map((option) => {
        if (typeof option === 'string') {
          return {
            label: option,
            value: option
          };
        }
        return option;
      });
    }


    if (typeof entityData.meta.options === 'undefined') {
      // create default options to help user experience
      entityData.meta.options = [
        { label: 'Option 1: Be Awesome', value: 'option1' },
        { label: 'Option 2: Be kind to each other', value: 'option2' },
        { label: 'Option 3: GOTO 1', value: 'option3' }
      ];
    }

    // UI components overwrite default sizes
    // this means size should be set *after* Select() is called
    // easiest thing to do for now
    entityData.size = entityData.size || { width: 220, height: 30 };


    return {
      type: 'SELECT',
      body: false,
      meta: entityData.meta,
      options: entityData.options,
      position: entityData.position,
      ...entityData // Spread the rest of entityData to override defaults as necessary
    };
  }

  createEntity(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    // Create the Select entity
    const selectEntity = this.game.createEntity(this.build(entityData));

    // Additional logic to handle the select entity can be added here
    // For example, attaching event listeners or integrating with the game's rendering system
  }
}
