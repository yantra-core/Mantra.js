export default function limitSpeed(body, maxSpeed) {
  let Matter = this.Matter;
  let speed = Matter.Vector.magnitude(body.velocity);
  if (speed > maxSpeed) {
    let newVelocity = Matter.Vector.mult(Matter.Vector.normalise(body.velocity), maxSpeed);
    Matter.Body.setVelocity(body, newVelocity);
  }
}