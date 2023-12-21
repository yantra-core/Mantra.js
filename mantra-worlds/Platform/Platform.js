class Platform {
  static id = 'Platform';
  constructor(game) {
    this.game = game; // Store the reference to the game logic
    this.id = Platform.id;
  }

  init(game) {
    this.game = game;
    this.createWorld();
  }

  createWorld() {

    let game = this.game;

    game.setGravity(0, 9.8, 0);

    game.use('Platform');

    // TODO:     game.on('game::ready', function () {
    //           needs secound ready emit after plugins are loaded after start
    game.on('plugin::ready::Platform', function () {
      console.log(game.systems.platform.kinds)
      game.createEntity({
        type: 'PLATFORM',
        isStatic: true,
        width: 700,
        height: 40,
        position: {
          x: 0,
          y: 300
        }
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