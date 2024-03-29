// fount.js - Marak Squires 2023
// Sutra for Generating Units
export default function fountSutra(game, entityId, sprayConfig = { collisionStart : false, collisionEnd : false, collisionActive : false }) {

  let rules = game.createSutra();

  // Default configuration for the Fount
  const settings = {
    unitType: 'PARTICLE', // Type of unit to generate
    collisionActive: false, // Whether or not the unit will emit collisionActive actives ( performance hit )
    texture: 'pixel', // Texture for the unit
    color: 0x00ff00, // Color of the unit
    unitSize: { width: 4, height: 4 }, // Size of the unit
    sprayAngle: Math.PI / 8, // Angle of the spray arc (in radians)
    sprayWidth: Math.PI / 4, // Width of the spray arc (in radians)
    forceMagnitude: 0.5, // Magnitude of the force applied to each unit
    ...sprayConfig
  };

  // Function to create a unit
  function createUnit(position) {
    let rgbColor = settings.color;
    // convert from int to rgb
    rgbColor = [(rgbColor >> 16) & 255, (rgbColor >> 8) & 255, rgbColor & 255];
    let rgbColorString = `rgba(${rgbColor.join(',')}, 0.5)`; // Adjust opacity as needed
    return game.createEntity({
      type: settings.unitType,
      collisionActive: sprayConfig.collisionActive,
      collisionEnd: sprayConfig.collisionEnd,
      collisionStart: sprayConfig.collisionStart,
      // texture: settings.texture,
      height: settings.unitSize.height,
      color: settings.color,
      width: settings.unitSize.width,
      position: position,
      friction: 0.05,
      frictionAir: 0.005,
      frictionStatic: 0.25,
      style: {
        backgroundColor: rgbColorString
      },
      isSensor: true
    });
  }

  function applySprayForce(unit, baseAngle = settings.sprayAngle) {
    const angleOffset = (Math.random() - 0.5) * settings.sprayWidth; // Random offset within a specified width
    const angle = baseAngle + angleOffset;
  
    const force = {
      x: settings.forceMagnitude * Math.cos(angle),
      y: settings.forceMagnitude * Math.sin(angle)
    };
    game.applyForce(unit.id, force);
  }
  
  // Rule for generating and spraying units
  rules.if('fountTick').then('fountSpray');
  rules.addCondition('fountTick', (entity, gameState) => entity.id === entityId && gameState.tick % 10 === 0);
  
  rules.on('fountSpray', (context, node, gameState) => {
    // Determine the position of the fount (can be context-dependent)
    const fountPosition = (typeof context !== 'undefined') ? context.position : { x: 0, y: 0 };
    // Create a unit and apply force
    const unit = createUnit(fountPosition);
    applySprayForce(unit);
  });

  return rules;
}