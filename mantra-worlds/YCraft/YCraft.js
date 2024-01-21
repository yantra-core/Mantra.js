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
    game.setZoom(3.5);
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
      // color: 0x00ff00,
      width: 64,
      texture: 'warp-to-home',
      isStatic: true,
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


    rules.addCondition('PLAYER_UP', { op: 'or', conditions: ['W', 'DPAD_UP'] });
    rules.addCondition('PLAYER_DOWN', { op: 'or', conditions: ['S', 'DPAD_DOWN'] });
    rules.addCondition('PLAYER_LEFT', { op: 'or', conditions: ['A', 'DPAD_LEFT'] });
    rules.addCondition('PLAYER_RIGHT', { op: 'or', conditions: ['D', 'DPAD_RIGHT'] });
    rules.addCondition('USE_ITEM_1', { op: 'or', conditions: ['SPACE', 'H', 'BUTTON_X'] });

    rules.addCondition('ZOOM_IN', { op: 'or', conditions: ['O', 'BUTTON_L1'] });
    rules.addCondition('ZOOM_OUT', { op: 'or', conditions: ['P', 'BUTTON_R1'] });

    rules.use(movement(game), 'movement');

    rules
      .if('PLAYER_UP')
      .then('MOVE_UP')
      .then('updateSprite', { sprite: 'playerUp' });

    rules
      .if('PLAYER_LEFT')
      .then('MOVE_LEFT')
      .then('updateSprite', { sprite: 'playerLeft' });

    rules
      .if('PLAYER_DOWN')
      .then('MOVE_DOWN')
      .then('updateSprite', { sprite: 'playerDown' });

    rules
      .if('PLAYER_RIGHT')
      .then('MOVE_RIGHT')
      .then('updateSprite', { sprite: 'playerRight' })


    rules.if('USE_ITEM_1').then('FIRE_BULLET');

    // Remark: We could introduce a sutra.do('ZOOM_IN') directive
    rules.if('ZOOM_IN').then('ZOOM_IN');
    rules.if('ZOOM_OUT').then('ZOOM_OUT');

    rules.on('updateSprite', function (player, node) {
      game.updateEntity({
        id: player.id,
        texture: {
          frameIndex: 0,
          sheet: player.texture.sheet,
          sprite: node.data.sprite,
          animationPlaying: true
        }
      })
    });


    rules.on('FIRE_BULLET', function (player) {
      game.systems.bullet.fireBullet(player.id);
    });

    function yCraftRules() {
      let rules = game.createSutra();

      // TODO: use common warp sutra
      rules.addCondition('playerTouchedWarpZone', (entity, gameState) => {
        if (entity.type === 'COLLISION') {
          // console.log('entity', entity)

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