// FroggerMovement.js - Marak Squires 2023
class FroggerMovement {
  static id = 'frogger-movement';
  constructor() {}

  init(game) {
    this.game = game;
    this.id = FroggerMovement.id;

    // check to see if entityMovement system exists, if not throw error
    if (!game.systems['entity-movement']) {
      throw new Error('FroggerMovement requires an entity-movement system to be registered! Please game.use(new EntityMovement())');
    }

    game.systems.entityMovement.addStrategy(this);

  }

  update(entityId, dx, dy) {
    const entity = this.game.getEntity(entityId);
    let body = this.game.bodyMap[entityId];
    if (!entity) return;

    const GRID_SIZE = entity.width / 10; // Assuming each step moves by one grid unit

    // Update the position based on input
    let newPosition = {
      x: entity.position.x + dx * GRID_SIZE,
      y: entity.position.y + -dy * GRID_SIZE
    };

    this.game.physics.Body.setPosition(body, newPosition);

  }

}

export default FroggerMovement;