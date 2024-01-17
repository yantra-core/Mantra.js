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
  update(entityId, dx, dy) {
    if (!entityId) {
      return;
    }

    // TODO: this.game.applyForce(), instead of this.game.physics.applyForce()
    const position = this.game.getComponent(entityId, 'position');
    const rotation = this.game.getComponent(entityId, 'rotation');
    if (position) {
      const forceFactor = 0.15;
      const force = { x: dx * forceFactor, y: -dy * forceFactor };
      const body = this.game.bodyMap[entityId];
      this.game.physics.applyForce(body, body.position, force);
      this.game.components.velocity[entityId] = { x: body.velocity.x, y: body.velocity.y };
    }

    if (typeof dx === 'number' && typeof dy === 'number') {

      let radians;
      // let radians = Math.atan2(dy, dx);

      if (dx < 0 && dy === 0) {
        // left
        radians = -Math.PI / 2;
      }

      if (dx > 0 && dy === 0) {
        // right
        radians = Math.PI / 2;
      }

      if (dx === 0 && dy < 0) {
        // down
        radians = Math.PI;;
      }

      if (dx === 0 && dy > 0) {
        // up
        radians = 0;
      }

      if (typeof radians !== 'undefined') {
        //let angle = radians * 180 / Math.PI;
        //console.log("angle", angle)
        if (this.game.bodyMap[entityId]) {
          this.game.physics.setRotation(this.game.bodyMap[entityId], radians);
        }
      }
    }

  }
}

export default DefaultMovementStrategy;