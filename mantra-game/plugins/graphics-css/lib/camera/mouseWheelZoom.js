export default function cssMouseWheelZoom(event) {

  let game = this.game;

  if (!this.mouseWheelEnabled) { // legacy API, use game.data.camera instead
    return;
  }

  if (game.data.camera && game.data.camera.mouseWheelZoomEnabled !== true) {
    return;
  }

  // Prevent default scrolling behavior
  // Prevents the default *after* checking to see if mouse enabled
  // This is to best serve user so Mantra won't eat their scroll events
  // We could add an additional flag here in cases we want an embedded Mantra to scroll
  event.preventDefault();

  /*

    Remark: Removed 2/16/2024, as this was preventing mouse wheel zoom from working

    // check that target is gameHolder, if not cancel
    // Remark: This should suffice for CSSGraphics, this is required for embedding or other page interactions
    //         outside of the Mantra Game
    if (event.target !== document.body) {
      return false;
    }
  */

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