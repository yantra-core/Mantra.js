import movement from '../../mantra-sutras/player-movement/platformer.js';
import warpToWorld from '../sutras/warpToWorld.js';

class Platform {
  static id = 'world-platform';
  static type = 'world'; // type is optional for Plugins
  constructor(game) {
    this.game = game; // Store the reference to the game logic
    this.id = Platform.id;
    this.type = Platform.type;
  }

  init(game) {
    this.game = game;
    game.data.camera.mode = 'platformer';
    this.createWorld();
  }

  unload () {
    let game = this.game;
    // reset camera mode
    game.data.camera.mode = null;
    // remove event listeners
    game.off('entityInput::handleInputs', this.handleInputs);
  }

  createWorld() {

    let game = this.game;
    game.customMovement = true;

    game.setGravity(0, 3.3, 0);
    game.setZoom(4.5);

    game.use('Platform');
   
    function createPlatform(platformData) {
      game.createEntity({
        type: 'PLATFORM',
        isStatic: true,
        width: platformData.width,
        height: platformData.height,
        // color: platformData.color,
        style: {
          display: 'none'
        },
        position: {
          x: platformData.x,
          y: platformData.y,
          z: platformData.z
        }
      });
    }

    // create some coin blocks near start like mario smb3-1-1
    createPlatform({
      x: 185,
      y: -74,
      z: -10,
      color: 0xff0000,
      width: 16,
      height: 16
    });

    createPlatform({
      x: 185 + 16,
      y: -74,
      z: -10,
      color: 0xff0000,
      width: 16,
      height: 16
    });

    createPlatform({
      x: 200,
      y: 10,
      z: -10,
      width: 850,
      height: 60
    });

    createPlatform({
      x: 925,
      y: 0,
      z: -10,
      width: 600,
      height: 60
    });

    /*
    createPlatform({
      x: 300,
      y: 10,
      z: -1,
      width: 2000,
      height: 60
    });
    */


    let rules = game.createSutra();

    // TODO: moves to sutras.js
    let warp = warpToWorld(game);
    rules.use(warp, 'warpToWorld');
    rules.use(movement(game), 'movement');
    rules.addCondition('isTile', (entity) => entity.type === 'BLOCK');


    this.handleInputs  = function (entityId, inputs){
      rules.emit('entityInput::handleInputs', entityId, inputs)
    }
    game.on('entityInput::handleInputs', this.handleInputs);

    game.setSutra(rules);

    // console.log('created sutra', rules)

    game.createEntity({
      type: 'WARP',
      kind: 'Home',
      texture: 'warp-to-home',
      width: 64,
      height: 64,
      depth: 1,
      isStatic: true,
      position: {
        x: -100,
        y: -100
      }
    });

    game.createEntity({
      type: 'TEXT',
      text: 'Warp To Mantra',
      width: 120,
      // kind: 'dynamic',
      color: 0xffffff,
      style: {
        color: '#ffffff',
        padding: '2px',
        paddingLeft: '10px', // for now
        fontSize: '16px',
        textAlign: 'center',
        backgroundColor: 'transparent',
      },
      body: false,
      position: {
        x: -105,
        y: -110
      }
    });

    // TODO: remap spacebar to jump
    // TODO:     game.on('game::ready', function () {
    //           needs secound ready emit after plugins are loaded after start
    game.on('plugin::ready::Platform', function () {
      //console.log(game.systems.platform.kinds)
      game.systems.platform.kinds.forEach((platformData) => {
        // TODO: arrange platforms in a grid
      });

      /*
      createPlatform({
        x: 1200,
        y: 200,
        width: 800,
        height: 60
      });

      createPlatform({
        x: 0,
        y: 600,
        width: 500,
        height: 60
      });

      createPlatform({
        x: 1200,
        y: 600,
        width: 600,
        height: 60
      });
      */

    });

    // game.use('Border', { autoBorder: true })
    game.use('Bullet')
    // game.use('Sword')

    game.createEntity({
      type: 'BACKGROUND',
      texture: 'smb3-1-1',
      width: 2816,
      height: 433,
      body: false,
      position: { // position to right
        x: 0 + 1408,
        y: 0 - 216.5,
        z: -8
      }
    });

    game.createDefaultPlayer({
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'player'
      },
      position: {
        x: 10,
        y: -100
      }
    });

    let itemsList = ['arrow', 'sword', 'lantern', 'fire', 'bomb'];
    itemsList = [];
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
          x: 150 + (index * 32),
          y: -100,
          z: 32
        }
      });
    });

  }

  update() {
  }

  render() { }

  destroy() { }

}

export default Platform;