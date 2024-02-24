(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Bullet = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// Bullet.js - Marak Squires 2023
var Bullet = /*#__PURE__*/function () {
  function Bullet() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Bullet);
    this.id = Bullet.id;
    this.bulletCount = 0;
    this.redGlowMaterial = null; // Used for caching the material
    this.speed = config.speed || 3; // or 22?
    this.direction = config.direction || {
      x: 0,
      y: 1
    };
    this.damage = config.damage || 30;
    this.lifetime = config.lifetime || 2000;
    this.fireRate = config.fireRate || 200;
  }
  _createClass(Bullet, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.systemsManager.addSystem('bullet', this);
    }
  }, {
    key: "update",
    value: function update() {} // not used, physics engine updates bullets based on velocity
  }, {
    key: "fireBullet",
    value: function fireBullet(entityId) {
      var bulletConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var entity = this.game.getEntity(entityId);
      if (!entity) {
        console.log('Bullet.fireBullet no entity found for id', entityId);
        return;
      }
      var actionRateLimiterComponent = this.game.components.actionRateLimiter;
      var lastFired = actionRateLimiterComponent.getLastActionTime(entityId, 'fireBullet');
      var currentTime = Date.now();
      if (currentTime - lastFired < this.fireRate) {
        // console.log('Rate limit hit for entity', entityId, ', cannot fire yet');
        return;
      }
      actionRateLimiterComponent.recordAction(entityId, 'fireBullet');
      var playerPos = entity.position;
      var playerRotation = entity.rotation || 0; // Ensure there's a default value for rotation

      // Convert to 3D rotation if necessary
      playerRotation = _typeof(playerRotation) === 'object' ? playerRotation.z : playerRotation;

      // Compute the bullet's direction based on player's rotation
      var directionX = Math.sin(playerRotation);
      var directionY = -Math.cos(playerRotation);

      // Place the bullet in front of the player
      var bulletStartPosition = {
        x: playerPos.x + directionX * 16,
        // Assuming distanceInFront is 16
        y: playerPos.y + directionY * 16,
        z: 1 // Assuming a default Z position
      };

      this.bulletCount++;
      var defaultBulletConfig = {
        type: 'BULLET',
        mass: 1,
        collisionStart: true,
        position: bulletStartPosition,
        lifetime: this.lifetime,
        texture: bulletConfig.texture || {
          sheet: 'loz_spritesheet',
          sprite: 'arrow'
        },
        owner: entityId,
        rotation: playerRotation,
        isSensor: true,
        velocity: {
          x: directionX * this.speed,
          y: directionY * this.speed
        },
        width: 16,
        height: 16,
        radius: 8,
        // Assuming a default radius
        damage: 10 // Assuming default damage
      };

      // Merge the bulletConfig into the defaultBulletConfig
      var mergedBulletConfig = Object.assign({}, defaultBulletConfig, bulletConfig);
      if (bulletConfig.velocity) {
        mergedBulletConfig.velocity = {};
        mergedBulletConfig.velocity.x = bulletConfig.velocity.x;
        mergedBulletConfig.velocity.y = bulletConfig.velocity.y;
      }

      // Create the bullet entity with the merged configuration
      return this.game.createEntity(mergedBulletConfig);
    }
  }, {
    key: "handleCollision",
    value: function handleCollision(pair, bodyA, bodyB) {
      if (bodyA.myEntityId && bodyB.myEntityId) {
        var entityIdA = bodyA.myEntityId;
        var entityIdB = bodyB.myEntityId;
        var entityA = this.game.getEntity(entityIdA);
        var entityB = this.game.getEntity(entityIdB);

        // entityA is player ( for now )
        // console.log('types', entityA.type, entityB.type);
        if (!entityA || !entityB) {
          //console.log('Bullet.handleCollision no entity found. Skipping...', entityA, entityB);
          return;
        }
        // console.log('Bullet.handleCollision', entityIdA, entityIdB, entityA.owner, entityB.owner);

        if (entityA.type !== 'BULLET' && entityB.type !== 'BULLET') {
          // console.log('neither is a bullet. Skipping...');
          return;
        }

        //
        // Bullets are destroyed if they hit a BORDER
        //
        if (entityA.type === 'BULLET' && entityB.type === 'BORDER') {
          // destroy the bullet if it hits a border wall
          this.game.removeEntity(entityIdA);
          return;
        }
        if (entityA.type === 'BORDER' && entityB.type === 'BULLET') {
          // destroy the bullet if it hits a border wall
          this.game.removeEntity(entityIdB);
          return;
        }

        // TODO: collision groups for TileSets
        if (entityA.type === 'BULLET' && entityB.type === 'TILE') {
          // for now, if tile has health, destroy it
          if (entityB.kind !== 'bush') {
            return;
          }
          this.game.removeEntity(entityB.id);
          this.game.removeEntity(entityA.id);
          return;
        }
        if (entityA.type === 'TILE' && entityB.type === 'BULLET') {
          if (entityA.kind !== 'bush') {
            return;
          }
          this.game.removeEntity(entityA.id);
          this.game.removeEntity(entityB.id);
          return;
        }

        //
        // Bullets are destroyed if they hit a BLOCK
        //
        if (entityA.type === 'BULLET' && entityB.type === 'BLOCK') {
          //this.game.removeEntity(entityIdA);
          return;
        }
        if (entityA.type === 'BLOCK' && entityB.type === 'BULLET') {
          //this.game.removeEntity(entityIdB);
          return;
        }

        // specific cancel of bullets to owner
        if (entityA.type === 'BULLET' && entityB.id === entityA.owner) {
          return;
        }
        if (entityB.type === 'BULLET' && entityA.id === entityB.owner) {
          return;
        }

        // general cancel of all collisions between siblings
        if (entityA.owner === entityB.owner) {
          // console.log('bullet owner collision', entityIdA, entityIdB);
          // pair.isActive = false;
          return;
        }

        // console.log('bullet collides', entityIdA, entityIdB);

        if (entityA && entityA.id !== entityB.owner) {
          if (this.game.systems.xstate) {
            var xStateSystem = this.game.systems.xstate;
            xStateSystem.sendEvent('entity::damage', {
              name: entityA.name,
              damage: this.damage
            });
          }

          /* TODO: move this to BabylonGraphics and Graphics Plugins
          if (entityA.type === 'PLAYER') {
            let playerGraphics = entityA.graphics;
            if (playerGraphics) {
              this.applyTemporaryGlowEffect(entityA);
            }
          }
           let mesh = entityB.mesh;
          // Before disposing of the bullet mesh
          if (mesh) {
            // TODO: should *not* have direct calls to babylon here!
            // Create a particle system for the bullet explosion
            let particleSystem = new BABYLON.ParticleSystem("particles", 2000, this.scene);
            particleSystem.emitter = mesh.position; // The bullet's last position
            particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", this.scene); // Adjust with your texture
             // Set the particle system's appearance and behavior
            particleSystem.color1 = new BABYLON.Color4(1, 0.5, 0, 1.0);
            particleSystem.color2 = new BABYLON.Color4(1, 0.5, 0, 1.0);
            particleSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);
            particleSystem.minSize = 0.1 * 10;
            particleSystem.maxSize = 0.5 * 10;
            particleSystem.minLifeTime = 0.2 * 10;
            particleSystem.maxLifeTime = 0.4 * 10;
            particleSystem.emitRate = 1000;
            particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
            particleSystem.minEmitPower = 1;
            particleSystem.maxEmitPower = 3;
            particleSystem.updateSpeed = 0.01;
             // Start the particle system
            particleSystem.start();
             // Dispose of the particle system after a short time
            setTimeout(() => {
              particleSystem.dispose();
            }, 1000); // Adjust time as necessary
             // Dispose the bullet mesh
            mesh.dispose();
          }
          */
          //game.systems.health.applyDamage(entityIdB, bulletA.damage);
          //this.game.removeEntity(entityIdB);
        }

        //
        // Bullets are destroyed if hit an NPC
        //
        var npcTypes = ['NPC', 'BOSS', 'SPAWNER'];
        // console.log("checking ", entityA.type, entityB.type, npcTypes)
        // if (entityA.type === 'BULLET' && npcTypes.indexOf(entityB.type) !== -1) {
        if (entityA.type === 'BULLET' && typeof entityB.health === 'number') {
          entityB.health -= entityA.damage || 10;
          // console.log('NPC health', entityB, entityB.health)
          this.game.components.health.set(entityIdB, entityB.health);
          this.game.removeEntity(entityIdA);
          if (entityB.health <= 0) {
            this.game.removeEntity(entityIdB);
          }
          return;
        }
        // if (npcTypes.indexOf(entityA.type) !== -1 && entityB.type === 'BULLET') {
        if (typeof entityA.health === 'number' && entityB.type === 'BULLET') {
          entityA.health -= entityB.damage || 10;
          // console.log('NPC health', entityA,  entityA.health)
          this.game.components.health.set(entityIdA, entityA.health);
          this.game.removeEntity(entityIdB);
          if (entityA.health <= 0) {
            this.game.removeEntity(entityIdA);
          }
          return;
        }
      }
    }
  }]);
  return Bullet;
}();
_defineProperty(Bullet, "id", 'bullet');
var _default = exports["default"] = Bullet;

},{}]},{},[1])(1)
});
