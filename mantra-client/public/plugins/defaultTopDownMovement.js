(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).defaultTopDownMovement = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = topdownMovement;
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
    conditions: ['K', 'BUTTON_A']
  });
  rules.addCondition('ZOOM_OUT', {
    op: 'or',
    conditions: ['L', 'BUTTON_Y']
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
  return rules;
}

},{}]},{},[1])(1)
});
