import MovementStrategy from "./MovementStrategy.js";

class AsteroidsMovementStrategy {
  constructor() {
  }

  init (game) {
    this.game = game;
  }
  update(entityId, dx, dy) {
    const body = this.game.bodyMap[entityId];
    if (!body) return;


    if (dx !== 0) { // Rotation
      const rotationSpeed = 0.022;
      this.game.physics.Body.rotate(body, dx * rotationSpeed, body.position);
    }
    if (dy !== 0) { // Thrust
      const thrust = 0.05;
      const angle = body.angle;
      const force = {
        x: Math.sin(angle) * dy * thrust,
        y: -Math.cos(angle) * dy * thrust
      };
      this.game.physics.Body.applyForce(body, body.position, force);
      // this.game.components.velocity[entityId] = { x: body.velocity.x, y: body.velocity.y };
    }
  }
}

export default AsteroidsMovementStrategy;