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

    let game = this.game;
    entityData.position = entityData.position || { x: 0, y: 0 };

    const defaultUnitConfig = {
      position: { x: 0, y: 0 },
      size: { width: 4, height: 4 },
      friction: 0.05,
      frictionAir: 0.005,
      frictionStatic: 0.25,
      sprayAngle: Math.PI / 8,
      maxUnits: 10, // Default max units
      meta: {
        randomColor: true,
        unitsSpawned: 0 // Initialize unitsSpawned
      }
    };

    const unitConfig = { ...defaultUnitConfig, ...entityData.unitConfig };

    if (typeof unitConfig.meta.unitsSpawned !== 'number') {
      unitConfig.meta.unitsSpawned = 0;
    }

    unitConfig.afterRemoveEntity = function(ent){
      // decrement unitsSpawned for this unitConfig
      // update the owner of this ent with meta
      let parentUnitSpawner = game.data.ents._[ent.owner];
      if (!parentUnitSpawner) {
        return;
      }
      parentUnitSpawner.meta.unitsSpawned -= 1;
      game.updateEntity(ent.owner, {
        meta: {
          unitConfig: parentUnitSpawner.meta.unitConfig
        }
      })
    }

    return {
      type: 'UNIT_SPAWNER',
      texture: entityData.texture || 'none',
      meta: { unitConfig },
      update: this.unitSpawnerUpdate.bind(this),
      size: { width: 16, height: 16, depth: 16 },
      position: entityData.position,
    };
  }
  
  unitSpawnerUpdate(entityData) {
    const unitConfig = entityData.meta.unitConfig;
    if (this.game.tick % 10 === 0 && unitConfig.meta.unitsSpawned < unitConfig.maxUnits) {
      let position = entityData.position;
      unitConfig.position = position;
      unitConfig.owner = entityData.id;
      delete unitConfig.id; // Clean clone might be better

      unitConfig.color = entityData.color;

      if (unitConfig.meta.randomColor) {
        unitConfig.color = this.game.randomColor();
      }
      // TODO: fix this for 3d
      let unit = this.createEntity(unitConfig);
      if (unit) { // Assuming createEntity returns the created unit or null/undefined if not created
        unitConfig.meta.unitsSpawned += 1; // Increment unitsSpawned for this unitConfig
        this.applySprayForce(unit);
        // this needs to update entity.meta.unitConfig.unitsSpawned
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

    // Create the UnitSpawner entity
    const unitSpawner = this.game.createEntity(this.build(entityData));
  }

  create(entityData = {}) {
    return this.game.createEntity(this.build(entityData));
  }

  applySprayForce(unitConfig, baseAngle = Math.PI / 8, sprayWidth = Math.PI / 4, forceMagnitude = 0.5) {
    let game = this.game;
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
