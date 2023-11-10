// Core plugins
import Collision from './plugins/collisions/Collisions.js';
import EntityFactory from './plugins/entity-factory/EntityFactory.js';
import EntityInput from './plugins/entity-input/EntityInput.js';
import EntityMovement from './plugins/entity-movement/EntityMovement.js';

// Client
import Client from './plugins/client/Client.js';

// Physics
import MatterPhysics from './plugins/physics-matter/MatterPhysics.js';
import PhysXPhysics from './plugins/physics-physx/PhysXPhysics.js';

// Graphics
import Graphics from './plugins/graphics/Graphics.js';
import BabylonGraphics from './plugins/graphics-babylon/BabylonGraphics.js';
import Camera from './plugins/graphics-babylon/camera/BabylonCamera.js'; // TODO: rename to BabylonCamera?
import PhaserGraphics from './plugins/graphics-phaser/PhaserGraphics.js';
import CSSGraphics from './plugins/graphics-css/CSSGraphics.js';
import ThreeGraphics from './plugins/graphics-three/ThreeGraphics.js';

// Input Devices
import Mouse from './plugins/mouse/Mouse.js';
import Keyboard from './plugins/keyboard/Keyboard.js';
import Gamepad from './plugins/gamepad/Gamepad.js';

// Entity Component Systems
import Lifetime from './plugins/lifetime/Lifetime.js';

// Game Objects
import Border from './plugins/border/Border.js';
import Bullet from './plugins/bullet/Bullet.js';
import InputLegend from './plugins/input-legend/InputLegend.js';
import StarField from './plugins/starfield/StarField.js';
import BabylonStarField from './plugins//starfield/BabylonStarField.js';
import PingTime from './plugins/ping-time/PingTIme.js';

// Movement Strategies
import MovementFrogger from './plugins/entity-movement/strategies/FroggerMovement.js';
import MovementPacman from './plugins/entity-movement/strategies/PacManMovement.js';
import MovementPong from './plugins/entity-movement/strategies/PongMovement.js';

/*
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
  CSSGraphics: require('./plugins/graphics-css/CSSGraphics.js').default,
  InputLegend: require('./plugins/input-legend/InputLegend.js').default,
  KeyboardBrowser: require('./plugins/browser-keyboard/KeyboardBrowser.js').default,
  // MouseBrowser: require('./plugins/browser-mouse/MouseBrowser.js').default,
  Lifetime: require('./plugins/lifetime/Lifetime.js').default,
  LocalClient: require('./plugins/client-local/LocalClient.js').default,
  MatterPhysics: require('./plugins/physics-matter/MatterPhysics.js').default,
  PhaserGraphics: require('./plugins/graphics-phaser/PhaserGraphics.js').default,
  PongMovement: require('./plugins/entity-movement/strategies/PongMovement.js').default,
  StarField: require('./plugins/graphics-babylon/starfield/StarField.js').default,
  PongWorld: require('./plugins/world/pong/PongWorld.js').default,
  // ... add other plugins similarly
};
*/

const plugins = {
  Border,
  Bullet,
  Collision,
  Client,
  EntityFactory,
  EntityInput,
  EntityMovement,
  Gamepad,
  Graphics,
  InputLegend,
  Keyboard,
  Lifetime,
  MatterPhysics,
  PhysXPhysics,
  PingTime,
  Mouse: Mouse,
  BabylonGraphics,
  PhaserGraphics,
  ThreeGraphics,
  CSSGraphics,
  Camera,
  StarField,
  BabylonStarField,
  MovementFrogger,
  MovementPacman,
  MovementPong
};

export default plugins;