let mode = 'offline'; // online / offline
let env = 'local'; // cloudflare / cloudflare-local / local

// default values for offline mode, no compression
let clientConfig = {
  protobuf: false,
  msgpack: false,
  deltaCompression: false
};

let isEdgeClient = false;

// cloudflare modes, currently require msgpack
if (mode === 'online' && (env === 'cloudflare' || env === 'cloudflare-local')) {
  isEdgeClient = true;
  clientConfig.msgpack = true;
  clientConfig.deltaCompression = true;
  clientConfig.protobuf = false;
}

// default online mode, use protobuf and delta compression
if (mode === 'online' && env === 'local') {
  clientConfig.protobuf = true;
  clientConfig.deltaCompression = true;
  clientConfig.msgpack = false;
}

import config from './config/config.js';

//
// Game and Clients
//
//import { Game } from '../mantra-game/Game.js';
import { Game, plugins } from '../mantra-game';

// import PhysXPhysics from '../mantra-game/plugins/physics-physx/PhysXPhysics.js'; // WIP

//
// Input Strategies
//
import Default2DInputStrategy from '../mantra-game/plugins/entity-input/strategies/2D/Default2DInputStrategy.js';
import Default3DInputStrategy from '../mantra-game/plugins/entity-input/strategies/3D/Default3DInputStrategy.js';


//
// Movement Strategies
//
import AsteroidsMovement from '../mantra-game/plugins/entity-movement/strategies/AsteroidsMovement.js';
import Asteroids3DMovement from '../mantra-game/plugins/entity-movement/strategies/3D/Asteroids3DMovement.js';
import PongMovement from '../mantra-game/plugins/entity-movement/strategies/PongMovement.js';
import PacManMovement from '../mantra-game/plugins/entity-movement/strategies/PacManMovement.js';
import FroggerMovement from '../mantra-game/plugins/entity-movement/strategies/FroggerMovement.js';


// import PongWorld from '../mantra-game/plugins/world/pong/PongWorld.js';
import Pong from '../mantra-worlds/Pong/Pong.js';


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
  lifetime: true,         // boolean, enables lifetime property, default true
  width: 1600,            // number, default 1600
  height: 900,            // number, default 900
}

// Game will start with the defaultConfig, unless overridden

// Game canvas(s) will be appended to <div id="gameHolder"></div>,
// if gameHolder does not exists it will be append to body


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
  isClient: true,
  mouse: true,
  isEdgeClient: isEdgeClient,
  physics: 'matter', // 'matter', 'physx'
  graphics: ['babylon'], // 'babylon', 'css', 'phaser'
  collisions: true,
  camera: 'follow',
  protobuf: clientConfig.protobuf,
  msgpack: clientConfig.msgpack,
  deltaCompression: clientConfig.deltaCompression,
  options: {
    scriptRoot: './' // use local scripts instead of default yantra.gg CDN
  }
});
window.game = game;
//
// Use Plugins to add systems to the game
//
game
  .use(new plugins.Bullet())
  .use(new plugins.Block())

game.use(new plugins.Schema());

game.use(new plugins.InputLegend());

// Only show Ping Times and Snapshot Size in Online Mode
if (game.isOnline) {
  game.use(new plugins.PingTime());
  game.use(new plugins.SnapshotSize());
}
// Always show FPS
game.use(new plugins.CurrentFPS());


game.use(new plugins.PluginsGUI());
game.use(new plugins.Editor());

// game.use(new Pong());


// for local / offline play we can use any id we want
function randomId() {
  return 'player_' + Math.random().toString(36).substr(2, 9);
}
let playerId = randomId();

// Function to switch to Online Mode
function switchToOnline() {
  game.removeEntity(playerId); // Destroy the local player
  game.stop(); // Stop local client
  //game.connect('ws://0.0.0.0:8888/websocket');    // @yantra-core/mantra-server
  //game.connect('ws://0.0.0.0:8787/websocket');  // @yantra-core/mantra-edge
}

// Setup button event listeners
//document.getElementById('connectButton').addEventListener('click', switchToOnline);
//document.getElementById('disconnectButton').addEventListener('click', switchToOffline);



// game.connect('ws://0.0.0.0:8787/websocket');  // @yantra-core/mantra-edge
// game.connect('ws://0.0.0.0:8888/websocket');  // @yantra-core/mantra-edge

/**/


if (mode === 'online') {

  if (env === 'cloudflare') {
    game.connect('wss://ayyo.cloudflare1973.workers.dev/websocket');  // cloudflare production
  }

  if (env === 'cloudflare-local') {
    game.connect('ws://192.168.1.80:8787/websocket');                 // cloudflare wranger local dev
  }

  if (env === 'local') {
    game.connect('ws://192.168.1.80:8888/websocket');                   // websocket server
  }
  // Connects to websocket server
  // see: @yantra-core/mantra-server
  game.use(new plugins.StarField())


} else {
  // Single Player Offline Mode
  game.start(function () {

    game.use(new plugins.StarField())

    /*



    // create a single player entity
    game.createEntity({
      type: 'BLOCK',
      width: 500,
      height: 500,
      depth: 200,
      position: {
        x: 0,
        y: -1000
      },
    });

    game.use(new plugins.Border({ autoBorder: false }));

    game.systems.border.createBorder({
      height: 2000,
      width: 2000,
    });
    */



  });

}

game.use(new plugins.Collision());

//game.stop(); // stops local client

/*

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
