(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).PhysXPhysics = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// Remark: This PhysicsInterface file should should be in the mantra-game package and referenced as a dependency
var PhysicsInterface = /*#__PURE__*/function () {
  function PhysicsInterface() {
    _classCallCheck(this, PhysicsInterface);
    if (this.constructor === PhysicsInterface) {
      throw new Error('Abstract class cannot be instantiated');
    }
  }

  // Equivalent to Engine.create()
  _createClass(PhysicsInterface, [{
    key: "createEngine",
    value: function createEngine(options) {
      throw new Error('Method "createEngine" must be implemented');
    }

    // Equivalent to World.add()
  }, {
    key: "addToWorld",
    value: function addToWorld(engine, body) {
      throw new Error('Method "addToWorld" must be implemented');
    }

    // Equivalent to World.remove()
  }, {
    key: "removeFromWorld",
    value: function removeFromWorld(engine, body) {
      throw new Error('Method "removeFromWorld" must be implemented');
    }

    // Equivalent to Engine.update()
  }, {
    key: "updateEngine",
    value: function updateEngine(engine, delta) {
      throw new Error('Method "updateEngine" must be implemented');
    }

    // Equivalent to Bodies.rectangle()
  }, {
    key: "createRectangle",
    value: function createRectangle(x, y, width, height, options) {
      throw new Error('Method "createRectangle" must be implemented');
    }

    // Equivalent to Body.applyForce()
  }, {
    key: "applyForce",
    value: function applyForce(body, position, force) {
      throw new Error('Method "applyForce" must be implemented');
    }

    // Custom method to get a body's position
  }, {
    key: "getBodyPosition",
    value: function getBodyPosition(body) {
      throw new Error('Method "getBodyPosition" must be implemented');
    }

    // Custom method to get a body's velocity
  }, {
    key: "getBodyVelocity",
    value: function getBodyVelocity(body) {
      throw new Error('Method "getBodyVelocity" must be implemented');
    }
  }, {
    key: "onBeforeUpdate",
    value: function onBeforeUpdate(engine, callback) {
      throw new Error('Method "onBeforeUpdate" must be implemented');
    }
  }, {
    key: "setPosition",
    value: function setPosition(body, position) {
      throw new Error('Method "setPosition" must be implemented');
    }
  }, {
    key: "setVelocity",
    value: function setVelocity(body, velocity) {
      throw new Error('Method "setVelocity" must be implemented');
    }
  }, {
    key: "collisionStart",
    value: function collisionStart(engine, callback) {
      throw new Error('Method "collisionStart" must be implemented');
    }
  }, {
    key: "collisionActive",
    value: function collisionActive(engine, callback) {
      throw new Error('Method "collisionActive" must be implemented');
    }
  }, {
    key: "collisionEnd",
    value: function collisionEnd(engine, callback) {
      throw new Error('Method "collisionEnd" must be implemented');
    }
  }]);
  return PhysicsInterface;
}();
var _default = exports["default"] = PhysicsInterface;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _PhysicsInterface2 = _interopRequireDefault(require("../physics-matter/PhysicsInterface.js"));
var _updateEngine = _interopRequireDefault(require("./lib/updateEngine.js"));
var _checkForMovedBodies = _interopRequireDefault(require("./lib/checkForMovedBodies.js"));
var _applyForce = _interopRequireDefault(require("./lib/body/applyForce.js"));
var _applyAngularForce = _interopRequireDefault(require("./lib/body/applyAngularForce.js"));
var _applyTorque = _interopRequireDefault(require("./lib/body/applyTorque.js"));
var _rotateBody = _interopRequireDefault(require("./lib/body/rotateBody.js"));
var _getBodyPosition = _interopRequireDefault(require("./lib/body/getBodyPosition.js"));
var _getBodyRotation = _interopRequireDefault(require("./lib/body/getBodyRotation.js"));
var _getLinearVelocity = _interopRequireDefault(require("./lib/body/getLinearVelocity.js"));
var _createRectangle = _interopRequireDefault(require("./lib/shapes/createRectangle.js"));
var _createCircle = _interopRequireDefault(require("./lib/shapes/createCircle.js"));
var _quaternionToEuler = _interopRequireDefault(require("./lib/math/quaternionToEuler.js"));
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
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // PhysXPhysics.js - Marak Squires 2023
// THIS FILE IS WIP - NOT COMPLETE
// Body methods
// Helpers for creating shapes
var scene;
var lastBox = null;

