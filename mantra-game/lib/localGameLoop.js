let started = false;
let hzMS = 16.666;
let accumulator = 0;
let lastGameTick = Date.now();

function localGameLoop(game, playerId) {

  if (!started) {
    started = true;
    lastGameTick = Date.now(); // Ensure we start with the current time
  }
  game.localGameLoopRunning = true;
  game.mode = 'local';
  // Calculate deltaTime in seconds
  let currentTime = Date.now();
  let deltaTime = (currentTime - lastGameTick) / 1000.0; // seconds
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
  game.graphics.forEach(function (graphicsInterface) {
    graphicsInterface.render(game, alpha); // Pass the alpha to the render method
  });

  // Call the next iteration of the loop using requestAnimationFrame
  if (game.localGameLoopRunning) {
    requestAnimationFrame(function () {
      localGameLoop(game, playerId);
    });
  }
}

export default localGameLoop;
