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

    // Movements with right click, switch default left-click-to-move behavior
    game.config.mouseMovementButton = 'RIGHT';
    // Actions with left click
    game.config.mouseActionButton = 'LEFT';
    // enables the default top-down mouse movements
    // game.config.defaultMouseMovement = true;

    game.reset();
    this.bindEvents();
    this.createWorld();

    game.make()
    .Tower()
    .color('purple')
    .mass(10000)
    .position(300, -40)
    .angle(-180)
    .offset(50)
    .createEntity();

  }


  bindEvents() {
    let game = this.game;
    this.mousePosition = { x: 0, y: 0 };
    let that = this;

    game.on('pointerUp', function (position, event) {
      that.dropping = false;
      that.slurping = false;
    });

    game.on('pointerDown', function (context, event) {
      let position = context.position;
      that.mousePosition = position;
      console.log('ccccasdasd', context)
      // adjust position for game camera offset
      that.mousePosition.x = that.mousePosition.x - game.data.camera.offsetX;
      that.mousePosition.y = that.mousePosition.y - game.data.camera.offsetY;

      that.mousePosition.clientX = event.clientX;
      that.mousePosition.clientY = event.clientY;
      // if right click
      if (event.button === 2) {}
      game.make().Tower({
        fireRate: 10,
      }).x(position.x).y(position.y).angle(-180).createEntity();

      // if left click
      if (event.button === 0) {


        that.dropping = true;
        //game.pingPosition(event.clientX, event.clientY, 1, { color: 'white', duration: 1500, size: 25, finalSize: 100, borderWidth: 3 });
        that.slurping = true;
        //game.pingPosition(event.clientX, event.clientY, 1, { reverse: true, color: 'red', duration: 1500, size: 25, finalSize: 100, borderWidth: 3 });
      }
    });

    game.on('pointerMove', function (position, event) {
      that.mousePosition = position;
      that.mousePosition.x = that.mousePosition.x - game.data.camera.offsetX;
      that.mousePosition.y = that.mousePosition.y - game.data.camera.offsetY;
    });
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

    game.make().Hexapod().repeat(22).createEntity();

    if (game.isTouchDevice()) {
      game.zoom(1.44);
    } else {
      game.zoom(2.5);
    }

    game.make().Player().texture(
      {
          sheet: 'loz_spritesheet',
          sprite: 'player'
      }
    ).position(352, 80, 2).createEntity();

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




