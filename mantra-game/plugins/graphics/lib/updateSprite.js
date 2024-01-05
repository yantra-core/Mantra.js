export default function updateSprite(entityId, data, SheetManager, anims) {

  let game = this.game;
  let currentInputs = data.controls;

  // only update sprite animations each 5 ticks
  // Remark: we could use a config value for this based on animation speed
  if (game.tick % 10 !== 0) {
    // return;
  }
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

    if (!direction) {
      return;
    }

    // assume "player" sprite for now
    let spriteName = playerEntity.texture.sprite;

    let newSpriteName = 'player' + direction;

    //console.log('updateSprite', newSpriteName ,direction, entityId, playerEntity, data);

    // check to see if sprite is already set, if so, do not double set
    if (spriteName !== newSpriteName) {
      console.log('updating sprite', spriteName, newSpriteName, 'on', entityId, 'to', newSpriteName)
      game.updateEntity({
        id: entityId,
        texture: {
          sheet: playerEntity.texture.sheet,
          sprite: newSpriteName,
        }
      })
    }

  }
}