export default function demon(game) {

  game.createEntity({
    type: 'DEMON',
    texture: 'demon',
    //texture: 'fire',
    //color: 0xff0000,
    width: 8,
    height: 8,
    depth: 8,
    position: {
      x: -60,
      y: -60,
      z: 8
    }
  });

  game.createEntity({
    type: 'DEMON',
    texture: 'demon',
    //texture: 'fire',
    //color: 0xff0000,
    width: 8,
    height: 8,
    depth: 8,
    position: {
      x: 64,
      y: -60,
      z: 8
    }
  });

  let rules = game.createSutra();

  rules.addCondition('entityTouchedDemon', (entity, gameState) => {
    console.log('entityTouchedDemon check', entity)
    if (entity.type === 'COLLISION' && entity.kind === 'START') {
      if (typeof entity.DEMON !== 'undefined') {
        return true;
      }
    }
  });

  /*
  rules.on('entityTouchedDemon', function (collision) {
    //let demonEntity = collision.bodyA.type === 'DEMON' ? collision.bodyA : collision.bodyB;
    // Define the scale factor for how much bigger the demon should get
    const scaleFactor = 2.1; // For example, 10% bigger
    // Increase the size of the demon
    game.updateEntity({
      id: demonEntity.id,
      width: demonEntity.width * scaleFactor,
      height: demonEntity.height * scaleFactor,
      depth: demonEntity.depth * scaleFactor
    });
  });
  */

  return rules;

}