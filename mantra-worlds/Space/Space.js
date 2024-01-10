class Space {
  static id = 'world-space';
  static type = 'world'; // type is optional for Plugins
  constructor(game) {
    this.game = game; // Store the reference to the game logic
    this.id = Space.id;
    this.type = Space.type;
  }

  init(game) {
    this.game = game;
    this.createWorld();
  }

  createWorld() {

    let game = this.game;

    // Adds projectile Bullets to the game
    game.use('Bullet')

    // add / remove entitymovement
    // game.systems['entity-movement'].unload();
    game.systemsManager.removeSystem('entity-input');

    game.systemsManager.removeSystem('entity-movement');

    // TODO: Game.setPhysics('PhysXPhysics')
    game.use('PhysXPhysics')

    game.use('EntityInput');
    game.use('EntityMovement');

    // Adds destructible Blocks to the game
    game.use('Block');

    game.use('Editor', {
      sourceCode: 'https://github.com/yantra-core/mantra/blob/master/mantra-client/public/examples/offline/physx-babylon.html'
    });

    // TODO: Game.setGraphics('BabylonGraphics')
    game.systems.graphics.switchGraphics('BabylonGraphics', function () {

      // Creates a single Block, since we have used Block plugin, this will be a destructible Block
      game.createEntity({
        type: 'BLOCK',
        width: 500,
        height: 500,
        depth: 200,
        position: {
          x: 0,
          y: -500
        },
      });


      game.use('Border', { autoBorder: true });
      game.use('StarField');


      game.createDefaultPlayer();
    });


  }

  update() {
  }

  render() { }

  destroy() { }

}

export default Space;