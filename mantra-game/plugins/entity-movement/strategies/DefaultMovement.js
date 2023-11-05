// DefaultMovementStrategy.js - Marak Squires 2023
class DefaultMovementStrategy {
  constructor() {
  }

  init(game) {
    this.game = game;

    // check to see if entityMovement system exists, if not throw error
    if (!game.systems.entityMovement) {
      throw new Error('DefaultMovementStrategy requires an entityMovement system to be registered! Please game.use(new EntityMovement())');
    }

    game.systems.entityMovement.strategies.push(this);

  }
  update(entityId, dx, dy) {
    const position = this.game.getComponent(entityId, 'position');
    if (position) {
      const forceFactor = 0.05;
      const force = { x: dx * forceFactor, y: -dy * forceFactor };
      const body = this.game.bodyMap[entityId];
      this.game.physics.applyForce(body, body.position, force);
      this.game.components.velocity[entityId] = { x: body.velocity.x, y: body.velocity.y };
    }
  }
}

export default DefaultMovementStrategy;