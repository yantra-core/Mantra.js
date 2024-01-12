export default function createDefaultPlayer(playerConfig = {}) {
  // console.log('creating default player', playerConfig)

  if (typeof playerConfig.position === 'undefined') {
    playerConfig.position = { x: 0, y: 0 };
  }

  if (playerConfig.texture === 'none') {
    delete playerConfig.texture;
  }

  // check if game.currentPlayerId is already set,
  // if so return
  if (this.currentPlayerId) {
    return this.getEntity(this.currentPlayerId);
  }

  let player = this.createEntity({
    type: 'PLAYER',
    shape: 'triangle',
    width: 16,
    height: 16,
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