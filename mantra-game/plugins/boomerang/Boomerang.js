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
    this.isReturning = false; // State to track if the boomerang is returning
    this.ownerId = null; // The entity ID of the boomerang's owner
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('boomerang', this);
  }

  update() {
    // TODO: we can perform this check less frequently
    // Iterate through all boomerang entities in the game data
    if (this.game.data.ents.BOOMERANG) {
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

  returnToOwner(boomerang) {
    // Find the owner entity using the owner ID stored in the boomerang
    let ownerEntity = this.game.getEntity(boomerang.owner);

    if (ownerEntity) {
      let ownerPosition = ownerEntity.position;
      let currentPosition = boomerang.position;
      let directionToOwner = { x: ownerPosition.x - currentPosition.x, y: ownerPosition.y - currentPosition.y };
      let normalizedDirection = this.normalize(directionToOwner);

      this.game.applyForce(boomerang.id, {
        x: normalizedDirection.x * this.returnSpeed,
        y: normalizedDirection.y * this.returnSpeed
      });

      // Check for collision with the owner to complete the return
      if (this.checkCollision(boomerang, ownerEntity)) {
        this.completeReturn(boomerang);
      }
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

  throwBoomerang(entityId) {
    let entity = this.game.getEntity(entityId);

    if (!entity) {
      console.log('Boomerang.throwBoomerang no entity found for id', entityId);
      return;
    }
    
    // check to see if any other boomerangs already exists with this owner
    if (this.game.data.ents.BOOMERANG) {
      for (let eId in this.game.data.ents.BOOMERANG) {
        let b = this.game.data.ents.BOOMERANG[eId];
        if (b.owner === entityId) {
          return;
        }
      }
    }

    let ownerId = entityId; // Set the owner of the boomerang

    let playerPos = entity.position;
    let playerRotation = entity.rotation; // in radians, if applicable

    // Initial boomerang position should be close to the player
    let boomerangstartingPosition = {
      x: playerPos.x + Math.sin(playerRotation) * 10, // Offset by 10 units in the direction of player's facing
      y: playerPos.y - Math.cos(playerRotation) * 10,
    };

    let boomerangVelocity = {
      x: this.direction.x * this.speed,
      y: this.direction.y * this.speed
    };

    // adjust force for entity.rotation
    boomerangVelocity.x = Math.sin(playerRotation) * this.speed;
    boomerangVelocity.y = -Math.cos(playerRotation) * this.speed;

    const boomerangConfig = {
      type: 'BOOMERANG',
      height: 16,
      width: 16,
      position: boomerangstartingPosition,
      rotation: entity.rotation, // TODO: get the player's rotation
      speed: this.speed,
      isSensor: true,
      owner: ownerId,
      velocity: boomerangVelocity,
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'boomerang',
        playing: true
      },
    };

    this.game.createEntity(boomerangConfig);
  }
}

export default Boomerang;