// Link.js - Marak Squires 2024
import inflateLink from './lib/inflateLink.js';

export default class Link {
  static id = 'link';

  constructor(config = {}) {
    this.id = Link.id;
    this.disabled = false; // Links typically don't have a disabled state, but included for consistency
    if (typeof config.disabled === 'boolean') {
      this.disabled = config.disabled;
    }
  }

  init(game) {
    this.game = game;
    this.inflate = inflateLink.bind(this);
    this.game.systemsManager.addSystem('link', this);
  }

  build(entityData = {}) {
    entityData.position = entityData.position || { x: 0, y: 0 };
    entityData.meta = entityData.meta || {};

    if (typeof entityData.href !== 'undefined') {
      entityData.meta.href = entityData.href;
    }


    if (typeof entityData.target !== 'undefined') {
      entityData.meta.target = entityData.target;
    }

    return {
      type: 'LINK',
      body: false,
      text: entityData.text || 'Click me!',
      position: entityData.position,
      ...entityData // Spread the rest of entityData
    };
  }

  createEntity(entityData = {}) {
    entityData.position = entityData.position || { x: 0, y: 0 };

    // Create the Link entity
    const link = this.game.createEntity(this.build(entityData));
  }
}
