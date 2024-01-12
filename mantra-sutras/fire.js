export default function fire(game) {

  game.createEntity({
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
    depth: 64,
    isStatic: true,
    position: {
      x: -80,
      y: -60,
      z: 32
    }
  });

  game.createEntity({
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
    depth: 64,
    isStatic: true,
    position: {
      x: 80,
      y: -60,
      z: 32
    }
  });


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