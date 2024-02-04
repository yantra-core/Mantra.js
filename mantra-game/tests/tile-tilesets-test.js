import tap from 'tape';
import { Game } from '../Game.js';
import RBush from '../plugins/rbush/RBush.js';
import Schema from '../plugins/schema/Schema.js';
import Tile from '../plugins/tile/Tile.js';
import PhysicsMatter from '../plugins/physics-matter/MatterPhysics.js';
import Entity from '../plugins/entity/Entity.js';
import EntityInput from '../plugins/entity-input/EntityInput.js';
import SnapshotManager from '../plugins/snapshot-manager/SnapshotManager.js';



tap.test('Tile plugin custom tile set', (t) => {

  t.test('custom TileSet can be passed into Tile constructor', (t) => {

      const game = new Game({
        loadDefaultPlugins: false,
        msgpack: false,
        deltaCompression: false,
        protobuf: false,
        deltaEncoding: true
      });
      
      game.use(new PhysicsMatter());
      game.use(new Entity());
      game.use(new EntityInput());
      game.use(new SnapshotManager());

      let tileSet = [
        { id: 0, kind: 'test-empty', weight: 10 },
        { id: 1, kind: 'test-bush', weight: 2, body: true, isStatic: true,  z: 16 },
        { id: 2, kind: 'test-grass', weight: 63 },
      ];
  
      game.use(new Tile({ 
        loadInitialChunks: false,
        loadDefaultTileMap: false,
        loadTileMap: false,
        tileSet: tileSet
      }));
  
      t.equal(game.systems.tile.tileSet[0].kind, 'test-empty');
      t.equal(game.systems.tile.tileSet[1].kind, 'test-bush');
      t.equal(game.systems.tile.tileSet[2].kind, 'test-grass');
  
      t.end();
  });


  t.test('create a new TileSet and set it as default Tile.tileSet', (t) => {


    const game = new Game({
      loadDefaultPlugins: false,
      msgpack: false,
      deltaCompression: false,
      protobuf: false,
      deltaEncoding: true
    });
    
    game.use(new PhysicsMatter());
    game.use(new Entity());
    game.use(new EntityInput());
    game.use(new SnapshotManager());

    game.use(new Tile({
      loadInitialChunks: false,
      loadDefaultTileMap: false,
      loadTileMap: false,
    }));

    let tileSet = [
      { id: 0, kind: 'test-empty', weight: 10 },
      { id: 1, kind: 'test-bush', weight: 2, body: true, isStatic: true,  z: 16 },
      { id: 2, kind: 'test-grass', weight: 63 },
    ];

    // check for default tileSet values
    t.equal(game.systems.tile.tileSet[0].kind, 'empty');
    t.equal(game.systems.tile.tileSet[1].kind, 'bush');
    t.equal(game.systems.tile.tileSet[2].kind, 'grass');

    game.systems.tile.useTileSet('test', tileSet);

    // check for custom tileSet values
    t.equal(game.systems.tile.tileSet[0].kind, 'test-empty');
    t.equal(game.systems.tile.tileSet[1].kind, 'test-bush');
    t.equal(game.systems.tile.tileSet[2].kind, 'test-grass');

    t.end();
  });

});