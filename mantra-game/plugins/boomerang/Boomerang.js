// Boomerang.js - Marak Squires 2024
class Boomerang {
  static id = 'boomerang';
  constructor(config = {}) {
    this.id = Boomerang.id;
    this.speed = config.speed || 3.3; // Speed at which the boomerang travels
    this.returnSpeed = config.returnSpeed || 0.01; // Speed at which the boomerang returns
    this.direction = config.direction || { x: 1, y: 0 }; // Initial direction
    this.damage = config.damage || 20; // Damage dealt by the boomerang
    this.range = config.range || 30; // Maximum distance the boomerang can travel before returning
    this.catchBoomerangTickDelay = 33; // minimum number of ticks before the boomerang can be caught
    this.isReturning = false; // State to track if the boomerang is returning
    this.ownerId = null; // The entity ID of the boomerang's owner
    this.maxBoomarangCount = 10;
    this.throwBoomerangTickDelay = 10; // in game ticks
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('boomerang', this);
  }

  build(entityData = {}) {
    // Define default values
    const defaults = {
      type: 'BOOMERANG',
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'boomerang',
        playing: true
      },
      width: 12,
      height: 12,
      position: { x: 0, y: 0, z: 4 },
      isSensor: true,
      isStatic: false,
      owner: null,
      velocity: { x: 0, y: 0 },
      style: { zIndex: 99 } // Assuming zIndex should default to 99 but can be overridden
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
  

  update() {
    // TODO: we can perform this check less frequently
    // Iterate through all boomerang entities in the game data
    // Remark: We need to remove this pattern of O(n) in each item
    // We should have a single O(n) loop to process all entities that is hooked in systems
    // LOOP1
    if (this.game.data.ents && this.game.data.ents.BOOMERANG) {
      for (let eId in this.game.data.ents.BOOMERANG) {
        let boomerang = this.game.data.ents.BOOMERANG[eId];
        // Update each boomerang's position and check return conditions
        if (!boomerang.isReturning && this.hasReachedMaxRange(boomerang)) {
          boomerang.isReturning = true;
        }

        if (boomerang.isReturning) {
          this.returnToOwner(boomerang);
        } else {
          this.moveForward(boomerang);
        }
      }
    }
  }

  hasReachedMaxRange(entity) {
    // Calculate if the boomerang has reached its maximum range
    let startingPosition = entity.startingPosition;
    let currentPosition = entity.position;
    let distance = Math.sqrt(Math.pow(currentPosition.x - startingPosition.x, 2) + Math.pow(currentPosition.y - startingPosition.y, 2));
    return distance >= this.range;
  }

  handleCollision(pair, bodyA, bodyB) {
    let game = this.game;
    if (bodyA.myEntityId && bodyB.myEntityId) {
      const entityIdA = bodyA.myEntityId;
      const entityIdB = bodyB.myEntityId;

      //const entityA = this.game.getEntity(entityIdA);
      //const entityB = this.game.getEntity(entityIdB);
      const entityA = bodyA.entity;
      const entityB = bodyB.entity;

      // do not process collisions for other boomarangs
      if (entityA.type === 'BOOMERANG' && entityB.type === 'BOOMERANG') {
        pair.isActive = false; // Deactivate collision processing for this pair
        return;
      }

      // do not process collisions for entities that player owners ( for now )
      // Check if entityA owns entityB or if entityB owns entityA
      if (entityA.owner === entityB.id || entityB.owner === entityA.id) {
        let boomerang = entityA.type === 'BOOMERANG' ? entityA : entityB;
        pair.isActive = false; // Deactivate collision processing for this pair
        let diff = game.tick - boomerang.ctick;
        if (boomerang.isReturning || diff > this.catchBoomerangTickDelay) {
          this.completeReturn(boomerang);
        }
        return;
      }

      // if the boomerang hits anything else, it should return
      if (entityA.type === 'BOOMERANG' || entityB.type === 'BOOMERANG') {
        let boomerang = entityA.type === 'BOOMERANG' ? entityA : entityB;
        // pair.isActive = false; // Deactivate collision processing for this pair
        // invert the velocity
        boomerang.isReturning = true;
        this.game.applyForce(boomerang.id, {
          x: -boomerang.velocity.x,
          y: -boomerang.velocity.y
        })
        // this.completeReturn(boomerang);
      }

    }
  }

  returnToOwner(boomerang) {
    // Find the owner entity using the owner ID stored in the boomerang
    let ownerEntity = this.game.getEntity(boomerang.owner);
    if (ownerEntity) {
      let ownerPosition = ownerEntity.position;
      let currentPosition = boomerang.position;
      let directionToOwner = { x: ownerPosition.x - currentPosition.x, y: ownerPosition.y - currentPosition.y };
      let normalizedDirection = this.normalize(directionToOwner);

      // Increase the return speed gradually, up to a maximum value
      const maxReturnSpeed = 0.1; // Maximum return speed, adjust as needed
      const speedIncreaseFactor = 0.001; // Rate of speed increase per update, adjust as needed

      if (typeof boomerang.returnSpeed !== 'number') {
        boomerang.returnSpeed = this.returnSpeed;
      }
      // Increase the return speed, but don't exceed the maximum
      boomerang.returnSpeed = Math.min(boomerang.returnSpeed + speedIncreaseFactor, maxReturnSpeed);
      this.game.applyForce(boomerang.id, {
        x: normalizedDirection.x * boomerang.returnSpeed,
        y: normalizedDirection.y * boomerang.returnSpeed
      });

    }
  }

  moveForward(entity) {
    // Update the boomerang's position based on its current direction
    entity.position.x += this.direction.x * this.speed;
    entity.position.y += this.direction.y * this.speed;
  }

  normalize(vector) {
    let magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    return { x: vector.x / magnitude, y: vector.y / magnitude };
  }

  checkCollision(entityA, entityB) {
    // Simple collision detection logic
    // This should be replaced with more accurate collision detection if necessary
    return Math.abs(entityA.position.x - entityB.position.x) < 10 && Math.abs(entityA.position.y - entityB.position.y) < 10;
  }

  completeReturn(boomerang) {
    // Logic to handle the boomerang's return completion
    // For example, remove the boomerang entity or reset its state
    this.game.removeEntity(boomerang.id);
    boomerang.isReturning = false; // Reset the return state for the next use
  }

  throwBoomerang(entityId, angleInRadians = null) {
    let entity = this.game.getEntity(entityId);

    if (!entity) {
      console.log('Boomerang.throwBoomerang no entity found for id', entityId);
      return;
    }
  
    // Ensure only a limited number of boomerangs can be thrown by one player
    let boomerangCount = 0;
    if (this.game.data.ents.BOOMERANG) {
      for (let eId in this.game.data.ents.BOOMERANG) {
        let b = this.game.data.ents.BOOMERANG[eId];
        if (b.owner === entityId) {
          boomerangCount++;
  
          if (this.game.tick - b.ctick < this.throwBoomerangTickDelay) {
            return;
          }
  
          if (boomerangCount >= this.maxBoomerangCount) {
            return;
          }
        }
      }
    }
  
    let ownerId = entityId;
    let playerPos = entity.position;
    let playerVelocity = entity.velocity || { x: 0, y: 0 };
  
    // Use the provided angleInRadians or adjust and fall back to the entity's rotation
    let throwAngle;

    if (typeof angleInRadians !== null && ! Number.isNaN(angleInRadians) ) {
        throwAngle = angleInRadians;
    } else {
        throwAngle = entity.rotation - Math.PI / 2; // Adjust entity.rotation as needed
    }

    // Adjust the starting position and velocity according to the game's coordinate system
    let boomerangStartingPosition = {
      x: playerPos.x + Math.cos(throwAngle) * 10, // Use cos for x to align with the angle calculation
      y: playerPos.y + Math.sin(throwAngle) * 10, // Use sin for y and remove the negative sign
      z: 4
    };
  
    let boomerangVelocity = {
      x: Math.cos(throwAngle) * this.speed + playerVelocity.x, // Use cos for x
      y: Math.sin(throwAngle) * this.speed + playerVelocity.y, // Use sin for y without negation
    };
  
    // Limit the velocity to a maximum for balance
    boomerangVelocity.x = Math.min(boomerangVelocity.x, 10);
    boomerangVelocity.y = Math.min(boomerangVelocity.y, 10);
  
    const boomerangConfig = {
      type: 'BOOMERANG',
      height: 12,
      width: 12,
      position: boomerangStartingPosition,
      rotation: throwAngle,
      speed: this.speed,
      owner: ownerId,
      velocity: boomerangVelocity,
      style: {
        zIndex: 99
      },
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'boomerang',
        playing: true
      },
    };

    console.log('boomerangConfig', boomerangConfig)
  
    let builder = this.build(boomerangConfig);
    this.game.createEntity(builder);
  }
  
  
  
}

export default Boomerang;