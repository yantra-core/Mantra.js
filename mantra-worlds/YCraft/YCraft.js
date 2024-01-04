import contraptionsExample from './contraptions-example.js';

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
    game.setGravity(0, 0, 0);
    game.use('Bullet');
    game.use('Block');
    game.use('YCraft', {
      contraption: contraptionsExample
    });
    game.use('YCraftGUI');

    // create warp by back home entity
    game.createEntity({
      type: 'WARP',
      kind: 'Home',
      color: 0x00ff00,
      width: 64,
      isStatic: true,
      // isSensor: false,
      height: 64,
      position: {
        x: 0,
        y: -200,
        z: 0
      }
    });

    let rules = game.createSutra();

    // TODO: use common warp sutra
    rules.addCondition('playerTouchedWarpZone', (entity, gameState) => {
      if (entity.type === 'COLLISION') {
        console.log('entity', entity)

        if (entity.bodyA.type === 'PLAYER' && entity.bodyB.type === 'WARP') {
          return true;
        }
        if (entity.bodyA.type === 'WARP' && entity.bodyB.type === 'PLAYER') {
          return true;
        }
      }
    });

    rules
      .if('playerTouchedWarpZone')
      .then('switchWorld')

    // TODO: make this common Sutra
    rules.on('switchWorld', (entity) => {
      console.log('entityentity', entity)
      let worldName = entity.WARP.kind || 'Home';
      game.switchWorlds(worldName);
    });

    game.setSutra(rules);


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
      position: {
        x: 75,
        y: 75,
        z: 0
      }
    });


    /* Not needed anymore?
    game.systems.graphics.switchGraphics('CSSGraphics', function(){});
    */

  }

  update() {}

  render() { }

  destroy() { }

  unload() {
    console.log('YCraft.unload()');

  }

}

export default YCraft;