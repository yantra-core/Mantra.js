export default function updateSprite(entityId, actions, SheetManager, anims) {

  let game = this.game;
  let currentActions = actions;

  // console.log('updateSprite', entityId, actions, SheetManager, anims)
  // console.log('currentInputs', currentInputs)
  // check to see if we have a player entity
  let playerEntity = game.getEntity(entityId);
  if (!playerEntity) {
    return;
  }

  let direction = null;

  if (!currentActions) {
    return;
  }

  if (!playerEntity.texture) {
    return;
  }

  let currentAction = currentActions[0];

  switch (currentAction) {
    case 'MOVE_LEFT':
      direction = 'Left';
      break;
    case 'MOVE_RIGHT':
      direction = 'Right';
      break;
    case 'PLAYER_UP':
      direction = 'Up';
      break;
    case 'PLAYER_DOWN':
      direction = 'Down';
      break;
    default:
      direction = null;
  }



  let spriteName = playerEntity.texture.sprite;

  let newSpriteName;


  if (!direction) {
    newSpriteName = spriteName;
    // uncomment to re-enable animation
    //return;
  } else {
    newSpriteName = 'player' + direction;
  }


  //console.log('updateSprite', newSpriteName ,direction, entityId, playerEntity, data);

  // check to see if sprite is already set, if so, do not double set
  if (spriteName !== newSpriteName) {
    // if the new sprite name doesn't match, update immediate
    game.updateEntity({
      id: entityId,
      texture: {
        frameIndex: 0,
        sheet: playerEntity.texture.sheet,
        sprite: newSpriteName,
        animationPlaying: true
      }
    })
    return;
  } else {
    /*
    game.updateEntity({
      id: entityId,
      texture: {
        frameIndex: 0,
        sheet: playerEntity.texture.sheet,
        sprite: newSpriteName,
        animationPlaying: false
      }
    })
    */
    return;

  }
  // console.log('updating sprite', spriteName, newSpriteName, 'on', entityId, 'to', newSpriteName)
  /*
    // check to see if controls are all false, if so animationPlaying should be false
    let allFalse = true;
    // console.log('currentInputs', currentInputs)
    for (let key in currentInputs) {
      //console.log(key, currentInputs[key])
      if (currentInputs[key] === true) {
        allFalse = false;
        break;
      }
    }

    //console.log('allFalse', allFalse, currentInputs)
    game.updateEntity({
      id: entityId,
      texture: {
        sheet: playerEntity.texture.sheet,
        sprite: newSpriteName,
        animationPlaying: true
      }
    })
  }
  */

}