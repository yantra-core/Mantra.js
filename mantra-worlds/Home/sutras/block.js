export default function fire(game) {

  let rules = game.createSutra();


  rules.addCondition('playerTouchedBlock', (entity, gameState) => {
    if (entity.type === 'COLLISION' && entity.kind === 'START') {
      if (entity.bodyA.type === 'PLAYER' && entity.bodyB.type === 'BLOCK') {
        return true;
      }
      if (entity.bodyB.type === 'BLOCK' && entity.bodyA.type === 'PLAYER') {
        return true;
      }
    }
  });

  rules.addCondition('bulletTouchedBlock', (entity, gameState) => {
    if (entity.type === 'COLLISION' && entity.kind === 'START') {
      if (entity.bodyA.type === 'BULLET' && entity.bodyB.type === 'BLOCK') {
        return true;
      }
      if (entity.bodyB.type === 'BLOCK' && entity.bodyA.type === 'BULLET') {
        return true;
      }
    }
  });


  /*
  rules.if('playerTouchedBlock')
    .then('playNote', {
      note: 'C2'
    })
  */

  rules.if('bulletTouchedBlock')
    .then('playNote', {
      note: 'C4'
    })

  // TODO: move pointerDown event into Sutra
  game.on('pointerDown', (entity, ev) => {

    if (entity.type === 'BLOCK' && entity.kind === 'Tile') {
      game.playNote('C2');

      // Calculate the center of the tile
      const centerX = entity.width / 2;
      const centerY = entity.height / 2;

      // Calculate the difference between the click position and the center
      const diffX = ev.offsetX - centerX;
      const diffY = ev.offsetY - centerY;

      // Determine the direction to move the tile
      let directionX = 0;
      let directionY = 0;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Move horizontally in the opposite direction
        directionX = diffX > 0 ? -32 : 32; // Move left if click is to the right of center, else move right
      } else {
        // Move vertically in the opposite direction
        directionY = diffY > 0 ? -32 : 32; // Move up if click is below center, else move down
      }

      // Apply the new position
      game.applyPosition(entity.id, {
        x: directionX,
        y: directionY
      });
    }

  });

  return rules;
};