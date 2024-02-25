// Select.js - Marak Squires 2024
export default class Select {
  static id = 'select';

  constructor(config = {}) {
    this.id = Select.id;
    this.options = config.options || []; // Default options if not provided
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('select', this);
  }

  build(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
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
