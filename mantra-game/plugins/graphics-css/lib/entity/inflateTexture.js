export default function inflateTexture(entityData, entityElement) {

  // console.log('inflateTexture', entityData)

  if (entityData.texture /*entityData.type === 'FIRE'*/) {

    // check to see if texture changed / sprite index changed
    let texture = game.getTexture(entityData.texture);
    // console.log('GOT BACK TEXTURE', texture)
    let textureUrl = texture.url;
    let spritePosition = texture.sprite || { x: 0, y: 0 };
    if (typeof entityData.texture.frame === 'number') {
      spritePosition = texture.frames[entityData.texture.frame];
      entityElement.style.backgroundPosition = `${spritePosition.x}px ${spritePosition.y}px`;
    } else {

    }
    
    //
    // Animated sprite, since the texture has a frames array
    //
    // if the array exists and animation is not paused
    if (typeof texture.frames === 'object' /*&& !entityData.texture.animationPaused*/) {
      //console.log('updating', game.tick)
      // console.log('got back texture', spritePosition, texture, spritePosition, entityData)
      if (game.tick % 10 === 0) { // TODO: custom tick rate
        //console.log('updating frame index', entityData)
        // shift first frame from array
        if (typeof entityData.texture.frameIndex === 'undefined') {
          entityData.texture.frameIndex = 0;
        }
        if (entityData.texture.frameIndex >= texture.frames.length) {
          entityData.texture.frameIndex = 0;
        }

        let frame = texture.frames[entityData.texture.frameIndex];
        if (typeof frame !== 'undefined') {
          // console.log('frame', entityData.frameIndex)
          spritePosition = frame;
          entityElement.style.backgroundPosition = `${spritePosition.x}px ${spritePosition.y}px`;
          entityData.texture.frameIndex++;
        }

       }

    } else {

      if (entityData.type !== 'PLAYER') { // for now
        entityElement.style.backgroundSize = `${entityData.width}px ${entityData.height}px`;
        entityElement.style.width = `${entityData.width}px`;
        entityElement.style.height = `${entityData.height}px`;
      }

    }

  }


}