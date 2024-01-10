import demon from "../../mantra-sutras/demon.js";
import hexapod from "../../mantra-sutras/hexapod.js";
import note from "../../mantra-sutras/note.js";
import fire from "../../mantra-sutras/fire.js";
//import langtonsLoop from "../../mantra-sutras/langston-loop.js";
import gameOfLife from "../../mantra-sutras/game-of-life.js";

let agama = {
  demon,
  hexapod,
  note,
  fire,
  gameOfLife
};

class Sutra {
  static id = 'world-sutra';
  static type = 'world'; // type is optional for Plugins
  constructor(game) {
    this.game = game; // Store the reference to the game logic
    this.id = Sutra.id;
    this.type = Sutra.type;
    this.demoInterval = null;
  }

  init(game) {
    this.game = game;
    // alert('hi')
    this.createWorld();
  }

  createWorld() {

    let game = this.game;
    let that = this;

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
    //createPlayPauseButton();

    function createPlayPauseButton() {
      game.createEntity({
        name: 'play-pause-button',
        type: 'BUTTON',
        body: false,
        text: 'play',
        width: 25,
        height: 25,
        position: {
          x: -100,
          y: 50
        },
        style: {
          fontSize: 30,
          color: '#ffffff'
        },
        /*
        onClick: function () {
          if (game.data.roundEnded) {
            game.data.roundEnded = false;
            game.data.roundStarted = true;
            game.setSutra(hexapod(game));
          } else {
            game.data.roundEnded = true;
            game.data.roundStarted = false;
          }
        }
        */
      });
    }

    function writeSutraLabel(sutraName) {
      // text label for Sutra name
      game.createEntity({
        name: 'sutra-label',
        type: 'TEXT',
        body: false,
        text: sutraName,
        position: {
          x: -100,
          y: 0
        },
        style: {
          fontSize: 30,
          color: '#ffffff'
        }
      });
    }

    function updateSutraLabel(sutraName) {
      game.updateEntity({
        name: 'sutra-label',
        text: sutraName
      })
    }

    writeSutraLabel('hexapod');
    function demoSutras() {
      // set interval to iterate through agama
      let agamaKeys = Object.keys(agama);
      let agamaIndex = 0;

      that.demoInterval = setInterval(() => {
        let agamaKey = agamaKeys[agamaIndex];
        let agamaSutra = agama[agamaKey];
        // removes all entities except our sutra-label and play-pause-button
        // TODO: containers
        game.removeAllEntities({
          excludeByName: ['sutra-label', 'play-pause-button']
        });
        updateSutraLabel(agamaKey);
        // writeSutraLabel(agamaKey);
        game.setSutra(agamaSutra(game));

        // Increment the index and reset if it reaches the end of the array
        agamaIndex = (agamaIndex + 1) % agamaKeys.length;
      }, 3300);
    
    }
    demoSutras();

  }

  update() {
  }

  render() { }

  destroy() { }

  unload () {
    // clear the interval
    if (this.demoSutras) {
      clearInterval(this.demoSutras);
    }
  }

}

export default Sutra;