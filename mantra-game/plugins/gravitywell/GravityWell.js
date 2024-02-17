// GravityWell.js - Marak Squires 2023
export default class GravityWell {
  static id = 'blackhole';
  static type = 'sutra';
  constructor(config = {}) {
    this.id = GravityWell.id;
  }

  init(game) {
    this.game = game;
    this.bindRules();
    this.game.systemsManager.addSystem('blackhole', this);
  }

  build (entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }
    let rules = this.sutra();
    return {
      type: 'BLACK_HOLE',
      isStatic: true,
      isSensor: true,
      width: 4,
      height: 4,
      //radius: 20,
      position: {
        x: entityData.position.x,
        y: entityData.position.y
      },
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
    // Define the gravitational constant
    const GRAVITATIONAL_CONSTANT = 0.01; // Adjust as needed for gameplay

    let rules = game.createSutra();
    rules.addCondition('gravityTick', (entity, gameState) => gameState.tick % 5 === 0);

    rules.if('gravityTick').then('applyGravity');

    rules.on('applyGravity', (entityData, node, gameState) => {
      Object.keys(gameState.ents._).forEach(eId => {
        let entity = gameState.ents._[eId];
        if (entity.id !== entityData.id && !entity.destroyed) {
          let blackhole = gameState.ents._[entityData.id];
          this.game.applyGravity(blackhole, entity, GRAVITATIONAL_CONSTANT, gameState);
        }
      });
    });

    // TODO: rework collision handlers to use new collisionContext system
    // rules.if('entTouchedGravityWell').then('blackHoleCollision');
    rules.addCondition('entTouchedGravityWell', (entity, gameState) => {
      // check if this running locally on a context or globally on all BLACK_HOLE entities
      if (typeof context !== 'undefined') {
        return entity.type === 'COLLISION' && entity.kind === 'START' && entity[context.type];
      } else {
        return entity.type === 'COLLISION' && entity.kind === 'START' && entity.BLACK_HOLE;
      }
    });

    rules.on('blackHoleCollision', (collision, node, gameState) => {
      let pendingDestroy = collision.bodyA;
      let blackHole = collision.bodyB;

      if (collision.bodyA.type === 'BLACK_HOLE') {
        pendingDestroy = collision.bodyB;
        blackHole = collision.bodyA;
      }

      if (typeof context !== 'undefined') {
        if (collision.bodyA.type === context.type) {
          pendingDestroy = collision.bodyB;
        } else {
          pendingDestroy = collision.bodyA;
        }
        blackHole = context;
      }

      if (pendingDestroy && blackHole) {
        // here we have pendingDestroy.position, pendingDestroy.velocity, and blackHole.position
        // game.playSpatialSound(pendingDestroy, blackHole);
        // increase size of black hole
        // console.log(blackHole.height, blackHole.width)
        game.removeEntity(pendingDestroy.id);

      }

      // teleport the ent to a random radial a bit away from source
      //let randomPosition = game.randomPositionRadial(blackHole.position.x, blackHole.position.y, 1000);
      //this.game.updateEntity(pendingDestroy.id, { position: randomPosition });

    });
    return rules;

  }

  bindRules() {

  }

  update() {

  }
}