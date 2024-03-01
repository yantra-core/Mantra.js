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
  t.test('Layout positions', (t) => {

    // Create a mock entity with a layout method and a position method
    const mockEntity = game.make()
      .type('NPC') // Assuming the type method is chainable and returns the entity
      .size(50, 50)
      .layout('center', { width: 800, height: 600 }); // Using explicit dimensions for predictability

    // Assuming the entity's position method updates an internal _position property
    const expectedCenterPosition = { x: 0, y: 0 }; // Center position for the given dimensions
    t.deepEqual(mockEntity.config.position, expectedCenterPosition, 'Entity should be centered with given dimensions');

    // Test other positions
    const positionsToTest = {
      'top-left': { x: -400, y: -300 },
      'top-center': { x: 0, y: -300 },
      'top-right': { x: 400, y: -300 },
      'bottom-left': { x: -400, y: 300 },
      'bottom-center': { x: 0, y: 300 },
      'bottom-right': { x: 400, y: 300 },
      'center-left': { x: -400, y: 0 },
      'center-right': { x: 400, y: 0 }
    };
    
    Object.entries(positionsToTest).forEach(([origin, expectedPosition]) => {
      mockEntity.layout(origin, { width: 800, height: 600 }); // Reapply layout with different origins
      t.deepEqual(mockEntity.config.position, expectedPosition, `Entity should be at (${expectedPosition.x}, ${expectedPosition.y}) for ${origin}`);
    });

    t.end();
  });

});