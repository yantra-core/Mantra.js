// Border.js - Marak Squires 2023
class Border {
  constructor({ autoBorder = true, height  = 600, width = 800, position = { x: 0, y: 0 } } = {}) {
    this.name = 'Border';
    this.height = height;
    this.width = width;
    this.position = position;
    this.autoBorder = autoBorder;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('border', this);

    // create the border based on the game size
    if (this.autoBorder) {
      this.createBorder({
        id: 'border',
        height: this.game.height,
        width: this.game.width,
        position: {
          x: this.position.x,
          y: this.position.y
        }
      });
    }

  }

  update() {}

  createBorder(entityData) {

    let height = entityData.height;
    let width = entityData.width;
    let WALL_THICKNESS = 200;

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

      this.game.createEntity({
        id: entityData.id + '-' + b,
        type: 'BORDER',
        shape: 'rectangle',
        isStatic: true,
        position: {
          x: border.position.x,
          y: border.position.y
        },
        width: border.size.width,
        height: border.size.height,
        depth: 80
      });
    }

  }

}

export default Border;