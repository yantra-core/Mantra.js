export default class Range {
  static id = 'range';

  constructor(config = {}) {
    this.id = Range.id;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('range', this);
  }

  build(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    return {
      type: 'RANGE',
      body: false,
      value: entityData.value || 0, // Default value if none provided
      min: entityData.min || 0, // Default minimum value
      max: entityData.max || 100, // Default maximum value
      step: entityData.step || 1, // Default step value
      position: entityData.position,
      ...entityData // Spread the rest of entityData to override defaults as necessary
    };
  }

  createEntity(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    // Create the Range entity
    const rangeEntity = this.game.createEntity(this.build(entityData));
  }
}
