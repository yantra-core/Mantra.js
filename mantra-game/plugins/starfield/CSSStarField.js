class CSSStarField {
  static id = 'css-starfield';
  static removable = false;

  constructor(starCount = 100, fieldWidth = 800, fieldHeight = 600) {
    this.id = CSSStarField.id;
    this.starCount = starCount;
    this.fieldWidth = fieldWidth;
    this.fieldHeight = fieldHeight;
    this.particles = [];
  }

  init(game) {
    this.game = game;
    this.initialize();
  }

  initialize() {
    this.generateStarfield();
  }

  generateStarfield() {
    let game = this.game;
    game.setBackground('black');

    /*
      this.game.createEntity({
        type: 'STARFIELD',
        body: false,
        // dark purple
        color: 0x110022,
        width: this.fieldWidth,
        height: this.fieldHeight,
        style: {
          backgroundColor: 'black',
          overflow: 'hidden',
          zIndex: -1
        },
        position: {
          x: 0,
          y: 0,
          z: -10
        }
      });
      */

    for (let i = 0; i < this.starCount; i++) {
      // Adjusting star positions to be relative to the center
      const posX = (Math.random() * this.fieldWidth) - (this.fieldWidth / 2);
      const posY = (Math.random() * this.fieldHeight) - (this.fieldHeight / 2);

      this.game.createEntity({
        type: 'STAR',
        // body: false,
        isSensor: true,
        width: 4,
        height: 4,
        mass: 100,
        color: 0xffffff,
        style: {
          zIndex: 2,
          width: '2px',
          height: '2px',
          backgroundColor: 'white',
          borderRadius: '50%',
        },
        position: {
          x: posX,
          y: posY,
          z: -5
        }
      });
    }
  }

  update(playerX, playerY) {
    // Update logic (if needed)
  }
}

export default CSSStarField;
