(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Tile = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defaultOrthogonalMap = _interopRequireDefault(require("./maps/defaultOrthogonalMap.js"));
var _getChunkFiles = _interopRequireDefault(require("./lib/getChunkFiles.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } //import mediumOrthogonalMap from './maps/mediumOrthogonalMap.js';
//import largeOrthogonalMap from './maps/largeOrthogonalMap.js';
// TODO: mantra-tiled-server needs to be a package.json
var tilemap = {
  1: 'grass',
  2: 'grass',
  3: 'grass'
};
var tileTypes = [{
  id: 1,
  weight: 50
},
// 50% chance
{
  id: 2,
  weight: 10,
  body: true
},
// 10% chance
{
  id: 3,
  weight: 40
} // 20% chance
];
var Tile = /*#__PURE__*/function () {
  function Tile() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$tileMap = _ref.tileMap,
      tileMap = _ref$tileMap === void 0 ? _defaultOrthogonalMap["default"] : _ref$tileMap,
      _ref$tiledServer = _ref.tiledServer,
      tiledServer = _ref$tiledServer === void 0 ? false : _ref$tiledServer,
      _ref$chunkUnitSize = _ref.chunkUnitSize,
      chunkUnitSize = _ref$chunkUnitSize === void 0 ? 128 : _ref$chunkUnitSize,
      _ref$tileSize = _ref.tileSize,
      tileSize = _ref$tileSize === void 0 ? 16 : _ref$tileSize,
      _ref$proceduralGenera = _ref.proceduralGenerateMissingChunks,
      proceduralGenerateMissingChunks = _ref$proceduralGenera === void 0 ? false : _ref$proceduralGenera;
    _classCallCheck(this, Tile);
    this.id = Tile.id;

    // set a default tile map
    this.tileMap = tileMap;

    // TODO: configurable chunk size and tile size
    this.chunkUnitSize = chunkUnitSize;
    this.tileSize = tileSize;
    this.chunkPixelSize = this.chunkUnitSize * this.tileSize;
    this.loadingStates = {}; // Track the state of loadScript calls
    this.maxRetries = 3; // Set the maximum number of retries for a given URL

    // tiledServer is a boolean flag to indicate if we are using mantra-tiled-server
    // tile chunks will be loaded on demand based on the mantra-tiled-server specs
    this.tiledServer = tiledServer;

    // if true, will load tiles on demand based on mantra-tiled-server specs
    this.lazyLoadTiles = false;

    // if true, will generate random chunks for missing chunks not found by mantra-tiled-server
    this.proceduralGenerateMissingChunks = proceduralGenerateMissingChunks;

    // list of tile ids for random generation
    this.tileIds = [1, 2, 3, 4];
  }
  _createClass(Tile, [{
    key: "init",
    value: function init(game) {
      var _this = this;
      this.game = game;
      this.game.addSystem('tile', this);
      if (this.tiledServer) {
        this.game.loadScripts(['/tiled/chunks/chunk_x0_y0.js'], function () {
          // query the default tiled chunk location for chunk chunk_x0_y0
          // this file will exist in ./tiled/chunks/chunk_x0_y0.js
          // we can simply inject this remote .js file from the CDN into the client
          // and the game.data.chunks scope will be populated with the chunk data
          console.log('this.game.data.chunks.chunk_x0_y0', _this.game.data.chunks.chunk_x0_y0.data.length);
          _this.createLayer(_this.game.data.chunks.chunk_x0_y0, _this.tileSize, _this.tileSize);
        });
      } else {
        this.createTileMapFromTiledJSON(this.tileMap);
        //setTimeout(() => this.createTileMapFromTiledJSON(defaultOrthogonalMap), 222);
        //setTimeout(() => this.createTileMapFromTiledJSON(mediumOrthogonalMap), 222);
        //setTimeout(() => this.createTileMapFromTiledJSON(largeOrthogonalMap), 222);
      }
    }
  }, {
    key: "createTile",
    value: function createTile(tile, x, y, z, tileWidth, tileHeight, color) {
      var tileId = tile.id;

      // TODO: better tile config by kind
      // for now
      z = -16;
      var scale = 1;
      var body = false;
      var isStatic;
      var mass;

      /*
      if (tile.body) {
        body = true;
        isStatic = false;
        mass = 1;
      }
      */

      var _color;
      if (color) {
        _color = color;
      }
      // body = false;
      var _texture = "tile-".concat(tilemap[tileId]);
      this.game.createEntity({
        type: 'BLOCK',
        kind: 'Tile',
        body: body,
        mass: mass,
        isStatic: isStatic,
        style: {
          cursor: 'pointer'
        },
        position: {
          x: x * scale,
          y: y * scale,
          z: z
        },
        friction: 1,
        frictionAir: 1,
        frictionStatic: 1,
        texture: _texture,
        color: _color,
        width: tileWidth * scale,
        height: tileHeight * scale,
        depth: tileWidth * scale
      });
    }
  }, {
    key: "createTileMapFromTiledJSON",
    value: function createTileMapFromTiledJSON(tiledJSON) {
      var _this2 = this;
      tiledJSON.layers.forEach(function (layer) {
        if (layer.type === 'tilelayer') {
          _this2.createLayer(layer, tiledJSON.tilewidth, tiledJSON.tileheight);
        }
      });
    }
  }, {
    key: "createLayer",
    value: function createLayer(layer, tileWidth, tileHeight) {
      var _this3 = this;
      layer.data.forEach(function (tile, index) {
        if (typeof tile === 'number') {
          tile = {
            id: tile
          };
        }
        //if (tileId !== 0 && /* tileId !== 2 && */ tileId !== 4577 && tileId !== 4767) {
        var _this3$calculateTileP = _this3.calculateTilePosition(index, layer, tileWidth, tileHeight, tile.id),
          x = _this3$calculateTileP.x,
          y = _this3$calculateTileP.y,
          z = _this3$calculateTileP.z;
        _this3.createTile(tile, x, y, z, tileWidth, tileHeight, layer.color);
        //}
      });
    }
  }, {
    key: "calculateTilePosition",
    value: function calculateTilePosition(index, layer, tileWidth, tileHeight, tileId) {
      // Calculate the tile's local position within the layer (relative to the layer's top-left corner)
      var localX = index % layer.width * tileWidth;
      var localY = Math.floor(index / layer.width) * tileHeight;

      // Calculate the center of the layer in pixel coordinates
      var layerCenterX = layer.width * tileWidth / 2;
      var layerCenterY = layer.height * tileHeight / 2;

      // Convert local positions to pixel values and add the layer's offset
      // Adjusted to start from the center (0,0)
      var mapX = localX - layerCenterX + layer.x * tileWidth;
      var mapY = localY - layerCenterY + layer.y * tileHeight;

      // Calculate the absolute position of the tile in the game world
      var x = mapX;
      var y = mapY;
      var z = tileId === 1 ? 0 : -1; // Adjust z based on your game's logic

      return {
        x: x,
        y: y,
        z: z
      };
    }
  }, {
    key: "getTileImageURL",
    value: function getTileImageURL(tileId) {
      return "img/game/tiles/".concat(tileId, ".png");
    }
  }, {
    key: "loadChunk",
    value: function loadChunk(chunkPath, chunkKey) {
      var _this4 = this;
      // console.log("load chunk", chunkPath, chunkKey)

      if (!this.loadingStates[chunkPath]) {
        this.loadingStates[chunkPath] = {
          attempts: 0,
          loading: false
        };
      }
      var state = this.loadingStates[chunkPath];
      if (!state.loading && state.attempts < this.maxRetries) {
        state.loading = true;
        state.attempts++;
        console.log("Attempting to load tile chunk", chunkPath);
        this.game.loadScripts([chunkPath], function (err) {
          // console.log("Loaded tile chunk", chunkKey);
          state.loading = false;
          if (_this4.game.data.chunks[chunkKey]) {
            _this4.game.systems.tile.createLayer(_this4.game.data.chunks[chunkKey], _this4.tileSize, _this4.tileSize);
          } else {
            console.log("WARNING: chunk not found", chunkKey);
            _this4.handleLoadFailure(chunkPath, chunkKey); // Handle the failure case
          }
        });
      } else if (state.attempts >= this.maxRetries) {
        // console.log("MAX RETRIES REACHED FOR", chunkPath);
        this.handleLoadFailure(chunkPath, chunkKey); // Handle the failure case
      }
    }
  }, {
    key: "handleLoadFailure",
    value: function handleLoadFailure(chunkPath, chunkKey) {
      //console.log("Fallback for failed load:", chunkPath, chunkKey);
      // Call the procedural generation function
      if (this.proceduralGenerateMissingChunks) {
        console.log('Generating random chunk', chunkKey);
        var randomChunk = this.generateRandomChunk(chunkKey, tileTypes);
        // console.log('randomChunk', chunkKey, randomChunk.data.length)
        this.game.data.chunks[chunkKey] = randomChunk;
        this.game.systems.tile.createLayer(this.game.data.chunks[chunkKey], this.tileSize, this.tileSize);
      }
    }
  }, {
    key: "generateRandomChunk",
    value: function generateRandomChunk(chunkKey, tileTypes) {
      var chunkData = [];
      var totalWeight = tileTypes.reduce(function (acc, tileType) {
        return acc + tileType.weight;
      }, 0);
      for (var i = 0; i < this.chunkUnitSize * this.chunkUnitSize; i++) {
        var tile = this.randomTileFromDistribution(tileTypes, totalWeight);
        chunkData.push(tile);
      }
      var randomIntColor = Math.floor(Math.random() * 16777215);
      return {
        data: chunkData,
        height: this.chunkUnitSize,
        width: this.chunkUnitSize,
        color: randomIntColor,
        x: this.extractChunkCoordinates(chunkKey).x,
        y: this.extractChunkCoordinates(chunkKey).y
      };
    }
  }, {
    key: "randomTileFromDistribution",
    value: function randomTileFromDistribution(tileIds) {
      var randomIndex = Math.floor(Math.pow(Math.random(), 2) * tileIds.length);
      return tileIds[randomIndex];
    }
  }, {
    key: "extractChunkCoordinates",
    value: function extractChunkCoordinates(chunkKey) {
      // Extracts x and y coordinates from the chunk key
      var match = chunkKey.match(/chunk_x(-?\d+)_y(-?\d+)/);
      return match ? {
        x: parseInt(match[1]),
        y: parseInt(match[2])
      } : {
        x: 0,
        y: 0
      };
    }
  }, {
    key: "loadTilesForArea",
    value: function loadTilesForArea(position) {
      var _this5 = this;
      if (!this.tiledServer) return;
      var outputDir = '/tiled/chunks/'; // Set the base directory for the chunks
      var result = (0, _getChunkFiles["default"])(position, this.chunkUnitSize, outputDir, 2);
      // console.log("getChunkFiles result", position, result);

      result.forEach(function (chunkName) {
        // Extract the chunk key from the chunk file name
        var chunkKey = chunkName.replace('.js', '').replace(outputDir, '');
        // Load the chunk if it's not already loaded
        if (typeof _this5.game.data.chunks[chunkKey] === 'undefined') {
          // console.log("loadTilesForArea", position, this.chunkUnitSize);
          var chunkPath = chunkName; // Since the directory is already included in chunkName
          _this5.loadChunk(chunkPath, chunkKey);
        }
      });
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

},{"./lib/getChunkFiles.js":2,"./maps/defaultOrthogonalMap.js":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getChunkFiles;
function getChunkFiles(playerPosition, gridSize, outputDir) {
  var buffer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var chunkFiles = [];

  // Calculate the base chunk coordinates based on the player's position
  // The Math.round function is used to handle both positive and negative coordinates correctly
  var baseChunkX = Math.round(playerPosition.x / (gridSize * 16)) * gridSize;
  var baseChunkY = Math.round(playerPosition.y / (gridSize * 16)) * gridSize;

  // Loop through the buffer range to include surrounding chunks
  for (var x = -buffer; x <= buffer; x++) {
    for (var y = -buffer; y <= buffer; y++) {
      var chunkX = baseChunkX + x * gridSize;
      var chunkY = baseChunkY + y * gridSize;
      var fileName = "chunk_x".concat(chunkX, "_y").concat(chunkY, ".js");
      var filePath = pathJoin(outputDir, fileName);
      chunkFiles.push(filePath);
    }
  }
  return chunkFiles;
}
function pathJoin(dir, file) {
  // Ensure there is a slash between the dir and file parts
  if (dir.endsWith('/')) {
    return dir + file;
  } else {
    return dir + '/' + file;
  }
}

},{}],3:[function(require,module,exports){
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
