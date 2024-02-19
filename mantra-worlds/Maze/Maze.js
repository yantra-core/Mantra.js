import createDoors from './lib/createDoors';

class Maze {
  static id = 'world-maze';
  static type = 'world';

  constructor() {
    this.id = Maze.id;
  }

  init(game) {
    this.game = game;
    this.createWorld();
  }

  createWorld() {
    let game = this.game;
    game.reset();
    game.zoom(2.5);
    game.setGravity(0, 0, 0);
    game.createPlayer({
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'player',
      },
      position: {
        x: -100,
        y: 10,
        z: 1
      }
    });

    game.setBackground('#000000');

    game.use('Block');
    // game.use('Border', { autoBorder: true });
    game.use('Bullet');
    game.use('Boomerang');
    game.use('Tone');
    game.use('Tile');
    game.use('Collectable');
    createDoors(game);

    //
    // warp to Mantra Home World
    //
    game.createEntity({
      type: 'WARP',
      exit: {
        world: 'Home'
      },
      texture: 'warp-to-home',
      width: 64,
      height: 64,
      isStatic: true,
      position: {
        x: -400,
        y: -100,
        z: 0
      }
    });

    // text "Warp to Mantra"
    game.createEntity({
      type: 'TEXT',
      text: 'Warp To Mantra',
      body: false,
      // kind: 'dynamic',
      style: {
        padding: '2px',
        fontSize: '16px',
        color: '#ffffff',
        textAlign: 'center'
      },
      body: false,
      position: {
        x: -400,
        y: -120
      }
    });

  }

}

export default Maze;