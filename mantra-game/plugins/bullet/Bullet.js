// Bullet.js - Marak Squires 2023
class Bullet {
  static id = 'bullet';
  constructor(config = {}) {
    this.id = Bullet.id;
    this.bulletCount = 0;
    this.redGlowMaterial = null; // Used for caching the material
    this.speed = config.speed || 22; // or 22?
    this.direction = config.direction || { x: 0, y: 1 };
    this.damage = config.damage || 30;
    this.lifetime = config.lifetime || 2000;
    this.fireRate = config.fireRate || 200;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('bullet', this);
  }

  update() {} // not used, physics engine updates bullets based on velocity

  fireBullet(entityId) {

    let entity = this.game.getEntity(entityId);
    let actionRateLimiterComponent = this.game.components.actionRateLimiter;
    let lastFired = actionRateLimiterComponent.getLastActionTime(entityId, 'fireBullet');
    let currentTime = Date.now();
    
    if (currentTime - lastFired < this.fireRate) {
      // console.log('Rate limit hit for entity', entityId, ', cannot fire yet');
      return;
    }
  
    actionRateLimiterComponent.recordAction(entityId, 'fireBullet');
    let playerPos = entity.position;
    let playerRotation = entity.rotation; // in radians

    if (!playerPos) {
      // client might not have the position or rotation component, don't client-side predict
      console.log('no player data available');
      return;
    }

    // Distance in front of the player where the bullet should start
    let distanceInFront = 100; // TODO: make this a config

    if (typeof playerRotation === 'undefined') {
      playerRotation = 0; // this should have a default
    }

    // convert to 3d if rotation object
    if (typeof playerRotation === 'object') {
      playerRotation = playerRotation.z;
    }

    // Place the bullet in front of the player
    let bulletStartPosition = {
      x: playerPos.x + distanceInFront * Math.sin(playerRotation),
      y: playerPos.y + distanceInFront * -Math.cos(playerRotation)
    };

    // Compute the bullet's direction based on player's rotation
    const directionX = Math.sin(playerRotation);
    const directionY = -Math.cos(playerRotation);

    this.bulletCount++;
    const bulletDirectionConfig = {
      type: 'BULLET',
      mass: 1,
      position: bulletStartPosition,
      lifetime: this.lifetime,
      owner: entityId,
      rotation: playerRotation,
      isSensor: true,
      velocity: {
        x: directionX * this.speed,
        y: directionY * this.speed
      },
      radius: 33,
      damage: 10,
    };
    // console.log('using bulletDirectionConfig', bulletDirectionConfig)
    this.game.createEntity(bulletDirectionConfig);

  }

  applyTemporaryGlowEffect(entity) {

    if (this.isPlayerAlreadyGlowing(entity)) {
      return; // Skip if the player is already glowing
    }

    let originalMaterial = entity.mesh.material;
    let redGlowMaterial = this.getRedGlowMaterial();

    entity.mesh.material = redGlowMaterial;

    setTimeout(() => {
      if (entity.mesh.material === redGlowMaterial) {
        entity.mesh.material = originalMaterial;
      }
    }, 500);
  }

  getRedGlowMaterial() {
    if (!this.redGlowMaterial) {
      // TODO: should not have direct calls to babylon here!
      this.redGlowMaterial = new BABYLON.StandardMaterial("redGlow", this.scene);
      this.redGlowMaterial.emissiveColor = new BABYLON.Color3(1, 0, 0);
    }
    return this.redGlowMaterial;
  }

  isPlayerAlreadyGlowing(entity) {
    return entity.graphics['graphics-babylon'].material && entity.graphics['graphics-babylon'].material.name === "redGlow";
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
        console.log('Bullet.handleCollision no entity found. Skipping...', entityA, entityB);
        return;
      }

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

      // Check if bullets have the same owner
      if ((entityA.type === 'BULLET' || entityB.type === 'BULLET') && entityA && entityB && entityA.owner === entityB.owner) {
        // console.log("SAME OWNER", entityA.owner, entityB.owner)
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
      if (entityA.type === 'BULLET' && npcTypes.indexOf(entityB.type) !== -1) {
        entityB.health -= entityA.damage || 10;
        // console.log('NPC health', entityB, entityB.health)
        this.game.components.health.set(entityIdB, entityB.health);
        this.game.removeEntity(entityIdA);
        return;
      }
      if (npcTypes.indexOf(entityA.type) !== -1 && entityB.type === 'BULLET') {
        entityA.health -= entityB.damage || 10;
        // console.log('NPC health', entityA,  entityA.health)
        this.game.components.health.set(entityIdA, entityA.health);
        this.game.removeEntity(entityIdB);
        return;
      }

    }
  }
}

export default Bullet;
