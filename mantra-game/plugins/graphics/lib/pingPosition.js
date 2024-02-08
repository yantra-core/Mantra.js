export default function pingPosition(x, y, options = {}) {
  // Default configuration for the ripple, with added reverse option
  const config = {
    color: options.color || 'rgba(0, 150, 255, 0.7)', // Ripple color
    duration: options.duration || 1000, // Ripple effect duration in milliseconds
    size: options.size || 100, // Size of the ripple in pixels
    finalSize: options.finalSize || 300, // Final size of the ripple in pixels
    borderWidth: options.borderWidth || 2, // Border width of the ripple
    reverse: options.reverse || false, // Reverse (implosion) effect
  };

  // scale size based on current this.game.data.camera.currentZoom
  const scale = this.game.data.camera.currentZoom;
  config.size *= scale;
  config.finalSize *= scale;

  // adjust based on the current this.game.data.camera.position
  //x += this.game.viewportCenterXOffset;
  //y += this.game.viewportCenterYOffset;

  // Create the ripple element
  const ripple = document.createElement('div');
  ripple.style.position = 'fixed';
  ripple.style.border = `${config.borderWidth}px solid ${config.color}`;
  ripple.style.borderRadius = '50%';
  ripple.style.pointerEvents = 'none'; // Ignore mouse events
  ripple.style.opacity = 1;
  ripple.style.transition = `all ${config.duration}ms ease-out`;

  if (config.reverse) {
    // For reverse ripple, start from finalSize and shrink to size
    ripple.style.width = `${config.finalSize}px`;
    ripple.style.height = `${config.finalSize}px`;
    ripple.style.left = `${x - config.finalSize / 2}px`;
    ripple.style.top = `${y - config.finalSize / 2}px`;
  } else {
    // For normal ripple, start from size and expand to finalSize
    ripple.style.width = `${config.size}px`;
    ripple.style.height = `${config.size}px`;
    ripple.style.left = `${x - config.size / 2}px`;
    ripple.style.top = `${y - config.size / 2}px`;
  }

  document.body.appendChild(ripple);

  // Trigger the animation
  setTimeout(() => {
    if (config.reverse) {
      // For reverse ripple, shrink to size
      ripple.style.width = `${config.size}px`;
      ripple.style.height = `${config.size}px`;
      ripple.style.left = `${x - config.size / 2}px`;
      ripple.style.top = `${y - config.size / 2}px`;
    } else {
      // For normal ripple, expand to finalSize
      ripple.style.width = `${config.finalSize}px`;
      ripple.style.height = `${config.finalSize}px`;
      ripple.style.left = `${x - config.finalSize / 2}px`;
      ripple.style.top = `${y - config.finalSize / 2}px`;
    }
    ripple.style.opacity = 0;
  }, 0);

  // Remove the ripple after the animation
  setTimeout(() => {
    ripple.remove();
  }, config.duration);
}