import sutras from './sutras.js';
import welcomeMessage from './welcomeMessage.js';

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
    // game.data.camera.currentZoom = 2;
    game.setGravity(0, 0, 0);
    game.createDefaultPlayer();

    game.use('Block')

    // TODO: better control of loading tiles
    // TODO: game.systems.tile.loadTilemap() -> Tiled JSON
    game.use('Tile');
    game.use('Tone');

    game.use('Bullet')
    //game.use('Sword')

    game.use('Border', { autoBorder: true })

    welcomeMessage(game);

    // See: sutra.js for game logic
    let rules = sutras(game);
    game.setSutra(rules);

    game.createEntity({
      type: 'BACKGROUND',
      texture: 'tile-grass',
      width: game.data.width,
      height: game.data.height,
      body: false,
      position: {
        x: 0,
        y: 0,
        z: -10
      }
    });

    game.createEntity({
      type: 'BACKGROUND',
      texture: 'tile-block',
      width: game.data.width * 0.25,
      height: game.data.height * 0.25,
      body: false,
      position: { // position to right
        x: game.data.width * 0.5 - game.data.width * 0.25,
        y: 0,
        z: -8
      }
    });


    // Your sprite data
    //const spriteData = { x: 16, y: 16, width: 16, height: 16 }; // Actual sprite size
    //const spriteData2 = { x: 64, y: 16, width: 16, height: 16 }; // Actual sprite size


    const spriteData = { x: 448, y: 400, width: 16, height: 16 }; // Actual sprite size
    const spriteData2 = { x: 496, y: 400, width: 16, height: 16 }; // Actual sprite size

    //const spriteData = { x: 16, y: 16, width: 16, height: 16 }; // Actual sprite size
    //const spriteData2 = { x: 64, y: 16, width: 16, height: 16 }; // Actual sprite size

    const entitySize = { width: 16, height: 16 }; // Size of the entity

    // Spritesheet dimensions
    const spritesheetWidth = 672;
    const spritesheetHeight = 672;

    // Calculate the scale factor
    const scaleX = entitySize.width / spriteData.width; // How much to scale the sprite to fit the entity's width
    const scaleY = entitySize.height / spriteData.height; // How much to scale the sprite to fit the entity's height

    // Apply this scale to the entire spritesheet
    const bgSizeX = spritesheetWidth * scaleX;
    const bgSizeY = spritesheetHeight * scaleY;

    let swordEnt = game.createEntity({
      type: 'SWORD',
      texture: {
        sheet: 'loz_spritesheet',
        frame: 'sword'
      },
      style: {
        backgroundPosition: `${-spriteData.x}px ${-spriteData.y}px`,
        backgroundSize: `${bgSizeX}px ${bgSizeY}px`
      },
      width: entitySize.width,
      height: entitySize.height,
      // body: false,
      position: { // position to right
        x: 200,
        y: 0,
        z: -8
      }
    });

    let position = 0;
    setInterval(function () {
      if (position === 0) {
        position = 1;
      } else {
        position = 0;
      }
      // console.log('pppp', position, swordEnt)
      if (position === 0) {
        game.updateEntity({
          id: swordEnt.id,
          texture: {
            sheet: 'loz_spritesheet',
            frame: 'sword'
          },
          style: {
            backgroundPosition: `${-spriteData2.x}px ${-spriteData2.y}px`,
            backgroundSize: `${bgSizeX}px ${bgSizeY}px`
          }
        })
      } else {
        game.updateEntity({
          id: swordEnt.id,
          texture: {
            sheet: 'loz_spritesheet',
            frame: 'sword'
          },
          style: {
            backgroundPosition: `${-spriteData.x}px ${-spriteData.y}px`,
            backgroundSize: `${bgSizeX}px ${bgSizeY}px`
          }
        })
      }

      // toggle graphics sprite`
    }, 200)

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


    // if touch warp, switch to Platform level
    game.createEntity({
      type: 'WARP',
      width: 64,
      height: 64,
      depth: 64,
      isStatic: true,
      position: {
        x: 300,
        y: 0,
        z: 32
      }
    });

    // if touch note play sound
    game.createEntity({
      type: 'NOTE',
      color: 0xccff00,
      width: 64,
      height: 64,
      depth: 64,
      isStatic: true,
      position: {
        x: 0,
        y: -200,
        z: 32

      }
    });

    // if touch fire damage entity
    game.createEntity({
      type: 'FIRE',
      texture: 'fire',
      //color: 0xff0000,
      width: 64,
      height: 64,
      depth: 64,
      isStatic: true,
      position: {
        x: -400,
        y: 50,
        z: 32
      }
    });


  }

}

export default Home;