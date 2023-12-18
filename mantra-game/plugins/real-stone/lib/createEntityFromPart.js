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


  // check to see if entity is array, some parts create multiple entities
  if (Array.isArray(entity)) {
    let entityIds = [];
    entity.forEach(e => {
      entityIds.push(e.id);
    });
    part.entities = entityIds;
  } else {
    part.entityId = entity.id;
  }



  if (part.type !== 'Wire') {
    // create a text label for the entity

    let entityCenterX = part.position.x - part.size.width / 4;

    let textLabel = this.game.createEntity({
      type: 'TEXT',
      text: part.type,
      position: {
        x: entityCenterX, // Center horizontally
        y: part.position.y + part.size.height + 10     // Position below the entity
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

  return entity;

}

// TODO: move this to entity code, not graphics code
let partColors = {
  "ElectricalSignal": "#FFD700",
  "Actuator": "#808080",
  "Amplifier": "#00008B",
  "Button": "#FF4500",
  "LaserSensor": "#800080",
  "Latch": "#B8860B",
  "LEDLight": "#00FF00",
  "Mirror": "#C0C0C0",
  "MotionDetector": "#FF69B4",
  "PressureSensor": "#4682B4",
  "Relay": "#A52A2A",
  "Rover": "#8B4513"
}
