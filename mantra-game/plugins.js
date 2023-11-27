// plugins.js - Marak Squires 2023

// Core plugins
import Collision from './plugins/collisions/Collisions.js';
import Entity from './plugins/entity/Entity.js';
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
import Health from './plugins/health/Health.js';
import Lifetime from './plugins/lifetime/Lifetime.js';

// Game Objects
import Border from './plugins/border/Border.js';
import Bullet from './plugins/bullet/Bullet.js';
import Block from './plugins/block/Block.js';

// AI Behaviors
import Behaviors from './plugins/behaviors/Behaviors.js';

import PluginsGUI from './plugins/gui-plugins/PluginsGUI.js';
import StarField from './plugins/starfield/StarField.js';
import BabylonStarField from './plugins//starfield/BabylonStarField.js';

// GUI
import Inspector from './plugins/gui-inspector/Inspector.js';
import Creator from './plugins/gui-creator/Creator.js';
import ControlsGUI from './plugins/gui-controls/ControlsGUI.js';
import Editor from './plugins/gui-editor/Editor.js';
import EventInspector from './plugins/gui-event-inspector/EventInspector.js';
import SutraGUI from './plugins/gui-sutra/SutraGUI.js';
import YantraGUI from './plugins/gui-yantra/YantraGUI.js';

// Utility
import PingTime from './plugins/ping-time/PingTime.js';
import SnapshotSize from './plugins/snapshot-size/SnapshotSize.js';
import CurrentFPS from './plugins/current-fps/CurrentFPS.js';

// Movement Strategies
import MovementFrogger from './plugins/entity-movement/strategies/FroggerMovement.js';
import MovementPacman from './plugins/entity-movement/strategies/PacManMovement.js';
import MovementPong from './plugins/entity-movement/strategies/PongMovement.js';

const plugins = {
  Behaviors,
  Block,
  Border,
  Bullet,
  Collision,
  Client,
  Creator,
  Entity,
  EntityInput,
  EntityMovement,
  Gamepad,
  Graphics,
  Health,
  Keyboard,
  Lifetime,
  Editor,
  Inspector,
  EventInspector,
  ControlsGUI,
  PluginsGUI,
  SutraGUI,
  YantraGUI,
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