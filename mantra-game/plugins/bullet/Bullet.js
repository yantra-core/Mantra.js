// BulletPlugin?
// TODO: move this all into BulletPlugin

class BulletPlugin {
  constructor(config = {}) {
    this.name = 'BulletPlugin';
    this.bulletCount = 0;
    this.redGlowMaterial = null; // Used for caching the material
    this.speed = config.speed || 22; // or 22?
    this.direction = config.direction || { x: 0, y: 1 };
    this.damage = config.damage || 10;
    this.lifetime = config.lifetime || 2000;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('bullet', this);
  }

  update() {
    for (let entityId in this.game.components.position) {
      const bullet = this.game.getComponent(entityId, 'BulletComponent');
      if (bullet) {
        const position = this.game.getComponent(entityId, 'position');
        const velocity = this.game.getComponent(entityId, 'velocity'); // Get the bullet's velocity

        if (position && velocity) {
          // Movement and physics update logic goes here
        }
      }
    }
  }

  fireBullet(entityId) {

    console.log(entityId, this.game.components.position)
    let player = this.game.getEntity(entityId);


    let playerPos = player.position;
    let playerRotation = player.rotation; // in radians

    if (!playerPos) {
      // client might not have the position or rotation component, don't client-side predict
      console.log('no player data available');
      return;
    }

    if (this.game.isClient) {
      // use mesh position, was having issues with playerPos not being updated?
      // TODO: look into why playerPos was not correct scope here, it should work
      playerPos.x = player.mesh.position.x;
      playerPos.y = player.mesh.position.z;
    }

    // Distance in front of the player where the bullet should start
    let distanceInFront = 100; // TODO: make this a config

    if (typeof playerRotation === 'undefined') {
      playerRotation = 0; // this should have a default
    }

    // Place the bullet in front of the player
    let bulletStartPosition = {
      x: playerPos.x + distanceInFront * Math.sin(playerRotation),
      y: playerPos.y + distanceInFront * -Math.cos(playerRotation)
    };

    // Compute the bullet's direction based on player's rotation
    const directionX = Math.sin(playerRotation);
    const directionY = -Math.cos(playerRotation);
    const bulletId = `bullet_${this.bulletCount.toString()}`; // for now, debugging is easier to have string id

    this.bulletCount++;
    const bulletDirectionConfig = {
      id: bulletId,
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

    this.game.createEntity(bulletDirectionConfig);

    if (this.game.isClient) {
      let meshPlugin = this.game.getSystem('mesh');
      let mesh = meshPlugin.createMesh(bulletDirectionConfig);
      this.game.components.mesh.set(bulletId, mesh);
    }

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
    return entity.mesh.material && entity.mesh.material.name === "redGlow";
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
        console.log('handleCollision no entity found. Skipping...', entityA, entityB);
        return;
      }

      if (entityA.type !== 'BULLET' && entityB.type !== 'BULLET') {
        // console.log('neither is a bullet. Skipping...');
        return;
      }

      // Check if bullets have the same owner
      if (entityA && entityB && entityA.id === entityB.owner) {
        return;
      }

      // console.log('bullet collides', entityIdA, entityIdB);

      if (entityA && entityA.id !== entityB.owner) {

        if (entityA.type === 'PLAYER') {
          let playerMesh = entityA.mesh;
          if (playerMesh) {
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
        //game.systems.health.applyDamage(entityIdB, bulletA.damage);
        this.game.removeEntity(entityIdB);
      }

    }
  }
}

export default BulletPlugin;
