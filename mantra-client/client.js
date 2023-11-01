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

import BabylonGraphics from '@yantra-core/mantra/plugins/graphics-babylon/BabylonGraphics.js';
// import PhaserGraphics from '@yantra-core/mantra/plugins/graphics-phaser/PhaserGraphics.js';
import MatterPhysics from '@yantra-core/mantra/plugins/physics-matter/MatterPhysics.js';

import Bullet from '@yantra-core/mantra/plugins/bullet/Bullet.js';
import Collision from '@yantra-core/mantra/plugins/collisions/Collisions.js';
import AsteroidsMovement from '@yantra-core/mantra/plugins/entity-movement/strategies/AsteroidsMovement.js';

// Browser / Client specific Plugins
import Mesh from '@yantra-core/mantra/plugins/mesh/Mesh.js';
import KeyboardBrowser from '@yantra-core/mantra/plugins/browser-keyboard/KeyboardBrowser.js';
import Camera from '@yantra-core/mantra/plugins/graphics-babylon/camera/BabylonCamera.js';
import StarField from '@yantra-core/mantra/plugins/graphics-babylon/starfield/StarField.js';


import LocalClient from '@yantra-core/mantra/plugins/client-local/LocalClient.js';
import WebSocketClient  from '@yantra-core/mantra/plugins/client-websocket/WebsocketClient.js';


//
// Creates a new game instance
//
let game = new Game({ 
  isClient : true,
  width: 1600,
  height: 900
});

//
// Use Plugins to add systems to the game
//
game
  .use(new MatterPhysics())
  .use(new Collision())
  .use(new EntityFactory())
  .use(new EntityInput())
  .use(new EntityMovement(new AsteroidsMovement()))
  .use(new Bullet())

//
// Since this is the Client, we can add a Graphics Plugin
//
game
  // .use(new PhaserGraphics())
  .use(new BabylonGraphics())
  .use(new Mesh())
  .use(new Camera())
  .use(new StarField())
  .use(new KeyboardBrowser());

// TODO: can we remove this?
game.onlineMode = true;

let playerId = randomId();
window.currentPlayerId = playerId;

// Initialize both clients
const localClient = new LocalClient(playerId);
const websocketClient = new WebSocketClient(playerId);

// Default Mode setup based on config
game.use(localClient);
game.use(websocketClient);
// game.start();



// websocketClient.connect('ws://192.168.1.80:8888/websocket');

// Function to switch to Online Mode
function switchToOnline() {

  game.removeEntity(playerId); // Destroy the local player

  game.stop(); // Stop local client
  game.connect('ws://192.168.1.80:8888/websocket');
}

// Function to switch to Offline Mode
function switchToOffline() {

  game.createEntity({
    id: playerId,
    type: 'PLAYER',
  });

  try {
    game.disconnect(); // Disconnect online client
  } catch (err) {

  } 
  game.start();
}

// Setup button event listeners
document.getElementById('connectButton').addEventListener('click', switchToOnline);
document.getElementById('disconnectButton').addEventListener('click', switchToOffline);

function randomId() {
  return Math.random().toString(36).substr(2, 9);
}

//switchToOffline();
switchToOnline();