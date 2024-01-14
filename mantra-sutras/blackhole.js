// blackhole.js - Marak Squires 2023
export default function blackHoleSutra(entityData, game) {

  // Create the Black Hole entity
  const blackHole = game.createEntity({
    type: 'BLACK_HOLE',
    texture: 'fire',
    isStatic: true,
    isSensor: true,
    radius: 20,
    position: {
      x: entityData.position.x,
      y: entityData.position.y
    },
    mass: 100
  });

  let rules = game.createSutra();

  // Define the gravitational constant
  const GRAVITATIONAL_CONSTANT = 0.0001; // Adjust as needed for gameplay

  rules.addCondition('gravityTick', (entity, gameState) => gameState.tick % 5 === 0);

  rules.if('gravityTick').then('applyGravity');

  rules.on('applyGravity', (entityData, node, gameState) => {
    // console.log('gameState', gameState)
    Object.keys(gameState.ents._).forEach(eId => {
      let entity = gameState.ents._[eId];
      if (entity.type !== 'BLACK_HOLE') {
        applyGravity(blackHole, entity, GRAVITATIONAL_CONSTANT);
      }
    });
  });

  rules.if('entTouchedBlackhole').then('blackHoleCollision');
  rules.addCondition('entTouchedBlackhole', (entity, gameState) => {
    return entity.type === 'COLLISION' && entity.kind === 'START' && entity.BLACK_HOLE;
  });
  rules.on('blackHoleCollision', (collision) => {
    let pendingDestroy = collision.bodyA;
    if (collision.bodyA.type === 'BLACK_HOLE') {
      pendingDestroy = collision.bodyB;
    }
    game.removeEntity(pendingDestroy.id);
  });

  // Function to apply gravitational force
  function applyGravity(body1, body2, gravity) {
    var distance = Vector.sub(body2.position, body1.position);
    var magnitude = Vector.magnitude(distance);

    if (magnitude < 0.5) {  // This prevents extreme forces at very close distances
      return;
    }

    distance = Vector.normalize(distance);
    var force = gravity * body1.mass * body2.mass / (magnitude * magnitude);
    var maxForce = 1;  // Prevents excessively large forces
    force = Math.min(force, maxForce);

    // Apply the force towards the black hole
    // TODO: add config flag for repulsion in addition to attraction
    game.applyForce(body2.id, {
      x: -distance.x * force,
      y: -distance.y * force
    });
  }

  return rules;
}

// Basic vector operations
const Vector = {
  add: (v1, v2) => ({ x: v1.x + v2.x, y: v1.y + v2.y }),
  sub: (v1, v2) => ({ x: v1.x - v2.x, y: v1.y - v2.y }),
  mult: (v, factor) => ({ x: v.x * factor, y: v.y * factor }),
  div: (v, factor) => ({ x: v.x / factor, y: v.y / factor }),
  magnitude: (v) => Math.sqrt(v.x * v.x + v.y * v.y),
  normalize: (v) => {
    const mag = Vector.magnitude(v);
    return mag > 0 ? Vector.div(v, mag) : { x: 0, y: 0 };
  }
};