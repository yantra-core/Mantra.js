// Flame.js - Marak Squires 2023
export default class Flame {
  static id = 'flame';
  static type = 'sutra';
  constructor(config = {}) {
    this.id = Flame.id;
  }

  init(game) {
    this.game = game;
    this.bindEvents();
    this.game.systemsManager.addSystem('flame', this);
  }

  build (entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }
    //let rules = this.sutra();
    return {
      type: 'FLAME',
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'fire',
        // frame: 0 // TODO: support single frame / bypass animation of array
      },
      //texture: 'flame',
      //color: 0xff0000,
      collisionStart: this.touchedFlame.bind(this),
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

  // TODO: rename to create? we probably need this.createEntity scope preserved for scene
  createEntity(entityData = {}) {

    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    // Create the Flame entity
    const flame = game.createEntity(this.build(entityData));
  }

  touchedFlame(a, b, pair, context) {
    let game = this.game;
    // flame will not affect itself
    if (context.owner.owner !== context.target.id) {
      game.removeEntity(context.target.id);
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