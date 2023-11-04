// EntityMovement.js - Marak Squires 2023
import Plugin from '../../Plugin.js';
import DefaultMovementStrategy from './strategies/DefaultMovement.js';

// handles input controller events and relays them to the game logic
class EntityMovementPlugin extends Plugin {
  constructor(strategy) {
    super();
    this.name = 'EntityMovementPlugin';
    this.strategies = [];
  }

  init(game) {
    this.game = game; // Store the reference to the game logic
    this.game.systemsManager.addSystem('entityMovement', this);
  }

  update(entityId, x, y, z) {

    if (this.strategies.length === 0) {
      console.log('Warning: No movement strategies registered, using default movement strategy');
      this.game.use(new DefaultMovementStrategy())
    }

    this.strategies.forEach(function(strategy) {
      strategy.update(entityId, x, y, z); // rename to handleInputs? handleMovement?
    });

  }

  render() { }

  destroy() { }

}

export default EntityMovementPlugin;