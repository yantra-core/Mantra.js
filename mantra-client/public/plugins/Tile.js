(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Tile = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defaultOrthogonalMap = _interopRequireDefault(require("./maps/defaultOrthogonalMap.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // Tile.js - Marak Squires 2023
// Implements support for Tiled JSON maps via the Tiled JSON format
// see: https://doc.mapeditor.org/en/stable/reference/json-map-format/
var tilemap = {
  1: 'block',
  2: 'grass',
  3: 'water'
};
var Tile = /*#__PURE__*/function () {
  function Tile(game) {
    _classCallCheck(this, Tile);
    this.game = game; // Store the reference to the game logic
    this.id = Tile.id;
  }
  _createClass(Tile, [{
    key: "init",
    value: function init(game) {
      this.game = game;

      // console.log('Tile.init()');
      var defaultTileSet = _defaultOrthogonalMap["default"];
      var that = this;
      setTimeout(function () {
        that.createTileMapFromTiledJSON(defaultTileSet);
      }, 222);
    }
  }, {
    key: "createTileMapFromTiledJSON",
    value: function createTileMapFromTiledJSON(tiledJSON) {
      var _this = this;
      // Assuming the JSON data is already parsed into a JavaScript object
      var mapData = tiledJSON;

      // Create a container for the map
      var mapContainer = document.createElement('div');
      mapContainer.style.position = 'relative';
      mapContainer.style.width = mapData.width * mapData.tilewidth + 'px';
      mapContainer.style.height = mapData.height * mapData.tileheight + 'px';

      // Process each layer
      mapData.layers.forEach(function (layer) {
        // Only process if it's a tile layer
        if (layer.type === 'tilelayer') {
          _this.createLayer(mapContainer, layer, mapData.tilewidth, mapData.tileheight);
        }
      });

      // Append the map container to the body or a specific element
      document.body.appendChild(mapContainer);
    }
  }, {
    key: "createLayer",
    value: function createLayer(container, layer, tileWidth, tileHeight) {
      var _this2 = this;
      layer.data.forEach(function (tileId, index) {
        if (tileId !== 0 && tileId !== 2) {
          // for now
          var scale = 1;
          scale = 1;
          // console.log('cccc', tileId, index)

          var x = index % layer.width * tileWidth;
          var y = Math.floor(index / layer.width) * tileHeight;
          var z = -10;

          // these x y assume 0,0, shift the coords to center since map goes negative
          x = x - layer.width * tileWidth / 2;
          y = y - layer.height * tileHeight / 2;
          var height = tileHeight;
          var width = tileWidth;

          // apply scale
          x = x * scale;
          y = y * scale;
          height = height * scale;
          width = width * scale;
          var body = false;
          var isStatic = true;
          var mass = 1;
          z = -1;
          if (tileId === 1) {
            body = true;
            mass = 5000;
            isStatic = false;
            z = 0;
          }

          // console.log("placing at", x, y)
          var ent = _this2.game.createEntity({
            // id: 'tile' + index,
            type: 'BLOCK',
            kind: 'Tile',
            // for now
            body: body,
            mass: mass,
            isStatic: isStatic,
            style: {
              cursor: 'pointer'
            },
            position: {
              x: x,
              y: y,
              z: z
            },
            friction: 1,
            frictionAir: 1,
            frictionStatic: 1,
            // color: 0x00ff00,
            texture: 'tile-' + tilemap[tileId],
            // Remark: we could support path'd textures here; however some engines,
            // like Phaser require we preload the textures before we can use them
            // this can be solved by adding a formalized asset preloader to the game
            // texture: 'img/game/tiles/' + tileId + '.png',
            width: width,
            height: height,
            depth: width
            // depth: width
            // tileId: tileId
          });
          // console.log("ent", ent)
          /*
          const tile = document.createElement('div');
          tile.style.width = tileWidth + 'px';
          tile.style.height = tileHeight + 'px';
          tile.style.position = 'absolute';
          tile.style.left = (index % layer.width) * tileWidth + 'px';
          tile.style.top = Math.floor(index / layer.width) * tileHeight + 'px';
           // Apply background image based on tileId - this needs a mapping from tileId to image
          // For simplicity, let's assume a function getTileImageURL(tileId) that returns the image URL
          tile.style.backgroundImage = `url('${this.getTileImageURL(tileId)}')`;
           container.appendChild(tile);
          */
        }
      });
    }
  }, {
    key: "getTileImageURL",
    value: function getTileImageURL(tileId) {
      // Placeholder function: implement mapping of tileId to actual image URLs
      // For example, return 'path/to/image' + tileId + '.png';
      return 'img/game/tiles/' + tileId + '.png';
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
  return Tile;
}();
_defineProperty(Tile, "id", 'tile');
var _default = exports["default"] = Tile;

},{"./maps/defaultOrthogonalMap.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Test map for orthogonal tilemap
var defaultOrthogonalMap = {
  "compressionlevel": -1,
  "height": 20,
  "infinite": false,
  "layers": [{
    "data": [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    "height": 20,
    "id": 1,
    "name": "Tile Layer 1",
    "opacity": 1,
    "type": "tilelayer",
    "visible": true,
    "width": 30,
    "x": 0,
    "y": 0
  }],
  "nextlayerid": 2,
  "nextobjectid": 1,
  "orientation": "orthogonal",
  "renderorder": "right-down",
  "tiledversion": "1.10.2",
  "tileheight": 16,
  "tilesets": [{
    "firstgid": 1,
    "source": "grass-land.tsx"
  }],
  "tilewidth": 16,
  "type": "map",
  "version": "1.10",
  "width": 30
};
var _default = exports["default"] = defaultOrthogonalMap;

},{}]},{},[1])(1)
});
