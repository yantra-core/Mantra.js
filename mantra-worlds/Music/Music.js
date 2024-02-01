import warpToWorld from "../sutras/warpToWorld.js";
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
    game.reset();
    this.createWorld();
  }

  createWorld() {

    let game = this.game;

    game.setSize(2200, 600);
    //game.setGravity(0, 4.3, 0);
    game.setGravity(0, 0, 0);



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

    game.use('Bullet')
    // game.use('Sword')

    game.use('Border', { autoBorder: true })

    let rules = game.rules;

    // set the Sutra rules for Home world
    game.useSutra(sutras(game), 'MUSIC');

    // warp to Platform level
    game.createEntity({
      type: 'WARP',
      kind: 'Home',
      texture: 'warp-to-home',
      width: 64,
      height: 64,
      isStatic: true,
      position: {
        x: 200,
        y: -10,
        z: 0
      }
    });

    // text "Warp to Mantra"
    game.createEntity({
      type: 'TEXT',
      text: 'Warp To Mantra',
      // kind: 'dynamic',
      style: {
        padding: '2px',
        fontSize: '16px',
        color: '#ffffff',
        textAlign: 'center'
      },
      body: false,
      position: {
        x: 195,
        y: -20
      }
    });

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

    /*
    // if touch note play sound
    game.createEntity({
      type: 'NOTE',
      kind: 'C4', // etc, a note as formatted for Tone.js library
      color: 0xccff00,
      width: 64,
      height: 64,
      isStatic: true,
      position: {
        x: 0,
        y: -200
      }
    });
    */

    /*

    function createPianoRoll() {
      let keyCodes = game.systems['tone'].keyCodes;


      // for each key code object, create a new box entity with key code as text
      let i = 0;
      for (let tKey in keyCodes) {
        i++;
        let tKeyCode = keyCodes[tKey];
        let tEntity = game.createEntity({
          type: 'NOTE',
          kind: tKeyCode.toneCode,
          text: tKey,
          width: 64,
          height: 64,
          isStatic: true,
          position: {
            x: -300 + (i * 64),
            y: 200
          },
          //text: tKeyCode.keyName,
          //tone: tKeyCode.toneCode
        });
        console.log("tEntity", tEntity)
      }
      console.log("keyCodes", keyCodes)
      //game.use('GhostTyper');
      console.log(game.systems)
    }


    if (game.systems.tone) {
      createPianoRoll();
    } else {
      game.once('plugin::loaded::tone', function () {
        createPianoRoll();
      });
    }
    */

    /*
    game.systems.graphics.switchGraphics('BabylonGraphics', function(){
      game.use('StarField');
      game.createDefaultPlayer();
    });
    */


    game.createDefaultPlayer({
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'player'
      },
      position: {
        x: 352,
        y: 0
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




