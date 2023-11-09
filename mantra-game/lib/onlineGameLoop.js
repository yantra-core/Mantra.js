// onlineGameLoop.js - Marak Squires 2023
let started = false;
let lastRenderedSnapshotId = null;
let hzMS = 16.666;
let accumulator = 0;
let lastGameTick = Date.now();

function onlineGameLoop(game) {
  if (!started) {
    started = true;
    lastGameTick = Date.now(); // Set the last game tick to the current time to start
  }
  game.onlineGameLoopRunning = true;

  // Calculate deltaTime in seconds
  let currentTime = Date.now();
  let deltaTime = (currentTime - lastGameTick) / 1000.0; // Convert milliseconds to seconds
  lastGameTick = currentTime;

  // Accumulate time since the last game logic update
  accumulator += deltaTime;

  // If there is a new snapshot, process it
  if (game.latestSnapshot && game.latestSnapshot.id !== lastRenderedSnapshotId) {
    while (game.snapshotQueue.length > 0) {
      let snapshot = game.snapshotQueue.shift();
      snapshot.state.forEach(function (state) {
        game.inflateEntity(state);
      });
      lastRenderedSnapshotId = snapshot.id; // Update the last rendered snapshot ID
    }
  }

  // Run game logic updates based on the accumulated time
  while (accumulator >= hzMS / 1000.0) {
    game.gameTick(); // Run the game logic update
    accumulator -= hzMS / 1000.0; // Decrease accumulator by the fixed timestep
  }

   // Calculate alpha based on the remaining accumulated time for interpolation
   let fixedStep = hzMS / 1000.0;
   let alpha = accumulator / fixedStep;

  // Render the snapshot with the current state
  game.graphics.forEach(function (graphicsInterface) {
    graphicsInterface.render(game, alpha);
  });

  // Schedule the next iteration of the loop using requestAnimationFrame
  if (game.onlineGameLoopRunning) {
    requestAnimationFrame(function () {
      onlineGameLoop(game);
    });
  }
}

export default onlineGameLoop;
