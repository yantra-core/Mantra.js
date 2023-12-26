// Sword.js
class Sword {
  static id = 'sword';
  constructor(config = {}) {
    this.id = Sword.id;
    this.swingRate = config.swingRate || 10; // Time between swings
    this.damage = config.damage || 20; // Damage per swing
    this.swingDuration = config.swingDuration || 500; // Duration of swing animation
    this.range = config.range || 50; // Range of the sword swing
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem(this.id, this);
  }

  update() {

    // console.log(this.game.components.items)

    let currentPlayerId = this.game.currentPlayerId;
    let currentPlayer = this.game.getEntity(currentPlayerId);

    if (!currentPlayerId) {
      return;
    }

    // hard-coded for one entity ( for now )
    let equippedItems = this.game.components.items.get(currentPlayerId);
    if (!equippedItems) {
      return;
    }
    let swordId = equippedItems[0]; // for now
    let swordEntity = this.game.getEntity(swordId);

    if (swordEntity) {
      const ownerPosition = currentPlayer.position;
      const ownerRotation = currentPlayer.rotation || 0;
      const distanceInFront = currentPlayer.height / 2; // Adjust as needed

      // Update sword position
      swordEntity.position.x = ownerPosition.x + distanceInFront * Math.sin(ownerRotation);
      swordEntity.position.y = ownerPosition.y + distanceInFront * -Math.cos(ownerRotation);

      // Update sword rotation
      swordEntity.rotation = ownerRotation;
    }


  }

  sheathSword(entityId) {
    let entity = this.game.getEntity(entityId);
    if (!entity || !entity.items || entity.items.length === 0) {
      return;
    }

    let swordId = entity.items[0]; // Assuming the first item is the sword
    this.game.removeEntity(swordId); // Remove the sword entity

    // Update the player's items array
    entity.items = entity.items.filter(item => item !== swordId);
    this.game.updateEntity(entity); // Update the entity with the new items array
  }

  swingSword(entityId) {
    let entity = this.game.getEntity(entityId);
    let actionRateLimiterComponent = this.game.components.actionRateLimiter;
    let lastSwung = actionRateLimiterComponent.getLastActionTime(entityId, 'swingSword');
    let currentTime = Date.now();

    if (currentTime - lastSwung < this.swingRate) {
      console.log('Swing rate limit hit for entity', entityId, ', cannot swing yet');
      return;
    }

    actionRateLimiterComponent.recordAction(entityId, 'swingSword');
    let playerPos = entity.position;
    let playerRotation = entity.rotation || 0; // in radians

    if (!playerPos) {
      console.log('no player data available');
      return;
    }

    // Check if the player already has a sword
    let swordEntity;
    if (entity.items && entity.items.length > 0) {
      // Assume the first item is the sword
      swordEntity = this.game.getEntity(entity.items[0]);
    }

    if (!swordEntity) {
      // If no sword exists, create one
      let distanceInFront = entity.height; // Adjust as needed
      let swordStartPos = {
        x: playerPos.x + distanceInFront * Math.sin(playerRotation),
        y: playerPos.y + distanceInFront * -Math.cos(playerRotation)
      };

      const swordDirectionConfig = {
        type: 'SWORD',
        mass: 10,
        position: swordStartPos,
        lifetime: Infinity,
        owner: entityId,
        rotation: playerRotation,
        isSensor: true,
        color: entity.bulletColor || 0x000000,
        /*
        velocity: {
          x: directionX * this.speed,
          y: directionY * this.speed
        },
        */
        height: 48, // TODO: make this a config
        width: 16, // TODO: make this a config
        damage: 10, // TODO: make this a config
      };

      swordEntity = this.game.createEntity(swordDirectionConfig);
      entity.items = [swordEntity.id]; // Overwrites all items on equip
      this.game.updateEntity(entity);
    } else {
      // Update existing sword's position and rotation
      let distanceInFront = entity.height; // Adjust as needed
      swordEntity.position.x = playerPos.x + distanceInFront * Math.sin(playerRotation);
      swordEntity.position.y = playerPos.y + distanceInFront * -Math.cos(playerRotation);
      swordEntity.rotation = playerRotation;
    }

    console.log(`Entity ${entityId} swung a sword at position ${playerPos.x}, ${playerPos.y}`);
  }


  handleCollision(pair, bodyA, bodyB) {
    // Handle collision logic for the sword
    // This could involve checking if the sword entity has collided with an NPC or other entities
    // and then applying damage or other effects accordingly

    // For simplicity, let's just log a message
    console.log('Sword collision detected:', pair);
  }
}

export default Sword;
