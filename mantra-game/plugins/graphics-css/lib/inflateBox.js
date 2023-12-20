const depthChart = [
  'background',
  'border',
  'wire',
  'part',
  'PLAYER',
  'BLOCK'
];

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

  // set default depth based on type
  entityElement.style.zIndex = depthChart.indexOf(entityData.type);
  // console.log('inflateBox', entityData.type, entityElement.style.zIndex)

  if (entityData.type === 'PART') {

    if (entityData.name === 'Wire') {
      // set a low z-index for wires
      entityElement.style.zIndex = depthChart.indexOf('wire');
    } else {
      // set 1000 z-index for parts
      entityElement.style.zIndex = depthChart.indexOf('part');
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
      console.log(ev.target, entityData.id, entityData.type, entityData)
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

  // set border color to black
  entityElement.style.border = '1px solid black';
  entityElement.style.background = hexColor;  // Move this line here
  return entityElement;
}