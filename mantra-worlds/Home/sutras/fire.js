export default function fire(game) {

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
    game.removeEntity(ent.id);
    if (ent.type === 'PLAYER') {
      game.currentPlayerId = null;
      game.createDefaultPlayer();
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