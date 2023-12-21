class Sutra {
  static id = 'Sutra';
  constructor(game) {
    this.game = game; // Store the reference to the game logic
    this.id = Sutra.id;
  }

  init(game) {
    this.game = game;
    this.createWorld();
  }

  createWorld() {

    let game = this.game;

    game.use('Bullet')

    game.use('CurrentFPS');

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

    game.systems.graphics.switchGraphics('BabylonGraphics', function(){
      game.data.roundEnded = false;
      game.data.roundStarted = true;
      game.createDefaultPlayer();
    });


  }

  update() {
  }

  render() { }

  destroy() { }

}

export default Sutra;