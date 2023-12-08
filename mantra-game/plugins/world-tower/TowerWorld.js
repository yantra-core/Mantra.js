class TowerWorld {
  static id = 'world-tower';
  constructor() {
    this.id = TowerWorld.id;
  }

  init(game) {
    this.game = game;

    // base unit spawner
    let unitSpawner = {
      type: 'UnitSpawner',
      health: 100,
      position: {
        x: 0,
        y: 0
      },
      width: 100,
      height: 100,
      color: 0x00ff00
    };

    // create 8 unit spawners at the top of the map border, left to right, evenly spaced
    let spawners = [];

    for (let i = 0; i < 8; i++) {
      // create fresh clone of unitSpawner
      let spawner = JSON.parse(JSON.stringify(unitSpawner));

      let smallerWidth = game.width * 0.8;

      spawner.position.x = -smallerWidth / 2 + (smallerWidth / 8) * i;
      spawner.position.y = (-game.height / 2) + 100;
      spawner.startingPosition = {
        x: spawner.position.x,
        y: spawner.position.y
      }
      spawners.push(spawner);
    }

    spawners.forEach(spawner => {
      console.log(spawner.position)
      let ent = game.createEntity(spawner);
      console.log('ent', ent)
      ent.timers.setTimer('test-timer', 2, true);
    });

    let rules = game.createSutra();
    game.setSutra(rules);

    function createConditions() {

      // Custom function for 'isBoss' condition
      rules.addCondition('isSpawner', (entity) => entity.type === 'UnitSpawner');
      rules.addCondition('isPlayer', (entity) => entity.type === 'PLAYER');
      rules.addCondition('isBorder', (entity) => entity.type === 'BORDER');

      // TODO: replace code with entity.getTimer('test-timer').done
      // will that even work this is a copy of the entity right?
      // should it be a reference to the entity?
      rules.addCondition('timerCompleted', entity => {
        // check if entities has timers and timer with name 'test-timer' is completed
        let timerDone = false;
        // throw new Error('fudge');
        // console.log('entity.timers', entity)
        // TODO: remove this, should iterate and know timer names
        if (entity.timers && entity.timers.timers && entity.timers.timers['test-timer'] && entity.timers.timers['test-timer'].done) {
          timerDone = true;
          // set time done to false on origin timer
          entity.timers.timers['test-timer'].done = false;
        }
        return timerDone;
        //return entity.timerDone;
      });


      rules.addCondition('allEnemiesCleared', function (entity, gameState) {
        let length = gameState.ents.UnitSpawner.length;
        return length <= 7;
        // TODO: return length === 0;
      })

      rules.addCondition('blockHitWall', function (entity, data) {
        if (entity.type === 'COLLISION') {
          if (entity.bodyA.type === 'BORDER' || entity.bodyB.type === 'BORDER') {
            // console.log('blockHitWall', entity, data)
            if (entity.bodyA.type === 'BLOCK' || entity.bodyB.type === 'BLOCK') {
              return true;
            }
          }
        }
      });

      rules.addCondition('blockHitPlayer', function (entity, data) {
        if (entity.type === 'COLLISION') {
          if (entity.bodyA.type === 'PLAYER' || entity.bodyB.type === 'PLAYER') {
            // console.log('blockHitPlayer', entity, data)
            if (entity.bodyA.type === 'BLOCK' || entity.bodyB.type === 'BLOCK') {
              return true;
            }
          }
        }
      });

      // Assuming the entity initially moves to the right
      rules.addCondition('moveLeft', (entity, gameState) => entity.position.x >= entity.startingPosition.x);
      rules.addCondition('moveRight', (entity, gameState) => entity.position.x < entity.startingPosition.x - 400);

      rules.addCondition('spawnUnitTouchedHomebase', (entity, gameState) => {
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

    };

    function createActions() {

      // Action to move all blocks when timerCompleted
      rules.addAction({
        if: ['timerCompleted', 'isSpawner'],
        then: [{
          action: 'spawnBlock',
          data: {
            x: 0,
            y: 100
          }

        }]
      });

      // Define health level conditions for the boss
      const healthLevels = [100, 80, 60, 40, 20];
      const colors = [0x00ff00, 0x99ff00, 0xffff00, 0xff9900, 0xff0000]; // Green to Red

      // Adding health level conditions
      healthLevels.forEach((level, index) => {
        rules.addCondition(`isHealthBelow${level}`, {
          op: 'lessThan',
          property: 'health',
          value: level
        });
      });

      // Action for the boss based on health levels
      rules.addAction({
        if: 'isSpawner',
        then: healthLevels.map((level, index) => ({
          if: `isHealthBelow${level}`,
          then: [{ action: 'entity::updateEntity', data: { color: colors[index] } }]
        }))
      });

      rules.addAction({
        if: 'isPlayer',
        then: healthLevels.map((level, index) => ({
          if: `isHealthBelow${level}`,
          then: [{ action: 'entity::updateEntity', data: { color: colors[index] } }]
        }))
      });

      rules.addAction({
        if: 'isBorder',
        then: healthLevels.map((level, index) => ({
          if: `isHealthBelow${level}`,
          then: [{ action: 'entity::updateEntity', data: { color: colors[index] } }]
        }))
      });

      //
      // Spawner Movement
      //
      rules.addAction({
        if: ['isSpawner', 'moveLeft'],
        then: [{
          action: 'entity::updateEntity',
          data: {
            velocity: {
              x: -10,
              y: 3
            }
          }
        }]
      });

      rules.addAction({
        if: ['isSpawner', 'moveRight'],
        then: [{
          action: 'entity::updateEntity',
          data: {
            velocity: {
              x: 10,
              y: 3
            }
          }
        }]
      });

      //
      // End Spawner Movement 
      //

      rules.addAction({
        if: ['spawnUnitTouchedHomebase'],
        then: [{
          action: 'entity::removeEntity'
        },
        {
          action: 'resetSpawnerUnit'
        }]
      });


      //
      // Player / Block Collisions
      //
      rules.addAction({
        if: ['blockHitPlayer'],
        then: [{
          action: 'blockHitPlayer'
        }]
      });

      rules.addAction({
        if: ['blockHitWall'],
        then: [{
          action: 'blockHitWall'
        }]
      })

    };

    /* Remark: Potential short-hand for single action mapping
    rules.mapAction('blockHitPlayer');
    rules.on('blockHitPlayer', function (data, node) {});
    */

    createConditions();
    createActions();

    rules.on('blockHitWall', function (event, data, node) {

      let border, block;

      if (event.bodyA.type === 'BORDER') {
        border = event.bodyA;
        block = event.bodyB;
      }
      if (event.bodyB.type === 'BORDER') {
        border = event.bodyB;
        block = event.bodyA;
      }

      // remove the block
      game.removeEntity(block.id);

      // wall takes some damage
      border.health -= 1;


      if (border.health <= 0) {
        // remove the wall
        game.removeEntity(border.id);
        return;
      }
      // remove existing border
      
      game.updateEntity({
        id: border.id,
        type: 'BORDER',
        health: border.health,
        // color: 0xff0000
      });

    });

    rules.on('blockHitPlayer', function (data, node) {
      // console.log('blockHitPlayer', data, node)
      let block;
      let player;

      if (data.bodyA.type === 'BLOCK') {
        block = data.bodyA;
        player = data.bodyB;
      }
      if (data.bodyB.type === 'BLOCK') {
        block = data.bodyB;
        player = data.bodyA;
      }

      game.removeEntity(block.id);

      if (typeof player.score === 'undefined' || player.score == null) {
        player.score = 0;
      }

      // if block was red, damage player
      if (block.color === 0xff0000) {
        player.health -= 10;
      } else {
        // if not, heal player
        player.health += 5;
        player.score += 1;
      }

      if (player.health <= 0) {
        // reset the player position and health
        game.updateEntity({
          id: player.id,
          position: {
            x: 0,
            y: 0
          },
          velocity: {
            x: 0,
            y: 0
          },
          health: 100,
          color: 0x00ff00,
          score: 0
        });
      } else {
        // TODO: remove this
        console.log('updating with new score', player.score)
        game.updateEntity({
          id: player.id,
          health: player.health,
          score: player.score
        });
      }
    });

    rules.on('entity::removeEntity', function (event, data, node) {
      // console.log('entity::removeEntity', event.bodyA, event.bodyB);
      if (event.bodyA.type === 'BORDER') {
        game.removeEntity(event.bodyB.id);
        // set the color of bodyB to red
      }
      if (event.bodyB.type === 'BORDER') {
        game.removeEntity(event.bodyA.id);
      }
    });

    rules.on('entity::updateEntity', function (data, node) {
      // console.log('entity::updateEntity', data);
      game.updateEntity(data);
    });

    rules.addAction({
      if: ['allEnemiesCleared'],
      then: [{
        action: 'roundOver'
      }]
    })

    rules.on('roundOver', function () {
      // console.log('roundOver!!!')
    });

    rules.on("entity::createEntity", function (data, node) {
      console.log('entity::createEntity', data);
      console.log('ent', ent)
    });

    rules.on('resetSpawnerUnit', function (data, node) {
      console.log('resetSpawnerUnit data', data);
      console.log('resetSpawnerUnit node', node);

      let previous;

      if (data.bodyA.type === 'UnitSpawner') {
        previous = data.bodyA;
      } else {
        previous = data.bodyB;
      }

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

      console.log("ent UnitSpawner", ent)

    });

    rules.on('spawnBlock', (entity, data) => {
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


    game.on('timer::done', (entity, timerName, timer) => {
      //       console.log('timer done', entity, timerName, timer);
    });


    // create a rule to spawn a unit every 2 seconds

    /*
    console.log('ggg', game.systems)
    game.systems['gui-sutra'].setRules(rules)
    console.log('rrrr', rules)
    */

    return rules;




  }

  update() {
  }

  render() { }

  destroy() { }

}

export default TowerWorld;
