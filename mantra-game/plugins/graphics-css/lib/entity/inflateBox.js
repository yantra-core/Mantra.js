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
  
  // entityElement.style.borderRadius = '10px';  // Optional: to make it rounded

  // set default depth based on type
  entityElement.style.zIndex = depthChart.indexOf(entityData.type);

  this.bindEntityEvents(entityData, entityElement);

  // TODO: move to separate file for inflatePart,
  if (entityData.type === 'PART') {
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
    this.bindYCraftEvents(entityData, entityElement);
  }

  // console.log(entityData.type, entityData.name, entityElement.style.zIndex);
  // set border color to black
  entityElement.style.border = '1px solid black';

  entityElement.style.background = hexColor;

  if (entityData.style) {
    Object.keys(entityData.style).forEach((key) => {
      entityElement.style[key] = entityData.style[key];
    });
  }

  if (entityData.type === 'BLOCK' && entityData.kind === 'Tile') {
    // TODO: refactor API
    // tileFlip(entityElement, hexColor, getTexture, entityData);
  } 

  // console.log('entityElement', entityElement)

  this.updateEntityPosition(entityElement, entityData);
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