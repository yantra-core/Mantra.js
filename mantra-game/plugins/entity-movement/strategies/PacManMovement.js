// PacManMovement.js
import MovementStrategy from "./MovementStrategy.js";

class PacManMovementStrategy {
  constructor() {}

  init(game) {
    this.game = game;
  }

  update(entityId, dx, dy) {
    const entity = this.game.bodyMap[entityId];
    if (!entity) return;

    const MOVE_SPEED = 0.5; // Adjust as needed

    // Pac-Man moves in straight lines either horizontally or vertically
    let velocity = {
      x: MOVE_SPEED * dx,
      y: -MOVE_SPEED * dy
    };

    // Update the entity's velocity
    this.game.physics.Body.setVelocity(entity, velocity);
  }
}

export default PacManMovementStrategy;
