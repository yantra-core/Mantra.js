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
    this.createWorld();
  }

  createWorld() {

    let game = this.game;

    game.setGravity(0, 3.3, 0);

    game.use('Platform');

    function createPlatform(platformData) {
      game.createEntity({
        type: 'PLATFORM',
        isStatic: true,
        width: platformData.width,
        height: platformData.height,
        color: platformData.color,
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
      z: -1,
      width: 850,
      height: 60
    });


    createPlatform({
      x: 925,
      y: 0,
      z: -1,
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


    game.use('Sutra')

    game.once('plugin::loaded::sutra', function(){


      let rules = game.createSutra();
      rules.addCondition('isTile', (entity) => entity.type === 'BLOCK');
  
      game.setSutra(rules);

      rules.on('switchWorld', (entity) => {
        game.switchWorlds('Music');
        console.log('switchWorld', entity)
      });

      rules.addCondition('playerTouchedWarpZone', (entity, gameState) => {
        if (entity.type === 'COLLISION') {
          // console.log('spawnUnitTouchedHomebase', entity)
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

      console.log('created sutra', rules)
    });

    game.createEntity({
      type: 'WARP',
      width: 64,
      height: 64,
      isStatic: true,
      position: {
        x: -300,
        y: 0
      }
    })
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

    game.use('Border', { autoBorder: true })
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

    console.log(game.systems)

    game.createDefaultPlayer({
      position: {
        x: 10,
        y: -100
      }
    });


    let itemsList = ['arrow', 'sword', 'lantern', 'fire', 'bomb'];

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
    })


  }

  update() {
  }

  render() { }

  destroy() { }

}

export default Platform;