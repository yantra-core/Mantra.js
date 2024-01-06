export default function updateBox(entityData, graphic, game) {
  // check to see if color has changed, if so update the tint
  if (typeof entityData.color !== 'undefined') {
    // console.log('COLOR', entityData.color)
    graphic.setTint(entityData.color);
  }

  if (typeof entityData.texture !== 'undefined') {

    let texture = game.getTexture(entityData.texture);
    let textureUrl = texture.url;
    let spritePosition = texture.sprite || { x: 0, y: 0 };
    if (typeof entityData.texture.frame === 'number') {
      // graphic.setFrame(entityData.texture.frame);
    }

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
          // console.log(frame)
          // set position on graphic based on frame.x and frame.y
          // graphic.setFrame(frame.frame);
          //graphic.setFrame(2);
          //console.log('frame', frame)
          // graphic.setFrame(entityData.frameIndex);
          // TODO: setFrame animation here
          entityData.frameIndex++;
          // add frame back to end of array
        }
      }
    }
  }
}