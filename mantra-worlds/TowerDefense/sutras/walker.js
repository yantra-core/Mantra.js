export default function createWalker(game, config) {

  game.createEntity({
    type: 'Walker',
    // sutra: 'walker', // TODO
    width: 22,
    height: 24,
    texture: {
      sheet: 'jogurt',
      sprite: 'walkLeft'
    },
    depth: 64,
    position: {
      x: 50,
      y: -150,
      z: 32
    }
  });

  let walker = game.createSutra();

  // Set properties from config
  walker.route = config.route;
  walker.routeIndex = 0;
  walker.target = walker.route[walker.routeIndex];
  walker.tolerance = config.tolerance || 5; // Default tolerance to 5 if not specified

  walker.addCondition('isWalker', function (entity) {
    return entity.type === 'Walker';
  });

  // Check if the walker is at the current target waypoint
  walker.addCondition('atTarget', function (entity) {
    let dx = entity.position.x - walker.target[0];
    let dy = entity.position.y - walker.target[1];
    return Math.sqrt(dx * dx + dy * dy) < walker.tolerance;
  });

  // Determine the next waypoint
  walker.on('nextWaypoint', function (entity) {
    if (walker.routeIndex < walker.route.length - 1) {
      walker.routeIndex++;
    } else {
      walker.routeIndex = 0; // Loop back to the start
    }
    walker.target = walker.route[walker.routeIndex];
  });

  // Walker movement logic
  walker
    .if('isWalker')
    .if('atTarget')
    .then('nextWaypoint'); // Switch to next waypoint when current one is reached

  walker
    .if('isWalker')
    .then('entity::updateEntity');

  // Updating the entity (used for both movement and firing)
  walker.on('entity::updateEntity', function (entity) {
    let dx = walker.target[0] - entity.position.x;
    let dy = walker.target[1] - entity.position.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let velocityX = distance > 0 ? (dx / distance) : 0;
    let velocityY = distance > 0 ? (dy / distance) : 0;

    game.updateEntity({
      id: entity.id,
      velocity: { x: velocityX, y: velocityY }
    });
  });

  /*
  // Remark: We could add additional walker logic, and or create a new NPC sutra behavior for using weapons
  rules.addCondition('WalkerTouchedPlayer', (collision) => {
    console.log('ccc', collision)
    return (collision.entityA.type === 'Walker' && collision.entityB.type === 'Player') || (collision.entityA.type === 'Player' && collision.entityB.type === 'Walker');
  });

  rules.addCondition('WalkerTouchedPlayer', (entity, gameState) => {
    if (entity.type === 'COLLISION') {
      if (entity.bodyA.type === 'Walker' && entity.bodyB.type === 'PLAYER') {
        return true;
      }
      if (entity.bodyB.type === 'Walker' && entity.bodyA.type === 'PLAYER') {
        return true;
      }
    }
  });


  rules.on('PlayerTakeDamage', (collision, node, gameState) => {
    console.log('PlayerTakeDamage', collision, gameState);

    game.removeEntity(collision.Walker.id);

    // get current walk count
    let walkerCount = gameState.ents.Walker.length || 0;

    if (walkerCount < 10) {
      // create a new walker
      game.createEntity({
        type: 'Walker',
        width: 16,
        height: 16,
        texture: {
          sheet: 'loz_spritesheet',
          sprite: 'bomb',
        },
        depth: 64,
        position: {
          x: -50,
          y: -150,
          z: 32
        }
      });

      game.createEntity({
        type: 'Walker',
        width: 16,
        height: 16,
        texture: {
          sheet: 'loz_spritesheet',
          sprite: 'bomb',
        },
        depth: 64,
        position: {
          x: 50,
          y: -150,
          z: 32
        }
      });
    }



  });

  rules
    .if('WalkerTouchedPlayer')
    .then('PlayerTakeDamage');


  */


  return walker;
}
