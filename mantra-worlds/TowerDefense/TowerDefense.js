import round from './sutras/round.js';
import player from './sutras/player.js';
import colorChanges from './sutras/colorChanges.js';
import enemy from './sutras/enemy.js';
import input from './sutras/input.js';
import movement from "../../mantra-sutras/player-movement/top-down.js";

class TowerWorld {
  static id = 'world-towerdefense';
  static type = 'world';
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
      if (this[key]) {
        this.sutras[key] = this[key]();
      }
    }

    // bypass default input movement
    game.customMovement = true;

    // game.data.camera.currentZoom = 2;
    game.setGravity(0, 0, 0);

    game.createDefaultPlayer({
      position: {
        x: 0,
        y: 0
      },
      texture: 'none'
    });

    // game.setBackground('#007F00');
    game.setBackground('#007fff');

    game.use('Block')
    game.use('Border', { autoBorder: true, thickness: 20, health: 100 });

    game.use('Bullet')
    game.use('Border');
    game.use('StarField');


    // game.use('Scoreboard');

    // Create Sutras
    let roundSutra = round.call(this);
    let spawnerSutra = enemy.call(this);
    let playerSutra = player.call(this);
    let inputSutra = input.call(this);
    let colorChangesSutra = colorChanges.call(this);

    // Main rules Sutra
    // TODO: ensure entire Sutra definition is exports on TowerWorld such that any
    // node can be re-used in other Sutras
    let rules = game.createSutra();


    // movement
    rules.use(movement(game), 'movement');

    this.handleInputs = function (entityId, inputs) {
      rules.emit('entityInput::handleInputs', entityId, inputs)
    }
    game.on('entityInput::handleInputs', this.handleInputs);

    rules.addCondition('isBorder', (entity) => entity.type === 'BORDER');

    rules
      .if('roundNotPaused')
      .if('roundNotRunning')
      .then('createBorders')
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
    rules.use(colorChangesSutra, 'colorChanges');
    rules.use(inputSutra, 'input');

    rules
      .if('roundRunning')
      .if('gameTickMod60')
      .then('spawner');

    // rules.if('changesColorWithDamage').then('colorChanges');
    rules.addAction({
      if: 'changesColorWithDamage',
      subtree: 'colorChanges'
    });

    // rules.if('isPlayer').then('input');
    rules.addAction({
      if: 'isPlayer',
      subtree: 'input'
    });

    // Additional rules
    this.createAdditionalRules(rules);

    console.log('rrr', rules)
    game.setSutra(rules);

    game.data.roundStarted = true;
    game.data.roundRunning = false;


    return rules;

  }

  update() {
  }

  render() { }

  destroy() { }

  // base unit spawner
  createBorders(N) {
    let game = this.game;
    // TODO: move this a sutra
    for (let i = 0; i < N; i++) {
      const scaleFactor = 0.2 * (i + 1);
      game.systems.border.createBorder({
        height: (game.height * scaleFactor) + game.height,
        width: (game.width * scaleFactor) + game.width,
        thickness: 20,
        health: 100
        // depth: 100,
      });
    }
  }

  createAdditionalRules(rules) {
    let game = this.game;
    let self = this;

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

    rules.on('createBorders', function (data, node) {
      self.createBorders(2);
    })

    rules.on('spawnEnemyUnits', function (data, node) {
      console.log('data', data, node)
      try {
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
            health: 100,
            mass: 100,
            width: 64,
            height: 64,
            color: 0x00ff00,
            style: {
              backgroundColor: '#000000'
            },

          }));
          console.log('spawner', spawner)
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
        });
      } catch (err) {
        console.log('err', err)
      }


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