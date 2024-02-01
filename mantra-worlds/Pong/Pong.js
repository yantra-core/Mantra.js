class Pong {

  static id = 'world-pong';

  constructor(config = {}) {
    this.averageSnapshotSize = null;
    this.displayElement = null;
    this.id = Pong.id;
  }

  init(game) {
    this.game = game;

    // In order to let Mantra know the Pong Class subscribes to gameloop update() method
    // we must register it with the game instance as a "System".
    this.game.addSystem(this.id, this);
    // Now the game instance will call this.update()


    // TODO: refactor into functions
    /*
    game.systems['entity-input'].controlMappings = {
      W: 'PLAYER_UP',
      S: 'PLAYER_DOWN'
    };
    */

    let leftSide = game.width / 3 * -1;

    // custom player join logic
    game.on('player::joined', function (playerData) {
      console.log('a player has joined the server', playerData);
      let player = game.createEntity({
        id: playerData.id, // TODO: replace this
        type: 'PLAYER',
        shape: 'rectangle',
        restitution: 0, // bounciness
        mass: 90000,
        height: 300,
        width: 40,
        friction: 0,  // Default friction
        frictionAir: 0, // Default air friction
        frictionStatic: 0, // Default static friction
        lockedProperties: {
          position: {
            x: leftSide
          }
        }
      });
      // make sure to let the game know that the player has been created
      game.emit('player::created', player);
    });

    //
    // Create the Player
    //
  
    this.createBorder();
    this.createBall();

  }

  update() {
    // console.log('update');

    // TODO: scoring functions
  }

  createBall() {
    this.game.createEntity({
      id: 'game-ball',
      type: 'BALL',
      x: 0,
      y: 500,
      height: 50,
      width: 50,
      velocity: { // set initial velocity
        x: 8,
        y: 8
      },
      maxSpeed: 20,
      restitution: 2.5, // bounciness
      friction: 0,  // Default friction
      frictionAir: 0, // Default air friction
      frictionStatic: 0, // Default static friction
    });
  }

  createBorder(entityData = {}) {

    let height = 1000;
    let width = 2000;
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
        depth: 80
      });
    }
  }


}

export default Pong;
