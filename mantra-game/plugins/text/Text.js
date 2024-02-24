// Text.js - Marak Squires 2023
export default class Text {
  static id = 'text';
  constructor(config = {}) {
    this.id = Text.id;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('text', this);
  }

  build (entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    return {
      type: 'TEXT',
      body: false,
      text: entityData.text || 'Hello, Mantra!',
      position: entityData.position,
      ...entityData // Spread the rest of entityData to override defaults as necessary
    };
  }

  // TODO: rename to create? we probably need this.createEntity scope preserved for scene
  createEntity(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }
    // Create the Text entity
    const text = game.createEntity(this.build(entityData));
  }

}