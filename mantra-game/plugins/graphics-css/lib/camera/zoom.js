export default function zoom(scale, transitionTime = '0s') {
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

      // The logic here ensures that the screen center remains constant during zoom
      // let newCameraX = (centerX - (centerX / scale));
      let newCameraX =  (centerY - (centerY / scale));
      let newCameraY = (centerY - (centerY / scale));

      //game.viewportCenterXOffset = newCameraX;
      game.viewportCenterYOffset = newCameraY + 100;

      // alert('zooming');
      console.log('newCameraX', newCameraX, 'newCameraY', newCameraY);

      // Apply scale and translate transform
      gameViewport.style.transform = `scale(${scale})`;
  } else {
      console.log('Warning: could not find gameHolder div, cannot zoom');
  }
}
