let started = false;
let hzMS = 16.666;
let accumulator = 0;
let lastGameTick = Date.now();

let fpsMeasurements = []; // Array to store FPS measurements
let fpsReportFrequency = 60; // How often to report FPS (e.g., every 60 frames)
let frameCount = 0; // A counter for the number of frames


function localGameLoop(game, playerId) {

  if (!started) {
    started = true;
    lastGameTick = Date.now(); // Ensure we start with the current time
  }
  // game.localGameLoopRunning = true;
  game.mode = 'local';
  // Calculate deltaTime in seconds
  let currentTime = Date.now();
  let deltaTime = (currentTime - lastGameTick) / 1000.0; // seconds

  // FPS calculation
  if (deltaTime > 0) {
    let currentFPS = 1 / deltaTime; // FPS is the reciprocal of deltaTime in seconds
    fpsMeasurements.push(currentFPS);

    if (fpsMeasurements.length > fpsReportFrequency) {
      fpsMeasurements.shift(); // Remove the oldest FPS measurement
    }

    frameCount++;
    if (frameCount % fpsReportFrequency === 0) {
      let sumFPS = fpsMeasurements.reduce((a, b) => a + b, 0);
      let averageFPS = sumFPS / fpsMeasurements.length;
      game.emit('fps', averageFPS); // Emit the 'fps' event with the average FPS
      fpsMeasurements = []; // Reset the measurements array after reporting
    }
  }

  lastGameTick = currentTime;

  // Accumulate time since the last game logic update
  accumulator += deltaTime;

  // Calculate how many full timesteps have passed
  let fixedStep = hzMS / 1000.0;

  while (accumulator >= fixedStep) {
    game.gameTick();
    accumulator -= fixedStep; // Decrease accumulator by a fixed timestep
  }

  // Calculate alpha based on the remaining accumulated time for interpolation
  let alpha = accumulator / fixedStep;

  // Render the local snapshot with interpolation
  game.graphics.forEach(function localGameLoopGraphicsRender (graphicsInterface) {
    graphicsInterface.render(game, alpha); // Pass the alpha to the render method
  });

  // Call the next iteration of the loop using requestAnimationFrame
  if (game.localGameLoopRunning) {
    requestAnimationFrame(function rafLocalGameLoop () {
      localGameLoop(game, playerId);
    });
  }
}

export default localGameLoop;
