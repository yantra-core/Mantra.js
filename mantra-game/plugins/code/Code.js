// Code.js - Marak Squires 2024
// This plugin is designed to create and manage code block entities within the game environment.
export default class Code {
  static id = 'code';

  constructor(config = {}) {
    this.id = Code.id;
    // Set default code styling here, if needed
    this.defaultStyle = config.defaultStyle || {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#D4D4D4',
      backgroundColor: '#1E1E1E',
      padding: '10px',
      borderRadius: '5px'
      // Add more default styling as needed
    };
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('code', this);
  }

  build(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    // Apply default styling to the code entity
    const style = { ...this.defaultStyle, ...entityData.style };

    entityData.meta = entityData.meta || {};

    if (typeof entityData.code !== 'undefined') {
      entityData.meta.code = entityData.code;
    }

    if (typeof entityData.src !== 'undefined') {
      entityData.meta.src = entityData.src;
    }

    return {
      type: 'CODE',
      body: false, // Assuming 'body' is used similarly to 'textarea' for physical representation
      text: entityData.text || '', // Default code text if none provided
      position: entityData.position,
      style: style, // Apply styling to the code block
      ...entityData // Spread the rest of entityData to override defaults as necessary
    };
  }

  create(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    // Create the Code entity
    const codeEntity = this.game.createEntity(this.build(entityData));

    // Additional setup for the code entity can be added here
  }
}
