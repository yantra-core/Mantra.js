export default function inflateBox(entityElement, entityData) {
  // For other entities, create a rectangle
  let hexColor = 'white';
  if (typeof entityData.color !== 'undefined' && entityData.color !== null) {
    // entityData.color is int number here we need a hex
    hexColor = '#' + entityData.color.toString(16);
  }

  entityElement.style.width = entityData.width + 'px';
  entityElement.style.height = entityData.height + 'px';
  entityElement.style.borderRadius = '10px';  // Optional: to make it rounded

  if (entityData.type === 'PART' && entityData.name === 'Button') {
    // add pointer cursor for buttons on hover
    entityElement.style.cursor = 'pointer';
    // add click event listener for buttons
    entityElement.addEventListener('click', () => {
      // should call part.press()
      // get the full ent from the game
      let ent = game.getEntity(entityData.id);
      if (ent && ent.realStone && ent.realStone.part.press) {
        ent.realStone.part.press();
      }
    });
  }

  // set border color to black
  entityElement.style.border = '1px solid black';
  entityElement.style.background = hexColor;  // Move this line here
  return entityElement;
}