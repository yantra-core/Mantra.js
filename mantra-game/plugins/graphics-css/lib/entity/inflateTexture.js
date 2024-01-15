export default function inflateTexture(entityData, entityElement) {

  if (entityData.texture) {

    // first check to see if texture exists
    let texture = game.getTexture(entityData.texture);

    if (!texture) {
      console.log('warning: texture not found', entityData.texture)
      return;
    }

    // check to see if texture changed / sprite index changed

    let textureUrl = texture.url;
    let spritePosition = texture.sprite || { x: 0, y: 0 };

    if (typeof entityData.texture.frame === 'number') {
      spritePosition = texture.frames[entityData.texture.frame];
      // entityElement.style.backgroundPosition = `${spritePosition.x}px ${spritePosition.y}px`;
    }

    entityElement.style.border = 'none';
    entityElement.style.zIndex = entityData.position.z;
    entityElement.style.borderRadius = '0px';
    // entityElement.style.padding = '1px';

    entityElement.style.background = `url('${textureUrl}')`;
    entityElement.style.backgroundRepeat = 'no-repeat';
    entityElement.style.backgroundPosition  = `${spritePosition.x}px ${spritePosition.y}px`;

    // set background size to entity size
    if (spritePosition.x === 0 && spritePosition.y === 0) {
      // entityElement.style.backgroundSize = `${entityData.width}px ${entityData.height}px`;
    }

    if (!texture.frames) {
      entityElement.style.backgroundSize = `${entityData.width}px ${entityData.height}px`;
      // align background in center no matter the size of the entity
    }

    entityElement.style.zIndex = entityData.position.z;

    if (typeof entityData.texture === 'object' && entityData.texture.sheet) {
      // this.game.updateSprite(entityData.id, entityData.texture.sheet, entityData.texture.sprite);
    }


    if (entityData.style) {
      Object.keys(entityData.style).forEach((key) => {
        entityElement.style[key] = entityData.style[key];
      });
    }

    //
    // Animated sprite, since the texture has a frames array
    //
    // if the array exists and animation is not paused
    if (typeof texture.frames === 'object' /*&& !entityData.texture.animationPaused*/) {
      //console.log('updating', game.tick)
      // console.log('got back texture', spritePosition, texture, spritePosition, entityData)
      // TODO: add back animations
      if (false && game.tick % 5 === 0) { // TODO: custom tick rate
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
          // console.log('spritePosition', spritePosition)
          entityData.texture.frameIndex++;
        }
        entityElement.style.backgroundPosition = `${spritePosition.x}px ${spritePosition.y}px`;


      }

    } else {
      /*
      if (entityData.type !== 'PLAYER') { // for now
        entityElement.style.backgroundSize = `${entityData.width}px ${entityData.height}px`;
        entityElement.style.width = `${entityData.width}px`;
        entityElement.style.height = `${entityData.height}px`;
      }
      */

    }

  }


}