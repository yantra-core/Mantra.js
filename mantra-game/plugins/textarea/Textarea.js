// Textarea.js - Marak Squires 2024
 // TODO: better mouse events support to allow for editing text by removing game.pointerdown
export default class Textarea {
  static id = 'textarea';

  constructor(config = {}) {
    this.id = Textarea.id;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('textarea', this);
  }

  build(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    return {
      type: 'TEXTAREA',
      body: false,
      text: entityData.text || '', // Default text if none provided
      position: entityData.position,
      ...entityData // Spread the rest of entityData to override defaults as necessary
    };
  }

  createEntity(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    // Create the Textarea entity
    const textareaEntity = this.game.createEntity(this.build(entityData));
  }
}
