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

    // shortcuts to game.createContainer();
    let container = game.createContainer({
      name: 'laby-container',
      layout: 'grid', // optional. can also be "flex" or "none"
      color: 0xff00ff,
      position: {
        x: -100,
        y: -100,
        z: -1
      },
      body: false,
      size: {
        width: 300,
        height: 200
      },
      grid: {
        columns: 4,
        rows: 8
      },
      style: { // supports CSS property names
        padding: 0,
        margin: 0,
        // background: '#ff0000', // can also use Entity.color
        border: {
          color: '#000000',
          width: 0
        }
      },
    });

    // adds the entity to the container
    // ent.position becomes relative to the container
    //let ent = game.createEntity({}); // etc, create new ent
    //container.add(ent);
    let algos = [];

    algos.push('AldousBroder');
    algos.push('BinaryTree');
    algos.push('CellularAutomata');
    algos.push('EllersAlgorithm');
    algos.push('GrowingTree');
    algos.push('RecursiveBacktrack');
    algos.push('RecursiveDivision');
    algos.push('BeattieSchoberth');
    algos.push('ThomasHunter');
    algos.push('Metroidvania');

    for (let i = 0; i < 10; i++) {

      // create entity directly inside container with relative position
      game.createEntity({
        /*
        exit: {
          world: 'Home'
        },
        */
        collisionStart: function (a, b) {

          // get the a b that isnt the door
          let enterEnt = a.name === 'maze-door-' + i ? a : b;
          let player = a.type === 'PLAYER' ? a : b;
          // only allow player collisions to trigger door events
          if (player.type !== 'PLAYER') {
            return;
          }

          // check to see if entity that collides has items which contains any type === 'KEY'
          // if so, remove the key and open the door

          // does the player have any items
          if (!player.items || player.items.length === 0) {
            game.shakeCamera({initialIntensity: 22, duration: 666});
            return;
          }

          // TODO: make this a CONTAINER and then just remove all items in container
          // default behavior is to clear all tiles

          // clear all keys
          if (game.data.ents.KEY) {
            game.data.ents.KEY.forEach((key) => {
              game.removeEntity(key.id);
            });
            // create a new key at where it started
            createHomeKey();
          }

          game.flash();
          game.anime(algos[i]);

          // clear all current tiles
          if (game.data.ents.TILE) {
            game.data.ents.TILE.forEach((tile) => {
              game.removeEntity(tile.id);
            });
          }

          // Tile.createTile() can delegate ent types with override in TileSet config
          // currently only BLOCK, we'll need to figure out to clear entire level or perhaps scene / container
          if (game.data.ents.BLOCK) {
            game.data.ents.BLOCK.forEach((block) => {
              game.removeEntity(block.id);
            });
          }

          // clear any tiles that are deferred
          for (let eId in game.deferredEntities) {
            let ent = game.deferredEntities[eId.toString()];
            if (ent.type === 'TILE') {
              // game.removeEntity(ent.id);
              delete game.deferredEntities[eId.toString()];
            }
          }

          // clear the players items
          game.updateEntity({
            id: player.id,
            items: []
          });

          // update the player position to the exit position ( can customimze this )
          // game.setPosition(enterEnt.id, { x: 0, y: 0, z: 0 }); // for now, can use .meta.position as well

          // generate a new seed and regenerate the maze with the new seed and existing settings
          let seed = Math.floor(Math.random() * 100000000000);

          let tileMap = {
            x: 20, // Remark: This will place tile map in TileMap units, not pixed
            y: -6, // Actual values will be x * 16, y * 16
            width: 32,
            height: 32,
            seed: seed,
            algo: algos[i],
            meta: {
              source: 'labryninthos',
              algo: 'recursive-backtracking',
              height: 16,
              width: 16
            }
          };

          // TODO: remove this if we can
          game.systems.tile.tileMap = tileMap;
          // set the new seed
          // ileMap.seed = seed;

          // regenerate the tile map
          game.systems.tile.createTileMap(tileMap)

        },
        body: true,
        meta: {
          source: 'labryninthos',
          algo: 'recursive-backtracking',
          height: 16,
          width: 16
        },
        isStatic: true,
        type: 'DOOR',
        size: {
          width: 16,
          height: 16
        },
        name: 'maze-door-' + i,
        texture: {
          sheet: 'loz_spritesheet',
          sprite: 'ayyoDoor',
        },
        color: 0x00ff00,
        container: 'laby-container',
      });

      // create a text label for each door
      game.createEntity({
        type: 'TEXT',
        text: algos[i],
        size: {
          width: 80,
          height: 10
        },
        style: {
          fontSize: '8px',
        },
        body: false,
        position: { // relative to the container
          x: 0,
          y: 0,
          z: 0
        },
        container: 'laby-container',
      });
    }

    function createHomeKey () {

      game.createEntity({
        type: 'KEY',
        size: {
          width: 16,
          height: 16
        },
        // equippable: true,
        isSensor: true,
        collectable: true,
        //onCollect: true
  
        name: 'maze-door-0',
        texture: {
          sheet: 'loz_spritesheet',
          sprite: 'ayyoKey',
        },
        color: 0x00ff00,
        container: 'laby-container',
        position: { // relative to the container
          x: 350,
          y: -50,
          z: 0
        }
      });
    }
    createHomeKey();


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