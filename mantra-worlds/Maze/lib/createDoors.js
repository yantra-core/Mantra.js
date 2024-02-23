function createHomeKey (game) {
  game.make().Key().position(-100, 30, 0).createEntity();
}

export default function createDoors(game) {

  //
  // Creates a CONTAINER to hold the doors
  // 
  // Containers are a way to group entities together
  // With no layout given, entities will be placed relative to the container
  // With a layout given, entities will be placed according to the layout algorithm
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
      height: 180
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
      name: 'maze-door-' + i,
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'ayyoDoor',
      },
      color: 0x00ff00,
      container: 'laby-container',
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
          game.shakeCamera({ initialIntensity: 22, duration: 666 });
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
          createHomeKey(game);
        }

        game.flash();
        game.flashText(algos[i]);

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

      }
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

  createHomeKey(game);

  // create text label instruction for picking up keys
  game.createEntity({
    type: 'TEXT',
    body: false,
    text: 'Collect keys to open doors',
    size: {
      width: 400,
      height: 20
    },
    style: {
      fontSize: '16px',
      color: '#ffffff',
      textAlign: 'center'
    },
    position: {
      x: -100,
      y: 20
    }
  });

}