// Monaco.js - Extends Monaco Plugin for Monaco Editor Integration
import inflateMonaco from './lib/inflateMonaco.js';

export default class Monaco {
  static id = 'monaco';

  constructor(config = {}) {
    this.id = Monaco.id;
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

    this.inflate = inflateMonaco.bind(this);
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('monaco', this);
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

    if (typeof entityData.language !== 'undefined') {
      entityData.meta.language = entityData.language;
    } else {
      entityData.meta.language = 'javascript'; // Default language for syntax highlighting
    }

    return {
      type: 'MONACO',
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

    // Create the Monaco entity
    const codeEntity = this.game.createEntity(this.build(entityData));

    // Additional setup for the code entity can be added here
  }
}
