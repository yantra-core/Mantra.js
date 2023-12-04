// AsteroidsMovement.js - Marak Squires 2023
class AsteroidsMovementStrategy {
  static id = 'asteroids-movement';
  constructor() {}

  init(game) {
    this.game = game;
    this.id = AsteroidsMovementStrategy.id;
    // check to see if entityInput system exists, if not throw error
    if (!game.systems['entity-movement']) {
      throw new Error('AsteroidsMovementStrategy requires an entityMovement system to be registered! Please game.use(new EntityMovement())');
    }

    game.systems['entity-movement'].strategies.push(this);


  }

  update(entityId, dx, dy) {
    const body = this.game.bodyMap[entityId];
    if (!body) return;

    if (dx !== 0) { // Rotation
      const rotationSpeed = 0.022;
      this.game.physics.Body.rotate(body, dx * rotationSpeed, body.position);
    }

    let bodyPosition = this.game.physics.getBodyPosition(body);
    let bodyRotation = this.game.physics.getBodyRotation(body);

    if (dy !== 0) { // Thrust
      const thrust = 0.05;
      let angle = bodyRotation;

      // Adjusts for 3D space, remove this for 2d asteroids movements
      if (typeof bodyRotation.x !== 'undefined') {
        angle = bodyRotation.x;
      }

      if (typeof angle === 'undefined') {
        console.log("WARNING - rotation angle is undefined", entityId, bodyRotation)
        angle = 0; // for now
      }

      // Assuming angle = 0 is upwards, and increases in the clockwise direction
      const force = {
        x: Math.sin(angle) * dy * thrust,
        y: -Math.cos(angle) * dy * thrust,
        z: 0
      };

      this.game.physics.Body.applyForce(body, bodyPosition, force);
    }
  }
}

export default AsteroidsMovementStrategy;