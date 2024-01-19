// Bomb.js - Marak Squires 2024
class Bomb {
  static id = 'bomb';
  constructor(config = {}) {
    this.id = Bomb.id;
    this.bombCount = 0;
    this.speed = config.speed || 0.3; // or 22?
    this.direction = config.direction || { x: 0, y: 1 };
    this.damage = config.damage || 30;
    this.lifetime = config.lifetime || 2000;
    this.fireRate = config.fireRate || 400;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('bomb', this);
  }

  update() {

    // for each bomb, check if it's expired
    // if so, remove it
    

  }

  dropBomb(entityId) {

    let entity = this.game.getEntity(entityId);

    if (!entity) {
      console.log('Bomb.dropBomb no entity found for id', entityId);
      return;
    }
    let actionRateLimiterComponent = this.game.components.actionRateLimiter;
    let lastFired = actionRateLimiterComponent.getLastActionTime(entityId, 'dropBomb');
    let currentTime = Date.now();

    if (currentTime - lastFired < this.fireRate) {
      // console.log('Rate limit hit for entity', entityId, ', cannot fire yet');
      return;
    }

    actionRateLimiterComponent.recordAction(entityId, 'dropBomb');
    let playerPos = entity.position;
    let playerRotation = entity.rotation; // in radians

    if (!playerPos) {
      // client might not have the position or rotation component, don't client-side predict
      console.log('no player data available');
      return;
    }
    // Distance in front of the player where the bomb should start
    let distanceInFront = 16; // TODO: make this a config

    if (typeof entity.radius !== 'undefined') {
      entity.width = entity.radius * 2;
      entity.height = entity.radius * 2;
    }
    let playerOffsetX = entity.width / 2; // Adjust this value to align the bomb properly
    let playerOffsetY = entity.height / 2; // Adjust this value to align the bomb properly

    playerOffsetX = 0;
    playerOffsetY = 0;

    if (typeof playerRotation === 'undefined') {
      playerRotation = 0; // this should have a default
    }

    // convert to 3d if rotation object
    if (typeof playerRotation === 'object') {
      playerRotation = playerRotation.z;
    }

    // Compute the bomb's direction based on player's rotation
    const directionX = Math.sin(playerRotation);
    const directionY = -Math.cos(playerRotation);

    // Place the bomb in front of the player
    let bombStartPosition = {
      x: playerPos.x + playerOffsetX + distanceInFront * Math.sin(playerRotation),
      y: playerPos.y + playerOffsetY + distanceInFront * -Math.cos(playerRotation),
      //z: 10
    };

    this.bombCount++;
    const bombDirectionConfig = {
      type: 'BOMB',
      mass: 10000,
      collisionStart: true,
      position: bombStartPosition,
      lifetime: this.lifetime,
      friction: 0.5,
      frictionStatic: 0.5,
      frictionAir: 0.01,
      //texture: 'tile-block',
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'bomb',
        playing: false
      },
      owner: entityId,
      rotation: 0,
      //color: entity.bombColor || 0x000000,
      velocity: {
        x: directionX * this.speed,
        y: directionY * this.speed
      },
      height: 16,
      width: 16,
      damage: 10, // TODO: make this a config
    };
    // console.log('using bombDirectionConfig', bombDirectionConfig)
    this.game.createEntity(bombDirectionConfig);

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
        //console.log('Bomb.handleCollision no entity found. Skipping...', entityA, entityB);
        return;
      }
    }
  }
}

export default Bomb;
