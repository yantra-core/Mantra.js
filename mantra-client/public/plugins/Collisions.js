(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Collisions = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
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
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// Collisions.js - Marak Squires 2023
var Collisions = /*#__PURE__*/function () {
  function Collisions() {
    _classCallCheck(this, Collisions);
    this.id = Collisions.id;
  }
  _createClass(Collisions, [{
    key: "init",
    value: function init(game) {
      this.game = game;

      // TODO: this won't work unless game.physics exists
      // Binds our handleCollision method to the game physics engine's collisionStart event
      this.game.physics.collisionStart(this.game, this.handleCollision.bind(this));
      this.game.physics.collisionActive(this.game, this.collisionActive.bind(this));
      this.game.physics.collisionEnd(this.game, this.collisionEnd.bind(this));

      // Binds game.handleCollision to the Game for convenience 
      this.game.handleCollision = this.handleCollision.bind(this);
    }
  }, {
    key: "handleCollision",
    value: function handleCollision(pair, bodyA, bodyB) {
      // console.log('Collision detected between:', bodyA.myEntityId, 'and', bodyB.myEntityId);
      var entityIdA = bodyA.myEntityId;
      var entityIdB = bodyB.myEntityId;

      //const entityA = this.game.getEntity(entityIdA);
      //const entityB = this.game.getEntity(entityIdB);
      var entityA = bodyA.entity;
      var entityB = bodyB.entity;
      var canCollide = this.game.lifecycle.triggerHook('before.collisionStart', entityA, entityB, pair);
      if (canCollide === false) {
        // console.log('before.collisionStart returned false, skipping collision', entityIdA, entityIdB);
        return;
      }
      if (!entityA || !entityB) {
        // console.log('handleCollision no entity found. Skipping...', entityIdA, entityA, entityIdB, entityB);
        return;
      }

      // TODO: remove this in favor of collisionStart() handler?
      // Remark: May have many of these? Only allow on per entity? may need array?
      if (entityA.exit || entityB.exit) {
        var exitEnt = entityA.exit ? entityA : entityB;
        var enterEnt = entityA.exit ? entityB : entityA;
        if (typeof exitEnt.exit.exitHandler === 'function') {
          // call with this.game scope
          //exitEnt.exit.exitHandler(enterEnt, exitEnt);
          exitEnt.exit.exitHandler.call(this.game, enterEnt, exitEnt);
        } else {
          if (typeof exitEnt.exit.world !== 'undefined') {
            if (enterEnt.type === 'PLAYER') {
              game.switchWorlds(exitEnt.exit.world);
            }
          }
          if (typeof exitEnt.exit.position !== 'undefined') {
            this.game.setPosition(enterEnt.id, {
              x: exitEnt.exit.position.x,
              y: exitEnt.exit.position.y
            });
          }
        }
      }

      // all entity collision events need context
      var collisionContext = {
        type: 'COLLISION',
        kind: 'START',
        entityIdA: bodyA.myEntityId,
        entityIdB: bodyB.myEntityId,
        bodyA: entityA,
        bodyB: entityB
      };

      // add entity onto the collision by type name
      collisionContext[entityA.type] = entityA;
      collisionContext[entityB.type] = entityB;
      if (entityA.collisionStart) {
        collisionContext.owner = entityA;
        collisionContext.target = entityB;
        // pair.context = collisionContext;
        if (typeof entityA.collisionStart === 'function') {
          // console.log('calling entityA.collisionStart', entityA.collisionStart, entityA, entityB)
          entityA.collisionStart.call(this.game, entityB, entityA, pair, collisionContext);
        }
      }
      if (entityB.collisionStart) {
        collisionContext.owner = entityB;
        collisionContext.target = entityA;
        if (typeof entityB.collisionStart === 'function') {
          // console.log('calling entityB.collisionStart', entityB.collisionStart, entityB, entityA)
          entityB.collisionStart.call(this.game, entityA, entityB, pair, collisionContext);
        }
      }

      //
      // Collectable entities will get attached to the entity they collide with
      // this is done by adding to Entity.items() array
      // further checks in Collectibles system can update the position of the collectable
      function addItemIfCollectible(sourceEntity, targetEntity) {
        if (!targetEntity.hasInventory) {
          return;
        }
        // console.log('Processing collectable', sourceEntity.collectable, sourceEntity, targetEntity);
        // Initialize the target entity's items array if it doesn't exist
        targetEntity.items = targetEntity.items || [];
        // Check if the source entity's ID is already in the target entity's items array
        // If not, add it to the array and update the entity
        if (!targetEntity.items.includes(sourceEntity.id)) {
          /* TODO: add this back, we'll need a config flag + og body reference if item is dropped
          // that means recreate the item, better from ref incase item was mutated by game code
          // if the source entity has a body, remove it ( in some cases we want to keep it )
          game.updateEntity({
            id: sourceEntity.id,
            body: false
          })
          */

          // console.log("ADDING ITEM", sourceEntity.id, targetEntity.id, targetEntity.items)
          targetEntity.items.push(sourceEntity.id);
          this.game.updateEntity({
            id: targetEntity.id,
            items: targetEntity.items
          });
        }
      }
      if (entityA.collectable) {
        addItemIfCollectible.call(this, entityA, entityB);
      }
      if (entityB.collectable) {
        addItemIfCollectible.call(this, entityB, entityA);
      }

      // Check for specific collision cases and send events to the state machine
      if (this.shouldSendCollisionEvent(bodyA, bodyB, 'START')) {
        if (this.game.machine && this.game.machine.sendEvent) {
          // console.log('sending machine event', 'COLLISION');
          this.game.machine.sendEvent('COLLISION', {
            entityIdA: bodyA.myEntityId,
            entityIdB: bodyB.myEntityId
          });
        }
        if (entityA.yCraft && entityA.yCraft.part && entityA.yCraft.part.handleCollision) {
          if (entityB.type !== 'TEXT') {
            entityA.yCraft.part.handleCollision(entityB);
          }
        }
        if (entityB.yCraft && entityB.yCraft.part && entityB.yCraft.part.handleCollision) {
          if (entityA.type !== 'TEXT') {
            entityB.yCraft.part.handleCollision(entityA);
          }
        }

        // Remark: This could be this.game.systems.sutra
        this.game.data.collisions = this.game.data.collisions || [];
        // console.log('adding collision to game.data.collisions', bodyA.myEntityId, entityA.type, bodyB.myEntityId, entityB.type, this.game.data.collisions.length)
        // add entity onto the collision by type name

        //collisionContext[entityA.type] = entityA;
        //collisionContext[entityB.type] = entityB;

        this.game.data.collisions.push(collisionContext);
        this.game.lifecycle.triggerHook('after.collisionStart', entityA, entityB, pair);
      }

      // do not process player collisions locally ( for now )
      if (this.game.isClient && entityA.type === 'PLAYER' && entityB.type === 'PLAYER') {
        //console.log("BYPASSING PLAYER COLISION ON CLIENT")
        pair.isActive = false;
        return;
      }

      // iterate through all systems and see if they have a handleCollision method
      var _iterator = _createForOfIteratorHelper(this.game.systemsManager.systems),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            _ = _step$value[0],
            system = _step$value[1];
          if (typeof system.handleCollision === "function") {
            // any system that has a handleCollision method will be called here
            system.handleCollision(pair, bodyA, bodyB);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    // TODO: Remark: Active collisions should be managed in a Map() with unique key,
    //               being composite key of entityIdA and entityIdB
    //               This will allow for optimized collision management and improved time complexity
  }, {
    key: "collisionEnd",
    value: function collisionEnd(pair, bodyA, bodyB) {
      // console.log('collisionEnd', pair, bodyA, bodyB);

      var entityIdA = bodyA.myEntityId;
      var entityIdB = bodyB.myEntityId;
      var entityA = bodyA.entity;
      var entityB = bodyB.entity;
      this.game.lifecycle.triggerHook('before.collisionEnd', entityA, entityB, pair);
      if (!entityA || !entityB) {
        // console.log('handleCollision no entity found. Skipping...', entityIdA, entityA, entityIdB, entityB);
        return;
      }
      var collisionContext = {
        type: 'COLLISION',
        kind: 'END',
        entityIdA: bodyA.myEntityId,
        entityIdB: bodyB.myEntityId,
        bodyA: entityA,
        bodyB: entityB
      };

      // add entity onto the collision by type name
      collisionContext[entityA.type] = entityA;
      collisionContext[entityB.type] = entityB;
      if (entityA.collisionEnd) {
        collisionContext.owner = entityA;
        collisionContext.target = entityB;
        if (typeof entityA.collisionEnd === 'function') {
          entityA.collisionEnd.call(this.game, entityB, entityA, collisionContext);
        }
      }
      if (entityB.collisionEnd) {
        collisionContext.owner = entityB;
        collisionContext.target = entityA;
        if (typeof entityB.collisionEnd === 'function') {
          entityB.collisionEnd.call(this.game, entityA, entityB, collisionContext);
        }
      }
      if (this.shouldSendCollisionEvent(bodyA, bodyB, 'END')) {
        this.game.data.collisions = this.game.data.collisions || [];
        // console.log('adding collision to game.data.collisions', bodyA.myEntityId, entityA.type, bodyB.myEntityId, entityB.type, this.game.data.collisions.length)

        // Find and remove the active collision
        this.game.data.collisions = this.game.data.collisions.filter(function (collision) {
          return !(collision.entityIdA === bodyA.myEntityId && collision.entityIdB === bodyB.myEntityId && collision.kind === 'ACTIVE');
        });
        this.game.data.collisions.push(collisionContext);
      }

      // iterate through all systems and see if they have a handleCollision method
      var _iterator2 = _createForOfIteratorHelper(this.game.systemsManager.systems),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = _slicedToArray(_step2.value, 2),
            _ = _step2$value[0],
            system = _step2$value[1];
          if (typeof system.collisionEnd === "function") {
            // any system that has a handleCollision method will be called here
            system.collisionEnd(pair, bodyA, bodyB);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      this.game.lifecycle.triggerHook('after.collisionEnd', entityA, entityB, pair);
    }
  }, {
    key: "collisionActive",
    value: function collisionActive(pair, bodyA, bodyB) {
      var entityIdA = bodyA.myEntityId;
      var entityIdB = bodyB.myEntityId;
      var entityA = bodyA.entity;
      var entityB = bodyB.entity;
      this.game.lifecycle.triggerHook('before.collisionActive', entityA, entityB, pair);

      // console.log('collisionActive', pair, bodyA, bodyB, entityA, entityB)
      if (!entityA || !entityB) {
        // console.log('handleCollision no entity found. Skipping...', entityIdA, entityA, entityIdB, entityB);
        return;
      }
      var collisionContext = {
        type: 'COLLISION',
        kind: 'ACTIVE',
        entityIdA: bodyA.myEntityId,
        entityIdB: bodyB.myEntityId,
        ticks: 1,
        duration: 1,
        bodyA: entityA,
        bodyB: entityB
      };

      // add entity onto the collision by type name
      collisionContext[entityA.type] = entityA;
      collisionContext[entityB.type] = entityB;
      if (entityA.collisionActive) {
        collisionContext.owner = entityA;
        collisionContext.target = entityB;
        if (typeof entityA.collisionActive === 'function') {
          entityA.collisionActive.call(this.game, entityB, entityA, collisionContext);
        }
      }
      if (entityB.collisionActive) {
        collisionContext.owner = entityB;
        collisionContext.target = entityA;
        if (typeof entityB.collisionActive === 'function') {
          entityB.collisionActive.call(this.game, entityA, entityB, collisionContext);
        }
      }
      if (this.shouldSendCollisionEvent(bodyA, bodyB, 'ACTIVE')) {
        this.game.data.collisions = this.game.data.collisions || [];
        // console.log('adding collision to game.data.collisions', bodyA.myEntityId, entityA.type, bodyB.myEntityId, entityB.type, this.game.data.collisions.length)

        // Find existing collision, if any
        var existingCollision = this.game.data.collisions.find(function (collision) {
          return collision.entityIdA === collisionContext.entityIdA && collision.entityIdB === collisionContext.entityIdB && collision.kind === 'ACTIVE';
        });
        if (existingCollision) {
          // Increment duration if collision is already active
          existingCollision.duration += 1 / this.game.data.fps; // Adds approximately 0.01667 seconds per tick at 60 FPS
          existingCollision.ticks++;
        } else {
          // Add new collision if not found
          this.game.data.collisions.push(collisionContext);
        }
      }

      // iterate through all systems and see if they have a handleCollision method
      var _iterator3 = _createForOfIteratorHelper(this.game.systemsManager.systems),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _step3$value = _slicedToArray(_step3.value, 2),
            _ = _step3$value[0],
            system = _step3$value[1];
          if (typeof system.collisionActive === "function") {
            // any system that has a handleCollision method will be called here
            system.collisionActive(pair, bodyA, bodyB);
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      this.game.lifecycle.triggerHook('after.collisionActive', entityA, entityB, pair);
    }

    // Remark: In most cases this code path will not be reached since the Physics interface,
    //         should be responsible for delegating collisions based on the collision type
    //         We keep this additional check for future proofing and additional gaurds on collision logic
    //         In the future, we would expect to see collision layers and collision groups here
  }, {
    key: "shouldSendCollisionEvent",
    value: function shouldSendCollisionEvent(bodyA, bodyB) {
      var kind = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'START';
      // for now, send all events to the stateMachine
      if (kind === 'ACTIVE' && (bodyA.entity.collisionActive === true || bodyB.entity.collisionActive === true)) {
        return true;
      }
      if (kind === 'START' && (bodyA.entity.collisionStart || bodyB.entity.collisionStart)) {
        return true;
      }
      if (kind === 'END' && (bodyA.entity.collisionEnd === true || bodyB.entity.collisionEnd === true)) {
        return true;
      }
      return false;
    }
  }]);
  return Collisions;
}();
_defineProperty(Collisions, "id", 'collisions');
_defineProperty(Collisions, "removable", false);
var _default = exports["default"] = Collisions;

},{}]},{},[1])(1)
});
