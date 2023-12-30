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
        position: {
          x: platformData.x,
          y: platformData.y
        }
      });
    }


    game.use('Sutra')

    game.once('plugin::loaded::sutra', function(){


      let rules = game.createSutra();
      rules.addCondition('isTile', (entity) => entity.type === 'BLOCK');
  
      game.setSutra(rules);
  
      rules.addCondition('playerTouchedWarpZone', (entity, gameState) => {
        if (entity.type === 'COLLISION') {
          // console.log('spawnUnitTouchedHomebase', entity)
          if (entity.bodyA.type === 'PLAYER' && entity.bodyB.type === 'WARP') {
            // console.log('spawnUnitTouchedHomebase', entity, gameState)
            return true;
          }
          if (entity.bodyB.type === 'WARP' && entity.bodyA.type === 'PLAYER') {
            // console.log('spawnUnitTouchedHomebase', entity, gameState)
            return true;
          }
        }
      });

      rules
        .if('playerTouchedWarpZone')
        .then('switchWorld')

      rules.on('switchWorld', (entity) => {
        game.switchWorlds('Music');
        console.log('switchWorld', entity)
      });
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

      createPlatform({
        x: 0,
        y: 200,
        width: 800,
        height: 60
      });

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

  
    });

    game.use('Border', { autoBorder: true })
  
    console.log(game.systems)

    game.createDefaultPlayer();



  }

  update() {
  }

  render() { }

  destroy() { }

}

export default Platform;