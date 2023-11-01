
function localGameLoop(game, playerId) {
  // Process game logic locally
  game.gameTick();

  // Get local snapshot
  // TODO: data encoding if required, prob not for local
  let snapshot = game.getPlayerSnapshot(playerId, false);

  snapshot.state.forEach(function(state){
    game.inflateEntity(state);
  });
 
  game.graphics.forEach(function(graphicsInterface){
    graphicsInterface.render(game);
  });

  // Render the local snapshot
  if (snapshot) {
    game.graphics.forEach(function(graphicsInterface){
      graphicsInterface.update(snapshot);
    });
  }

  // Call the next iteration of the loop
  requestAnimationFrame(function(){
    if (game.localGameLoopRunning) {
      localGameLoop(game, playerId);
    }
  });

}

export default localGameLoop;