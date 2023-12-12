class TowerWorld {
  static id = 'world-tower';
  constructor() {
    this.id = TowerWorld.id;
  }

  sutras = {
    'round': {
      description: 'Round Logic. Adds conditions and actions related to the round.'
    },
    'spawner': {
      description: 'Spawner Logic. Adds conditions and actions related to the spawner.'
    },
    'player': {
      description: 'Player Logic. Adds conditions and actions related to the player.'
    },
    'collision': {
      description: 'Collision Logic. Adds conditions and actions related to collisions.'
    },
    'colorChanges': {
      description: 'Color Changes Logic. Adds conditions and actions related to color changes.'
    }
  }

  entities = {
    'UnitSpawner': {
      type: 'UnitSpawner',
      health: 100,
      position: {
        x: 0,
        y: 0
      },
      width: 100,
      height: 100,
      color: 0x00ff00
    }
  }

  init(game) {
    this.game = game;

    for (let key in this.sutras) {
      this.sutras[key] = this[key]();
    }

    this.createBorders(2);

    // Create Sutras
    let roundSutra = this.sutras['round'];
    let spawnerSutra = this.sutras['spawner'];
    let playerSutra = this.sutras['player'];
    let collisionSutra = this.sutras['collision'];
    let colorChangesSutra = this.sutras['colorChanges'];

    // Main rules Sutra
    // TODO: ensure entire Sutra definition is exports on TowerWorld such that any
    // node can be re-used in other Sutras
    let rules = game.createSutra();

    game.setSutra(rules);

    rules
      .if('roundNotPaused')
      .if('roundNotRunning')
      .then('spawnEnemyUnits')
      .then('startRound')

    rules
      .if('spawnUnitTouchedHomebase')
      .then('removeSpawnUnit')
      .then('resetSpawnerUnit');

    rules
      .if('blockHitWall')
      .then('damageWall')
      .then('removeBlock');

    rules
      .if('playerHealthBelow0')
      .then('resetPlayerPosition');

  rules
    .if('blockHitPlayer')
    .then((rules) => {
      rules
        .if('blockIsRed')
        .then('damagePlayer')
        .else('healPlayer');
    })
    .then('removeBlock')

    rules
      .if('roundRunning')
      .if('allWallsFallen')
      .then('roundLost');

    // TODO: subtree reference for fluent
    rules.addAction({
      if: ['roundRunning', 'timerCompleted'],
      subtree: 'spawner' // TODO: needs to store subtrees as flat index same as conditions
      // if not that, separate sugar fluent api , prob not
    })

    // rules.if('changesColorWithDamage').then('colorChanges');
    rules.addAction({
      if: 'changesColorWithDamage',
      subtree: 'colorChanges'
    });

    rules.addCondition('isPlayer', (entity) => entity.type === 'PLAYER');
    rules.addCondition('isBorder', (entity) => entity.type === 'BORDER');
    rules.addCondition('timerCompleted', entity => {
      let timerDone = false;
      // TODO: remove this, should iterate and know timer names
      if (entity.timers && entity.timers.timers && entity.timers.timers['test-timer'] && entity.timers.timers['test-timer'].done) {
        timerDone = true;
        // set time done to false on origin timer
        entity.timers.timers['test-timer'].done = false;
      }
      if (timerDone) {
        // console.log('timerDone', timerDone)
      }
      return timerDone;
    });

    rules.addCondition('allWallsFallen', function (entity, gameState) {
      // check see if any of UnitSpawners have been made it past the world height + 1000
      let height = gameState.height;
      let unitSpawners = gameState.ents.UnitSpawner;
      let allWallsFallen = false;
      unitSpawners.forEach(spawner => {
        if (spawner.position.y > 4200) {
          allWallsFallen = true;
        }
      }
      );
      return allWallsFallen;
    });

    rules.use(roundSutra, 'round');
    rules.use(spawnerSutra, 'spawner');
    rules.use(playerSutra, 'player');
    rules.use(collisionSutra, 'collision');
    rules.use(colorChangesSutra, 'colorChanges');

    // Additional rules
    this.createAdditionalRules(rules);

    game.setSutra(rules);

    game.data.roundStarted = true;
    game.data.roundRunning = false;


    game.on('timer::done', (entity, timerName, timer) => {
      // console.log('timer done', entity, timerName, timer);
      // console.log(game.data)
    });

    return rules;

  }

  update() {
  }

  render() { }

  destroy() { }

  // base unit spawner
  createBorders(N) {
    // TODO: move this a sutra
    for (let i = 0; i < N; i++) {
      const scaleFactor = 0.2 * (i + 1);
      game.systems.border.createBorder({
        height: (game.height * scaleFactor) + game.height,
        width: (game.width * scaleFactor) + game.width,
        // depth: 100,
      });
    }
  }

  colorChanges() {
    let game = this.game;
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

  round() {
    let game = this.game;
    let round = this.game.createSutra();

    // Condition to check if a round has started
    round.addCondition('roundStarted', (entity, gameState) => {
      return gameState.roundStarted === true;
    });

    // Condition to check if a round has ended
    round.addCondition('roundEnded', (entity, gameState) => {
      return gameState.roundEnded === true;
    });

    round.addCondition('roundRunning', (entity, gameState) => {
      return gameState.roundRunning === true;
    });

    round.addCondition('roundNotRunning', (entity, gameState) => {
      return gameState.roundRunning === false;
    });

    round.addCondition('roundPaused', (entity, gameState) => {
      return gameState.roundPaused === true;
    });

    // TODO: remove add NOT condition
    round.addCondition('roundNotPaused', (entity, gameState) => {
      return gameState.roundPaused !== true;
    });

    round.on('roundLost', function (data, node, gameState) {
      console.log('roundLost!!!');
      // stop the game
      game.data.roundStarted = false;
      game.data.roundRunning = false;
      game.data.roundEnded = true;
      game.data.roundPaused = true;
    });

    round.on('startRound', function (data, node, gameState) {
      // set roundRunning to true
      console.log('startRound')
      game.data.roundRunning = true;
      game.data.roundEnded = false;
    });

    // round.if('startRound').then('startRound');

    return round;
  }

  spawner() {
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

  player() {
    let player = this.game.createSutra();

    player.on('resetPlayerPosition', function (data, node) {
      // console.log('resetPlayerPosition', data, node)
      game.updateEntity({
        id: data.id,
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
    });

    player.on('damagePlayer', function (data, node) {
      let block = data.BLOCK;
      let player = data.PLAYER;

      player.health -= 10;
      game.updateEntity({
        id: player.id,
        health: player.health
      });
    });

    player.on('healPlayer', function (data, node) {
      let block = data.BLOCK;
      let player = data.PLAYER;

      if (player) {
        player.health += 5;
        game.updateEntity({
          id: player.id,
          health: player.health
        });
      }
    });

    player.addCondition('playerHealthBelow0', function (entity, gameState) {
      if (entity.type === 'PLAYER') {
        if (entity.health <= 0) {
          return true;
        }
      }
    });

    return player;
  }

  wall() {
    let wall = this.game.createSutra();
    return wall;
  }

  collision() {
    let collision = this.game.createSutra();
    return collision;
  }

  createAdditionalRules(rules) {
    let game = this.game;

    rules
      .on('removeSpawnUnit', function (event, data, node) {
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

    rules.on('removeBlock', function (context, node) {
      let block = context.BLOCK;
      game.removeEntity(block.id);
    });

    rules.on('damageWall', function (context, node) {
      let border = context.BORDER;
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

    rules.addCondition('blockIsRed', function (data, node) {
      let block;
      if (data.bodyA.type === 'BLOCK') {
        block = data.bodyA;
      } else {
        block = data.bodyB;
      }
      if (block.type === 'BLOCK') {
        if (block.color === 0xff0000) {
          return true;
        }
      }
    });

    rules.on('entity::updateEntity', function (data, node) {
      // console.log('entity::updateEntity', data);
      game.updateEntity(data);
    });

    rules.on('spawnEnemyUnits', function (data, node) {
      // console.log('spawnEnemyUnits', data, node);
      // create 8 unit spawners at the top of the map border, left to right, evenly spaced
      let spawners = [];

      for (let i = 0; i < 8; i++) {
        // create fresh clone of unitSpawner
        let spawner = JSON.parse(JSON.stringify({
          type: 'UnitSpawner',
          health: 100,
          position: {
            x: 0,
            y: 0
          },
          width: 100,
          height: 100,
          color: 0x00ff00
        }));
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
        let ent = game.createEntity(spawner);
        ent.timers.setTimer('test-timer', 2, true);
      });

    });

    /*
    rules.on('roundLost', function (data, node, gameState) {
      //console.log('roundLost!!!');
      // stop the game
      game.data.roundStarted = false;
      game.data.roundRunning = false;
      game.data.roundEnded = true;
    });

    rules.on('startRound', function (data, node, gameState) {
      // set roundRunning to true
      game.data.roundRunning = true;
    });
    */


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


*/

