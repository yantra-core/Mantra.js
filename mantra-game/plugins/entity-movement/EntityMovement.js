import Plugin from '../../Plugin.js';
import DefaultMovementStrategy from './strategies/DefaultMovement.js';

// handles input controller events and relays them to the game logic
class EntityMovementPlugin extends Plugin {
  constructor(strategy) {
    super();
    this.name = 'EntityMovementPlugin';
    this.strategy = strategy || new DefaultMovementStrategy();

  }

  init(game) {
    // console.log('EntityMovementPlugin.init()');

    this.game = game; // Store the reference to the game logic
    this.game.systemsManager.addSystem('entityMovement', this);

    this.strategy.init(game);

  }

  update(entityId, x, y) {
    this.strategy.update(entityId, x, y);
  }

  render() { }

  destroy() { }

}

export default EntityMovementPlugin;