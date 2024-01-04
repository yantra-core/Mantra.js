// helper sutra for switching worlds
import warpToWorld from '../sutras/warpToWorld.js';
import switchGraphics from '../sutras/switchGraphics.js';

let isPressed = false;

let timerCache = {};

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
    .then('updateNoteColor')

  // helper for playing notes
  // TODO: unified api handling for playing notes
  rules.on('playNote', function (collision) {
    let note;
    if (collision.kind) {
      note = collision.kind;
    }
    if (collision.note) {
      note = collision.note;
    }

    if (collision.NOTE) {
      note = collision.NOTE.kind;
    }
    game.playNote(note);
  });

  rules.on('updateNoteColor', (collision) => {
    let ent = collision.NOTE || collision;

    // Check if we have a timerCache entry for this entity
    if (timerCache[ent.id]) {
      // Clear existing timeout
      clearTimeout(timerCache[ent.id].timer);

      // Reset the color to the original color stored in timerCache
      game.updateEntity({
        id: ent.id,
        color: timerCache[ent.id].originalColor
      });
    } else {
      // If no entry in timerCache, create one and store the original color
      timerCache[ent.id] = {
        originalColor: ent.color
      };
    }

    // Update the entity color to yellow
    game.updateEntity({
      id: ent.id,
      color: 0xccff00
    });

    // Set a timeout to revert the color back to original
    timerCache[ent.id].timer = setTimeout(() => {
      game.updateEntity({
        id: ent.id,
        color: timerCache[ent.id].originalColor
      });
      // Optionally, you might want to clean up the timerCache entry
      // delete timerCache[ent.id];
    }, 222);
  });

  console.log('created sutra', rules.toEnglish())

  // TODO: move these events into a Sutra
  game.on('pointerDown', (entity) => {
    if (entity.type === 'NOTE' || entity.name === 'piano-roll-text') {
      game.playNote(entity.kind);
      rules.emit('updateNoteColor', entity);
      isPressed = true; // Set the pressed state to true when mouse is clicked
    }

    if (entity.type === 'DRUM') {
      game.playDrum(entity.kind);
    }

  });

  game.on('pointerMove', (entity) => {
    if (isPressed && entity.type === 'NOTE') {
      // Only play notes when pressed is true and the entity is a NOTE
      game.playNote(entity.kind);
      rules.emit('updateNoteColor', entity);
    }
  });

  game.on('pointerUp', (entity) => {
    console.log('pointerUp', entity);
    isPressed = false; // Reset the pressed state when the mouse click is released
  });

  return rules;
}