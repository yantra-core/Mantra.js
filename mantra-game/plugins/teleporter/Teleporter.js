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
      //texture: 'teleporter',
      //color: 0xff0000,
      collisionStart: this.touchedTeleporter,
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
    // teleporter will not affect itself
    console.log("TODO TELEPORT");
    if (context.owner.owner !== context.target.id) {
      //game.removeEntity(context.target.id);
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