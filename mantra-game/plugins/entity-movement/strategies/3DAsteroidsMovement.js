// TODO: WIP - This is a work in progress, not yet functional
// 3DAsteroidsMovement.js - Marak Squires 2023
import MovementStrategy from "./MovementStrategy.js";

class AsteroidsMovementStrategy extends MovementStrategy {
  constructor() {
    super();
    // Define rotation speeds for each axis
    this.rotationSpeeds = {
      x: 0.022, // pitch
      y: 0.022, // yaw
      z: 0.022  // roll
    };
    // Define thrust for movement
    this.thrust = 0.05 * 1000;
  }

  init(game) {
    this.game = game;
  }

  update(entityId, dx, dy, dz) {
    const body = this.game.bodyMap[entityId];
    if (!body) return;

    // Handle rotation (yaw)
    if (dx !== 0) {
      this.game.physics.Body.rotate(body, dx * this.rotationSpeeds.y, body.position);
    }

    // Handle rotation (pitch and roll) if needed here as well...

    let bodyPosition = this.game.physics.getBodyPosition(body);
    let bodyRotation = this.game.physics.getBodyRotation(body);

    // Movement (thrust in direction of current facing)
    // Assuming the body faces towards the positive y-axis when angle is 0
    const force = {
      x: Math.sin(bodyRotation.y) * dy * this.thrust,
      y: -Math.cos(bodyRotation.y) * dy * this.thrust,
      z: dz * this.thrust // For moving up or down in the z-axis
    };

    this.game.physics.Body.applyForce(body, bodyPosition, force);

    // Handle rotations (pitch, roll)
    // You'll need to modify the Body.rotate function to support rotating about x and z axes
    if (dx !== 0) { // Rotate about x-axis (pitch)
      // You'll need a way to rotate the body about its local x-axis
    }
    if (dz !== 0) { // Rotate about z-axis (roll)
      // You'll need a way to rotate the body about its local z-axis
    }
  }
}

export default AsteroidsMovementStrategy;
