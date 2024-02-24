export default class Iframe {
  static id = 'iframe';

  constructor(config = {}) {
    this.id = Iframe.id;
    // Default src if not provided, can be a blank page or a specific URL
    this.src = config.src || 'about:blank'; 
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('iframe', this);
  }

  build(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    // Default iframe src from the entityData or use the plugin's default
    const src = entityData.src || this.src;

    // Define the meta for iframe specifics like dimensions
    entityData.meta = entityData.meta || {};
    entityData.meta.src = src;

    /*
    if (typeof entityData.width !== 'undefined') {
      entityData.meta.width = entityData.width;
    }

    if (typeof entityData.height !== 'undefined') {
      entityData.meta.height = entityData.height;
    }
    */
    return {
      type: 'IFRAME',
      body: false,
      meta: entityData.meta,
      position: entityData.position,
      ...entityData // Spread the rest of entityData to override defaults as necessary
    };
  }

  createEntity(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    // Create the Iframe entity
    const iframeEntity = this.game.createEntity(this.build(entityData));

    // Additional logic to handle the iframe entity can be added here
    // For example, attaching event listeners or integrating with the game's rendering system
  }
}