export default function spawner() {
  let game = this.game;
  let spawner = this.game.createSutra();
  spawner.addCondition('isSpawner', function (entity, gameState) {
    return entity.type === 'UnitSpawner';
  });

  // Assuming the entity initially moves to the right
  spawner.addCondition('moveLeft', (entity, gameState) => entity.position.x >= entity.startingPosition.x);
  spawner.addCondition('moveRight', (entity, gameState) => entity.position.x < entity.startingPosition.x - 400);

  spawner
    .if('isSpawner')
    .then('spawnBlock', {
      x: 0,
      y: 100
    });

  //
  // Spawner Movement
  //

  // spawner.define()
  // spawner.condition('isSpawner', (entity, gameState) => entity.type === 'UnitSpawner');

  spawner
    .if('isSpawner', 'moveLeft')
    .then('entity::updateEntity', {
      velocity: {
        x: -10,
        y: 30
      }
    })

  spawner
    .if('isSpawner', 'moveRight')
    .then('entity::updateEntity', {
      velocity: {
        x: 10,
        y: 30
      }
    })

  spawner.on('spawnBlock', (entity, data) => {
    // console.log('spawnBlock', entity, data)
    let ent = game.createEntity({
      type: 'BLOCK',
      position: {
        x: entity.position.x,
        y: entity.position.y + 300
      },
      velocity: {
        x: 0,
        y: 100
      },
      width: 100,
      height: 100,
      color: 0xff0000
    });
  });

  spawner.on('entity::updateEntity', function (data, node) {
    // console.log('entity::updateEntity', data);
    game.updateEntity(data);
  });

  spawner.addCondition('spawnUnitTouchedHomebase', (entity, gameState) => {
    if (entity.type === 'COLLISION') {
      // console.log('spawnUnitTouchedHomebase', entity)
      if (entity.bodyA.type === 'UnitSpawner' && entity.bodyB.type === 'BORDER') {
        // console.log('spawnUnitTouchedHomebase', entity, gameState)
        return true;
      }
      if (entity.bodyB.type === 'UnitSpawner' && entity.bodyA.type === 'BORDER') {
        // console.log('spawnUnitTouchedHomebase', entity, gameState)
        return true;
      }
    }
  });

  spawner
    .on('resetSpawnerUnit', function (data, node) {
      let previous = data.UnitSpawner;
      let newSpawner = {
        type: 'UnitSpawner',
        health: 100,
        position: previous.startingPosition,
        width: 100,
        height: 100,
        color: 0x00ff00,
      };
      newSpawner.startingPosition = previous.startingPosition;
      let ent = game.createEntity(newSpawner);
      ent.timers.setTimer('test-timer', 0.5, true);
    });


  return spawner;
}
