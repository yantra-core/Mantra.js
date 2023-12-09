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

    function createBorders(N) {
      for (let i = 0; i < N; i++) {
        const scaleFactor = 0.2 * (i + 1);
        game.systems.border.createBorder({
          height: (game.height * scaleFactor) + game.height,
          width: (game.width * scaleFactor) + game.width,
          // depth: 100,
        });
      }
    }

    createBorders(1);

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

    // Create Sutras
    let roundSutra = this.createRoundSutra();
    let spawnerSutra = this.createSpawnerSutra();
    let playerSutra = this.createPlayerSutra();
    let collisionSutra = this.createCollisionSutra();
    let colorChangesSutra = this.createChangesColorWithDamageSutra();

    // Main rules Sutra
    let rules = game.createSutra();
    rules.addCondition('isPlayer', (entity) => entity.type === 'PLAYER');
    rules.addCondition('isBorder', (entity) => entity.type === 'BORDER');

    //rules.use(roundSutra, 'roundLogic');
    rules.use(spawnerSutra, 'spawnerLogic');
    rules.use(playerSutra, 'playerLogic');
    rules.use(collisionSutra, 'collisionLogic');
    rules.use(colorChangesSutra, 'colorChangesLogic');

    rules.on('entity::updateEntity', function (data, node) {
      // console.log('entity::updateEntity', data);
      game.updateEntity(data);
    });

    rules.addCondition('timerCompleted', entity => {
      let timerDone = false;
      // TODO: remove this, should iterate and know timer names
      if (entity.timers && entity.timers.timers && entity.timers.timers['test-timer'] && entity.timers.timers['test-timer'].done) {
        timerDone = true;
        // set time done to false on origin timer
        entity.timers.timers['test-timer'].done = false;
      }
      if (timerDone) {
        console.log('timerDone', timerDone)
      }
      return timerDone;
    });

    // Additional rules
    this.createAdditionalRules(rules);

    // Event handlers
    this.setupEventHandlers(rules);

    rules.addAction({
      if: 'changesColorWithDamage',
      subtree: 'colorChangesLogic'
    })

    rules.addAction({
      if: 'timerCompleted',
      subtree: 'spawnerLogic'
    });

    game.setSutra(rules);
    game.data.roundStarted = true;

    game.on('timer::done', (entity, timerName, timer) => {
      // console.log('timer done', entity, timerName, timer);
    });

    return rules;

  }

  update() {
  }

  render() { }

  destroy() { }


  createChangesColorWithDamageSutra() {

    let colorChanges = this.game.createSutra();


    colorChanges.addCondition('changesColorWithDamage', {
      op: 'or',
      conditions: ['isSpawner', 'isPlayer', 'isBorder']
    });

    // Define health level conditions for the boss
    const healthLevels = [100, 80, 60, 40, 20];
    const colors = [0x00ff00, 0x99ff00, 0xffff00, 0xff9900, 0xff0000]; // Green to Red

    // Adding health level conditions
    healthLevels.forEach((level, index) => {
      colorChanges.addCondition(`isHealthBelow${level}`, {
        op: 'lessThan',
        property: 'health',
        value: level
      });
    });

    /*
    healthLevels.map(function(level, index) {
      colorChanges.addAction({
        if: `isHealthBelow${level}`,
        then: [{ action: 'entity::updateEntity', data: { color: colors[index] } }]
      })
    });*/


    // Action for the boss based on health levels
    colorChanges.addAction({
      if: 'changesColorWithDamage',
      then: healthLevels.map((level, index) => ({
        if: `isHealthBelow${level}`,
        then: [{ action: 'entity::updateEntity', data: { color: colors[index] } }]
      }))
    });

    colorChanges.on('entity::updateEntity', function (data, node) {
      // console.log('entity::updateEntity', data);
      game.updateEntity(data);
    });

    return colorChanges;

  }

  createRoundSutra() {
    let round = this.game.createSutra();

    // Condition to check if a round has started
    round.addCondition('roundStarted', (entity, gameState) => {
      return gameState.roundStarted === true;
    });

    // Condition to check if a round has ended
    round.addCondition('roundEnded', (entity, gameState) => {
      return gameState.roundEnded === true;
    });

    // Composite condition to check if a round is currently running
    round.addCondition('roundRunning', {
      op: 'not',
      conditions: ['roundEnded']
    });

    return round;
  }

  createSpawnerSutra() {
    let spawner = this.game.createSutra();
    spawner.addCondition('isSpawner', function (entity, gameState) {
      return entity.type === 'UnitSpawner';
    });

    // Assuming the entity initially moves to the right
    spawner.addCondition('moveLeft', (entity, gameState) => entity.position.x >= entity.startingPosition.x);
    spawner.addCondition('moveRight', (entity, gameState) => entity.position.x < entity.startingPosition.x - 400);

    // Action to move all blocks when timerCompleted
    spawner.addAction({
      if: ['isSpawner'],
      then: [{
        action: 'spawnBlock',
        data: {
          x: 0,
          y: 100
        }

      }]
    });

    //
    // Spawner Movement
    //
    spawner.addAction({
      if: ['isSpawner', 'moveLeft'],
      then: [{
        action: 'entity::updateEntity',
        data: {
          velocity: {
            x: -10,
            y: 30
          }
        }
      }]
    });

    spawner.addAction({
      if: ['isSpawner', 'moveRight'],
      then: [{
        action: 'entity::updateEntity',
        data: {
          velocity: {
            x: 10,
            y: 30
          }
        }
      }]
    });

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

    // ... Define conditions and actions related to the spawner ...
    return spawner;
  }

  createPlayerSutra() {
    let player = this.game.createSutra();
    // ... Define conditions and actions related to the player ...
    return player;
  }

  createCollisionSutra() {
    let collision = this.game.createSutra();
    // ... Define conditions and actions related to collisions ...
    return collision;
  }

  createAdditionalRules(rules) {


    // Action to move all blocks when timerCompleted
    /*
    rules.addAction({
      if: ['roundStarted'],
      subtree: 'roundLogic'
    });
    */

    rules.addAction({
      if: ['spawnUnitTouchedHomebase'],
      then: [{
        action: 'entity::removeEntity'
      },
      {
        action: 'resetSpawnerUnit'
      }]
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

    rules.addAction({
      if: ['blockHitWall'],
      then: [{
        action: 'blockHitWall'
      }]
    })

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

    //
    // Player / Block Collisions
    //
    rules.addAction({
      if: ['blockHitPlayer'],
      then: [{
        action: 'blockHitPlayer'
      }]
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
        // console.log('updating with new score', player.score)
        game.updateEntity({
          id: player.id,
          health: player.health,
          score: player.score
        });
      }
    });

  }

  setupEventHandlers(rules) {
    // ... Define event handlers ...
  }



}

