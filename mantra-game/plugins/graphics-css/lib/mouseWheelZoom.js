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

  // Calculate new scale
  const newScale = Math.max(zoomSettings.minScale, scale + direction * zoomSettings.intensity);

  // Center of the viewport
  const viewportCenterX = window.innerWidth / 2;
  const viewportCenterY = window.innerHeight / 2;

  // Calculate offsets based on the old scale
  let offsetX = (viewportCenterX - this.cameraPosition.x) / scale;
  let offsetY = (viewportCenterY - this.cameraPosition.y) / scale;

  // Adjust camera position based on new scale
  //this.cameraPosition.x = viewportCenterX - (offsetX * newScale);
  // this.cameraPosition.y = offsetY;

  // Update scale
  this.zoom(newScale);

  // Update game viewport offsets if necessary
  //game.viewportCenterXOffset = offsetX;
  //game.viewportCenterYOffset = offsetY;
  // console.log(game.viewportCenterYOffset, offsetY)

  // game.viewportCenterYOffset = 0;
}
