export default class Checkbox {
  static id = 'checkbox';

  constructor(config = {}) {
    this.id = Checkbox.id;
    this.options = config.options || []; // Default options if not provided
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('checkbox', this);
  }

  build(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    if (!Array.isArray(entityData.options)) {
      entityData.options = this.options;
    }

    return {
      type: 'CHECKBOX',
      body: false,
      meta: entityData.meta || { options: entityData.options },
      options: entityData.options,
      position: entityData.position,
      ...entityData
    };
  }

  createEntity(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    const checkboxEntity = this.game.createEntity(this.build(entityData));
  }
}
