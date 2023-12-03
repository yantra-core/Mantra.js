import tap from 'tape';
import { Game } from '../Game.js';
import PhysicsMatter from '../plugins/physics-matter/MatterPhysics.js';
import Entity from '../plugins/entity/Entity.js';
import SnapshotManager from '../plugins/snapshot-manager/SnapShotManager.js';

const game = new Game({
  loadDefaultPlugins: false
});

game.use(new PhysicsMatter());
game.use(new Entity());
game.use(new SnapshotManager());

tap.test('locked properties functionality', (t) => {

  t.test('locked position property', (t) => {
    const entityId = 1;
    game.createEntity({
      id: entityId,
      type: 'TEST',
      position: { x: 0, y: 0 },
      lockedProperties: {
        position: { x: true  }
      }
    });
    
    game.gameTick();

    game.updateEntity({
      id: entityId,
      type: 'TEST',
      position: { x: 10, y: 0 }
    });

    game.gameTick();

    let ent = game.getEntity(entityId);
    // Check if the position remains unchanged
    t.equal(game.getComponent(entityId, 'position').x, 0);
    t.equal(game.getComponent(entityId, 'position').y, 0);
    t.end();
  });

  t.test('unlocked position property', (t) => {
    const entityId = 2;
    game.createEntity({
      id: entityId,
      type: 'TEST',
      position: { x: 10, y: 20 }
      // lockedProperties not set
    });

    // Assume some function or physics update changes the position
    game.updateEntity({
      id: entityId,
      position: { x: 20, y: 30 }
    });

    // Check if the position has been updated
    t.equal(game.getComponent(entityId, 'position').x, 20);
    t.equal(game.getComponent(entityId, 'position').y, 30);
    t.end();
  });

  t.test('locked and unlocked properties together', (t) => {
    const entityId = 3;
    game.createEntity({
      id: entityId,
      type: 'TEST',
      position: { x: 10, y: 20 },
      lockedProperties: {
        position: { x: true }  // Only x-coordinate is locked
      }
    });
    game.gameTick();

    // Assume some function or physics update changes the position and velocity
    game.updateEntity({
      id: entityId,
      position: { x: 20, y: 30 }
    });
    game.gameTick();

    // Check if the x-coordinate of position remains unchanged, but y-coordinate and velocity are updated
    t.equal(game.getComponent(entityId, 'position').x, 10);
    t.notEqual(game.getComponent(entityId, 'position').y, 30);
    t.end();
  });

  t.end();
});
