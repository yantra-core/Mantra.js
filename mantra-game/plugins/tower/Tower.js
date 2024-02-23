// Tower.js - Marak Squires 2024
export default class Tower {
  static id = 'tower';

  constructor(config = {}) {
    this.id = Tower.id;
    this.fireRate = config.fireRate || 100; // Time between shots in game ticks
    this.range = config.range || 200; // Range within which the tower can target and fire
    this.weaponType = config.weaponType || 'bullet'; // Default weapon type
  }

  init(game) {
    this.game = game;
    this.bindEvents();
    this.game.systemsManager.addSystem('tower', this);
  }

  build(entityData = {}) {
    entityData.position = entityData.position || { x: 0, y: 0 };

    // Define default configuration for unitConfig
    // const defaultBulletConfig = game.make().radius(8).build();
    let defaultBulletConfig = {
      radius: 8,
      velocoity: {
        x: 0,
        y: -2
      },
    }
    // entityData.meta = entityData.meta || {};
      // Combine the default configuration with the entityData
    const bulletConfig = { ...defaultBulletConfig, ...entityData.bulletConfig};

    entityData.meta = entityData.meta || {};
    entityData.meta.bulletConfig =  bulletConfig;

    if (typeof entityData.isShooting !== 'undefined') {
      // tower is shooting property
      entityData.meta.isShooting = entityData.isShooting;
    }

    console.log('bulletConfigbulletConfig', bulletConfig)
    return {
      ...entityData,
      type: 'TOWER',
      texture: entityData.texture || 'towerSprite',
      meta: {
        bulletConfig: bulletConfig,
        fireRate: entityData.fireRate || this.fireRate,
        range: this.range,
        isShooting: entityData.meta.isShooting,
        weaponType: this.weaponType,
        lastFired: 0 // Game tick at which the last shot was fired
      },
      update: (entity) => {

        /*
        if (!entity.meta.isShooting) {
          return;
        }
        */
        // shoot a bullet
        let fireRate = entity.meta.fireRate || this.fireRate;
        // fireRate is in ms, convert to game ticks via game.fps
        //console.log('fireRate', fireRate)
        //tickRate = Math.round(tickRate);
        // console.log('tickRate', tickRate, this.game.tick, this.game.tick % tickRate)
        if (this.game.tick % fireRate === 0) {
          /*
          if (entity.meta.unitConfig) {
            this.game.createEntity(entity.meta.unitConfig);
          } else {
            this.game.systems.bullet.fireBullet(entity.id);
          }
          */
         // console.log('entity.meta.bulletConfig', entity)
          this.game.systems.bullet.fireBullet(entity.id, entity.meta.bulletConfig);

        }
        /*
        if (this.game.tick >= entityData.meta.lastFired + this.fireRate) {
          const target = this.findTargetWithinRange(entityData.position, this.range);
          if (target) {
            this.fireWeapon(entityData.position, target);
            entityData.meta.lastFired = this.game.tick;
          }
        }
        */
      },
      findTargetWithinRange: (position, range) => {
        // Implement logic to find the nearest or most suitable target within range
        // This might involve iterating over enemy entities and calculating distances
        // Return the target entity or null if no target is found
      },
      fireWeapon: (position, target) => {
        // Create and configure the weapon entity based on the tower's weaponType
        // For example, if weaponType is 'missile', create a missile entity aimed at the target
        const weaponConfig = {
          position: { ...position },
          target: target.id,
          // Additional weapon-specific configuration
        };
        this.game.createEntity(this.weaponType, weaponConfig); // Assuming game.createEntity can handle entity type and config
      }
    };
  }

  bindEvents() {
    // Bind necessary events for the Tower system
  }
}