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
      if (typeof this.data[key] === 'undefined' || this.data[key] === null) {
        return null;
      }
      return this.data[key];
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
// Entity.js
var Entity = /*#__PURE__*/function () {
  function Entity(id) {
    _classCallCheck(this, Entity);
    this.id = id;
    this.components = {};
  }
  _createClass(Entity, [{
    key: "getTimer",
    value: function getTimer(name) {
      return this.timers[name];
    }
  }]);
  return Entity;
}();
var _default = exports["default"] = Entity;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createEntity = _interopRequireDefault(require("./lib/createEntity.js"));
var _getEntity = _interopRequireDefault(require("./lib/getEntity.js"));
var _inflateEntity = _interopRequireDefault(require("./lib/inflateEntity.js"));
var _removeEntity = _interopRequireDefault(require("./lib/removeEntity.js"));
var _updateEntity = _interopRequireDefault(require("./lib/updateEntity.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
      this.game.createEntity = _createEntity["default"].bind(this);
      this.game.getEntity = _getEntity["default"].bind(this);
      this.game.removeEntity = _removeEntity["default"].bind(this);
      this.game.getEntityByName = this.getEntityByName.bind(this);
      this.game.getEntities = this.allEntities.bind(this);
      this.game.updateEntity = _updateEntity["default"].bind(this);
      this.game.inflateEntity = _inflateEntity["default"].bind(this);
      this.game.hasEntity = this.hasEntity.bind(this);
      this.game.findEntity = this.findEntity.bind(this);
      this.game.removeAllEntities = this.removeAllEntities.bind(this);
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
    key: "getEntityByName",
    value: function getEntityByName(name) {
      var _iterator2 = _createForOfIteratorHelper(this.game.entities),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = _slicedToArray(_step2.value, 2),
            entityId = _step2$value[0],
            entity = _step2$value[1];
          if (entity.name === name) {
            return entity;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "cleanupDestroyedEntities",
    value: function cleanupDestroyedEntities() {
      var _this = this;
      var destroyedComponentData = this.game.components.destroyed.data;
      var _loop = function _loop(entityId) {
        if (typeof entityId === 'string') {
          entityId = parseInt(entityId); // for now, this can be removed when we switch Component.js to use Maps
        }

        var destroyedType = _this.game.components.type.get(entityId);
        if (destroyedComponentData[entityId]) {
          // Removes the body from the physics engine
          if (typeof _this.game.physics.removeBody === 'function') {
            if (_this.game.bodyMap[entityId]) {
              // removes body from physics engine
              _this.game.physics.removeBody(_this.game.bodyMap[entityId]);
              // deletes reference to body
              delete _this.game.bodyMap[entityId];
            } else {
              // console.log('No body found for entityId', entityId);
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
    key: "removeAllEntities",
    value: function removeAllEntities(options) {
      var _this2 = this;
      // curry arguments, legacy API
      var clearCurrentPlayer = false;
      var excludeByName = [];
      if (typeof options === 'boolean') {
        clearCurrentPlayer = options;
      }
      if (_typeof(options) === 'object' && Array.isArray(options.excludeByName)) {
        excludeByName = options.excludeByName;
      }
      this.game.entities.forEach(function (ent) {
        // Do not remove the current player if clearCurrentPlayer is false
        if (ent.id === _this2.game.currentPlayerId && !clearCurrentPlayer) {
          return;
        }
        // Do not remove entities that are excluded by name
        if (excludeByName.includes(ent.name)) {
          return;
        }
        if (ent && ent.yCraft && ent.yCraft.part && ent.yCraft.part.unload) {
          ent.yCraft.part.unload();
        }
        _this2.game.removeEntity(ent.id);
      });
      if (clearCurrentPlayer) {
        this.game.currentPlayerId = null;
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
      if (typeof config.mass !== 'undefined') {
        if (this.game.physics && this.game.physics.setMass) {
          this.game.physics.setMass(body, config.mass);
        }
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

},{"./lib/createEntity.js":5,"./lib/getEntity.js":6,"./lib/inflateEntity.js":7,"./lib/removeEntity.js":8,"./lib/updateEntity.js":9}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createEntity;
var _Entity = _interopRequireDefault(require("../../../Entity/Entity.js"));
var _TimersComponent = _interopRequireDefault(require("../../../Component/TimersComponent.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // TODO: remove TimersComponent import, use game reference instead ( reduce imported code )
function distanceSquared(x1, y1, x2, y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  return dx * dx + dy * dy;
}
function deferEntityCreation(entityData) {
  // Add entity data to a spatial data structure
  spatialStructure.add(entityData);
}

// ignoreSetup set to true will ignore the setup phase of createEntity
// the setup phase assigns default values to the entity and auto-id
// this is currently being used from `rbush` plugin when creating deferred entities
function createEntity(config) {
  var ignoreSetup = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // console.log('createEntity', config)

  var entityId;
  if (!ignoreSetup) {
    entityId = this._generateId();
    var defaultConfig = {
      id: entityId,
      name: null,
      kind: null,
      body: true,
      shape: 'triangle',
      color: null,
      position: {
        x: 0,
        y: 0,
        z: 0
      },
      startingPosition: null,
      velocity: {
        x: 0,
        y: 0,
        z: 0
      },
      rotation: 0,
      mass: 100,
      density: 100,
      health: Infinity,
      score: 0,
      // radius: null,
      height: 100,
      width: 100,
      depth: 16,
      lifetime: -1,
      maxSpeed: 9999,
      isStatic: false,
      isSensor: false,
      restitution: 0,
      items: null,
      sutra: null,
      owner: 0,
      // 0 = server
      inputs: null,
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
      timers: null,
      // object hash timers for TimersComponent.js
      yCraft: null,
      // object hash of properties for YCraft.js
      text: null,
      style: null,
      texture: null,
      collisionActive: false,
      collisionStart: true,
      collisionEnd: false
    };

    // merge config with defaultConfig
    config = _objectSpread(_objectSpread({}, defaultConfig), config);
    if (this.game.systems.rbush) {
      this.game.systems.rbush.addEntity(config);
    }

    // Remark: Always add to deferredEntities, this is now being used to store all local
    //         game data that may not yet be in the game.data scope ( off screen / not loaded )
    game.deferredEntities[config.id.toString()] = config;
    if (this.game.useFoV) {
      // check to see if entity is within game.data.fieldOfView,
      // if not, we will defer creation until it is
      var currentPlayer = this.game.getCurrentPlayer();
      if (currentPlayer) {
        var incomingPosition = config.position || {
          x: 0,
          y: 0,
          z: 0
        };
        var distance = distanceSquared(currentPlayer.position.x, currentPlayer.position.y, incomingPosition.x, incomingPosition.y);
        var fieldOfViewSquared = this.game.data.fieldOfView * this.game.data.fieldOfView;
        if (distance > fieldOfViewSquared) {
          return;
        }
      }
    }
  }
  entityId = config.id;
  var entity = new _Entity["default"](entityId);

  /*
  entity.getTimer = (timerId) => {
    return this.game.components.timers.get(entityId, timerId);
  };
  */

  if (!config.startingPosition) {
    config.startingPosition = config.position;
  }
  var _config = config,
    name = _config.name,
    type = _config.type,
    kind = _config.kind,
    position = _config.position,
    rotation = _config.rotation,
    startingPosition = _config.startingPosition,
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
    score = _config.score,
    items = _config.items,
    sutra = _config.sutra,
    owner = _config.owner,
    inputs = _config.inputs,
    lifetime = _config.lifetime,
    yCraft = _config.yCraft,
    text = _config.text,
    style = _config.style,
    texture = _config.texture,
    collisionActive = _config.collisionActive,
    collisionStart = _config.collisionStart,
    collisionEnd = _config.collisionEnd;
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
  this.game.addComponent(entityId, 'kind', kind);
  this.game.addComponent(entityId, 'position', position);
  this.game.addComponent(entityId, 'startingPosition', startingPosition);
  this.game.addComponent(entityId, 'velocity', velocity);
  this.game.addComponent(entityId, 'rotation', rotation);
  this.game.addComponent(entityId, 'mass', mass);
  this.game.addComponent(entityId, 'density', density);
  this.game.addComponent(entityId, 'health', health);
  this.game.addComponent(entityId, 'score', score);
  this.game.addComponent(entityId, 'width', width);
  this.game.addComponent(entityId, 'height', height);
  this.game.addComponent(entityId, 'depth', depth);
  this.game.addComponent(entityId, 'radius', radius);
  this.game.addComponent(entityId, 'shape', shape);
  this.game.addComponent(entityId, 'color', color);
  this.game.addComponent(entityId, 'maxSpeed', maxSpeed);
  this.game.addComponent(entityId, 'owner', owner);
  this.game.addComponent(entityId, 'items', items);
  this.game.addComponent(entityId, 'sutra', sutra);
  this.game.addComponent(entityId, 'inputs', inputs);
  this.game.addComponent(entityId, 'lifetime', lifetime);
  this.game.addComponent(entityId, 'destroyed', false);
  this.game.addComponent(entityId, 'creationTime', Date.now()); // Current time in milliseconds
  this.game.addComponent(entityId, 'isSensor', isSensor);
  this.game.addComponent(entityId, 'isStatic', isStatic);
  this.game.addComponent(entityId, 'lockedProperties', lockedProperties);
  this.game.addComponent(entityId, 'actionRateLimiter', {});
  // TODO: clean up API contract with Component
  this.game.addComponent(entityId, 'timers', new _TimersComponent["default"]('timers', entityId, this.game));
  this.game.addComponent(entityId, 'yCraft', yCraft);
  this.game.addComponent(entityId, 'text', text);
  this.game.addComponent(entityId, 'style', style);
  this.game.addComponent(entityId, 'texture', texture);
  this.game.addComponent(entityId, 'collisionActive', collisionActive);
  this.game.addComponent(entityId, 'collisionStart', collisionStart);
  this.game.addComponent(entityId, 'collisionEnd', collisionEnd);
  if (config.body) {
    var body = this.createBody({
      width: width,
      height: height,
      radius: radius,
      type: type,
      shape: shape,
      position: position,
      velocity: velocity,
      rotation: rotation,
      mass: mass,
      density: density,
      isStatic: isStatic,
      isSensor: isSensor,
      restitution: config.restitution,
      friction: config.friction,
      frictionAir: config.frictionAir,
      frictionStatic: config.frictionStatic
    });
    body.myEntityId = entityId;
    this.game.physics.addToWorld(this.game.engine, body);
    this.game.bodyMap[entityId] = body;
    if (velocity && (velocity.x !== 0 || velocity.y !== 0)) {
      this.game.physics.setVelocity(body, velocity);
    }
    if (position) {
      this.game.physics.setPosition(body, position);
    }
    if (typeof rotation !== 'undefined') {
      if (this.game.physics && this.game.physics.setRotation) {
        this.game.physics.setRotation(body, rotation);
      }
    }
  } else {
    // immediately add to changedEntities
    // this.game.changedEntities.add(entityId);
  }

  // Add the entity to the game entities scope
  // TODO: new Entity() should do this
  // console.log('setting id', entityId, 'to entity')
  this.game.entities.set(entityId, {
    id: entityId
  });
  // console.log("SETTING CHANGED", entityId)
  this.game.changedEntities.add(entityId);

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

},{"../../../Component/TimersComponent.js":2,"../../../Entity/Entity.js":3}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getEntity;
function getEntity(entityId) {
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
    if (typeof componentData !== 'undefined' && componentData !== null) {
      entity[componentType] = componentData;
    }
  }
  if (Object.keys(entity).length === 0) {
    return null;
  }
  entity.id = entityId;
  return entity;
}

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateEntity;
function inflateEntity(entityData) {
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

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = removeEntity;
function removeEntity(entityId) {
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
    if (updatedEntity && this.game.systems.rbush) {
      // TODO: don't remove entity if field of view is active
      // this way it will reinflate when it comes back into view
      // this.game.systems.rbush.removeEntity(updatedEntity);
    }
  }
}

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateEntity;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function updateEntity(entityData) {
  var entityId = entityData.id;
  if (typeof entityId === 'undefined') {
    // check to see if we have a name, if so, find the entity by name
    if (entityData.name) {
      var _ent = this.game.getEntityByName(entityData.name);
      if (_ent) {
        entityId = _ent.id;
      }
    }
  }
  if (typeof entityId === 'undefined') {
    console.log('Error: updateEntity was not provided a valid entity.id or entity.name', entityData);
    console.log('This is most likely the result of passing invalid data to updateEntity()');
    return;
  }
  var ent = this.game.getEntity(entityId);

  // if the state doesn't exist, return error
  if (!ent) {
    console.log('Error: updateEntity called for non-existent entity', entityId, entityData);
    console.log('This should not happen, if a new state came in it should be created');
    return;
  }

  // Remove destroyed entities
  if (entityData.destroyed) {
    this.removeEntity(entityId);
    return;
  }

  // not a component property yet, just ad-hoc on client
  ent.pendingRender = {};
  this.game.graphics.forEach(function (graphicsInterface) {
    ent.pendingRender[graphicsInterface.id] = true;
  });

  // TODO: add additional component types that can be updated ( should be most of them )
  if (entityData.color) {
    this.game.components.color.set(entityId, entityData.color);
    //if (!this.game.changedEntities.has(entityId)) {}
    this.game.changedEntities.add(entityId);
    // console.log("SETTING COLOR", entityData.color)
  }

  var updateSize = false;
  if (entityData.height) {
    updateSize = true;
    this.game.components.height.set(entityId, entityData.height);
  }
  if (entityData.width) {
    updateSize = true;
    this.game.components.width.set(entityId, entityData.width);
  }
  if (entityData.radius) {
    updateSize = true;
    // this.game.components.radius.set(entityId, entityData.radius);
  }

  if (updateSize) {
    var body = this.game.bodyMap[entityId];
    if (body) {
      // console.log('eeee', entityData.radius)
      this.game.physics.setBodySize(body, entityData);
    }
  }
  if (entityData.position) {
    // Remark: Tests require we update component, perhaps changed test?
    this.game.components.position.set(entityId, entityData.position);
    var _body = this.game.bodyMap[entityId];
    if (_body) {
      this.game.physics.setPosition(_body, entityData.position);
    }
  }
  if (entityData.velocity) {
    this.game.physics.setVelocity(this.game.bodyMap[entityId], entityData.velocity);
  }
  if (entityData.health) {
    this.game.components.health.set(entityId, entityData.health);
  }
  if (typeof entityData.thickness !== 'undefined' && entityData.thickness !== null) {
    this.game.components.width.set(entityId, entityData.thickness);
  }
  if (typeof entityData.score !== 'undefined' && entityData.score !== null) {
    this.game.components.score.set(entityId, entityData.score);
  }
  if (typeof entityData.rotation !== 'undefined') {
    if (this.game.physics && this.game.physics.setRotation) {
      var _body2 = this.game.bodyMap[entityId];
      if (_body2) {
        this.game.physics.setRotation(_body2, entityData.rotation);
      }
    } else {
      console.log('WARNING: physics.setRotation is not defined');
      // Remark: we could support direct rotation updates here if mantra was being run without physics engine
      // this.game.components.rotation.set(entityId, entityData.rotation);
    }
  }

  if (typeof entityData.text !== 'undefined') {
    this.game.components.text.set(entityId, entityData.text);
  }

  // Items
  if (typeof entityData.items !== 'undefined') {
    // overwrite all items ( for now )
    // Remark: in the future we could merge instead of overwrite
    this.game.components.items.set(entityId, entityData.items);
  }

  // Sutra rules
  if (typeof entityData.sutra !== 'undefined') {
    // overwrite sutra ( for now )
    this.game.components.sutra.set(entityId, entityData.sutra);
  }
  if (typeof entityData.style !== 'undefined') {
    // overwrite all items ( for now )
    // Remark: in the future we could merge instead of overwrite
    this.game.components.style.set(entityId, entityData.style);
  }
  if (typeof entityData.texture !== 'undefined') {
    // overwrite all items ( for now )
    // Remark: in the future we could merge instead of overwrite
    // create new textures object by merging in the new texture
    var prev = this.game.components.texture.get(entityId);
    var newTexture = _objectSpread(_objectSpread({}, prev), entityData.texture);
    this.game.components.texture.set(entityId, newTexture);
  }

  // Remark: The physics engine update will update the position
  //         If we update the position here, it's most likely going to be overwritten by the physics engine
  if (this.game.systems.rbush) {
    // this.game.systems.rbush.updateEntity(ent);
  }
  return ent;
}

},{}]},{},[4])(4)
});
