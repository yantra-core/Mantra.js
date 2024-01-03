let loadingCircle;


// TODO: make configurable
let waitTime = 3000;

export default function switchGraphics(game) {

  let rules = game.createSutra();

  rules.addCondition('playerTouchedPhaserGraphics', (entity, gameState) => {
    if (entity.type === 'COLLISION' && entity.kind === 'ACTIVE' && entity.TEXT.name === 'PhaserGraphics') {
      if (entity.bodyA.type === 'PLAYER' && entity.bodyB.type === 'TEXT') {
        return true;
      }
      if (entity.bodyB.type === 'TEXT' && entity.bodyA.type === 'PLAYER') {
        return true;
      }
    }
  });

  rules.addCondition('playerStoppedTouchedPhaserGraphics', (entity, gameState) => {
    if (entity.type === 'COLLISION' && entity.kind === 'END' && entity.TEXT.name === 'PhaserGraphics') {
      if (entity.bodyA.type === 'PLAYER' && entity.bodyB.type === 'TEXT') {
        return true;
      }
      if (entity.bodyB.type === 'TEXT' && entity.bodyA.type === 'PLAYER') {
        return true;
      }
    }
  });

  rules
    .if('playerTouchedPhaserGraphics')
    .then('switchGraphics')

  rules.if('playerStoppedTouchedPhaserGraphics')
    .then('hideLoader')


  // babylon graphics
  rules.addCondition('playerTouchedBabylonGraphics', (entity, gameState) => {
    if (entity.type === 'COLLISION' && entity.kind === 'ACTIVE' && entity.TEXT.name === 'BabylonGraphics') {
      if (entity.bodyA.type === 'PLAYER' && entity.bodyB.type === 'TEXT') {
        return true;
      }
      if (entity.bodyB.type === 'TEXT' && entity.bodyA.type === 'PLAYER') {
        return true;
      }
    }
  });

  rules.addCondition('playerStoppedTouchedBabylonGraphics', (entity, gameState) => {
    if (entity.type === 'COLLISION' && entity.kind === 'END' && entity.TEXT.name === 'BabylonGraphics') {
      if (entity.bodyA.type === 'PLAYER' && entity.bodyB.type === 'TEXT') {
        return true;
      }
      if (entity.bodyB.type === 'TEXT' && entity.bodyA.type === 'PLAYER') {
        return true;
      }
    }
  });

  rules
    .if('playerTouchedBabylonGraphics')
    .then('switchGraphics')

  rules.if('playerStoppedTouchedBabylonGraphics')
    .then('hideLoader')



  rules.on('hideLoader', (entity, node, gameState) => {
    if (loadingCircle) {
      loadingCircle.remove();
    }
  })
  rules.on('switchGraphics', (entity, node, gameState) => {

    if (typeof entity.duration === 'number') {
      if (entity.duration === 1) {
        // first time, show circle
        loadingCircle = new game.systems.graphics.LoadingCircle(waitTime);

        // Set position of the loading circle
        let position = entity.TEXT.position;
        const adjustedPosition = {
          x: position.x - gameState.camera.position.x + window.outerWidth / 2,
          y: position.y - gameState.camera.position.y + window.outerHeight / 2
        };

        adjustedPosition.x += 45;
        adjustedPosition.y += 255;

        loadingCircle.setPosition(adjustedPosition.x, adjustedPosition.y); // X and Y coordinates
        loadingCircle.container.addEventListener('loadingComplete', (e) => {
          console.log('Loading complete:', e.detail);
          let graphicsName = entity.TEXT.name || 'PhaserGraphics';
          game.switchGraphics(graphicsName);
          // remove the loading circle
          loadingCircle.remove();
        });
      } else {
        // update circle
        loadingCircle.tick(1 / gameState.FPS * 1000);
      }
    }
  });


  return rules;

}