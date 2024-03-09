// Coin.js - Marak Squires 2024
export default class Coin {
  static id = 'coin';
  constructor(config = {}) {
    this.id = Coin.id;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('coin', this);
  }

  build(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }
    //let rules = this.sutra();
    return {
      type: 'COIN',
      size: {
        width: 16,
        height: 32
      },
      // equippable: true,
      isSensor: true,
      collisionStart: this.handleCoinCollision.bind(this),
      // collectable: true,
      //onCollect: true

      texture: {
        sheet: "ayyo-coin",
        sprite: 'coin',
      },
      color: 0x00ff00,
      // container: 'laby-container',
      position: entityData.position
    };
  }

  handleCoinCollision(a, b, pair, context) {
    let coin = context.owner;
    let other = context.target;

    if (other.type === 'COIN') {
      return;
    }

    // console.log("Coin Collision Detected!", context)
    if (other.type === 'PLAYER') {
      this.game.removeEntity(coin.id);

      this.game.updateEntity(other.id, {
        score: other.score + 1
      })
    }

  }
  create(entityData = {}) {

    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    // Create the Coin entity
    const coin = game.createEntity(this.build(entityData));
  }

}