export default function createWalker(game, config) {
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


  return walker;
}
