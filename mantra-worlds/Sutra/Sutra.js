class Sutra {
  static id = 'world-sutra';
  static type = 'world'; // type is optional for Plugins
  constructor(game) {
    this.game = game; // Store the reference to the game logic
    this.id = Sutra.id;
    this.type = Sutra.type;
  }

  init(game) {
    this.game = game;
    this.createWorld();
  }

  createWorld() {

    let game = this.game;

    game.setGravity(0, 0, 0);

    // TODO: set default zoom to 0.3 ( zoomed out )
    game.zoom(0.3);
    game.use('Bullet')
    game.use('Timers');
    game.use('Health');
    game.use('Sutra');

    /*
    // game.use(new Plugins.SutraGUI({ }));
    game.use('Editor', {
      sourceCode: 'https://github.com/yantra-core/mantra/blob/master/mantra-client/public/examples/offline/sutra-level-editor.html',
      sutraEditor: true
    });
    */

    game.use('Block', { MIN_BLOCK_SIZE: 1000 });
    game.use('Border', { autoBorder: true, thickness: 200 });

    // Adds a nice StarField background
    game.use('StarField');
    game.use('TowerWorld', { game: game });

    game.data.roundEnded = false;
    game.data.roundStarted = true;
    game.createDefaultPlayer();

    /*
    game.systems.graphics.switchGraphics('BabylonGraphics', function(){
    });
    */

  }

  update() {
  }

  render() { }

  destroy() { }

}

export default Sutra;