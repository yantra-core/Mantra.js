export default function topdownMovement(game) {

  let rules = game.createSutra();

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
