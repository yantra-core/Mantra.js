export default function inflateBox(entityElement, entityData) {

  // console.log('inflating entity', entityData.type, entityData.name)

  let game = this.game;

  let getTexture = game.getTexture;

  let depthChart = this.depthChart;
  // For other entities, create a rectangle
  let hexColor = 'white';
  if (typeof entityData.color !== 'undefined' && entityData.color !== null) {
    // entityData.color is int number here we need a hex
    hexColor = '#' + entityData.color.toString(16);
  }

  if (typeof entityData.radius === 'number') {
    entityElement.style.width = entityData.radius + 'px';
    entityElement.style.height = entityData.radius + 'px';
  } else {
    entityElement.style.width = entityData.width + 'px';
    entityElement.style.height = entityData.height + 'px';
  }

  entityElement.style.borderRadius = '10px';  // Optional: to make it rounded

  // set default depth based on type
  entityElement.style.zIndex = depthChart.indexOf(entityData.type);

  // console.log('inflateBox', entityData.type, entityElement.style.zIndex)
  entityElement.addEventListener('pointerdown', (ev) => {
    //console.log(ev.target, entityData.id, entityData.type, entityData)
    // get the full ent from the game
    let ent = game.getEntity(entityData.id);
    game.emit('pointerDown', ent, ev);
  });

  entityElement.addEventListener('pointerup', (ev) => {
    //console.log(ev.target, entityData.id, entityData.type, entityData)
    // get the full ent from the game
    let ent = game.getEntity(entityData.id);
    game.emit('pointerUp', ent, ev);
  });

  entityElement.addEventListener('pointermove', (ev) => {
    //console.log(ev.target, entityData.id, entityData.type, entityData)
    // get the full ent from the game
    let ent = game.getEntity(entityData.id);
    game.emit('pointerMove', ent, ev);
  });


  // TODO: move to separate file for inflatePart,
  // move this code to CSSGraphics switch case
  if (entityData.type === 'PART') {
    // console.log("SUPER INFLATE")
    // TODO: part.kind, not name, name is the individual part name user defined
    switch (entityData.name) {

      case 'Wire':
        entityElement.style.zIndex = -1;
        break

      case 'Display':
        entityElement.style.zIndex = -1;
        break

      default:
        // set 1000 z-index for parts
        entityElement.style.zIndex = depthChart.indexOf('PART');
        break

    }

    // add pointer cursor for buttons on hover
    entityElement.style.cursor = 'pointer';

    // add hover state with 3d drop shadow effect
    entityElement.addEventListener('mouseover', () => {
      entityElement.style.boxShadow = '5px 5px 10px rgba(0,0,0,0.5)';
      // get the full ent from the game
      let ent = game.getEntity(entityData.id);
      // delgate based on part type name
      let partName = ent.yCraft.part.name;
      let partType = ent.yCraft.part.type;
      let part = ent.yCraft.part;
      if (partType === 'MotionDetector') {
        // console.log('MotionDetector', part);
        ent.yCraft.part.onFn();
      }
    });

    entityElement.addEventListener('mouseout', () => {
      entityElement.style.boxShadow = '';
    });

    entityElement.addEventListener('pointerdown', (ev) => {
      // console.log(ev.target, entityData.id, entityData.type, entityData)
      // get the full ent from the game
      let ent = game.getEntity(entityData.id);
      // delgate based on part type name
      let partName = ent.yCraft.part.name;
      let partType = ent.yCraft.part.type;
      let part = ent.yCraft.part;
      if (partType === 'Button') {
        ent.yCraft.part.press();
      }
      // LEDLight, Latch, Amplifier, etc
      if (ent && ent.yCraft && ent.yCraft.part.toggle) {
        ent.yCraft.part.toggle();
      }

    });
    entityElement.addEventListener('pointerup', (ev) => {
      // console.log(ev.target, entityData.id, entityData.type, entityData)
      // get the full ent from the game
      let ent = game.getEntity(entityData.id);
      // delgate based on part type name
      let partName = ent.yCraft.part.name;
      let partType = ent.yCraft.part.type;
      if (partType === 'Button') {
        if (ent && ent.yCraft && ent.yCraft.part.release) {
          ent.yCraft.part.release();
        }
      }
    });

  }
  // console.log(entityData.type, entityData.name, entityElement.style.zIndex);
  // set border color to black
  entityElement.style.border = '1px solid black';
  if (getTexture(entityData.texture)) {
    entityElement.style.border = 'none';
    entityElement.style.zIndex = entityData.position.z;
    entityElement.style.borderRadius = '0px';
    // entityElement.style.padding = '1px';
    // optional tile flip CSS ( not great for performance better to use sprite animations )
    if (entityData.type === 'BLOCK' && entityData.kind === 'Tile') {
      // TODO: refactor API
      tileFlip(entityElement, hexColor, getTexture, entityData);
    } else {
      let texture = getTexture(entityData.texture);
      let textureUrl = texture.url;
      let spritePosition = texture.sprite || { x: 0, y: 0 };

      //console.log("SETTING TEXTURE", textureUrl, texture, spritePosition)
      //console.log('entityData', entityData)
      // console.log('got back texture', textureUrl, texture, spritePosition)
      // TODO: move this closure
      // rendering a texture without tile
      // console.log('going to set texture', entityData.texture, getTexture(entityData.texture))
      entityElement.style.background = `url('${textureUrl}')`;
      entityElement.style.backgroundRepeat = 'no-repeat';
      entityElement.style.backgroundPosition = 'center';
      // entityElement.style.border = 'solid'
      //entityElement.style.backgroundPosition  = `${spritePosition.x}px ${spritePosition.y}px`;
      // entityElement.style.backgroundPosition = '-208px -544px';
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

    }

  } else {
    entityElement.style.background = hexColor;
  }

  // console.log('entityElement', entityElement)

  return entityElement;
}


