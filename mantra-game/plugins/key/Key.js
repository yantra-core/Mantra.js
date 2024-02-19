// Key.js - Marak Squires 2023
export default class Key {
  static id = 'key';
  constructor(config = {}) {
    this.id = Key.id;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('key', this);
  }

  build(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }
    //let rules = this.sutra();
    return {
      type: 'KEY',
      size: {
        width: 16,
        height: 8
      },
      // equippable: true,
      isSensor: true,
      collectable: true,
      //onCollect: true

      name: 'maze-door-0',
      texture: "ayyo-key",
      color: 0x00ff00,
      // container: 'laby-container',
      position: entityData.position
    };
  }

  create(entityData = {}) {

    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    // Create the Key entity
    const key = game.createEntity(this.build(entityData));
  }

}