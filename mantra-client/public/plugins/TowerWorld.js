(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).TowerWorld = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _round = _interopRequireDefault(require("./sutras/round.js"));
var _player = _interopRequireDefault(require("./sutras/player.js"));
var _colorChanges = _interopRequireDefault(require("./sutras/colorChanges.js"));
var _enemy = _interopRequireDefault(require("./sutras/enemy.js"));
var _input = _interopRequireDefault(require("./sutras/input.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var TowerWorld = /*#__PURE__*/function () {
  function TowerWorld() {
    _classCallCheck(this, TowerWorld);
    _defineProperty(this, "sutras", {
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
    });
    _defineProperty(this, "entities", {
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
    });
    this.id = TowerWorld.id;
  }
  _createClass(TowerWorld, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      for (var key in this.sutras) {
        if (this[key]) {
          this.sutras[key] = this[key]();
        }
      }

      // game.use('Scoreboard');

      // Create Sutras
      var roundSutra = _round["default"].call(this);
      var spawnerSutra = _enemy["default"].call(this);
      var playerSutra = _player["default"].call(this);
      var inputSutra = _input["default"].call(this);
      var colorChangesSutra = _colorChanges["default"].call(this);

      // Main rules Sutra
      // TODO: ensure entire Sutra definition is exports on TowerWorld such that any
      // node can be re-used in other Sutras
      var rules = game.createSutra();
      rules.addCondition('isBorder', function (entity) {
        return entity.type === 'BORDER';
      });
      game.setSutra(rules);
      rules["if"]('roundNotPaused')["if"]('roundNotRunning').then('createBorders').then('spawnEnemyUnits').then('startRound');
      rules["if"]('spawnUnitTouchedHomebase').then('removeSpawnUnit').then('resetSpawnerUnit');
      rules["if"]('blockHitWall').then('damageWall').then('removeBlock');
      rules["if"]('playerHealthBelow0').then('resetPlayerPosition');
      rules["if"]('blockHitPlayer').then(function (rules) {
        rules["if"]('blockIsRed').then('damagePlayer')["else"]('healPlayer');
      }).then('removeBlock');
      rules["if"]('roundRunning')["if"]('allWallsFallen').then('roundLost');
      rules.addCondition('timerCompleted', function (entity) {
        var timerDone = false;
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
        var height = gameState.height;
        var unitSpawners = gameState.ents.UnitSpawner;
        var allWallsFallen = false;
        unitSpawners.forEach(function (spawner) {
          if (spawner.position.y > 4200) {
            allWallsFallen = true;
          }
        });
        return allWallsFallen;
      });
      rules.use(roundSutra, 'round');
      rules.use(spawnerSutra, 'spawner');
      rules.use(playerSutra, 'player');
      rules.use(colorChangesSutra, 'colorChanges');
      rules.use(inputSutra, 'input');
      rules["if"]('roundRunning')["if"]('timerCompleted').then('spawner');

      // rules.if('changesColorWithDamage').then('colorChanges');
      rules.addAction({
        "if": 'changesColorWithDamage',
        subtree: 'colorChanges'
      });

      // rules.if('isPlayer').then('input');
      rules.addAction({
        "if": 'isPlayer',
        subtree: 'input'
      });

      // Additional rules
      this.createAdditionalRules(rules);
      game.setSutra(rules);
      game.data.roundStarted = true;
      game.data.roundRunning = false;
      game.on('timer::done', function (entity, timerName, timer) {
        // console.log('timer done', entity, timerName, timer);
        // console.log(game.data)
      });
      return rules;
    }
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "render",
    value: function render() {}
  }, {
    key: "destroy",
    value: function destroy() {}

    // base unit spawner
  }, {
    key: "createBorders",
    value: function createBorders(N) {
      var game = this.game;
      // TODO: move this a sutra
      for (var i = 0; i < N; i++) {
        var scaleFactor = 0.2 * (i + 1);
        game.systems.border.createBorder({
          height: game.height * scaleFactor + game.height,
          width: game.width * scaleFactor + game.width
          // depth: 100,
        });
      }
    }
  }, {
    key: "createAdditionalRules",
    value: function createAdditionalRules(rules) {
      var game = this.game;
      var self = this;
      rules.on('removeSpawnUnit', function (event, data, node) {
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
        var block = context.BLOCK;
        game.removeEntity(block.id);
      });
      rules.on('damageWall', function (context, node) {
        var border = context.BORDER;
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
          health: border.health
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
        var block;
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
      });
      rules.on('spawnEnemyUnits', function (data, node) {
        // console.log('spawnEnemyUnits', data, node);
        // create 8 unit spawners at the top of the map border, left to right, evenly spaced
        var spawners = [];
        for (var i = 0; i < 8; i++) {
          // create fresh clone of unitSpawner
          var spawner = JSON.parse(JSON.stringify({
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
          var smallerWidth = game.width * 0.8;
          spawner.position.x = -smallerWidth / 2 + smallerWidth / 8 * i;
          spawner.position.y = -game.height / 2 + 100;
          spawner.startingPosition = {
            x: spawner.position.x,
            y: spawner.position.y
          };
          spawners.push(spawner);
        }
        spawners.forEach(function (spawner) {
          var ent = game.createEntity(spawner);
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
  }]);
  return TowerWorld;
}();
_defineProperty(TowerWorld, "id", 'world-tower');
var _default = exports["default"] = TowerWorld;
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

},{"./sutras/colorChanges.js":2,"./sutras/enemy.js":3,"./sutras/input.js":4,"./sutras/player.js":5,"./sutras/round.js":6}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = colorChanges;
function colorChanges() {
  var game = this.game;
  var colorChanges = this.game.createSutra();
  colorChanges.addCondition('changesColorWithDamage', {
    op: 'or',
    conditions: ['isSpawner', 'isPlayer', 'isBorder']
  });

  // Define health level conditions for the boss
  var healthLevels = [100, 80, 60, 40, 20];
  var colors = [0x00ff00, 0x99ff00, 0xffff00, 0xff9900, 0xff0000]; // Green to Red

  // Adding health level conditions
  healthLevels.forEach(function (level, index) {
    colorChanges.addCondition("isHealthBelow".concat(level), {
      op: 'lessThan',
      property: 'health',
      value: level
    });
  });

  // Action for the boss based on health levels
  colorChanges.addAction({
    "if": 'changesColorWithDamage',
    then: healthLevels.map(function (level, index) {
      return {
        "if": "isHealthBelow".concat(level),
        then: [{
          action: 'entity::updateEntity',
          data: {
            color: colors[index]
          }
        }]
      };
    })
  });
  colorChanges.on('entity::updateEntity', function (data, node) {
    // console.log('entity::updateEntity', data);
    game.updateEntity(data);
  });
  return colorChanges;
}

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = spawner;
function spawner() {
  var game = this.game;
  var spawner = this.game.createSutra();
  spawner.addCondition('isSpawner', function (entity, gameState) {
    return entity.type === 'UnitSpawner';
  });

  // Assuming the entity initially moves to the right
  spawner.addCondition('moveLeft', function (entity, gameState) {
    return entity.position.x >= entity.startingPosition.x;
  });
  spawner.addCondition('moveRight', function (entity, gameState) {
    return entity.position.x < entity.startingPosition.x - 400;
  });
  spawner["if"]('isSpawner').then('spawnBlock', {
    x: 0,
    y: 100
  });

  //
  // Spawner Movement
  //

  // spawner.define()
  // spawner.condition('isSpawner', (entity, gameState) => entity.type === 'UnitSpawner');

  spawner["if"]('isSpawner', 'moveLeft').then('entity::updateEntity', {
    velocity: {
      x: -10,
      y: 30
    }
  });
  spawner["if"]('isSpawner', 'moveRight').then('entity::updateEntity', {
    velocity: {
      x: 10,
      y: 30
    }
  });
  spawner.on('spawnBlock', function (entity, data) {
    // console.log('spawnBlock', entity, data)
    var ent = game.createEntity({
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
  spawner.addCondition('spawnUnitTouchedHomebase', function (entity, gameState) {
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
  spawner.on('resetSpawnerUnit', function (data, node) {
    var previous = data.UnitSpawner;
    var newSpawner = {
      type: 'UnitSpawner',
      health: 100,
      position: previous.startingPosition,
      width: 100,
      height: 100,
      color: 0x00ff00
    };
    newSpawner.startingPosition = previous.startingPosition;
    var ent = game.createEntity(newSpawner);
    ent.timers.setTimer('test-timer', 0.5, true);
  });
  return spawner;
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = input;
var moveSpeed = 5;
function input() {
  var game = this.game;
  var inputSutra = this.game.createSutra();
  var inputMap = ['W', 'A', 'S', 'D'];
  inputMap.forEach(function (key) {
    inputSutra.addCondition("press".concat(key), function (data, gameState) {
      if (gameState.input && gameState.input.controls[key]) {
        //console.log(`press${key}`, gameState.input)
        return true;
      }
      return false;
    });
  });

  // Add actions corresponding to the conditions
  inputSutra["if"]('pressW').then('moveForward');
  inputSutra["if"]('pressA').then('moveLeft');
  inputSutra["if"]('pressS').then('moveBackward');
  inputSutra["if"]('pressD').then('moveRight');

  // Sutra event listeners for executing actions
  inputSutra.on('moveForward', function (entity) {
    var dx = 0;
    var dy = moveSpeed;
    var forceFactor = 0.05;
    var force = {
      x: dx * forceFactor,
      y: -dy * forceFactor
    };
    game.applyForce(entity.id, force);
  });
  inputSutra.on('moveLeft', function (entity) {
    var dx = moveSpeed;
    var dy = 0;
    var forceFactor = 0.05;
    var force = {
      x: -dx * forceFactor,
      y: dy * forceFactor
    };
    game.applyForce(entity.id, force);
  });
  inputSutra.on('moveRight', function (entity) {
    var dx = moveSpeed;
    var dy = 0;
    var forceFactor = 0.05;
    var force = {
      x: dx * forceFactor,
      y: dy * forceFactor
    };
    game.applyForce(entity.id, force);
  });
  inputSutra.on('moveBackward', function (entity) {
    var dx = 0;
    var dy = moveSpeed;
    var forceFactor = 0.05;
    var force = {
      x: dx * forceFactor,
      y: dy * forceFactor
    };
    game.applyForce(entity.id, force);
  });
  console.log('creating input sutra', inputSutra);
  return inputSutra;
}
;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = player;
function player() {
  var game = this.game;
  var player = this.game.createSutra();
  player.addCondition('isPlayer', function (entity) {
    return entity.type === 'PLAYER';
  });
  player.addCondition('playerHealthBelow0', function (entity, gameState) {
    if (entity.type === 'PLAYER') {
      if (entity.health <= 0) {
        return true;
      }
    }
  });
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
    var block = data.BLOCK;
    var player = data.PLAYER;
    player.health -= 10;
    game.updateEntity({
      id: player.id,
      health: player.health
    });
  });
  player.on('healPlayer', function (data, node) {
    var block = data.BLOCK;
    var player = data.PLAYER;
    if (player) {
      player.health += 5;
      game.updateEntity({
        id: player.id,
        health: player.health
      });
    }
  });
  return player;
}

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = round;
function round() {
  var round = this.game.createSutra();

  // Condition to check if a round has started
  round.addCondition('roundStarted', function (entity, gameState) {
    return gameState.roundStarted === true;
  });

  // Condition to check if a round has ended
  round.addCondition('roundEnded', function (entity, gameState) {
    return gameState.roundEnded === true;
  });
  round.addCondition('roundRunning', function (entity, gameState) {
    return gameState.roundRunning === true;
  });
  round.addCondition('roundNotRunning', function (entity, gameState) {
    return gameState.roundRunning === false;
  });
  round.addCondition('roundPaused', function (entity, gameState) {
    return gameState.roundPaused === true;
  });

  // TODO: remove add NOT condition
  round.addCondition('roundNotPaused', function (entity, gameState) {
    return gameState.roundPaused !== true;
  });
  round.on('roundLost', function (data, node, gameState) {
    console.log('roundLost!!!');
    // stop the game
    gameState.roundStarted = false;
    gameState.roundRunning = false;
    gameState.roundEnded = true;
    gameState.roundPaused = true;
  });
  round.on('startRound', function (data, node, gameState) {
    // set roundRunning to true
    console.log('startRound');
    gameState.roundRunning = true;
    gameState.roundEnded = false;
  });

  // round.if('startRound').then('startRound');

  return round;
}

},{}]},{},[1])(1)
});
