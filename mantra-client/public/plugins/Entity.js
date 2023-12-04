(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Entity = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// Component.js - Marak Squires 2023
var Component = /*#__PURE__*/function () {
  function Component(name, game) {
    _classCallCheck(this, Component);
    this.name = name;
    this.data = {};
    this.game = game;
  }
  _createClass(Component, [{
    key: "set",
    value: function set(key, value) {
      var entityId = Array.isArray(key) ? key[0] : key;

      // Check if the property is locked
      if (this.game) {
        var lockedProps = this.game.components['lockedProperties'].get(entityId);
        if (this.isLocked(lockedProps, this.name)) {
          // console.log(`Property ${key} is locked and cannot be updated.`);
          return; // Do not update if the property is locked
        }
      }

      if (Array.isArray(key)) {
        // Ensure nested structure exists
        var current = this.data;
        for (var i = 0; i < key.length - 1; i++) {
          if (!current[key[i]]) {
            current[key[i]] = {};
          }
          current = current[key[i]];
        }
        current[key[key.length - 1]] = value;
      } else {
        this.data[key] = value;
      }

      // After setting the value, update the corresponding entity in the game.entities
      if (this.game && this.game.entities && this.game.entities.has(entityId)) {
        var existing = this.game.entities.get(entityId);
        existing[this.name] = this.get(entityId);
      }
    }
  }, {
    key: "get",
    value: function get(key) {
      if (Array.isArray(key)) {
        var current = this.data;
        for (var i = 0; i < key.length; i++) {
          if (current[key[i]] === undefined) {
            return null;
          }
          current = current[key[i]];
        }
        return current;
      }
      return this.data[key] || null;
    }
  }, {
    key: "remove",
    value: function remove(key) {
      if (Array.isArray(key)) {
        var current = this.data;
        for (var i = 0; i < key.length - 1; i++) {
          if (current[key[i]] === undefined) {
            return;
          }
          current = current[key[i]];
        }
        delete current[key[key.length - 1]];
      } else {
        delete this.data[key];
      }
    }

    // Helper method to check if a property or sub-property is locked
  }, {
    key: "isLocked",
    value: function isLocked(lockedProps, key) {
      if (!lockedProps) return false;
      if (Array.isArray(key)) {
        var current = lockedProps;
        for (var i = 0; i < key.length; i++) {
          if (current[key[i]] === undefined) {
            return false; // Property not locked
          }

          current = current[key[i]];
        }
        return true; // Property is locked
      }

      return lockedProps[key] !== undefined;
    }
  }]);
  return Component;
}();
var _default = exports["default"] = Component;

},{}],2:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Component2 = _interopRequireDefault(require("./Component.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var TimersComponent = /*#__PURE__*/function (_Component) {
  _inherits(TimersComponent, _Component);
  var _super = _createSuper(TimersComponent);
  function TimersComponent(name, owner) {
    var _this;
    _classCallCheck(this, TimersComponent);
    _this = _super.call(this, name, owner);
    _this.timers = {}; // Object to hold named timers
    return _this;
  }

  // Set a timer with a specific duration, with optional interval flag
  _createClass(TimersComponent, [{
    key: "setTimer",
    value: function setTimer(name, duration) {
      var isInterval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      this.timers[name] = {
        startTime: Date.now(),
        duration: duration * 1000,
        // Convert to milliseconds
        isInterval: isInterval,
        completed: false
      };
    }
  }, {
    key: "getTimer",
    value: function getTimer(name) {
      return this.timers[name];
    }
  }, {
    key: "checkTimer",
    value: function checkTimer(name) {
      if (!this.timers[name]) return false;
      var timer = this.timers[name];
      var now = Date.now();
      if (!timer.completed && now >= timer.startTime + timer.duration) {
        if (timer.isInterval) {
          this.resetTimer(name); // Reset for intervals
          return 'intervalCompleted'; // Indicate interval completion
        } else {
          timer.completed = true;
          return true; // Indicate one-time timer completion
        }
      }

      return false; // Timer has not completed yet
    }

    // Reset a timer
  }, {
    key: "resetTimer",
    value: function resetTimer(name) {
      if (this.timers[name]) {
        this.timers[name].startTime = Date.now();
        this.timers[name].completed = false;
      }
    }

    // Remove a timer
  }, {
    key: "removeTimer",
    value: function removeTimer(name) {
      delete this.timers[name];
    }
  }]);
  return TimersComponent;
}(_Component2["default"]);
var _default = exports["default"] = TimersComponent;

},{"./Component.js":1}],3:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
// Entity.js
var Entity = /*#__PURE__*/_createClass(function Entity(id) {
  _classCallCheck(this, Entity);
  this.id = id;
  this.components = {};
});
var _default = exports["default"] = Entity;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Entity = _interopRequireDefault(require("../../Entity/Entity.js"));
var _TimersComponent = _interopRequireDefault(require("../../Component/TimersComponent.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // Entity.js - Marak Squires 2023
var Entity = /*#__PURE__*/function () {
  function Entity() {
    _classCallCheck(this, Entity);
    this.id = Entity.id;
    this.nextEntityId = 1; // 0 is reserved for server
  }
  _createClass(Entity, [{
    key: "init",
    value: function init(game) {
      // bind game scope to this.game
      this.game = game;

      // init a new Map to store entities
      game.entities = new Map();
      this.game.systemsManager.addSystem(this.id, this);

      // Bind some methods to parent Game scope for convenience
      // The most useful and common System methods are expected to be bound to Game
      // This allows developers to customcraft a clean Game API based on their needs
      this.game.createEntity = this.createEntity.bind(this);
      this.game.removeEntity = this.removeEntity.bind(this);
      this.game.getEntity = this.getEntity.bind(this);
      this.game.getEntities = this.allEntities.bind(this);
      this.game.updateEntity = this.updateEntity.bind(this);
      this.game.inflateEntity = this.inflateEntity.bind(this);
      this.game.hasEntity = this.hasEntity.bind(this);
      this.game.findEntity = this.findEntity.bind(this);
    }
  }, {
    key: "hasEntity",
    value: function hasEntity(entityId) {
      return this.game.entities.has(entityId);
    }
  }, {
    key: "findEntity",
    value: function findEntity(query) {
      if (typeof query === 'string') {
        query = {
          name: query
        };
      }
      // iterate over entities and return the first match
      var _iterator = _createForOfIteratorHelper(this.game.entities),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            entityId = _step$value[0],
            entity = _step$value[1];
          var match = true;
          for (var key in query) {
            if (entity[key] !== query[key]) {
              match = false;
              break;
            }
          }
          if (match) {
            return entity;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "getEntity",
    value: function getEntity(entityId) {
      if (typeof entityId === 'string') {
        entityId = parseInt(entityId); // for now, this can be removed when we switch Component.js to use Maps
      }

      if (!this.game.entities.has(entityId)) {
        return null;
      }
      var entity = {};

      // Iterate over all registered components and fetch their data if available
      for (var componentType in this.game.components) {
        var componentData = this.game.getComponent(entityId, componentType);
        if (componentData) {
          entity[componentType] = componentData;
        }
      }
      if (Object.keys(entity).length === 0) {
        return null;
      }
      entity.id = entityId;
      return entity;
    }
  }, {
    key: "removeEntity",
    value: function removeEntity(entityId) {
      var ent = this.game.entities.get(entityId);
      if (ent && this.game.systems.graphics && ent.graphics) {
        // Is this best done here? or in the graphics plugin?
        this.game.systems.graphics.removeGraphic(entityId);
      }
      if (ent) {
        this.game.components.destroyed.set(entityId, true);

        // check to see if any timers exist, if so clear them all
        if (this.game.components.timers.get(entityId)) {
          var timers = this.game.components.timers.get(entityId);
          for (var timerId in timers.timers) {
            timers.removeTimer(timerId);
          }
        }

        // update the entity with the destroyed state
        var updatedEntity = this.game.getEntity(entityId);
        this.game.entities.set(entityId, updatedEntity);
      }
    }
  }, {
    key: "cleanupDestroyedEntities",
    value: function cleanupDestroyedEntities() {
      var _this = this;
      var destroyedComponentData = this.game.components.destroyed.data;
      var _loop = function _loop(entityId) {
        var destroyedType = _this.game.components.type.get(entityId);
        if (destroyedComponentData[entityId]) {
          // Removes the body from the physics engine
          if (typeof _this.game.physics.removeBody === 'function') {
            // TODO: fix this
            if (_this.game.bodyMap[entityId]) {
              _this.game.physics.removeBody(_this.game.bodyMap[entityId]);
            } else {
              console.log('No body found for entityId', entityId);
            }
          }
          // Delete associated components for the entity using Component's remove method
          for (var componentType in _this.game.components) {
            _this.game.components[componentType].remove(entityId);
          }
          _this.game.entities["delete"](entityId);

          // remove the reference in this.game.data.ents
          delete _this.game.data.ents._[entityId];
          // find entity by id and filter it out
          if (_this.game.data.ents[destroyedType]) {
            // TODO: missing test ^^^
            _this.game.data.ents[destroyedType] = _this.game.data.ents[destroyedType].filter(function (entity) {
              return Number(entity.id) !== Number(entityId);
            });
          }
        }
      };
      for (var entityId in destroyedComponentData) {
        _loop(entityId);
      }
    }

    // Update the getEntities method to return the game.entities
  }, {
    key: "allEntities",
    value: function allEntities() {
      return this.game.entities;
    }
  }, {
    key: "updateEntity",
    value: function updateEntity(entityData) {
      var entityId = entityData.id;
      var fullState = this.game.getEntity(entityId);

      // if the state doesn't exist, return error
      if (!fullState) {
        console.log('This should not happen, if a new state came in it should be created');
        return;
      }

      // Remove destroyed entities
      if (entityData.destroyed) {
        this.removeEntity(entityId);
        return;
      }
      var ent = this.game.entities.get(entityId);

      // not a component property yet, just ad-hoc on client
      ent.pendingRender = {};
      this.game.graphics.forEach(function (graphicsInterface) {
        ent.pendingRender[graphicsInterface.id] = true;
      });

      // TODO: add additional component types that can be updated ( should be most of them )
      if (entityData.color) {
        this.game.components.color.set(entityId, entityData.color);
      }
      if (entityData.height) {
        this.game.components.height.set(entityId, entityData.height);
      }
      if (entityData.width) {
        this.game.components.width.set(entityId, entityData.width);
      }
      if (entityData.position) {
        this.game.components.position.set(entityId, {
          x: entityData.position.x,
          y: entityData.position.y,
          z: entityData.position.z
        });
      }
      if (typeof entityData.rotation !== 'undefined') {
        this.game.components.rotation.set(entityId, entityData.rotation);
      }
    }
  }, {
    key: "createEntity",
    value: function createEntity(config) {
      // console.log('createEntity', config)

      var entityId = this._generateId();
      var defaultConfig = {
        id: entityId,
        name: null,
        body: true,
        shape: 'triangle',
        color: null,
        position: {
          x: 0,
          y: 0,
          z: 0
        },
        velocity: {
          x: 0,
          y: 0,
          z: 0
        },
        rotation: 0,
        mass: 100,
        density: 100,
        health: 100,
        height: 100,
        width: 100,
        depth: 10,
        lifetime: Infinity,
        maxSpeed: 9999,
        isStatic: false,
        isSensor: false,
        restitution: 0,
        owner: 0,
        // 0 = server
        destroyed: false,
        type: 'PLAYER',
        friction: 0.1,
        // Default friction
        frictionAir: 0.01,
        // Default air friction
        frictionStatic: 0.5,
        // Default static friction
        lockedProperties: null,
        // object hash of properties that should never be updated
        actionRateLimiter: null,
        // object hash of state history
        timers: null // object hash timers for TimersComponent.js
      };

      // merge config with defaultConfig
      config = _objectSpread(_objectSpread({}, defaultConfig), config);
      entityId = config.id;
      var entity = new _Entity["default"](entityId);
      var _config = config,
        name = _config.name,
        type = _config.type,
        position = _config.position,
        mass = _config.mass,
        density = _config.density,
        velocity = _config.velocity,
        isSensor = _config.isSensor,
        isStatic = _config.isStatic,
        lockedProperties = _config.lockedProperties,
        width = _config.width,
        height = _config.height,
        depth = _config.depth,
        radius = _config.radius,
        shape = _config.shape,
        color = _config.color,
        maxSpeed = _config.maxSpeed,
        health = _config.health,
        owner = _config.owner,
        lifetime = _config.lifetime;
      var x = position.x,
        y = position.y;

      /*
      if (typeof config.position !== 'undefined') {
        position.x = config.position.x;
        position.y = config.position.y;
      }
      */

      // console.log('position', position, 'width', width, 'height', height)
      // Using game's API to add components
      // alert(type)
      this.game.addComponent(entityId, 'type', type || 'PLAYER');
      this.game.addComponent(entityId, 'name', name || null);
      this.game.addComponent(entityId, 'position', position);
      this.game.addComponent(entityId, 'velocity', velocity);
      this.game.addComponent(entityId, 'rotation', config.rotation);
      this.game.addComponent(entityId, 'mass', mass);
      this.game.addComponent(entityId, 'density', density);
      this.game.addComponent(entityId, 'health', health);
      this.game.addComponent(entityId, 'width', width);
      this.game.addComponent(entityId, 'height', height);
      this.game.addComponent(entityId, 'depth', depth);
      this.game.addComponent(entityId, 'radius', radius);
      this.game.addComponent(entityId, 'shape', shape);
      this.game.addComponent(entityId, 'color', color);
      this.game.addComponent(entityId, 'maxSpeed', maxSpeed);
      this.game.addComponent(entityId, 'owner', owner);
      this.game.addComponent(entityId, 'lifetime', lifetime);
      this.game.addComponent(entityId, 'destroyed', false);
      this.game.addComponent(entityId, 'creationTime', Date.now()); // Current time in milliseconds
      this.game.addComponent(entityId, 'isSensor', isSensor);
      this.game.addComponent(entityId, 'isStatic', isStatic);
      this.game.addComponent(entityId, 'lockedProperties', lockedProperties);
      this.game.addComponent(entityId, 'actionRateLimiter', {});
      // TODO: clean up API contract with Component
      this.game.addComponent(entityId, 'timers', new _TimersComponent["default"]('timers', entityId, this.game));
      if (config.body) {
        var body = this.createBody(config);
        body.myEntityId = entityId;
        this.game.physics.addToWorld(this.game.engine, body);
        this.game.bodyMap[entityId] = body;
        if (velocity && (velocity.x !== 0 || velocity.y !== 0)) {
          this.game.physics.setVelocity(body, velocity);
        }
        if (position) {
          this.game.physics.setPosition(body, position);
        }
      }

      // Add the entity to the game entities scope
      // TODO: new Entity() should do this
      // console.log('setting id', entityId, 'to entity')
      this.game.entities.set(entityId, {
        id: entityId
      });

      // get updated entity with components
      var updatedEntity = this.game.getEntity(entityId);
      if (typeof updatedEntity.pendingRender === 'undefined') {
        updatedEntity.pendingRender = {};
      }
      this.game.graphics.forEach(function (graphicsInterface) {
        updatedEntity.pendingRender[graphicsInterface.id] = true;
      });

      // updates entity in the ECS entity Map scope
      this.game.entities.set(entityId, updatedEntity);

      // updates entity in the flat game.data scope
      this.game.data.ents = this.game.data.ents || {};
      this.game.data.ents._ = this.game.data.ents._ || {};
      this.game.data.ents._[entityId] = updatedEntity;
      this.game.data.ents[updatedEntity.type] = this.game.data.ents[updatedEntity.type] || [];
      this.game.data.ents[updatedEntity.type].push(updatedEntity);
      return updatedEntity;
    }
  }, {
    key: "applyLockedProperties",
    value: function applyLockedProperties(entityId, lockedProperties) {
      // Check and apply locked properties
      if (lockedProperties) {
        console.log("Processing lockedProperties properties");
        for (var key in lockedProperties) {
          var currentVal = this.game.components[key].get(entityId);
          console.log('currentVal', currentVal, 'key', key, lockedProperties);
          if (currentVal !== undefined && currentVal !== null) {
            if (_typeof(lockedProperties[key]) === 'object' && !Array.isArray(lockedProperties[key])) {
              // If lockedProperties[key] is an object, iterate through its keys
              console.log('lockedProperties[key]', lockedProperties[key]);
              for (var subKey in lockedProperties[key]) {
                console.log('subKey', subKey, lockedProperties[key][subKey]);
                if (lockedProperties[key][subKey] === true) {
                  // only process if the value is true
                  var nestedVal = currentVal[subKey];
                  if (nestedVal !== undefined && nestedVal !== null) {
                    console.log('Setting lockedProperties property', "".concat(key, ".").concat(subKey), 'to', nestedVal);
                    this.game.components['lockedProperties'].set(entityId, _defineProperty({}, key, _defineProperty({}, subKey, nestedVal)));
                  } else {
                    console.log('Error: No such component or invalid value for', "".concat(key, ".").concat(subKey));
                  }
                }
              }
            } else if (lockedProperties[key] === true) {
              // if lockedProperties[key] is not an object and the value is true
              console.log('Setting lockedProperties property', key, 'to', currentVal);
              this.game.components['lockedProperties'].set(entityId, _defineProperty({}, key, currentVal));
            }
          } else {
            console.log('Error: No such component or invalid value for', key);
          }
        }
      }
    }
  }, {
    key: "inflateEntity",
    value: function inflateEntity(entityData) {
      // TODO: ensure creator_json API can inflate without graphics / client deps
      var game = this.game;
      // console.log('inflateEntity', entityData)
      // takes outside state and performs update/destroy/create depending
      // on the current local state of the entity and incoming state
      // if the incoming state is pending destroy, just remove it immediately and return
      if (entityData.destroyed === true) {
        game.removeGraphic(entityData.id);
        game.removeEntity(entityData.id);
        return;
      }

      // Check if the entity is marked for local removal
      // This could happen if client-side prediction has removed an entity,
      // and the server still has an update for it in the queue
      if (this.game.removedEntities.has(entityData.id)) {
        console.log('Skipping update for locally removed entity:', entityData.id);
        return;
      }

      // this isn't a destroyed state, attempt to get a copy of the local state by id
      var localEntity = game.entities.get(entityData.id);
      if (!localEntity) {
        // no local copy of the state exists, create a new entity
        if (typeof entityData.height === 'undefined' || typeof entityData.width === 'undefined') {
          // Remark: This shouldn't happen, there is an issue where local destroyed entities are still being considered updated
          // and the local system thinks we should create a new entity on the state update; however the state is stale and
          // the entity is already destroyed, so we do not wish to update the state, skip for now
          // TODO: we should resolve this with unit tests and ensure syncronization between server and client
          return;
        }
        game.createEntity(entityData);
      } else {
        // a local copy of the state exists, update it
        game.updateEntity(entityData);
      }
    }

    // TODO: move this to PhysicsPlugin
  }, {
    key: "createBody",
    value: function createBody(config) {
      var commonBodyConfig = {
        mass: config.mass,
        isSensor: config.isSensor,
        isStatic: config.isStatic,
        inertia: Infinity,
        density: config.density,
        restitution: config.restitution,
        friction: config.friction,
        frictionAir: config.frictionAir,
        frictionStatic: config.frictionStatic
      };
      if (config.type === "BULLET") {
        config.shape = 'circle';
      }
      var body;
      switch (config.shape) {
        case 'rectangle':
          body = this.game.physics.Bodies.rectangle(config.position.x, config.position.y, config.width, config.height, commonBodyConfig);
          break;
        case 'circle':
          body = this.game.physics.Bodies.circle(config.position.x, config.position.y, config.radius, commonBodyConfig);
          break;
        case 'triangle':
        default:
          var triangleVertices = [{
            x: config.position.x,
            y: config.position.y - 32
          }, {
            x: config.position.x - 32,
            y: config.position.y + 32
          }, {
            x: config.position.x + 32,
            y: config.position.y + 32
          }];
          // TODO: add this support to PhysxPlugin
          //body = this.game.physics.Bodies.fromVertices(config.position.x, config.position.y, triangleVertices, commonBodyConfig);
          body = this.game.physics.Bodies.rectangle(config.position.x, config.position.y, config.width, config.height, commonBodyConfig);
          break;
      }

      // TODO: move to BulletPlugin ?
      if (config.type === 'BULLET') {
        // set friction to 0 for bullets
        // this.game.physics.setFriction(body, 0);
        // TODO: make this config with defaults
        body.friction = 0;
        body.frictionAir = 0;
        body.frictionStatic = 0;
      }
      return body;
    }
  }, {
    key: "_generateId",
    value: function _generateId() {
      return this.nextEntityId++;
    }
  }]);
  return Entity;
}();
_defineProperty(Entity, "id", 'entity');
_defineProperty(Entity, "removable", false);
var _default = exports["default"] = Entity;
/* refactor to use this pattern */
/*
import Entity from './Entity.js';
const entity = new Entity(entityId);

*/

},{"../../Component/TimersComponent.js":2,"../../Entity/Entity.js":3}]},{},[4])(4)
});
