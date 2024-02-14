
//
// Game and Clients
//
//import { Game } from '../mantra-game/Game.js';
import { Game } from '../mantra-game';
import plugins from '../mantra-game/plugins.js';
import worlds from '../mantra-worlds/index.js';


let game = new Game({
  width: 800,
  height: 600,
  virtualGamepad: true,
  gameRoot: '.',
  defaultMovement: true,

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
let home = new worlds.Platform();
home = new worlds.GravityGardens();

game.start(function () {
  game.use(home);
});