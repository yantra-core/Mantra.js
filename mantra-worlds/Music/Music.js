import warpToWorld from "../sutras/warpToWorld.js";
import createPiano from "./instruments/createPiano.js";
import createDrumKit from "./instruments/createDrumKit.js";

import sutras from "./sutras.js";

class Home {
  static id = 'world-home';
  // "world" type has special features in that it can be unloaded and reloaded.
  //  with special rules such as merge, replace, etc.
  //  this is currently used when switching between worlds in the GUI Editor
  //  the default behavior is to unload the world, then load the new world
  static type = 'world'; // type is optional for Plugins
  constructor() {
    this.id = Home.id;
  }

  init(game) {
    this.game = game;
    this.createWorld();
  }

  createWorld() {

    let game = this.game;

    game.setBackground('black');

    // Usage example
    const pianoConfig = {
      position: { x: -200, y: 200 },
      //width: 4096 / 2, // Total width for the piano
      //height: 128 / 2// Height of each key
      width: 1028,
      height: 64
    };
    createPiano(game, pianoConfig);
    // Usage example
    const drumKitConfig = {
      position: { x: 200, y: -200 } // Base position of the drum kit
    };
    createDrumKit(game, drumKitConfig);

    game.setGravity(0, 4.3, 0);

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


   // See: sutras.js for World logic
   let rules = sutras(game);

   // set the Sutra rules for Home world
   game.setSutra(rules);


    // warp to Platform level
    game.createEntity({
      type: 'WARP',
      width: 64,
      height: 64,
      isStatic: true,
      position: {
        x: -600,
        y: 0
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

export default Home;

function is_touch_enabled() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}




