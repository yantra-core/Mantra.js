import contraptionsExample from './contraptions-example.js';
import movement from '../../mantra-sutras/player-movement/top-down.js';

class YCraft {
  static id = 'world-ycraft';
  static type = 'world'; // type is optional for Plugins
  constructor(game) {
    this.game = game; // Store the reference to the game logic
    this.id = YCraft.id;
    this.type = YCraft.type;
  }

  init(game) {
    this.game = game;
    this.createWorld();
  }

  createWorld() {

    let game = this.game;
    game.customMovement = false;
    game.reset();
    game.setGravity(0, 0, 0);
    game.setSize(1600, 900);

    if (game.isTouchDevice()) {
      game.zoom(1.5);
    } else {
      game.setZoom(3.5);
    }

    game.use('Boomerang');
    game.use('Bullet');
    game.use('Block');
    game.use('YCraft', {
      contraption: contraptionsExample
    });
    game.use('YCraftGUI');

    // create warp by back home entity
    game.createEntity({
      type: 'WARP',
      exit: {
        world: 'Home',
        position: {
          x: 0,
          y: 0
        }
      },
      // color: 0x00ff00,
      width: 64,
      texture: 'warp-to-home',
      isStatic: true,
      collisionStart: true,
      // isSensor: false,
      height: 64,
      position: {
        x: 260,
        y: 60,
        z: 0
      }
    });

    // text label saying "Warp To Mantra Home"
    game.createEntity({
      type: 'TEXT',
      text: 'Warp To Mantra',
      width: 120,
      // kind: 'dynamic',
      color: 0x000000,
      style: {
        fontSize: '16px',
        textAlign: 'center'
      },
      body: false,
      position: {
        x: 260,
        y: 60,
        z: 64
      }
    });

    let rules = game.rules;

    function yCraftRules() {
      let rules = game.createSutra();
      // no custom rules yet, see YCraft.js plugin
      game.useSutra(rules, 'YCRAFT');

    }

    yCraftRules();
    /*
    game.once('plugin::loaded::typer-ghost', function(){
      game.systems['typer-ghost'].createText({ x: 300, y: 500, text: 'YCraft Crafting World', style: { color: 'white', fontSize: '144px' }, duration: 5000, removeDuration: 1000 });
    })

    game.use('GhostTyper');
    */
    /*
    game.use('Editor', {
      sourceCode: 'https://github.com/yantra-core/mantra/blob/master/mantra-worlds/YCraft/YCraft.js',
      sutraEditor: true
    });
    */

    /*
    game.createEntity({ 
      type: 'BLOCK',
      color: 0xcccccc,
      mass: 10000,
      height: 64,
      width: 64,
      position: { x: 150, y: 300, z: 0 },
      friction: 1, 
      frictionAir: 1, 
      frictionStatic: 1
    });
    */


    // create some blocks to use
    for (let i = 0; i < 10; i++) {
      game.createEntity({
        type: 'BLOCK',
        texture: 'tile-block',
        mass: 10000,
        height: 16,
        width: 16,
        startCollision: true,
        position: {
          x: 180,
          y: 0 + i * 64,
          z: 0
        },
        friction: 1,
        frictionAir: 1,
        frictionStatic: 1
      });
    }

    // Remark: Players removed for initial demo, is working

    game.createDefaultPlayer({
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'player'
      },
      position: {
        x: 0,
        y: 0
      }
    });

  }

  update() { }

  render() { }

  destroy() { }

  unload() {
    console.log('YCraft.unload()');

  }

}

export default YCraft;