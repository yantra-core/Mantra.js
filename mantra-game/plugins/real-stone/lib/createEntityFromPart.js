export default function createEntityFromPart(part, contraption) {
  let game = this.game;

  // create the entity

  let entity;

  switch (part.type) {
    case 'Wire':
      entity = this.createWire(part, contraption);

      break;
    case 'Rover':
      entity = this.game.createEntity({
        name: part.type,
        type: 'PART',
        color: part.props.color,
        position: part.position,
        width: part.size.width,
        height: part.size.height,
        isStatic: false,
        isSensor: true,
        realStone: {
          part: part,
          contraption: contraption
        }
      });
      break;

    default:

      // Handle non-wire parts
      entity = this.game.createEntity({
        name: part.type,
        type: 'PART',
        color: part.props.color,
        position: part.position,
        width: part.size.width,
        height: part.size.height,
        isStatic: true,
        realStone: {
          part: part,
          contraption: contraption
        }
      });
      break;
  }

  part.entityId = entity.id;


  if (part.type !== 'Wire') {
    // create a text label for the entity
    let textLabel = this.game.createEntity({
      type: 'TEXT',
      text: part.type,
      position: {
        x: part.position.x, // Center horizontally
        y: part.position.y + part.size.height / 2     // Position below the entity
      },
      width: part.size.width,
      height: part.size.height,
      isStatic: true,
      isSensor: true,
      realStone: {
        part: part,
        contraption: contraption
      }
    });

  }


}