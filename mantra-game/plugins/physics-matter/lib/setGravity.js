export default function setGravity(x = 0, y = 0) {
  // console.log('setting gravity', x, y)
  this.engine.gravity.x = x;
  this.engine.gravity.y = y;
}
