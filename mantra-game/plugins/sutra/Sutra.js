// import { createSutra } from '../../../../sutra/index.js';
import { createSutra } from '@yantra-core/sutra';
// handles input controller events and relays them to the game logic
class Sutra {
  static id = 'sutra';
  constructor() {
    this.id = Sutra.id;
    this.inputCache = {};
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

  }

  update() {
    let game = this.game;
    if (game.rules) {

      if (this.inputCache) {
        if (Object.keys(this.inputCache).length > 0 ) {
          game.data.input = this.inputCache;
        }
      }

      // TODO: can we consolidate these into a single rules.tick() call?
      for (let [entityId, entity] of game.entities.entries()) {
        // console.log('entity', entityId, entity)
        game.rules.tick(entity, game.data);
      }

      if (game.data && game.data.timers) {
        if (game.data.timers.length) {
          // console.log('game.data.timers', game.data.timers)
        }
         game.data.timers.forEach((timer) => {
          game.rules.tick(timer, game.data);
        });
        game.data.timers = [];
      }

      if (game.data && game.data.collisions) {
        if (game.data.collisions.length > 0 ) {
          // console.log(game.data.collisions)
        }
        game.data.collisions.forEach((collisionEvent) => {
          game.rules.tick(collisionEvent, game.data);
        });
        game.data.collisions = [];
      }

      game.data.input = {};
      this.inputCache = {};

    }
  }

  setSutra (rules) {
    this.game.rules = rules;
    if (this.game.systems['gui-sutra']) {
      this.game.systems['gui-sutra'].setRules(rules);
    }
  }

  render() { }

  destroy() { }

}

export default Sutra;
