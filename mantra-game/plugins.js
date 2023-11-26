// plugins.js - Marak Squires 2023

// Core plugins
import Collision from './plugins/collisions/Collisions.js';
import EntityFactory from './plugins/entity-factory/EntityFactory.js';
import EntityInput from './plugins/entity-input/EntityInput.js';
import EntityMovement from './plugins/entity-movement/EntityMovement.js';

// Client
import Client from './plugins/client/Client.js';

// State Machines
import XState from './plugins/xstate/XState.js';

// Physics
import MatterPhysics from './plugins/physics-matter/MatterPhysics.js';
import PhysXPhysics from './plugins/physics-physx/PhysXPhysics.js';

// Data
import Schema from './plugins/schema/Schema.js';

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
import Block from './plugins/block/Block.js';

// TODO: gui-legend
import InputLegend from './plugins/input-legend/InputLegend.js';
import PluginsGUI from './plugins/gui-plugins/PluginsGUI.js';
import StarField from './plugins/starfield/StarField.js';
import BabylonStarField from './plugins//starfield/BabylonStarField.js';
import YantraGUI from './plugins/gui-yantra/YantraGUI.js';
import Editor from './plugins/gui-editor/Editor.js';
import Inspector from './plugins/gui-inspector/Inspector.js';

// Utility
import PingTime from './plugins/ping-time/PingTime.js';
import SnapshotSize from './plugins/snapshot-size/SnapshotSize.js';
import CurrentFPS from './plugins/current-fps/CurrentFPS.js';

// Movement Strategies
import MovementFrogger from './plugins/entity-movement/strategies/FroggerMovement.js';
import MovementPacman from './plugins/entity-movement/strategies/PacManMovement.js';
import MovementPong from './plugins/entity-movement/strategies/PongMovement.js';

const plugins = {
  Block,
  Border,
  Bullet,
  Collision,
  Client,
  Editor,
  EntityFactory,
  EntityInput,
  EntityMovement,
  Gamepad,
  Graphics,
  InputLegend,
  Keyboard,
  Lifetime,
  PluginsGUI,
  Inspector,
  MatterPhysics,
  PhysXPhysics,
  PingTime,
  Schema,
  SnapshotSize,
  CurrentFPS,
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
  MovementPong,
  XState
};

export default plugins;