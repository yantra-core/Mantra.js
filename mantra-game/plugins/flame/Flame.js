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
      collisionStart: this.touchedFlame,
      width: 16,
      height: 16,
      depth: 16,
      isStatic: true,
      position: {
        x: -80,
        y: -60,
        z: 16
      }
    };
  }

  createEntity(entityData = {}) {

    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    // Create the Flame entity
    const flame = game.createEntity(this.build(entityData));
  }

  touchedFlame(a, b, pair, context) {
    // flame will not affect itself
    if (context.owner.owner !== context.target.id) {
      game.removeEntity(context.target.id);
    }
  }

  sutra() {
    /*
    let rules = game.createSutra();

    rules.addCondition('entityTouchedFlame', (entity, gameState) => {
      if (entity.type === 'COLLISION' && entity.kind === 'START') {
        if (entity.bodyA.type === 'FLAME') {
          return true;
        }
        if (entity.bodyB.type === 'FLAME') {
          return true;
        }
      }
    });
  
    rules
      .if('entityTouchedFlame')
      .then('playNote', {
        note: 'F#4'
      })
      .then('damageEntity');
  
    rules.on('damageEntity', (collision) => {
      let ent;
      if (collision.bodyA.type === 'FLAME') {
        ent = collision.bodyB;
      } else {
        ent = collision.bodyA;
      }
      // create a copy of the entity previous texture
      // TODO: remove the createDefaultPlayer() call here
      //       and instead have a game.on('player::death') event
      //       listening in parent Sutra
      let texture = ent.texture;
      game.removeEntity(ent.id);
      if (ent.type === 'PLAYER') {
        game.currentPlayerId = null;
        game.createDefaultPlayer({
          texture
        });
      }
    });
  
    return rules;
    */
  }

  bindEvents() {
    // TODO: move pointerDown event into Sutra
    game.on('pointerDown', (entity, ev) => {
      if (entity.type === 'FLAME') {
        game.playNote('G4');
      }
    });
  }

}




