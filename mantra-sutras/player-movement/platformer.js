export default function platformMovement(game) {

  let rules = game.createSutra();

  let defaultControlsMapping = {
    A: 'MOVE_LEFT',
    D: 'MOVE_RIGHT',
    SPACE: 'JUMP',
    O: 'JUMP', // virtual gamepad Y button
    // Other controls can be mapped as needed
  };

  function handleInputs(entityId, input) {
    const moveSpeed = 1.5;
    const jumpForce = 1.5; // Adjust as needed
    let actions = [];

    // Map the input to actions
    if (input.controls) {
      Object.keys(input.controls).forEach(key => {
        if (input.controls[key] && defaultControlsMapping[key]) {
          actions.push(defaultControlsMapping[key]);
        }
      });
    }

    // Apply movement
    actions.forEach(action => {
      let force = { x: 0, y: 0 };
      switch (action) {
        case 'MOVE_LEFT':
          force.x = -moveSpeed;
          break;
        case 'MOVE_RIGHT':
          force.x = moveSpeed;
          break;
        case 'JUMP':
          if (true /*|| game.isTouchingGround(entityId)*/) { // Replace with actual condition check
            force.y = -jumpForce;
          }
          break;
      }
      if (force.x !== 0 || force.y !== 0) {
        game.applyForce(entityId, force);
      }
    });

  }

  rules.on('entityInput::handleInputs', handleInputs);

  return rules;
}
