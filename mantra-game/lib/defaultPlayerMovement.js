export default function topdownMovement(game) {

  let rules = game.createSutra();

  let defaultControlsMapping = {
    W: 'MOVE_FORWARD',
    S: 'MOVE_BACKWARD',
    A: 'MOVE_LEFT',
    D: 'MOVE_RIGHT',
    SPACE: 'FIRE_BULLET',
    K: 'FIRE_BULLET',
    U: 'SELECT_MENU',
    O: 'ZOOM_OUT',
    P: 'ZOOM_IN',

    //LEFT: 'ROTATE_LEFT',
    //RIGHT: 'ROTATE_RIGHT'
  };

  function handleInputs (entityId, input) {
    const moveSpeed = 1;
    let actions = [];

    // Map the input to actions
    if (input.controls) {
      Object.keys(input.controls).forEach(key => {
        if (input.controls[key] && defaultControlsMapping[key]) {
          actions.push(defaultControlsMapping[key]);
        }
      });
    }

    // Apply movement and rotation
    actions.forEach(action => {
      let force;
      let rotation;
      switch (action) {
        case 'MOVE_FORWARD':
          force = { x: 0, y: -moveSpeed };
          rotation = 0; // Facing up
          break;
        case 'MOVE_BACKWARD':
          force = { x: 0, y: moveSpeed };
          rotation = Math.PI; // Facing down
          break;
        case 'MOVE_LEFT':
          force = { x: -moveSpeed, y: 0 };
          rotation = -Math.PI / 2; // Facing left
          break;
        case 'MOVE_RIGHT':
          force = { x: moveSpeed, y: 0 };
          rotation = Math.PI / 2; // Facing right
          break;
      }
      if (force) {
        game.applyForce(entityId, force);
        game.updateEntity({
          id: entityId,
          rotation: rotation
        });
      }
    });

    if (game.systems.bullet) {
      if (actions.includes('FIRE_BULLET')) game.getSystem('bullet').fireBullet(entityId);
    }
    if (game.systems.sword) {
      if (actions.includes('FIRE_BULLET')) {
        game.getSystem('sword').swingSword(entityId);
      } else {
        game.getSystem('sword').sheathSword(entityId);
      }
    }

    if (actions.includes('ZOOM_IN')) {
      let currentZoom = game.data.camera.currentZoom || 1;
      game.setZoom(currentZoom + 0.05);
    }

    if (actions.includes('ZOOM_OUT')) {
      let currentZoom = game.data.camera.currentZoom || 1;
      game.setZoom(currentZoom - 0.05);
    }

    game.emit('entityInput::handleActions', entityId, actions);

  }

  rules.on('entityInput::handleInputs', handleInputs);

  return rules;
}
