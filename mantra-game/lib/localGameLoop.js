
let started = false;
let hzMS = 16.666;
let accumulator = 0;
let lastGameTick = Date.now();

function localGameLoop(game, playerId) {

  if (!started) {
    started = true;
    // This will run the game logic at the fixed interval
    setInterval(() => {
      if (game.localGameLoopRunning) {
        game.gameTick(lastGameTick, accumulator);
      }
    }, hzMS); // hzMS matches the server's update rate
  }

  // Get the current time
  let currentTime = Date.now();
  if (!game.previousRenderTime) {
    game.previousRenderTime = currentTime;
  }
  let deltaTime = (currentTime - game.previousRenderTime) / 1000.0; // seconds
  game.previousRenderTime = currentTime;

  // Accumulate time since the last game logic update
  accumulator += deltaTime;

  // console.log('localGameLoop deltaTime', deltaTime)

  // Get local snapshot and update entity states
  let snapshot = game.getPlayerSnapshot(playerId, false);
  snapshot.state.forEach(function (state) {
    game.inflateEntity(state);
  });

  // Calculate alpha based on the accumulated time and fixed timestep
  let alpha = accumulator / (hzMS / 1000.0);
  if (alpha > 1) {
    // Clamp alpha and reset accumulator if it exceeds 1
    alpha = 1;
    accumulator = 0;
  }

  // Render the local snapshot with interpolation
  game.graphics.forEach(function (graphicsInterface) {
    graphicsInterface.render(game, alpha); // Pass the alpha to the render method
  });

  // Call the next iteration of the loop
  requestAnimationFrame(function () {
    if (game.localGameLoopRunning) {
      localGameLoop(game, playerId);
    }
  });

}

export default localGameLoop;