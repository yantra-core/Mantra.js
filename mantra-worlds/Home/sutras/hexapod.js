// hexapod.js - Marak Squires 2023

export default function hexapod(game) {

  // create 22 hexapods
  // start at 0,0 and make them in a circle with radius 80
  const numberOfHexapods = 22;
  const radius = 80;
  for (let i = 0; i < numberOfHexapods; i++) {
    // Calculate the angle for each hexapod
    let angle = (i / numberOfHexapods) * 2 * Math.PI;

    // Convert polar coordinates (angle, radius) to Cartesian coordinates (x, y)
    let x = radius * Math.cos(angle);
    let y = radius * Math.sin(angle);

    game.createEntity({
      type: 'HEXAPOD',
      texture: 'demon',
      width: 8,
      height: 8,
      isStatic: false,
      // isSensor: true,
      position: {
        x: x,
        y: y
      },
      velocity: { x: 0, y: 0 } // Assuming velocity is part of the hexapod entity
    });
  }

  let rules = game.createSutra();

  // Define constant values for different forces and parameters
  const ALIGNMENT_FORCE = 0.1;
  const COHESION_FORCE = 0.4;
  const SEPARATION_FORCE = 0.81;
  const PERCEPTION_RADIUS = 1500;
  const FIELD_OF_VIEW = 1500;

  rules.addCondition('hexapodTick', (entity, gameState) => entity.type === 'HEXAPOD' && gameState.tick % 1 === 0);
  rules.if('hexapodTick').then('hexapodThink');

  rules.on('hexapodThink', (entity, node, gameState) => {
    let hexapod = entity;
    let hexapods = gameState.ents.HEXAPOD;
    let alignment = { x: 0, y: 0 };
    let cohesion = { x: 0, y: 0 };
    let separation = { x: 0, y: 0 };
    let planetAvoidance = { x: 0, y: 0 };

    // Target movement implementation
    let targetForce = { x: 0, y: 0 };

    if (typeof gameState.currentPlayer !== 'undefined') {
      if (gameState.currentPlayer) {
        let target = gameState.currentPlayer.position;
        let targetDirection = Vector.sub(target, hexapod.position);
        targetForce = Vector.mult(Vector.normalize(targetDirection), COHESION_FORCE);
      }

    }

    // Process each hexapod in the field of view
    hexapods.forEach(otherHexapod => {
      // console.log("FML", otherHexapod)
      if (otherHexapod.id !== hexapod.id) {
        let d = Vector.magnitude(Vector.sub(hexapod.position, otherHexapod.position));

        // Alignment
        if (d < PERCEPTION_RADIUS) {
          alignment = Vector.add(alignment, otherHexapod.velocity);
        }

        // Cohesion
        if (d < PERCEPTION_RADIUS) {
          cohesion = Vector.add(cohesion, otherHexapod.position);
        }

        // Separation
        if (d < hexapod.width + otherHexapod.width) {
          let diff = Vector.sub(hexapod.position, otherHexapod.position);
          separation = Vector.add(separation, Vector.div(diff, d * d)); // Weight by distance
        }
      }
    });

    // Average out alignment, cohesion, and separation
    if (hexapods.length > 1) {
      alignment = Vector.div(alignment, hexapods.length - 1);
      cohesion = Vector.div(cohesion, hexapods.length - 1);
      cohesion = Vector.sub(cohesion, hexapod.position);
      separation = Vector.div(separation, hexapods.length - 1);
    }

    alignment = Vector.mult(Vector.normalize(alignment), ALIGNMENT_FORCE);
    cohesion = Vector.mult(Vector.normalize(cohesion), COHESION_FORCE);
    separation = Vector.mult(Vector.normalize(separation), SEPARATION_FORCE);

    // Apply forces
    let force = Vector.add(Vector.add(Vector.add(alignment, cohesion), separation), targetForce);
    // Update hexapod position
    let newPosition = Vector.add(hexapod.position, Vector.mult(force, 1));
    game.updateEntity({
      id: hexapod.id,
      position: newPosition
    });
  });

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
