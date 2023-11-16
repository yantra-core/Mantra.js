// PacManMovement.js - Marak Squires 2023
class PacManMovement {

  static id = 'pacman-movement';
  
  constructor() {
    this.id = PacManMovement.id;
  }

  init(game) {
    this.game = game;


    // check to see if entityMovement system exists, if not throw error
    if (!game.systems.entityMovement) {
      throw new Error('PacManMovementStrategy requires an entityMovement system to be registered! Please game.use(new EntityMovement())');
    }

    game.systems.entityMovement.addStrategy(this);

  }

  update(entityId, dx, dy) {
    const entity = this.game.bodyMap[entityId];

    // ensure the friction of the entity is set to 0

    if (!entity) return;

    const MOVE_SPEED = 0.5; // Adjust as needed

    // Pac-Man moves in straight lines either horizontally or vertically
    let velocity = {
      x: MOVE_SPEED * dx,
      y: -MOVE_SPEED * dy
    };

    // Update the entity's velocity
    this.game.physics.Body.setVelocity(entity, velocity);
  }
}

export default PacManMovement;
