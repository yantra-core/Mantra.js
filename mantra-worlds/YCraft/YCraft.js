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

    game.setGravity(0, 0, 0);

    game.use('Bullet');

    game.use('YCraft');
//    game.use('YCraftGUI');

    game.use('Editor', {
      sourceCode: 'https://github.com/yantra-core/mantra/blob/master/mantra-worlds/YCraft/YCraft.js',
      sutraEditor: true
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