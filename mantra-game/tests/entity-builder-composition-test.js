//
// This file tests EntityBuilder game.build() to ensure all entity configs can compose and build correctly
// This includes aggregating event functions like pointer or collision into composite handlers
// Most values will be overwritten by the last value in the chain, but event handlers will be aggregated
//
import tap from 'tape';
import { Game } from '../Game.js';
import Schema from '../plugins/schema/Schema.js';
import PhysicsMatter from '../plugins/physics-matter/MatterPhysics.js';
import Sutra from '../plugins/sutra/Sutra.js';
import Entity from '../plugins/entity/Entity.js';
import EntityInput from '../plugins/entity-input/EntityInput.js';
import SnapshotManager from '../plugins/snapshot-manager/SnapshotManager.js';
import hasStateChanged from '../plugins/snapshot-manager/SnapshotManager/hasStateChanged.js';

import Flame from '../plugins/flame/Flame.js';
import GravityWell from '../plugins/gravitywell/GravityWell.js';

const game = new Game({
  loadDefaultPlugins: false,
  msgpack: false,
  deltaCompression: false,
  protobuf: false,
  deltaEncoding: true
});

game.use(new Schema());
game.use(new PhysicsMatter());
game.use(new Entity());
game.use(new EntityInput());
game.use(new SnapshotManager());
game.use(new Sutra());
game.use(new Flame());
game.use(new GravityWell());

let collisionState = {
  a: false,
  b: false
};

class CustomPluginA {
  static id = 'custom-plugin-a';
  constructor(config = {}) {
    this.id = CustomPluginA.id;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('custom-plugin-a', this);
  }

  build (entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }
    //let rules = this.sutra();
    return {
      type: 'CUSTOM',
      collisionStart: function customACollisionStart () {
        collisionState.a = true;
      }
    };
  }
}

game.use(new CustomPluginA());


class CustomPluginB {
  static id = 'custom-plugin-b';
  constructor(config = {}) {
    this.id = CustomPluginB.id;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('custom-plugin-b', this);
  }

  build (entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }
    //let rules = this.sutra();
    return {
      type: 'CUSTOM',
      collisionStart: function customACollisionStart () {
        collisionState.b = true;
      }
    };
  }
}

game.use(new CustomPluginB());

tap.test('game.build() API', (t) => {

  // Test the builder's basic functionality
  t.test('Builder can use Plugin.build methods to build configurations', (t) => {
    const entityConfig = game.build().Flame().build();
    // Check that the configuration matches what was set in the builder
    t.deepEqual(entityConfig.position, { x: 0, y: 0, z: 1 }, 'Position should be set to (100, 200)');
    t.deepEqual(entityConfig.size, { width: 16, height: 16, depth: 16 }, 'Size should be set to 50x60');
    t.end();
  });

  // Test the builder's basic functionality
  t.test('Builder can use compose Plugin.build configurations', (t) => {
    const entityConfig = game.build()
    .CustomPluginA()
    .CustomPluginB()
    .build();

    t.deepEqual(entityConfig.type, 'CUSTOM', 'Type should be set to CUSTOM');

    // trigger the collisionStart event
    entityConfig.collisionStart();

    // both collision events should have fired 
    t.deepEqual(collisionState.a, true, 'CustomPluginA collisionStart should have fired');
    t.deepEqual(collisionState.b, true, 'CustomPluginB collisionStart should have fired');
    t.end();
  });

});