function tileFlip(entityElement, hexColor, getTexture, entityData) {

  let texture = getTexture(entityData.texture);
  // Calculate animation duration based on X and Y coordinates
  let duration = Math.abs(entityData.position.x) + Math.abs(entityData.position.y);
  duration = duration / 500; // Divide by 1000 to get a duration in seconds

  // cap duration at min of 0.5
  duration = Math.max(duration, 0.1);
  duration = Math.min(duration, 3.3);

  // Create a wrapper element for the flip effect
  const flipWrapper = document.createElement('div');
  flipWrapper.style.position = 'relative';
  flipWrapper.style.width = '100%';
  flipWrapper.style.height = '100%';
  flipWrapper.style.perspective = '1000px'; // Set the perspective for the 3D effect

  // Create the front and back faces of the tile
  const frontFace = document.createElement('div');
  frontFace.style.position = 'absolute';
  frontFace.style.width = '100%';
  frontFace.style.height = '100%';
  frontFace.style.backfaceVisibility = 'hidden'; // Hide the back face during the animation
  frontFace.style.animation = `flip ${duration}s ease`; // Set the animation using keyframes
  frontFace.style.background = `url('${texture.url}')`;
  frontFace.style.backgroundRepeat = 'no-repeat';
  frontFace.style.backgroundSize = 'cover';

  const backFace = document.createElement('div');
  backFace.style.position = 'absolute';
  backFace.style.width = '100%';
  backFace.style.height = '100%';
  backFace.style.backfaceVisibility = 'hidden'; // Hide the back face during the animation
  backFace.style.animation = `flip ${duration}s ease`; // Set the animation using keyframes
  backFace.style.transform = 'rotateY(180deg)'; // Initial rotation for the back face, flipped
  backFace.style.background = hexColor;

  // Append front and back faces to the wrapper
  flipWrapper.appendChild(frontFace);
  flipWrapper.appendChild(backFace);

  // Append the wrapper to the entityElement
  entityElement.appendChild(flipWrapper);

  // Remove the flipWrapper after animation is complete
  flipWrapper.addEventListener('animationend', () => {
    //entityElement.background = 
    entityElement.style.background = `url('${texture.url}')`;
    entityElement.style.backgroundRepeat = 'no-repeat';
    entityElement.style.backgroundSize = 'cover';

    // clear animations styles
    frontFace.style.animation = '';
    frontFace.style.transform = '';
    backFace.style.animation = '';
    backFace.style.transform = '';

    //flipWrapper.removeChild(frontFace);
    //flipWrapper.removeChild(backFace);
    if (entityElement) {
      //entityElement.removeChild(flipWrapper);

    }
    flipWrapper.remove();
  });

}