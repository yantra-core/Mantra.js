import tap from 'tape';
import { Game } from '../Game.js';
import PhysicsMatter from '../plugins/physics-matter/MatterPhysics.js';

import Entity from '../plugins/entity/Entity.js';
import EntityInput from '../plugins/entity-input/EntityInput.js';
import EntityMovement from '../plugins/entity-movement/EntityMovement.js';
import DefaultTwoDimensionalInputStrategy from '../plugins/entity-input/strategies/2D/Default2DInputStrategy.js';
import Bullet from '../plugins/bullet/Bullet.js';
import SnapshotManager from '../plugins/snapshot-manager/SnapshotManager.js';
import hasStateChanged from '../plugins/snapshot-manager/SnapshotManager/hasStateChanged.js';

const game = new Game({
  loadDefaultPlugins: false
});

game.use(new PhysicsMatter());
game.use(new Entity());
game.use(new SnapshotManager());
game.use(new EntityInput());
game.use(new EntityMovement());
game.use(new Bullet());
game.use(new DefaultTwoDimensionalInputStrategy());

let bobby = {
  id: 1
};

tap.test('player movement and controls', (t) => {

  t.test('creates a new player', (t) => {
    const entityId = bobby.id;
    const entity = game.createEntity({
      id: entityId,
      type: 'PLAYER'
    });

    t.equal(game.getComponent(entityId, 'position').x, 0);
    t.equal(game.getComponent(entityId, 'position').y, 0);
    t.equal(game.getComponent(entityId, 'type'), 'PLAYER');
    t.equal(entity.id, entityId);
    t.end();
  });

  t.test('Presses PLAYER_UP to move player', (t) => {
    let player = game.getEntity(bobby.id);
    let entityInputSystem = game.systemsManager.getSystem('entity-input');
    entityInputSystem.update(player.id, { W: true });
    for (let i = 0; i < 10; i++) {
      game.gameTick();
    }

    const movedY = game.getComponent(player.id, 'position').y;
    const movedX = game.getComponent(player.id, 'position').x;
    // Uncomment and adjust this based on your game's collision logic:
    t.true(movedY < 20);
    t.true(movedX === 0);
    t.end();
  });

  t.test('Presses FIRE_BULLET to shoot a bullet', (t) => {
    let player = game.getEntity(bobby.id);

    let entityInputSystem = game.systemsManager.getSystem('entity-input');
    entityInputSystem.handleInputs(player.id, {
      controls: { SPACE: true }
    }, 1);

    for (let i = 0; i < 10; i++) {
      game.gameTick();
    }

    let bulletCount = 0;
    let bullet = null;
    // check the bodyMap for a bullet
    for (let b in game.physics.bodyMap) {
      let body = game.physics.bodyMap[b];
      let myEntityId = body.myEntityId;
      let type = game.components.type.get(myEntityId);
      if (type === 'BULLET') {
        bulletCount++;
        bullet = game.getEntity(myEntityId);
      }
    }
    
    t.equal(bulletCount, 1, 'should have one bullet');
    t.equal(typeof bullet.velocity, 'object', 'bullet should have a velocity');

    // initial bullet velocities should not be 0
    t.true(bullet.velocity.x !== 0 || bullet.velocity.y !== 0, 'bullet should have a non-zero velocity'); 

    // we fired in straight line, x position should be 0, y should be less than 20
    t.true(bullet.position.x === 0, 'bullet should be at x position 0');
    t.true(bullet.position.y < 20, 'bullet should be at y position less than 20');

    t.end();

  });

});