const MANTRA = {};

MANTRA.Game = require('./Game.js').Game;

// Manually require each plugin
MANTRA.plugins = {
  AsteroidsMovement: require('./plugins/entity-movement/strategies/AsteroidsMovement.js').default,
  Border: require('./plugins/border/Border.js').default,
  Bullet: require('./plugins/bullet/Bullet.js').default,
  BabylonCamera: require('./plugins/graphics-babylon/camera/BabylonCamera.js').default,
  BabylonGraphics: require('./plugins/graphics-babylon/BabylonGraphics.js').default,
  Camera: require('./plugins/graphics-babylon/camera/BabylonCamera.js').default,
  Collision: require('./plugins/collisions/Collisions.js').default,
  EntityFactory: require('./plugins/entity-factory/EntityFactory.js').default,
  EntityInput: require('./plugins/entity-input/EntityInput.js').default,
  EntityMovement: require('./plugins/entity-movement/EntityMovement.js').default,
  Graphics: require('./plugins/graphics/Graphics.js').default,
  KeyboardBrowser: require('./plugins/browser-keyboard/KeyboardBrowser.js').default,
  Lifetime: require('./plugins/lifetime/Lifetime.js').default,
  LocalClient: require('./plugins/client-local/LocalClient.js').default,
  MatterPhysics: require('./plugins/physics-matter/MatterPhysics.js').default,
  PhaserGraphics: require('./plugins/graphics-phaser/PhaserGraphics.js').default,
  PongMovement: require('./plugins/entity-movement/strategies/PongMovement.js').default,
  StarField: require('./plugins/graphics-babylon/starfield/StarField.js').default
  // ... add other plugins similarly
};

module.exports = MANTRA;
