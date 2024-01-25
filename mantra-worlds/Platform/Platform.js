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
    // game.off('entityInput::handleInputs', this.handleInputs);
  }

  createWorld() {

    let game = this.game;
    game.customMovement = true;

    game.reset();
    game.setGravity(0, 3.3, 0);
    game.setZoom(4.5);

    game.createPlayer({
      height: 32,
      width: 32 ,
      texture: {
        sheet: 'blackMage',
        sprite: 'playerRight',
      },
      position: {
        x: 10,
        y: -100
      }
    });
   
    game.use('Platform');
    game.use('Sword');
   
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
      y: 13,
      z: -10,
      width: 850,
      height: 60
    });

    createPlatform({
      x: 925,
      y: 10,
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

    let rules = game.rules;

    // TODO: moves to sutras.js
    let warp = warpToWorld(game);
    rules.use(warp, 'warpToWorld');
    // rules.use(movement(game), 'movement');
    rules.addCondition('isTile', (entity) => entity.type === 'BLOCK');


    rules.if('A').then('MOVE_LEFT').then('updateSprite', { sprite: 'playerLeftWalk' });


    rules.addMap('determineDuckingSprite', (player, node) => {

      let sprite = 'playerDownRight';
      if (player.texture.sprite === 'playerLeftWalk') {
        player.texture.sprite = 'playerDownLeft';
      } else {
        player.texture.sprite = 'playerDownRight';
      }

      return player;

    });
  

    rules.if('S').then('DUCK').map('determineDuckingSprite').then('updateSprite');


    rules.if('D').then('MOVE_RIGHT').then('updateSprite', { sprite: 'playerRightWalk' });


    /*

     Adding textures to Entities
      game.updateEntity({
        id: player.id,
        texture: {
          frameIndex: 0,
          sheet: player.texture.sheet,
          sprite: { // sets directly to sprite, no animations
            x: -112,
            y: -16,
            height: 16,
            width: 16
          }
        }
      })

    */


    rules.on('updateSprite', function(player, node){
      let sprite = node.data.sprite || player.texture.sprite;

      console.log('updateSprite', sprite)
      game.updateEntity({
        id: player.id,
        texture: {
          frameIndex: 0,
          sheet: player.texture.sheet,
          sprite: sprite,
          animationPlaying: true
        }
      })



    });


    /*
    game.createPlayer({
      texture: {
        sheet: 'loz_spritesheet',
        sprite: {
          x: 120,
          y: 435,
          height: 16,
          width: 16
        }
      },
      position: {
        x: 0,
        y: 0
      }
    });
    */

    // rules.if('SPACE').then('JUMP');
    rules.addCondition('isPlayer', (entity) => entity.type === 'PLAYER');
    rules.addCondition('isRunning', {
      op: 'or',
      conditions: ['S', 'K'] // defaults DOWN key, or B button on Gamepad
    });  

    let maxJumpTicks = 50;
    // Remark: isPlayer is already implied for all Key inputs,
    //         however we add the additional check here for the negative case,
    //         in order to not let other ents reset player walk speed
    rules
      .if('isPlayer')
      .then((rules) => {
        rules
        .if('isRunning')
        .then('RUN')
        .else('WALK');
      })

      rules
      .if('isPlayer')
      .then((rules) => {
      rules
        .if('SPACE')
        // .if('doesntExceedDuration')
        .then('JUMP')
        .then('updateSprite', { sprite: 'playerRightJump' })
      })
    
    //rules.if('L').then('SWING_SWORD');
    //rules.if('O').then('ZOOM_IN');
    //rules.if('P').then('ZOOM_OUT');

    rules.on('JUMP', function(player, node, gameState){
      if (gameState.inputTicks.SPACE >= maxJumpTicks) {
        return;
      }
      game.applyForce(player.id, { x: 0, y: -1.2, z: 0 });
      game.updateEntity({ id: player.id, rotation: 0, sprite: 'playerRightJump' });
    });

    let runningForce = 1;

    rules.on('RUN', function(player){
      runningForce = 1.6;
      maxJumpTicks = 70;
    });

    rules.on('WALK', function(player){
      runningForce = 1;
      maxJumpTicks = 50;
    });

    rules.on('DUCK', function(player){
      game.applyForce(player.id, { x: 0, y: 0.5, z: 0 });
      game.updateEntity({ id: player.id, rotation: Math.PI });
    });

    rules.on('MOVE_LEFT', function(player, node, gameState){
      game.applyForce(player.id, { x: -runningForce, y: 0, z: 0 });
      game.updateEntity({ id: player.id, rotation: -Math.PI / 2 });
    });

    rules.on('MOVE_RIGHT', function(player){
      game.applyForce(player.id, { x: runningForce, y: 0, z: 0 });
      game.updateEntity({ id: player.id, rotation: Math.PI / 2 });
    });
    
    rules.on('FIRE_BULLET', function(player){
      game.systems.bullet.fireBullet(player.id);
    });

    rules.on('SWING_SWORD', function(player){
      if (game.systems.sword) {
        game.systems.sword.swingSword(player.id);

      }
    })

    /*
    rules.on('CAMERA_SHAKE', function(player){
      game.shakeCamera(1000);
    });
    */
    rules.on('ZOOM_IN', function(){
      let currentZoom = game.data.camera.currentZoom || 1;
      game.setZoom(currentZoom + 0.05);
    });
    rules.on('ZOOM_OUT', function(){
      let currentZoom = game.data.camera.currentZoom || 1;
      game.setZoom(currentZoom - 0.05);
    });

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

    let itemsList = ['arrow', 'sword', 'lantern', 'fire', 'bomb'];
    //itemsList = [];
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