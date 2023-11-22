// 3DAsteroidsMovement.js - Marak Squires 2023

class AsteroidsMovementStrategy {

  static id = '3d-asteroids-movement';

  constructor() {
    // Define rotation speeds for each axis
    this.rotationSpeeds = {
      x: 0.022, // pitch
      y: 0.022, // yaw
      z: 0.022  // roll
    };
    // Define thrust for movement
    this.thrust = 0.05 * 1000;
    this.id = AsteroidsMovementStrategy.id;
  }

  init(game) {
    this.game = game;

    // check to see if entityMovement system exists, if not throw error
    if (!game.systems['entity-movement']) {
      throw new Error('AsteroidsMovementStrategy requires an entityMovement system to be registered! Please game.use(new EntityMovement())');
    }

    game.systems['entity-movement'].strategies.push(this);
  }

  getForwardDirection(body) {
    let bodyRotation = this.game.physics.getBodyRotation(body);  // Assume getBodyRotation is a method in your entityMovement system

    // Assuming the body faces towards the negative y-axis when pitch, yaw, and roll are 0
    return {
      x: Math.sin(bodyRotation.y) * Math.cos(bodyRotation.x),
      y: -Math.cos(bodyRotation.y) * Math.cos(bodyRotation.x),
      z: Math.sin(bodyRotation.x)
    };
  }

  rotate(entityId, pitchDelta, yawDelta, rollDelta) {
    const body = this.game.bodyMap[entityId];
    if (!body) return;

    console.log('performing rotation', pitchDelta, yawDelta, rollDelta)

    // Rotate around the x-axis for pitch
    if (pitchDelta !== 0) {
      this.game.physics.rotateBody(body, pitchDelta, { x: 1, y: 0, z: 0 });
    }
    // Rotate around the y-axis for yaw
    if (yawDelta !== 0) {
      this.game.physics.rotateBody(body, yawDelta, { x: 0, y: 1, z: 0 });
    }
    // Rotate around the z-axis for roll
    if (rollDelta !== 0) {
      this.game.physics.rotateBody(body, rollDelta, { x: 0, y: 0, z: 1 });
    }
  }


  update(entityId, dx, dy, dz) {
    const body = this.game.bodyMap[entityId];
    if (!body) return;

    console.log('performing movement', entityId, dx, dy, dz)

    let forwardDirection = this.getForwardDirection(body);

    console.log('forwardDirection', forwardDirection)

    // Calculate the force to apply
    // Here dy is used for forward/backward thrust, dx for left/right, and dz for up/down.
    const force = {
      x: forwardDirection.x * dy * this.thrust + dx * this.thrust, // Forward/backward thrust along the forward direction
      y: forwardDirection.y * dy * this.thrust, // Forward/backward thrust along the forward direction
      z: forwardDirection.z * dy * this.thrust + dz * this.thrust // Up/Down thrust along the z-axis
    };

    console.log('force', force)

    let bodyPosition = this.game.physics.getBodyPosition(body);
    this.game.physics.Body.applyForce(body, bodyPosition, force);
  }

}

export default AsteroidsMovementStrategy;
