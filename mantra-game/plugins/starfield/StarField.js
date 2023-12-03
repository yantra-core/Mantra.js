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

    // delegate to each Graphics system if available
    // TODO: the following pattern represents plugin dependencies, but is hard-coded to this single plugin ( for now )
    // In the near future, we will need to create a simple plugin dependency graph and queue / load plugins in the correct order
    if (game.graphicsReady.length > 0 && game.graphicsReady.length === game.graphics.length) {
      // Since the graphics are ready, we can initialize this plugin immediately
      game.graphics.forEach(function(graphicInterface){
        if (graphicInterface.id === 'graphics-babylon') { // hard-code per graphics pipeline for now
          game.use(new BabylonStarField());
        }
      })
    } else {
      // since the graphics are not yet ready, we add the plugin instance to the pendingLoad queue
      // once the graphics reports read, the array of pendingLoad plugins will be initialized
      game.graphics.forEach(function(graphicInterface){
        if (graphicInterface.id === 'graphics-babylon') { // hard-code per graphics pipeline for now
          graphicInterface.pendingLoad.push(new BabylonStarField());
        }
      })
    }

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
