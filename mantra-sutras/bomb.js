// bomb.js - Marak Squires 2024
export default function bomb(game) {

  let rules = game.createSutra();

  // Rate at which the player can drop bombs
  let fireRate = 1000; 
  // Distance in front of the player where the bomb should start
  let distanceInFront = 16;
  // Speed at which the bomb is thrown
  let speed = 0.05;
  // TODO: ^^^ make these config

  rules.addCondition('canDropBomb', (entity, gameState) => {
    // TODO: better fluent integration of Action Rate Limiter into Sutra
    let actionRateLimiterComponent = game.components.actionRateLimiter;
    let lastFired = actionRateLimiterComponent.getLastActionTime(entity.id, 'dropBomb');
    let currentTime = Date.now();
    return currentTime - lastFired >= fireRate;
  });

  // Define actions
  rules.addAction({
    if: 'canDropBomb',
    then: 'dropBomb'
  });

  // Event listeners for actions
  rules.on('dropBomb', (entity, node, gameState) => {

    let playerPos = entity.position;
    let playerRotation = entity.rotation; // in radians

    if (!playerPos) {
      // client might not have the position or rotation component, don't client-side predict
      console.log('no player data available');
      return;
    }

    // TODO: better fluent integration of Action Rate Limiter into Sutra
    let actionRateLimiterComponent = game.components.actionRateLimiter;
    actionRateLimiterComponent.recordAction(entity.id, 'dropBomb');

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

    const bombDirectionConfig = {
      type: 'BOMB',
      mass: 10000,
      collisionStart: true,
      position: bombStartPosition,
      lifetime: 2000,
      friction: 0.5,
      frictionStatic: 0.5,
      frictionAir: 0.01,
      //texture: 'tile-block',
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'bomb',
        playing: false
      },
      owner: entity.id,
      rotation: 0,
      //color: entity.bombColor || 0x000000,
      velocity: {
        x: directionX * speed,
        y: directionY * speed
      },
      height: 16,
      width: 16,
      damage: 10, // TODO: make this a config
    };
    // console.log('using bombDirectionConfig', bombDirectionConfig)
    game.createEntity(bombDirectionConfig);

  });


  // Handling collisions
  rules.if('entTouchedBomb').then('bombCollision');
  rules.addCondition('entTouchedBomb', (entity, gameState) => {
    if (entity.type === 'COLLISION' && entity.kind === 'START') {
      if (entity.bodyA.type === 'BOMB') {
        return true;
      }
      if (entity.bodyB.type === 'BOMB') {
        return true;
      }
    }
  });

  rules.on('bombCollision', (collision, node, gameState) => {
    let bombEntity = collision.bodyA.type === 'BOMB' ? collision.bodyA : collision.bodyB;
    let otherEntity = collision.bodyA.type === 'BOMB' ? collision.bodyB : collision.bodyA;

    // TODO: check the ctime of bomb to now, do not explode if too new
    // TODO: Apply damage or other effects to otherEntity
    // TODO: configurable collision groups
    if (['DEMON', 'HEXAPOD', 'FIRE', 'NPC', 'BLOCK', 'DOOR'].indexOf(otherEntity.type) !== -1) {
      // TODO: remove this to work with generic collision handler for Block types
      //       no need for explict call here, is simple refactor
      if (otherEntity.type === 'BLOCK' || otherEntity.type === 'HEXAPOD') {
        game.systems.block.blockBulletCollision(otherEntity.id, bombEntity.id, otherEntity, bombEntity);
      } else {
        game.removeEntity(otherEntity.id);
        game.removeEntity(bombEntity.id);
      }

    }
  });

  return rules;
}