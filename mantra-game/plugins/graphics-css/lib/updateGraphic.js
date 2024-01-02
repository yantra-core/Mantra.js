export default function updateGraphic(entityData) {

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
    // Update the background sprite if velocity is present
    /*
    if (entityData.type === 'PLAYER' && entityData.velocity && this.game.tick % 10 === 0 && Math.abs(entityData.velocity.x) > 0.001 && Math.abs(entityData.velocity.y) > 0.001) {

      let angle = Math.atan2(entityData.velocity.y, entityData.velocity.x);
      let angleDeg = angle * 180 / Math.PI;

      // Remark: Move this logic to just listen for local entityInput
      // we can revist this for server side prediction later
      // Determine direction based on angle
      let direction = "";
      if (angleDeg >= -45 && angleDeg < 45) {
        direction = "right";
      } else if (angleDeg >= 45 && angleDeg < 135) {
        direction = "down";
      } else if (angleDeg >= -135 && angleDeg < -45) {
        direction = "up";
      } else {
        direction = "left";
      }

      // Assume there's a way to determine whether to use -0 or -1 suffix
      // For simplicity, let's alternate between -0 and -1
      let spriteNumber = Math.round(Math.random()); // Randomly choose 0 or 1
      let spriteClass = `guy-${direction}-${spriteNumber}`;

      // First, clear previous sprite classes if any
      entityElement.classList.remove('guy-down-0', 'guy-down-1', 'guy-up-0', 'guy-up-1', 'guy-right-0', 'guy-right-1', 'guy-left-0', 'guy-left-1');

      // Add the new sprite class
      entityElement.classList.add(spriteClass);

      //console.log('Entity data:', entityData);
      //console.log('Applied class:', spriteClass);
    }
    */


    if (entityData.style) {
      Object.keys(entityData.style).forEach((key) => {
        entityElement.style[key] = entityData.style[key];
      });
    }


    if (entityData.texture /*entityData.type === 'FIRE'*/) {
      // check to see if texture changed / sprite index changed

      let texture = game.getTexture(entityData.texture);
      let textureUrl = texture.url;
      let spritePosition = texture.sprite || { x: 0, y: 0 };
      if (typeof entityData.texture.frame === 'number') {
        spritePosition = texture.frames[entityData.texture.frame];
        entityElement.style.backgroundPosition = `${spritePosition.x}px ${spritePosition.y}px`;
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
            spritePosition = frame;
            entityElement.style.backgroundPosition = `${spritePosition.x}px ${spritePosition.y}px`;
            entityData.frameIndex++;
            // add frame back to end of array
          }
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

    // Update the position of the entity element
    return this.updateEntityPosition(entityElement, entityData);
  } else {
    // If the entity element does not exist, create it
    return this.createGraphic(entityData);
  }
}