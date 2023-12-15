export default function createEntityFromPart (part, contraption) {

  if (part.type === 'LEDLight') {
    part.on('on', () => {
      // set the tint of the entity to yellow
      console.log('LEDLight on', part);
      this.game.updateEntity({ id: part.entityId, color: 0xffff00 });
    });
    part.on('off', () => {
      // set the tint of the entity to yellow
      console.log('LEDLight off', part);
      this.game.updateEntity({ id: part.entityId, color: 0xffffff });
    });
  }

  if (part.type === 'MotionDetector') {
    part.on('on', () => {
      // set the tint of the entity to yellow
      console.log('MotionDetector on', part);
      this.game.updateEntity({ id: part.entityId, color: 0xffff00 });
    });
    part.on('off', () => {
      // set the tint of the entity to yellow
      console.log('MotionDetector off', part);
      this.game.updateEntity({ id: part.entityId, color: 0xffffff });
    });
  }

  if (part.type === 'Repeater') {
    part.on('repeat', () => {
      // set the tint of the entity to yellow
      console.log('Repeater on', part);
      // TODO: should pulse? is not binary on / off state
      this.game.updateEntity({ id: part.entityId, color: 0xf00f00 });
    });
  }

  if (part.type === 'PressureSensor') {
    part.on('trigger', () => {
      // set the tint of the entity to yellow
      console.log('PressureSensor on', part);
      this.game.updateEntity({ id: part.entityId, color: 0xffff00 });
    });
  }

  if (part.type === 'Button') {
    part.on('press', () => {
      // set the tint of the entity to yellow
      console.log('Button on', part);
      this.game.updateEntity({ id: part.entityId, color: 0xffff00 });
    });
    part.on('release', () => {
      // set the tint of the entity to yellow
      console.log('Button off', part);
      this.game.updateEntity({ id: part.entityId, color: 0xffffff });
    });
  }


  let entity;
  if (part.type === 'Wire') {
    console.log('wire part, render string', part);
  
    // Create a line segment for each unique connection pair
    part.inputs.forEach(input => {
      part.outputs.forEach(output => {
        // Calculate midpoint, angle, and length for the segment
        const midpoint = { 
          x: (input.position.x + output.position.x) / 2, 
          y: (input.position.y + output.position.y) / 2,
          z: (input.position.z + output.position.z) / 2
        };

        const angle = Math.atan2(output.position.y - input.position.y, output.position.x - input.position.x);
        const length = Math.hypot(output.position.x - input.position.x, output.position.y - input.position.y);
        console.log('mmmmmmmmmmmmmmmmmmmm', midpoint, angle, length)
  
        entity = this.game.createEntity({
          type: 'PART', // Assuming LINE is a type for thin boxes
          position: midpoint,
          width: length,
          height: 1, // Assuming height is minimal for a line
          angle: angle,
          isStatic: true,
          realStone: {
            part: part,
            contraption: contraption
          }
        });
        // TODO: this might be an issue with multiple wires
        part.entityId = entity.id;

      });
    });
  } else {
    // Handle non-wire parts
    entity = this.game.createEntity({
      type: 'PART',
      position: part.position,
      width: part.size.width,
      height: part.size.height,
      isStatic: true,
      realStone: {
        part: part,
        contraption: contraption
      }
    });
    part.entityId = entity.id;

  }



}