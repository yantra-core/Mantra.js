import createPiano from "./instruments/createPiano.js";
import createDrumKit from "./instruments/createDrumKit.js";
import movement from '../../mantra-sutras/player-movement/top-down.js';

import sutras from "./sutras.js";

class Music {
  static id = 'world-music';
  // "world" type has special features in that it can be unloaded and reloaded.
  //  with special rules such as merge, replace, etc.
  //  this is currently used when switching between worlds in the GUI Editor
  //  the default behavior is to unload the world, then load the new world
  static type = 'world'; // type is optional for Plugins
  constructor() {
    this.id = Music.id;
  }

  init(game) {
    this.game = game;
    game.config.defaultMouseMovement = false;


    game.reset();
    this.createWorld();
  }


  async preload(game) {

    game.use('Text');
    game.use('Platform');
    game.use('Teleporter');

  }

  createWorld() {

    let game = this.game;

    game.setSize(2200, 600);
    //game.setGravity(0, 4.3, 0);
    game.setGravity(0, 0, 0);

    if (game.isTouchDevice()) {
      game.zoom(1.44);
    } else {
      game.zoom(2.5);
    }

    game.createPlayer({
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'player'
      },
      position: {
        x: 352,
        y: 80
      }
    });


    game.customMovement = false;
    game.setBackground('black');

    const pianoConfig = {
      position: { x: -200, y: 200 },
      //width: 4096 / 2, // Total width for the piano
      //height: 128 / 2// Height of each key
      width: 1028,
      height: 64
    };

    // text label for piano
    game.createEntity({
      type: 'TEXT',
      text: 'Click or Jump on the Piano',
      // kind: 'dynamic',
      //color: 0xffffff,
      style: {
        fontSize: '16px',
        color: '#ffffff',
        textAlign: 'center'
      },
      body: false,
      position: {
        x: 352,
        y: 150,
        z: 64
      }
    });

    createPiano(game, pianoConfig);
    // Usage example
    const drumKitConfig = {
      position: { x: 1000, y: 150 } // Base position of the drum kit
    };
    createDrumKit(game, drumKitConfig);


    /*
    game.createEntity({
      type: 'PLATFORM',
      isStatic: true,
      width: 1000,
      height: 40,
      position: {
        x: 0,
        y: 200
      }
    });
    */

    /*
    game.createEntity({
      type: 'BLOCK',
      texture: 'tile-block',
      width: 32,
      height: 32,
      position: {
        x: -400,
        y: -150
      },
      friction: 1, 
      frictionAir: 1, 
      frictionStatic: 1
    });
    */

    game.use('Block')
    // game.use('Tile');
    game.use('Tone');
    game.use('Boomerang');
    game.use('Bullet')
    // game.use('Sword')

    game.use('Border', { autoBorder: true })

    let rules = game.rules;

    // set the Sutra rules for Home world
    game.useSutra(sutras(game), 'MUSIC');

    // Teleports the Player to the Home world
    game.make()
      .Teleporter({
        destination: {
          world: 'Home'
        },
      })
      .texture('warp-to-home')
      .size(64)
      .position(195, -10, 1)
      .createEntity();

    game.make().Text()
      .text('Warp To Mantra')
      .width(200)
      .style({
        padding: '2px',
        fontSize: '16px',
        color: '#ffffff',
        textAlign: 'center'
      })
      .position(195, -60)
      .createEntity();

    game.createEntity({
      type: 'PLATFORM',
      // kind: 'ice',
      width: 200,
      height: 16,
      // color: 0x00ff00,
      isStatic: true,
      position: {
        x: 1000,
        y: 210
      }
    });

  }

  update() {
  }

  render() { }

  destroy() { }

}

export default Music;

function is_touch_enabled() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}




