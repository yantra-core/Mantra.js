// cameraShake.js - Marak Squires 2023
export default function cameraShake({ initialIntensity = 100, duration = 777 }) {
  let gameViewport = document.getElementById('gameHolder');
  if (!gameViewport) {
    console.log('Warning: could not find gameHolder div, cannot apply camera shake');
    return;
  }

  // Debounce mechanism
  if (gameViewport.dataset.isShaking === 'true') {
    // console.log('Camera is already shaking. Ignoring additional shake requests.');
    return;
  }
  gameViewport.dataset.isShaking = 'true';

  // Capture the initial transform state before starting the shake effect
  let initialTransform = gameViewport.style.transform;

  let startTime = Date.now();
  let shake = () => {
    let elapsedTime = Date.now() - startTime;
    let remainingTime = duration - elapsedTime;
    if (remainingTime <= 0) {
      // Reset transform to the initial state after shaking completes
      gameViewport.style.transform = initialTransform;
      gameViewport.dataset.isShaking = 'false'; // Reset the debounce flag
      return;
    }

    // Gradually reduce the intensity
    let intensity = initialIntensity * (remainingTime / duration);

    // Smooth shake effect using sine function
    let x = intensity * Math.sin(elapsedTime / 100) * (Math.random() > 0.5 ? 1 : -1);
    let y = intensity * Math.cos(elapsedTime / 100) * (Math.random() > 0.5 ? 1 : -1);

    // Apply the shake effect on top of the initial transform
    gameViewport.style.transform = `${initialTransform} translate(${x}px, ${y}px)`;

    // Apply a random force to each entity
    Object.keys(this.game.data.ents._).forEach(eId => {
      let entity = this.game.data.ents._[eId];
      // TODO: make more configurable / part of constructor config
      // TODO: add a shakeable flag to entities / add parameter for tracking "shakeability", etc
      if (entity.type === 'PARTICLE' || entity.type === 'STAR' || entity.type === 'HEXAPOD' || entity.type === 'DEMON' || entity.type === 'NONE') {
        let forceX = Math.random() * intensity - intensity / 2;
        let forceY = Math.random() * intensity - intensity / 2;
        forceX = forceX * 0.01;
        forceY = forceY * 0.01
        game.applyForce(eId, { x: forceX, y: forceY });
      }
    });

    requestAnimationFrame(shake);
  };

  shake();
}