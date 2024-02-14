// TODO: use Entity.sutra to bind movement directly to the player
// import topdown from './Game/defaults/defaultTopdownMovement.js';

export default function createDefaultPlayer(playerConfig = {}) {
  let game = this;
  console.log('creating default player', playerConfig, this.currentPlayerId)

  if (typeof playerConfig.position === 'undefined') {
    playerConfig.position = { x: 0, y: 0 };
  }

  if (playerConfig.texture === 'none') {
    delete playerConfig.texture;
  }

  if (typeof playerConfig.rotation !== 'number') {
    playerConfig.rotation = 0;
  }

  // check if game.currentPlayerId is already set, if so, return that entity
  if (this.currentPlayerId) {
    // Remark: Removed 1/22/24 as part of bringing multiplayer back
    //         Can we remove this entirely?
    // return this.getEntity(this.currentPlayerId);
  }

  let rules = game.rules;

  if (typeof playerConfig.texture === 'undefined') {
    playerConfig.texture = {
      sheet: 'loz_spritesheet',
      sprite: 'player',
    };
  }

  let player = this.createEntity({
    name: playerConfig.name,
    type: 'PLAYER',
    shape: 'triangle',
    rotation: playerConfig.rotation,
    collisionActive: true,
    collisionStart: true,
    collisionEnd: true,
    width: playerConfig.width || 16,
    height: playerConfig.height || 16,
    color: playerConfig.color,
    radius: playerConfig.radius,
    texture: playerConfig.texture,
    mass: 222,
    // sutra: topdown(game), // TODO: replace with more comprehensive player sutra with sprites and item actions
    friction: 0.5,  // Default friction
    frictionAir: 0.5, // Default air friction
    frictionStatic: 1, // Default static friction
    // color: 0x00ff00,
    position: playerConfig.position,
    // sutra: playerConfig.sutra,
  });

  this.setPlayerId(player.id);
  return player;

};