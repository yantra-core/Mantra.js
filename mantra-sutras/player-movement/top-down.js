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

  rules
    .if('PLAYER_UP')
    .then('MOVE_UP')

  rules
    .if('PLAYER_LEFT')
    .then('MOVE_LEFT')

  rules
    .if('PLAYER_DOWN')
    .then('MOVE_DOWN')

  rules
    .if('PLAYER_RIGHT')
    .then('MOVE_RIGHT')

  rules
    .if('USE_ITEM_1')
    .then('FIRE_BULLET')
    .map('determineShootingSprite')
    .then('updateSprite');


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
  })

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

  // game.emit('entityInput::handleActions', entityId, actions);

  return rules;
}
