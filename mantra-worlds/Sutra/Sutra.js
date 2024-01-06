import demon from "../../mantra-sutras/demon.js";
import hexapod from "../../mantra-sutras/hexapod.js";
import note from "../../mantra-sutras/note.js";
import fire from "../../mantra-sutras/fire.js";

let agama = {
  demon,
  hexapod,
  note,
  fire
};

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
    // alert('hi')
    this.createWorld();
  }

  createWorld() {

    let game = this.game;

    game.setGravity(0, 0, 0);

    // TODO: set default zoom to 0.3 ( zoomed out )
    game.zoom(0.3);
    game.use('Bullet')
    //    game.use('Timers');
    game.use('Tone');
    game.use('Health');
    console.log('hexapod', hexapod)
    /*
    // game.use(new Plugins.SutraGUI({ }));
    game.use('Editor', {
      sourceCode: 'https://github.com/yantra-core/mantra/blob/master/mantra-client/public/examples/offline/sutra-level-editor.html',
      sutraEditor: true
    });
    */

    game.use('Block', { MIN_BLOCK_SIZE: 1000 });
    game.use('Border', { autoBorder: true, thickness: 200 });
    game.setSutra(hexapod(game));
    game.data.roundEnded = false;
    game.data.roundStarted = true;
    game.createDefaultPlayer();

    function writeSutraLabel(sutraName) {
      // text label for Sutra name
      game.createEntity({
        type: 'TEXT',
        body: false,
        text: sutraName,
        position: {
          x: 0,
          y: 0
        },
        style: {
          fontSize: 30,
          color: '#ffffff'
        }
      });
    }

    writeSutraLabel('hexapod');

    // set interval to iterate through agama
    setInterval(() => {
      let agamaKeys = Object.keys(agama);
      let agamaIndex = Math.floor(Math.random() * agamaKeys.length);
      let agamaKey = agamaKeys[agamaIndex];
      let agamaSutra = agama[agamaKey];
      game.removeAllEntities();
      writeSutraLabel(agamaKey);
      game.setSutra(agamaSutra(game));
    }, 2000);
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