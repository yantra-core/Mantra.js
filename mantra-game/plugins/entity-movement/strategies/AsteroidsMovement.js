import MovementStrategy from "./MovementStrategy.js";

class AsteroidsMovementStrategy {
  constructor() {}

  init(game) {
    this.game = game;
  }

  update(entityId, dx, dy) {
    const body = this.game.bodyMap[entityId];
    if (!body) return;

    if (dx !== 0) { // Rotation
      const rotationSpeed = 0.022;
      this.game.physics.Body.rotate(body, dx * -rotationSpeed, body.position);
    }

    if (dy !== 0) { // Thrust
      const thrust = 0.05;
      const angle = body.angle;

      // Assuming angle = 0 is upwards, and increases in the clockwise direction
      const force = {
        x: Math.sin(angle) * dy * -thrust,
        y: -Math.cos(angle) * dy * -thrust
      };

      this.game.physics.Body.applyForce(body, body.position, force);
    }
  }
}

export default AsteroidsMovementStrategy;
