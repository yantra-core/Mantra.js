// Draggable.js
export default class Draggable {
  static id = 'draggable';

  constructor(config = {}) {
    this.id = Draggable.id;
    this.maxShield = config.maxShield || 100; // Maximum shield strength
    this.regenRate = config.regenRate || 1; // Shield regeneration rate per tick
    this.cooldown = config.cooldown || 5000; // Cooldown before regeneration starts (ms)
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('draggable', this);
  }

  build(entityData = {}) {
    // Ensure `meta` exists and initialize shield properties
    const meta = entityData.meta || {};

    entityData.position = entityData.position || { x: 0, y: 0, z: 0 };

    entityData.pointerdown = (function (context, event) {

      // fix the context ( entity ) to the pointer
      game.updateEntity(context.id, {
        update: function (entity) {
          // console.log('sup dating', game.data.mouse.position)
          //entity.position.x = event.x;
          //entity.position.y = event.y;
          game.updateEntity(entity.id, {
            position: game.data.mouse.worldPosition
          });
        }
      })
    })

    entityData.pointerup = (function (context, event) {
      // release the context ( entity ) from the pointer by clearing the update
      // TODO: this will remove all updates, we'll need to manage the wrapped fn.events array here
      //       it is already possible with current architecture, just need to implement it
      game.updateEntity(context.id, {
        update: null
      });
    });

    return {
      ...entityData,
      meta,
    };
  }
}
