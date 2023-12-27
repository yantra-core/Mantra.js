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

    // TODO: this.game.applyForce(), instead of this.game.physics.applyForce()
    const position = this.game.getComponent(entityId, 'position');
    if (position) {
      const forceFactor = 0.5;
      const force = { x: dx * forceFactor, y: -dy * forceFactor };
      const body = this.game.bodyMap[entityId];
      this.game.physics.applyForce(body, body.position, force);
      this.game.components.velocity[entityId] = { x: body.velocity.x, y: body.velocity.y };
    }

    // TODO: this.game.rotateBody()
    if (typeof rotation === 'number') {
      
      // assume rotation here means LEFT or RIGHT facing absolute
      // -1 value means face left
      // 1 value means face right
      // 0 means no rotation
      let degrees = 0;
      if (rotation === -1) {
        degrees = 180;
      } else if (rotation === 1) {
        degrees = 0;
      }
      let radians = degrees * (Math.PI / 180);

      // console.log('radians', radians)
      //this.game.physics.setRotation(this.game.bodyMap[entityId], radians);

      /*
      const rotationSpeed = 0.022;
      let rotationAmount = rotation * rotationSpeed;
      const body = this.game.bodyMap[entityId];
      console.log("WTF", body, rotationAmount)
      this.game.physics.rotateBody(body, rotationAmount);
      */


    }

  }
}

export default DefaultMovementStrategy;