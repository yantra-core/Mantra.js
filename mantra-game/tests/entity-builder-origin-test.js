import tap from 'tape';
import { Game } from '../Game.js';
import Schema from '../plugins/schema/Schema.js';
import PhysicsMatter from '../plugins/physics-matter/MatterPhysics.js';
import Entity from '../plugins/entity/Entity.js';
import EntityInput from '../plugins/entity-input/EntityInput.js';
import SnapshotManager from '../plugins/snapshot-manager/SnapshotManager.js';
import hasStateChanged from '../plugins/snapshot-manager/SnapshotManager/hasStateChanged.js';

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


tap.test('EntityBuilder.layout()', (t) => {
  // Test for layout positions
 // Add tests for origin functionality
 t.test('Origin offset adjustments', (t) => {
  const mockEntity = game.make()
    .type('NPC')
    .size(50, 50); // Assuming size is needed to calculate offsets

  // Test various origin settings
  const originsToTest = {
    'center': { x: 0, y: 0 },
    'top': { x: 0, y: -25 },
    'bottom': { x: 0, y: 25 },
    'left': { x: -25, y: 0 },
    'right': { x: 25, y: 0 },
    'top-left': { x: -25, y: -25 },
    'top-right': { x: 25, y: -25 },
    'bottom-left': { x: -25, y: 25 },
    'bottom-right': { x: 25, y: 25 }
  };

  Object.entries(originsToTest).forEach(([origin, expectedOffset]) => {
    // Reset the entity's offset to simulate a fresh state
    mockEntity.config.offset = { x: 0, y: 0, z: 0 };
    expectedOffset.z = 0;

    mockEntity.origin(origin); // Apply origin
    // Assuming the origin method adjusts config.offset based on the origin
    t.deepEqual(mockEntity.config.offset, expectedOffset, `Offset for origin ${origin} should be ${JSON.stringify(expectedOffset)}`);
  });

  t.end();
  });

});