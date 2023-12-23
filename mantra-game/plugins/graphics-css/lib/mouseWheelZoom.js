export default function cssMouseWheelZoom(event) {
  if (!this.mouseWheelEnabled) {
    return;
  }

  let game = this.game;
  let scale = game.data.camera.currentZoom;

  // Game viewport
  let gameViewport = document.getElementById('gameHolder');

  // Zoom settings
  const zoomSettings = {
    intensity: 0.03, // Decreased zoom intensity for smoother zoom
    minScale: 0.1,   // Minimum scale limit
  };

  // Prevent default scrolling behavior
  event.preventDefault();

  // Determine zoom direction
  const delta = event.wheelDelta ? event.wheelDelta : -event.detail;
  const direction = delta > 0 ? 1 : -1;

  // Update scale
  scale += direction * zoomSettings.intensity;
  scale = Math.max(zoomSettings.minScale, scale); // Prevent zooming out too much

  this.zoom(scale);

  // Calculate center of the viewport
  const viewportCenterX = window.innerWidth / 2;
  const viewportCenterY = window.innerHeight / 2;

  scale = scale * 100;
  // Calculate offset based on camera position and scale
  let offsetX = (viewportCenterX - this.cameraPosition.x) / scale;
  let offsetY = (viewportCenterY - this.cameraPosition.y) / scale;


  offsetX += 100;
  offsetY += 100;

  //console.log('oooo', offsetX, offsetY, scale)
  // Update game viewport offsets (if needed)
  //game.viewportCenterXOffset = offsetX;
  //game.viewportCenterYOffset = offsetY;
}
