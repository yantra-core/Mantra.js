import config from './config/config.js';

//
// Game and Clients
//
//import { Game } from '@yantra-core/mantra/Game.js';
import { Game } from '@yantra-core/mantra';

//
// Plugins
//
import EntityFactory from '@yantra-core/mantra/plugins/entity-factory/EntityFactory.js';
import EntityInput from '@yantra-core/mantra/plugins/entity-input/EntityInput.js';
import EntityMovement from '@yantra-core/mantra/plugins/entity-movement/EntityMovement.js';

import MatterPhysics from '@yantra-core/mantra/plugins/physics-matter/MatterPhysics.js';
import PhysXPhysics from '@yantra-core/mantra/plugins/physics-physx/PhysXPhysics.js'; // WIP

//
// Game elements
//
import Bullet from '@yantra-core/mantra/plugins/bullet/Bullet.js';
import Border from '@yantra-core/mantra/plugins/border/Border.js';


import Collision from '@yantra-core/mantra/plugins/collisions/Collisions.js';

//
// Input Strategies
//
import TwoDimensionalInputStrategy from '@yantra-core/mantra/plugins/entity-input/strategies/2D/DefaultInputStrategy.js';
import ThreeDimensionalInputStrategy from '@yantra-core/mantra/plugins/entity-input/strategies/3D/DefaultInputStrategy.js';


//
// Movement Strategies
//
import AsteroidsMovement from '@yantra-core/mantra/plugins/entity-movement/strategies/AsteroidsMovement.js';
import PongMovement from '@yantra-core/mantra/plugins/entity-movement/strategies/PongMovement.js';
import PacManMovement from '@yantra-core/mantra/plugins/entity-movement/strategies/PacManMovement.js';
import FroggerMovement from '@yantra-core/mantra/plugins/entity-movement/strategies/FroggerMovement.js';


// Browser / Client specific Plugins
import Graphics from '@yantra-core/mantra/plugins/graphics/Graphics.js';
import BabylonGraphics from '@yantra-core/mantra/plugins/graphics-babylon/BabylonGraphics.js';
import PhaserGraphics from '@yantra-core/mantra/plugins/graphics-phaser/PhaserGraphics.js';
import CSSGraphics from '@yantra-core/mantra/plugins/graphics-css/CSSGraphics.js';


// TODO: create some common Plugins scope so we don't have to require like this

import KeyboardBrowser from '@yantra-core/mantra/plugins/browser-keyboard/KeyboardBrowser.js';
import KeyboardBrowser2 from '@yantra-core/mantra/plugins/browser-keyboard/KeyboardBrowser2.js';
import MouseBrowser from '@yantra-core/mantra/plugins/browser-mouse/MouseBrowser.js';
import Camera from '@yantra-core/mantra/plugins/graphics-babylon/camera/BabylonCamera.js';
import StarField from '@yantra-core/mantra/plugins/graphics-babylon/starfield/StarField.js';

import Chat from '@yantra-core/mantra/plugins/chat/Chat.js';
import PongWorld from '@yantra-core/mantra/plugins/world/pong/PongWorld.js';

import LocalClient from '@yantra-core/mantra/plugins/client-local/LocalClient.js';
import WebSocketClient from '@yantra-core/mantra/plugins/client-websocket/WebsocketClient.js';


//
// Creates a new game instance
//
let game = new Game({
  isClient: true,
  width: 1600 * 2,
  height: 900 * 2,
});

//
// Use Plugins to add systems to the game
//
game
  //.use(new PhysXPhysics())
  .use(new MatterPhysics())
  .use(new Collision())
  .use(new EntityFactory())
  .use(new EntityInput())           // will use default 2D input strategy if none are .use() below
  // .use(new TwoDimensionalInputStrategy())
  .use(new EntityMovement())        // will use default 2D movement strategy if none are .use() below
  // .use(new AsteroidsMovement())
  .use(new Bullet())

//
// Since this is the Client, we can add a Graphics Plugin
//
game
  .use(new Graphics()) // adds Game.createGraphic, game.removeGraphic, game.createTriangle, game.systems.graphics, etc
  .use(new BabylonGraphics())  // BabylonGraphics will now recieve game.createGraphic, game.removeGraphic, etc
  // .use(new CSSGraphics())
  // .use(new PhaserGraphics({ followPlayer: true })) // We can register multiple Graphics Plugins and each will recieve the same game.createGraphic, etc
  .use(new Camera({ followPlayer: true }))
  .use(new StarField())
  .use(new KeyboardBrowser())
  //.use(new KeyboardBrowser2())

  //.use(new MouseBrowser());


let playerId = randomId();

// Initialize both clients
const localClient = new LocalClient(playerId);
const websocketClient = new WebSocketClient(playerId);

// Default Mode setup based on config
game.use(localClient);
//game.use(websocketClient);


// game.use(new PongWorld())

// Function to switch to Online Mode
function switchToOnline() {
  //game.removeEntity(playerId); // Destroy the xal player
  //game.stop(); // Stop local client
  game.connect('ws://192.168.1.80:8787/websocket');
  //game.connect('ws://192.168.1.80:8888/websocket');

}

// Function to switch to Offline Mode
function switchToOffline() {

  try {
    game.disconnect(); // Disconnect online client
  } catch (err) {

  }
  game.start(function(){

    game.use(new Border({ autoBorder: true }));

    game.createEntity({
      id: playerId,
      type: 'PLAYER',
      position: {
        x: 0,
        y: 0
      }
    });
  
  });
}

// Setup button event listeners
document.getElementById('connectButton').addEventListener('click', switchToOnline);
document.getElementById('disconnectButton').addEventListener('click', switchToOffline);

function randomId() {
  return Math.random().toString(36).substr(2, 9);
}

switchToOffline();
//switchToOnline();