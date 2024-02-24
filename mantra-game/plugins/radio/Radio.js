export default class Radio {
  static id = 'radio';

  constructor(config = {}) {
    this.id = Radio.id;
    this.options = config.options || [{
      label: 'Option 1',
      value: 'option1',
      checked: false
    },
    {
      label: 'Option 2',
      value: 'option2',
      checked: false
    },
    {
      label: 'Option 3',
      value: 'option3',
      checked: false
    }]
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('radio', this);
  }

  build(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    if (!Array.isArray(entityData.options)) {
      entityData.options = this.options;
    }

    return {
      type: 'RADIO',
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

    const radioEntity = this.game.createEntity(this.build(entityData));
  }
}
