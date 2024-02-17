// Physics.js - Marak Squires 2024
// Generic Math-Only Physics, designed to be used in-code without Physics engine
import applyGravity from "./applyGravity.js";
export default class Physics {

  static id = 'physics';
  static removable = false;

  constructor(config) {
    this.id = Physics.id;
    this.applyGravity = applyGravity.bind(this);
  }

  init(game) {
    this.game = game;
    game.systemsManager.addSystem(Physics.id, this);

    // simplified vector math for physics
    this.Vector = {
      add: (v1, v2) => ({ x: v1.x + v2.x, y: v1.y + v2.y }),
      sub: (v1, v2) => ({ x: v1.x - v2.x, y: v1.y - v2.y }),
      mult: (v, factor) => ({ x: v.x * factor, y: v.y * factor }),
      div: (v, factor) => ({ x: v.x / factor, y: v.y / factor }),
      magnitude: (v) => Math.sqrt(v.x * v.x + v.y * v.y),
      normalize: (v) => {
        const mag = this.Vector.magnitude(v);
        return mag > 0 ? this.Vector.div(v, mag) : { x: 0, y: 0 };
      }
    };
  
  }

}