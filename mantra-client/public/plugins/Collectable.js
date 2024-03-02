(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Collectable = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// Collectable.js - Marak Squires 2024
// Handles `Entity.items` after they are added / collectable to Entity
var Collectable = /*#__PURE__*/function () {
  function Collectable(game) {
    _classCallCheck(this, Collectable);
    this.game = game; // Store the reference to the game logic
    this.id = Collectable.id;
  }
  _createClass(Collectable, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      // add system
      this.game.systemsManager.addSystem(this.id, this);
    }
  }, {
    key: "update",
    value: function update() {
      var _this = this;
      // console.log('Collectable.update()');
      // TODO: iterate only through ents that are collectable
      // then get their parent reference? must keep time complexity low
      // TODO: for now just iterate through all items components
      // if (this.game.tick % 10) {

      var itemsData = this.game.components.items.data;
      // TODO: see why these are null, don't allow null items into component data

      // for each entity that has items, iterate those items and set position to relative of parent
      var _loop = function _loop() {
          var parentEnt = _this.game.entities.get(Number(id));
          // console.log('parentEnt', parentEnt, itemsData[id])
          if (!parentEnt || parentEnt.type === 'CONTAINER') {
            //skip
            return 0; // continue
          }
          if (parentEnt.destroyed === true) {
            // console.log('parentEnt is destroyed', parentEnt);
            return 0; // continue
          }
          var childEnts = itemsData[id];
          // console.log("childEnts", childEnts)
          childEnts.forEach(function (childEntId, i) {
            // TODO: only get positional component data, not entire ent
            var entity = _this.game.entities.get(childEntId);
            if (entity && !entity.destroyed) {
              // console.log('found a child entity with items', entity);
              // TODO: this should be using the container API, not manually adjusting position
              // Add the item to the entity as entity.items and it should align based on 
              // layout configs, etc, needs more tests for Entity.layout()
              // adjust the position relative to the parent ent, attach for now
              _this.game.updateEntity({
                id: entity.id,
                body: false,
                // TODO: does this work?
                // rotation: parentEnt.rotation,
                position: {
                  x: parentEnt.position.x + 10,
                  y: parentEnt.position.y + 10 * i
                }
              });
            }
          });
        },
        _ret;
      for (var id in itemsData) {
        _ret = _loop();
        if (_ret === 0) continue;
      }

      // }
    }
  }, {
    key: "render",
    value: function render() {}
  }, {
    key: "destroy",
    value: function destroy() {}
  }]);
  return Collectable;
}();
_defineProperty(Collectable, "id", 'collectable');
var _default = exports["default"] = Collectable;

},{}]},{},[1])(1)
});
