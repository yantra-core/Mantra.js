export default function updateSprite(entityId, data, SheetManager, anims) {

  let game = this.game;
  let currentInputs = data.controls;

  // console.log('currentInputs', currentInputs)
  // check to see if we have a player entity
  let playerEntity = game.getEntity(entityId);
  if (!playerEntity) {
    return;
  }

  let direction = null;

  if (currentInputs) {
    if (currentInputs.W) {
      direction = 'Up';
    } else if (currentInputs.A) {
      direction = 'Left';
    } else if (currentInputs.S) {
      direction = 'Down';
    } else if (currentInputs.D) {
      direction = 'Right';
    }


    if (!playerEntity.texture) {
      return;
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
}