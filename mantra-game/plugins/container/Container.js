// Container.js - Marak Squires 2023
export default class Container {
  static id = 'container';

  constructor({ width = 40, height = 40 } = {}) {
    this.id = Container.id;
    this.width = width;
    this.height = height;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem(Container.id, this);
  }

  build(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }
    entityData.meta =  entityData.meta || {};
    entityData.meta.layout = entityData.layout || entityData.meta.layout || 'none';
    entityData.meta.grid = entityData.grid || entityData.meta.grid || {};
    entityData.items = entityData.items || entityData.meta.items || [];

    return {
      type: 'CONTAINER',
      layout: 'grid', // optional. can also be "flex" or "none"
      body: false,
      grid: {
        columns: 7, // TODO: config
        rows: 3
      },
      size: entityData.size || { width: this.width, height: this.height },
      position: entityData.position,
      ...entityData // Spread the rest of entityData to override defaults as necessary
    };
  }
}