export default TowerWorld;


/*

  // TODO: round end / reset round / round start
  // Custom function for 'isBoss' condition


  rules.addCondition('scoreIsAbove10', {
    op: 'greaterThan',
    property: 'score',
    value: 10
  });

  rules.addAction({
    if: ['scoreIsAbove10'],
    then: [{
      action: 'upgradeWeapon'
    }]
  });

  rules.on('upgradeWeapon', function (data, node) {
    console.log('upgradeWeapon', data, node)
    game.updateEntity({
      id: data.id,
      type: 'PLAYER',
      bulletColor: 0x00ff00
    });
  });



  rules.addCondition('allWallsFallen', function (entity, gameState) {
    // check see if any of UnitSpawners have been made it past the world height + 1000
    let height = gameState.height;
    let unitSpawners = gameState.ents.UnitSpawner;
    let allWallsFallen = false;
    unitSpawners.forEach(spawner => {
      if (spawner.position.y > 3000) {
        allWallsFallen = true;
      }
    }
    );
    return allWallsFallen;
  });

  rules.addAction({
    if: ['allWallsFallen'],
    then: [{
      action: 'roundLost'
    }]
  })

  rules.addCondition('allEnemiesCleared', function (entity, gameState) {
    let length = gameState.ents.UnitSpawner.length;
    return length <= 7;
    // TODO: return length === 0;
  })





  rules.addAction({
    if: ['allEnemiesCleared'],
    then: [{
      action: 'roundOver'
    }]
  })

  rules.on('roundOver', function () {
    // console.log('roundOver!!!')
  });

  rules.on('roundLost', function (data, node, gameState) {
    // console.log('roundLost!!!');
    // stop the game
    game.data.roundStarted = false;
    game.data.roundEnded = true;
  });


*/

