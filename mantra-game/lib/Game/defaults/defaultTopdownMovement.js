export default function topdownMovement(game) {

  let rules = game.createSutra();

  rules.addCondition('PLAYER_UP', { op: 'or', conditions: ['W', 'DPAD_UP'] });
  rules.addCondition('PLAYER_DOWN', { op: 'or', conditions: ['S', 'DPAD_DOWN'] });
  rules.addCondition('PLAYER_LEFT', { op: 'or', conditions: ['A', 'DPAD_LEFT'] });
  rules.addCondition('PLAYER_RIGHT', { op: 'or', conditions: ['D', 'DPAD_RIGHT'] });
  rules.addCondition('USE_ITEM_1', { op: 'or', conditions: ['SPACE', 'H', 'BUTTON_B'] });
  rules.addCondition('USE_ITEM_2', { op: 'or', conditions: ['J', 'BUTTON_X'] });
  rules.addCondition('ZOOM_IN', { op: 'or', conditions: ['K', 'BUTTON_A'] });
  rules.addCondition('ZOOM_OUT', { op: 'or', conditions: ['L', 'BUTTON_Y'] });

  // see: ../mantra-sutras/movement/top-down.js events MOVE_UP, MOVE_DOWN, etc.
  rules
    .if('PLAYER_UP')
    .then('MOVE_UP')
    .then('updateSprite', { sprite: 'playerUp' });

  rules
    .if('PLAYER_LEFT')
    .then('MOVE_LEFT')
    .then('updateSprite', { sprite: 'playerLeft' });

  rules
    .if('PLAYER_DOWN')
    .then('MOVE_DOWN')
    .then('updateSprite', { sprite: 'playerDown' });

  rules
    .if('PLAYER_RIGHT')
    .then('MOVE_RIGHT')
    .then('updateSprite', { sprite: 'playerRight' })

  rules
    .if('USE_ITEM_1')
    .then('FIRE_BULLET')
    .map('determineShootingSprite')
    .then('updateSprite');

  rules
    .if('USE_ITEM_2')
    .then("DROP_BOMB")

  // replace with rules.do('ZOOM_IN'), etc
  rules.if('ZOOM_IN').then('ZOOM_IN');
  rules.if('ZOOM_OUT').then('ZOOM_OUT');

  rules.addMap('determineShootingSprite', (player, node) => {
    // Normalize the rotation within the range of 0 to 2π
    const normalizedRotation = player.rotation % (2 * Math.PI);
    // Define a mapping from radians to sprites
    const rotationToSpriteMap = {
      0: 'playerRodUp',
      [Math.PI / 2]: 'playerRodRight',
      [Math.PI]: 'playerRodDown',
      [-Math.PI / 2]: 'playerRodLeft'
    };
    // Set the sprite based on the rotation, default to the current sprite
    player.texture.sprite = rotationToSpriteMap[normalizedRotation] || player.currentSprite;
    return player;
  });

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

  rules.on('MOVE_UP', function (entity) {
    game.applyForce(entity.id, { x: 0, y: -1, z: 0 });
    game.updateEntity({ id: entity.id, rotation: 0 });
  });

  rules.on('MOVE_DOWN', function (entity) {
    game.applyForce(entity.id, { x: 0, y: 1, z: 0 });
    game.updateEntity({ id: entity.id, rotation: Math.PI });
  });

  rules.on('MOVE_LEFT', function (entity) {
    game.applyForce(entity.id, { x: -1, y: 0, z: 0 });
    game.updateEntity({ id: entity.id, rotation: -Math.PI / 2 });
  });

  rules.on('MOVE_RIGHT', function (entity) {
    game.applyForce(entity.id, { x: 1, y: 0, z: 0 });
    game.updateEntity({ id: entity.id, rotation: Math.PI / 2 });
  });

  rules.on('FIRE_BULLET', function (entity) {
    game.systems.bullet.fireBullet(entity.id);
  });

  rules.on('SWING_SWORD', function (entity) {
    game.systems.sword.swingSword(entity.id);
  });

  rules.on('DROP_BOMB', function (player) {
    // with no rate-limit, will drop 60 per second with default settings
    rules.emit('dropBomb', player)
  });

  rules.on('CAMERA_SHAKE', function (entity) {
    game.shakeCamera(1000);
  });
  rules.on('ZOOM_IN', function (entity) {
    let currentZoom = game.data.camera.currentZoom || 1;
    game.setZoom(currentZoom + 0.05);
  });
  rules.on('ZOOM_OUT', function (entity) {
    let currentZoom = game.data.camera.currentZoom || 1;
    game.setZoom(currentZoom - 0.05);
  });

  return rules;
}