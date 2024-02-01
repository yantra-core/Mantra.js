export default function platformerMovement(game) {

  let rules = game.createSutra();

  rules.if('A').then('MOVE_LEFT').then('updateSprite', { sprite: 'playerLeftWalk' });

  rules.addMap('determineDuckingSprite', (player, node) => {

    let sprite = 'playerDownRight';
    if (player.texture.sprite === 'playerLeftWalk') {
      player.texture.sprite = 'playerDownLeft';
    } else {
      player.texture.sprite = 'playerDownRight';
    }

    return player;

  });

  rules.if('S').then('DUCK').map('determineDuckingSprite').then('updateSprite');
  rules.if('D').then('MOVE_RIGHT').then('updateSprite', { sprite: 'playerRightWalk' });

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

    console.log('updateSprite', sprite)
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

  // rules.if('SPACE').then('JUMP');
  rules.addCondition('isPlayer', (entity) => entity.type === 'PLAYER');
  rules.addCondition('isRunning', {
    op: 'or',
    conditions: ['S', 'K'] // defaults DOWN key, or B button on Gamepad
  });

  let maxJumpTicks = 50;
  // Remark: isPlayer is already implied for all Key inputs,
  //         however we add the additional check here for the negative case,
  //         in order to not let other ents reset player walk speed
  rules
    .if('isPlayer')
    .then((rules) => {
      rules
        .if('isRunning')
        .then('RUN')
        .else('WALK');
    })

  rules
    .if('isPlayer')
    .then((rules) => {
      rules
        .if('SPACE')
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
    game.applyForce(player.id, { x: 0, y: -3.2, z: 0 });
    game.updateEntity({ id: player.id, rotation: 0, sprite: 'playerRightJump' });
  });

  let runningForce = 1;

  rules.on('RUN', function (player) {
    runningForce = 1.6;
    maxJumpTicks = 70;
  });

  rules.on('WALK', function (player) {
    runningForce = 1;
    maxJumpTicks = 50;
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