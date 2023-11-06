import config from './config/config.js';

//
// Game and Clients
//
//import { Game } from '../mantra-game/Game.js';
import { Game, plugins } from '../mantra-game';

import PhysXPhysics from '../mantra-game/plugins/physics-physx/PhysXPhysics.js'; // WIP

//
// Input Strategies
//
import Default2DInputStrategy from '../mantra-game/plugins/entity-input/strategies/2D/Default2DInputStrategy.js';
import ThreeDimensionalInputStrategy from '../mantra-game/plugins/entity-input/strategies/3D/Default3DInputStrategy.js';


//
// Movement Strategies
//
import AsteroidsMovement from '../mantra-game/plugins/entity-movement/strategies/AsteroidsMovement.js';
import Asteroids3DMovement from '../mantra-game/plugins/entity-movement/strategies/3D/Asteroids3DMovement.js';
import PongMovement from '../mantra-game/plugins/entity-movement/strategies/PongMovement.js';
import PacManMovement from '../mantra-game/plugins/entity-movement/strategies/PacManMovement.js';
import FroggerMovement from '../mantra-game/plugins/entity-movement/strategies/FroggerMovement.js';


import PongWorld from '../mantra-game/plugins/world/pong/PongWorld.js';


// console.log('plugins', plugins)

//
// Creates a new game instance
//
/*
let game = new Game({
  isClient: true,        // can we remove this?
  physics: 'matter',     // enum, 'physx', 'matter', default 'matter'
  graphics: ['phaser'],  // array enum, 'phaser', 'css', 'none', default ['babylon']
  keyboard: {            // boolean or config object, default true
    preventDefaults: false
  },       
  mouse: true,           // boolean or config object, default true
  collisions: true,      // boolean, default true
  width: 1600 * 2,       // number, default 1600
  height: 900 * 2,       // number, default 900
});
*/


//
// Create the Game object with default config
//
/*
let defaultConfig = {
  isClient: true,         // boolean, default true
  isServer: false,        // boolean, default false
  physics: 'matter',      // enum or Physics config object, 'physx', 'matter', default 'matter'
  graphics: ['babylon'],  // array enum, 'phaser', 'css', 'none', default ['babylon']
  mouse: true,            // boolean or Mouse config object, default true
  keyboard: true,         // boolean or Keyboard config object, default true
  collisions: true,       // boolean, default true
  width: 1600,            // number, default 1600
  height: 900,            // number, default 900
}

// Game will start with the defaultConfig, unless overridden

// So for example, if you wish to disable mouse inputs, you can simply:
let game = new Game({
  mouse: false
});

// If you wish you customize Keyboard to disable preventDefault:
let game = new Game({
  keyboard: {
    preventDefaults: false
  }
});

*/

let game = new Game({
  mouse: false,
});

//
// Use Plugins to add systems to the game
//
game
  .use(new plugins.Bullet())
  .use(new plugins.InputLegend())
  .use(new plugins.StarField())
  .use(new plugins.Border({ autoBorder: true }));

//.use(new PhysXPhysics())     // Status: 3D WIP / Experimental
//.use(new AsteroidsMovement())
//.use(new Default2DInputStrategy())
//.use(new ThreeDimensionalInputStrategy())
//game.use(new PongWorld())

let playerId = randomId();

// Initialize both clients
//const localClient = new plugins.LocalClient(playerId);
//const websocketClient = new plugins.WebSocketClient(playerId);

// Default Mode setup based on config
game.use(new plugins.Client(playerId));
//game.use(websocketClient);


// game.start() // starts up local offline game
// game.connect(wsUrl) // connects to websocket server

/*
  // This will listen for all events on Game instance
  // Since all Plugin class methods are event emitters, we can watch entire Mantra Game instance and all Plugins
  game.onAny(function(event, data){
    console.log(event, data)
  })
*/

/*
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
  game.start(function () {


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
*/

// Setup button event listeners
//document.getElementById('connectButton').addEventListener('click', switchToOnline);
//document.getElementById('disconnectButton').addEventListener('click', switchToOffline);

function randomId() {
  return Math.random().toString(36).substr(2, 9);
}

// switchToOffline();
// switchToOnline();

// Single Player Offline Mode
game.start(function () {
  // create a single player entity
  game.createEntity({
    id: playerId,
    type: 'PLAYER',
    position: {
      x: 0,
      y: 0
    }
  });
});

//game.stop(); // stops local client
// Connects to websocket server
// see: @yantra-core/mantra-server
//game.connect('ws://192.168.1.80:8888/websocket');
