// EntityInput.js - Marak Squires 2023
import Plugin from '../../Plugin.js';
import DefaultInputStrategy from './strategies/2D/Default2DInputStrategy.js';
import Default3DInputStrategy from './strategies/3D/Default3DInputStrategy.js';
class EntityInputPlugin extends Plugin {
  constructor(strategy) {
    super();
    this.name = 'EntityInputPlugin';
    this.bulletCooldown = 20;
    this.buttonCooldown = 20;
    this.lastBulletFireTime = {};
    this.useMouseControls = false;

    this.strategies = [];

  }

  init(game) {
    console.log('EntityInputPlugin.init()');
    this.game = game;
    this.game.systemsManager.addSystem('entityInput', this);
  }

  handleInputs(entityId, controls, sequenceNumber) {

    if (this.strategies.length === 0) {
      console.log('Warning: No input strategies registered, using default input strategy');
      if (this.game.physics && this.game.physics.dimension === 3) {
        this.game.use(new Default3DInputStrategy())

      } else {
        this.game.use(new DefaultInputStrategy())
      }
    }

    this.strategies.forEach(function(strategy) {
      strategy.handleInputs(entityId, controls, sequenceNumber);
    });
  }

  update() { }

  render() { }

  destroy() { }
}

export default EntityInputPlugin;
