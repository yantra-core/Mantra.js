import MovementStrategy from "./MovementStrategy.js";

class PongMovementStrategy {
  constructor() { }

  init(game) {
    this.game = game;
  }

  update(entityId, dx, dy) {
    const player = this.game.bodyMap[entityId];
    if (!player) return;

    const MOVE_SPEED = 1; // This determines how fast the paddle moves, adjust as needed

    // Use dx and dy to set the movement direction
    let moveDirectionX = dx; // -1 for left, 1 for right, 0 for stationary
    let moveDirectionY = dy; // -1 for up, 1 for down, 0 for stationary

    // If there is any movement, update the entity's state
    if (moveDirectionX !== 0 || moveDirectionY !== 0) {
      let velocity = {
        x: MOVE_SPEED * moveDirectionY,
        y: MOVE_SPEED * moveDirectionX
      };

      // Assuming this.game.physics.Body.setVelocity() is the correct method
      // to update the player's velocity in your physics engine.
      this.game.physics.Body.setVelocity(player, velocity);

    }
  }
}

export default PongMovementStrategy;
