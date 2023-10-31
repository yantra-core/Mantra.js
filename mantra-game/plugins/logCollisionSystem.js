class LogCollisionsSystem {
  constructor(gameLogic) {
    this.gameLogic = gameLogic; // Store the reference to the game logic
    this.name = 'LogCollisionsSystem';
  }

  collision(entityIdA, entityIdB) {
    console.log(`LogCollisionsSystem: Entity ${entityIdA} collided with Entity ${entityIdB}`);
    // Any additional collision logic specific to this system
  }
}

export default LogCollisionsSystem;
