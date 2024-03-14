// UnitSpawner.js - Marak Squires 2024
export default class UnitSpawner {
  static id = 'unit-spawner';

  constructor(config = {}) {
    this.id = UnitSpawner.id;
    this.meta = {
      sprayAngle: Math.PI / 8, // Moved sprayAngle to UnitSpawner.meta
    };
  }

  init(game) {
    this.game = game;
    this.bindEvents();
    this.game.systemsManager.addSystem('unit-spawner', this);
  }

  build(entityData = {}) {
    let game = this.game;
    entityData.position = entityData.position || { x: 0, y: 0, z: 0 };
    const defaultUnitConfig = {
      position: { x: 0, y: 0, z: 0 },
      size: { width: 4, height: 4, depth: 4 },
      friction: 0.05,
      frictionAir: 0.005,
      frictionStatic: 0.25,
      meta: {
        randomColor: true,
      }
    };

    const unitConfig = { ...defaultUnitConfig, ...entityData.unitConfig };

    unitConfig.afterRemoveEntity = function(ent) {
      let parentUnitSpawner = game.data.ents._[ent.owner];
      if (!parentUnitSpawner) {
        return;
      }
      parentUnitSpawner.meta.unitsSpawned -= 1;
      game.updateEntity(ent.owner, {
        meta: {
          unitConfig: parentUnitSpawner.meta.unitConfig
        }
      });
    };

    if (typeof entityData.meta === 'undefined') {
      entityData.meta = {};
    }

    let defaultMeta = {
      unitConfig,
      unitsSpawned: 0, // Initialize unitsSpawned
      maxUnits: 10, // Default max units
      sprayAngle: 0, // Reference sprayAngle from UnitSpawner.meta
    };

    if (typeof entityData.sprayAngle === 'number') {
      defaultMeta.sprayAngle = entityData.sprayAngle;
    }
    if (typeof entityData.maxUnits === 'number') {
      defaultMeta.maxUnits = entityData.maxUnits;
    }
    if (typeof entityData.unitsSpawned === 'number') {
      defaultMeta.unitsSpawned = entityData.unitsSpawned;
    }

    // combine entityData.meta with defaultMeta
    entityData.meta = { ...defaultMeta, ...entityData.meta };
    console.log('using data', entityData)
    return {
      type: 'UNIT_SPAWNER',
      texture: entityData.texture || 'none',
      meta: entityData.meta,
      update: this.unitSpawnerUpdate.bind(this),
      size: { width: 16, height: 16, depth: 16 },
      position: entityData.position,
      ...entityData
    };
  }

  unitSpawnerUpdate(entityData) {
    const unitConfig = entityData.meta.unitConfig;
    if (this.game.tick % 10 === 0 && entityData.meta.unitsSpawned < entityData.meta.maxUnits) {
      let position = entityData.position;
      unitConfig.position = position;
      unitConfig.owner = entityData.id;
      delete unitConfig.id;

      unitConfig.color = entityData.color;

      if (unitConfig.meta.randomColor) {
        unitConfig.color = this.game.randomColor();
      }
      let unit = this.createEntity(unitConfig);
      if (unit) {
        entityData.meta.unitsSpawned += 1;
        this.applySprayForce(unit, entityData.meta.sprayAngle); // Use sprayAngle from entityData.meta
        this.game.updateEntity(entityData.id, {
          color: unitConfig.color,
          meta: {
            unitConfig
          }
        });
      }
    }
  }

  createEntity(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }
    return this.game.createEntity(this.build(entityData));
  }

  create(entityData = {}) {
    return this.createEntity(entityData);
  }

  applySprayForce(unitConfig, sprayAngle, sprayWidth = Math.PI / 4, forceMagnitude = 0.5) {
    let game = this.game;
    const angleOffset = (Math.random() - 0.5) * sprayWidth;
    const angle = sprayAngle + angleOffset;
    const force = {
      x: forceMagnitude * Math.cos(angle),
      y: forceMagnitude * Math.sin(angle)
    };
    game.applyForce(unitConfig.id, force);
  }

  bindEvents() {
  }
}
