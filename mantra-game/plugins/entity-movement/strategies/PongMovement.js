// PongMovement.js - Marak Squires 2023
class PongMovementStrategy {
  static id = 'pong-movement';
  constructor() {
    this.id = PongMovementStrategy.id;
  }

  init(game) {
    this.game = game;
    
    // check to see if entityMovement system exists, if not throw error
    if (!game.systems['entity-movement']) {
      throw new Error('PongMovementStrategy requires an entityMovement system to be registered! Please game.use(new EntityMovement())');
    }

    game.systemsManager.addSystem(this.id, this);
    game.systems['entity-movement'].strategies.push(this);

  }

  update(entityId, dx, dy) {
    const player = this.game.bodyMap[entityId];
    if (!player) return;

    const MOVE_SPEED = 1; // This determines how fast the paddle moves, adjust as needed

    // Use dx and dy to set the movement direction
    let moveDirectionX = dx; // -1 for left, 1 for right, 0 for stationary
    let moveDirectionY = dy; // -1 for up, 1 for down, 0 for stationary

    // If there is any movement, update the entity's state
    if (moveDirectionX !== 0 || moveDirectionY !== 0) {
      let velocity = {
        x: 0, // in pong we only move on the Y axis
        y: -MOVE_SPEED * moveDirectionY // invert the Y axis to match the game's coordinate system
      };

      // Assuming this.game.physics.Body.setVelocity() is the correct method
      // to update the player's velocity in your physics engine.
      this.game.physics.Body.setVelocity(player, velocity);

    }
  }

  unload () {
    let self = this;
    // removes self from the entityMovement system
    game.systems['entity-movement'].strategies = game.systems['entity-movement'].strategies.filter(function(strategy){
      return strategy.id !== self.id;
    });
  }
}

export default PongMovementStrategy;
