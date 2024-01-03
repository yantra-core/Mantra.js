import sutras from './sutras.js';
import welcomeMessage from './welcomeMessage.js';

import enemy from '../../mantra-game/plugins/world-tower/sutras/enemy.js';

import switchGraphics from '../sutras/switchGraphics.js';

class Home {
  static id = 'world-home';
  static type = 'world'; // type is optional for Plugins
  // "world" type has special features in that it can be unloaded and reloaded.
  //  with special rules such as merge, replace, etc.

  constructor() {
    this.id = Home.id;
  }

  init(game) {
    this.game = game;
    this.createWorld();
  }

  createWorld() {

    let game = this.game;
    // game.data.camera.currentZoom = 2;
    game.setGravity(0, 0, 0);

    game.createDefaultPlayer({
      position: {
        x: 0,
        y: 0
      }
    });

    game.use('Block')
    game.use('Border', { autoBorder: true })
    game.use('Bullet')
    // game.use('Timers');

    game.use('Tone');
    // TODO: better control of loading tiles
    // TODO: game.systems.tile.loadTilemap() -> Tiled JSON
    game.use('Tile');
    //game.use('Sword')

    // welcomeMessage(game);

    // See: sutra.js for game logic
    let rules = sutras(game);

    let switchGraphicsSutra = switchGraphics(game);

    let e = enemy.call(this);
    rules.use(switchGraphicsSutra, 'switchGraphics');

    game.createEntity({
      type: 'Walker',
      sutra: 'walker',
      width: 22,
      height: 24,
      texture: {
        sheet: 'jogurt',
        sprite: 'walkLeft'
      },
      depth: 64,
      position: {
        x: 50,
        y: -150,
        z: 32
      }
    });

    /*
    rules.addCondition('true', () => {
      return true;
    })
    */

    game.setSutra(rules);

    game.createEntity({
      type: 'BACKGROUND',
      texture: 'garden',
      width: 300,
      height: 300,
      //width: game.data.width,
      //height: game.data.height,
      body: false,
      position: {
        x: 0,
        y: 0,
        z: -10
      }
    });

    game.createEntity({
      type: 'BACKGROUND',
      texture: 'robot-arms-apartment',
      kind: 'building',

      width: 1340,
      height: 3668,
      body: false,
      position: { // position to right
        x: 900,
        y: -1800,
        z: 1
      }
    });

    game.createEntity({
      type: 'BACKGROUND',
      texture: 'planet-express-base',
      kind: 'building',

      width: 2048,
      height: 2048,
      body: false,
      position: { // position to right
        x: -900,
        y: -800,
        z: -1
      }
    });

    game.createEntity({
      type: 'BLOCK',
      texture: 'tile-block',
      width: 200,
      height: 200,
      mass: 10000,
      // body: false,
      position: { // position to right
        x: 200,
        y: -800,
        z: -8
      }
    });

    /*
    // text element to explain graphics engines
    game.createEntity({
      type: 'TEXT',
      text: 'This is text on how to use game\n <----- Move this way',
      fontSize: 144,
      color: 0x000000,
      body: false,
      position: {
        x: -800,
        y: 0,
        z: 10
      }
    });
    */

    game.createEntity({
      type: 'WARP',
      kind: 'Platform',
      width: 64,
      height: 64,
      depth: 64,
      texture: 'warp-to-platform',
      isStatic: true,
      isSensor: true,
      position: {
        x: 300,
        y: 0,
        z: 32
      }
    });


    game.createEntity({
      name: 'raiden-left',
      type: 'BACKGROUND',
      width: 64,
      height: 64,
      depth: 64,
      style: {
        display: 'none'
      },
      texture: 'raiden',
      body: false,
      position: {
        x: 0,
        y: 10,
        z: 32
      }
    });

    game.createEntity({
      name: 'raiden-right',
      type: 'BACKGROUND',
      width: 64,
      height: 64,
      depth: 64,
      style: {
        display: 'none'
      },
      texture: 'raiden',
      body: false,
      position: {
        x: 100,
        y: 10,
        z: 32
      }
    });

    // if touch warp, switch to YCraft level
    game.createEntity({
      type: 'WARP',
      kind: 'YCraft',
      width: 64,
      height: 64,
      depth: 64,
      texture: 'warp-to-ycraft',
      isStatic: true,
      isSensor: true,
      position: {
        x: 0,
        y: -150,
        z: 32
      }
    });

    // text label saying "Warp To YCraft World"
    game.createEntity({
      type: 'TEXT',
      text: 'Warp To YCraft World',
      kind: 'dynamic',
      color: 0x000000,
      style: {
        fontSize: '16px',
        textAlign: 'center'
      },
      body: false,
      position: {
        x: 0,
        y: -180,
        z: 64
      }
    });

    // if touch warp, switch to Babylon Graphics
    game.createEntity({
      type: 'BLOCK',
      width: 64,
      height: 64,
      depth: 64,
      texture: '3d-homer',
      // isSensor: true,
      // isStatic: true,
      position: {
        x: 80,
        y: 15,
        z: 32
      }
    });

   

    // switch to 3d text label
    game.createEntity({
      type: 'TEXT',
      text: 'Rendered with CSSGraphics Engine',
      width: 20,
      color: 0x000000,
      style: {
        width: '150px',
        fontSize: '12px',
        textAlign: 'center'
      },
      body: false,
      position: {
        x: -63,
        y: -30,
        z: 64
      }
    });


    // switch to phaser 3
    game.createEntity({
      name: 'PhaserGraphics',
      type: 'TEXT',
      text: 'Canvas Graphics',
      width: 60,
      height: 50,
      color: 0x000000,
      style: {
        width: '60px',
        height: '30px',
        fontSize: '12px',
        textAlign: 'center',
        border: '1px solid black'

      },
      body: true,
      isSensor: true,
      position: {
        x: -55,
        y: 75,
        z: 64
      }
    });


     // switch to 3d text label
     game.createEntity({
      name: 'BabylonGraphics',
      type: 'TEXT',
      text: '3D Graphics',
      width: 60,
      height: 50,
      color: 0x000000,
      style: {
        width: '60px',
        height: '30px',
        fontSize: '12px',
        textAlign: 'center',
        border: '1px solid black'
      },
      body: true,
      isSensor: true,
      position: {
        x: 55,
        y: 75,
        z: 64
      }
    });


    // if touch warp, switch to Music level
    game.createEntity({
      type: 'WARP',
      kind: 'Music',
      width: 64,
      height: 64,
      depth: 64,
      texture: 'warp-to-music',
      isStatic: true,
      isSensor: true,
      position: {
        x: -300,
        y: 0,
        z: 32
      }
    });

    // text label saying "Warp To Platform World"
    game.createEntity({
      type: 'TEXT',
      width: 100,
      text: 'Warp To Music World',
      // width: 200,
      color: 0x000000,
      style: {
        width: '100px',
        fontSize: '16px',
        textAlign: 'center'
      },
      body: false,
      position: {
        x: -300,
        y: -30,
        z: 64
      }
    });

    // text label saying "Warp To Platform World"
    game.createEntity({
      type: 'TEXT',
      text: 'Warp To Platform World',
      color: 0x000000,
      width: 120,
      height: 200,
      style: {
        width: '120px',
        fontSize: '16px',
        textAlign: 'center'
      },
      body: false,
      position: {
        x: 300,
        y: 20,
        z: 64
      }
    });

    // if touch note play sound
    game.createEntity({
      type: 'NOTE',
      color: 0xccff00,
      width: 32,
      height: 32,
      depth: 16,
      isStatic: true,
      position: {
        x: -120,
        y: -200,
        z: 32
      }
    });

    /*
    game.createEntity({
      name: 'noteInfo',
      type: 'TEXT',
      text: 'This is a note, touch it to play a sound',
      fontSize: 16,
      color: 0x000000,
      body: false,
      style: {
        fontSize: '16px'
      },
      position: {
        x: 0,
        y: -200,
        z: 64
      }
    });
    */

    let itemsList = ['arrow', 'sword', 'lantern', 'fire', 'bomb', 'iceArrow', 'boomerang'];
    // itemsList = [];
    itemsList.forEach((item, index) => {
      game.createEntity({
        type: item.toUpperCase(),
        kind: item,
        width: 16,
        height: 16,
        depth: 32,
        texture: {
          sheet: 'loz_spritesheet',
          sprite: item,
        },
        position: {
          x: -100 + (index * 32),
          y: 150,
          z: 32
        }
      });
    });

    game.createEntity({
      type: 'NPC',
      texture: 'demon',
      //texture: 'fire',
      //color: 0xff0000,
      width: 8,
      height: 8,
      depth: 64,
      position: {
        x: -60,
        y: -60,
        z: 32
      }
    });

    game.createEntity({
      type: 'NPC',
      texture: 'demon',
      //texture: 'fire',
      //color: 0xff0000,
      width: 8,
      height: 8,
      depth: 64,
      position: {
        x: 64,
        y: -60,
        z: 32
      }
    });

    game.createEntity({
      type: 'FIRE',
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'fire',
        // frame: 0 // TODO: support single frame / bypass animation of array
      },
      //texture: 'fire',
      //color: 0xff0000,
      width: 16,
      height: 16,
      depth: 64,
      isStatic: true,
      position: {
        x: -80,
        y: -60,
        z: 32
      }
    });

    game.createEntity({
      type: 'FIRE',
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'fire',
        // frame: 0 // TODO: support single frame / bypass animation of array
      },
      //texture: 'fire',
      //color: 0xff0000,
      width: 16,
      height: 16,
      depth: 64,
      isStatic: true,
      position: {
        x: 80,
        y: -60,
        z: 32
      }
    });

  }

}

export default Home;