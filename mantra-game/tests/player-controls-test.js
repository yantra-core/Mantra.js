import tap from 'tape';
import { Game } from '../Game.js';
import PhysicsMatter from '../plugins/physics-matter/MatterPhysics.js';

import EntityFactory from '../plugins/entity-factory/EntityFactory.js';
import EntityInput from '../plugins/entity-input/EntityInput.js';
import EntityMovement from '../plugins/entity-movement/EntityMovement.js';
import Bullet from '../plugins/bullet/Bullet.js';
import hasStateChanged from '../plugins/snapshots/SnapShotManager/hasStateChanged.js';

const game = new Game({
  loadDefaultPlugins: false
});

game.use(new PhysicsMatter());
game.use(new EntityFactory());
game.use(new EntityInput());
game.use(new EntityMovement());
game.use(new Bullet());

tap.test('player movement and controls', (t) => {

  t.test('creates a new player', (t) => {
    const entityId = 'Bobby';
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

  t.test('Presses MOVE_FORWARD to move player', (t) => {
    let player = game.getEntity('Bobby');
    console.log('game.systems', game.systems)
    let entityInputSystem = game.systemsManager.getSystem('entityInput');
    entityInputSystem.update(player.id, { W: true });
    for (let i = 0; i < 10; i++) {
      game.gameTick();
    }

    const movedY = game.getComponent(player.id, 'position').y;
    const movedX = game.getComponent(player.id, 'position').x;
    // Uncomment and adjust this based on your game's collision logic:
    console.log('movedY', movedY)
    t.true(movedY < 20);
    t.true(movedX === 0);
    t.end();
  });

  t.test('Presses FIRE_BULLET to shoot a bullet', (t) => {
    let player = game.getEntity('Bobby');

    let entityInputSystem = game.systemsManager.getSystem('entityInput');
    entityInputSystem.handleInputs(player.id, {
      controls: { SPACE: true }
    }, 1);

    for (let i = 0; i < 10; i++) {
      game.gameTick();
    }

    let bulletCount = 0;
    let bullet = null;
    // check the bodyMap for a bullet
    for (let b in game.bodyMap) {
      let body = game.bodyMap[b];
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

    console.log( game.components.type)
    t.end();

  });

});