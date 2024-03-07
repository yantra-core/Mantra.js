// Bullet.js - Marak Squires 2023
class Bullet {
  static id = 'bullet';
  constructor(config = {}) {
    this.id = Bullet.id;

    this.bulletCount = 0;
    this.redGlowMaterial = null; // Used for caching the material
    this.speed = config.speed || 3; // or 22?
    this.direction = config.direction || { x: 0, y: 1 };
    this.damage = config.damage || 30;
    this.lifetime = config.lifetime || 2000;
    this.fireRate = config.fireRate || 200;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('bullet', this);
  }

  build(entityData = {}) {
    // Define default values
    const defaults = {
      type: 'BULLET',
      mass: 1,
      collisionStart: true,
      lifetime: this.lifetime,
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'arrow'
      },
      velocity: {
        x: 0.5,
        y: 0.5
      },
      isSensor: true,
      width: 16,
      height: 16,
      radius: 8, // Assuming a default radius
      damage: 10 // Assuming default damage
    };

    // Merge defaults with entityData, ensuring nested objects like position and velocity are merged correctly
    const mergedConfig = {
      ...defaults,
      ...entityData,
      position: { ...defaults.position, ...entityData.position },
      velocity: { ...defaults.velocity, ...entityData.velocity },
      texture: { ...defaults.texture, ...entityData.texture },
      style: { ...defaults.style, ...entityData.style }
    };

    // Handle specific properties like rotation and speed, if they're not part of defaults
    if (entityData.rotation !== undefined) {
      mergedConfig.rotation = entityData.rotation;
    }
    if (entityData.speed !== undefined) {
      mergedConfig.speed = entityData.speed;
    }

