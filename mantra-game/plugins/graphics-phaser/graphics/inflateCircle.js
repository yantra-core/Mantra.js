export default function inflateCircle(entityData) {
  // check to see if there is existing graphic on entity, if so, use that
  let graphic;
  if (entityData.graphics && entityData.graphics['graphics-phaser']) {
    graphic = entityData.graphics['graphics-phaser'];
  }
  if (!graphic) {

    if (entityData.texture) {

      let texture = game.getTexture(entityData.texture);
      let textureUrl = texture.url;
      let spritePosition = texture.sprite || { x: 0, y: 0 };

      if (typeof entityData.texture.frame === 'number') {
        //spritePosition = texture.frames[entityData.texture.frame];
        //entityElement.style.backgroundPosition = `${spritePosition.x}px ${spritePosition.y}px`;
      }

      /*
      if (typeof texture.frames === 'object') {
        // console.log('got back texture', spritePosition, texture, spritePosition, entityData)
        if (game.tick % 10 === 0) { // TODO: custom tick rate
          // shift first frame from array
          if (typeof entityData.frameIndex === 'undefined') {
            entityData.frameIndex = 0;
          }
          if (entityData.frameIndex >= texture.frames.length) {
            entityData.frameIndex = 0;
          }

          let frame = texture.frames[entityData.frameIndex];
          if (typeof frame !== 'undefined') {
            spritePosition = frame;
            entityElement.style.backgroundPosition = `${spritePosition.x}px ${spritePosition.y}px`;
            entityData.frameIndex++;
            // add frame back to end of array
          }
        }
      }
      */
      graphic = this.scene.add.sprite(0, 0, texture.key);
    } else {
      graphic = this.scene.add.graphics();
      graphic.fillStyle(0xff0000, 1);
      graphic.fillCircle(0, 0, entityData.radius);
      graphic.setDepth(10);

    }






    entityData.graphic = graphic; // Store the reference in entityData for future updates
    this.scene.add.existing(graphic);
    this.game.components.graphics.set([entityData.id, 'graphics-phaser'], graphic);
  } else {
    // Clear the existing triangle if it exists
   //  graphic.clear();
  }

  graphic.setPosition(entityData.position.x, entityData.position.y);
  return graphic;
}