(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).EntityMovement = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Plugin = /*#__PURE__*/function () {
  function Plugin(game) {
    _classCallCheck(this, Plugin);
    this.game = game; // Store the reference to the game logic
    this.name = 'Plugin'; // make name required to be set?
    // registers itself in event emitter?
  }
  _createClass(Plugin, [{
    key: "init",
    value: function init() {
      throw new Error('Method "init" must be implemented');
    }
  }, {
    key: "update",
    value: function update(deltaTime, snapshot) {
      throw new Error('Method "update" must be implemented');
    }
  }, {
    key: "render",
    value: function render() {
      // throw new Error('Method "render" must be implemented');
    }
  }, {
    key: "destroy",
    value: function destroy() {
      // throw new Error('Method "destroy" must be implemented');
    }
  }]);
  return Plugin;
}();
var _default = exports["default"] = Plugin;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Plugin2 = _interopRequireDefault(require("../../Plugin.js"));
var _DefaultMovement = _interopRequireDefault(require("./strategies/DefaultMovement.js"));
var _Asteroids3DMovement = _interopRequireDefault(require("./strategies/3D/Asteroids3DMovement.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // EntityMovement.js - Marak Squires 2023
// handles input controller events and relays them to the game logic
var EntityMovement = /*#__PURE__*/function (_Plugin) {
  _inherits(EntityMovement, _Plugin);
  var _super = _createSuper(EntityMovement);
  function EntityMovement(strategy) {
    var _this;
    _classCallCheck(this, EntityMovement);
    _this = _super.call(this);
    _this.id = EntityMovement.id;
    _this.strategies = [];
    return _this;
  }
  _createClass(EntityMovement, [{
    key: "init",
    value: function init(game) {
      this.game = game; // Store the reference to the game logic
      this.game.systemsManager.addSystem(this.id, this);
    }

    /*
      // TODO: In EntityMovement.js
      init(game) {
        this.game = game;
        this.game.on('entity::move', data => {
          this.update(data.entityId, data.dx, data.dy, data.dz);
        });
        // Other event listeners...
      }
      */
  }, {
    key: "addStrategy",
    value: function addStrategy(strategy) {
      this.strategies.push(strategy);
    }
  }, {
    key: "removeStrategy",
    value: function removeStrategy(strategy) {
      this.strategies = this.strategies.filter(function (s) {
        return s.name !== strategy.name;
      });
    }
  }, {
    key: "update",
    value: function update(entityId, x, y, z) {
      if (this.strategies.length === 0) {
        console.log('Warning: No movement strategies registered, using default movement strategy');
        if (this.game.physics.dimension === 3) {
          this.game.use(new _Asteroids3DMovement["default"]());
        } else {
          this.game.use(new _DefaultMovement["default"]());
        }
      }
      this.strategies.forEach(function (strategy) {
        strategy.update(entityId, x, y, z); // rename to handleInputs? handleMovement?
      });
    }
  }, {
    key: "rotate",
    value: function rotate(entityId, x, y, z) {
      if (this.strategies.length === 0) {
        console.log('Warning: No movement strategies registered, using default movement strategy');
        if (this.game.physics.dimension === 3) {
          this.game.use(new _Asteroids3DMovement["default"]());
        } else {
          this.game.use(new _DefaultMovement["default"]());
        }
      }
      this.strategies.forEach(function (strategy) {
        strategy.rotate(entityId, x, y, z); // rename to handleInputs? handleMovement?
      });
    }
  }, {
    key: "render",
    value: function render() {}
  }, {
    key: "destroy",
    value: function destroy() {}
  }]);
  return EntityMovement;
}(_Plugin2["default"]);
_defineProperty(EntityMovement, "id", 'entity-movement');
_defineProperty(EntityMovement, "removable", false);
var _default = exports["default"] = EntityMovement;

},{"../../Plugin.js":1,"./strategies/3D/Asteroids3DMovement.js":3,"./strategies/DefaultMovement.js":4}],3:[function(require,module,exports){
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
// 3DAsteroidsMovement.js - Marak Squires 2023
var AsteroidsMovementStrategy = /*#__PURE__*/function () {
  function AsteroidsMovementStrategy() {
    _classCallCheck(this, AsteroidsMovementStrategy);
    // Define thrust for movement
    this.thrust = 0.05 * 1000;
    this.id = AsteroidsMovementStrategy.id;
  }
  _createClass(AsteroidsMovementStrategy, [{
    key: "init",
    value: function init(game) {
      this.game = game;

      // check to see if entityMovement system exists, if not throw error
      if (!game.systems['entity-movement']) {
        throw new Error('AsteroidsMovementStrategy requires an entityMovement system to be registered! Please game.use(new EntityMovement())');
      }
      game.systems['entity-movement'].strategies.push(this);
    }
  }, {
    key: "getForwardDirection",
    value: function getForwardDirection(body) {
      var bodyRotation = this.game.physics.getBodyRotation(body); // Quaternion

      // convert bodyRotation to babyonjs quaternion
      var quaternion = new BABYLON.Quaternion(bodyRotation.x, bodyRotation.y, bodyRotation.z, bodyRotation.w);
      // Default forward vector
      var forwardVector = new BABYLON.Vector3(0, 0, -1);

      // Apply the rotation to the forward vector
      var rotatedVector = forwardVector.rotateByQuaternionToRef(quaternion, new BABYLON.Vector3());
      return {
        x: rotatedVector.x,
        y: rotatedVector.y,
        z: rotatedVector.z
      };
    }
  }, {
    key: "rotate",
    value: function rotate(entityId, pitchDelta, yawDelta, rollDelta) {
      var body = this.game.bodyMap[entityId];
      if (!body) return;

      // console.log('pitchDelta', pitchDelta, 'yawDelta', yawDelta, 'rollDelta', rollDelta);
      // console.log('performing rotation', pitchDelta, yawDelta, rollDelta)

      // Rotate around the x-axis for pitch
      if (pitchDelta !== 0) {
        this.game.physics.rotateBody(body, pitchDelta, {
          x: 1,
          y: 0,
          z: 0
        });
      }
      // Rotate around the y-axis for yaw
      if (yawDelta !== 0) {
        this.game.physics.rotateBody(body, yawDelta, {
          x: 0,
          y: 1,
          z: 0
        });
      }
      // Rotate around the z-axis for roll
      if (rollDelta !== 0) {
        this.game.physics.rotateBody(body, rollDelta, {
          x: 0,
          y: 0,
          z: 1
        });
      }
    }
  }, {
    key: "update",
    value: function update(entityId, dx, dy, dz) {
      var body = this.game.bodyMap[entityId];
      if (!body) return;

      /* Remark: "forward direction" is used for forward/backward movement relative to the entity's 3d rotation
      // console.log('performing movement', entityId, dx, dy, dz)
      // console.log('forwardDirection', forwardDirection)
      let forwardDirection = this.getForwardDirection(body);
      const force = {
        x: forwardDirection.z * dy * this.thrust + dz * this.thrust, // Forward/backward thrust along PhysX's x-axis
        y: forwardDirection.y * dy * this.thrust,                    // Up/Down thrust along PhysX's y-axis
        z: forwardDirection.x * dy * this.thrust + dx * this.thrust  // Left/Right thrust along PhysX's z-axis
      };
      */

      // use absolute movements, forwardDirection not needed
      var force = {
        x: dx * this.thrust,
        // Forward/backward thrust along PhysX's x-axis
        y: dy * this.thrust,
        // Up/Down thrust along PhysX's y-axis
        z: dz * this.thrust // Left/Right thrust along PhysX's z-axis
      };

      // console.log('force', force)

      var bodyPosition = this.game.physics.getBodyPosition(body);
      this.game.physics.Body.applyForce(body, bodyPosition, force);
    }
  }]);
  return AsteroidsMovementStrategy;
}();
_defineProperty(AsteroidsMovementStrategy, "id", '3d-asteroids-movement');
var _default = exports["default"] = AsteroidsMovementStrategy;

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
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// DefaultMovementStrategy.js - Marak Squires 2023
var DefaultMovementStrategy = /*#__PURE__*/function () {
  function DefaultMovementStrategy() {
    _classCallCheck(this, DefaultMovementStrategy);
    this.id = DefaultMovementStrategy.id;
  }
  _createClass(DefaultMovementStrategy, [{
    key: "init",
    value: function init(game) {
      this.game = game;

      // check to see if entityMovement system exists, if not throw error
      if (!game.systems['entity-movement']) {
        throw new Error('DefaultMovementStrategy requires an entityMovement system to be registered! Please game.use(new EntityMovement())');
      }
      game.systems['entity-movement'].strategies.push(this);
    }
  }, {
    key: "update",
    value: function update(entityId, dx, dy, rotation) {
      if (!entityId) {
        return;
      }

      // TODO: this.game.applyForce()
      var position = this.game.getComponent(entityId, 'position');
      if (position) {
        var forceFactor = 0.05;
        var force = {
          x: dx * forceFactor,
          y: -dy * forceFactor
        };
        var body = this.game.bodyMap[entityId];
        this.game.physics.applyForce(body, body.position, force);
        this.game.components.velocity[entityId] = {
          x: body.velocity.x,
          y: body.velocity.y
        };
      }

      // TODO: this.game.rotateBody()
      if (typeof rotation === 'number') {
        var rotationSpeed = 0.022;
        var rotationAmount = rotation * rotationSpeed;
        var _body = this.game.bodyMap[entityId];
        this.game.physics.rotateBody(_body, rotationAmount);
      }
    }
  }]);
  return DefaultMovementStrategy;
}();
_defineProperty(DefaultMovementStrategy, "id", 'default-movement-strategy');
var _default = exports["default"] = DefaultMovementStrategy;

},{}]},{},[2])(2)
});
