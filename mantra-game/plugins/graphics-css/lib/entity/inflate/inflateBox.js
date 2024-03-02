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
  //entityElement.style.zIndex = depthChart.indexOf(entityData.type);
  // console.log('setting position', entityData.z, entityData.type, entityData.texture)
  entityElement.style.zIndex = entityData.position.z;

  // Remark: No longer binding events directly to entity, instead delegating from Mouse.js
  // this.bindEntityEvents(entityData, entityElement);

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
    //  entityElement.style.cursor = 'pointer';
    this.bindYCraftEvents(entityData, entityElement);
  }

  // console.log(entityData.type, entityData.name, entityElement.style.zIndex);
  // set border color to black
  console.log(entityElement.style.border)
  entityElement.style.border = entityElement.style.border || '1px solid black';


  entityElement.style.background = hexColor;

  if (entityData.style) {
    Object.keys(entityData.style).forEach((key) => {
      entityElement.style[key] = entityData.style[key];
    });
  }

  // console.log('entityElement', entityElement)

  this.updateEntityPosition(entityElement, entityData);
  return entityElement;
}