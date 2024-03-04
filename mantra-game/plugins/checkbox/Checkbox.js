import inflateCheckbox from './lib/inflateCheckbox.js';

export default class Checkbox {
  static id = 'checkbox';
  static type = 'ui-component'; // type is optional for plugins

  constructor(config = {}) {
    this.id = Checkbox.id;
    this.type = Checkbox.type;
    this.options = config.options || [{
      label: 'Be amazing.',
      value: 'option1',
      checked: false
    },{
      label: 'Be awesome.',
      value: 'option2',
      checked: false
    }]; // Default options if not provided
  }

  init(game) {
    this.game = game;
    this.inflate = inflateCheckbox.bind(this);
    this.game.systemsManager.addSystem('checkbox', this);
  }

  build(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0, z: 0 };
    }

    entityData.meta = entityData.meta || {};

    if (Array.isArray(entityData.options)) {
      entityData.meta.options = entityData.options;
    } else {
      entityData.meta.options = this.options;
    }

    entityData.style = entityData.style || {};

    if (typeof entityData.style.fontSize === 'undefined') {
      entityData.style.fontSize = '0.8em';
    }

    return {
      type: 'CHECKBOX',
      body: false,
      meta: entityData.meta,
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
