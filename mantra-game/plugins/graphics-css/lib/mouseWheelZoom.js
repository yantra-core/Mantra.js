export default function cssMouseWheelZoom(event) {
  if (!this.mouseWheelEnabled) {
    return;
  }
  let game = this.game;
  // console.log('game.data.camera', game.data.camera)
  let scale = game.data.camera.currentZoom;
  // Game viewport
  let gameViewport = document.getElementById('gameHolder');

  // Zoom settings
  const zoomSettings = {
    intensity: 0.03, // Decreased zoom intensity for smoother zoom
    minScale: 0.1,   // Minimum scale limit
  };

  // Function to update scale
  // Prevent default scrolling behavior
  event.preventDefault();

  // Determine zoom direction
  const delta = event.wheelDelta ? event.wheelDelta : -event.detail;
  const direction = delta > 0 ? 1 : -1;

  // Update scale
  scale += direction * zoomSettings.intensity;
  scale = Math.max(zoomSettings.minScale, scale); // Prevent zooming out too much

  this.zoom(scale);

  // Apply scale to viewport
  //gameViewport.style.transform = `scale(${scale})`;

  const viewportCenterX = window.innerWidth / 2;
  const viewportCenterY = window.innerHeight / 2;

  // TODO: implement offset to ensure camera is center of screen after zoom
  // gameViewport.style.transform = `translate(${-this.cameraPosition.x}px, ${-this.cameraPosition.y}px) scale(${scale})`;

  //game.viewportCenterXOffset = (viewportCenterX) / scale;
  //game.viewportCenterYOffset = (viewportCenterY) / scale;

}