export default function cssMouseWheelZoom(event) {

  // Prevent default scrolling behavior
  event.preventDefault();

  if (!this.mouseWheelEnabled) {
    return;
  }

  // check that target is gameHolder, if not cancel
  // Remark: This should suffice for CSSGraphics, this is required for embedding or other page interactions
  //         outside of the Mantra Game
  if (event.target !== document.body) {
    return false;
  }

  let game = this.game;
  let scale = game.data.camera.currentZoom;

  // Zoom settings
  const zoomSettings = {
    intensity: 0.1, // Base zoom intensity
    minScale: 0.1,   // Minimum scale limit
    logBase: 2       // Logarithmic base
  };

  // Determine zoom direction
  const delta = event.wheelDelta ? event.wheelDelta : -event.detail;
  const direction = delta > 0 ? 1 : -1;

  // Applying logarithmic scale for smooth zoom
  let logScaledIntensity = zoomSettings.intensity * Math.log(scale + 1) / Math.log(zoomSettings.logBase);
  const newScale = Math.max(zoomSettings.minScale, scale + direction * logScaledIntensity);

  // Update scale
  this.zoom(newScale);
  return false;
}