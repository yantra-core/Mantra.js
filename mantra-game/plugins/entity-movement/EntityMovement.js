// EntityMovement.js - Marak Squires 2023
import Plugin from '../../Plugin.js';
import DefaultMovementStrategy from './strategies/DefaultMovement.js';

// TODO 3d default
import Asteroids3DMovementStrategy from './strategies/3D/Asteroids3DMovement.js';
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

      if (this.game.physics.dimension === 3) {
        this.game.use(new Asteroids3DMovementStrategy())
      } else {
        this.game.use(new DefaultMovementStrategy())
      }

    }

    this.strategies.forEach(function(strategy) {
      strategy.update(entityId, x, y, z); // rename to handleInputs? handleMovement?
    });

  }

  rotate (entityId, x, y, z) {

    if (this.strategies.length === 0) {
      console.log('Warning: No movement strategies registered, using default movement strategy');

      if (this.game.physics.dimension === 3) {
        this.game.use(new Asteroids3DMovementStrategy())
      } else {
        this.game.use(new DefaultMovementStrategy())
      }

    }

    this.strategies.forEach(function(strategy) {
      strategy.rotate(entityId, x, y, z); // rename to handleInputs? handleMovement?
    });

  }

  render() { }

  destroy() { }

}

export default EntityMovementPlugin;