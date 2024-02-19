// Teleporter.js - Marak Squires 2024
export default class Teleporter {
  static id = 'teleporter';
  static type = 'sutra';
  constructor(config = {}) {
    this.id = Teleporter.id;
  }

  init(game) {
    this.game = game;
    this.bindEvents();
    this.game.systemsManager.addSystem('teleporter', this);
  }

  build (entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }
    //let rules = this.sutra();
    return {
      type: 'TELEPORTER',
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'ayyoDoor',
        // frame: 0 // TODO: support single frame / bypass animation of array
      },
      meta: {
        destination: entityData.destination || {
          position: {
            x: 0,
            y: 0,
            z: 0
          }
        }
      },
      //texture: 'teleporter',
      //color: 0xff0000,
      collisionStart: entityData.collisionStart || this.touchedTeleporter.bind(this),
      size: {
        width: 16,
        height: 16,
        depth: 16,
      },
      isStatic: true,
      position: {
        x: 0,
        y: 0,
        z: 1
      }
    };
  }

  createEntity(entityData = {}) {

    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    // Create the Teleporter entity
    const teleporter = game.createEntity(this.build(entityData));
  }

  touchedTeleporter(a, b, pair, context) {

    if (context.owner.meta &&  context.owner.meta.destination) {
      let destination = context.owner.meta.destination;
      if (typeof destination === 'function') {
        destination.call(game, context.target, context.owner);
      } else {
        if (typeof destination.world !== 'undefined') {
          if (context.target.type === 'PLAYER') { // could be other types as well
            game.switchWorlds(destination.world);
          }
        }
        // same as world, duplicate code
        if (typeof destination.plugin !== 'undefined') {
          if (context.target.type === 'PLAYER') { // could be other types as well
            game.switchWorlds(destination.plugin);
          }
        }
        // handle entity case
        if (typeof destination.entity !== 'undefined') {
          // get latest position for ent ( if available )
          let ent = game.data.ents._[destination.entity]; // TODO: game.getEntity() with improved perf
          if (ent) {
            game.setPosition(context.target.id, { x: ent.position.x, y: ent.position.y });
          }
        }
        if (typeof destination.position !== 'undefined') {
          game.setPosition(context.target.id, { x: destination.position.x, y: destination.position.y });
        }
      }
    }

  }

  sutra() {

  }

  bindEvents() {
    // TODO: move pointerDown event into Sutra
    this.game.on('pointerDown', (entity, ev) => {
      if (entity.type === 'FLAME') {
        game.playNote('G4');
      }
    });
  }

}