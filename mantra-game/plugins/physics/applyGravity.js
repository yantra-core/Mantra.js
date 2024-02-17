export default function applyGravity(ent1, ent2, gravity, repulsion = false) {

  if (!ent1 || !ent2) {
    return;
  }

  let Vector = this.Vector;

  var distance = Vector.sub(ent2.position, ent1.position);
  var magnitude = Vector.magnitude(distance);

  if (magnitude < 0.5) {  // This prevents extreme forces at very close distances
    return;
  }

  distance = Vector.normalize(distance);
  var force = gravity * ent1.mass * ent2.mass / (magnitude * magnitude);
  var maxForce = 1;  // Prevents excessively large forces
  force = Math.min(force, maxForce);

  let sign = repulsion ? 1 : -1;

  game.applyForce(ent2.id, {
    x: sign * distance.x * force,
    y: sign * distance.y * force
  });
}