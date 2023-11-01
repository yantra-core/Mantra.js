  let lastRenderedSnapshotId = null; // Add a variable to track the ID of the last rendered snapshot
  function onlineGameLoop(game) {
    // Check if there's a new snapshot and it's different from the last rendered one
    if (game.latestSnapshot && game.latestSnapshot.id !== lastRenderedSnapshotId) {
      // data encoding layers go here...
      // this will eventually be SnapShotManager.update()
      if (game.deltaCompression) {
        let deltaCompressedSnapshot = deltaCompression.decompress(game.latestSnapshot);
        if (deltaCompressedSnapshot) {
          //deltaCompressedSnapshot.state.forEach(game.inflateEntity);
          lastRenderedSnapshotId = game.latestSnapshot.id; // Update the last rendered snapshot ID
        }
      } else {
        lastRenderedSnapshotId = game.latestSnapshot.id; // Update the last rendered snapshot ID
      }

      while (game.snapshotQueue.length > 0) {
        let snapshot = game.snapshotQueue.shift();
        snapshot.state.forEach(function (state) {
          game.inflateEntity(state);
        });
      }

    } else {
      // console.log("No new data or snapshot already rendered");
    }

    game.graphics.forEach(function(graphicsInterface){
      graphicsInterface.render(game);
    });

    game.gameTick(false);

    requestAnimationFrame(function () {
      if (game.onlineGameLoopRunning) {
        onlineGameLoop(game);
      }

    });

  }

  export default onlineGameLoop;