export default function topdownMovement(game) {
  return;
  let rules = game.createSutra();

  rules.if('W').then('MOVE_FORWARD');
  rules.if('A').then('MOVE_LEFT');
  rules.if('S').then('MOVE_BACKWARD');
  rules.if('D').then('MOVE_RIGHT');

  rules.if('SPACE').then('FIRE_BULLET');
  rules.if('K').then('SWING_SWORD');
  rules.if('L').then('SWING_SWORD');
  rules.if('O').then('ZOOM_IN');
  rules.if('P').then('ZOOM_OUT');

  rules.on('MOVE_FORWARD', function (entity) {
    game.applyForce(entity.id, { x: 0, y: -1, z: 0 });
    game.updateEntity({ id: entity.id, rotation: 0 });
  });

  rules.on('MOVE_BACKWARD', function (entity) {
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