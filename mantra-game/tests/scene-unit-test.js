import tap from 'tape';
import { Game } from '../Game.js';
import Schema from '../plugins/schema/Schema.js';
import PhysicsMatter from '../plugins/physics-matter/MatterPhysics.js';
import Entity from '../plugins/entity/Entity.js';
import EntityInput from '../plugins/entity-input/EntityInput.js';
import SnapshotManager from '../plugins/snapshot-manager/SnapshotManager.js';
import hasStateChanged from '../plugins/snapshot-manager/SnapshotManager/hasStateChanged.js';
import Client from '../plugins/client/Client.js';

const game = new Game({
  isServer: true,
  loadDefaultPlugins: false,
  msgpack: false,
  deltaCompression: false,
  protobuf: false,
  deltaEncoding: true,
  //gameRoot: '.'
});

game.use(new Client());

game.use(new Schema());
game.use(new PhysicsMatter());
game.use(new Entity());
game.use(new EntityInput());
game.use(new SnapshotManager());

//
// Define a test scene
//
class MyScene {
  static id = 'myscene';
  static type = 'scene'; // type is optional for Plugins
  constructor(game) {
    this.game = game; // Store the reference to the game logic
    this.id = MyScene.id;
    this.type = MyScene.type;
  }

  async preload(game) {
    game.addAsset('/img/game/tiles/tile-grass.png', 'image', 'tile-grass-0');
  }

  init(game) {
    console.log("Initializing MyScene");
    this.game.setBackground('#000000');

    this.createText({
      text: 'My Scene.',
      position: {
        x: 0,
        y: 0
      },
      size: {
        width: 280,
        height: 50,
      },
      color: 0xffffff,
      style: {
        backgroundColor: 'black',
        fontSize: '44px',
      },
    });

    // create grass block
    this.createEntity({
      type: 'BLOCK',
      size: {
        width: 50,
        height: 50
      },
      hasCollisionStart: true,
      position: {
        x: 0,
        y: 50
      },
      texture: 'tile-grass-0'
    });

    console.log('INIT game.scenes', this.game.scenes);


  }

  unload() {
    console.log("Unloading MyScene");
  }
}

let myScene;


tap.test('Game.Scene', (t) => {

  t.test('create a new Scene as a Plugin', (t) => {

    myScene = new MyScene(game);
    game.use(myScene);


    setTimeout(function () {
      myScene.init(game);

      console.log('game.data', game.data);
      // should be registered in game.scenes with id as key
      t.ok(game.data.scenes.myscene, 'Scene should be registered in game.scenes');


      let entCount = Object.keys(game.data.ents._).length; // TODO: fix this, .size should work?
      t.ok(entCount, 2, 'Scene should have created 2 entities');


      // check conditions for each ent to ensure they are in container named after scene
      let ents = game.data.ents._;
      let sceneEnts = Object.keys(ents).filter((entId) => {
        return ents[entId].scene === 'myscene';
      });

      t.ok(sceneEnts.length, 2, 'Scene should have 2 entities in its container');

      t.end();
    }, 1)

  });

  t.test('unload a the Scene should remove all entities which are contained in the scene', (t) => {
    //game.dscenes.myScene.unload();
    // console.log("game.data.scenes.myscene", game.data.scenes.myscene)
    game.unload('myscene');
    game.systems['entity'].cleanupDestroyedEntities();
    game.gameTick();
    setTimeout(function () {
      let entCount = Object.keys(game.data.ents._).length;
      t.equal(entCount, 0, 'Scene should have removed all entities');
      t.end();
    }, 1)
  });

});