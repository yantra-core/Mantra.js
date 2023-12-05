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
import { Game } from '../mantra-game';
import plugins from '../mantra-game/plugins.js';
// import Pong from '../mantra-worlds/Pong/Pong.js';

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
  .use(new plugins.Block())


// Plugins can also be loaded async by string name
//game.use('Bullet');
game.use(new plugins.Bullet())

game.use(new plugins.ChronoControl())
game.use(new plugins.PluginsGUI())

game.use(new plugins.Schema());

game.use(new plugins.Timers());

// game.use(new plugins.LoadingScreen());

// TODO: default load plugins
game.use(new plugins.Health())

// game.use(new plugins.Inspector())
// game.use(new plugins.ControlsGUI());
// game.use(new plugins.Creator());
// game.use(new plugins.EventInspector());


// Only show Ping Times and Snapshot Size in Online Mode
if (game.isOnline) {
  game.use(new plugins.PingTime());
  game.use(new plugins.SnapshotSize());
}

// game.use(new plugins.Client());

game.use(new plugins.Behaviors());

// Always show FPS
game.use(new plugins.CurrentFPS());
game.use('Editor', {
  sourceCode: 'https://github.com/yantra-core/mantra/blob/master/mantra-client/client.js',
  sutraEditor: true
});


import Pong from '../mantra-game/tests/fixtures/PongWorld.js';
import BossFight from '../mantra-game/tests/fixtures/BossFight.js';

// game.use(new plugins.XState({ world: BossFight() }));
// game.use(new plugins.SutraGUI({ }));

// game.use(new plugins.PluginExplorer({ }));

// game.systems['gui-plugin-explorer'].drawPluginForm(game.systems.block, plugins.Block)

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


if (mode === 'online') {

  if (env === 'cloudflare') {
    game.connect('wss://ayyo.cloudflare1973.workers.dev/websocket');  // cloudflare production
  }

  if (env === 'cloudflare-local') {
    game.connect('ws://127.0.0.1:8787/websocket');                 // cloudflare wranger local dev
  }

  if (env === 'local') {
    // Connects to websocket server
    // see: @yantra-core/mantra-server
    game.connect('ws://192.168.1.80:8888/websocket');                   // websocket server
  }
  game.use(new plugins.StarField())
  game.use(new plugins.PingTime())
  game.use(new plugins.SnapshotSize())


} else {
  // Single Player Offline Mode
  game.start(function () {

    game.use('StarField');

    /*
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
    */

    game.createEntity({
      type: 'BOSS',
      health: 500,
      width: 230,
      height: 320,
      depth: 200,
      position: {
        x: 0,
        y: -400
      },
    });

    let ent = game.createEntity({
      type: 'SPAWNER',
      health: 100,
      width: 200,
      height: 200,
      depth: 200,
      color: 0xff0000,
      position: {
        x: -800,
        y: -800
      }
    });

    ent.timers.setTimer('test-timer', 1, true);

    game.on('timers::done', (entityId, timerId) => {
      // console.log('timer done', entityId, timerId);
    });

    /*
    // create a single player entity
  

   
    */
    game.use(new plugins.Border({ autoBorder: false }));

    game.systems.border.createBorder({
      height: 2000,
      width: 2000,
    });


  });

}

// game.use(new plugins.Collision());

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
