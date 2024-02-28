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
    // Ensure position is defined
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    /*
    if (typeof  entityData.position.z === 'undefined') {
      entityData.position.z = -10; // behind most elements so browser mouse doesn't interfere
    }
    */

    // Ensure meta is defined and contains src and alt
    entityData.meta = entityData.meta || {};
    entityData.meta.src = entityData.src || entityData.meta.src || ''; // Default src if none provided
    entityData.meta.title = entityData.title || entityData.meta.title || ''; // Default title if none provided
    entityData.meta.alt = entityData.alt || entityData.meta.alt || ''; // Default alt if none provided
    // Return the entity configuration
    return {
      type: 'IMAGE',
      body: false,
      meta: {
        ...entityData.meta, // Include the entire meta object
      },
      position: entityData.position,
      ...entityData // Spread the rest of entityData to override defaults as necessary
    };
  }

  createEntity(entityData = {}) {
    // Create the Image entity with the provided entity data
    const imageEntity = this.game.createEntity(this.build(entityData));
    // Additional logic for handling the image entity can be added here if necessary
  }
}
