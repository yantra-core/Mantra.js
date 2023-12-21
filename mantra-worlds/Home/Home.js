class Home {
  static id = 'Home';
  constructor(game) {
    this.game = game; // Store the reference to the game logic
    this.id = Home.id;
  }

  init(game) {
    this.game = game;
    this.createWorld();
  }

  createWorld() {

    let game = this.game;

    game.setGravity(0, 9.8, 0);

    game.use('Home');


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
      isStatic: true,
      width: 300,
      height: 300,
      position: {
        x: 0,
        y: -300
      }
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

export default Home;