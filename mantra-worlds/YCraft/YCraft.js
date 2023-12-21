class YCraft {
  static id = 'YCraft';
  constructor(game) {
    this.game = game; // Store the reference to the game logic
    this.id = YCraft.id;
  }

  init(game) {
    this.game = game;
    this.createWorld();
  }

  createWorld() {

    let game = this.game;


    game.use('YCraft');
    game.use('Editor');
    game.use('YCraftGUI');

    game.start(function () {
    });


    game.systems.graphics.switchGraphics('CSSGraphics', function(){
      game.createDefaultPlayer();

    });

  }

  update() {
  }

  render() { }

  destroy() { }

}

export default YCraft;