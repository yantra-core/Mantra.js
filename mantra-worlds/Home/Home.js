import sutras from './sutras.js';
import welcomeMessage from './welcomeMessage.js';

class Home {
  static id = 'world-home';
  static type = 'world'; // type is optional for Plugins

  constructor() {
    this.id = Home.id;
    this.type = Home.type;
  }

  init(game) {
    this.game = game;
    this.createWorld();
  }

  createWorld() {

    let game = this.game;

    game.reset();
    game.setZoom(4.5);
    game.setSize(16000, 9000);
    game.setGravity(0, 0, 0);

    // sprite sheet has been defined in defaultAssets.js
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

    game.createEntity({
      type: "BACKGROUND",
      texture: 'garden',
      width: 300,
      height: 300,
      body: false,
      position: {
        x: 0,
        y: 0,
        z: -10
      }
    })

    game.setBackground('#007fff');

    game.use('Block');
    game.use('Bomb');

    game.use('Border', { autoBorder: true })
    game.use('Bullet');
    // game.use('Sword')
    // game.use('Tile');
    game.use('Tone');

    welcomeMessage(game);
    game.useSutra(sutras(game), 'HOME');
    
    /*
    rules.on('SWING_SWORD', function(player){
      game.systems.sword.swingSword(player.id);
    })
    */
    /*
    rules.on('CAMERA_SHAKE', function(player){
      game.shakeCamera(1000);
    });
    */



    // now create some background and text entities for navigation


    game.createEntity({
      name: 'sutra-tree',
      type: 'BACKGROUND',
      // kind: 'building',
      width: 1024 / 4,
      height: 1024 / 4,
      //depth: 256,
      depth: 1,
      texture: 'sutra-tree',
      body: false,
      position: {
        x: 0,
        y: 300,
        z: 32
      }
    });

    // convert the Sutra.js rules to English text
    /*
    let rulesEnglish = game.rules.toEnglish();
    game.createEntity({
      name: 'sutra-tree-text',
      type: 'TEXT',
      text: 'Sutra Rules \n\n' + rulesEnglish,
      width: 256,
      height: 256,
      depth: 1,
      // texture: 'sutra-tree',
      body: false,
      style: {
        // this is code and we need to preserve the spaces and \n
        whiteSpace: 'pre',
        // width: '150px',
        // fontSize: '12px',
        textAlign: 'left',
        color: 'black',
        opacity: 0.55
      },
      position: {
        x: 40,
        y: 550,
        z: 32
      }
    });
    */

    game.createEntity({
      type: 'BACKGROUND',
      texture: 'robot-arms-apartment',
      kind: 'building',
      depth: 1,

      width: 1340,
      height: 3668,
      body: false,
      position: { // position to right
        x: 900,
        y: -1800,
        z: -1
      }
    });

    game.createEntity({
      type: 'BACKGROUND',
      texture: 'planet-express-base',
      kind: 'building',

      width: 2048,
      height: 2048,
      depth: 1,
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




    // if touch warp, switch to YCraft level
    game.createEntity({
      type: 'WARP',
      // kind: 'YCraft',
      width: 64,
      height: 64,
      depth: 64,
      texture: 'warp-to-ycraft',
      isStatic: true,
      isSensor: true,
      exit: {
        world: 'YCraft', // optional, if not specified will use the current world
        position: {      // optional, if not specified will use 0,0,0
          x: 0,
          y: 0
        }
      },
      position: {
        x: 0,
        y: -210,
        z: 32
      }
    });

    // if touch warp, switch to Sutra level
    /*
    game.createEntity({
      type: 'WARP',
      kind: 'Sutra',
      width: 64,
      height: 64,
      depth: 64,
      texture: 'warp-to-sutra',
      isStatic: true,
      isSensor: true,
      position: {
        x: 0,
        y: 210,
        z: 32
      }
    });
    */

    // text label saying "Warp To YCraft World"
    game.createEntity({
      type: 'TEXT',
      text: 'Warp To YCraft World',
      width: 164,
      // kind: 'dynamic',
      color: 0x000000,
      style: {
        fontSize: '16px',
        textAlign: 'center',
        paddingLeft: '20px', // for now

      },
      body: false,
      position: {
        x: -20,
        y: -220,
        z: 64
      }
    });

    // switch to 3d text label
    game.createEntity({
      type: 'TEXT',
      text: 'CSSGraphics Engine',
      width: 20,
      color: 0x000000,
      style: {
        width: '150px',
        fontSize: '12px',
        textAlign: 'center',
        color: 'black',
        opacity: 0.22
      },
      body: false,
      position: {
        x: -63,
        y: -16,
        z: -2
      }
    });

    /*
    // switch to CSSGraphics
    game.createEntity({
      name: 'CSSGraphics',
      kind: 'CSSGraphics',
      collisionActive: true,
      collisionEnd: true,
      collisionStart: true,

      type: 'TEXT',
      text: 'CSS',
      width: 60,
      height: 50,
      //color: 0xffffff,
      style: {
        width: '60px',
        height: '30px',
        fontSize: '12px',
        color: 'white',
        textAlign: 'center',
        // border: '1px solid white',
        opacity: 0.7
      },
      body: true,
      isSensor: true,
      position: {
        x: -55,
        y: 75,
        z: 10
      }
    });
    */

    /*
    // switch to 3d text label
    game.createEntity({
      name: 'BabylonGraphics',
      collisionActive: true,
      collisionEnd: true,
      collisionStart: true,
      kind: 'BabylonGraphics',
      type: 'TEXT',
      text: '3D',
      width: 60,
      height: 50,
      color: 0x000000,
      style: {
        width: '60px',
        height: '30px',
        fontSize: '12px',
        color: 'white',
        textAlign: 'center',
        opacity: 0.7
      },
      body: true,
      isSensor: true,
      position: {
        x: 55,
        y: 75,
        z: 64
      }
    });
    */

    game.createEntity({
      type: 'DOOR',
      exit: {
        position: {
          x: -1000,
          y: -500
        },
      },
      body: true,
      isStatic: true,
      collisionStart: true,
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'ayyoDoor',
      },
      width: 16,
      height: 16,
      position: { // position to right
        x: 55,
        y: 71,
        z: 10
      }
    });

    game.createEntity({
      type: 'DOOR',
      exit: {
        position: {
          x: 1100,
          y: -500
        },
      },
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'ayyoDoor',
      },
      width: 16,
      height: 16,
      body: true,
      isStatic: true,
      collisionStart: true,
      position: { // position to left
        x: -55,
        y: 71,
        z: 10
      }
    });

    // if touch warp, switch to Music level
    game.createEntity({
      type: 'WARP',
      exit: {
        world: 'Music'
      },
      width: 64,
      height: 64,
      depth: 64,
      texture: 'warp-to-music',
      isStatic: true,
      isSensor: true,
      position: {
        x: -250,
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
        x: -250,
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
        x: 250,
        y: 20,
        z: 64
      }
    });

    game.createEntity({
      type: 'WARP',
      exit: {
        world: 'Platform'
      },
      width: 64,
      height: 64,
      depth: 64,
      texture: 'warp-to-platform',
      isStatic: true,
      isSensor: true,
      position: {
        x: 250,
        y: 0,
        z: 32
      }
    });

    game.createEntity({
      type: 'WARP',
      exit: {
        world: 'GravityGardens'
      },
      width: 64,
      height: 64,
      depth: 64,
      // texture: 'warp-to-platform',
      isStatic: true,
      isSensor: true,
      position: {
        x: 250,
        y: 250,
        z: 32
      }
    });

    // text label saying "Warp To Platform World"
    game.createEntity({
      type: 'TEXT',
      width: 80,
      text: 'Gravity Gardens',
      // width: 200,
      color: 0x000000,
      style: {
        width: '100px',
        fontSize: '16px',
        textAlign: 'center'
      },
      body: false,
      position: {
        x: 240,
        y: 280,
        z: 32
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

    // displays some items from the spritesheet
    let itemsList = ['arrow', 'sword', 'lantern', 'fire', 'bomb', 'iceArrow', 'boomerang'];
    itemsList = []; // for now
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

    /*

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

    */

  }

  unload() {
    // optionally unload assets
    // in most cases calling game.reset() is sufficient
  }

}

export default Home;