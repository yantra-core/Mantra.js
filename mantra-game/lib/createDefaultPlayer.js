export default function createDefaultPlayer(playerConfig = {}) {
  let game = this;
  console.log('creating default player', playerConfig, this.currentPlayerId)

  if (typeof playerConfig.position === 'undefined') {
    playerConfig.position = { x: 0, y: 0 };
  }

  if (playerConfig.texture === 'none') {
    delete playerConfig.texture;
  }

  // check if game.currentPlayerId is already set, if so, return that entity
  if (this.currentPlayerId) {
    // Remark: Removed 1/22/24 as part of bringing multiplayer back
    //         Can we remove this entirely?
    // return this.getEntity(this.currentPlayerId);
  }

  let rules = game.rules;

  // maps keyboard and usb gamepad inputs
  rules.addCondition('PLAYER_UP', { op: 'or', conditions: ['W', 'DPAD_UP'] });
  rules.addCondition('PLAYER_DOWN', { op: 'or', conditions: ['S', 'DPAD_DOWN'] });
  rules.addCondition('PLAYER_LEFT', { op: 'or', conditions: ['A', 'DPAD_LEFT'] });
  rules.addCondition('PLAYER_RIGHT', { op: 'or', conditions: ['D', 'DPAD_RIGHT'] });
  rules.addCondition('USE_ITEM_1', { op: 'or', conditions: ['SPACE', 'H', 'BUTTON_B'] });
  rules.addCondition('USE_ITEM_2', { op: 'or', conditions: ['J', 'BUTTON_X'] });
  rules.addCondition('ZOOM_IN', { op: 'or', conditions: ['K', 'BUTTON_A'] });
  rules.addCondition('ZOOM_OUT', { op: 'or', conditions: ['L', 'BUTTON_Y'] });


  // Uses default player movement actions
  // see: ../mantra-sutras/movement/top-down.js events MOVE_UP, MOVE_DOWN, etc.
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

  rules
    .if('USE_ITEM_2')
    .then("DROP_BOMB")

  // replace with rules.do('ZOOM_IN')
  rules.if('ZOOM_IN').then('ZOOM_IN');
  rules.if('ZOOM_OUT').then('ZOOM_OUT');

  rules.on('FIRE_BULLET', function (player) {
    if (game.systems.bullet) {
      game.systems.bullet.fireBullet(player.id);
    }
  });

  rules.on('DROP_BOMB', function (player) {
    // with no rate-limit, will drop 60 per second with default settings
    rules.emit('dropBomb', player)
  });

  let player = this.createEntity({
    name: playerConfig.name,
    type: 'PLAYER',
    shape: 'triangle',
    collisionActive: true,
    collisionStart: true,
    collisionEnd: true,
    width: playerConfig.width || 16,
    height: playerConfig.height || 16,
    color: playerConfig.color,
    radius: playerConfig.radius,
    texture: playerConfig.texture,
    mass: 222,
    friction: 0.5,  // Default friction
    frictionAir: 0.5, // Default air friction
    frictionStatic: 1, // Default static friction
    // color: 0x00ff00,
    position: playerConfig.position,
  });

  this.setPlayerId(player.id);
  return player;

};