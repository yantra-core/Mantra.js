
//
// Game and Clients
//
//import { Game } from '../mantra-game/Game.js';
import { Game } from '../mantra-game';
import plugins from '../mantra-game/plugins.js';
import worlds from '../mantra-worlds/index.js';

import GravityWell from '../mantra-game/plugins/gravitywell/GravityWell.js';
import Flame from '../mantra-game/plugins/flame/Flame.js';
import Lifetime from '../mantra-game/plugins/lifetime/Lifetime.js';
import GravityGardens from '../mantra-worlds/GravityGardens/GravityGardens.js';
import Boomerang from '../mantra-game/plugins/boomerang/Boomerang.js';
import Player from '../mantra-game/plugins/player/Player.js';
import Teleporter from '../mantra-game/plugins/teleporter/Teleporter.js';
import UnitSpawner from '../mantra-game/plugins/unit-spawner/UnitSpawner.js';
let game = new Game({
  width: 800,
  height: 600,
  plugins: ['Gamepad', 'GamepadGUI'],
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

game.use(new plugins.SwitchGraphics());

// game.gameConfig = TowerWorld;

window.game = game;
let home = new worlds.Platform();
home = new worlds.Home();

game.use(new Lifetime());
game.start(function () {
  game.reset();
  /*
  game.use(new Teleporter());
  //game.use(new plugins.Hexapod())
  game.use(new plugins.Block())
  game.use(new plugins.Text())
  game.use(new plugins.Hexapod())
  game.use(new plugins.Player())
  game.use(new plugins.Teleporter())
  game.use(new plugins.Boomerang())
  */
  game.use(new GravityGardens())

  //game.use(home);

/*
  let config = game.build().Player();
  config.position(-40, 0)
  config.collisionStart(function(){
    console.log('breaks the teleport and this never fires');
  })

  console.log('config', config.config.collisionStart)
  let player = config.createEntity();

  game.setPlayerId(player.id);

  game.createEntity({
    position: {
      x: -60,
      y: 10
    },
    size: {
      width: 16,
      height: 16
    },
    collisionStart: function(){
      console.log('THIS CAUSES THE TELEPORTER TO STOP WORKING')
    }
    //collisionStart: true // this works
    // collisionStart: false  // this also breaks the teleporter expected, collision disabled
  })

  game.build().Teleporter().position(30, 10).createEntity();


  let blockConfig = game.build().Block().size(16).build();
  console.log('blockConfig', blockConfig)
  blockConfig.collisionStart = function(){
    // as soon as we add this teleporter event stops working
    console.log('testing')
  }
  game.createEntity(blockConfig)

*/
  

  // game.build().Block().clone(3).createEntity();
  //game.build().Teleporter().position(-100, 0, 0).createEntity();
  //game.build().Text().text('Teleport to position').width(200).position(0, 0, 0).createEntity();
  //game.build().Text().text('Teleport to function').width(200).position(0, 0, 0).createEntity();
  //game.build().Text().text('Teleport to Plugin').width(200).position(0, 0, 0).createEntity();

  //game.use(new GravityGardens());



 // game.use(new plugins.Border())
  //game.use(new GravityGardens());
  // //game.use(new GravityWell());
  /*
  game.use(new UnitSpawner());
  game.use(new Flame());
  */
 /*
  game.use(new Player());
  let player = game.build().Player().createEntity();

  game.setPlayerId(player.id);

  game.use(new Teleporter());
  game.setZoom(3.5);

  */
 /*
  game.build().Teleporter({
    destination: {
      position: {
        x: 20,
        y: 0
      }
    }
  })
  .position(-50, 50).size(32).createEntity();


  game.build().Teleporter({
    destination: {
      world: 'Home'
    }
  })
  .position(50, -50).size(32).createEntity();

  game.build().Teleporter({
    destination: function customTeleport (entity, gameState) {
      // console.log("CUSTOM TELEPORT");
      game.flashText('CUSTOM TELEPORT')
    }
  })
  .position(50, 50).size(32).createEntity();
  */
  // game.use(new GravityGardens());

  //game.createPlayer();
  /*
  let data = game.build()
    .GravityWell()      // build a GravityWell
    // .Flame()           // Now it's a GravityWell with Fire
    .position(20, 20) // Adjust component properties as needed
    .createEntity();  // Create the entity
    //let ent = game.build().fire().boomerang().position(100, 100).createEntity();
  */
  /*
  game.systems.blackhole.create({
    position: {
      x: -100,
      y: 0
    }
  });
  */

  /*
  game.build()
    .type('BLACKHOLE')
    .createEntity();


  */

  /*
  game.build()
    .type('BLACKHOLE')
    .createEntity();
    */

});