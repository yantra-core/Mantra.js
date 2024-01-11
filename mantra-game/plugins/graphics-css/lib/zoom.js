export default function zoom(scale, transitionTime = '0s') {
  // console.log("CSSGraphics zoom", scale)
  this.game.data.camera.currentZoom = scale;

  let gameViewport = document.getElementById('gameHolder');
  if (gameViewport) {
    // Set transition time
    gameViewport.style.transition = `transform ${transitionTime}`;

    // Apply scale transform
    gameViewport.style.transform = `scale(${scale})`;
  } else {
    console.log('Warning: could not find gameHolder div, cannot zoom');
  }
}