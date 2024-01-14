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

      if (this.inputCache) {
        if (Object.keys(this.inputCache).length > 0) {
          game.data.input = this.inputCache;
        }
      }

      // TODO: Remove this init, it should be a check and throw
      // camera init is handled in Graphics.js and Camera system
      game.data.camera = game.data.camera || {};
      game.data.camera.position = game.data.camera.position || {
        x: 0,
        y: 0
      };

      // TODO: can we consolidate these into a single rules.tick() call?
      for (let [entityId, entity] of game.entities.entries()) {
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

      game.data.input = {};
      this.inputCache = {};

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
