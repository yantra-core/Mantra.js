// TODO: add starfields for other graphics engines
import BabylonStarField from "./BabylonStarField.js";
import CSSStarField from "./CSSStarField.js";
class StarField {

  static id = 'starfield';
  static removable = false;

  constructor(starCount = 5000, fieldSize = 10000) { // TODO: pass this to individual graphics plugins as options
    this.id = StarField.id;
    this.starCount = starCount;
    this.fieldSize = fieldSize;
    this.particles = [];
  }

  init (game, engine, scene) {
    this.game = game;
    this.engine = engine;
    this.scene = scene;

    function loadStarfields () {
      // for now, we will mutually exclusive lock starfield to one graphics engine
      // TODO: implement pattern for branching plugins that can delegate to other plugins
      // For example: game.use('StarField') -> game.use('BabylonStarField-') -> game.use('PhaserStarField')
      // This pattern will be useful for creating global high level APIs that can be implemented by multiple plugins
      if (game.graphics.length === 0) {
        console.log('no graphics plugins loaded, trying again');
        setTimeout(loadStarfields, 10);
        return;
      }
      game.graphics.forEach(function(graphicInterface){
        if (graphicInterface.id === 'graphics-babylon') { // hard-code per graphics pipeline for now
          game.use(new BabylonStarField());
        }
        // for now, current CSS StarField is fully intefactive
        // we'll need to optimize the CSS entity rendering just a bit for this to work 
        // more performantly with a large number of stars
        if (graphicInterface.id === 'graphics-css') { // hard-code per graphics pipeline for now
          game.use(new CSSStarField());
        }
      });
    }

    loadStarfields();

  }

  unload () {
    // removes the babylon starfield from the scene
    /*
    game.graphics.forEach(function(graphicInterface){
      if (graphicInterface.id === 'graphics-babylon') { // hard-code per graphics pipeline for now
      }
    });
    */
  }

}

export default StarField;