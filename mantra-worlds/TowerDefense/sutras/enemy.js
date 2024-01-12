export default function spawner() {
  let game = this.game;
  let spawner = this.game.createSutra();
  spawner.addCondition('isSpawner', function (entity, gameState) {
    return entity.type === 'UnitSpawner';
  });

  // Assuming the entity initially moves to the right
  //spawner.addCondition('moveLeft', (entity, gameState) => entity.position.x >= entity.startingPosition.x);
  
  //spawner.addCondition('moveRight', (entity, gameState) => entity.position.x < entity.startingPosition.x - 400);

  const moveRange = 0; // Define the range of movement

  spawner.addCondition('moveLeft', function (entity, gameState) {
    //console.log('moveLeft Check', entity.position.x, entity.startingPosition.x + moveRange);
    return entity.position.x > entity.startingPosition.x + moveRange;
  });

  spawner.addCondition('moveRight', function (entity, gameState) {
    // console.log('moveRight Check', entity.position.x, entity.startingPosition.x - moveRange);
    return entity.position.x <= entity.startingPosition.x - moveRange;
  });

  spawner.addCondition('gameTickMod60', (entity, gameState) => {
    // console.log('gameState.gameTick')
    return gameState.tick % 60 === 0;
  });

  spawner
    .if('gameTickMod60')
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
    .if('gameTickMod60')
    .if('isSpawner', 'moveLeft')
    .then('entity::updateEntity', {
      velocity: {
        x: -10,
        y: 10
      }
    })

  spawner
    .if('gameTickMod60')
    .if('isSpawner', 'moveRight')
    .then('entity::updateEntity', {
      velocity: {
        x: 1,
        y: 10
      }
    })

  spawner.on('spawnBlock', (entity, data) => {
    // console.log('spawnBlock', entity, data)
    let ent = game.createEntity({
      type: 'BLOCK',
      position: {
        x: entity.position.x,
        y: entity.position.y
      },
      mass: 100,
      friction: 0, 
      frictionAir: 0, 
      frictionStatic: 0,
      // texture: 'fire',
      velocity: {
        x: 0,
        y: 30
      },
      width: 16,
      height: 16,

      // color: 0xff0000
    });
    // console.log('aaaa', ent)
  });

  spawner.on('entity::updateEntity', function (data, node) {
    // console.log('entity::updateEntity', data, node);
    game.updateEntity({
      id: data.id,
      velocity: data.velocity
    });
  });

  spawner.addCondition('spawnUnitTouchedHomebase', (entity, gameState) => {
    if (entity.type === 'COLLISION') {
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
        width: 64,
        height: 64,
        color: 0x00ff00,
        style: {
          backgroundColor: '#000000'
        },
      };
      newSpawner.startingPosition = previous.startingPosition;
      let ent = game.createEntity(newSpawner);
      //ent.timers.setTimer('test-timer', 0.5, true);
    });


  return spawner;
}