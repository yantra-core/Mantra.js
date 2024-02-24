export default class Image {
  static id = 'image';

  constructor(config = {}) {
    this.id = Image.id;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('image', this);
  }

  build(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    return {
      type: 'IMAGE',
      body: false,
      src: entityData.src || '', // Image source URL
      alt: entityData.alt || '', // Alternative text
      position: entityData.position,
      ...entityData // Spread the rest of entityData to override defaults as necessary
    };
  }

  createEntity(entityData = {}) {
    const imageEntity = this.game.createEntity(this.build(entityData));
    // Additional logic for handling the image entity can be added here
  }
}
