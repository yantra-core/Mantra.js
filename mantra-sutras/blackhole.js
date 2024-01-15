// blackhole.js - Marak Squires 2023
export default function blackHoleSutra(game, context) {

  let rules = game.createSutra();

  // Remark: Note namspace of sutraname::methodname
  //         Mantra runs a single Sutra tree which all entities are bound to
  //         This requires a unique namespace for each Sutra
  rules.on('blackhole::create', (entityData = {
    position: { x: 0, y: 0 }
  }) => {

    // Create the Black Hole entity
    const blackHole = game.createEntity({
      type: 'BLACK_HOLE',
      texture: 'fire',
      isStatic: true,
      isSensor: true,
      width: 4,
      height: 4,
      //radius: 20,
      position: {
        x: entityData.position.x,
        y: entityData.position.y
      },
      mass: 100
    });

  });

  // Define the gravitational constant
  const GRAVITATIONAL_CONSTANT = 0.01; // Adjust as needed for gameplay

  rules.addCondition('gravityTick', (entity, gameState) => gameState.tick % 5 === 0);

  rules.if('gravityTick').then('applyGravity');

  rules.on('applyGravity', (entityData, node, gameState) => {

    // check if this running locally on a context or globally on all BLACK_HOLE entities
    if (typeof context !== 'undefined') {
      Object.keys(gameState.ents._).forEach(eId => {
        let entity = gameState.ents._[eId];
        if (entity.type !== 'BLACK_HOLE') {
          applyGravity(context, entity, GRAVITATIONAL_CONSTANT, gameState);
        }
      });
      return;
    }

    if (gameState.ents.BLACK_HOLE) {
      gameState.ents.BLACK_HOLE.forEach(blackHole => {
        Object.keys(gameState.ents._).forEach(eId => {
          let entity = gameState.ents._[eId];
          if (entity.type !== 'BLACK_HOLE') {
            applyGravity(blackHole, entity, GRAVITATIONAL_CONSTANT, gameState);
          }
        });
      });
    }
  });

  rules.if('entTouchedBlackhole').then('blackHoleCollision');
  rules.addCondition('entTouchedBlackhole', (entity, gameState) => {
    // check if this running locally on a context or globally on all BLACK_HOLE entities
    if (typeof context !== 'undefined') {
      return entity.type === 'COLLISION' && entity.kind === 'START' && entity[context.type];
    } else {
      return entity.type === 'COLLISION' && entity.kind === 'START' && entity.BLACK_HOLE;
    }
  });

  rules.on('blackHoleCollision', (collision, node, gameState) => {
    let pendingDestroy = collision.bodyA;
    let blackHole = collision.bodyB;

    if (collision.bodyA.type === 'BLACK_HOLE') {
      pendingDestroy = collision.bodyB;
      blackHole = collision.bodyA;
    }

    if (typeof context !== 'undefined') {
      if (collision.bodyA.type === context.type) {
        pendingDestroy = collision.bodyB;
      } else {
        pendingDestroy = collision.bodyA;
      }
      blackHole = context;
    }

    if (blackHole) {
      // increase size of black hole
      // console.log(blackHole.height, blackHole.width)
      /*
      game.updateEntity({
        id: blackHole.id,
        height: blackHole.height + 0.1,
        width: blackHole.width + 0.1,
        // radius: blackHole.radius + 0.1,
      });
      */
    }

    game.removeEntity(pendingDestroy.id);
  });

  // Function to apply gravitational force
  function applyGravity(body1, body2, gravity, gameState) {
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
    let repulsion = false;
    if (typeof gameState.repulsion !== 'undefined') {
      repulsion = gameState.repulsion;
    }
    let sign = repulsion ? 1 : -1;
    game.applyForce(body2.id, {
      x: sign * distance.x * force,
      y: sign * distance.y * force
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