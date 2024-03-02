(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Sutra = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = defaultMouseMovement;
// Mantra Default Mouse Movement - Marak Squires 2024
//
// Remark: The following module scoped variables "moving" and "movingToPosition" are out of band, 
// they will be removed, see comment in defaultTopdownMovement.js
//
var moving = false;
var movingToPosition = {};
function defaultMouseMovement(game) {
  var movingButton = game.config.mouseMovementButton || 'LEFT';
  var actionButton = game.config.mouseActionButton || 'RIGHT';
  var cameraMoveButton = game.config.mouseCameraButton || 'MIDDLE';
  game.on('pointerUp', function (context, event) {
    // TOOD: better game.getActivePlayer() checks
    if (typeof game.currentPlayerId === 'undefined' || !game.currentPlayerId) {
      return;
    }
    if (game.isTouchDevice()) {
      if (context.endedFirstTouch) {
        moving = false;
        game.updateEntity(game.currentPlayerId, {
          update: null
        });
      }
    } else {
      if (context.buttons[movingButton] === false) {
        moving = false;
        game.updateEntity(game.currentPlayerId, {
          update: null
        });
      }
    }
  });
  game.on('pointerMove', function (context, event) {
    if (!game.data || !game.data.ents || !game.data.ents.PLAYER) {
      return;
    }
    var gamePointerPosition = context.position;
    var currentPlayer = game.data.ents.PLAYER[0];
    if (typeof currentPlayer === 'undefined') {
      return;
    }
    var playerPosition = currentPlayer.position;
    if (playerPosition && moving) {
      var radians = Math.atan2(gamePointerPosition.y - playerPosition.y, gamePointerPosition.x - playerPosition.x);
      movingToPosition = {
        x: gamePointerPosition.x,
        y: gamePointerPosition.y,
        rotation: radians
      };
    }
  });
  game.on('pointerDown', function (context, event) {
    if (!game.data || !game.data.ents || !game.data.ents.PLAYER) {
      return;
    }
    var gamePointerPosition = context.position;
    var currentPlayer = game.data.ents.PLAYER[0];

    // TOOD: better game.getActivePlayer() checks
    if (typeof currentPlayer === 'undefined') {
      return;
    }
    var playerPosition = currentPlayer.position;
    if (playerPosition) {
      if (typeof currentPlayer.update !== 'function') {
        game.updateEntity(currentPlayer.id, {
          update: function update(player) {
            if (moving && movingToPosition.x && movingToPosition.y) {
              // move the player based on the angle of the mouse compared to the player
              // create a new force based on angle and speed
              var _radians = movingToPosition.rotation;
              var force = {
                x: Math.cos(_radians) * 1.5,
                y: Math.sin(_radians) * 1.5
              };
              // Remark: Directly apply forces to player, this is local only
              //         Networked movements need to go through Entity Input systems with control inputs
              // Remark: Update default top-down movement system to support mouse movements
              game.applyForce(game.data.ents.PLAYER[0].id, force);
            }
          }
        });
      }
      var radians = Math.atan2(gamePointerPosition.y - playerPosition.y, gamePointerPosition.x - playerPosition.x);
      if (game.isTouchDevice()) {
        if (event.pointerId === context.firstTouchId) {
          moving = true;
          movingToPosition = {
            x: gamePointerPosition.x,
            y: gamePointerPosition.y,
            rotation: radians
          };
        } else if (event.pointerId === context.secondTouchId) {
          // TODO: emit sutra event for action
          useItem(game, currentPlayer, radians);
        }
      } else {
        // Use variables for button checks
        if (context.buttons[movingButton]) {
          moving = true;
          movingToPosition = {
            x: gamePointerPosition.x,
            y: gamePointerPosition.y,
            rotation: radians
          };
        }
        if (context.buttons[actionButton]) {
          // TODO: emit sutra event for action
          useItem(game, currentPlayer, radians);
        }
      }
    }
  });
}

// Stubs for meta.equippedItems / equippable items API
function useItem(game, currentPlayer, radians) {
  //console.log('useItem', currentPlayer, radians);
  if (currentPlayer.meta && currentPlayer.meta.equippedItems && currentPlayer.meta.equippedItems.length) {
    // pick the first item in the array
    var equippedItem = currentPlayer.meta.equippedItems[0];
    var system = game.systems[equippedItem.plugin]; // as string name, 'bullet'
    var method = system[equippedItem.method]; // as string name, 'fireBullet'

    if (typeof method === 'function') {
      method(currentPlayer.id, radians);
    } else {
      console.error('Method not found', equippedItem.method);
    }
  } else {
    // boomerang is default item ( for now )
    if (game.systems.boomerang) {
      game.systems.boomerang.throwBoomerang(currentPlayer.id, radians);
    }
  }
}

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = platformMovement;
var _defaultMouseMovement = _interopRequireDefault(require("./defaultMouseMovement.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// TODO: defaultPlatformMouseMovement.js

function platformMovement(game) {
  var rules = game.createSutra();
  rules.addCondition('PLAYER_UP', {
    op: 'or',
    conditions: ['W', 'DPAD_UP']
  });
  rules.addCondition('PLAYER_DOWN', {
    op: 'or',
    conditions: ['S', 'DPAD_DOWN']
  });
  rules.addCondition('MOVE_LEFT', {
    op: 'or',
    conditions: ['A', 'DPAD_LEFT']
  });
  rules.addCondition('MOVE_RIGHT', {
    op: 'or',
    conditions: ['D', 'DPAD_RIGHT']
  });
  rules.addCondition('PLAYER_JUMP', {
    op: 'or',
    conditions: ['SPACE', 'H', 'BUTTON_B']
  });
  rules.addCondition('PLAYER_RUN', {
    op: 'or',
    conditions: ['J', 'BUTTON_X']
  });
  rules.addCondition('ZOOM_IN', {
    op: 'or',
    conditions: ['K', 'BUTTON_A']
  });
  rules.addCondition('ZOOM_OUT', {
    op: 'or',
    conditions: ['L', 'BUTTON_Y']
  });
  rules.addCondition('isRunning', {
    op: 'or',
    conditions: ['S', 'K'] // defaults DOWN key, or B button on Gamepad
  });

  rules["if"]('MOVE_LEFT').then('MOVE_LEFT').then('updateSprite', {
    sprite: 'playerLeftWalk'
  });
  rules["if"]('MOVE_RIGHT').then('MOVE_RIGHT').then('updateSprite', {
    sprite: 'playerRightWalk'
  });

  /*
  rules
    .if('PLAYER_UP')
      .then('PLAYER_UP')
      .then('updateSprite', { sprite: 'playerUpRight' });
  */

  rules["if"]('PLAYER_DOWN').then('DUCK').map('determineDuckingSprite').then('updateSprite');
  rules.addMap('determineDuckingSprite', function (player, node) {
    var sprite = 'playerDownRight';
    if (player.texture.sprite === 'playerLeftWalk') {
      player.texture.sprite = 'playerDownLeft';
    } else {
      player.texture.sprite = 'playerDownRight';
    }
    return player;
  });

  //rules.if('S').then('DUCK').map('determineDuckingSprite').then('updateSprite');
  //rules.if('D').then('MOVE_RIGHT').then('updateSprite', { sprite: 'playerRightWalk' });

  /*
    Adding textures to Entities
    game.updateEntity({
      id: player.id,
      texture: {
        frameIndex: 0,
        sheet: player.texture.sheet,
        sprite: { // sets directly to sprite, no animations
          x: -112,
          y: -16,
          height: 16,
          width: 16
        }
      }
    })
   */

  rules.on('updateSprite', function (player, node) {
    var sprite = node.data.sprite || player.texture.sprite;
    game.updateEntity({
      id: player.id,
      texture: {
        frameIndex: 0,
        sheet: player.texture.sheet,
        sprite: sprite,
        animationPlaying: true
      }
    });
  });
  rules.addCondition('isPlayer', function (entity) {
    return entity.type === 'PLAYER';
  });
  var maxJumpTicks = 40;
  // Remark: isPlayer is already implied for all Key inputs,
  //         however we add the additional check here for the negative case,
  //         in order to not let other ents reset player walk speed
  rules["if"]('isPlayer').then(function (rules) {
    rules["if"]('PLAYER_RUN').then('RUN')["else"]('WALK');
  });
  rules["if"]('isPlayer').then(function (rules) {
    rules["if"]('PLAYER_JUMP')
    // .if('doesntExceedDuration')
    .then('JUMP').then('updateSprite', {
      sprite: 'playerRightJump'
    });
  });

  //rules.if('L').then('SWING_SWORD');
  //rules.if('O').then('ZOOM_IN');
  //rules.if('P').then('ZOOM_OUT');

  rules.on('JUMP', function (player, node, gameState) {
    // console.log("JUMP", gameState.input, gameState.controls)
    if (gameState.inputTicks.SPACE >= maxJumpTicks) {
      return;
    }
    game.applyForce(player.id, {
      x: 0,
      y: -2.3,
      z: 0
    });
    game.updateEntity({
      id: player.id,
      rotation: 0,
      sprite: 'playerRightJump'
    });
  });
  var runningForce = 1;
  rules.on('RUN', function (player) {
    runningForce = 1.6;
    maxJumpTicks = 35;
  });
  rules.on('WALK', function (player) {
    runningForce = 1;
    maxJumpTicks = 25;
  });
  rules.on('DUCK', function (player) {
    game.applyForce(player.id, {
      x: 0,
      y: 0.5,
      z: 0
    });
    game.updateEntity({
      id: player.id,
      rotation: Math.PI
    });
  });
  rules.on('MOVE_LEFT', function (player, node, gameState) {
    game.applyForce(player.id, {
      x: -runningForce,
      y: 0,
      z: 0
    });
    game.updateEntity({
      id: player.id,
      rotation: -Math.PI / 2
    });
  });
  rules.on('MOVE_RIGHT', function (player) {
    game.applyForce(player.id, {
      x: runningForce,
      y: 0,
      z: 0
    });
    game.updateEntity({
      id: player.id,
      rotation: Math.PI / 2
    });
  });
  rules.on('FIRE_BULLET', function (player) {
    game.systems.bullet.fireBullet(player.id);
  });
  rules.on('SWING_SWORD', function (player) {
    if (game.systems.sword) {
      game.systems.sword.swingSword(player.id);
    }
  });
  (0, _defaultMouseMovement["default"])(game);
  return rules;
}

},{"./defaultMouseMovement.js":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = topdownMovement;
var _defaultMouseMovement = _interopRequireDefault(require("./defaultMouseMovement.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function topdownMovement(game) {
  var rules = game.createSutra();
  rules.addCondition('PLAYER_UP', {
    op: 'or',
    conditions: ['W', 'DPAD_UP']
  });
  rules.addCondition('PLAYER_DOWN', {
    op: 'or',
    conditions: ['S', 'DPAD_DOWN']
  });
  rules.addCondition('PLAYER_LEFT', {
    op: 'or',
    conditions: ['A', 'DPAD_LEFT']
  });
  rules.addCondition('PLAYER_RIGHT', {
    op: 'or',
    conditions: ['D', 'DPAD_RIGHT']
  });
  rules.addCondition('USE_ITEM_1', {
    op: 'or',
    conditions: ['SPACE', 'H', 'BUTTON_B']
  });
  rules.addCondition('USE_ITEM_2', {
    op: 'or',
    conditions: ['J', 'BUTTON_X']
  });
  rules.addCondition('USE_ITEM_3', {
    op: 'or',
    conditions: ['K', 'BUTTON_A']
  });
  rules.addCondition('USE_ITEM_4', {
    op: 'or',
    conditions: ['L', 'BUTTON_Y']
  });
  rules.addCondition('ZOOM_IN', {
    op: 'or',
    conditions: ['Q', 'BUTTON_A']
  });
  rules.addCondition('ZOOM_OUT', {
    op: 'or',
    conditions: ['E', 'BUTTON_Y']
  });
  rules["if"]('PLAYER_UP').then('MOVE_UP').then('updateSprite', {
    sprite: 'playerUp'
  });
  rules["if"]('PLAYER_LEFT').then('MOVE_LEFT').then('updateSprite', {
    sprite: 'playerLeft'
  });
  rules["if"]('PLAYER_DOWN').then('MOVE_DOWN').then('updateSprite', {
    sprite: 'playerDown'
  });
  rules["if"]('PLAYER_RIGHT').then('MOVE_RIGHT').then('updateSprite', {
    sprite: 'playerRight'
  });
  rules["if"]('USE_ITEM_1').then('FIRE_BULLET').map('determineShootingSprite').then('updateSprite');
  rules["if"]('USE_ITEM_2').then("THROW_BOOMERANG");

  // replace with rules.do('ZOOM_IN'), etc
  rules["if"]('ZOOM_IN').then('ZOOM_IN');
  rules["if"]('ZOOM_OUT').then('ZOOM_OUT');
  rules.addMap('determineShootingSprite', function (player, node) {
    var _rotationToSpriteMap;
    // Normalize the rotation within the range of 0 to 2π

    if (typeof player.texture === 'undefined') {
      return player;
    }
    var normalizedRotation = player.rotation % (2 * Math.PI);
    // Define a mapping from radians to sprites
    var rotationToSpriteMap = (_rotationToSpriteMap = {
      0: 'playerRodUp'
    }, _defineProperty(_rotationToSpriteMap, Math.PI / 2, 'playerRodRight'), _defineProperty(_rotationToSpriteMap, Math.PI, 'playerRodDown'), _defineProperty(_rotationToSpriteMap, -Math.PI / 2, 'playerRodLeft'), _rotationToSpriteMap);
    // Set the sprite based on the rotation, default to the current sprite
    player.texture.sprite = rotationToSpriteMap[normalizedRotation] || player.currentSprite;
    return player;
  });
  rules.on('updateSprite', function (player, node) {
    if (typeof player.texture === 'undefined') {
      // for now, just return
      return;
    }
    var sprite = node.data.sprite || player.texture.sprite;
    game.updateEntity({
      id: player.id,
      texture: {
        frameIndex: 0,
        sheet: player.texture.sheet,
        sprite: sprite,
        animationPlaying: true
      }
    });
  });
  function isDiagonalMovement(state) {
    var isDiagonal = (state.MOVE_UP || state.MOVE_DOWN) && (state.MOVE_LEFT || state.MOVE_RIGHT);
    return isDiagonal;
  }

  // Normalization factor for diagonal movement (1 / sqrt(2))
  // chebyshev movement
  var normalizationFactor = 0.7071; // Approximately 1/√2
  var moveSpeed = 2;
  rules.on('MOVE_UP', function (entity, node) {
    node.state = node.state || {};
    node.state.MOVE_UP = true;
    var force = {
      x: 0,
      y: -moveSpeed,
      z: 0
    };
    if (isDiagonalMovement(rules.state)) {
      force.y *= normalizationFactor;
    }
    game.applyForce(entity.id, force);
    game.updateEntity({
      id: entity.id,
      rotation: 0
    });
    // console.log('MOVE_UP', playerState);
  });

  rules.on('MOVE_DOWN', function (entity, node) {
    node.state = node.state || {};
    node.state.MOVE_DOWN = true;
    var force = {
      x: 0,
      y: moveSpeed,
      z: 0
    };
    if (isDiagonalMovement(rules.state)) {
      force.y *= normalizationFactor;
    }
    game.applyForce(entity.id, force);
    game.updateEntity({
      id: entity.id,
      rotation: Math.PI
    });
  });
  rules.on('MOVE_LEFT', function (entity, node) {
    node.state = node.state || {};
    node.state.MOVE_LEFT = true;
    var force = {
      x: -moveSpeed,
      y: 0,
      z: 0
    };
    if (isDiagonalMovement(rules.state)) {
      force.x *= normalizationFactor;
    }
    game.applyForce(entity.id, force);
    game.updateEntity({
      id: entity.id,
      rotation: -Math.PI / 2
    });
  });
  rules.on('MOVE_RIGHT', function (entity, node) {
    node.state = node.state || {};
    node.state.MOVE_RIGHT = true;
    var force = {
      x: moveSpeed,
      y: 0,
      z: 0
    };
    if (isDiagonalMovement(rules.state)) {
      force.x *= normalizationFactor;
    }
    game.applyForce(entity.id, force);
    game.updateEntity({
      id: entity.id,
      rotation: Math.PI / 2
    });
  });
  rules.on('FIRE_BULLET', function (entity) {
    if (game.systems.bullet) {
      game.systems.bullet.fireBullet(entity.id);
    }
  });
  rules.on('SWING_SWORD', function (entity) {
    if (game.systems.sword) {
      game.systems.sword.swingSword(entity.id);
    }
  });
  rules.on('THROW_BOOMERANG', function (player) {
    if (game.systems.boomerang) {
      game.systems.boomerang.throwBoomerang(player.id);
    }
  });

  /*
  rules.on('DROP_BOMB', function (player) {
    // with no rate-limit, will drop 60 per second with default settings
    rules.emit('dropBomb', player)
  });
  */

  rules.on('CAMERA_SHAKE', function (entity) {
    game.shakeCamera(1000);
  });
  rules.on('ZOOM_IN', function (entity) {
    var currentZoom = game.data.camera.currentZoom || 1;
    game.setZoom(currentZoom + 0.05);
  });
  rules.on('ZOOM_OUT', function (entity) {
    var currentZoom = game.data.camera.currentZoom || 1;
    game.setZoom(currentZoom - 0.05);
  });

  //
  // Adds pointer events
  //
  // These are currently slightly out of band since they are not implemented is Entity Input
  // This is a temporary solution to allow for pointer events to be used in the game and local demos
  // We'll need to implement these mouse movements as a movement system for entity input
  // In order to support multiplayer mouse controls, its all there including mouse position and button states, 
  // just needs to be mapped as Entity Input with label names for Sutra conditions
  if (game.config.defaultMouseMovement !== false) {
    (0, _defaultMouseMovement["default"])(game);
  }
  return rules;
}

},{"./defaultMouseMovement.js":1}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _index = require("../../../../sutra/index.js");
var _defaultTopdownMovement = _interopRequireDefault(require("../../lib/Game/defaults/defaultTopdownMovement.js"));
var _defaultPlatformMovement = _interopRequireDefault(require("../../lib/Game/defaults/defaultPlatformMovement.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // import { createSutra } from '@yantra-core/sutra';
// handles input controller events and relays them to the game logic
var Sutra = /*#__PURE__*/function () {
  function Sutra() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$defaultMovement = _ref.defaultMovement,
      defaultMovement = _ref$defaultMovement === void 0 ? true : _ref$defaultMovement;
    _classCallCheck(this, Sutra);
    this.id = Sutra.id;
    this.inputCache = {};
    this.inputTickCount = {};
    this.inputDuration = {};
    this.defaultMovement = defaultMovement;
    this.inputsBound = false;
  }
  _createClass(Sutra, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.createSutra = _index.createSutra;
      this.game.setSutra = this.setSutra.bind(this);
      this.game.setRules = this.setSutra.bind(this);
      this.game.systemsManager.addSystem(this.id, this);
      var self = this;
      this.game.on('entityInput::handleInputs', function (entityId, input) {
        self.inputCache = input;
      });
      if (_typeof(game.rules) === 'object') {// an instance of Sutra
        // do nothing, rules are already set, we will extend them
      } else {
        // create a new instance of Sutra
        var rules = (0, _index.createSutra)(game);
        this.setSutra(rules);
      }

      // Once the game is ready, register the keyboard controls as conditions
      // This allows for game.rules.if('keycode').then('action') style rules
      if (!this.inputsBound) {
        // for each key in game.controls, add a condition that checks if the key is pressed
        // these are currently explicitly bound to the player entity, we may want to make this more generic
        self.bindInputsToSutraConditions();
        if (self.defaultMovement) {
          if (self.game.config.mode === 'topdown') {
            self.game.useSutra((0, _defaultTopdownMovement["default"])(self.game), 'mode-topdown');
          }
          if (self.game.config.mode === 'platform') {
            // TODO: better platform control
            self.game.useSutra((0, _defaultPlatformMovement["default"])(self.game), 'mode-platform');
          }
        }
        self.inputsBound = true;
      }
    }
  }, {
    key: "bindDefaultMovementSutra",
    value: function bindDefaultMovementSutra() {
      var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'topdown';
      if (mode === 'topdown') {
        this.game.useSutra((0, _defaultTopdownMovement["default"])(this.game), 'mode-topdown');
      }
      if (mode === 'platform') {
        this.game.useSutra((0, _defaultPlatformMovement["default"])(this.game), 'mode-platform');
      }
    }
  }, {
    key: "bindInputsToSutraConditions",
    value: function bindInputsToSutraConditions() {
      this.bindKeyCodesToSutraConditions();
      this.bindGamepadToSutraConditions();
    }
  }, {
    key: "bindGamepadToSutraConditions",
    value: function bindGamepadToSutraConditions() {
      var _this = this;
      if (this.game.systems.gamepad) {
        console.log("Binding all gamepad events to Sutra conditions...");
        var gamepadControls = this.game.systems.gamepad.controls;
        var _loop = function _loop(mantraCode) {
          // Remark: Do we want to imply isPlayer here?
          // Is there a valid case for not defaulting to isPlayer?
          // It may be required for complex play movements?
          _this.game.rules.addCondition(mantraCode, function (entity, gameState) {
            return entity.id === game.currentPlayerId && gameState.input.controls[mantraCode];
          }
          // gameState.input.controls[mantraCode]
          );
        };
        for (var mantraCode in gamepadControls) {
          _loop(mantraCode);
        }
      }
    }

    // TODO: send mouse control events to Sutra tree for tick evaluation
  }, {
    key: "bindMouseCodesToSutraConditions",
    value: function bindMouseCodesToSutraConditions() {}
  }, {
    key: "bindKeyCodesToSutraConditions",
    value: function bindKeyCodesToSutraConditions() {
      var _this2 = this;
      if (this.game.systems.keyboard) {
        console.log("Binding all keyboard events to Sutra conditions...");
        var keyControls = this.game.systems.keyboard.controls;
        var _loop2 = function _loop2(mantraCode) {
          // Key Down Condition
          // Remark: These should not be bound to current player, instead to the entity that is being controlled
          // _DOWN implied as default
          _this2.game.rules.addCondition(mantraCode, function (entity, gameState) {
            var _gameState$input$keyS;
            return entity.id === _this2.game.currentPlayerId && ((_gameState$input$keyS = gameState.input.keyStates[mantraCode]) === null || _gameState$input$keyS === void 0 ? void 0 : _gameState$input$keyS.down);
          }
          // gameState.input.keyStates[mantraCode]?.down
          );

          // Key Up Condition
          _this2.game.rules.addCondition(mantraCode + '_UP', function (entity, gameState) {
            var _gameState$input$keyS2;
            return entity.id === _this2.game.currentPlayerId && ((_gameState$input$keyS2 = gameState.input.keyStates[mantraCode]) === null || _gameState$input$keyS2 === void 0 ? void 0 : _gameState$input$keyS2.up);
          }
          // gameState.input.keyStates[mantraCode]?.up
          );

          // Key held Condition
          _this2.game.rules.addCondition(mantraCode + '_HOLD', function (entity, gameState) {
            var _gameState$input$keyS3;
            return entity.id === _this2.game.currentPlayerId && ((_gameState$input$keyS3 = gameState.input.keyStates[mantraCode]) === null || _gameState$input$keyS3 === void 0 ? void 0 : _gameState$input$keyS3.pressed);
          }
          // gameState.input.keyStates[mantraCode]?.pressed
          );
        };
        for (var mantraCode in keyControls) {
          _loop2(mantraCode);
        }
      }
    }
  }, {
    key: "update",
    value: function update() {
      var game = this.game;
      if (this.inputCache) {
        if (Object.keys(this.inputCache).length > 0) {
          game.data.input = this.inputCache;
        }
        for (var tc in this.inputTickCount) {
          // tc is name of input
          // check if this input is not present in inputCache
          if (this.inputCache.controls && !this.inputCache.controls[tc]) {
            // reset the tick count
            this.inputTickCount[tc] = 0;
          }
        }
        for (var _tc in this.inputDuration) {
          // tc is name of input
          // check if this input is not present in inputCache
          if (this.inputCache.controls && !this.inputCache.controls[_tc]) {
            // reset the duration count
            this.inputDuration[_tc] = 0;
          }
        }
        for (var c in this.inputCache.controls) {
          if (this.inputCache.controls[c] === true) {
            this.inputTickCount[c] = this.inputTickCount[c] || 0;
            this.inputTickCount[c]++;
          }
          if (this.inputCache.controls[c] === false) {
            this.inputTickCount[c] = this.inputTickCount[c] || 0;
            this.inputTickCount[c] = 0;
          }
          if (this.inputCache.controls[c] === true) {
            this.inputDuration[c] = this.inputDuration[c] || 0;
            this.inputDuration[c] += 1000 / game.data.fps;
          }
          if (this.inputCache.controls[c] === false) {
            this.inputDuration[c] = this.inputDuration[c] || 0;
            this.inputDuration[c] = 0;
          }
        }
        game.data.inputTicks = this.inputTickCount;
        game.data.inputDuration = this.inputDuration;
      }

      // TODO: Remove this init, it should be a check and throw
      // camera init is handled in Graphics.js and Camera system
      game.data.camera = game.data.camera || {};
      game.data.camera.position = game.data.camera.position || {
        x: 0,
        y: 0
      };
      if (game.data && game.data.input) {
        game.data.input.keyStates = game.systems.keyboard.keyStates;
      }

      // TODO: can we consolidate these into a single rules.tick() call?
      // TODO: loop through sutra components instead of entity list
      // LOOP1 - O(n) for each entity
      var _iterator = _createForOfIteratorHelper(game.entities.entries()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            entityId = _step$value[0],
            entity = _step$value[1];
          if (typeof entity.update == 'function') {
            // console.log('sutra is helping and running entity.update() in LOOP1 O(n) for each entity');
            // no arguments ( for now, perhaps delta )
            entity.update(entity);
          }

          // console.log('entity', entityId, entity)
          game.data.game = game;
          if (game.rules) {
            game.rules.tick(entity, game.data);
          }
          // check to see if entity itself has a valid entity.sutra, if so run it at entity level
          if (entity.sutra) {
            entity.sutra.tick(entity, game.data);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (game.data && game.data.collisions) {
        game.data.collisions.forEach(function (collisionEvent) {
          if (game.rules) {
            game.rules.tick(collisionEvent, game.data);
          }
          if (collisionEvent.bodyA.sutra) {
            collisionEvent.bodyA.sutra.tick(collisionEvent, game.data);
          }
          if (collisionEvent.bodyB.sutra) {
            collisionEvent.bodyB.sutra.tick(collisionEvent, game.data);
          }
        });
        // remove all collisions that are not active
        game.data.collisions = game.data.collisions.filter(function (collisionEvent) {
          return collisionEvent.kind === 'ACTIVE';
        });
      }

      // TODO: check this for performance
      game.rules.emit('tick', game.data);
      game.data.input = {};
      game.data.inputTicks = {};
      game.data.inputDuration = {};
      this.inputCache = {};
    }
  }, {
    key: "setSutra",
    value: function setSutra(rules) {
      // TODO: needs to merge here, maybe add useSutra() method instead
      this.game.rules = rules;
      if (this.game.systems['gui-sutra']) {
        this.game.systems['gui-sutra'].setRules(rules);
      }
    }
  }, {
    key: "render",
    value: function render() {}
  }, {
    key: "destroy",
    value: function destroy() {}
  }]);
  return Sutra;
}();
_defineProperty(Sutra, "id", 'sutra');
var _default = exports["default"] = Sutra;

},{"../../../../sutra/index.js":5,"../../lib/Game/defaults/defaultPlatformMovement.js":2,"../../lib/Game/defaults/defaultTopdownMovement.js":3}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Sutra", {
  enumerable: true,
  get: function get() {
    return _sutra["default"];
  }
});
exports.createSutra = createSutra;
var _sutra = _interopRequireDefault(require("./lib/sutra.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function createSutra() {
  return new _sutra["default"]();
}

},{"./lib/sutra.js":15}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = evaluateCompositeCondition;
function evaluateCompositeCondition(conditionObj, data, gameState) {
  var _this = this;
  var targetData;
  if (typeof data === 'function') {
    targetData = data(gameState);
  } else {
    targetData = data;
  }
  switch (conditionObj.op) {
    case 'and':
      return conditionObj.conditions.every(function (cond) {
        return _this.evaluateCondition(cond, targetData, gameState);
      });
    case 'or':
      return conditionObj.conditions.some(function (cond) {
        return _this.evaluateCondition(cond, targetData, gameState);
      });
    case 'not':
      // Assuming 'not' operator has a single condition
      return !this.evaluateCondition(conditionObj.conditions, targetData, gameState);
    default:
      return false;
  }
}

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = evaluateCondition;
function evaluateCondition(condition, data, gameState) {
  var sutra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this;
  var targetData;
  if (typeof data === 'function') {
    targetData = data(gameState);
  } else {
    targetData = data;
  }

  // Use the provided Sutra's conditions or default to the current Sutra's conditions
  var conditions = sutra.conditions;
  if (typeof condition === 'string') {
    var conditionEntry = sutra.conditions[condition];

    // If not found in the subtree, check in the main Sutra
    if (!conditionEntry) {
      conditionEntry = this.conditions[condition];
    }
    if (!conditionEntry) {
      // if not found, return false ( for now sub-tree issue )
      // return false;
    }
    if (conditionEntry) {
      if (Array.isArray(conditionEntry)) {
        return conditionEntry.every(function (cond) {
          return typeof cond.func === 'function' ? cond.func(targetData, gameState) : sutra.evaluateDSLCondition(cond.original, targetData, gameState);
        });
      } else if (['and', 'or', 'not'].includes(conditionEntry.op)) {
        // Handling composite conditions
        return sutra.evaluateCompositeCondition(conditionEntry, targetData, gameState);
      } else {
        return sutra.evaluateSingleCondition(conditionEntry, targetData, gameState);
      }
    } else {
      // silently fail ( for now )
      // console.log('Warning: Condition not found: ' + condition + '. About to throw an error.\nPlease define the missing condition in your sutra script.');
      // throw new Error(`Condition "${condition}" not found`);
    }
  } else if (typeof condition === 'function') {
    return condition(targetData, gameState);
  } else if (Array.isArray(condition)) {
    return condition.every(function (cond) {
      return sutra.evaluateCondition(cond, targetData, gameState);
    });
  }
  return false;
}

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = evaluateDSLCondition;
function evaluateDSLCondition(conditionObj, data, gameState) {
  var _this = this;
  var operator = this.resolveOperator(conditionObj.op);
  var targetData;
  if (typeof data === 'function') {
    targetData = data(gameState);
  } else {
    targetData = data;
  }
  var targetValue;
  if (conditionObj.gamePropertyPath) {
    // Use getNestedValue for deeply nested properties in gameState
    targetValue = this.getNestedValue(gameState, conditionObj.gamePropertyPath);
  } else if (conditionObj.gameProperty) {
    // Use gameState for top-level properties
    targetValue = gameState[conditionObj.gameProperty];
  } else {
    // Use data for entity properties
    targetValue = targetData[conditionObj.property];
  }
  if (typeof targetValue === 'undefined') {
    targetValue = 0;
  }
  switch (operator) {
    case 'lessThan':
      return targetValue < conditionObj.value;
    case 'greaterThan':
      return targetValue > conditionObj.value;
    case 'equals':
      return targetValue === conditionObj.value;
    case 'notEquals':
      return targetValue !== conditionObj.value;
    case 'lessThanOrEqual':
      return targetValue <= conditionObj.value;
    case 'greaterThanOrEqual':
      return targetValue >= conditionObj.value;
    case 'and':
      return conditionObj.conditions.every(function (cond) {
        return _this.evaluateDSLCondition(cond, targetData, gameState);
      });
    case 'or':
      return conditionObj.conditions.some(function (cond) {
        return _this.evaluateDSLCondition(cond, targetData, gameState);
      });
    case 'not':
      return !this.evaluateDSLCondition(conditionObj.condition, targetData, gameState);
    default:
      return false;
  }
}

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = evaluateSingleCondition;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function evaluateSingleCondition(condition, data, gameState) {
  // logger('Evaluating condition', condition, data);

  var targetData;
  if (typeof data === 'function') {
    targetData = data(gameState);
  } else {
    targetData = data;
  }
  if (typeof condition === 'string') {
    var conditionEntry = this.conditions[condition];
    if (conditionEntry) {
      // Handle composite conditions
      if (['and', 'or', 'not'].includes(conditionEntry.op)) {
        return this.evaluateCompositeCondition(conditionEntry, targetData, gameState);
      }

      // Handle named function conditions
      if (typeof conditionEntry === 'function') {
        return conditionEntry(targetData, gameState); // Pass gameState here
      }

      // Handle DSL conditions
      if (_typeof(conditionEntry.original) === 'object') {
        return this.evaluateDSLCondition(conditionEntry.original, targetData, gameState); // Pass gameState here
      }
    }
  }

  // Handle direct function conditions
  if (typeof condition === 'function') {
    return condition(targetData, gameState); // Pass gameState here
  }

  // Handle if condition is array of conditions
  /* Remark: needs tests before we should add this, may be working already
  if (Array.isArray(condition)) {
    return condition.every(cond => this.evaluateCondition(cond, targetData, gameState)); // Pass gameState here
  }
  */

  // logger('Evaluating unrecognized condition');
  return false;
}

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exportToEnglish;
var _i18n = _interopRequireDefault(require("./i18n.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
// Custom function to format data in a readable manner
var formatData = function formatData(data, indent) {
  if (_typeof(data) !== 'object' || data === null) {
    return "".concat(indent).concat(data);
  }
  return Object.entries(data).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    var stringValue = '';
    if (typeof value === 'function') {
      // Get function name from value
      stringValue = "".concat(value.name, "()");
    } else if (_typeof(value) === 'object' && value !== null) {
      // Format nested object
      var nestedIndent = indent + '  ';
      stringValue = "\n".concat(formatData(value, nestedIndent));
    } else {
      // Handle non-object values
      stringValue = value;
    }
    return "".concat(indent).concat(key, ": ").concat(stringValue);
  }).join('\n');
};
function exportToEnglish() {
  var _this = this;
  var indentLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
  var langKeywords = _i18n["default"][lang] || _i18n["default"].en; // Fallback to English if the language is not found
  var conditionDescriptions = '';
  var describeAction = function describeAction(node, indentLevel) {
    var currentIndent = ' '.repeat(indentLevel * 2);
    var nextIndent = ' '.repeat(indentLevel * 2);
    var withIndent = ' '.repeat(indentLevel * 2 + 2); // Indent for "with" label
    var dataIndent = ' '.repeat((indentLevel + 2) * 2); // Indent for data

    var output = '';
    if (node.action) {
      return "".concat(currentIndent).concat(node.action);
    } else if (node["if"]) {
      var ifString;
      if (Array.isArray(node["if"])) {
        ifString = node["if"].join(" ".concat(langKeywords.andKeyword, " "));
      } else {
        ifString = node["if"];
      }
      var description = "".concat(currentIndent).concat(langKeywords.ifKeyword, " ").concat(ifString);

      // Process 'then' block
      if (node.then) {
        var thenDescription = node.then.map(function (childNode) {
          var childDesc = describeAction(childNode, indentLevel + 1);
          if (childNode.data) {
            childDesc += "\n".concat(formatData(childNode.data, dataIndent));
          }
          return childDesc;
        }).join('\n');
        description += "\n".concat(thenDescription);
      }

      // Process 'else' block
      if (node["else"]) {
        var elseDescription = node["else"].map(function (childNode) {
          var childDesc = describeAction(childNode, indentLevel + 1);
          if (childNode.data) {
            childDesc += "\n".concat(formatData(childNode.data, dataIndent));
          }
          return childDesc;
        }).join('\n');
        description += "\n".concat(currentIndent).concat(langKeywords.elseKeyword, "\n").concat(elseDescription);
      }
      output += description;
    }
    if (node.subtree) {
      var subtree = _this.subtrees[node.subtree];
      if (subtree) {
        // Recursively call exportToEnglish for the subtree
        output += "".concat(currentIndent, " @").concat(node.subtree, "=>\n").concat(exportToEnglish.call(subtree, indentLevel + 1, lang));
      }
      // If the subtree is not found, return a placeholder message
      // output += `${currentIndent}${langKeywords.subtreeKeyword} ${node.subtree} (not found)`;
    }

    // Combine actions and conditions descriptions
    //let output = this.tree.map(node => describeAction(node, indentLevel, this)).join('\n');
    // Remark: this will expand *all conditions* inline, which is not ideal, but useful as a config setting
    /*
    for (let c in this.originalConditions) {
      let condition = this.originalConditions[c];
      output += `\n\n${c}:\n  ${describeCondition(condition)}`;
    }
    */

    // Add an extra newline for root nodes
    if (indentLevel === 0) {
      output += '\n';
    }
    return output;
  };
  var describeCondition = function describeCondition(condition) {
    // Handle condition if it's a function
    if (typeof condition === 'function') {
      return condition.toString();
    }

    // Handle condition if it's an array of conditions
    if (Array.isArray(condition)) {
      return condition.map(function (cond) {
        return describeCondition(cond);
      }).join(' and ');
    }

    // Handle condition if it's an object
    if (_typeof(condition) === 'object' && condition !== null) {
      switch (condition.op) {
        case 'eq':
          return "".concat(condition.property, " equals ").concat(condition.value);
        case 'lessThan':
          return "".concat(condition.property, " less than ").concat(condition.value);
        case 'greaterThan':
          return "".concat(condition.property, " greater than ").concat(condition.value);
        case 'and':
          return "all of (".concat(condition.conditions.map(function (cond) {
            return describeCondition(cond);
          }).join(', '), ") are true");
        case 'or':
          return "any of (".concat(condition.conditions.map(function (cond) {
            return describeCondition(cond);
          }).join(', '), ") is true");
        case 'not':
          return "not (".concat(describeCondition(condition.conditions), ")");
        // Add more cases as needed for other operators
        default:
          // console.log('calling default', condition)
          return JSON.stringify(condition);
      }
    }
    return JSON.stringify(condition);
  };

  // handle subtrees when this.tree is empty
  // TODO: add case for root + subtrees
  if (!this.tree || this.tree.length === 0 && this.subtrees) {
    var subtreeOutputs = Object.keys(this.subtrees).map(function (subtreeKey) {
      var subtree = _this.subtrees[subtreeKey];
      return "@".concat(subtreeKey, "=>\n").concat(exportToEnglish.call(subtree, indentLevel + 1, lang));
    });
    return subtreeOutputs.join('\n') + '\n' + conditionDescriptions;
  }

  // Existing logic for handling this.tree
  return this.tree.map(function (node) {
    return describeAction(node, indentLevel);
  }).join('\n').concat('') + '\n' + conditionDescriptions;
  //return this.tree.map(node => describeAction(node, indentLevel)).join('\n').concat('') + '\n' + conditionDescriptions;
}

},{"./i18n.js":11}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Example language configuration object
var languageConfig = {
  en: {
    // English
    ifKeyword: "if",
    thenKeyword: "then",
    elseKeyword: "else",
    andKeyword: "and",
    subtreeKeyword: "subtree"
    // Add more keywords or phrases as needed
  },

  zh: {
    // Mandarin
    ifKeyword: "如果",
    // Rúguǒ
    thenKeyword: "那么",
    // Nàme
    elseKeyword: "否则",
    // Fǒuzé
    andKeyword: "和",
    // Hé
    subtreeKeyword: "子树" // Zǐshù
  },

  ja: {
    // Japanese
    ifKeyword: "もし",
    // Moshi
    thenKeyword: "ならば",
    // Naraba
    elseKeyword: "それ以外",
    // Sore igai
    andKeyword: "と",
    // To
    subtreeKeyword: "サブツリー" // Sabutsurī
  }
  // You can add more languages here
};
var _default = exports["default"] = languageConfig;

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = {
  eq: 'equals',
  '==': 'equals',
  neq: 'notEquals',
  '!=': 'notEquals',
  lt: 'lessThan',
  '<': 'lessThan',
  lte: 'lessThanOrEqual',
  '<=': 'lessThanOrEqual',
  gt: 'greaterThan',
  '>': 'greaterThan',
  gte: 'greaterThanOrEqual',
  '>=': 'greaterThanOrEqual',
  '&&': 'and',
  '||': 'or',
  '!': 'not'
};

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parsePath;
function parsePath(path) {
  return path.split('.').reduce(function (acc, part) {
    var arrayMatch = part.match(/([^\[]+)(\[\d+\])?/);
    if (arrayMatch) {
      acc.push(arrayMatch[1]);
      if (arrayMatch[2]) {
        acc.push(parseInt(arrayMatch[2].replace(/[\[\]]/g, '')));
      }
    }
    return acc;
  }, []);
}

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = serializeToJson;
var _excluded = ["parent"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function serializeToJson() {
  var serializedData = {
    tree: this.tree.map(function (node) {
      return serializeNode(node);
    }),
    conditions: {}
  };

  // Serialize the DSL part of conditions correctly
  for (var key in this.conditions) {
    if (typeof this.conditions[key] === 'function') {
      serializedData.conditions[key] = _typeof(this.conditions[key].original) === 'object' ? this.conditions[key].original : {
        type: 'customFunction'
      };
    }
  }
  return JSON.stringify(serializedData, null, 2);
}

// Helper function to serialize a single node
function serializeNode(node) {
  var parent = node.parent,
    serializedNode = _objectWithoutProperties(node, _excluded); // Exclude the parent property

  // Recursively serialize 'then' and 'else' branches
  if (serializedNode.then && Array.isArray(serializedNode.then)) {
    serializedNode.then = serializedNode.then.map(function (childNode) {
      return serializeNode(childNode);
    });
  }
  if (serializedNode["else"] && Array.isArray(serializedNode["else"])) {
    serializedNode["else"] = serializedNode["else"].map(function (childNode) {
      return serializeNode(childNode);
    });
  }
  return serializedNode;
}

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _exportToEnglish = _interopRequireDefault(require("./exportToEnglish.js"));
var _serializeToJson = _interopRequireDefault(require("./serializeToJson.js"));
var _evaluateCondition = _interopRequireDefault(require("./evaluateCondition.js"));
var _evaluateSingleCondition = _interopRequireDefault(require("./evaluateSingleCondition.js"));
var _evaluateDSLCondition = _interopRequireDefault(require("./evaluateDSLCondition.js"));
var _evaluateCompositeCondition = _interopRequireDefault(require("./evaluateCompositeCondition.js"));
var _parsePath = _interopRequireDefault(require("./parsePath.js"));
var _operatorAliases = _interopRequireDefault(require("./operatorAliases.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var logger = function logger() {};
// logger = console.log.bind(console);
var Sutra = /*#__PURE__*/function () {
  function Sutra() {
    _classCallCheck(this, Sutra);
    this.tree = [];
    this.conditions = {};
    this.listeners = {};
    this.maps = {};

    // merged state of actions and conditions stored per tick
    this.state = {};

    // same this.state data, but with unmerged individual scopes
    this.satisfiedActions = {};
    this.satisfiedConditions = {};
    this.operators = ['equals', 'notEquals', 'greaterThan', 'lessThan', 'greaterThanOrEqual', 'lessThanOrEqual', 'and', 'or', 'not'];
    this.operatorAliases = _operatorAliases["default"];
    this.exportToEnglish = _exportToEnglish["default"];
    this.serializeToJson = _serializeToJson["default"];
    this.toJSON = _serializeToJson["default"];
    this.toEnglish = _exportToEnglish["default"];
    this.evaluateCondition = _evaluateCondition["default"];
    this.evaluateSingleCondition = _evaluateSingleCondition["default"];
    this.evaluateDSLCondition = _evaluateDSLCondition["default"];
    this.evaluateCompositeCondition = _evaluateCompositeCondition["default"];
    this.parsePath = _parsePath["default"];
    this.nodeIdCounter = 0; // New property to keep track of node IDs
  }
  _createClass(Sutra, [{
    key: "use",
    value: function use(subSutra, name) {
      var _this = this;
      var insertAt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.tree.length;
      var shareListeners = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      // Store a reference to the subSutra for subtree-specific logic
      this.subtrees = this.subtrees || {};
      subSutra.isSubtree = true;
      subSutra.parent = this;
      this.subtrees[name] = subSutra;
      if (shareListeners) {
        this.sharedListeners = true;

        // Merge subtree's listeners into the main tree's listeners
        this.listeners = _objectSpread(_objectSpread({}, this.listeners), subSutra.listeners);
        this.anyListeners = [].concat(_toConsumableArray(this.anyListeners || []), _toConsumableArray(subSutra.anyListeners || []));

        // Optionally, update the subtree's listeners to reflect this change
        // This ensures that both the subtree and main tree have the same set of listeners
        subSutra.listeners = this.listeners;
        subSutra.anyListeners = this.anyListeners;
      }

      // Integrate conditions from the subSutra
      Object.entries(subSutra.conditions).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          conditionName = _ref2[0],
          condition = _ref2[1];
        if (_this.conditions[conditionName]) {
          console.warn("Condition '".concat(conditionName, "' from subtree '").concat(name, "' will overwrite an existing condition in the main Sutra."));
        }
        _this.addCondition(conditionName, condition);
      });

      // always combine conditions from subtrees
      subSutra.conditions = _objectSpread(_objectSpread({}, this.conditions), subSutra.conditions);
    }
  }, {
    key: "on",
    value: function on(event, listener) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(listener);
    }
  }, {
    key: "emit",
    value: function emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      // Emit to the current instance's listeners
      this.emitLocal.apply(this, [event].concat(args));

      // If this instance is a subtree and sharedListeners is true, propagate to the parent tree
      if (this.isSubtree && this.sharedListeners && this.parent) {
        var _this$parent;
        (_this$parent = this.parent).emitShared.apply(_this$parent, [event].concat(args));
      }
    }
  }, {
    key: "emitLocal",
    value: function emitLocal(event) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      // Trigger all listeners for this specific event
      if (this.listeners[event]) {
        this.listeners[event].forEach(function (listener) {
          return listener.apply(void 0, args);
        });
      }
      // Trigger all 'any' listeners, regardless of the event type
      if (this.anyListeners) {
        this.anyListeners.forEach(function (listener) {
          return listener.apply(void 0, [event].concat(args));
        });
      }
    }
  }, {
    key: "emitShared",
    value: function emitShared(event) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }
      // Emit to main tree's listeners
      if (this.listeners[event]) {
        this.listeners[event].forEach(function (listener) {
          return listener.apply(void 0, args);
        });
      }
      if (this.anyListeners) {
        this.anyListeners.forEach(function (listener) {
          return listener.apply(void 0, [event].concat(args));
        });
      }
      // Additionally, emit to each subtree's listeners
      Object.values(this.subtrees).forEach(function (subtree) {
        if (subtree.listeners[event]) {
          subtree.listeners[event].forEach(function (listener) {
            return listener.apply(void 0, args);
          });
        }
        if (subtree.anyListeners) {
          subtree.anyListeners.forEach(function (listener) {
            return listener.apply(void 0, [event].concat(args));
          });
        }
      });
    }
  }, {
    key: "onAny",
    value: function onAny(listener) {
      // Initialize the anyListeners array if it doesn't exist
      this.anyListeners = this.anyListeners || [];
      this.anyListeners.push(listener);
    }
  }, {
    key: "if",
    value: function _if() {
      var conditions = Array.from(arguments); // Convert arguments to an array
      var lastNode = this.tree.length > 0 ? this.tree[this.tree.length - 1] : null;
      if (lastNode && !lastNode.then) {
        // If the last node exists and doesn't have a 'then', add conditions to it
        if (!Array.isArray(lastNode["if"])) {
          lastNode["if"] = [lastNode["if"]];
        }
        lastNode["if"] = lastNode["if"].concat(conditions);
      } else {
        // Create a new node
        var node = {
          "if": conditions.length > 1 ? conditions : conditions[0]
        };
        node.state = this.state;
        node.satisfiedConditions = this.satisfiedConditions;
        node.satisfiedActions = this.satisfiedActions;
        this.addAction(node);
      }
      return this; // Return this for chaining
    }
  }, {
    key: "then",
    value: function then(actionOrFunction) {
      var _this2 = this;
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var lastNode = this.tree[this.tree.length - 1];
      if (!lastNode.then) {
        lastNode.then = [];
      }
      if (typeof actionOrFunction === 'function') {
        // Create a scoped context
        var scopedContext = {
          "if": function _if(condition) {
            var node = {
              "if": condition,
              then: []
            };
            node.state = _this2.state;
            node.satisfiedConditions = _this2.satisfiedConditions;
            node.satisfiedActions = _this2.satisfiedActions;
            node.sutraPath = "".concat(lastNode.sutraPath, ".then[").concat(lastNode.then.length, "]");
            lastNode.then.push(node);
            return scopedContext; // Allow chaining within the scoped context
          },

          then: function then(action) {
            var node = lastNode.then[lastNode.then.length - 1];
            node.state = _this2.state;
            node.satisfiedConditions = _this2.satisfiedConditions;
            node.satisfiedActions = _this2.satisfiedActions;
            if (!node.then) {
              node.then = [];
            }
            var actionNode = {
              action: action
            };
            actionNode.state = _this2.state;
            actionNode.satisfiedConditions = _this2.satisfiedConditions;
            actionNode.satisfiedActions = _this2.satisfiedActions;
            actionNode.sutraPath = "".concat(node.sutraPath, ".then[").concat(node.then.length, "]");
            node.then.push(actionNode);
            return scopedContext;
          },
          "else": function _else(action) {
            var node = lastNode.then[lastNode.then.length - 1];
            node.state = _this2.state;
            node.satisfiedConditions = _this2.satisfiedConditions;
            node.satisfiedActions = _this2.satisfiedActions;
            if (!node["else"]) {
              node["else"] = [];
            }
            var actionNode = {
              action: action
            };
            actionNode.state = _this2.state;
            actionNode.satisfiedConditions = _this2.satisfiedConditions;
            actionNode.satisfiedActions = _this2.satisfiedActions;
            actionNode.sutraPath = "".concat(node.sutraPath, ".else[").concat(node["else"].length, "]");
            node["else"].push(actionNode);
            return scopedContext;
          },
          map: function map(name) {
            // Add the map node to the last 'then' node
            var mapNode = {
              map: name
            };
            lastNode.then.push(mapNode);
            return scopedContext; // Allow chaining within the scoped context
          }
        };

        // Execute the function in the scoped context
        actionOrFunction(scopedContext);
      } else {
        // check see if string matches name of known subtree
        var subSutra;
        if (this.subtrees) {
          subSutra = this.subtrees[actionOrFunction];
        }
        var actionNode = {};
        actionNode.state = this.state;
        actionNode.satisfiedConditions = this.satisfiedConditions;
        actionNode.satisfiedActions = this.satisfiedActions;
        if (data) {
          actionNode.data = data;
        }
        if (subSutra) {
          // If it's a subtree, add a subtree node
          lastNode.subtree = actionOrFunction;
          delete lastNode.then;
        } else {
          // Otherwise, add an action node
          actionNode.action = actionOrFunction;
          actionNode.sutraPath = "".concat(lastNode.sutraPath, ".then[").concat(lastNode.then.length, "]");
          lastNode.then.push(actionNode);
        }
      }
      return this; // Return this for chaining
    }
  }, {
    key: "else",
    value: function _else(actionOrFunction) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var lastNode = this.tree[this.tree.length - 1];
      if (!lastNode["else"]) {
        lastNode["else"] = [];
      }
      if (typeof actionOrFunction === 'function') {
        // Create a scoped context for else
        var scopedContext = {
          "if": function _if(condition) {
            var node = {
              "if": condition,
              then: [],
              "else": []
            };
            lastNode["else"].push(node);
            return scopedContext; // Allow chaining within the scoped context
          },

          then: function then(action) {
            var node = lastNode["else"][lastNode["else"].length - 1];
            if (!node.then) {
              node.then = [];
            }
            node.then.push({
              action: action,
              data: data
            });
            return scopedContext;
          },
          "else": function _else(action) {
            var node = lastNode["else"][lastNode["else"].length - 1];
            if (!node["else"]) {
              node["else"] = [];
            }
            node["else"].push({
              action: action,
              data: data
            });
            return scopedContext;
          }
        };
        // Execute the function in the scoped context
        actionOrFunction(scopedContext);
      } else {
        lastNode["else"].push({
          action: actionOrFunction,
          data: data
        });
      }
      return this; // Return this for chaining
    }
  }, {
    key: "addMap",
    value: function addMap(name, mapFunction) {
      var mapNode = {
        map: name,
        func: mapFunction
      };
      this.maps[name] = mapNode;
      this.generateSutraPath(mapNode, 'tree', this.tree.length - 1, null);
    }

    // Method to execute a map node
  }, {
    key: "executeMap",
    value: function executeMap(mapNode, data, gameState) {
      if (typeof mapNode.func === 'function') {
        // Execute the map function and update data and gameState accordingly
        var result = mapNode.func(data, gameState);
        if (result !== undefined) {
          // Update data and gameState if result is returned
          return result;
        }
      }
      return data; // Return original data if no transformation occurred
    }

    // Fluent API for map
  }, {
    key: "map",
    value: function map(name) {
      var lastNode = this.tree[this.tree.length - 1];

      // If there's no last 'then' node or it's a placeholder, create a new node
      if (!lastNode) {
        lastNode = {
          then: []
        };
        // lastNode.then.push(lastThenNode);
      }

      if (!lastNode.then) {
        lastNode.then = [];
      }

      // Add the map node to the last 'then' node
      var mapNode = {
        map: name
      };
      lastNode.then.push(mapNode);
      return this; // Allow chaining within the scoped context
    }
  }, {
    key: "addAction",
    value: function addAction(node) {
      this.tree.push(node);
      this.generateSutraPath(node, 'tree', this.tree.length - 1, null);
    }
  }, {
    key: "addCondition",
    value: function addCondition(name, conditionObj) {
      var _this3 = this;
      this.originalConditions = this.originalConditions || {};
      if (Array.isArray(conditionObj)) {
        this.conditions[name] = conditionObj.map(function (cond) {
          if (typeof cond === 'function') {
            _this3.originalConditions[name] = _this3.originalConditions[name] || [];
            _this3.originalConditions[name].push({
              type: 'function',
              func: cond
            });
            return {
              func: function func(data, gameState) {
                return cond(data, gameState);
              },
              original: null
            };
          } else {
            _this3.originalConditions[name] = _this3.originalConditions[name] || [];
            _this3.originalConditions[name].push(cond);
            var conditionFunc = function conditionFunc(data, gameState) {
              return _this3.evaluateDSLCondition(cond, data, gameState);
            };
            return {
              func: conditionFunc,
              original: cond
            };
          }
        });
      } else {
        this.storeSingleCondition(name, conditionObj);
      }
    }
  }, {
    key: "removeCondition",
    value: function removeCondition(name) {
      if (this.conditions[name]) {
        delete this.conditions[name];
        if (this.originalConditions && this.originalConditions[name]) {
          delete this.originalConditions[name];
        }
        return true;
      }
      return false; // Condition name not found
    }
  }, {
    key: "updateCondition",
    value: function updateCondition(name, newConditionObj) {
      var _this4 = this;
      if (!this.conditions[name]) {
        return false;
      }
      // If the new condition is a function, update directly
      if (typeof newConditionObj === 'function') {
        this.conditions[name] = newConditionObj;
      } else if (_typeof(newConditionObj) === 'object') {
        // Handle if newConditionObj is an array
        if (Array.isArray(newConditionObj)) {
          // Update each condition in the array
          newConditionObj.forEach(function (condition) {
            if (condition.op === 'and' || condition.op === 'or' || condition.op === 'not') {
              // Composite condition for each element in the array
              var conditionFunc = function conditionFunc(data, gameState) {
                return _this4.evaluateDSLCondition(condition, data, gameState);
              };
              conditionFunc.original = condition;
              _this4.conditions[name] = conditionFunc;
            } else {
              // DSL condition for each element in the array
              var _conditionFunc = function _conditionFunc(data, gameState) {
                return _this4.evaluateDSLCondition(condition, data, gameState);
              };
              _conditionFunc.original = condition;
              _this4.conditions[name] = _conditionFunc;
            }
          });
        } else if (newConditionObj.op === 'and' || newConditionObj.op === 'or' || newConditionObj.op === 'not') {
          // Composite condition
          var conditionFunc = function conditionFunc(data, gameState) {
            return _this4.evaluateDSLCondition(newConditionObj, data, gameState);
          };
          conditionFunc.original = newConditionObj;
          this.conditions[name] = conditionFunc;
        } else {
          // DSL condition
          var _conditionFunc2 = function _conditionFunc2(data, gameState) {
            return _this4.evaluateDSLCondition(newConditionObj, data, gameState);
          };
          _conditionFunc2.original = newConditionObj;
          this.conditions[name] = _conditionFunc2;
        }
      } else {
        return false;
      }
      // Update original conditions for GUI use
      this.originalConditions[name] = newConditionObj;
      return true;
    }
  }, {
    key: "storeSingleCondition",
    value: function storeSingleCondition(name, conditionObj) {
      var _this5 = this;
      // Store the original condition object separately for GUI use
      if (!(typeof conditionObj === 'function' && conditionObj.original)) {
        this.originalConditions = this.originalConditions || {};
        this.originalConditions[name] = conditionObj;
      }
      if (conditionObj.op === 'and' || conditionObj.op === 'or' || conditionObj.op === 'not') {
        // Store composite conditions directly
        this.conditions[name] = conditionObj;
        this.originalConditions[name] = conditionObj;
      } else if (typeof conditionObj === 'function') {
        // Wrap custom function conditions to include gameState
        this.conditions[name] = function (data, gameState) {
          var val = false;
          try {
            val = conditionObj(data, gameState);
          } catch (err) {
            // console.log('warning: error in condition function', err)
          }
          return val;
        };
      } else {
        // For DSL conditions, pass gameState to the evaluateDSLCondition function
        var conditionFunc = function conditionFunc(data, gameState) {
          return _this5.evaluateDSLCondition(conditionObj, data, gameState);
        };
        conditionFunc.original = conditionObj;
        this.conditions[name] = conditionFunc;
      }
    }
  }, {
    key: "resolveOperator",
    value: function resolveOperator(operator) {
      return this.operatorAliases[operator] || operator;
    }

    // Method to set or update aliases
  }, {
    key: "setOperatorAlias",
    value: function setOperatorAlias(alias, operator) {
      this.operatorAliases[alias] = operator;
    }
  }, {
    key: "getConditionFunction",
    value: function getConditionFunction(name) {
      return this.conditions[name];
    }
  }, {
    key: "getCondition",
    value: function getCondition(name) {
      return this.originalConditions ? this.originalConditions[name] : undefined;
    }
  }, {
    key: "getOperators",
    value: function getOperators() {
      return Object.keys(this.operatorAliases);
    }
  }, {
    key: "traverseNode",
    value: function traverseNode(node, data, gameState) {
      var mappedData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      if (node.subtree) {
        var subSutra = this.subtrees[node.subtree];
        if (subSutra) {
          var _conditionMet = node["if"] ? this.evaluateCondition(node["if"], data, gameState, subSutra) : true;
          if (_conditionMet) {
            node.state[node["if"]] = true;
            node.satisfiedConditions[node["if"]] = true;
            subSutra.tick(data, gameState);
          }
        } else {
          console.warn("Subtree '".concat(node.subtree, "' not found."));
        }
        return;
      }

      // Use mappedData if available, otherwise use the original data
      var currentData = mappedData || data;

      // Process the map node if present
      if (node.map) {
        var map = this.maps[node.map];
        if (!map) {
          throw new Error("Map \"".concat(node.map, "\" not found"));
        }
        var newMappedData = this.executeMap(map, currentData, gameState);
        if (newMappedData !== undefined) {
          mappedData = newMappedData;
        }
      }

      // Execute action if present
      if (node.action) {
        this.executeAction(node.action, mappedData || currentData, node, gameState);
        return;
      }
      var conditionMet = node["if"] ? this.evaluateCondition(node["if"], mappedData || currentData, gameState) : true;
      if (conditionMet) {
        this.state[node["if"]] = true;
        this.satisfiedConditions[node["if"]] = true;
        this.processBranch(node.then, mappedData || currentData, gameState, mappedData);
      } else {
        this.processBranch(node["else"], mappedData || currentData, gameState, mappedData);
      }
    }
  }, {
    key: "processBranch",
    value: function processBranch(branch, data, gameState) {
      var _this6 = this;
      var mappedData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      if (Array.isArray(branch)) {
        branch.forEach(function (childNode) {
          return _this6.traverseNode(childNode, data, gameState, mappedData);
        });
      }
    }
  }, {
    key: "executeAction",
    value: function executeAction(action, data, node, gameState) {
      var object = {};
      if (!node.data) {
        node.data = {};
      }
      var entityData = data;
      Object.entries(entityData).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];
        // check data to see if any of the keys at the first level are functions
        // if so, execute them and replace the value with the result
        // this is to allow for dynamic data to be passed to the action
        if (typeof value === 'function') {
          // We may need to add a flag for dynamic value execution on the data object
          // Remark: Do not attempt to run event listeners as value functions
          // Parent APIs may call into Sutra with functions that should not be executed as values
          var isEventListener = key.includes('after') || key.includes('before') || key.includes('on');
          if (!isEventListener) {
            object[key] = value(entityData, gameState, node);
          }
        } else {
          object[key] = value;
        }
      });
      Object.entries(node.data).forEach(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
          key = _ref6[0],
          value = _ref6[1];
        if (typeof value === 'function') {
          object[key] = value(entityData, gameState, node);
        } else {
          object[key] = value;
        }
      });
      var mergedData = object;
      // Update node state to reflect executed action
      this.state[action] = true;
      this.satisfiedActions[action] = true;
      this.emit(action, mergedData, node, gameState);
    }

    // Remark: Is this being used?
  }, {
    key: "updateEntity",
    value: function updateEntity(entity, updateData, gameState) {
      Object.entries(updateData).forEach(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
          key = _ref8[0],
          value = _ref8[1];
        if (typeof value === 'function') {
          entity[key] = value();
        } else {
          entity[key] = value;
        }
      });
    }
  }, {
    key: "generateSutraPath",
    value: function generateSutraPath(node, parentPath, index, parent) {
      var _this7 = this;
      var path = index === -1 ? parentPath : "".concat(parentPath, "[").concat(index, "]");
      node.sutraPath = path;
      node.parent = parent; // Set the parent reference

      if (node.then && Array.isArray(node.then)) {
        node.then.forEach(function (child, idx) {
          return _this7.generateSutraPath(child, "".concat(path, ".then"), idx, node);
        });
      }
      if (node["else"] && Array.isArray(node["else"])) {
        node["else"].forEach(function (child, idx) {
          return _this7.generateSutraPath(child, "".concat(path, ".else"), idx, node);
        });
      }
    }
  }, {
    key: "getNestedValue",
    value: function getNestedValue(obj, path) {
      var pathArray = this.parsePath(path);
      return pathArray.reduce(function (current, part) {
        return current && current[part] !== undefined ? current[part] : undefined;
      }, obj);
    }
  }, {
    key: "findNode",
    value: function findNode(path) {
      // Remark: findNode is intentionally not recursive / doesn't use visitor pattern
      //         This choice is based on performance considerations
      //         Feel free to create a benchmark to compare the performance of this
      var obj = this;
      var pathArray = this.parsePath(path);
      var current = obj;
      var _iterator = _createForOfIteratorHelper(pathArray),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var part = _step.value;
          if (current[part] === undefined) {
            return undefined;
          }
          current = current[part];
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return current;
    }
  }, {
    key: "removeNode",
    value: function removeNode(path) {
      // Split the path into segments and find the parent node and the index of the node to be removed
      var pathArray = this.parsePath(path);
      var current = this;
      for (var i = 0; i < pathArray.length - 1; i++) {
        var part = pathArray[i];
        if (current[part] === undefined) {
          return; // Node doesn't exist, nothing to remove
        }

        current = current[part];
      }
      var nodeToRemoveIndex = pathArray[pathArray.length - 1];
      if (Array.isArray(current) && typeof nodeToRemoveIndex === 'number') {
        // If current is an array and nodeToRemoveIndex is an index, use splice
        if (current.length > nodeToRemoveIndex) {
          current.splice(nodeToRemoveIndex, 1);

          // Reconstruct the parentPath
          var parentPath = pathArray.slice(0, -1).reduce(function (acc, curr, idx) {
            // Append array indices with brackets and property names with dots
            return idx === 0 ? curr : !isNaN(curr) ? "".concat(acc, "[").concat(curr, "]") : "".concat(acc, ".").concat(curr);
          }, '');

          // Update sutraPath for subsequent nodes in the same array
          this.updateSutraPaths(current, nodeToRemoveIndex, parentPath);
        }
      } else if (current[nodeToRemoveIndex] !== undefined) {
        // If it's a regular object property
        delete current[nodeToRemoveIndex];
      }
    }
  }, {
    key: "updateSutraPaths",
    value: function updateSutraPaths(nodes, startIndex, parentPath) {
      for (var i = startIndex; i < nodes.length; i++) {
        // Convert dot notation to bracket notation for indices in the parentPath
        var adjustedParentPath = parentPath.replace(/\.(\d+)(?=\[|$)/g, '[$1]');
        this.generateSutraPath(nodes[i], adjustedParentPath, i, nodes[i].parent);
      }
    }
  }, {
    key: "updateNode",
    value: function updateNode(path, newNodeData) {
      var node = this.findNode(path);
      if (node) {
        Object.assign(node, newNodeData);
        return true;
      }
      return false;
    }
  }, {
    key: "tick",
    value: function tick(data) {
      var _this8 = this;
      var gameState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // Reset state for all nodes
      this.tree.forEach(function (node) {
        node.state = {};
        node.satisfiedConditions = {};
        node.satisfiedActions = {};
      });
      this.state = {};
      this.satisfiedActions = {};
      this.satisfiedConditions = {};
      var subtreeEvaluated = false;
      // Iterate over the main tree's nodes
      this.tree.forEach(function (node) {
        if (node.subtree) {
          subtreeEvaluated = true;
          _this8.traverseNode(node, data, gameState);
        } else {
          _this8.traverseNode(node, data, gameState);
        }
      });

      // If no subtrees were directly evaluated in the main tree, then evaluate all subtrees
      if (this.subtrees && !subtreeEvaluated) {
        Object.values(this.subtrees).forEach(function (subSutra) {
          subSutra.tick(data, gameState);
        });
      }
    }
  }, {
    key: "getSubtree",
    value: function getSubtree(subtreeName) {
      return this.subtrees[subtreeName];
    }
  }, {
    key: "getReadableSutraPath",
    value: function getReadableSutraPath(sutraPath) {
      var node = this.findNode(sutraPath);
      if (!node) return 'Invalid path';

      // Recursive function to build the readable path
      var buildPath = function buildPath(node) {
        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        if (!node.parent) return path;
        var parent = node.parent;
        var part = parent["if"] ? "".concat(parent["if"]) : parent.action ? "".concat(parent.action) : 'unknown';
        var newPath = part + (path ? ' and ' + path : '');
        return buildPath(parent, newPath);
      };
      return buildPath(node);
    }
  }]);
  return Sutra;
}();
var _default = exports["default"] = Sutra;

},{"./evaluateCompositeCondition.js":6,"./evaluateCondition.js":7,"./evaluateDSLCondition.js":8,"./evaluateSingleCondition.js":9,"./exportToEnglish.js":10,"./operatorAliases.js":12,"./parsePath.js":13,"./serializeToJson.js":14}]},{},[4])(4)
});
