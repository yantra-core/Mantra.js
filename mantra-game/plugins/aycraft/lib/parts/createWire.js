export default function createWire(part, contraption) {
  let entities = []; // Store entities for each wire segment
  // console.log('wire part, render', part);

  // Create a line segment (thin box) for each unique connection pair
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

      // Create a thin box to represent the line
      const boxWidth = length;
      const boxHeight = 3; // A small height to make it look like a line

      // console.log('creating box', midpoint, angle, boxWidth, boxHeight)
      let entity = this.game.createEntity({
        name: part.type,
        isSensor: true,
        type: 'PART', // Use PART type for the thin box
        position: midpoint,
        width: boxWidth,
        height: boxHeight,
        rotation: angle,
        isStatic: true,
        ayCraft: {
          part: part,
          contraption: contraption
        }
      });

      entities.push(entity);
    });
  });
  // console.log('CREATED', entities)
  return entities; // Return all created entities
}
