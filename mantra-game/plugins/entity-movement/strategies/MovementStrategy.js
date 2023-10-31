class MovementStrategy {
  constructor(gameLogic) {
    this.gameLogic = gameLogic;
  }
  update(entityId, dx, dy) {
    // Default behavior
    throw new Error('update must be  implemented');
  }
}

export default MovementStrategy;