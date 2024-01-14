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
      let centerY = window.innerHeight / 2;

      /*
      if (true || game.embed) {
        // use the window frameHeight and frameWidth to calculate the center
        centerX = window.frameElement.clientWidth / 2;
        centerY = window.frameElement.clientHeight / 2;
      }
      */

      // The logic here ensures that the screen center remains constant during zoom
      // let newCameraX = (centerX - (centerX / scale));
      let newCameraX =  (centerY - (centerY / scale));
      let newCameraY = (centerY - (centerY / scale));

      //game.viewportCenterXOffset = newCameraX;
      let minDistanceFromTop = 50;
      if (is_touch_enabled()) {
        minDistanceFromTop = 0;
      }
      game.viewportCenterYOffset = newCameraY + minDistanceFromTop;

      // Apply scale and translate transform
      gameViewport.style.transform = `scale(${scale})`;
  } else {
      console.log('Warning: could not find gameHolder div, cannot zoom');
  }
}


function is_touch_enabled() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}