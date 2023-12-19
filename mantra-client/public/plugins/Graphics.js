(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Graphics = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// Graphics.js
var Graphics = /*#__PURE__*/function () {
  function Graphics() {
    _classCallCheck(this, Graphics);
    this.id = Graphics.id;
  }
  _createClass(Graphics, [{
    key: "init",
    value: function init(game) {
      this.game = game; // Store the reference to the game logic
      this.game.systemsManager.addSystem('graphics', this);
      this.game.createGraphic = this.createGraphic.bind(this);
      this.game.removeGraphic = this.removeGraphic.bind(this);
      this.game.updateGraphic = this.updateGraphic.bind(this);

      // Ensure the gameHolder div exists
      var gameHolder = document.getElementById('gameHolder');
      if (!gameHolder) {
        gameHolder = document.createElement('div');
        gameHolder.id = 'gameHolder';
        document.body.appendChild(gameHolder); // Append to the body or to a specific element as needed
      }
    }
  }, {
    key: "update",
    value: function update() {}

    // Remark: Graphics.createGraphic() currently isn't used as each Graphics Interface is responsible for creating its own graphics
    //         By iterating through game.entities Map in the interfaces .render() method
  }, {
    key: "createGraphic",
    value: function createGraphic(entityData) {
      var game = this.game;
      game.graphics.forEach(function (graphicsInterface) {
        // don't recreate same graphic if already exists on interface
        var ent = game.getEntity(entityData.id);
        // console.log(graphicsInterface.id, "CREATING FOR ENT", ent)
        if (ent && ent.graphics && ent.graphics[graphicsInterface.id]) {
          // console.log("WILL NOT CREATE ALREADY EXISTING GRAPHIC", entityData.id, graphicsInterface.id, ent.graphics[graphicsInterface.id])
          return;
        }
        var graphic = graphicsInterface.createGraphic(entityData);
        if (graphic) {
          // console.log("CREATING AND SETTING GRAPHIC", entityData.id, graphicsInterface.id, graphic)
          game.components.graphics.set([entityData.id, graphicsInterface.id], graphic);
        } else {
          // console.log("ERROR CREATING GRAPHIC", entityData.id, graphicsInterface.id, graphic)
        }
      });
    }
  }, {
    key: "removeGraphic",
    value: function removeGraphic(entityId) {
      var game = this.game;
      game.graphics.forEach(function (graphicsInterface) {
        graphicsInterface.removeGraphic(entityId);
      });
    }
  }, {
    key: "updateGraphic",
    value: function updateGraphic(entityData, alpha) {
      var game = this.game;
      game.graphics.forEach(function (graphicsInterface) {
        graphicsInterface.updateGraphic(entityData, alpha);
      });
    }
  }]);
  return Graphics;
}();
_defineProperty(Graphics, "id", 'graphics');
_defineProperty(Graphics, "removable", false);
var _default = exports["default"] = Graphics;
/*


function downloadCanvasAsImage(canvasElement, filename) {
    // Ensure a filename is provided
    filename = filename || 'canvas_image.png';

    // Create an image URL from the canvas
    const imageURL = canvasElement.toDataURL("image/png").replace("image/png", "image/octet-stream");

    // Create a temporary link element and trigger the download
    let downloadLink = document.createElement('a');
    downloadLink.href = imageURL;
    downloadLink.download = filename;

    // Append the link to the body, click it, and then remove it
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}


*/

},{}]},{},[1])(1)
});
