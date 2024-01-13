// Apply the throw inertia to the camera
export default function applyThrow() {
  if (!this.isThrowing) return;

  let game = this.game;
  const decayFactor = 0.985; // Increase closer to 1 for longer throws

  game.viewportCenterXOffset += this.dragInertia.x;
  game.viewportCenterYOffset += this.dragInertia.y;

  // Decrease the inertia
  this.dragInertia.x *= decayFactor;
  this.dragInertia.y *= decayFactor;

  // Continue the animation if inertia is significant
  if (Math.abs(this.dragInertia.x) > 0.1 || Math.abs(this.dragInertia.y) > 0.1) {
    requestAnimationFrame(this.applyThrow.bind(this));
  } else {
    this.isThrowing = false;
    // console.log("1 STOPPED THROWING")
  }

  if (!this.isThrowing) {
    // Reset cursor style back to default at the end of a throw
    this.gameViewport.style.cursor = 'grab';
    //console.log("2 STOPPED THROWING")
  }

}
