let mode = 'offline'; // online / offline
let env = 'local'; // cloudflare / cloudflare-local / local

window.c = console.log;

// import roverLight from '../../YCraft.js/examples/rover-light.js'; // for now
import worlds from '../mantra-worlds/index.js';

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

// import TowerWorld from '../mantra-game/tests/fixtures/TowerWorld.js';
// import testRules from '../mantra-game/plugins/gui-sutra/testRules.js';

//
// Game and Clients
//
//import { Game } from '../mantra-game/Game.js';
import { Game } from '../mantra-game';
import plugins from '../mantra-game/plugins.js';
// import Pong from '../mantra-worlds/Pong/Pong.js';

let game = new Game({
  height: 600 * 10,
  width: 800 * 10,
  plugins: {},
  isClient: true,
  showLoadingScreen: true,
  minLoadTime: 220,
  mouse: true,
  isEdgeClient: isEdgeClient,
  gravity: {
    x: 0,
    y: 0
  },
  physics: 'matter', // 'matter', 'physx'
  graphics: ['css'], // 'babylon', 'css', 'phaser'
  collisions: true,
  sutra: true,
  camera: {
    follow: true,
    startingZoom: 1
  },
  protobuf: clientConfig.protobuf,
  msgpack: clientConfig.msgpack,
  deltaCompression: clientConfig.deltaCompression,
  defaultPlayer: false,
  options: {
    scriptRoot: '.' // use local scripts instead of default yantra.gg CDN
  }
});


// game.gameConfig = TowerWorld;

window.game = game;
//
// Use Plugins to add systems to the game
//

// Plugins can also be loaded async by string name
//game.use('Bullet');
// game.use(new plugins.Bullet())
game.use(new plugins.Entity())
game.use(new plugins.Platform());
game.use(new plugins.MatterPhysics());
// game.use(new plugins.CSSGraphics());

//game.use(new plugins.PhaserGraphics());
// game.use(new plugins.BabylonGraphics());

// game.use(new plugins.PhaserCamera());
// game.use(new plugins.Collision());

game.use(new plugins.GhostTyper())


game.use(new plugins.ChronoControl())
//game.use(new plugins.PluginsGUI())

game.use(new plugins.Schema());


game.use(new plugins.Timers());

// game.use(new plugins.LoadingScreen());

// TODO: default load plugins
// game.use(new plugins.Health())

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

// game.use(new plugins.Behaviors());

// Always show FPS
// game.use(new plugins.CurrentFPS());

game.use(new plugins.Editor({
  sourceCode: 'https://github.com/yantra-core/mantra/blob/master/mantra-client/client.js',
  sutraEditor: true
}));

game.use(new plugins.Sutra({ }));

// import Pong from '../mantra-game/tests/fixtures/PongWorld.js';
// import BossFight from '../mantra-game/tests/fixtures/BossFight.js';


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

// game.connect('ws://0.0.0.0:8787/websocket');  // @yantra-core/mantra-edge
// game.connect('ws://0.0.0.0:8888/websocket');  // @yantra-core/mantra-edge

// create a round timer, each 60 seconds move to the next round
let roundTimer = game.createTimer('round-timer', 4, true);
// console.log('roundTimer', roundTimer)

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
  // game.use(new plugins.StarField())
  game.use(new plugins.PingTime())
  game.use(new plugins.SnapshotSize())

} else {


 // game.use(new plugins.Tile());

  // Single Player Offline Mode

  let home = new worlds.Home();

  // check local storage to see if user has selected a world
  let storedWorld = game.storage.get('world');

  if (storedWorld) {
    let worldClass = worlds[storedWorld];
    home = new worldClass();
  }

  // home = new worlds.YCraft();

  game.start(function () {
    // game.use(new plugins.StarField())
    //game.use(new plugins.Border({ autoBorder: true, thickness: 200 }));
    //game.use(new plugins.Block({ MIN_BLOCK_SIZE: 1000 }));
    // game.use(new plugins.Bullet())

    game.use(home);

    // game.use(new plugins.GamepadGUI())
    //game.use(new plugins.Tone());

    // game.use(new plugins.XState({ world: BossFight() }));
    // game.use(new plugins.PluginExplorer({ }));
    // game.systems['gui-plugin-explorer'].drawPluginForm(game.systems.block, plugins.Block)
    // game.use(new plugins.YCraft({ contraption: roverLight }))
    // game.use(new plugins.YCraftGUI())
    // game.use(new plugins.SutraGUI({ }));
    // game.use(new plugins.Scoreboard());
    // game.use(new plugins.MidiGUI())
    // game.use(new plugins.Midi())
    // game.use(new plugins.Nes());
   
    // game.use(new plugins.TowerWorld());
    game.data.roundEnded = false;
    game.data.roundStarted = true;
  });

}


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

