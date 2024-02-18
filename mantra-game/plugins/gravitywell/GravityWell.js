// GravityWell.js - Marak Squires 2023
export default class GravityWell {
  static id = 'blackhole';
  static type = 'sutra';
  constructor(config = {}) {
    this.id = GravityWell.id;
    this.GRAVITATIONAL_CONSTANT = 0.01; // Adjust as needed for gameplay

  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('blackhole', this);
  }

  build (entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }
    let rules = this.sutra();

    let meta = entityData.meta || {
      repulsion: false
    };

    if (typeof entityData.repulsion == 'boolean') {
      meta.repulsion = entityData.repulsion;
    }
    return {
      type: 'BLACK_HOLE',
      // isSensor: true,
      position: {
        x: entityData.position.x,
        y: entityData.position.y
      },
      meta: meta,
      // runs every tick, recommended to keep this light and use this.game % 5 === 0 for heavier operations, etc
      // update: function () {},
      mass: 100,
      sutra: rules
    };
  }

  createEntity(entityData = {}) {

    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    // Create the Black Hole entity
    const blackHole = this.game.createEntity(this.build(entityData));
  }

  sutra() {
    let game = this.game;

    let rules = game.createSutra();
    rules.addCondition('gravityTick', (entity, gameState) => gameState.tick % 5 === 0);

    rules.if('gravityTick').then('applyGravity');

    rules.on('applyGravity', (entityData, node, gameState) => {
      Object.keys(gameState.ents._).forEach(eId => {
        let entity = gameState.ents._[eId];
        if (entity.id !== entityData.id && !entity.destroyed) {
          let gravityWell = gameState.ents._[entityData.id];
          if (gravityWell) {
            this.game.applyGravity(gravityWell, entity, this.GRAVITATIONAL_CONSTANT, gravityWell.meta.repulsion);
          }
        }
      });
    });

    return rules;

  }

}