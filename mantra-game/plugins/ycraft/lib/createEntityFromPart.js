export default function createEntityFromPart(part, contraption) {

  let game = this.game;
  // create the entity

  let entity;

  function createPartEntity(entityData, part, contraption) {

    //let centerX = part.position.x - part.size.width / 2;
    //let centerY = part.position.y - part.size.height / 2;
    // console.log("placing part on screen position", part.position)

    let defaultConfig = {
      name: part.type,
      type: 'PART',
      color: part.props.color,
      position: part.position,
      width: part.size.width,
      height: part.size.height,
      // texture: 'img/game/tiles/tile-block.png',
      text: part.text || null,
      isStatic: true,
      yCraft: {
        part: part,
        contraption: contraption
      }
    };

    for (let key in entityData) {
      defaultConfig[key] = entityData[key];
    }
    // console.log('defaultConfig', defaultConfig)
    // merge entityData into defaultConfig
    // Object.assign(defaultConfig, entityData);

    entity = game.createEntity(defaultConfig);
    return entity;
  }

  switch (part.type) {
    case 'Wire':
      entity = this.createWire(part, contraption);
      break;

    case 'PressureSensor':

    case 'Rover':
      entity = createPartEntity({
        isStatic: false,
        isSensor: true,
      }, part, contraption)
      break;

    default:
      // Handle non-wire parts
      entity = createPartEntity({}, part, contraption);
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

  // Create a label element, except for wires and displays
  if (part.type !== 'Wire' && part.type !== 'Display') {
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
      style: {
        font: '10px monospace',
      },
      yCraft: {
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
