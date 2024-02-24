// Input.js - Marak Squires 2024
export default class Input {
  static id = 'input';

  constructor(config = {}) {
    this.id = Input.id;
    // You can extend the constructor to accept default configurations for inputs, if necessary
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('input', this);
  }

  build(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    // Extend entityData to include any input-specific properties you need, such as 'type', 'placeholder', 'value', etc.
    return {
      type: 'INPUT',
      body: false, // Assuming inputs do not have a physical representation in the game world
      inputType: entityData.inputType || 'text', // Default to 'text' type if none provided
      value: entityData.value || '', // Default value if none provided
      placeholder: entityData.placeholder || '', // Placeholder text
      position: entityData.position,
      ...entityData // Spread the rest of entityData to override defaults as necessary
    };
  }

  createEntity(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    // Create the Input entity
    const inputEntity = this.game.createEntity(this.build(entityData));

    // Additional logic for handling the input entity can be added here
    // For example, attaching event listeners for input changes or integrating with the game's UI system
  }
}
