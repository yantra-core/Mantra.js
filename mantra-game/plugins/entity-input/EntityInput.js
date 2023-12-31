// EntityInput.js - Marak Squires 2023
import Plugin from '../../Plugin.js';
import DefaultInputStrategy from './strategies/2D/Default2DInputStrategy.js';
import Default3DInputStrategy from './strategies/3D/Default3DInputStrategy.js';
class EntityInput extends Plugin {
  static id = 'entity-input';
  static removable = false;
  constructor(strategy) {
    super();
    this.id = 'entity-input';
    this.bulletCooldown = 20;
    this.buttonCooldown = 20;
    this.lastBulletFireTime = {};
    this.useMouseControls = false;
    this.inputsActive = true;

    // Contains an array of input strategies that are run in order each time handleInputs() is called
    this.strategies = [];

    // Contains an object mapping of all control names registered to the entityInput system
    // These mappings are populated by the input strategies when they are initialized
    // Mappings are currently last in, first out, and will overwrite each other,
    // so the last strategy to register a control mapping will be the one that is used
    this.controlMappings = {};

  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('entity-input', this);
    let self = this;
    this.game.on('start', function(){
      if (self.strategies.length === 0) {
        self.loadDefaultStrategy();
      }
    });
  }

  loadDefaultStrategy() {
    console.log('Warning: No input strategies registered, using default input strategy');
    if (this.game.physics && this.game.physics.dimension === 3) {
      //console.log('game.use(new Default3DInputStrategy())');
      this.game.use(new Default3DInputStrategy())
    } else {
      //console.log('game.use(new DefaultInputStrategy())');
      this.game.use(new DefaultInputStrategy())
    }
    this.game.emit('inputStrategyRegistered', this.strategies)
  }

  setInputsActive () {
    this.inputsActive = true;
  }

  disableInputs () {
    this.inputsActive = false;
  }

  handleInputs(entityId, controls, sequenceNumber) {
    if (!this.inputsActive) {
      return;
    }
    if (this.strategies.length === 0) {
      this.loadDefaultStrategy();
    }

    this.strategies.forEach(function(strategy) {
      strategy.handleInputs(entityId, controls, sequenceNumber);
    });

    this.game.emit('entityInput::handleInputs', entityId, controls, sequenceNumber);

  }

  update() { }

  render() { }

  destroy() { }

  unload () {
  }

}

export default EntityInput;
