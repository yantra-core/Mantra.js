export default function updateGraphic(entityData) {
  let game = this.game;
  // TODO: move this to common 3D-2.5D transform function(s)
  if (typeof entityData.rotation !== 'undefined' && entityData.rotation !== null) {
    if (typeof entityData.rotation === 'object') {
      // transform 3d to 2.5d
      entityData.rotation = entityData.rotation.x; // might not be best to mutate entityData
    } else {
      entityData.rotation = entityData.rotation;
    }
  }

  const entityElement = document.getElementById(`entity-${entityData.id}`);
  if (entityElement) {
    // Update the entity color
    if (typeof entityData.color !== 'undefined' && entityData.color !== null) {
      // entityData.color is int number here we need a hex
      let hexColor = '#' + entityData.color.toString(16);
      // update the background color
      entityElement.style.background = hexColor;
    }

    if (typeof entityData.position.z === 'number') {
      entityElement.style.zIndex = entityData.position.z;
    }
  
    if (entityData.style) {
      Object.keys(entityData.style).forEach((key) => {
        entityElement.style[key] = entityData.style[key];
      });
    }

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
      // console.log('ttt', texture);
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

    if (entityData.type === 'TEXT' && typeof entityData.text !== 'undefined' && entityData.text !== null) {
      // check that text has changed
      if (entityElement.innerHTML !== entityData.text) {
        entityElement.innerHTML = entityData.text;
      }
      // return this.inflateText(entityData);
    }

    /* TODO: better support for static / less renders
      look at camera position to determine if render of static required
    if (typeof entityData.previousPosition === 'undefined') {
      entityData.previousPosition = entityData.position;
    }

    if (entityData.previousPosition.x !== entityData.position.x || entityData.previousPosition.y !== entityData.position.y) {
      entityData.previousPosition = entityData.position;
      return this.updateEntityPosition(entityElement, entityData);
    }
    else {
      return entityElement;
    }
    */

    return this.updateEntityPosition(entityElement, entityData);


  } else {
    // If the entity element does not exist, create it
    return this.createGraphic(entityData);
  }
}