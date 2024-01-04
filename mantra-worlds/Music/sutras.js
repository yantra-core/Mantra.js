// helper sutra for switching worlds
import warpToWorld from '../sutras/warpToWorld.js';
import switchGraphics from '../sutras/switchGraphics.js';

let isPressed = false;

export default function sutras(game) {

  let rules = game.createSutra();

  rules.addCondition('isTile', (entity) => entity.type === 'BLOCK');

  // when touching WARP entity, warp to world
  let warp = warpToWorld(game);
  rules.use(warp, 'warpToWorld');

  rules.addCondition('entityTouchedNote', (entity, gameState) => {
    if (entity.type === 'COLLISION' && entity.kind === 'START') {
      // console.log('spawnUnitTouchedHomebase', entity)
      if (entity.bodyA.type === 'NOTE') {
        // console.log('spawnUnitTouchedHomebase', entity, gameState)
        return true;
      }
      if (entity.bodyB.type === 'NOTE') {
        // console.log('spawnUnitTouchedHomebase', entity, gameState)
        return true;
      }
    }
  });

  rules.on('damageEntity', (collision) => {
    let ent;
    if (collision.bodyA.type === 'FIRE') {
      ent = collision.bodyB;
    } else {
      ent = collision.bodyA;
    }
    console.log('damageEntity', ent)
    game.removeEntity(ent.id);
  });

  rules
    .if('entityTouchedNote')
    .then('playNote')

  
  // helper for playing notes
  rules.on('playNote', (collision) => game.playNote(collision.NOTE.kind || collision.note));

  console.log('created sutra', rules.toEnglish())

  // TODO: move these events into a Sutra
  game.on('pointerDown', (entity) => {
    console.log('entity', entity);
    if (entity.type === 'NOTE') {
      console.log('playNote', entity.kind);
      game.playNote(entity.kind);
      isPressed = true; // Set the pressed state to true when mouse is clicked
    }
  });
  
  game.on('pointerMove', (entity) => {
    if (isPressed && entity.type === 'NOTE') {
      // Only play notes when pressed is true and the entity is a NOTE
      console.log('playNote', entity.kind);
      game.playNote(entity.kind);
    }
  });
  
  game.on('pointerUp', (entity) => {
    console.log('pointerUp', entity);
    isPressed = false; // Reset the pressed state when the mouse click is released
  });
  

  return rules;
}