// TODO: move collisions into seperate file / plugin
// Constants for collision layers
var COLLISION_LAYER_1 = 1;
var COLLISION_LAYER_2 = 2;
var PhysXPhysics = /*#__PURE__*/function (_PhysicsInterface) {
  _inherits(PhysXPhysics, _PhysicsInterface);
  var _super = _createSuper(PhysXPhysics);
  // indicates that this plugin has async initialization and should not auto-emit a ready event on return
  function PhysXPhysics(config) {
    var _this;
    _classCallCheck(this, PhysXPhysics);
    _this = _super.call(this);
    _this.id = PhysXPhysics.id;
    _this.async = PhysXPhysics.async;
    _this.updateEngine = _updateEngine["default"];
    _this.applyForce = _applyForce["default"];
    _this.rotateBody = _rotateBody["default"];
    _this.getBodyPosition = _getBodyPosition["default"];
    _this.getBodyRotation = _getBodyRotation["default"];
    _this.checkForMovedBodies = _checkForMovedBodies["default"];
    _this.getLinearVelocity = _getLinearVelocity["default"];
    _this.scene = null;
    _this.lastFrame = 0;
    _this.dimension = 3;
    _this.physics = null;
    _this.namespace = 'physics';
    //this.Vector = Matter.Vector;
    //this.Body = Matter.Body;
    _this.Body = {
      applyForce: _this.applyForce.bind(_assertThisInitialized(_this)),
      applyAngularForce: _applyAngularForce["default"].bind(_assertThisInitialized(_this)),
      applyTorque: _applyTorque["default"].bind(_assertThisInitialized(_this)),
      rotate: _this.rotateBody.bind(_assertThisInitialized(_this))
    };
    _this.Bodies = {
      rectangle: _createRectangle["default"].bind(_assertThisInitialized(_this)),
      circle: _createCircle["default"].bind(_assertThisInitialized(_this))
    };
    //this.Composite = Matter.Composite;
    //this.Events = Matter.Events;

    _this.preUpdateListeners = [];
    _this.postUpdateListeners = [];
    _this.dynamicBodies = []; // This array will store your dynamic bodies
    return _this;
  }
  _createClass(PhysXPhysics, [{
    key: "init",
    value: function init(game) {
      game.physics = this;
      this.game = game;
      var self = this;
      game.loadScripts(['/physx-js-webidl.js'], function () {
        PhysXObjectAvailable(function () {
          self.physXReady();
        });
      });

      // PhysXObjectAvailable may not be necessary, the PhysX() should immediately be available
      function PhysXObjectAvailable(callback) {
        if (typeof PhysX !== 'undefined') {
          callback();
        }
        // try again in 10ms
        else {
          setTimeout(function () {
            PhysXObjectAvailable(callback);
          }, 10);
        }
      }
    }
  }, {
    key: "physXReady",
    value: function physXReady() {
      var game = this.game;
      var self = this;
      PhysX().then(function (PhysX) {
        self.PhysX = PhysX;
        game.PhysX = PhysX;
        var version = PhysX.PHYSICS_VERSION;
        console.log('PhysX loaded! Version: ' + (version >> 24 & 0xff) + '.' + (version >> 16 & 0xff) + '.' + (version >> 8 & 0xff));
        // game.physicsReady.push(self.name);

        //
        // Init scene, allocator, foundation
        //
        var allocator = new PhysX.PxDefaultAllocator();
        var errorCb = new PhysX.PxDefaultErrorCallback();
        var foundation = PhysX.CreateFoundation(version, allocator, errorCb);
        console.log('Created PxFoundation');
        var tolerances = new PhysX.PxTolerancesScale();
        var physics = PhysX.CreatePhysics(version, foundation, tolerances);
        self.physics = physics;
        console.log('Created PxPhysics');

        // create scene
        var tmpVec = new PhysX.PxVec3(0, 0, 0);
        var sceneDesc = new PhysX.PxSceneDesc(tolerances);
        sceneDesc.set_gravity(tmpVec);
        sceneDesc.set_cpuDispatcher(PhysX.DefaultCpuDispatcherCreate(0));
        sceneDesc.set_filterShader(PhysX.DefaultFilterShader());
        self.scene = physics.createScene(sceneDesc);
        console.log('Created scene');

        // create a default material
        var material = physics.createMaterial(0.5, 0.5, 0.5);

        // create default simulation shape flags
        var shapeFlags = new PhysX.PxShapeFlags(PhysX.PxShapeFlagEnum.eSCENE_QUERY_SHAPE | PhysX.PxShapeFlagEnum.eSIMULATION_SHAPE | PhysX.PxShapeFlagEnum.eVISUALIZATION);

        // clean up temp objects
        PhysX.destroy(shapeFlags);
        PhysX.destroy(sceneDesc);
        PhysX.destroy(tolerances);
        console.log('Created scene objects');
        game.physicsReady = true;

        // async:true plugins *must* self report when they are ready
        game.emit('plugin::ready::physics-physx', this);
        // TODO: remove this line from plugin implementations
        game.loadingPluginsCount--;
      });
    }
  }, {
    key: "addPreUpdateListener",
    value: function addPreUpdateListener(listener) {
      this.preUpdateListeners.push(listener);
    }
  }, {
    key: "addPostUpdateListener",
    value: function addPostUpdateListener(listener) {
      this.postUpdateListeners.push(listener);
    }

    // Equivalent to Engine.create()
  }, {
    key: "createEngine",
    value: function createEngine(options) {
      return Matter.Engine.create(options);
    }

    // Equivalent to World.add()
  }, {
    key: "addToWorld",
    value: function addToWorld(engine, body) {
      //Matter.World.add(engine.world, body);
    }

    // Equivalent to World.remove()
  }, {
    key: "removeFromWorld",
    value: function removeFromWorld(engine, body) {
      Matter.World.remove(engine.world, body);
    }

    // Custom method to get a body's velocity
  }, {
    key: "getBodyVelocity",
    value: function getBodyVelocity(body) {
      return body.velocity;
    }
  }, {
    key: "onBeforeUpdate",
    value: function onBeforeUpdate(engine, callback) {
      Matter.Events.on(engine, 'beforeUpdate', callback);
    }
  }, {
    key: "onAfterUpdate",
    value: function onAfterUpdate(engine, callback) {
      Matter.Events.on(engine, 'afterUpdate', callback);
    }
  }, {
    key: "setPosition",
    value: function setPosition(body, position) {
      //Matter.Body.setPosition(body, position);
    }
  }, {
    key: "setVelocity",
    value: function setVelocity(body, velocity) {
      // TODO: refactor consuming apis to applying force, not set velocity
      this.applyForce(body, {
        x: 0,
        y: 0,
        z: 0
      }, {
        x: velocity.x * 1000,
        y: velocity.y * 1000,
        z: velocity.z || 0
      });
      /*
      return;
      console.log('incoming velocity', velocity)
      const velocityVec = new this.PhysX.PxVec3(
        velocity.x * 1000,
        velocity.y * 1000,
        velocity.z || 0 // If z is not provided, assume 0
      );
      console.log('setVelocity', velocityVec, body)
      body.setLinearVelocity(body, velocityVec);
      */
    }
  }, {
    key: "collisionStart",
    value: function collisionStart(game, callback) {
      /*
      Matter.Events.on(game.engine, 'collisionStart', (event) => {
        for (let pair of event.pairs) {
          const bodyA = pair.bodyA;
          const bodyB = pair.bodyB;
            const entityIdA = bodyA.myEntityId;
          const entityIdB = bodyB.myEntityId;
           const entityA = this.game.getEntity(entityIdA);
          const entityB = this.game.getEntity(entityIdB);
           bodyA.entity = entityA;
          bodyB.entity = entityB;
           game.emit('collisionStart', { pair, bodyA, bodyB })
          callback(pair, bodyA, bodyB);
        }
      });
      */
    }
  }, {
    key: "collisionActive",
    value: function collisionActive(game, callback) {
      /*
      Matter.Events.on(game.engine, 'collisionActive', (event) => {
        for (let pair of event.pairs) {
          const bodyA = pair.bodyA;
          const bodyB = pair.bodyB;
          game.emit('collisionActive', { pair, bodyA, bodyB })
          callback(pair, bodyA, bodyB);
        }
      });
      */
    }
  }, {
    key: "collisionEnd",
    value: function collisionEnd(game, callback) {
      /*
      Matter.Events.on(game.engine, 'collisionEnd', (event) => {
        for (let pair of event.pairs) {
          const bodyA = pair.bodyA;
          const bodyB = pair.bodyB;
          game.emit('collisionEnd', { pair, bodyA, bodyB })
          callback(pair, bodyA, bodyB);
        }
      });
      */
    }
  }, {
    key: "setGravity",
    value: function setGravity(gravity) {
      // not yet implemented
    }

    // Utility function to multiply two quaternions if not available in PhysX API
  }, {
    key: "quaternionMultiply",
    value: function quaternionMultiply(q1, q2) {
      return new this.PhysX.PxQuat(q1.w * q2.x + q1.x * q2.w + q1.y * q2.z - q1.z * q2.y,
      // X
      q1.w * q2.y - q1.x * q2.z + q1.y * q2.w + q1.z * q2.x,
      // Y
      q1.w * q2.z + q1.x * q2.y - q1.y * q2.x + q1.z * q2.w,
      // Z
      q1.w * q2.w - q1.x * q2.x - q1.y * q2.y - q1.z * q2.z // W
      );
    }

    // Helper function to normalize a quaternion
  }, {
    key: "normalizeQuaternion",
    value: function normalizeQuaternion(q) {
      var length = Math.sqrt(q.x * q.x + q.y * q.y + q.z * q.z + q.w * q.w);
      return new this.PhysX.PxQuat(q.x / length, q.y / length, q.z / length, q.w / length);
    }
  }]);
  return PhysXPhysics;
}(_PhysicsInterface2["default"]);
_defineProperty(PhysXPhysics, "id", 'physics-physx');
_defineProperty(PhysXPhysics, "removable", false);
_defineProperty(PhysXPhysics, "async", true);
var _default = exports["default"] = PhysXPhysics;

},{"../physics-matter/PhysicsInterface.js":1,"./lib/body/applyAngularForce.js":3,"./lib/body/applyForce.js":4,"./lib/body/applyTorque.js":5,"./lib/body/getBodyPosition.js":6,"./lib/body/getBodyRotation.js":7,"./lib/body/getLinearVelocity.js":8,"./lib/body/rotateBody.js":9,"./lib/checkForMovedBodies.js":10,"./lib/math/quaternionToEuler.js":11,"./lib/shapes/createCircle.js":12,"./lib/shapes/createRectangle.js":13,"./lib/updateEngine.js":14}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = applyAngularForce;
function applyAngularForce(body, force, axis) {
  if (!body) {
    console.error('applyAngularForce requires a valid body');
    return;
  }

  // Calculate the torque based on the axis and force magnitude
  var torque = new this.PhysX.PxVec3(axis.x * force, axis.y * force, axis.z * force);

  // Apply the torque to the body
  body.addTorque(torque, this.PhysX.eFORCE, true);
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = applyForce;
function applyForce(body, position, force) {
  if (!body || !force) {
    console.error('applyForce requires a body and a force');
    return;
  }

  // console.log("applyForce", body, position, force)

  if (typeof force.x === 'undefined' || typeof force.y === 'undefined' || typeof force.z === 'undefined') {
    console.error('PhysX.applyForce requires a force with x, y, and z components');
    return;
  }
  var ogPos = this.getBodyPosition(body);
  // console.log('ogPos', ogPos);

  // Convert the input force and position to a PxVec3, if they're not already.
  var pxForce = new this.PhysX.PxVec3(force.x, force.y, force.z);
  var pxPosition = position ? new this.PhysX.PxVec3(position.x, position.y, position.z) : undefined;
  body.addForce(pxForce, this.PhysX.eFORCE, pxPosition);

  // Check if the body is dynamic (i.e., can be moved by forces).
  if (body.isRigidDynamic && body.isRigidDynamic()) {
    // Add the force at the specific position. If no position is provided, it will apply the force at the center of mass.
  } else {
    //      console.error('applyForce can only be called on dynamic bodies');
  }

  // Clean up the created PxVec3 objects to avoid memory leaks
  this.PhysX.destroy(pxForce);
  if (pxPosition) this.PhysX.destroy(pxPosition);
}

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function applyTorque(body, torqueAmount, axis) {
  // Calculate the torque vector based on the specified axis
  var torqueVector = new this.PhysX.PxVec3(torqueAmount * axis.x, torqueAmount * axis.y, torqueAmount * axis.z);

  // Apply the torque to the body
  body.addTorque(torqueVector, this.PhysX.eFORCE, true);

  // Logging for debugging purposes
  console.log("Applied torque: ".concat(torqueVector.x, ", ").concat(torqueVector.y, ", ").concat(torqueVector.z));
}
var _default = exports["default"] = applyTorque;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getBodyPosition;
function getBodyPosition(body) {
  if (!body) {
    console.error('getBodyPosition requires a body');
    return null;
  }

  // Access the global pose of the body
  var transform = body.getGlobalPose();

  // Retrieve the position from the transform
  var position = transform.p; // 'p' typically stands for position in PhysX's PxTransform

  // Return a new object with the position values
  return {
    x: position.x,
    y: position.y,
    z: position.z
  };
}

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getBodyRotation;
function getBodyRotation(body) {
  if (!body) {
    console.error('getBodyRotation requires a valid body');
    return null;
  }
  var pose = body.getGlobalPose();
  var orientation = pose.q; // Assuming 'q' is the quaternion orientation

  // Return the quaternion components directly
  return {
    x: orientation.x,
    y: orientation.y,
    z: orientation.z,
    w: orientation.w
  };
}

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getLinearVelocity;
function getLinearVelocity(body) {
  if (!body) {
    console.error('getBodyVelocity requires a body');
    return null;
  }

  // Access the velocity of the body
  // Assuming 'getLinearVelocity' is a method that exists in your API to get the velocity of a body
  var velocity = body.getLinearVelocity();

  // Return a new object with the velocity values
  // If your API does not directly return an object with x, y, z properties,
  // you might need to access or calculate them accordingly.
  return {
    x: velocity.x,
    y: velocity.y,
    z: velocity.z
  };
}

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = rotateBody;
function rotateBody(body, angle, axis, PhysX) {
  if (!body) {
    console.error('rotateBody requires a valid body to rotate');
    return;
  }
  var currentRotation = body.getGlobalPose().q;
  var additionalRotation = calculateRotationQuaternion(this.PhysX, angle, axis);

  // Inside rotateBody function, after quaternion multiplication
  var newRotation = quaternionMultiply(this.PhysX, currentRotation, additionalRotation);
  console.log('newRotation', newRotation.x, newRotation.y, newRotation.z);
  var normalizedRotation = normalizeQuaternion(this.PhysX, newRotation); // Normalize the quaternion
  console.log('normalizedRotation', normalizedRotation.x, normalizedRotation.y, normalizedRotation.z);
  body.setGlobalPose(new this.PhysX.PxTransform(body.getGlobalPose().p, normalizedRotation));
  var updatedRotation = this.getBodyRotation(body);
  console.log('updatedRotation', updatedRotation.x, updatedRotation.y, updatedRotation.z);
}

// Helper function to multiply quaternions
function quaternionMultiply(PhysX, a, b) {
  return new PhysX.PxQuat(a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y, a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x, a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w, a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z);
}

// Helper function to normalize a quaternion
function normalizeQuaternion(PhysX, q) {
  var length = Math.sqrt(q.x * q.x + q.y * q.y + q.z * q.z + q.w * q.w);
  return new PhysX.PxQuat(q.x / length, q.y / length, q.z / length, q.w / length);
}

// Helper function to create a rotation quaternion from an angle and axis
function calculateRotationQuaternion(PhysX, angle, axis) {
  var halfAngle = angle * 0.5;
  var sinHalfAngle = Math.sin(halfAngle);
  return new PhysX.PxQuat(axis.x * sinHalfAngle, axis.y * sinHalfAngle, axis.z * sinHalfAngle, Math.cos(halfAngle));
}

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = checkForMovedBodies;
function checkForMovedBodies() {
  var _this = this;
  // Retrieve all the dynamic bodies from the scene
  // const dynamicBodies = scene.getDynamicBodies(); // This function will need to be implemented based on your setup

  this.dynamicBodies.forEach(function (body) {
    // If the body is awake, it has potentially moved and you can broadcast its new state
    var entityId = body.userData; // Assuming you store entityId in the userData of the body
    var myEntityId = body.myEntityId;
    //this.broadcastBodyState(entityId, body);
    //console.log('eee', myEntityId, body)
    var bodyPosition = _this.getBodyPosition(body);
    var ent = _this.game.entities.get(myEntityId);
    //console.log('ent', ent)

    if (!ent) {
      console.log('no ent for associated body', myEntityId, body);
      return;
    }
    _this.game.changedEntities.add(body.myEntityId);
    var bodyVelocity = _this.getLinearVelocity(body);
    //console.log('bodyVelocitybodyVelocity', bodyVelocity)

    _this.game.components.velocity.set(body.myEntityId, {
      x: bodyVelocity.x,
      y: bodyVelocity.y
    });
    _this.game.components.position.set(body.myEntityId, {
      x: bodyPosition.x,
      y: bodyPosition.y,
      z: bodyPosition.z
    });
    var bodyRotation = _this.getBodyRotation(body);
    //console.log('bodyRotation', bodyRotation)
    _this.game.components.rotation.set(body.myEntityId, bodyRotation);
    //if (body.isAwake()) {}
  });
}

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = quaternionToEuler;
// Helper function to convert quaternion to Euler angles in radians
function quaternionToEuler(quaternion) {
  // TODO: better rotation logic
  var sinr_cosp = 2 * (quaternion.w * quaternion.x + quaternion.y * quaternion.z);
  var cosr_cosp = 1 - 2 * (quaternion.x * quaternion.x + quaternion.y * quaternion.y);
  var roll = Math.atan2(sinr_cosp, cosr_cosp);
  var sinp = 2 * (quaternion.w * quaternion.y - quaternion.z * quaternion.x);
  var pitch;
  if (Math.abs(sinp) >= 1) pitch = Math.copySign(Math.PI / 2, sinp); // use 90 degrees if out of range
  else pitch = Math.asin(sinp);
  var siny_cosp = 2 * (quaternion.w * quaternion.z + quaternion.x * quaternion.y);
  var cosy_cosp = 1 - 2 * (quaternion.y * quaternion.y + quaternion.z * quaternion.z);
  var yaw = Math.atan2(siny_cosp, cosy_cosp);
  return {
    x: roll,
    y: pitch,
    z: yaw
  };
}

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createCircle;
function createCircle(x, y, radius) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  // console.log('incoming circle options', x, y, radius, options);
  // Inside the createCircle function, after creating the boxShape
  // Define filter data for the collision layers
  var filterData = new this.PhysX.PxFilterData(1,
  // Word0 (own layer)
  0,
  // Word1 (layer to collide with)
  0,
  // Word2 (not used in this context)
  0 // Word3 (not used in this context)
  );

  // Ensure the PhysX instance is loaded and available
  if (!this.PhysX) {
    console.error("PhysX is not initialized.");
    return;
  }

  // Create the box geometry with half extents
  var sphereGeometry = new this.PhysX.PxSphereGeometry(radius);
  // Retrieve default material from the PhysX scene
  var material = this.physics.createMaterial(0.5, 0.5, 0.6);

  // Create shape flags for the actor
  var shapeFlags = new this.PhysX.PxShapeFlags(this.PhysX.PxShapeFlagEnum.eSCENE_QUERY_SHAPE | this.PhysX.PxShapeFlagEnum.eVISUALIZATION);
  if (options && options.isSensor) {
    shapeFlags |= this.PhysX.PxShapeFlagEnum.eTRIGGER_SHAPE; // Add trigger shape flag for sensors
  } else {
    shapeFlags |= this.PhysX.PxShapeFlagEnum.eSIMULATION_SHAPE; // Regular simulation shape
  }

  // Setup the pose for the new actor (position and orientation)
  var transform = new this.PhysX.PxTransform(new this.PhysX.PxVec3(x, y, 0), new this.PhysX.PxQuat(this.PhysX.PxIDENTITYEnum.PxIdentity));

  // Create the box shape
  var sphereShape = this.physics.createShape(sphereGeometry, material, false, shapeFlags);

  // Set the simulation filter data
  sphereShape.setSimulationFilterData(filterData);
  var sphereActor;
  // options.isStatic = false;
  // Check if the body is static or dynamic based on the 'isStatic' option
  if (options && options.isStatic) {
    // Create a static actor for the box
    sphereActor = this.physics.createRigidStatic(transform);
  } else {
    // Create a dynamic actor for the box
    sphereActor = this.physics.createRigidDynamic(transform);
    // Add the body to the list of dynamic bodies
    this.dynamicBodies.push(sphereActor);
    // Correcting mass calculation for a sphere
    if (options && options.density) {
      var volume = 4 / 3 * Math.PI * Math.pow(radius, 3); // Volume of a sphere
      var mass = options.density * volume;
      sphereActor.setMass(10);
      //sphereActor.updateMassAndInertia(mass); // Update inertia based on mass
    }
  }

  // Attach the shape to the actor
  sphereActor.attachShape(sphereShape);

  // Add the actor to the scene
  this.scene.addActor(sphereActor);

  // Clean up temporary objects to avoid memory leaks
  this.PhysX.destroy(sphereGeometry);
  // Does shapeFlags need to be manually destroy, or is it destroyed when the shape is destroyed?
  // this.PhysX.destroy(shapeFlags);
  this.PhysX.destroy(transform);
  if (options && options.velocity) {
    // Create a force vector
    var forceVec = new this.PhysX.PxVec3(options.velocity.x, options.velocity.y, options.velocity.z || 0 // If z is not provided, assume 0
    );
    // Apply the force to the center of mass of the body
    // This might depend on your specific PhysX wrapper's API
    //this.applyForce(sphereActor, { x: 0, y: 0, z: 0}, forceVec)
    this.Body.applyForce(sphereActor, {
      x: 0,
      y: 0,
      z: 0
    }, forceVec);
    // sphereActor.addForce(forceVec, this.PhysX.eFORCE, true);
  }

  // Return the created box actor
  // console.log('returning the sphereActor', sphereActor);
  return sphereActor;
}

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createRectangle;
function createRectangle(x, y, width, height) {
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  // Inside the createRectangle function, after creating the boxShape
  // Define filter data for the collision layers
  var filterData = new this.PhysX.PxFilterData(1,
  // Word0 (own layer)
  1,
  // Word1 (layer to collide with)
  0,
  // Word2 (not used in this context)
  0 // Word3 (not used in this context)
  );

  // console.log('createRectangle', options)
  // Ensure the PhysX instance is loaded and available
  if (!this.PhysX) {
    console.error("PhysX is not initialized.");
    return;
  }

  // Compute half extents for the box geometry
  var hx = width / 2;
  var hy = height / 2;

  // Create the box geometry with half extents
  var boxGeometry = new this.PhysX.PxBoxGeometry(hx, hy, 100);
  // Retrieve default material from the PhysX scene
  var material = this.physics.createMaterial(0.5, 0.5, 0.6);

  // Create shape flags for the actor
  var shapeFlags = new this.PhysX.PxShapeFlags(this.PhysX.PxShapeFlagEnum.eSCENE_QUERY_SHAPE | this.PhysX.PxShapeFlagEnum.eSIMULATION_SHAPE | this.PhysX.PxShapeFlagEnum.eVISUALIZATION);

  // Setup the pose for the new actor (position and orientation)
  var transform = new this.PhysX.PxTransform(new this.PhysX.PxVec3(x, y, 0), new this.PhysX.PxQuat(this.PhysX.PxIDENTITYEnum.PxIdentity));

  // Create the box shape
  var boxShape = this.physics.createShape(boxGeometry, material, false, shapeFlags);

  // Set the simulation filter data
  boxShape.setSimulationFilterData(filterData);
  var boxActor;
  // options.isStatic = false;
  // Check if the body is static or dynamic based on the 'isStatic' option
  if (options && options.isStatic) {
    // Create a static actor for the box
    // console.log('creating a static actor');
    boxActor = this.physics.createRigidStatic(transform);
  } else {
    // console.log('creating a dynamic actor')
    // Create a dynamic actor for the box
    boxActor = this.physics.createRigidDynamic(transform);
    // Add the body to the list of dynamic bodies
    this.dynamicBodies.push(boxActor);

    // If options has a density property, set the mass and inertia
    if (options && options.density) {
      // Assuming you have some way to calculate the volume or mass from density
      // Since density = mass / volume, you would rearrange to mass = density * volume
      // Calculate the volume of the box. For a box, volume = width * height * depth
      var volume = width * height * 1; // Assuming '100' is your depth here
      var mass = options.density * volume;
      // console.log('SETTING MASS', mass);
      // Now set the mass of the dynamic actor
      boxActor.setMass(1);
    }
    if (options && options.velocity) {
      // apply velocity
      // is this not correct? do we need to make this a vector?
      // You need to create a PxVec3 for the velocity
      var velocityVec = new this.PhysX.PxVec3(options.velocity.x, options.velocity.y, options.velocity.z || 0 // If z is not provided, assume 0
      );

      // console.log('velocityVec', velocityVec)

      // Use the created PxVec3 to set the linear velocity
      boxActor.setLinearVelocity(velocityVec);
    }
    var inertiaTensor = {
      x: 10,
      y: 10,
      z: 10
    };

    // boxActor.setMassSpaceInertiaTensor(new this.PhysX.PxVec3(inertiaTensor.x, inertiaTensor.y, inertiaTensor.z));

    /*
    // Lock the motion along the Z-axis
    const lockFlags =
      this.PhysX.PxRigidDynamicLockFlagEnum.eLOCK_LINEAR_Z |
      this.PhysX.PxRigidDynamicLockFlagEnum.eLOCK_ANGULAR_Z |
      this.PhysX.PxRigidDynamicLockFlagEnum.eLOCK_ANGULAR_X |
      this.PhysX.PxRigidDynamicLockFlagEnum.eLOCK_ANGULAR_Y;
    console.log('lockFlags', lockFlags)
    console.log(boxActor)
    // Not working?
    boxActor.setRigidDynamicLockFlags(lockFlags);
    */
  }

  // Attach the shape to the actor
  boxActor.attachShape(boxShape);

  // Add the actor to the scene
  this.scene.addActor(boxActor);

  // Clean up temporary objects to avoid memory leaks
  this.PhysX.destroy(boxGeometry);
  this.PhysX.destroy(shapeFlags);
  this.PhysX.destroy(transform);

  // Return the created box actor
  // console.log('returning the box actor', boxActor);
  return boxActor;
}

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateEngine;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// Equivalent to Engine.update()
function updateEngine(engine) {
  var scene = this.scene;
  var hrtime = new Date().getTime();
  if (!scene) {
    return;
  }

  // Call pre-update listeners
  var _iterator = _createForOfIteratorHelper(this.preUpdateListeners),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var listener = _step.value;
      listener({
        source: this
      });
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var timeStep = Math.min(0.03, hrtime - this.lastFrame);
  // console.log('timeStep', timeStep)
  scene.simulate(timeStep);
  scene.fetchResults(true);

  // Call post-update listeners
  var _iterator2 = _createForOfIteratorHelper(this.postUpdateListeners),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _listener = _step2.value;
      _listener({
        source: this
      });
    }

    // Your additional logic for checking moved bodies, etc.
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  this.checkForMovedBodies();
  this.lastFrame = hrtime;
}

},{}]},{},[2])(2)
});
