let minZoom = 0.1;
let maxZoom = 10;

export default function zoom(scale, transitionTime = '0s') {

  if (scale < minZoom) {
    scale = minZoom;
  }
  if (scale > maxZoom) {
    scale = maxZoom;
  }

  this.game.data.camera.currentZoom = scale;

  let gameViewport = document.getElementById('gameHolder');
  if (gameViewport) {
    // Set the transform origin to the center
    gameViewport.style.transformOrigin = 'center center';

    // Set transition time
    gameViewport.style.transition = `transform ${transitionTime}`;

    // Calculate the translation needed to keep the screen's center constant
    let centerX = window.innerWidth / 2;
    let centerY = window.outerHeight / 2;
    let playerHeightOffset = 16;

    if (window === top) {
    } else {
      // if embed in iframe, adjust for iframe offset
      playerHeightOffset = 32;
    }

    // The logic here ensures that the screen center remains constant during zoom
    // X adjustment not needed for default zoom behavior
    // let newCameraX = (centerX - (centerX / scale));
    let newCameraY = (centerY - (centerY / scale));
    //game.viewportCenterXOffset = newCameraX;
    // alert()
    this.game.viewportCenterYOffset = newCameraY + playerHeightOffset;

    // Apply scale and translate transform
    gameViewport.style.transform = `scale(${scale})`;
  } else {
    console.log('Warning: could not find gameHolder div, cannot zoom');
  }
}