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
    this.controlMappings = game.controls || {};
    this.game.systemsManager.addSystem('entity-input', this);
  }

  // Remark: 1/17/24 - Previous API relied on loadDefaultStrategy() in order to establish the default input strategy
  //                   This logic has been moved to loadPluginsFromConfig.js file
  //                   We also are now using Sutra movements as the default input strategy
  //                   The Default2DInputStrategy can still be used as an explicit input strategy
  //                    
  loadDefaultStrategy() {
    console.log('Warning: No input strategies registered, using default input strategy');
    console.log('Current Game.controls', this.game.controls)
    if (this.game.physics && this.game.physics.dimension === 3) {
      //console.log('game.use(new Default3DInputStrategy())');
      // TODO: add this to the physix demo as default plugin
      this.game.use(new Default3DInputStrategy())
    } else {
      //console.log('game.use(new DefaultInputStrategy())');
      this.game.use(new DefaultInputStrategy())
    }
    if (this.game.controls) {
      // update the controls based on developer usage
      this.game.setControls(this.game.controls);
    }
    this.game.emit('inputStrategyRegistered', this.strategies)
  }

  setInputsActive() {
    this.inputsActive = true;
  }

  disableInputs() {
    this.inputsActive = false;
  }

  handleInputs(entityId, input, sequenceNumber) {
    if (!this.inputsActive) {
      return;
    }

    let controls = input.controls;

    if (this.game.customInput !== false) {

      this.strategies.forEach(function (strategy) {
        strategy.handleInputs(entityId, input, sequenceNumber);
      });

      if (typeof controls !== 'undefined') {
        // TODO: remove excessive calls to getEntity
        let ent = this.game.getEntity(entityId);
        let actions = Object.keys(controls).filter(key => controls[key]).map(key => this.controlMappings[key]);
        actions.forEach(action => {
          if (typeof action === 'function') {
            action(ent, game);
          }
          if (this.game.rules && typeof action === 'string') {
            this.game.rules.emit(action, ent, {
              note: 'node data not available. emitted from entityInput::handleInputs directly from control mapping. this is most likely a result of game.setControls() being called.'
            }, this.game.data);
          }
        });
      }

    }

    if (this.game.rules) {
      // not needed? As Sutra plugin will use game.systems.sutra.inputCache?
      // this.game.rules.emit('entityInput::handleInputs', entityId, input, sequenceNumber);
    }

    // always emit the entityInput::handleInputs event
    this.game.emit('entityInput::handleInputs', entityId, input, sequenceNumber);

  }

  update() { }

  render() { }

  destroy() { }

  unload() {
  }

}

export default EntityInput;
