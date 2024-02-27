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

  let mouse = this.game.systems.mouse;
  let target = event.target;
  let defaultScrollElements = ['TEXTAREA', 'PRE', 'CODE', 'BUTTON', 'INPUT'];

  // console.log("Event target tag:", target.tagName);

  // If the target is a CODE element, use its parent PRE for overflow check
  if (target.tagName.toUpperCase() === 'CODE') {
    target = target.parentNode; // Assuming the immediate parent is always a PRE
  }

  // Check if the event target is one of the default scroll elements
  if (defaultScrollElements.includes(target.tagName.toUpperCase())) {
    // Determine if the target element (PRE) is overflowing
    let isOverflowing = target.scrollHeight > target.clientHeight;

    // If the target element is not overflowing, prevent the default scroll
    if (!isOverflowing) {
      event.preventDefault();
      // console.log("Custom wheel event action");
    } else {
      // If the target element is overflowing, allow the default browser scroll
      // console.log("Default scroll allowed for overflowing content");
      // Return here to prevent camera zooming
      return;
    }
  } else {
    // For elements other than 'TEXTAREA', 'PRE', 'CODE', prevent default scroll
    event.preventDefault();
    // console.log("Custom wheel event action for non-default scroll elements");
  }
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
      intensity: 0.03, // Adjust this value to control the base zoom intensity
      minScale: 0.0001, // Minimum scale limit
      logBase: 2        // Logarithmic base
    };
    
    // Determine zoom direction
    const delta = event.wheelDelta ? event.wheelDelta : -event.detail;
    const direction = delta > 0 ? 1 : -1;
    
    // Applying logarithmic scale for smooth zoom
    // Adjust the calculation of logScaledIntensity to decrease the zoom speed
    let logScaledIntensity = zoomSettings.intensity * Math.log(scale + zoomSettings.logBase) / Math.log(zoomSettings.logBase);
    let newScale = Math.max(zoomSettings.minScale, scale + direction * logScaledIntensity);
    
    // Update scale
    this.zoom(newScale);
    
  return false;
}