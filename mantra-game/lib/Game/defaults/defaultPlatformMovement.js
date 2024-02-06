export default function platformMovement(game) {

  let rules = game.createSutra();

  rules.addCondition('PLAYER_UP', { op: 'or', conditions: ['W', 'DPAD_UP'] });
  rules.addCondition('PLAYER_DOWN', { op: 'or', conditions: ['S', 'DPAD_DOWN'] });
  rules.addCondition('MOVE_LEFT', { op: 'or', conditions: ['A', 'DPAD_LEFT'] });
  rules.addCondition('MOVE_RIGHT', { op: 'or', conditions: ['D', 'DPAD_RIGHT'] });
  rules.addCondition('PLAYER_JUMP', { op: 'or', conditions: ['SPACE', 'H', 'BUTTON_B'] });
  rules.addCondition('PLAYER_RUN', { op: 'or', conditions: ['J', 'BUTTON_X'] });
  rules.addCondition('ZOOM_IN', { op: 'or', conditions: ['K', 'BUTTON_A'] });
  rules.addCondition('ZOOM_OUT', { op: 'or', conditions: ['L', 'BUTTON_Y'] });


  rules.addCondition('isRunning', {
    op: 'or',
    conditions: ['S', 'K'] // defaults DOWN key, or B button on Gamepad
  });


  rules
    .if('MOVE_LEFT')
      .then('MOVE_LEFT')
      .then('updateSprite', { sprite: 'playerLeftWalk' });
  
  rules
    .if('MOVE_RIGHT')
      .then('MOVE_RIGHT')
      .then('updateSprite', { sprite: 'playerRightWalk' });
  
  /*
  rules
    .if('PLAYER_UP')
      .then('PLAYER_UP')
      .then('updateSprite', { sprite: 'playerUpRight' });
  */

  rules
    .if('PLAYER_DOWN')
      .then('DUCK')
      .map('determineDuckingSprite')
        .then('updateSprite');


  rules.addMap('determineDuckingSprite', (player, node) => {

    let sprite = 'playerDownRight';
    if (player.texture.sprite === 'playerLeftWalk') {
      player.texture.sprite = 'playerDownLeft';
    } else {
      player.texture.sprite = 'playerDownRight';
    }

    return player;

  });

  //rules.if('S').then('DUCK').map('determineDuckingSprite').then('updateSprite');
  //rules.if('D').then('MOVE_RIGHT').then('updateSprite', { sprite: 'playerRightWalk' });

  /*

   Adding textures to Entities
    game.updateEntity({
      id: player.id,
      texture: {
        frameIndex: 0,
        sheet: player.texture.sheet,
        sprite: { // sets directly to sprite, no animations
          x: -112,
          y: -16,
          height: 16,
          width: 16
        }
      }
    })

  */

  rules.on('updateSprite', function (player, node) {
    let sprite = node.data.sprite || player.texture.sprite;
    game.updateEntity({
      id: player.id,
      texture: {
        frameIndex: 0,
        sheet: player.texture.sheet,
        sprite: sprite,
        animationPlaying: true
      }
    })

  });

  rules.addCondition('isPlayer', (entity) => entity.type === 'PLAYER');

  let maxJumpTicks = 40;
  // Remark: isPlayer is already implied for all Key inputs,
  //         however we add the additional check here for the negative case,
  //         in order to not let other ents reset player walk speed
  rules
    .if('isPlayer')
    .then((rules) => {
      rules
        .if('PLAYER_RUN')
        .then('RUN')
        .else('WALK');
    })

  rules
    .if('isPlayer')
    .then((rules) => {
      rules
        .if('PLAYER_JUMP')
        // .if('doesntExceedDuration')
        .then('JUMP')
        .then('updateSprite', { sprite: 'playerRightJump' })
    })

  //rules.if('L').then('SWING_SWORD');
  //rules.if('O').then('ZOOM_IN');
  //rules.if('P').then('ZOOM_OUT');

  rules.on('JUMP', function (player, node, gameState) {
    // console.log("JUMP", gameState.input, gameState.controls)
    if (gameState.inputTicks.SPACE >= maxJumpTicks) {
      return;
    }
    game.applyForce(player.id, { x: 0, y: -2.3, z: 0 });
    game.updateEntity({ id: player.id, rotation: 0, sprite: 'playerRightJump' });
  });

  let runningForce = 1;

  rules.on('RUN', function (player) {
    runningForce = 1.6;
    maxJumpTicks = 35;
  });

  rules.on('WALK', function (player) {
    runningForce = 1;
    maxJumpTicks = 25;
  });

  rules.on('DUCK', function (player) {
    game.applyForce(player.id, { x: 0, y: 0.5, z: 0 });
    game.updateEntity({ id: player.id, rotation: Math.PI });
  });

  rules.on('MOVE_LEFT', function (player, node, gameState) {
    game.applyForce(player.id, { x: -runningForce, y: 0, z: 0 });
    game.updateEntity({ id: player.id, rotation: -Math.PI / 2 });
  });

  rules.on('MOVE_RIGHT', function (player) {
    game.applyForce(player.id, { x: runningForce, y: 0, z: 0 });
    game.updateEntity({ id: player.id, rotation: Math.PI / 2 });
  });

  rules.on('FIRE_BULLET', function (player) {
    game.systems.bullet.fireBullet(player.id);
  });

  rules.on('SWING_SWORD', function (player) {
    if (game.systems.sword) {
      game.systems.sword.swingSword(player.id);

    }
  })

  return rules; 

}