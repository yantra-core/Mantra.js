// plugins.js - Marak Squires 2023

// Core plugins
import Collision from './plugins/collisions/Collisions.js';
import Entity from './plugins/entity/Entity.js';
import EntityInput from './plugins/entity-input/EntityInput.js';
import EntityMovement from './plugins/entity-movement/EntityMovement.js';

// Client
import Client from './plugins/client/Client.js';

// Server
// import WebsocketServer from './plugins/server/WebsocketServer.js';

// State Machines
import XState from './plugins/xstate/XState.js';

// Physics
import MatterPhysics from './plugins/physics-matter/MatterPhysics.js';
import PhysXPhysics from './plugins/physics-physx/PhysXPhysics.js';

// Data
import SnapshotManager from './plugins/snapshot-manager/SnapshotManager.js';
import Schema from './plugins/schema/Schema.js';

// Graphics
import Graphics from './plugins/graphics/Graphics.js';
import BabylonGraphics from './plugins/graphics-babylon/BabylonGraphics.js';
import Camera from './plugins/graphics-babylon/camera/BabylonCamera.js'; // TODO: rename to BabylonCamera?
import PhaserGraphics from './plugins/graphics-phaser/PhaserGraphics.js';
import PhaserCamera from './plugins/graphics-phaser/PhaserCamera.js';
import CSSGraphics from './plugins/graphics-css/CSSGraphics.js';
import ThreeGraphics from './plugins/graphics-three/ThreeGraphics.js';

// Gaming devices
import Nes from './plugins/nes/Nes.js';

// Input Devices
import Mouse from './plugins/mouse/Mouse.js';
import Keyboard from './plugins/keyboard/Keyboard.js';
import Gamepad from './plugins/gamepad/Gamepad.js';

// Multimedia Devices
import Midi from './plugins/midi/Midi.js';
import MidiGUI from './plugins/gui-midi/MidiGUI.js';
import FloatyTyper from './plugins/typer-floaty/FloatyTyper.js';
import GhostTyper from './plugins/typer-ghost/GhostTyper.js';

// Audio
import Tone from './plugins/tone/Tone.js';

// Entity Component Systems
import Health from './plugins/health/Health.js';
import Lifetime from './plugins/lifetime/Lifetime.js';

// Game Objects
import Border from './plugins/border/Border.js';
import Bullet from './plugins/bullet/Bullet.js';
import Block from './plugins/block/Block.js';
import Platform from './plugins/platform/Platform.js';
import Sword from './plugins/sword/Sword.js';
import Tile from './plugins/tile/Tile.js';

import LoadingScreen from './plugins/loading-screen/LoadingScreen.js';
// AI Behaviors
import Behaviors from './plugins/behaviors/Behaviors.js';
import Sutra from './plugins/sutra/Sutra.js';
import YCraft from './plugins/ycraft/YCraft.js';

// Timers
import Timers from './plugins/timers/Timers.js';

import PluginsGUI from './plugins/gui-plugins/PluginsGUI.js';
import StarField from './plugins/starfield/StarField.js';
import BabylonStarField from './plugins//starfield/BabylonStarField.js';

// GUI
import Inspector from './plugins/gui-inspector/Inspector.js';
import Creator from './plugins/gui-creator/Creator.js';
import ControlsGUI from './plugins/gui-controls/ControlsGUI.js';
import Editor from './plugins/gui-editor/Editor.js';
import GameEditor from './plugins/gui-game-editor/GameEditorGui.js';
import GamepadGUI from './plugins/gui-gamepad/GamepadGUI.js';
import EntitiesGUI from './plugins/gui-entities/EntitiesGUI.js';
import EntityEditor from './plugins/gui-entity-editor/EntityEditor.js';
import EventInspector from './plugins/gui-event-inspector/EventInspector.js';
import SutraGUI from './plugins/gui-sutra/SutraGUI.js';
import YantraGUI from './plugins/gui-yantra/YantraGUI.js';
import YCraftGUI from './plugins/gui-ycraft/YCraftGUI.js';
import PluginExplorer from './plugins/gui-plugin-explorer/PluginExplorer.js';
import Scoreboard from './plugins/gui-scoreboard/Scoreboard.js';

// Utility
import PingTime from './plugins/ping-time/PingTime.js';
import SnapshotSize from './plugins/snapshot-size/SnapshotSize.js';
import CurrentFPS from './plugins/current-fps/CurrentFPS.js';
import ChronoControl from './plugins/chrono-control/ChronoControl.js';

// Movement Strategies
import MovementFrogger from './plugins/entity-movement/strategies/FroggerMovement.js';
import MovementPacman from './plugins/entity-movement/strategies/PacManMovement.js';
import MovementPong from './plugins/entity-movement/strategies/PongMovement.js';


// World
import TowerWorld from './plugins/world-tower/TowerWorld.js';

const plugins = {
  Behaviors,
  Sutra,
  YCraft,
  Block,
  Platform,
  Tile,
  Border,
  Bullet,
  Sword,
  Collision,
  ChronoControl,
  Client,
  // WebsocketServer,
  Creator,
  Entity,
  EntityInput,
  EntityMovement,
  Gamepad,
  Graphics,
  Health,
  Keyboard,
  Lifetime,
  Timers,
  Midi,
  MidiGUI,
  FloatyTyper,
  GhostTyper,
  Tone,
  Nes,
  Inspector,
  ControlsGUI,
  PluginExplorer,
  LoadingScreen,
  Editor,
  GameEditor,
  GamepadGUI,
  EntityEditor,
  TowerWorld,
  EntitiesGUI,
  EventInspector,
  PluginsGUI,
  Scoreboard,
  SutraGUI,
  YCraftGUI,
  YantraGUI,
  MatterPhysics,
  PhysXPhysics,
  PingTime,
  Schema,
  SnapshotManager,
  SnapshotSize,
  CurrentFPS,
  Mouse: Mouse,
  BabylonGraphics,
  PhaserGraphics,
  PhaserCamera,
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