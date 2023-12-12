export default function round() {

  let round = this.game.createSutra();

  // Condition to check if a round has started
  round.addCondition('roundStarted', (entity, gameState) => {
    return gameState.roundStarted === true;
  });

  // Condition to check if a round has ended
  round.addCondition('roundEnded', (entity, gameState) => {
    return gameState.roundEnded === true;
  });

  round.addCondition('roundRunning', (entity, gameState) => {
    return gameState.roundRunning === true;
  });

  round.addCondition('roundNotRunning', (entity, gameState) => {
    return gameState.roundRunning === false;
  });

  round.addCondition('roundPaused', (entity, gameState) => {
    return gameState.roundPaused === true;
  });

  // TODO: remove add NOT condition
  round.addCondition('roundNotPaused', (entity, gameState) => {
    return gameState.roundPaused !== true;
  });

  round.on('roundLost', function (data, node, gameState) {
    console.log('roundLost!!!');
    // stop the game
    gameState.roundStarted = false;
    gameState.roundRunning = false;
    gameState.roundEnded = true;
    gameState.roundPaused = true;
  });

  round.on('startRound', function (data, node, gameState) {
    // set roundRunning to true
    console.log('startRound')
    gameState.roundRunning = true;
    gameState.roundEnded = false;
  });

  // round.if('startRound').then('startRound');

  return round;

}