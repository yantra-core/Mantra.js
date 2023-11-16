// DefaultMovementStrategy.js - Marak Squires 2023
class DefaultMovementStrategy {
  static id = 'default-movement-strategy';
  constructor() {
    this.id = DefaultMovementStrategy.id;
  }

  init(game) {
    this.game = game;

    // check to see if entityMovement system exists, if not throw error
    if (!game.systems['entity-movement']) {
      throw new Error('DefaultMovementStrategy requires an entityMovement system to be registered! Please game.use(new EntityMovement())');
    }

    game.systems['entity-movement'].strategies.push(this);

  }
  update(entityId, dx, dy, rotation) {
    if (!entityId) {
      return;
    }

    const position = this.game.getComponent(entityId, 'position');
    if (position) {
      const forceFactor = 0.05;
      const force = { x: dx * forceFactor, y: -dy * forceFactor };
      const body = this.game.bodyMap[entityId];
      this.game.physics.applyForce(body, body.position, force);
      this.game.components.velocity[entityId] = { x: body.velocity.x, y: body.velocity.y };
    }

    if (typeof rotation === 'number') {
      const rotationSpeed = 0.022;
      let rotationAmount = rotation * rotationSpeed;
      const body = this.game.bodyMap[entityId];
      this.game.physics.rotateBody(body, rotationAmount);

    }

  }
}

export default DefaultMovementStrategy;