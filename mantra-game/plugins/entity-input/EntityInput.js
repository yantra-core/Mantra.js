// EntityInput.js - Marak Squires 2023
import Plugin from '../../Plugin.js';
import DefaultInputStrategy from './strategies/2D/DefaultInputStrategy.js';
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
    // TODO: do we need to scope this for multiple input systems?
    // the issue is we will want multiple systems for different types of input
    // this will allow composite input systems / control interfaces
    // think a HUD / options menu separate from the game controls
    // in that case, we need a pipeline of input systems, same as graphics
    // is this a common pattern? of pipelines? do we add another ad-hoc pipeline?
    this.game.systemsManager.addSystem('entityInput', this);
  }

  handleInputs(entityId, controls, sequenceNumber) {

    if (this.strategies.length === 0) {
      console.log('Warning: No input strategies registered, using default input strategy');
      this.game.use(new DefaultInputStrategy())
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
