// Button.js - Marak Squires 2023
export default class Button {
  static id = 'button';
  constructor(config = {}) {
    this.id = Button.id;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('button', this);
  }

  build (entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }
    return {
      type: 'BUTTON',
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

    // Create the Button entity
    const text = game.createEntity(this.build(entityData));
  }

}