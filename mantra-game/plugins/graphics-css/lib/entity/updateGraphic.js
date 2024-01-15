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

    if (entityData.type === 'TEXT' && typeof entityData.text !== 'undefined' && entityData.text !== null) {
      // check that text has changed
      if (entityElement.innerHTML !== entityData.text) {
        entityElement.innerHTML = entityData.text;
      }
      // return this.inflateText(entityData);
    }


    // new api for Entity.size
    if (typeof entityData.radius !== 'undefined') {
      // Multiply the radius by 2 to get the diameter for CSS
      let diameter = entityData.radius * 2;
      entityElement.style.width = diameter + 'px';
      entityElement.style.height = diameter + 'px';
    
      // Adjust the position to align with the Matter.js body
      // This moves the element left and up by half its width and height
    }

    // entityElement.style.transition = 'width 1.5s ease, height 1.5s ease';

    if (typeof entityData.width !== 'undefined') {
      entityElement.style.width = entityData.width + 'px';
    }

    if (typeof entityData.height !== 'undefined') {
      entityElement.style.height = entityData.height + 'px';
    }

    if (entityData.style) {
      Object.keys(entityData.style).forEach((key) => {
        entityElement.style[key] = entityData.style[key];
      });
    }
    
    return this.updateEntityPosition(entityElement, entityData);


  } else {
    // If the entity element does not exist, create it
    return this.createGraphic(entityData);
  }
}

/*

export default function updateGraphic(entityData) {
  let game = this.game;

  // Rotation handling with type check
  if (typeof entityData.rotation === 'object' && entityData.rotation !== null) {
    entityData.rotation = entityData.rotation.x;
  }

  const entityElement = document.getElementById(`entity-${entityData.id}`);
  if (entityElement) {
    // Update entity color
    updateEntityColor(entityData, entityElement);
    // Update zIndex
    updateEntityZIndex(entityData, entityElement);
    // Update style
    updateEntityStyle(entityData, entityElement);
    // Update texture
    updateEntityTexture(entityData, entityElement, game);
    // Update text
    updateEntityText(entityData, entityElement);
    // console.log('entityData.previousPosition', entityData.previousPosition, entityData.position)
    // Handling of entity position updates
    // Check if the entity's position has changed
    // this wont work since all graphics needs to move if camera moves
    return this.updateEntityPosition(entityElement, entityData);

  } else {
    // Create the graphic if it doesn't exist
    return this.createGraphic(entityData);
  }
}

const truncate = (value, precision = 0) => { // FPS typically doesn't need decimals
  return Math.round(value);
};


// Function to check if the entity's position has changed
function hasPositionChanged(entityData) {
  // Function to truncate a number to four decimal places
  
  if (!entityData.previousPosition) {
    return true;
  }

  const prevPosX = truncate(entityData.previousPosition.x);
  const prevPosY = truncate(entityData.previousPosition.y);
  const currentPosX = truncate(entityData.position.x);
  const currentPosY = truncate(entityData.position.y);

  // console.log('prevPosX', prevPosX, 'prevPosY', prevPosY, 'currentPosX', currentPosX, 'currentPosY', currentPosY)

  return prevPosX !== currentPosX || prevPosY !== currentPosY;
}

// Separate function to handle color update
function updateEntityColor(entityData, entityElement) {
  if (entityData.color !== undefined && entityData.color !== null) {
    let hexColor = '#' + entityData.color.toString(16);
    entityElement.style.background = hexColor;
  }
}

// Separate function to handle zIndex update
function updateEntityZIndex(entityData, entityElement) {
  if (typeof entityData.position.z === 'number') {
    entityElement.style.zIndex = entityData.position.z;
  }
}

// Separate function to handle style update
function updateEntityStyle(entityData, entityElement) {
  if (entityData.style) {
    Object.keys(entityData.style).forEach((key) => {
      entityElement.style[key] = entityData.style[key];
    });
  }
}

// Separate function to handle texture update
function updateEntityTexture(entityData, entityElement, game) {
  if (entityData.texture) {
    let texture = game.getTexture(entityData.texture);
    let spritePosition = texture.sprite ? texture.sprite : { x: 0, y: 0 };

    if (typeof entityData.texture.frame === 'number') {
      spritePosition = texture.frames[entityData.texture.frame];
    } else if (typeof texture.frames === 'object' && game.tick % 10 === 0) {
      if (typeof entityData.texture.frameIndex === 'undefined') {
        entityData.texture.frameIndex = 0;
      }
      if (entityData.texture.frameIndex >= texture.frames.length) {
        entityData.texture.frameIndex = 0;
      }

      let frame = texture.frames[entityData.texture.frameIndex];
      if (frame) spritePosition = frame;
      entityData.texture.frameIndex++;
    }

    entityElement.style.backgroundPosition = `${spritePosition.x}px ${spritePosition.y}px`;

    // Set background size for non-player entities
    if (entityData.type !== 'PLAYER') {
      entityElement.style.backgroundSize = `${entityData.width}px ${entityData.height}px`;
      entityElement.style.width = `${entityData.width}px`;
      entityElement.style.height = `${entityData.height}px`;
    }
  }
}

// Separate function to handle text update
function updateEntityText(entityData, entityElement) {
  if (entityData.type === 'TEXT' && entityData.text !== undefined && entityData.text !== null) {
    if (entityElement.innerHTML !== entityData.text) {
      entityElement.innerHTML = entityData.text;
    }
  }
}
*/