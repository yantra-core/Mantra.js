let loadingCircle;

export default function sutras(game) {

  let rules = game.createSutra();

  rules.addCondition('playerTouchedStoneTile', (entity, gameState) => {
    if (entity.type === 'COLLISION') {
      if (entity.bodyA.type === 'PLAYER' && entity.bodyB.type === 'BLOCK') {
        return true;
      }
      if (entity.bodyB.type === 'BLOCK' && entity.bodyA.type === 'PLAYER') {
        return true;
      }
    }
  });

  rules.addCondition('entityTouchedFire', (entity, gameState) => {
    if (entity.type === 'COLLISION') {
      if (entity.bodyA.type === 'FIRE') {
        return true;
      }
      if (entity.bodyB.type === 'FIRE') {
        return true;
      }
    }
  });

  rules.addCondition('entityTouchedNote', (entity, gameState) => {
    if (entity.type === 'COLLISION') {
      if (entity.bodyA.type === 'NOTE') {
        return true;
      }
      if (entity.bodyB.type === 'NOTE') {
        return true;
      }
    }
  });

  rules.addCondition('bulletTouchedBlock', (entity, gameState) => {
    if (entity.type === 'COLLISION') {
      if (entity.bodyA.type === 'BULLET' && entity.bodyB.type === 'BLOCK') {
        return true;
      }
      if (entity.bodyB.type === 'BLOCK' && entity.bodyA.type === 'BULLET') {
        return true;
      }
    }
  });

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
        loadingCircle = new game.systems.graphics.LoadingCircle(2000);
  
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

  rules
    .if('entityTouchedFire')
    .then('playNote', {
      note: 'F#4'
    })
    .then('damageEntity')

  rules.if('playerTouchedStoneTile')
    .then('playNote', {
      note: 'C2'
    })

  rules.if('bulletTouchedBlock')
    .then('playNote', {
      note: 'C2'
    })

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

  rules
    .if('entityTouchedNote')
    .then('playNote')
    .then('showNote', {
      // note: 'C4'
    })

  // make this game::playNote
  rules.on('playNote', (collision) => {
    // collision.note = collision.note || 'C4';
    console.log('playNote.collision', collision)
    //game.systems.tone.playIntroJingle();
    game.playNote(collision.note);
  });

  rules.on('showNote', (collision) => {
    // collision.note = collision.note || 'C4';
    console.log('showNote.collision', collision);

    let eId = null;
    for (let id in game.components.name.data) {
      let name = game.components.name.data[id];
      if (name === 'noteInfo') {
        eId = id;
      }
    }

    let ent = game.getEntity(eId);
    if (eId) {
      console.log('using eId', eId)
      // update element with name noteInfo
      game.updateEntity({
        id: Number(eId),
        text: collision.note
      })

    }

  });

  // TODO: move pointerDown event into Sutra
  game.on('pointerDown', (entity, ev) => {

    if (entity.type === 'NOTE') {
      game.playNote();
    }

    if (entity.type === 'FIRE') {
      game.playNote('G4');
    }
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

  console.log('created sutra', rules.toEnglish())
  return rules;
}