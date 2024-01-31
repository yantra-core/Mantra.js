import sutras from './sutras.js';
import welcomeMessage from './welcomeMessage.js';

class Tiled {
  static id = 'world-home';
  static type = 'world'; // type is optional for Plugins

  constructor() {
    this.id = Tiled.id;
    this.type = Tiled.type;
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
    // game.setBackground('#000000');
    game.useFoV = true;
    game.data.fieldOfView = 96;
    // sprite sheet has been defined in defaultAssets.js
    game.createPlayer({
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'player',
      },
      position: {
        x: 0,
        y: 0,
        z: 1
      }
    });

    game.setBackground('#000000');

    game.use('Block');
    game.use('Border', { autoBorder: true })
    game.use('Bullet');
    // game.use('Sword')
    game.use('Tile', {
      loadInitialChunk: true,
      tiledServer: true,
      tileSize: 16,
      chunkUnitSize: 8,
      proceduralGenerateMissingChunks: false,
      lazyLoadTiles: false,
      loadDefaultTileMap: false
    });
    game.use('Tone');

    // welcomeMessage(game);

    let rules = game.rules;

    rules.addCondition('PLAYER_UP', { op: 'or', conditions: ['W', 'DPAD_UP'] });
    rules.addCondition('PLAYER_DOWN', { op: 'or', conditions: ['S', 'DPAD_DOWN'] });
    rules.addCondition('PLAYER_LEFT', { op: 'or', conditions: ['A', 'DPAD_LEFT'] });
    rules.addCondition('PLAYER_RIGHT', { op: 'or', conditions: ['D', 'DPAD_RIGHT'] });
    rules.addCondition('USE_ITEM_1', { op: 'or', conditions: ['SPACE', 'H', 'BUTTON_X'] });

    // see: ../mantra-sutras/movement/top-down.js events MOVE_UP, MOVE_DOWN, etc.
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

    rules
      .if('USE_ITEM_1')
        .then('FIRE_BULLET')
          .map('determineShootingSprite')
          .then('updateSprite');

    //rules.if('K').then('SWING_SWORD');
    //rules.if('L').then('SWING_SWORD');
    // rules.if('L').then('DROP_BOMB');
    rules.if('K').if('canDropBomb').then('DROP_BOMB');

    rules.if('O').then('ZOOM_IN');
    rules.if('P').then('ZOOM_OUT');

    rules.addMap('determineShootingSprite', (player, node) => {
      // Normalize the rotation within the range of 0 to 2π
      const normalizedRotation = player.rotation % (2 * Math.PI);
      // Define a mapping from radians to sprites
      const rotationToSpriteMap = {
        0: 'playerRodUp',
        [Math.PI / 2]: 'playerRodRight',
        [Math.PI]: 'playerRodDown',
        [-Math.PI / 2]: 'playerRodLeft'
      };
      // Set the sprite based on the rotation, default to the current sprite
      player.texture.sprite = rotationToSpriteMap[normalizedRotation] || player.currentSprite;
      return player;
    });

    rules.on('updateSprite', function (player, node) {
      let sprite = node.data.sprite || player.texture.sprite;
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

    rules.on('FIRE_BULLET', function (player) {
      console.log("FFFFUREBULLET")
      game.systems.bullet.fireBullet(player.id);
    });

    rules.on('DROP_BOMB', function (player) {
      rules.emit('dropBomb', player)
    });
    rules.on('ZOOM_IN', function () {
      let currentZoom = game.data.camera.currentZoom || 1;
      game.setZoom(currentZoom + 0.05);
    });
    rules.on('ZOOM_OUT', function () {
      let currentZoom = game.data.camera.currentZoom || 1;
      game.setZoom(currentZoom - 0.05);
    });

    game.useSutra(sutras(game), 'TILED');

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
    let rulesEnglish = rules.toEnglish();
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


  }

  unload() {
    // optionally unload assets
    // in most cases calling game.reset() is sufficient
  }

}

export default Tiled;