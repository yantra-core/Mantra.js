
//
// Game and Clients
//
//import { Game } from '../mantra-game/Game.js';
import { Game } from '../mantra-game';
import plugins from '../mantra-game/plugins.js';

let Boomerang = new plugins.Boomerang();

let game = new Game({
  width: 800,
  height: 600,
  virtualGamepad: true,
  gameRoot: '.',
  defaultMovement: true,
  plugins: [
    'Bullet',    // plugin as string
    Boomerang,   // plugin as Plugin instance
    {            // plugin as string with config object
      name: 'CurrentFPS',
      config: {
        cool: true
      }
    },
  ],

  /*
  fps: 60,
  fieldOfView: 512,
  plugins: {},
  isClient: true,
  showLoadingScreen: true,
  minLoadTime: 220,
  mouse: true,
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
  defaultPlayer: false,
  */
});

// game.gameConfig = TowerWorld;

window.game = game;

game.start(function () {

  //game.use('Bullet');
  //game.use('Boomerang');

  // TODO: should not have default movements...
  game.createPlayer({
    texture: {
      sheet: 'loz_spritesheet',
      sprite: 'player',
    },
    position: {
      x: 0,
      y: 0
    }
  });

  game.rules.if('W').then('MOVE_UP');

  game.rules.on('MOVE_UP', function (entity) {
    game.applyForce(entity.id, {
      x: 0,
      y: -1
    });
  });

  game.createEntity({
    position: {
      x: -50,
      y: 0
    }
  });
  game.createEntity({
    position: {
      x: 50,
      y: 0
    }
  });

  /*
  game.createPlayer({
    texture: {
      sheet: 'loz_spritesheet',
      sprite: 'player',
    },
    position: {
      x: 0,
      y: 0
    }
  });

  */
});