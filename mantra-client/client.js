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


let game = new Game({
  //  width: 800,
  //  height: 600,
  height: 600 * 10,
  width: 800 * 10,

  fieldOfView: 512,
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
  graphics: ['css'], // 'ascii', 'three', 'babylon', 'css', 'phaser', 'ascii'
  collisions: true,
  gamepad: {
    useZoomSlider: false
  },
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
    scriptRoot: '.', // use local scripts instead of default yantra.gg CDN
    assetRoot: '.', // use local assets instead of default yantra.gg CDN
  }
});

game.useFoV = false;

// game.gameConfig = TowerWorld;

window.game = game;
//
// Use Plugins to add systems to the game
//

// Plugins can also be loaded async by string name
//game.use('Bullet');
game.use(new plugins.Block())
game.use(new plugins.Bullet())
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
game.use('RBush')
//game.use('Bullet')


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

game.use(new plugins.CurrentFPS());

game.use(new plugins.Editor({
  sourceCode: 'https://github.com/yantra-core/mantra/blob/master/mantra-client/client.js',
  sutraEditor: true
}));

game.use(new plugins.Sutra({}));

// import Pong from '../mantra-game/tests/fixtures/PongWorld.js';
// import BossFight from '../mantra-game/tests/fixtures/BossFight.js';

game.use(new plugins.ChronoControl())
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

  // Single Player Offline Mode

  let home = new worlds.Home();

  // check local storage to see if user has selected a world
  let storedWorld = game.storage.get('world');

  if (storedWorld) {
    let worldClass = worlds[storedWorld];
    home = new worldClass();
  }
  //console.log("wwww", worlds)
  game.use(new plugins.Border());

  // home = new worlds.GravityGardens();

  /*
  --purple-light: #bbe;
  --purple-dark: #64b;
  --button-x: #3c62f8;
  --button-y: #14b161;
  --button-a: #f03025;
  --button-b: #e9dd34;
  */

  game.start(function () {
    game.use(home);

    /*
    game.createEntity({
     type: 'BLOCK',
     width: 50,
     height: 50,
     isStatic: false,
     // isSensor: true,
     body: true,
     color: 0xff0000,
     position: {
       x: -50,
       y: -50,
       z: 0
     },
   });
   game.createPlayer({
     position: {
       x: 0,
       y: 0
     },
     height: 8,
     width: 8
   });
   */

   /*   
    // game.use(new plugins.DragAndDropFileUpload)

    game.use(new plugins.Tile({
      loadInitialChunk: false,
      tiledServer: true,
      tileSize: 16,
      chunkUnitSize: 8,
      proceduralGenerateMissingChunks: true,
      lazyLoadTiles: false,
      loadDefaultTileMap: false
    }))
     */
    /*
   game.use(new plugins.Bullet())
   */

    /*
    game.setControls({
      // Press "T" key to move forward
      W: function(ev){
        console.log("W", ev);
        let currentPlayer = game.getCurrentPlayer();
        game.applyForce(currentPlayer.id, { x: 0, y: 4, z: 0 });
      },
      SPACE: function(ev){
        console.log("SPACE", ev)
        if (game.systems.bullet) {
          game.systems.bullet.fireBullet(game.currentPlayerId);
        }
      }
    });
    */

    // create names Actions
    /*
    game.setActions({
      JUMP: function (entity) {
        console.log("jump", entity)
        game.applyForce(entity.id, { x: 0, y: -1, z: 0 });
      },
      SHOOT: function (entityId) {
        console.log("shoot", entityId)
        // for example, fire a bullet via direct access to the bullet system
        game.systems.bullet.fireBullet(entityId);
      }
    });
    */

    // call actions from key press
    // game.rules.if('W').then('JUMP');

    // can also support key combinations
    // see: Sutra.js documentation for more details
    // game.rules.if('W', 'S').then('JUMP');


    /*
    game.rules.on('JUMP', function(entity){

      console.log("jump", entity)
      game.applyForce(entity.id, { x: 0, y: -1, z: 0 });

    });

    */

    // support this syntax?
    /*
    game.setActions({
      W: function(){}
    });
    game.rules.if('W').then('W');
    */

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

