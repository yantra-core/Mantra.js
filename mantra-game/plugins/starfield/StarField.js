// TODO: add starfields for other graphics engines
import BabylonStarField from "./BabylonStarField.js";
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

    game.graphics.forEach(function(graphicInterface){
      if (graphicInterface.id === 'graphics-babylon') { // hard-code per graphics pipeline for now
        game.use(new BabylonStarField());
      }
    })

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
