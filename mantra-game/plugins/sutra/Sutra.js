// import { createSutra } from '../../../../sutra/index.js';
import { createSutra } from '@yantra-core/sutra';
// handles input controller events and relays them to the game logic
import topdown from '../../lib/Game/defaults/defaultTopdownMovement.js';
import platform from '../../lib/Game/defaults/defaultPlatformMovement.js';

class Sutra {
  static id = 'sutra';
  constructor({ defaultMovement = true } = {}) {
    this.id = Sutra.id;
    this.inputCache = {};
    this.inputTickCount = {};
    this.inputDuration = {};
    this.defaultMovement = defaultMovement;
    this.inputsBound = false;
  }

  init(game) {
    this.game = game;
    this.game.createSutra = createSutra;
    this.game.setSutra = this.setSutra.bind(this);
    this.game.setRules = this.setSutra.bind(this);
    this.game.systemsManager.addSystem(this.id, this);

    let self = this;
    this.game.on('entityInput::handleInputs', (entityId, input) => {
      self.inputCache = input;
    });

    if (typeof game.rules === 'object') { // an instance of Sutra
      // do nothing, rules are already set, we will extend them
    } else {
      // create a new instance of Sutra
      let rules = createSutra(game);
      this.setSutra(rules);
    }
    // Once the game is ready, register the keyboard controls as conditions
    // This allows for game.rules.if('keycode').then('action') style rules
    if (!this.inputsBound) {
      // for each key in game.controls, add a condition that checks if the key is pressed
      // these are currently explicitly bound to the player entity, we may want to make this more generic
      self.bindInputsToSutraConditions();
      self.inputsBound = true;
      if (self.defaultMovement) { // TODO: remove defaultMovement flag?
        this.bindDefaultMovementSutra(self.game.config.mode)
      }
    }

  }

  bindDefaultMovementSutra(mode = 'topdown') {
    if (mode === 'topdown') {
      this.game.useSutra(topdown(this.game), 'mode-topdown', {
        shareListeners: true,
        shareTree: false,
        shareMap: false
      });
    }
    if (mode=== 'platform') {
      this.game.useSutra(platform(this.game), 'mode-platform');
    }
  }

  bindInputsToSutraConditions() {
    this.bindKeyCodesToSutraConditions();
    this.bindGamepadToSutraConditions();
  }

  bindGamepadToSutraConditions() {
    if (this.game.systems.gamepad) {
      console.log("Binding all gamepad events to Sutra conditions...")
      let gamepadControls = this.game.systems.gamepad.controls;
      for (let mantraCode in gamepadControls) {
        // Remark: Do we want to imply isPlayer here?
        // Is there a valid case for not defaulting to isPlayer?
        // It may be required for complex play movements?
        this.game.rules.addCondition(mantraCode, (entity, gameState) =>
          entity.id === game.currentPlayerId && gameState.input.controls[mantraCode]
          // gameState.input.controls[mantraCode]
        );
      }
    }
  }

  // TODO: send mouse control events to Sutra tree for tick evaluation
  bindMouseCodesToSutraConditions() {}

  bindKeyCodesToSutraConditions() {
    if (this.game.systems.keyboard) {
      console.log("Binding all keyboard events to Sutra conditions...")
      let keyControls = this.game.systems.keyboard.controls;

      for (let mantraCode in keyControls) {
        // Key Down Condition
        // Remark: These should not be bound to current player, instead to the entity that is being controlled
        // _DOWN implied as default
        // Remark: 3/3/2024 - Basic key press test seems to indicate this is continually true
        //                    It is expected to be true only once per press, TODO: add tests

        // Key down, only once per press
        this.game.rules.addCondition(mantraCode + '_DOWN', (entity, gameState) =>
          entity.id === this.game.currentPlayerId && gameState.input.keyStates[mantraCode]?.down
          // gameState.input.keyStates[mantraCode]?.down
        );


        // Key held / pressed condition, default
        this.game.rules.addCondition(mantraCode, (entity, gameState) =>
          entity.id === this.game.currentPlayerId && gameState.input.keyStates[mantraCode]?.pressed
          // gameState.input.keyStates[mantraCode]?.pressed
        );

        // Key Up Condition, only once per release
        this.game.rules.addCondition(mantraCode + '_UP', (entity, gameState) =>
          entity.id === this.game.currentPlayerId && gameState.input.keyStates[mantraCode]?.up
          // gameState.input.keyStates[mantraCode]?.up
        );

      }
    }
  }

