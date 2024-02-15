// Physics.js - Marak Squires 2024
// Generic Math-Only Physics, designed to be used in-code without Physics engine
export default class Physics {

  static id = 'physics';
  static removable = false;

  constructor(config) {
    this.id = Physics.id;
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

  applyGravity(ent1, ent2, gravity, repulsion = false) {

    if (!ent1 || !ent2) {
      return;
    }

    let Vector = this.Vector;

    console.log('e1e2', ent1, ent2)

    var distance = Vector.sub(ent2.position, ent1.position);
    var magnitude = Vector.magnitude(distance);
  
    if (magnitude < 0.5) {  // This prevents extreme forces at very close distances
      return;
    }
  
    distance = Vector.normalize(distance);
    var force = gravity * ent1.mass * ent2.mass / (magnitude * magnitude);
    var maxForce = 1;  // Prevents excessively large forces
    force = Math.min(force, maxForce);
  
    let sign = repulsion ? 1 : -1;

    game.applyForce(ent2.id, {
      x: sign * distance.x * force,
      y: sign * distance.y * force
    });
  }

}