// TODO: Remove this file and rely on a Sutra instead
// We could also delegate to the part itself from bindEntityEvents.js handlers
export default function bindYCraftEvents(entityData, entityElement) {
  // console.log("bindYCraftEvents", entityData, entityElement)
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
