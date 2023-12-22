(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.WORLDS = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Home = /*#__PURE__*/function () {
  function Home() {
    _classCallCheck(this, Home);
    this.id = Home.id;
  }
  _createClass(Home, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.createWorld();
    }
  }, {
    key: "createWorld",
    value: function createWorld() {
      var game = this.game;
      game.setGravity(0, 0, 0);
      game.createEntity({
        type: 'PLATFORM',
        isStatic: true,
        width: 1000,
        height: 40,
        position: {
          x: 0,
          y: 200
        }
      });
      game.createEntity({
        type: 'BLOCK',
        width: 300,
        height: 300,
        position: {
          x: 0,
          y: -150
        }
      });
      game.use('Border', {
        autoBorder: true
      });
      console.log(game.systems);
      game.createDefaultPlayer();

      /*
      game.systems.graphics.switchGraphics('BabylonGraphics', function(){
        game.use('StarField');
        game.createDefaultPlayer();
      });
      */
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
  }]);
  return Home;
}();
_defineProperty(Home, "id", 'Home');
var _default = exports["default"] = Home;

},{}],2:[function(require,module,exports){
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Platform = /*#__PURE__*/function () {
  function Platform(game) {
    _classCallCheck(this, Platform);
    this.game = game; // Store the reference to the game logic
    this.id = Platform.id;
  }
  _createClass(Platform, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.createWorld();
    }
  }, {
    key: "createWorld",
    value: function createWorld() {
      var game = this.game;
      game.setGravity(0, 9.8, 0);
      game.use('Platform');

      // TODO:     game.on('game::ready', function () {
      //           needs secound ready emit after plugins are loaded after start
      game.on('plugin::ready::Platform', function () {
        console.log(game.systems.platform.kinds);
        game.createEntity({
          type: 'PLATFORM',
          isStatic: true,
          width: 700,
          height: 40,
          position: {
            x: 0,
            y: 300
          }
        });
        game.createDefaultPlayer();
      });
      game.use('Border', {
        autoBorder: true
      });
      console.log(game.systems);
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
  }]);
  return Platform;
}();
_defineProperty(Platform, "id", 'Platform');
var _default = exports["default"] = Platform;

},{}],3:[function(require,module,exports){
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Pong = /*#__PURE__*/function () {
  function Pong() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Pong);
    this.averageSnapshotSize = null;
    this.displayElement = null;
    this.id = Pong.id;
  }
  _createClass(Pong, [{
    key: "init",
    value: function init(game) {
      this.game = game;

      // In order to let Mantra know the Pong Class subscribes to gameloop update() method
      // we must register it with the game instance as a "System".
      this.game.addSystem(this.id, this);
      // Now the game instance will call this.update()

      // TODO: refactor into functions
      /*
      game.systems['entity-input'].controlMappings = {
        W: 'MOVE_FORWARD',
        S: 'MOVE_BACKWARD'
      };
      */

      var leftSide = game.width / 3 * -1;

      // custom player join logic
      game.on('player::joined', function (playerData) {
        console.log('a player has joined the server', playerData);
        var player = game.createEntity({
          id: playerData.id,
          // TODO: replace this
          type: 'PLAYER',
          shape: 'rectangle',
          restitution: 0,
          // bounciness
          mass: 90000,
          height: 300,
          width: 40,
          friction: 0,
          // Default friction
          frictionAir: 0,
          // Default air friction
          frictionStatic: 0,
          // Default static friction
          lockedProperties: {
            position: {
              x: leftSide
            }
          }
        });
        // make sure to let the game know that the player has been created
        game.emit('player::created', player);
      });

      //
      // Create the Player
      //

      this.createBorder();
      this.createBall();
    }
  }, {
    key: "update",
    value: function update() {
      // console.log('update');

      // TODO: scoring functions
    }
  }, {
    key: "createBall",
    value: function createBall() {
      this.game.createEntity({
        id: 'game-ball',
        type: 'BALL',
        x: 0,
        y: 500,
        height: 50,
        width: 50,
        velocity: {
          // set initial velocity
          x: 8,
          y: 8
        },
        maxSpeed: 20,
        restitution: 2.5,
        // bounciness
        friction: 0,
        // Default friction
        frictionAir: 0,
        // Default air friction
        frictionStatic: 0 // Default static friction
      });
    }
  }, {
    key: "createBorder",
    value: function createBorder() {
      var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var height = 1000;
      var width = 2000;
      var WALL_THICKNESS = 200;
      var borders = {
        top: {
          position: {
            x: 0,
            y: -height / 2 - WALL_THICKNESS / 2
          },
          size: {
            width: width + WALL_THICKNESS * 2,
            height: WALL_THICKNESS
          }
        },
        bottom: {
          position: {
            x: 0,
            y: height / 2 + WALL_THICKNESS / 2
          },
          size: {
            width: width + WALL_THICKNESS * 2,
            height: WALL_THICKNESS
          }
        },
        left: {
          position: {
            x: -width / 2 - WALL_THICKNESS / 2,
            y: 0
          },
          size: {
            width: WALL_THICKNESS,
            height: height
          }
        },
        right: {
          position: {
            x: width / 2 + WALL_THICKNESS / 2,
            y: 0
          },
          size: {
            width: WALL_THICKNESS,
            height: height
          }
        }
      };
      for (var b in borders) {
        var border = borders[b];
        if (typeof entityData.id === 'undefined') {
          entityData.id = 'border';
        }
        this.game.createEntity({
          name: entityData.id + '-' + b,
          type: 'BORDER',
          shape: 'rectangle',
          isStatic: true,
          position: {
            x: border.position.x,
            y: border.position.y
          },
          width: border.size.width,
          height: border.size.height,
          depth: 80
        });
      }
    }
  }]);
  return Pong;
}();
_defineProperty(Pong, "id", 'world-pong');
var _default = exports["default"] = Pong;

},{}],4:[function(require,module,exports){
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Space = /*#__PURE__*/function () {
  function Space(game) {
    _classCallCheck(this, Space);
    this.game = game; // Store the reference to the game logic
    this.id = Space.id;
  }
  _createClass(Space, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.createWorld();
    }
  }, {
    key: "createWorld",
    value: function createWorld() {
      var game = this.game;

      // Adds projectile Bullets to the game
      game.use('Bullet');

      // add / remove entitymovement
      // game.systems['entity-movement'].unload();
      game.systemsManager.removeSystem('entity-input');
      game.systemsManager.removeSystem('entity-movement');

      // TODO: Game.setPhysics('PhysXPhysics')
      game.use('PhysXPhysics');
      game.use('EntityInput');
      game.use('EntityMovement');

      // Adds destructible Blocks to the game
      game.use('Block');
      game.use('Editor', {
        sourceCode: 'https://github.com/yantra-core/mantra/blob/master/mantra-client/public/examples/offline/physx-babylon.html'
      });

      // TODO: Game.setGraphics('BabylonGraphics')
      game.systems.graphics.switchGraphics('BabylonGraphics', function () {
        // Creates a single Block, since we have used Block plugin, this will be a destructible Block
        game.createEntity({
          type: 'BLOCK',
          width: 500,
          height: 500,
          depth: 200,
          position: {
            x: 0,
            y: -500
          }
        });
        game.use('Border', {
          autoBorder: true
        });
        game.use('StarField');
        game.createDefaultPlayer();
      });
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
  }]);
  return Space;
}();
_defineProperty(Space, "id", 'Space');
var _default = exports["default"] = Space;

},{}],5:[function(require,module,exports){
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Sutra = /*#__PURE__*/function () {
  function Sutra(game) {
    _classCallCheck(this, Sutra);
    this.game = game; // Store the reference to the game logic
    this.id = Sutra.id;
  }
  _createClass(Sutra, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.createWorld();
    }
  }, {
    key: "createWorld",
    value: function createWorld() {
      var game = this.game;
      game.use('Bullet');
      game.use('CurrentFPS');
      game.use('Timers');
      game.use('Health');
      game.use('Sutra');

      /*
      // game.use(new Plugins.SutraGUI({ }));
      game.use('Editor', {
        sourceCode: 'https://github.com/yantra-core/mantra/blob/master/mantra-client/public/examples/offline/sutra-level-editor.html',
        sutraEditor: true
      });
      */

      game.use('Block', {
        MIN_BLOCK_SIZE: 1000
      });
      game.use('Border', {
        autoBorder: true,
        thickness: 200
      });
      game.systems.graphics.switchGraphics('BabylonGraphics', function () {
        // Adds a nice StarField background
        game.use('StarField');
        game.use('TowerWorld', {
          game: game
        });
        game.data.roundEnded = false;
        game.data.roundStarted = true;
        game.createDefaultPlayer();
      });
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
  }]);
  return Sutra;
}();
_defineProperty(Sutra, "id", 'Sutra');
var _default = exports["default"] = Sutra;

},{}],6:[function(require,module,exports){
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var XState = /*#__PURE__*/function () {
  function XState(game) {
    _classCallCheck(this, XState);
    this.game = game; // Store the reference to the game logic
    this.id = XState.id;
  }
  _createClass(XState, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.createWorld();
    }
  }, {
    key: "createWorld",
    value: function createWorld() {
      var game = this.game;

      // Use Plugins to extend the game with new functionality

      // Adds projectile Bullets to the game
      game.use('Bullet');

      // Adds Health to the game
      game.use('Health');

      // Adds destructible Blocks to the game
      game.use('Block');

      // Adds a nice StarField background
      game.use('StarField');

      /*
      game.use('Editor', {
        sourceCode: 'https://github.com/yantra-core/mantra/blob/master/mantra-client/public/examples/offline/xstate-matter-babylon.html'
      });
      */

      function BossFightMiddleware() {
        var BossFight = {
          id: 'bossFightGame',
          initial: 'Idle',
          context: {
            name: 'boss',
            health: 1000
          },
          states: {
            Idle: {
              on: {
                START: 'Active'
              }
            },
            Active: {
              on: {
                'entity::damage': {
                  target: 'UpdateEntity',
                  cond: 'isBossDamaged'
                },
                ENTITY_DESTROYED: {
                  target: 'Victory',
                  cond: 'isBossDefeated'
                }
              }
            },
            UpdateEntity: {
              on: {
                COMPLETE_UPDATE: 'Active'
              },
              entry: 'calculateComponentUpdate'
            },
            Victory: {
              type: 'final'
              // Additional actions or events after the boss is defeated
            }
          },
          on: {
            // Define global event handlers if needed
          }
        };
        var Actions = {
          calculateComponentUpdate: function calculateComponentUpdate(context, event) {
            // Logic to calculate and apply component updates
            context.health -= event.damage;

            // Define color ranges: yellow (0xffff00) to red (0xff0000)
            var yellow = {
              r: 255,
              g: 255,
              b: 0
            };
            var red = {
              r: 255,
              g: 0,
              b: 0
            };

            // Calculate the proportion of health lost
            var maxHealth = 1000; // Assuming max health is 1000
            var healthProportion = Math.max(context.health, 0) / maxHealth;

            // Interpolate between yellow and red based on health proportion
            var r = yellow.r + (red.r - yellow.r) * (1 - healthProportion);
            var g = yellow.g + (red.g - yellow.g) * (1 - healthProportion);
            var b = yellow.b + (red.b - yellow.b) * (1 - healthProportion);

            // Convert RGB to hexadecimal color
            context.color = Math.round(r) << 16 | Math.round(g) << 8 | Math.round(b);
          }
        };
        var Guards = {
          isBossDamaged: function isBossDamaged(context, event) {
            return event.name === context.name && event.type === 'entity::damage';
          },
          isBossDefeated: function isBossDefeated(context, event) {
            return event.name === context.name && event.type === 'ENTITY_DESTROYED';
          }
        };
        var Game = {
          "id": "bossFightGame",
          "world": {
            "width": 800,
            "height": 600
          },
          "entities": {
            "boss": {
              "type": "NPC",
              "position": {
                x: -200,
                y: -600
              },
              // Define boss's position
              height: 600,
              width: 600,
              "health": 1000
              // Additional boss properties like attack patterns, abilities, etc.
            }
          },
          "stateMachine": BossFight,
          "guards": Guards,
          "actions": Actions
        };
        return Game;
      }
      game.use('XState', {
        world: BossFightMiddleware()
      });
      game.use('StarField');
      game.on('plugin::ready::XState', function () {
        game.systems['xstate'].loadEntities();
      });
      game.systems.graphics.switchGraphics('BabylonGraphics', function () {
        game.createDefaultPlayer();
      });
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
  }]);
  return XState;
}();
_defineProperty(XState, "id", 'XState');
var _default = exports["default"] = XState;

},{}],7:[function(require,module,exports){
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var YCraft = /*#__PURE__*/function () {
  function YCraft(game) {
    _classCallCheck(this, YCraft);
    this.game = game; // Store the reference to the game logic
    this.id = YCraft.id;
  }
  _createClass(YCraft, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.createWorld();
    }
  }, {
    key: "createWorld",
    value: function createWorld() {
      var game = this.game;
      game.use('YCraft');
      game.use('YCraftGUI');
      game.start(function () {});
      game.systems.graphics.switchGraphics('CSSGraphics', function () {
        game.createDefaultPlayer();
      });
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
  }]);
  return YCraft;
}();
_defineProperty(YCraft, "id", 'YCraft');
var _default = exports["default"] = YCraft;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "worlds", {
  enumerable: true,
  get: function get() {
    return _index["default"];
  }
});
var _index = _interopRequireDefault(require("./index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

},{"./index.js":9}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Home = _interopRequireDefault(require("./Home/Home.js"));
var _Platform = _interopRequireDefault(require("./Platform/Platform.js"));
var _Pong = _interopRequireDefault(require("./Pong/Pong.js"));
var _Space = _interopRequireDefault(require("./Space/Space.js"));
var _Sutra = _interopRequireDefault(require("./Sutra/Sutra.js"));
var _XState = _interopRequireDefault(require("./XState/XState.js"));
var _YCraft = _interopRequireDefault(require("./YCraft/YCraft.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var worlds = {};
worlds.Home = _Home["default"];
worlds.Platform = _Platform["default"];
worlds.Pong = _Pong["default"];
worlds.Space = _Space["default"];
worlds.Sutra = _Sutra["default"];
worlds.XState = _XState["default"];
worlds.YCraft = _YCraft["default"];
var _default = exports["default"] = worlds;

},{"./Home/Home.js":1,"./Platform/Platform.js":2,"./Pong/Pong.js":3,"./Space/Space.js":4,"./Sutra/Sutra.js":5,"./XState/XState.js":6,"./YCraft/YCraft.js":7}]},{},[8])(8)
});
