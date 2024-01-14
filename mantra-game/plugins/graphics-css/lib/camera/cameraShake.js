// cameraShake.js - Marak Squires 2023
export default function cameraShake(initialIntensity = 100, duration = 1300) {
  let gameViewport = document.getElementById('gameHolder');
  if (!gameViewport) {
    console.log('Warning: could not find gameHolder div, cannot apply camera shake');
    return;
  }

  // Debounce mechanism
  if (gameViewport.dataset.isShaking === 'true') {
    console.log('Camera is already shaking. Ignoring additional shake requests.');
    return;
  }
  gameViewport.dataset.isShaking = 'true';

  let startTime = Date.now();
  let shake = () => {
    let elapsedTime = Date.now() - startTime;
    let remainingTime = duration - elapsedTime;
    if (remainingTime <= 0) {
      // Reset transform after shaking completes
      gameViewport.style.transform = `scale(${this.game.data.camera.currentZoom})`;
      gameViewport.dataset.isShaking = 'false'; // Reset the debounce flag
      return;
    }

    // Gradually reduce the intensity
    let intensity = initialIntensity * (remainingTime / duration);

    // Smooth shake effect using sine function
    let x = intensity * Math.sin(elapsedTime / 100) * (Math.random() > 0.5 ? 1 : -1);
    let y = intensity * Math.cos(elapsedTime / 100) * (Math.random() > 0.5 ? 1 : -1);

    // Apply the shake with the current zoom
    gameViewport.style.transform = `scale(${this.game.data.camera.currentZoom}) translate(${x}px, ${y}px)`;

    requestAnimationFrame(shake);
  };

  shake();
}
