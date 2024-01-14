// fount.js - Marak Squires 2023
// Sutra for Generating Units
export default function fountSutra(game, context, sprayConfig = {}) {

  let rules = game.createSutra();

  // Default configuration for the Fount
  const settings = {
    unitType: 'DEFAULT_UNIT', // Type of unit to generate
    texture: 'pixel', // Texture for the unit
    color: 0x00ff00, // Color of the unit
    unitSize: { width: 4, height: 4 }, // Size of the unit
    sprayAngle: Math.PI / 8, // Angle of the spray arc (in radians)
    sprayWidth: Math.PI / 8, // Width of the spray arc (in radians)
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
      // texture: settings.texture,
      height: settings.unitSize.height,
      width: settings.unitSize.width,
      position: position,
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
  rules.addCondition('fountTick', (entity, gameState) => entity.name === context.name && gameState.tick % 10 === 0);
  
  rules.on('fountSpray', (context, node, gameState) => {
    // Determine the position of the fount (can be context-dependent)
    const fountPosition = (typeof context !== 'undefined') ? context.position : { x: 0, y: 0 };
    // Create a unit and apply force
    const unit = createUnit(fountPosition);
    applySprayForce(unit);
  });

  return rules;
}