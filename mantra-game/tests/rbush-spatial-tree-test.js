import tap from 'tape';
import { Game } from '../Game.js';
import RBush from '../plugins/rbush/RBush.js';
import Schema from '../plugins/schema/Schema.js';
import PhysicsMatter from '../plugins/physics-matter/MatterPhysics.js';
import Entity from '../plugins/entity/Entity.js';
import EntityInput from '../plugins/entity-input/EntityInput.js';
import SnapshotManager from '../plugins/snapshot-manager/SnapshotManager.js';

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
game.use(new RBush());

let entity1, entity2;

tap.test('RBush plugin integration tests', (t) => {
  t.test('add and search entities in RBush', (t) => {
    entity1 = game.createEntity({
      name: 'entity1',
      position: {
        x: 10,
        y: 20
      },
      width: 5,
      height: 5
    });

    entity2 = game.createEntity({
      name: 'entity2',
      position: {
        x: 15,
        y: 25
      },
      width: 5,
      height: 5
    });

    // Now, let's search for entities in a specific area
    let rbushSystem = game.systemsManager.getSystem('rbush');
    let foundEntities = rbushSystem.search({
      minX: 9,
      minY: 19,
      maxX: 16,
      maxY: 26
    }, true);

    // Check if the correct entities are returned
    t.equal(foundEntities.some(e => e.id === 1), true, 'Entity1 should be found in the search area');
    t.equal(foundEntities.some(e => e.id === 2), true, 'Entity2 should be found in the search area');

    t.end();
  });

  t.test('update and re-search entities in RBush', (t) => {
    // Update an entity's position
    game.updateEntity({
      id: entity2.id,
      position: {
        x: 300,
        y: 400
      },
      width: 5,
      height: 5
    });

    // move physics forward
    game.physics.updateEngine(1000);
    // Re-search in the previous area
    let rbushSystem = game.systemsManager.getSystem('rbush');
    let foundEntities = rbushSystem.search({
      minX: 9,
      minY: 19,
      maxX: 16,
      maxY: 26
    });

    // Entity2 should no longer be found in the original search area after being moved
    t.equal(foundEntities.some(e => e.name === 'entity2'), false, 'a Entity2 should not be found in the original search area after update');

    t.end();
  });

  t.test('remove entity from RBush', (t) => {
    game.removeEntity(entity2.id);

    let rbushSystem = game.systemsManager.getSystem('rbush');
    let foundEntities = rbushSystem.search({
      minX: 0,
      minY: 0,
      maxX: 50,
      maxY: 50
    });

    // Entity2 should not be found after removal
    t.equal(foundEntities.some(e => e.name === 'entity2'), false, 'b Entity2 should not be found after it has been removed');

    t.end();
  });


  t.end();
});