    // Return the merged configuration
    return mergedConfig;
  }


  update() { } // not used, physics engine updates bullets based on velocity

  fireBullet(entityId, bulletConfig = {}) {
    let entity = this.game.getEntity(entityId);

    if (!entity) {
      console.log('Bullet.fireBullet no entity found for id', entityId);
      return;
    }

    let actionRateLimiterComponent = this.game.components.actionRateLimiter;
    let lastFired = actionRateLimiterComponent.getLastActionTime(entityId, 'fireBullet');
    let currentTime = Date.now();

    if (currentTime - lastFired < this.fireRate) {
      // console.log('Rate limit hit for entity', entityId, ', cannot fire yet');
      return;
    }

    actionRateLimiterComponent.recordAction(entityId, 'fireBullet');
    let playerPos = entity.position;
    let playerRotation = entity.rotation || 0; // Ensure there's a default value for rotation

    // Convert to 3D rotation if necessary
    playerRotation = typeof playerRotation === 'object' ? playerRotation.z : playerRotation;

    // Compute the bullet's direction based on player's rotation
    const directionX = Math.sin(playerRotation);
    const directionY = -Math.cos(playerRotation);

    // Place the bullet in front of the player
    let bulletStartPosition = {
      x: playerPos.x + directionX * 16, // Assuming distanceInFront is 16
      y: playerPos.y + directionY * 16,
      z: 1 // Assuming a default Z position
    };

    this.bulletCount++;
    const defaultBulletConfig = {
      type: 'BULLET',
      mass: 1,
      collisionStart: true,
      position: bulletStartPosition,
      lifetime: this.lifetime,
      texture: bulletConfig.texture || {
        sheet: 'loz_spritesheet',
        sprite: 'arrow'
      },
      owner: entityId,
      rotation: playerRotation,
      isSensor: true,
      velocity: {
        x: directionX * this.speed,
        y: directionY * this.speed
      },
      width: 16,
      height: 16,
      radius: 8, // Assuming a default radius
      damage: 10 // Assuming default damage
    };

    // Merge the bulletConfig into the defaultBulletConfig
    const mergedBulletConfig = Object.assign({}, defaultBulletConfig, bulletConfig);

    if (bulletConfig.velocity) {
      mergedBulletConfig.velocity = {};
      mergedBulletConfig.velocity.x = bulletConfig.velocity.x;
      mergedBulletConfig.velocity.y = bulletConfig.velocity.y;
    }

    // Create the bullet entity with the merged configuration
    return this.game.createEntity(mergedBulletConfig);
  }

  handleCollision(pair, bodyA, bodyB) {
    if (bodyA.myEntityId && bodyB.myEntityId) {
      const entityIdA = bodyA.myEntityId;
      const entityIdB = bodyB.myEntityId;
      const entityA = this.game.getEntity(entityIdA);
      const entityB = this.game.getEntity(entityIdB);

      // entityA is player ( for now )
      // console.log('types', entityA.type, entityB.type);
      if (!entityA || !entityB) {
        //console.log('Bullet.handleCollision no entity found. Skipping...', entityA, entityB);
        return;
      }
      // console.log('Bullet.handleCollision', entityIdA, entityIdB, entityA.owner, entityB.owner);

      if (entityA.type !== 'BULLET' && entityB.type !== 'BULLET') {
        // console.log('neither is a bullet. Skipping...');
        return;
      }

      //
      // Bullets are destroyed if they hit a BORDER
      //
      if (entityA.type === 'BULLET' && entityB.type === 'BORDER') {
        // destroy the bullet if it hits a border wall
        this.game.removeEntity(entityIdA);
        return;
      }
      if (entityA.type === 'BORDER' && entityB.type === 'BULLET') {
        // destroy the bullet if it hits a border wall
        this.game.removeEntity(entityIdB);
        return;
      }

      // TODO: collision groups for TileSets
      if (entityA.type === 'BULLET' && entityB.type === 'TILE') {

        // for now, if tile has health, destroy it
        if (entityB.kind !== 'bush') {
          return;
        }
        this.game.removeEntity(entityB.id);
        this.game.removeEntity(entityA.id);
        return;
      }
      if (entityA.type === 'TILE' && entityB.type === 'BULLET') {
        if (entityA.kind !== 'bush') {
          return;
        }
        this.game.removeEntity(entityA.id);
        this.game.removeEntity(entityB.id);
        return;
      }

      //
      // Bullets are destroyed if they hit a BLOCK
      //
      if (entityA.type === 'BULLET' && entityB.type === 'BLOCK') {
        //this.game.removeEntity(entityIdA);
        return;
      }
      if (entityA.type === 'BLOCK' && entityB.type === 'BULLET') {
        //this.game.removeEntity(entityIdB);
        return;
      }

      // specific cancel of bullets to owner
      if (entityA.type === 'BULLET' && entityB.id === entityA.owner) {
        return;
      }
      if (entityB.type === 'BULLET' && entityA.id === entityB.owner) {
        return;
      }

      // general cancel of all collisions between siblings
      if (entityA.owner === entityB.owner) {
        // console.log('bullet owner collision', entityIdA, entityIdB);
        // pair.isActive = false;
        return;
      }

      // console.log('bullet collides', entityIdA, entityIdB);

      if (entityA && entityA.id !== entityB.owner) {

        if (this.game.systems.xstate) {
          let xStateSystem = this.game.systems.xstate;
          xStateSystem.sendEvent('entity::damage', { name: entityA.name, damage: this.damage });
        }

        /* TODO: move this to BabylonGraphics and Graphics Plugins
        if (entityA.type === 'PLAYER') {
          let playerGraphics = entityA.graphics;
          if (playerGraphics) {
            this.applyTemporaryGlowEffect(entityA);
          }
        }

        let mesh = entityB.mesh;
        // Before disposing of the bullet mesh
        if (mesh) {
          // TODO: should *not* have direct calls to babylon here!
          // Create a particle system for the bullet explosion
          let particleSystem = new BABYLON.ParticleSystem("particles", 2000, this.scene);
          particleSystem.emitter = mesh.position; // The bullet's last position
          particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", this.scene); // Adjust with your texture

          // Set the particle system's appearance and behavior
          particleSystem.color1 = new BABYLON.Color4(1, 0.5, 0, 1.0);
          particleSystem.color2 = new BABYLON.Color4(1, 0.5, 0, 1.0);
          particleSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);
          particleSystem.minSize = 0.1 * 10;
          particleSystem.maxSize = 0.5 * 10;
          particleSystem.minLifeTime = 0.2 * 10;
          particleSystem.maxLifeTime = 0.4 * 10;
          particleSystem.emitRate = 1000;
          particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
          particleSystem.minEmitPower = 1;
          particleSystem.maxEmitPower = 3;
          particleSystem.updateSpeed = 0.01;

          // Start the particle system
          particleSystem.start();

          // Dispose of the particle system after a short time
          setTimeout(() => {
            particleSystem.dispose();
          }, 1000); // Adjust time as necessary

          // Dispose the bullet mesh
          mesh.dispose();
        }
        */
        //game.systems.health.applyDamage(entityIdB, bulletA.damage);
        //this.game.removeEntity(entityIdB);
      }

      //
      // Bullets are destroyed if hit an NPC
      //
      let npcTypes = ['NPC', 'BOSS', 'SPAWNER'];
      // console.log("checking ", entityA.type, entityB.type, npcTypes)
      // if (entityA.type === 'BULLET' && npcTypes.indexOf(entityB.type) !== -1) {
      if (entityA.type === 'BULLET' && typeof entityB.health === 'number') {
        entityB.health -= entityA.damage || 10;
        // console.log('NPC health', entityB, entityB.health)
        this.game.components.health.set(entityIdB, entityB.health);
        this.game.removeEntity(entityIdA);
        if (entityB.health <= 0) {
          this.game.removeEntity(entityIdB);
        }
        return;
      }
      // if (npcTypes.indexOf(entityA.type) !== -1 && entityB.type === 'BULLET') {
      if (typeof entityA.health === 'number' && entityB.type === 'BULLET') {
        entityA.health -= entityB.damage || 10;
        // console.log('NPC health', entityA,  entityA.health)
        this.game.components.health.set(entityIdA, entityA.health);
        this.game.removeEntity(entityIdB);
        if (entityA.health <= 0) {
          this.game.removeEntity(entityIdA);
        }
        return;
      }

    }
  }
}

export default Bullet;
