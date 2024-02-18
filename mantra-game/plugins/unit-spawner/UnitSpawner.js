// UnitSpawner.js - Marak Squires 2024
export default class UnitSpawner {
  static id = 'unit-spawner';
  constructor(config = {}) {
    this.id = UnitSpawner.id;
  }

  init(game) {
    this.game = game;
    this.bindEvents();
    this.game.systemsManager.addSystem('unit-spawner', this);
  }

  build(entityData = {}) {
    // Ensure entityData has a position property
    entityData.position = entityData.position || { x: 0, y: 0 };
  
    // Define default configuration for unitConfig
    const defaultUnitConfig = {
      position: { x: 0, y: 0 },
      size: { width: 4, height: 4 },
      friction: 0.05,
      frictionAir: 0.005,
      frictionStatic: 0.25,
      sprayAngle: Math.PI / 8,
    };

    // entityData.meta = entityData.meta || {};
      // Combine the default configuration with the entityData
    const unitConfig = { ...defaultUnitConfig, ...entityData.unitConfig};

    // console.log('unitConfig', unitConfig)
    // Return the combined entity configuration
    return {
      type: 'UNIT_SPAWNER',
      texture: entityData.texture || 'none',
      meta: { unitConfig },
      update: this.unitSpawnerUpdate.bind(this),
      size: {
        width: 16,
        height: 16,
        depth: 16,
      },
      position: entityData.position
    };
  }
  
  unitSpawnerUpdate(entityData) {
    if (this.game.tick % 10 === 0) {
      // check for any unit-spawner entities
      // get current position of ent from reference
      let position = entityData.position;
      entityData.meta.unitConfig.position = position;
      delete entityData.meta.unitConfig.id; // Remark: Clean clone might be better
      let unit = this.createEntity(entityData.meta.unitConfig || {});
      this.applySprayForce(unit);
    }
  }

  createEntity(entityData = {}) {

    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    // Create the UnitSpawner entity
    const unitSpawner = game.createEntity(this.build(entityData));
  }

  create(entityData = {}) {
    return game.createEntity(this.build(entityData));
  }

  applySprayForce(unitConfig, baseAngle = Math.PI / 8, sprayWidth = Math.PI / 4, forceMagnitude = 0.5) {
    const angleOffset = (Math.random() - 0.5) * sprayWidth; // Random offset within a specified width
    const angle = unitConfig.sprayAngle + angleOffset;
    const force = {
      x: forceMagnitude * Math.cos(angle),
      y: forceMagnitude * Math.sin(angle)
    };
    game.applyForce(unitConfig.id, force);
  }

  bindEvents() {
  }

}

/*
// fount.js - Marak Squires 2023
// Sutra for Generating Units
export default function fountSutra(game, entityId, sprayConfig = { collisionStart : false, collisionEnd : false, collisionActive : false }) {

  let rules = game.createSutra();

  // TODO: custom unit configs for Fount
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
*/