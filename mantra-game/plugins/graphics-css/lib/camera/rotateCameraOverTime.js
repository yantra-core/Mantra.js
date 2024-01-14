// Method to smoothly rotate the camera over a given duration using CSS transitions
export default function rotateCameraOverTime(targetAngle = 90, duration = 1100) {
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

  // Calculate the center of the screen
  let centerX = window.innerWidth / 2;
  let centerY = window.innerHeight / 2;

  // console.log('this.cameraPosition.y', this.game.data.camera.position.y)
  // TODO: camera center is still not correct when zoom scale is not 1
  // no need for X?
  // centerX = centerX / currentZoom;
  // centerY = centerY / currentZoom;
  // centerY = centerY + this.game.viewportCenterYOffset;
  // centerY = centerY +  this.game.data.camera.position.y / currentZoom;
  // Set the transition property on the gameViewport
  this.gameViewport.style.transition = `transform ${duration}ms`;

  // Set transform-origin to the calculated center
  this.gameViewport.style.transformOrigin = `${centerX}px ${centerY}px`;

  // Apply the combined scale (for zoom) and rotation
  this.gameViewport.style.transform = `scale(${currentZoom}) rotate(${targetAngle}deg)`;

  // Reset the transition after the animation is complete
  setTimeout(() => {
    this.gameViewport.style.transition = '';
    this.rotating = false;
    this.gameViewport.style.transformOrigin = '50% 50%';
    this.gameViewport.style.transform = `scale(${currentZoom}) rotate(${0}deg)`;

  }, duration);
}
