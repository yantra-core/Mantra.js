
function localGameLoop(game, playerId) {
  // Process game logic locally
  game.gameTick();

  // Get local snapshot
  // TODO: data encoding if required, prob not for local
  let snapshot = game.getPlayerSnapshot(playerId, false);

  snapshot.state.forEach(function(state){
    game.inflate(state);
  });
 
  game.graphics.render(game);

  // Render the local snapshot
  if (snapshot) {
    // rename to game.gui?
    // game.client?
    game.graphics.update(snapshot);
  }

  // Call the next iteration of the loop
  requestAnimationFrame(function(){
    if (game.localGameLoopRunning) {
      localGameLoop(game, playerId);
    }
  });

}

export default localGameLoop;