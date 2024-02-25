// Canvas.js - Marak Squires 2024
export default class Canvas {
  static id = 'canvas';

  constructor(config = {}) {
    this.id = Canvas.id;
    // Default dimensions if not provided
    this.width = config.width || 300; // Default canvas width
    this.height = config.height || 150; // Default canvas height
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('canvas', this);
  }

  build(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    // Define the meta for canvas specifics like dimensions
    entityData.meta = entityData.meta || {};
    entityData.meta.width = entityData.meta.width || entityData.width;
    entityData.meta.height = entityData.meta.height || entityData.height;

    return {
      type: 'CANVAS',
      body: false, // Assuming 'body' indicates whether it has a physical presence in the game world
      meta: entityData.meta,
      position: entityData.position,
      ...entityData // Spread the rest of entityData to override defaults as necessary
    };
  }

  createEntity(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    // Create the Canvas entity
    const canvasEntity = this.game.createEntity(this.build(entityData));

    // For example, drawing initial content, setting up event listeners, etc.
  }
}