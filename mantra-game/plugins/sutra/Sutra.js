// import sutra from '../../../../sutra/index.js';
import sutra from '@yantra-core/sutra';
// handles input controller events and relays them to the game logic
class Sutra {
  static id = 'sutra';
  constructor() {
    this.id = Sutra.id;
    console.log('sutrasutrasutra', sutra)
    this.sutra = sutra;
  }

  init(game) {
    this.game = game;
    this.game.createSutra = sutra.createSutra;
    this.game.setSutra = this.setSutra.bind(this);
    this.game.setRules = this.setSutra.bind(this);
    this.game.systemsManager.addSystem(this.id, this);
  }

  update() {
    let game = this.game;
    if (game.rules) {
      for (let [entityId, entity] of game.entities.entries()) {
        // console.log('entity', entityId, entity)
        game.rules.tick(entity, game.data);
      }

      /*
      if (game.data && game.data.timers) {
        if (game.data.timers.length) {
          console.log('game.data.timers', game.data.timers)
        }
         game.data.timers.forEach((timer) => {
          game.rules.tick(timer, game.data);
        });
        game.data.timers = [];
      }
      */

      if (game.data && game.data.collisions) {
        if (game.data.collisions.length > 0 ) {
          // console.log(game.data.collisions)
        }
        game.data.collisions.forEach((collisionEvent) => {
          game.rules.tick(collisionEvent, game.data);
        });
        game.data.collisions = [];
      }
    }
  }

  setSutra (rules) {
    this.game.rules = rules;
  }

  render() { }

  destroy() { }

}

export default Sutra;
