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
    intensity: 0.1, // Base zoom intensity
    minScale: 0.1,   // Minimum scale limit
    logBase: 2       // Logarithmic base
  };

  // Prevent default scrolling behavior
  event.preventDefault();

  // Determine zoom direction
  const delta = event.wheelDelta ? event.wheelDelta : -event.detail;
  const direction = delta > 0 ? 1 : -1;

  // Applying logarithmic scale for smooth zoom
  let logScaledIntensity = zoomSettings.intensity * Math.log(scale + 1) / Math.log(zoomSettings.logBase);
  const newScale = Math.max(zoomSettings.minScale, scale + direction * logScaledIntensity);

  // Center of the viewport
  const viewportCenterX = window.innerWidth / 2;
  const viewportCenterY = window.innerHeight / 2;

  // Calculate offsets based on the old scale
  let offsetX = (viewportCenterX - this.cameraPosition.x) / scale;
  let offsetY = (viewportCenterY - this.cameraPosition.y) / scale;

  // Update scale
  this.zoom(newScale);
}
