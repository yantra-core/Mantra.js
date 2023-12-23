class Home {
  static id = 'world-home';
  // "world" type has special features in that it can be unloaded and reloaded.
  //  with special rules such as merge, replace, etc.
  //  this is currently used when switching between worlds in the GUI Editor
  //  the default behavior is to unload the world, then load the new world
  static type = 'world'; // type is optional for Plugins
  constructor() {
    this.id = Home.id;
  }

  init(game) {
    this.game = game;
    this.createWorld();
  }

  createWorld() {

    let game = this.game;


    game.setGravity(0, 0, 0);

    game.createEntity({
      type: 'PLATFORM',
      isStatic: true,
      width: 1000,
      height: 40,
      position: {
        x: 0,
        y: 200
      }
    });

    game.createEntity({
      type: 'BLOCK',
      width: 150,
      height: 150,
      position: {
        x: -400,
        y: -150
      }
    });

    game.use('Block')
    game.use('Bullet')
    game.use('Border', { autoBorder: true })
  
    console.log(game.systems)
    game.createDefaultPlayer();

    /*
    game.systems.graphics.switchGraphics('BabylonGraphics', function(){
      game.use('StarField');
      game.createDefaultPlayer();
    });
    */



  }

  update() {
  }

  render() { }

  destroy() { }

}

export default Home;