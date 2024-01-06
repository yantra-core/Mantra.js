export default function note(game) {

  // if touch note play sound
  game.createEntity({
    type: 'NOTE',
    color: 0xccff00,
    width: 32,
    height: 32,
    depth: 16,
    isStatic: true,
    position: {
      x: 0,
      y: 0,
      z: 1
    }
  });

  let rules = game.createSutra();

  rules.addCondition('entityTouchedNote', (entity, gameState) => {
    if (entity.type === 'COLLISION' && entity.kind === 'START') {
      if (entity.bodyA.type === 'NOTE') {
        return true;
      }
      if (entity.bodyB.type === 'NOTE') {
        return true;
      }
    }
  });

  // TODO: move these events into a Sutra
  game.on('pointerDown', (entity) => {
    if (entity.type === 'NOTE') {
      game.playNote(entity.kind);
    }
    if (entity.type === 'DRUM') {
      game.playDrum(entity.kind);
    }
  });

}