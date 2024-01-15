// Border.js - Marak Squires 2023
class Border {

  static id = 'border';

  constructor({ autoBorder = false, position = { x: 0, y: 0 }, thickness = 20, health = 100 } = {}) {
    this.id = Border.id;
    this.position = position;
    this.autoBorder = autoBorder;
    this.thickness = thickness;
    this.health = health;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('border', this);

    // create the border based on the game size
    if (this.autoBorder) {
      this.createAutoBorder();
    }

  }

  createAutoBorder() {
    this.createBorder({
      id: 'border',
      height: this.game.height,
      width: this.game.width,
      thickness: this.thickness,
      position: {
        x: this.position.x,
        y: this.position.y
      },
      health: this.health
    });

  }

  update() {}

  createBorder(entityData) {
    let height = entityData.height;
    let width = entityData.width;
    let WALL_THICKNESS = entityData.thickness || 200;

    const borders = {
      top: {
        position: { x: 0, y: -height / 2 - WALL_THICKNESS / 2 },
        size: { width: width + WALL_THICKNESS * 2, height: WALL_THICKNESS }
      },
      bottom: {
        position: { x: 0, y: height / 2 + WALL_THICKNESS / 2 },
        size: { width: width + WALL_THICKNESS * 2, height: WALL_THICKNESS }
      },
      left: {
        position: { x: -width / 2 - WALL_THICKNESS / 2, y: 0 },
        size: { width: WALL_THICKNESS, height: height }
      },
      right: {
        position: { x: width / 2 + WALL_THICKNESS / 2, y: 0 },
        size: { width: WALL_THICKNESS, height: height }
      }
    };

    for (let b in borders) {
      let border = borders[b];
      if (typeof entityData.id === 'undefined') {
        entityData.id = 'border';
      }
      this.game.createEntity({
        name: entityData.id + '-' + b,
        type: 'BORDER',
        shape: 'rectangle',
        isStatic: true,
        position: {
          x: border.position.x,
          y: border.position.y
        },
        width: border.size.width,
        height: border.size.height,
        depth: 80,
        health: entityData.health || 100,
      });
    }

  }

  unload () {
    // remove any border types from the game
    for (let [eId, state] of this.game.entities.entries()) {
      if (state.type === 'BORDER') {
        this.game.removeEntity(eId);
      }
    }
  }

}

export default Border;