const MANTRA = {};

MANTRA.Game = require('./Game.js').Game;

// Manually require each plugin
// TODO: order by group, then sort alphabetically
MANTRA.plugins = {
  AsteroidsMovement: require('./plugins/entity-movement/strategies/AsteroidsMovement.js').default,
  BabylonCamera: require('./plugins/graphics-babylon/camera/BabylonCamera.js').default,
  BabylonGraphics: require('./plugins/graphics-babylon/BabylonGraphics.js').default,
  Block: require('./plugins/block/Block.js').default,
  Border: require('./plugins/border/Border.js').default,
  Bullet: require('./plugins/bullet/Bullet.js').default,
  CSSGraphics: require('./plugins/graphics-css/CSSGraphics.js').default,
  Camera: require('./plugins/graphics-babylon/camera/BabylonCamera.js').default,
  Client: require('./plugins/client/Client.js').default,
  Collision: require('./plugins/collisions/Collisions.js').default,
  EntityFactory: require('./plugins/entity-factory/EntityFactory.js').default,
  EntityInput: require('./plugins/entity-input/EntityInput.js').default,
  EntityMovement: require('./plugins/entity-movement/EntityMovement.js').default,
  Gamepad: require('./plugins/gamepad/Gamepad.js').default,
  Graphics: require('./plugins/graphics/Graphics.js').default,
  InputLegend: require('./plugins/input-legend/InputLegend.js').default,
  PingTime: require('./plugins/ping-time/PingTime.js').default,
  SnapshotSize: require('./plugins/snapshot-size/SnapshotSize.js').default,
  Schema: require('./plugins/schema/Schema.js').default,
  CurrentFPS: require('./plugins/current-fps/CurrentFPS.js').default,
  Keyboard: require('./plugins/keyboard/Keyboard.js').default,
  Lifetime: require('./plugins/lifetime/Lifetime.js').default,
  LocalClient: require('./plugins/client/LocalClient.js').default,
  MatterPhysics: require('./plugins/physics-matter/MatterPhysics.js').default,
  Mouse: require('./plugins/mouse/Mouse.js').default,
  PhaserGraphics: require('./plugins/graphics-phaser/PhaserGraphics.js').default,
  ThreeGraphics: require('./plugins/graphics-three/ThreeGraphics.js').default,
  PongMovement: require('./plugins/entity-movement/strategies/PongMovement.js').default,
  PongWorld: require('./plugins/world/pong/PongWorld.js').default,
  StarField: require('./plugins/starfield/StarField.js').default,
  BabylonStarField: require('./plugins/starfield/BabylonStarField.js').default,
  MovementFrogger: require('./plugins/entity-movement/strategies/FroggerMovement.js').default,
  MovementPacman: require('./plugins/entity-movement/strategies/PacManMovement.js').default,
  MovementPong: require('./plugins/entity-movement/strategies/PongMovement.js').default,
  MovementAsteroids: require('./plugins/entity-movement/strategies/AsteroidsMovement.js').default
  // ... add other plugins similarly
};

module.exports = MANTRA;
