import inflate from './lib/inflateButton.js';

// Button.js - Marak Squires 2023
export default class Button {
  static id = 'button';
  constructor(config = {}) {
    this.id = Button.id;
    this.disabled = false;
    if (typeof config.disabled === 'boolean') {
      this.disabled = config.disabled;     
    }
  }

  init(game) {
    this.game = game;
    this.inflate = inflate.bind(this);
    this.game.systemsManager.addSystem('button', this);
  }

  build (entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    entityData.meta = entityData.meta || {};

    if (typeof entityData.disabled !== 'undefined') {
      entityData.meta.disabled = entityData.disabled;
    }

    // provide default size for UI elements
    if (typeof entityData.size === 'undefined') {
      entityData.size = { width: 100, height: 50 };
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