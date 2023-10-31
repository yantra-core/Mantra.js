import MovementStrategy from './MovementStrategy.js';

// TODO: fix this for sure
class DefaultMovementStrategy {
  constructor() {
  }

  init(game) {
    this.game = game;
  }
  update(entityId, dx, dy) {
    const position = this.game.getComponent(entityId, 'position');
    if (position) {
      const forceFactor = 0.05;
      const force = { x: dx * forceFactor, y: dy * forceFactor };
      const body = this.game.bodyMap[entityId];
      this.game.physics.applyForceToBody(body, body.position, force);
      this.game.components.velocity[entityId] = { x: body.velocity.x, y: body.velocity.y };
    }
  }
}

export default DefaultMovementStrategy;