  update() {
    let game = this.game;

    if (this.inputCache) {
      if (Object.keys(this.inputCache).length > 0) {
        game.data.input = this.inputCache;
      }

      for (let tc in this.inputTickCount) {
        // tc is name of input
        // check if this input is not present in inputCache
        if (this.inputCache.controls && !this.inputCache.controls[tc]) {
          // reset the tick count
          this.inputTickCount[tc] = 0;
        }
      }

      for (let tc in this.inputDuration) {
        // tc is name of input
        // check if this input is not present in inputCache
        if (this.inputCache.controls && !this.inputCache.controls[tc]) {
          // reset the duration count
          this.inputDuration[tc] = 0;
        }
      }

      for (let c in this.inputCache.controls) {
        if (this.inputCache.controls[c] === true) {
          this.inputTickCount[c] = this.inputTickCount[c] || 0;
          this.inputTickCount[c]++;
        }
        if (this.inputCache.controls[c] === false) {
          this.inputTickCount[c] = this.inputTickCount[c] || 0;
          this.inputTickCount[c] = 0;
        }

        if (this.inputCache.controls[c] === true) {
          this.inputDuration[c] = this.inputDuration[c] || 0;
          this.inputDuration[c] += 1000 / game.data.fps;
        }
        if (this.inputCache.controls[c] === false) {
          this.inputDuration[c] = this.inputDuration[c] || 0;
          this.inputDuration[c] = 0;
        }
      }

      game.data.inputTicks = this.inputTickCount;
      game.data.inputDuration = this.inputDuration;

    }

    if (game.data && game.data.input) {
      game.data.input.keyStates = game.systems.keyboard.keyStates;
    }

    // TODO: can we consolidate these into a single rules.tick() call?
    // TODO: loop through sutra components instead of entity list
    // LOOP1 - O(n) for each entity
    for (let [entityId, entity] of game.entities.entries()) {

      if (typeof entity.update == 'function') {
        // console.log('sutra is helping and running entity.update() in LOOP1 O(n) for each entity');
        // no arguments ( for now, perhaps delta )
        entity.update(entity);
      }

      // console.log('entity', entityId, entity)
      game.data.game = game;
      if (game.rules) {
        game.rules.tick(entity, game.data);
      }
      // check to see if entity itself has a valid entity.sutra, if so run it at entity level
      if (entity.sutra) {
        entity.sutra.tick(entity, game.data)
      }
    }

    if (game.data && game.data.collisions) {
      game.data.collisions.forEach((collisionEvent) => {
        if (game.rules) {
          game.rules.tick(collisionEvent, game.data);
        }
        if (collisionEvent.bodyA.sutra) {
          collisionEvent.bodyA.sutra.tick(collisionEvent, game.data)
        }
        if (collisionEvent.bodyB.sutra) {
          collisionEvent.bodyB.sutra.tick(collisionEvent, game.data)
        }
      });
      // remove all collisions that are not active
      game.data.collisions = game.data.collisions.filter(collisionEvent => {
        return collisionEvent.kind === 'ACTIVE';
      });
    }

    // TODO: check this for performance
    game.rules.emit('tick', game.data);

    game.data.input = {};
    game.data.inputTicks = {};
    game.data.inputDuration = {};
    this.inputCache = {};

  }

  setSutra(rules) {
    // TODO: needs to merge here, maybe add useSutra() method instead
    this.game.rules = rules;
    if (this.game.systems['gui-sutra']) {
      this.game.systems['gui-sutra'].setRules(rules);
    }
  }

  render() { }

  destroy() { }

}

export default Sutra;
