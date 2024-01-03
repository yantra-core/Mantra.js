export default function updateSprite(entityId, data, SheetManager, anims) {

  let game = this.game;
  let currentInputs = data.controls;

  // only update sprite animations each 5 ticks
  // Remark: we could use a config value for this based on animation speed
  if (game.tick % 5 !== 0) {
    return;
  }
  // check to see if we have a player entity
  let playerEntity = game.getEntity(entityId);
  if (!playerEntity) {
    return;
  }

  let direction = null;

  if (currentInputs) {
    if (currentInputs.W) {
      direction = 'up';
    } else if (currentInputs.A) {
      direction = 'left';
    } else if (currentInputs.S) {
      direction = 'down';
    } else if (currentInputs.D) {
      direction = 'right';
    }

    if (!direction) {
      return;
    }

    // Get the spritesheet URL
    const sheet = game.getTexture('loz_spritesheet');

    let walkRight0 = anims.walkRight;
    let walkDown0 = anims.walkDown;
    let walkLeft0 = anims.walkLeft;
    let walkUp0 = anims.walkUp;

    // Update an entity with the sprite

    if (direction === 'down') {
      //console.log('walkDown0', walkDown0)
      // pop first element from walkDown0
      let spriteFrame = walkDown0.shift(); // Use shift() to remove the first element
      SheetManager.updateEntity(playerEntity, sheet, spriteFrame);
      // push it to the end
      walkDown0.push(spriteFrame); // Use push() to add the element to the end
    }
    
    if (direction === 'right') {
      let spriteFrame = walkRight0.shift(); // Use shift() to remove the first element
      SheetManager.updateEntity(playerEntity, sheet, spriteFrame);
      // push it to the end
      walkRight0.push(spriteFrame); // Use push() to add the element to the end
      // SheetManager.updateEntity(playerEntity, sheet, walkRight0);
    }

    if (direction === 'left') {
      let spriteFrame = walkLeft0.shift(); // Use shift() to remove the first element
      SheetManager.updateEntity(playerEntity, sheet, spriteFrame);
      //SheetManager.updateEntity(playerEntity, sheet, walkLeft0);
      // push it to the end
      walkLeft0.push(spriteFrame); // Use push() to add the element to the end
    }

    if (direction === 'up') {
      let spriteFrame = walkUp0.shift(); // Use shift() to remove the first element
      SheetManager.updateEntity(playerEntity, sheet, spriteFrame);
      //SheetManager.updateEntity(playerEntity, sheet, walkUp0);
      // push it to the end
      walkUp0.push(spriteFrame); // Use push() to add the element to the end
    }

    return;

  }
}