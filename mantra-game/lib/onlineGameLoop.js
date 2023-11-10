// onlineGameLoop.js - Marak Squires 2023
let started = false;
let lastRenderedSnapshotId = null;
let hzMS = 16.666;
let accumulator = 0;
let lastGameTick = Date.now();

let fpsMeasurements = []; // Array to store FPS measurements
let fpsReportFrequency = 60; // How often to report FPS (e.g., every 60 frames)
let frameCount = 0; // A counter for the number of frames

function onlineGameLoop(game) {
  if (!started) {
    started = true;
    lastGameTick = Date.now(); // Set the last game tick to the current time to start
  }
  game.onlineGameLoopRunning = true;
  let currentTime = Date.now();
  let deltaTime = (currentTime - lastGameTick) / 1000.0; // Convert milliseconds to seconds

  // FPS calculation here, before updating lastGameTick
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
      console.log('average fps', averageFPS);
      game.emit('fps', averageFPS); // Emit the 'fps' event with the average FPS
      fpsMeasurements = []; // Reset the measurements array after reporting
    }
  }

  // Update lastGameTick after FPS calculation
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
