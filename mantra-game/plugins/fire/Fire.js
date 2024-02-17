// Fire.js - Marak Squires 2023
export default class Fire {
  static id = 'fire';
  static type = 'sutra';
  constructor(config = {}) {
    this.id = Fire.id;
  }

  init(game) {
    this.game = game;
    this.bindRules();
    this.game.systemsManager.addSystem('fire', this);
  }

  build (entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }
    //let rules = this.sutra();
    return {
      type: 'FIRE',
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'fire',
        // frame: 0 // TODO: support single frame / bypass animation of array
      },
      //texture: 'fire',
      //color: 0xff0000,
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

    // Create the Black Hole entity
    const blackHole = game.createEntity(this.build(entityData));
  }

  sutra() {
    // Define the gravitational constant
    const GRAVITATIONAL_CONSTANT = 0.01; // Adjust as needed for gameplay

    let rules = game.createSutra();

    rules.addCondition('entityTouchedFire', (entity, gameState) => {
      if (entity.type === 'COLLISION' && entity.kind === 'START') {
        if (entity.bodyA.type === 'FIRE') {
          return true;
        }
        if (entity.bodyB.type === 'FIRE') {
          return true;
        }
      }
    });
  
    rules
      .if('entityTouchedFire')
      .then('playNote', {
        note: 'F#4'
      })
      .then('damageEntity');
  
    rules.on('damageEntity', (collision) => {
      let ent;
      if (collision.bodyA.type === 'FIRE') {
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
  
    // TODO: move pointerDown event into Sutra
    game.on('pointerDown', (entity, ev) => {
      if (entity.type === 'FIRE') {
        game.playNote('G4');
      }
    });
  
    return rules;

  }

  bindRules() {

  }

  update() {

  }
}




