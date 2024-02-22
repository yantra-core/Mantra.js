(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Droppable = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// Droppable.js
var Droppable = exports["default"] = /*#__PURE__*/function () {
  function Droppable() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Droppable);
    this.id = Droppable.id;
  }
  _createClass(Droppable, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.systemsManager.addSystem('droppable', this);
    }
  }, {
    key: "build",
    value: function build() {
      var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // Ensure `meta` exists and initialize shield properties
      var meta = entityData.meta || {};

      /*
      entityData.onDrop = function(context, event){
        if (typeof entityData.onDrop === 'function') {
          entityData.onDrop(context, event);
        } else {
          console.log('default entityData.onDrop handler, none was set')
        }
      };
      */

      entityData.isSensor = true;
      entityData.pointerout = function (context, event) {
        // remove the border from context
        if (context && context.dropTarget) {
          game.updateEntity(context.dropTarget.id, {
            style: {
              border: 'none'
            }
          });
        }
      };
      entityData.pointerdown = function (context, event) {
        // fix the context ( entity ) to the pointer
        game.updateEntity(context.id, {
          update: function update(entity) {
            // console.log('sup dating', game.data.mouse.position)
            //entity.position.x = event.x;
            //entity.position.y = event.y;
            game.updateEntity(entity.id, {
              position: game.data.mouse.worldPosition
            });
          }
        });
      };
      entityData.pointermove = function (context, event) {
        // console.log("droppable.pointermove", context.size, context.position);

        // perform rbush search for context.position + range of context.size with small buffer
        var entsInFov = game.getPlayerFieldOfView(context, context.size.width, true);
        var selectedDropTarget = null;
        // go through all the entsInFov, pick the first which id is *not* context.id
        // and has a onDrop function
        // console.log(entsInFov)
        for (var i = 0; i < entsInFov.length; i++) {
          var ent = game.data.ents._[entsInFov[i].id];
          // console.log(ent)
          if (ent.id !== context.id && ent.onDrop && typeof ent.onDrop === 'function') {
            selectedDropTarget = ent;
            break;
          }
        }
        if (selectedDropTarget) {
          var _ent = game.data.ents._[selectedDropTarget.id];
          context.dropTarget = _ent;

          // TODO: add highlight to selectedDropTarget

          // iterate all other droppable entities and remove border
          var dropTargets = game.components.onDrop.data;
          // droppables is a map
          for (var key in dropTargets) {
            // let dropTarget = dropTargets[key.toString()];
            if (key.toString() !== _ent.id.toString()) {
              game.updateEntity(key, {
                style: {
                  border: 'none'
                }
              });
            }
          }
          game.updateEntity(_ent.id, {
            style: {
              border: '2px solid red'
            }
          });

          // console.log('selectedDropTarget', ent)
          context.dropTarget = _ent;
        }
      };
      entityData.pointerup = function (context, event) {
        // release the context ( entity ) from the pointer by clearing the update
        // TODO: this will remove all updates, we'll need to manage the wrapped fn.events array here
        //       it is already possible with current architecture, just need to implement it
        game.updateEntity(context.id, {
          update: null
        });
        if (context.dropTarget) {
          var ent = game.data.ents._[context.dropTarget.id];
          if (ent && typeof ent.onDrop === 'function') {
            ent.onDrop(context, event);
          }
        }
      };
      return _objectSpread(_objectSpread({}, entityData), {}, {
        meta: meta
      });
    }
  }]);
  return Droppable;
}();
_defineProperty(Droppable, "id", 'droppable');

},{}]},{},[1])(1)
});
