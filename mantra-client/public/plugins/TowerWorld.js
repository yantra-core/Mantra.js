(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).TowerWorld = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
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
    this.id = TowerWorld.id;
  }
  _createClass(TowerWorld, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      for (var key in this.sutras) {
        this.sutras[key] = this[key]();
      }

      // base unit spawner
      var unitSpawner = {
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
        for (var i = 0; i < N; i++) {
          var scaleFactor = 0.2 * (i + 1);
          game.systems.border.createBorder({
            height: game.height * scaleFactor + game.height,
            width: game.width * scaleFactor + game.width
            // depth: 100,
          });
        }
      }

      createBorders(1);

      // create 8 unit spawners at the top of the map border, left to right, evenly spaced
      var spawners = [];
      for (var i = 0; i < 8; i++) {
        // create fresh clone of unitSpawner
        var spawner = JSON.parse(JSON.stringify(unitSpawner));
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
        console.log(spawner.position);
        var ent = game.createEntity(spawner);
        console.log('ent', ent);
        ent.timers.setTimer('test-timer', 2, true);
      });

      // Create Sutras
      var roundSutra = this.sutras['round'];
      var spawnerSutra = this.sutras['spawner'];
      var playerSutra = this.sutras['player'];
      var collisionSutra = this.sutras['collision'];
      var colorChangesSutra = this.sutras['colorChanges'];

      // Main rules Sutra
      var rules = game.createSutra();
      rules.addCondition('isPlayer', function (entity) {
        return entity.type === 'PLAYER';
      });
      rules.addCondition('isBorder', function (entity) {
        return entity.type === 'BORDER';
      });

      //rules.use(roundSutra, 'round');
      rules.use(spawnerSutra, 'spawner');
      rules.use(playerSutra, 'player');
      rules.use(collisionSutra, 'collision');
      rules.use(colorChangesSutra, 'colorChanges');
      rules.on('entity::updateEntity', function (data, node) {
        // console.log('entity::updateEntity', data);
        game.updateEntity(data);
      });
      rules.addCondition('timerCompleted', function (entity) {
        var timerDone = false;
        // TODO: remove this, should iterate and know timer names
        if (entity.timers && entity.timers.timers && entity.timers.timers['test-timer'] && entity.timers.timers['test-timer'].done) {
          timerDone = true;
          // set time done to false on origin timer
          entity.timers.timers['test-timer'].done = false;
        }
        if (timerDone) {
          console.log('timerDone', timerDone);
        }
        return timerDone;
      });

      // Additional rules
      this.createAdditionalRules(rules);

      // Event handlers
      this.setupEventHandlers(rules);
      rules.addAction({
        "if": 'changesColorWithDamage',
        subtree: 'colorChanges'
      });
      rules.addAction({
        "if": 'timerCompleted',
        subtree: 'spawner'
      });
      game.setSutra(rules);
      game.data.roundStarted = true;
      game.on('timer::done', function (entity, timerName, timer) {
        // console.log('timer done', entity, timerName, timer);
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
  }, {
    key: "colorChanges",
    value: function colorChanges() {
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
  }, {
    key: "round",
    value: function round() {
      var game = this.game;
      var round = this.game.createSutra();

      // Condition to check if a round has started
      round.addCondition('roundStarted', function (entity, gameState) {
        return gameState.roundStarted === true;
      });

      // Condition to check if a round has ended
      round.addCondition('roundEnded', function (entity, gameState) {
        return gameState.roundEnded === true;
      });

      // Composite condition to check if a round is currently running
      round.addCondition('roundRunning', {
        op: 'not',
        conditions: ['roundEnded']
      });
      return round;
    }
  }, {
    key: "spawner",
    value: function spawner() {
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

      // Action to move all blocks when timerCompleted
      spawner.addAction({
        "if": ['isSpawner'],
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
        "if": ['isSpawner', 'moveLeft'],
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
        "if": ['isSpawner', 'moveRight'],
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

      // ... Define conditions and actions related to the spawner ...
      return spawner;
    }
  }, {
    key: "player",
    value: function player() {
      var player = this.game.createSutra();
      // ... Define conditions and actions related to the player ...
      return player;
    }
  }, {
    key: "collision",
    value: function collision() {
      var collision = this.game.createSutra();
      // ... Define conditions and actions related to collisions ...
      return collision;
    }
  }, {
    key: "createAdditionalRules",
    value: function createAdditionalRules(rules) {
      var game = this.game;
      // Action to move all blocks when timerCompleted
      /*
      rules.addAction({
        if: ['roundStarted'],
        subtree: 'round'
      });
      */

      rules.addAction({
        "if": ['spawnUnitTouchedHomebase'],
        then: [{
          action: 'entity::removeEntity'
        }, {
          action: 'resetSpawnerUnit'
        }]
      });
      rules.on('resetSpawnerUnit', function (data, node) {
        console.log('resetSpawnerUnit data', data);
        console.log('resetSpawnerUnit node', node);
        var previous;
        if (data.bodyA.type === 'UnitSpawner') {
          previous = data.bodyA;
        } else {
          previous = data.bodyB;
        }
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
        console.log("ent UnitSpawner", ent);
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
        "if": ['blockHitWall'],
        then: [{
          action: 'blockHitWall'
        }]
      });
      rules.on('blockHitWall', function (event, data, node) {
        var border, block;
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
          health: border.health
          // color: 0xff0000
        });
      });

      //
      // Player / Block Collisions
      //
      rules.addAction({
        "if": ['blockHitPlayer'],
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
        var block;
        var player;
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
  }, {
    key: "setupEventHandlers",
    value: function setupEventHandlers(rules) {
      // ... Define event handlers ...
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

},{}]},{},[1])(1)
});
