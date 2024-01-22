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


let player;
// Test suite for field of view functionality
tap.test('Field of View Tests', (t) => {

  t.test('Player field of view setup', (t) => {
    player = game.createEntity({
      name: 'player',
      position: { x: 50, y: 50 },
    });

    game.data.fieldOfView = 30; // Set the global field of view

    t.end();
  });

  t.test('Objects within and outside player field of view', (t) => {
    // Create entities within the field of view
    const entityInFoV = game.createEntity({
      name: 'entityInFoV',
      position: { x: 60, y: 60 }, // within 30 units of the player
      width: 5,
      height: 5,
    });

    // Create entities outside the field of view
    const entityOutFoV = game.createEntity({
      name: 'entityOutFoV',
      position: { x: 100, y: 100 }, // outside 30 units of the player
      width: 5,
      height: 5,
    });

    // Get snapshot for the player
    const visibleEntities = game.getPlayerFieldOfView(player.id, game.data.fieldOfView);
    const visibleEntityIds = visibleEntities.map(entity => entity.id);

    // Check if entityInFoV's id is in the array of visible entity ids and entityOutFoV's id is not
    t.ok(visibleEntityIds.includes(entityInFoV.id), 'Entity within FoV should be visible to the player');
    t.notOk(visibleEntityIds.includes(entityOutFoV.id), 'Entity outside FoV should not be visible to the player');

    t.end();
  });


  t.test('Field of View with Negative Coordinates', (t) => {
    const playerWithNegativeCoords = game.createEntity({
      name: 'playerNegative',
      position: { x: -50, y: -50 },
    });

    const entityInFoVNegative = game.createEntity({
      name: 'entityInFoVNegative',
      position: { x: -40, y: -40 },
      width: 5,
      height: 5,
    });

    const entityOutFoVNegative = game.createEntity({
      name: 'entityOutFoVNegative',
      position: { x: -200, y: -200 },
      width: 5,
      height: 5,
    });

    const visibleEntitiesNegative = game.getPlayerFieldOfView(playerWithNegativeCoords.id, game.data.fieldOfView);
    const visibleEntityIdsNegative = visibleEntitiesNegative.map(entity => entity.id);

    t.ok(visibleEntityIdsNegative.includes(entityInFoVNegative.id), 'Entity within FoV with negative coordinates should be visible to the player');
    t.notOk(visibleEntityIdsNegative.includes(entityOutFoVNegative.id), 'Entity outside FoV with negative coordinates should not be visible to the player');

    t.end();
  });

  t.end();
});
