const moveSpeed = 5;

export default function input() {
  let game = this.game;
  let inputSutra = this.game.createSutra();

  let inputMap = ['W', 'A', 'S', 'D'];
  inputMap.forEach((key) => {
    inputSutra.addCondition(`press${key}`, function(data, gameState){
      if (gameState.input && gameState.input.controls[key]) {
        //console.log(`press${key}`, gameState.input)
        return true;
      }
      return false;
    });
  });
 
  // Add actions corresponding to the conditions
  inputSutra.if('pressW').then('moveForward');
  inputSutra.if('pressA').then('moveLeft');
  inputSutra.if('pressS').then('moveBackward');
  inputSutra.if('pressD').then('moveRight');

  // Sutra event listeners for executing actions
  inputSutra.on('moveForward', (entity) => {
    let dx = 0;
    let dy = moveSpeed;
    const forceFactor = 0.05;
    const force = { x: dx * forceFactor, y: -dy * forceFactor };
    game.applyForce(entity.id, force);
  });

  inputSutra.on('moveLeft', (entity) => {
    let dx = moveSpeed;
    let dy = 0;
    const forceFactor = 0.05;
    const force = { x: -dx * forceFactor, y: dy * forceFactor };
    game.applyForce(entity.id, force);
  });

  inputSutra.on('moveRight', (entity) => {
    let dx = moveSpeed;
    let dy = 0;
    const forceFactor = 0.05;
    const force = { x: dx * forceFactor, y: dy * forceFactor };
    game.applyForce(entity.id, force);
  });

  inputSutra.on('moveBackward', (entity) => {
    let dx = 0;
    let dy = moveSpeed;
    const forceFactor = 0.05;
    const force = { x: dx * forceFactor, y: dy * forceFactor };
    game.applyForce(entity.id, force);
  });

  console.log('creating input sutra', inputSutra)
  return inputSutra;
};