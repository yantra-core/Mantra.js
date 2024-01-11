class Maze {
  static id = 'world-maze';
  static type = 'maze';

  constructor() {
    this.id = Maze.id;
  }

  init(game) {
    this.game = game;
    this.createWorld();
  }

  createWorld() {
    let game = this.game;
    game.setGravity(0, 0, 0);

    game.createDefaultPlayer({
      position: {
        x: 0,
        y: 0,
        z: 0
      }
    });

    game.setBackground('#007fff');

    game.use('Block');
    game.use('Border', { autoBorder: true });
    game.use('Bullet');
    game.use('Tone');
    game.use('Tile')
    // Create walls for a simple hallway
    //this.createHallwayWalls(game);



    

  }

  createHallwayWalls(game) {
    // Define the dimensions of the hallway
    const hallwayLength = 64; // Length of the hallway
    const wallWidth = 32;      // Width of the walls
    const wallHeight = 100;    // Height of the walls
    const hallwayWidth = 100;  // Width of the hallway

    // Create left wall
    for (let x = 0; x < hallwayLength; x += wallWidth) {
      game.createEntity({
        type: 'WALL',
        isStatic: true,
        width: wallWidth,
        height: wallHeight,
        rotation: Math.PI / 2, // Rotate 90 degrees
        position: {
          x: x,
          y: -hallwayWidth / 2, // Positioning to the left of the center
          z: 0
        }
      });
    }

    // Create right wall
    for (let x = 0; x < hallwayLength; x += wallWidth) {
      game.createEntity({
        type: 'WALL',
        isStatic: true,
        width: wallWidth,
        height: wallHeight,
        rotation: -Math.PI / 2, // Rotate -90 degrees
        position: {
          x: x,
          y: hallwayWidth / 2, // Positioning to the right of the center
          z: 0
        }
      });
    }
  }

}

export default Maze;
