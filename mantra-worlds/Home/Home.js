class Home {
  static id = 'Home';
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
      width: 300,
      height: 300,
      position: {
        x: 0,
        y: -150
      }
    });

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