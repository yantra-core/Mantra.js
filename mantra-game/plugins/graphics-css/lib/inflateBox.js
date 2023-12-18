export default function inflateBox(entityElement, entityData) {
  let game = this.game;
  // For other entities, create a rectangle
  let hexColor = 'white';
  if (typeof entityData.color !== 'undefined' && entityData.color !== null) {
    // entityData.color is int number here we need a hex
    hexColor = '#' + entityData.color.toString(16);
  }

  entityElement.style.width = entityData.width + 'px';
  entityElement.style.height = entityData.height + 'px';
  entityElement.style.borderRadius = '10px';  // Optional: to make it rounded

  if (entityData.type === 'PART' ) {

    // add pointer cursor for buttons on hover
    entityElement.style.cursor = 'pointer';

    // add hover state with 3d drop shadow effect
    // TODO: css?
    entityElement.addEventListener('mouseover', () => {
      entityElement.style.boxShadow = '5px 5px 10px rgba(0,0,0,0.5)';
    });
    entityElement.addEventListener('mouseout', () => {
      entityElement.style.boxShadow = '';
    });

    // add click event listener for buttons
    // TODO: could move rovers mouse over action instead for toggle, etc, customize per part
    // mouse down event, 
    entityElement.addEventListener('pointerdown', (ev) => {
      console.log(ev.target, entityData.id, entityData.type, entityData)
      // should call part.press()
      // get the full ent from the game
      let ent = game.getEntity(entityData.id);
      if (ent && ent.realStone && ent.realStone.part.press) {
        console.log("pressing", ent.realStone.part)
        ent.realStone.part.press();
      }

      // TODO: remove this line
      if (ent && ent.realStone && ent.realStone.part.toggleFn) {
        console.log('toggleFn', ent.realStone.part.toggleFn)
        ent.realStone.part.toggleFn();
      }
      if (ent && ent.realStone && ent.realStone.part.toggle) {
        console.log('toggle', ent.realStone.part.toggle)
        ent.realStone.part.toggle();
      }


      if (ent && ent.realStone && ent.realStone.part.trigger) {
        console.log('trigger', ent.realStone.part.trigger)
        ent.realStone.part.trigger();
      }

      /*
      if (ent && ent.realStone && ent.realStone.part.toggle) {
        ent.realStone.part.toggle();
      }
      */
    });
    entityElement.addEventListener('pointerup', (ev) => {
      // console.log(ev.target, entityData.id, entityData.type, entityData)
      // should call part.press()
      // get the full ent from the game
      let ent = game.getEntity(entityData.id);
      // TODO: Button type only?
      if (ent && ent.realStone && ent.realStone.part.release) {
        ent.realStone.part.release();
      }
    });

  }

  // set border color to black
  entityElement.style.border = '1px solid black';
  entityElement.style.background = hexColor;  // Move this line here
  return entityElement;
}