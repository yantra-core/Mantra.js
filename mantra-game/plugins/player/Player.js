// Player.js - Marak Squires 2024
export default class Player {
  static id = 'player';
  constructor(config = {}) {
    this.id = Player.id;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('player', this);
  }

  build(playerConfig = {}) {

    if (typeof playerConfig.position === 'undefined') {
      playerConfig.position = { x: 0, y: 0 };
    }

    if (typeof playerConfig.position === 'undefined') {
      playerConfig.position = { x: 0, y: 0, z: 1 };
    }

    if (playerConfig.texture === 'none') {
      delete playerConfig.texture;
    }

    if (typeof playerConfig.rotation !== 'number') {
      playerConfig.rotation = 0;
    }
    if (typeof playerConfig.texture === 'undefined' && playerConfig.texture !== null) {
      playerConfig.texture = {
        sheet: 'loz_spritesheet',
        sprite: 'player',
      };
    }

    return {
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
      /*
      afterRemoveEntity: function(entity){
        // creates the same player again with the same config
        // console.log('player removed', entity.id)
        //throw new Error('Player removed');
        // causing issues wit warping worlds since we remove all ents and this re-creates the player
        //game.createPlayer(playerConfig);
      },
      */
      mass: 222,
      // sutra: topdown(game), // TODO: replace with more comprehensive player sutra with sprites and item actions
      friction: 0.5,  // Default friction
      frictionAir: 0.5, // Default air friction
      frictionStatic: 1, // Default static friction
      // color: 0x00ff00,
      position: playerConfig.position,
      // sutra: playerConfig.sutra,
    };
  }

  createEntity(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }
    // Create the Player entity
    const player = game.createEntity(this.build(entityData));
  }

  sutra() {
    // no default player sutras ( yet )
  }

}