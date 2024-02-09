import createDoors from './lib/createDoors';

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


    // TODO: create containers of entities
    // containers can have layouts applied to them
    // if a container is already created an entity can be added to it
    // we wish to layout the entity upon creation when possible instead of on update ( to prevent flickering )

    // a container will not be sent over the wire?
    // game.createPlayer();

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

    /*
    game.createEntity({
      size: {
        width: 16,
        height: 16
      },
      name: 'maze-door-0',
      texture: 'tile-entrance',
      color: 0x00ff00,
      container: 'laby-container',
      position: { // relative to the container
        x: 100,
        y: 0,
        z: 0
      }
    });
    */


  }

}

export default Maze;