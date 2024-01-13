// Method to smoothly rotate the camera over a given duration using CSS transitions
export default function rotateCameraOverTime(targetAngle = 90, duration = 800) {
  if (typeof targetAngle !== 'number' || typeof duration !== 'number') {
    console.error('Invalid arguments for rotateCameraOverTime. Both targetAngle and duration must be numbers.');
    return;
  }

  if (this.rotating) {
    return;
  }

  this.rotating = true;
  this.game.data.camera.rotation = targetAngle;

  // Retrieve the current zoom level
  let currentZoom = this.game.data.camera.currentZoom;

  // Set the transition property on the gameViewport
  this.gameViewport.style.transition = `transform ${duration}ms`;

  // TODO: better centering
  // this.gameViewport.style.transformOrigin = 'center center 0';

  // Apply the combined scale (for zoom) and rotation
  this.gameViewport.style.transform = `scale(${currentZoom}) rotate(${targetAngle}deg)`;

  // Reset the transition after the animation is complete
  // TODO: remove setTimeout in favor of game.tick % N
  setTimeout(() => {
    this.gameViewport.style.transition = '';
    this.rotating = false;
  }, duration);
}
