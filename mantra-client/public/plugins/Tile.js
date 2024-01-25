(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Tile = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
var Tile = exports["default"] = /*#__PURE__*/_createClass(function Tile(type) {
  _classCallCheck(this, Tile);
  this.type = type; // Integer representing the tile type
});

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mersenne = _interopRequireDefault(require("./util/mersenne.js"));
var _generateTiledJSON = _interopRequireDefault(require("./util/generateTiledJSON.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // Randomness
var TileMap = exports["default"] = /*#__PURE__*/function () {
  function TileMap() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$x = _ref.x,
      x = _ref$x === void 0 ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === void 0 ? 0 : _ref$y,
      width = _ref.width,
      height = _ref.height,
      depth = _ref.depth,
      tileWidth = _ref.tileWidth,
      tileHeight = _ref.tileHeight,
      _ref$is3D = _ref.is3D,
      is3D = _ref$is3D === void 0 ? false : _ref$is3D;
    _classCallCheck(this, TileMap);
    this.x = x;
    this.y = y;
    // this.z = 0;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.is3D = is3D;
    this.mersenneTwister = new _mersenne["default"]();
    this.data = this.initializeDataArray({
      width: width,
      height: height,
      is3D: is3D
    });

    // ASCII representations for tiles 0-10
    // TODO: Is there a better default set of ASCII characters we can use?
    this.defaultRogueLike = ['-', '#', '+', '0', '<', '>', '$', '#', '@', '&', '?'];
  }
  _createClass(TileMap, [{
    key: "initializeDataArray",
    value: function initializeDataArray() {
      // Create a single-dimensional array
      var data;
      if (this.is3D) {
        data = init3DArray(this.width, this.height, this.depth);
      } else {
        data = init2DArray(this.width, this.height);
      }
      return data;
    }
  }, {
    key: "fill",
    value: function fill(value) {
      if (this.is3D) {
        for (var z = 0; z < this.depth; z++) {
          //  this.fill2D(value, z);
        }
      } else {
        this.fill2D(value);
      }
    }
  }, {
    key: "fill2D",
    value: function fill2D(value) {
      for (var i = 0; i < this.height * this.width; i++) {
        this.data[i] = value;
      }
    }
  }, {
    key: "random",
    value: function random(max) {
      return this.mersenneTwister.rand(max);
    }
  }, {
    key: "seed",
    value: function seed(value) {
      this.mersenneTwister.seed(value);
      // this.mersenneTwister.seed_array([value]); // also can seed from arrays
    }
  }, {
    key: "use",
    value: function use(subMap, offsetX, offsetY) {
      // TODO: add support for if(this.is3D) support
      for (var y = 0; y < subMap.height; y++) {
        for (var x = 0; x < subMap.width; x++) {
          var targetX = x + offsetX;
          var targetY = y + offsetY;
          if (targetX < this.width && targetY < this.height) {
            this.data[targetY * this.width + targetX] = subMap.data[y * subMap.width + x];
          }
        }
      }
    }
  }, {
    key: "scaleToTileRange",
    value: function scaleToTileRange(tileSetRange) {
      var heightMap = this.data;
      var max = Math.max.apply(Math, _toConsumableArray(heightMap));
      var min = Math.min.apply(Math, _toConsumableArray(heightMap));
      var range = tileSetRange - 1; // Adjust for zero index

      for (var i = 0; i < heightMap.length; i++) {
        var normalizedHeight = (heightMap[i] - min) / (max - min);
        this.data[i] = Math.round(normalizedHeight * range) + 1; // +1 to adjust range
      }
    }
  }, {
    key: "mask",
    value: function mask(format) {
      var asciiLookup = format || this.defaultRogueLike;
      var asciiMap = '';
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          var tile = this.data[y * this.width + x];
          asciiMap += asciiLookup[tile % asciiLookup.length]; // Use modulo to wrap around if tile index exceeds lookup table
        }

        asciiMap += '\n'; // New line at the end of each row
      }

      return asciiMap;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return JSON.stringify({
        width: this.width,
        height: this.height,
        tileWidth: this.tileWidth,
        tileHeight: this.tileHeight,
        is3D: this.is3D,
        data: this.data
      }, null, 2);
    }
  }, {
    key: "toTiledJSON",
    value: function toTiledJSON() {
      return (0, _generateTiledJSON["default"])(this);
    }
  }]);
  return TileMap;
}();
function init2DArray(width, height) {
  // Create a single-dimensional array
  return new Array(width * height).fill(0); // Fill with default tile type, e.g., 0
}

function init3DArray(width, height, depth) {
  var arr = [];
  for (var z = 0; z < depth; z++) {
    arr.push(init2DArray(width, height));
  }
  return arr;
}

},{"./util/generateTiledJSON.js":10,"./util/mersenne.js":11}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Tile = _interopRequireDefault(require("./Tile.js"));
var _TileMap = _interopRequireDefault(require("./TileMap.js"));
var _RecursiveBacktrack = _interopRequireDefault(require("./mazes/RecursiveBacktrack.js"));
var _RecursiveDivision = _interopRequireDefault(require("./mazes/RecursiveDivision.js"));
var _SpiralBacktrack = _interopRequireDefault(require("./mazes/SpiralBacktrack.js"));
var _DiamondSquare = _interopRequireDefault(require("./terrains/DiamondSquare.js"));
var _FaultLine = _interopRequireDefault(require("./terrains/FaultLine.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Mazes

// Biomes

// Terrains
// https://en.wikipedia.org/wiki/Diamond-square_algorithm
var labyrinthos = {};
labyrinthos.mazes = {};
labyrinthos.mazes.RecursiveBacktrack = _RecursiveBacktrack["default"];
labyrinthos.mazes.RecursiveDivision = _RecursiveDivision["default"];
labyrinthos.mazes.SpiralBacktrack = _SpiralBacktrack["default"];
labyrinthos.terrains = {};
// labyrinthos.terrains.DiamondSquare = DiamondSquare;
labyrinthos.terrains.FaultLine = _FaultLine["default"];
labyrinthos.Tile = _Tile["default"];
labyrinthos.TileMap = _TileMap["default"];
var _default = exports["default"] = labyrinthos;

},{"./Tile.js":1,"./TileMap.js":2,"./mazes/RecursiveBacktrack.js":4,"./mazes/RecursiveDivision.js":5,"./mazes/SpiralBacktrack.js":6,"./terrains/DiamondSquare.js":7,"./terrains/FaultLine.js":8}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateMap;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function generateMap(tileMap, options) {
  var stack = [];
  var visited = Array.from({
    length: tileMap.height
  }, function () {
    return Array(tileMap.width).fill(false);
  });
  var visitCell = function visitCell(x, y) {
    visited[y][x] = true;
    stack.push([x, y]);
    while (stack.length > 0) {
      var _stack = _slicedToArray(stack[stack.length - 1], 2),
        cx = _stack[0],
        cy = _stack[1];
      var neighbors = getNeighbors(cx, cy);
      if (neighbors.length > 0) {
        var _neighbors$Math$floor = _slicedToArray(neighbors[Math.floor(tileMap.random(neighbors.length))], 2),
          nx = _neighbors$Math$floor[0],
          ny = _neighbors$Math$floor[1];
        removeWall(cx, cy, nx, ny);
        visited[ny][nx] = true;
        stack.push([nx, ny]);
      } else {
        stack.pop();
      }
    }
  };
  var getNeighbors = function getNeighbors(x, y) {
    var neighbors = [];
    if (x > 0 && !visited[y][x - 1]) neighbors.push([x - 1, y]);
    if (y > 0 && !visited[y - 1][x]) neighbors.push([x, y - 1]);
    if (x < tileMap.width - 1 && !visited[y][x + 1]) neighbors.push([x + 1, y]);
    if (y < tileMap.height - 1 && !visited[y + 1][x]) neighbors.push([x, y + 1]);
    return neighbors;
  };
  var removeWall = function removeWall(x, y, nx, ny) {
    var index1 = y * tileMap.width + x;
    var index2 = ny * tileMap.width + nx;
    tileMap.data[Math.min(index1, index2)] = 0; // Assuming 1 is a wall and 0 is an open path
  };

  // Start from a random cell
  var startX = Math.floor(tileMap.random(tileMap.width));
  var startY = Math.floor(tileMap.random(tileMap.height));
  visitCell(startX, startY);
}

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateRecursiveDivisionMap;
// RecursiveDivision.js - Marak Squires 2024
function generateRecursiveDivisionMap(tileMap, options) {
  var floorTileId = 1; // TODO: change to 0
  var wallTileId = 0; // TODO: change to 1

  tileMap.data.fill(floorTileId);
  var addWalls = function addWalls(x1, y1, x2, y2) {
    if (x2 - x1 < 2 || y2 - y1 < 2) return;
    var horizontal = x2 - x1 < y2 - y1;
    var wx = horizontal ? x1 : Math.floor(tileMap.random(x2 - x1 - 2)) + x1 + 1;
    var wy = horizontal ? Math.floor(tileMap.random(y2 - y1 - 2)) + y1 + 1 : y1;
    var px = horizontal ? Math.floor(tileMap.random(x2 - x1)) + x1 : wx;
    var py = horizontal ? wy : Math.floor(tileMap.random(y2 - y1)) + y1;
    for (var x = x1; x < x2; x++) {
      for (var y = y1; y < y2; y++) {
        if (horizontal && x === wx && y !== py || !horizontal && y === wy && x !== px) {
          tileMap.data[y * tileMap.width + x] = wallTileId;
        }
      }
    }
    if (horizontal) {
      addWalls(x1, y1, x2, wy);
      addWalls(x1, wy, x2, y2);
    } else {
      addWalls(x1, y1, wx, y2);
      addWalls(wx, y1, x2, y2);
    }
  };
  addWalls(0, 0, tileMap.width, tileMap.height);
}

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateSpiralMap;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function generateSpiralMap(tileMap, options) {
  var stack = [];
  var visited = Array.from({
    length: tileMap.height
  }, function () {
    return Array(tileMap.width).fill(false);
  });
  var directionOrder = ['right', 'down', 'left', 'up']; // Initial direction order for spiral movement

  var visitCell = function visitCell(x, y) {
    visited[y][x] = true;
    stack.push([x, y]);
    while (stack.length > 0) {
      var _stack = _slicedToArray(stack[stack.length - 1], 2),
        cx = _stack[0],
        cy = _stack[1];
      var neighbors = getSpiralNeighbors(cx, cy, directionOrder);
      if (neighbors.length > 0) {
        var _neighbors$ = _slicedToArray(neighbors[0], 2),
          nx = _neighbors$[0],
          ny = _neighbors$[1]; // Always select the first neighbor in the spiral direction
        removeWall(cx, cy, nx, ny);
        visited[ny][nx] = true;
        stack.push([nx, ny]);
      } else {
        stack.pop();
        directionOrder = rotateDirectionOrder(directionOrder); // Rotate direction order for the next cell
      }
    }
  };

  var getSpiralNeighbors = function getSpiralNeighbors(x, y, directionOrder) {
    var neighborDirections = {
      'right': [x + 1, y],
      'down': [x, y + 1],
      'left': [x - 1, y],
      'up': [x, y - 1]
    };
    return directionOrder.map(function (dir) {
      return neighborDirections[dir];
    }).filter(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        nx = _ref2[0],
        ny = _ref2[1];
      return nx >= 0 && nx < tileMap.width && ny >= 0 && ny < tileMap.height && !visited[ny][nx];
    });
  };
  var rotateDirectionOrder = function rotateDirectionOrder(order) {
    // Rotate the direction order to change the spiral direction
    return order.concat(order.shift());
  };
  var removeWall = function removeWall(x, y, nx, ny) {
    var index1 = y * tileMap.width + x;
    var index2 = ny * tileMap.width + nx;
    tileMap.data[Math.min(index1, index2)] = 0;
  };

  // Start from a random cell
  // Start from a random cell using tileMap.random()
  var startX = Math.floor(tileMap.random(tileMap.width));
  var startY = Math.floor(tileMap.random(tileMap.height));
  visitCell(startX, startY);
  //  visitCell(Math.floor(Math.random() * tileMap.width), Math.floor(Math.random() * tileMap.height));
}

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateDiamondSquareMap;
// TODO: WIP - wasn't quite working right

function generateDiamondSquareMap(tileMap, options) {
  // Adjust size for the algorithm
  var size = Math.max(tileMap.width, tileMap.height) - 1;
  var roughness = options.roughness || 0.5;
  var data = diamondSquare(size, roughness);

  // Flatten the 2D array into the tileMap.data single-dimensional array
  for (var x = 0; x < tileMap.width; x++) {
    for (var y = 0; y < tileMap.height; y++) {
      tileMap.data[y * tileMap.width + x] = data[y][x];
    }
  }
}
function diamondSquare(size, roughness) {
  var data = create2DArray(size + 1, size + 1);
  var max = size - 1;
  var h = roughness;

  // Initial corner values
  data[0][0] = data[0][max] = data[max][0] = data[max][max] = 0.5;
  for (var sideLength = max; sideLength >= 2; sideLength /= 2, h /= 2.0) {
    var halfSide = Math.round(sideLength / 2);

    // Square steps
    for (var x = 0; x < max; x += sideLength) {
      for (var y = 0; y < max; y += sideLength) {
        var avg = average([data[x][y], data[(x + sideLength) % (max + 1)][y], data[x][(y + sideLength) % (max + 1)], data[(x + sideLength) % (max + 1)][(y + sideLength) % (max + 1)]]);
        data[(x + halfSide) % (max + 1)][(y + halfSide) % (max + 1)] = avg + Math.random() * 2 * h - h;
      }
    }

    // Diamond steps
    // ... same as before ...
  }

  return data;
}
function average(values) {
  var valid = values.filter(function (val) {
    return val !== undefined;
  });
  var sum = valid.reduce(function (a, b) {
    return a + b;
  }, 0);
  return sum / valid.length;
}

// ... rest of your existing code ...

function create2DArray(width, height) {
  var arr = new Array(height);
  for (var i = 0; i < height; i++) {
    arr[i] = new Array(width).fill(0);
  }
  return arr;
}

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateFaultLineMap;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function generateFaultLineMap(tileMap, options) {
  var iterations = options.iterations || 100;
  var heightIncrease = options.heightIncrease || 0.01;

  // Initialize the height map
  var heightMap = new Array(tileMap.width * tileMap.height).fill(0);
  for (var i = 0; i < iterations; i++) {
    // Randomly create a fault line using tileMap.random()
    var a = tileMap.random() - 0.5;
    var b = tileMap.random() - 0.5;
    var d = tileMap.random();

    // Adjust the height on one side of the fault line
    for (var y = 0; y < tileMap.height; y++) {
      for (var x = 0; x < tileMap.width; x++) {
        if (a * x + b * y - d > 0) {
          heightMap[y * tileMap.width + x] += heightIncrease;
        }
      }
    }
  }

  // Normalize and apply to tileMap
  applyHeightToTileMap(tileMap, heightMap);
}
function applyHeightToTileMap(tileMap, heightMap) {
  var max = Math.max.apply(Math, _toConsumableArray(heightMap));
  var min = Math.min.apply(Math, _toConsumableArray(heightMap));
  for (var i = 0; i < heightMap.length; i++) {
    // Normalize the height values
    var normalizedHeight = (heightMap[i] - min) / (max - min);
    tileMap.data[i] = normalizedHeight;
  }
}

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// this program is a JavaScript version of Mersenne Twister, with concealment and encapsulation in class,
// an almost straight conversion from the original program, mt19937ar.c,
// translated by y. okada on July 17, 2006.
// and modified a little at july 20, 2006, but there are not any substantial differences.
// in this program, procedure descriptions and comments of original source code were not removed.
// lines commented with //c// were originally descriptions of c procedure. and a few following lines are appropriate JavaScript descriptions.
// lines commented with /* and */ are original comments.
// lines commented with // are additional comments in this JavaScript version.
// before using this version, create at least one instance of MersenneTwister19937 class, and initialize the each state, given below in c comments, of all the instances.
/*
   A C-program for MT19937, with initialization improved 2002/1/26.
   Coded by Takuji Nishimura and Makoto Matsumoto.

   Before using, initialize the state by using init_genrand(seed)
   or init_by_array(init_key, key_length).

   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:

     1. Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.

     2. Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.

     3. The names of its contributors may not be used to endorse or promote
        products derived from this software without specific prior written
        permission.

   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


   Any feedback is very welcome.
   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
*/

function MersenneTwister19937() {
  /* constants should be scoped inside the class */
  var N, M, MATRIX_A, UPPER_MASK, LOWER_MASK;
  /* Period parameters */
  //c//#define N 624
  //c//#define M 397
  //c//#define MATRIX_A 0x9908b0dfUL   /* constant vector a */
  //c//#define UPPER_MASK 0x80000000UL /* most significant w-r bits */
  //c//#define LOWER_MASK 0x7fffffffUL /* least significant r bits */
  N = 624;
  M = 397;
  MATRIX_A = 0x9908b0df; /* constant vector a */
  UPPER_MASK = 0x80000000; /* most significant w-r bits */
  LOWER_MASK = 0x7fffffff; /* least significant r bits */
  //c//static unsigned long mt[N]; /* the array for the state vector  */
  //c//static int mti=N+1; /* mti==N+1 means mt[N] is not initialized */
  var mt = new Array(N); /* the array for the state vector  */
  var mti = N + 1; /* mti==N+1 means mt[N] is not initialized */

  function unsigned32(n1)
  // returns a 32-bits unsiged integer from an operand to which applied a bit operator.
  {
    return n1 < 0 ? (n1 ^ UPPER_MASK) + UPPER_MASK : n1;
  }
  function subtraction32(n1, n2)
  // emulates lowerflow of a c 32-bits unsiged integer variable, instead of the operator -. these both arguments must be non-negative integers expressible using unsigned 32 bits.
  {
    return n1 < n2 ? unsigned32(0x100000000 - (n2 - n1) & 0xffffffff) : n1 - n2;
  }
  function addition32(n1, n2)
  // emulates overflow of a c 32-bits unsiged integer variable, instead of the operator +. these both arguments must be non-negative integers expressible using unsigned 32 bits.
  {
    return unsigned32(n1 + n2 & 0xffffffff);
  }
  function multiplication32(n1, n2)
  // emulates overflow of a c 32-bits unsiged integer variable, instead of the operator *. these both arguments must be non-negative integers expressible using unsigned 32 bits.
  {
    var sum = 0;
    for (var i = 0; i < 32; ++i) {
      if (n1 >>> i & 0x1) {
        sum = addition32(sum, unsigned32(n2 << i));
      }
    }
    return sum;
  }

  /* initializes mt[N] with a seed */
  //c//void init_genrand(unsigned long s)
  this.init_genrand = function (s) {
    //c//mt[0]= s & 0xffffffff;
    mt[0] = unsigned32(s & 0xffffffff);
    for (mti = 1; mti < N; mti++) {
      mt[mti] =
      //c//(1812433253 * (mt[mti-1] ^ (mt[mti-1] >> 30)) + mti);
      addition32(multiplication32(1812433253, unsigned32(mt[mti - 1] ^ mt[mti - 1] >>> 30)), mti);
      /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
      /* In the previous versions, MSBs of the seed affect   */
      /* only MSBs of the array mt[].                        */
      /* 2002/01/09 modified by Makoto Matsumoto             */
      //c//mt[mti] &= 0xffffffff;
      mt[mti] = unsigned32(mt[mti] & 0xffffffff);
      /* for >32 bit machines */
    }
  };

  /* initialize by an array with array-length */
  /* init_key is the array for initializing keys */
  /* key_length is its length */
  /* slight change for C++, 2004/2/26 */
  //c//void init_by_array(unsigned long init_key[], int key_length)
  this.init_by_array = function (init_key, key_length) {
    //c//int i, j, k;
    var i, j, k;
    //c//init_genrand(19650218);
    this.init_genrand(19650218);
    i = 1;
    j = 0;
    k = N > key_length ? N : key_length;
    for (; k; k--) {
      //c//mt[i] = (mt[i] ^ ((mt[i-1] ^ (mt[i-1] >> 30)) * 1664525))
      //c//	+ init_key[j] + j; /* non linear */
      mt[i] = addition32(addition32(unsigned32(mt[i] ^ multiplication32(unsigned32(mt[i - 1] ^ mt[i - 1] >>> 30), 1664525)), init_key[j]), j);
      mt[i] =
      //c//mt[i] &= 0xffffffff; /* for WORDSIZE > 32 machines */
      unsigned32(mt[i] & 0xffffffff);
      i++;
      j++;
      if (i >= N) {
        mt[0] = mt[N - 1];
        i = 1;
      }
      if (j >= key_length) {
        j = 0;
      }
    }
    for (k = N - 1; k; k--) {
      //c//mt[i] = (mt[i] ^ ((mt[i-1] ^ (mt[i-1] >> 30)) * 1566083941))
      //c//- i; /* non linear */
      mt[i] = subtraction32(unsigned32((dbg = mt[i]) ^ multiplication32(unsigned32(mt[i - 1] ^ mt[i - 1] >>> 30), 1566083941)), i);
      //c//mt[i] &= 0xffffffff; /* for WORDSIZE > 32 machines */
      mt[i] = unsigned32(mt[i] & 0xffffffff);
      i++;
      if (i >= N) {
        mt[0] = mt[N - 1];
        i = 1;
      }
    }
    mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */
  };

  /* moved outside of genrand_int32() by jwatte 2010-11-17; generate less garbage */
  var mag01 = [0x0, MATRIX_A];

  /* generates a random number on [0,0xffffffff]-interval */
  //c//unsigned long genrand_int32(void)
  this.genrand_int32 = function () {
    //c//unsigned long y;
    //c//static unsigned long mag01[2]={0x0UL, MATRIX_A};
    var y;
    /* mag01[x] = x * MATRIX_A  for x=0,1 */

    if (mti >= N) {
      /* generate N words at one time */
      //c//int kk;
      var kk;
      if (mti == N + 1) /* if init_genrand() has not been called, */
        //c//init_genrand(5489); /* a default initial seed is used */
        {
          this.init_genrand(5489);
        } /* a default initial seed is used */

      for (kk = 0; kk < N - M; kk++) {
        //c//y = (mt[kk]&UPPER_MASK)|(mt[kk+1]&LOWER_MASK);
        //c//mt[kk] = mt[kk+M] ^ (y >> 1) ^ mag01[y & 0x1];
        y = unsigned32(mt[kk] & UPPER_MASK | mt[kk + 1] & LOWER_MASK);
        mt[kk] = unsigned32(mt[kk + M] ^ y >>> 1 ^ mag01[y & 0x1]);
      }
      for (; kk < N - 1; kk++) {
        //c//y = (mt[kk]&UPPER_MASK)|(mt[kk+1]&LOWER_MASK);
        //c//mt[kk] = mt[kk+(M-N)] ^ (y >> 1) ^ mag01[y & 0x1];
        y = unsigned32(mt[kk] & UPPER_MASK | mt[kk + 1] & LOWER_MASK);
        mt[kk] = unsigned32(mt[kk + (M - N)] ^ y >>> 1 ^ mag01[y & 0x1]);
      }
      //c//y = (mt[N-1]&UPPER_MASK)|(mt[0]&LOWER_MASK);
      //c//mt[N-1] = mt[M-1] ^ (y >> 1) ^ mag01[y & 0x1];
      y = unsigned32(mt[N - 1] & UPPER_MASK | mt[0] & LOWER_MASK);
      mt[N - 1] = unsigned32(mt[M - 1] ^ y >>> 1 ^ mag01[y & 0x1]);
      mti = 0;
    }
    y = mt[mti++];

    /* Tempering */
    //c//y ^= (y >> 11);
    //c//y ^= (y << 7) & 0x9d2c5680;
    //c//y ^= (y << 15) & 0xefc60000;
    //c//y ^= (y >> 18);
    y = unsigned32(y ^ y >>> 11);
    y = unsigned32(y ^ y << 7 & 0x9d2c5680);
    y = unsigned32(y ^ y << 15 & 0xefc60000);
    y = unsigned32(y ^ y >>> 18);
    return y;
  };

  /* generates a random number on [0,0x7fffffff]-interval */
  //c//long genrand_int31(void)
  this.genrand_int31 = function () {
    //c//return (genrand_int32()>>1);
    return this.genrand_int32() >>> 1;
  };

  /* generates a random number on [0,1]-real-interval */
  //c//double genrand_real1(void)
  this.genrand_real1 = function () {
    //c//return genrand_int32()*(1.0/4294967295.0);
    return this.genrand_int32() * (1.0 / 4294967295.0);
    /* divided by 2^32-1 */
  };

  /* generates a random number on [0,1)-real-interval */
  //c//double genrand_real2(void)
  this.genrand_real2 = function () {
    //c//return genrand_int32()*(1.0/4294967296.0);
    return this.genrand_int32() * (1.0 / 4294967296.0);
    /* divided by 2^32 */
  };

  /* generates a random number on (0,1)-real-interval */
  //c//double genrand_real3(void)
  this.genrand_real3 = function () {
    //c//return ((genrand_int32()) + 0.5)*(1.0/4294967296.0);
    return (this.genrand_int32() + 0.5) * (1.0 / 4294967296.0);
    /* divided by 2^32 */
  };

  /* generates a random number on [0,1) with 53-bit resolution*/
  //c//double genrand_res53(void)
  this.genrand_res53 = function () {
    //c//unsigned long a=genrand_int32()>>5, b=genrand_int32()>>6;
    var a = this.genrand_int32() >>> 5,
      b = this.genrand_int32() >>> 6;
    return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
  };
  /* These real versions are due to Isaku Wada, 2002/01/09 added */
}

//  Exports: Public API

//  Export the twister class
//exports.MersenneTwister19937 = MersenneTwister19937;
var _default = exports["default"] = MersenneTwister19937;

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateTiledJSON;
function generateTiledJSON(tileMap) {
  var tiledJSON = {
    "compressionlevel": -1,
    "height": tileMap.height,
    "infinite": false,
    "layers": [{
      "data": tileMap.data,
      "height": tileMap.height,
      "id": 1,
      "name": "Tile Layer 1",
      "opacity": 1,
      "type": "tilelayer",
      "visible": true,
      "width": tileMap.width,
      "x": 0,
      "y": 0
    }],
    /* infinite style map with chunks 
      "editorsettings": {
        "chunksize": {
          "height": 8,
          "width": 8
        }
      },
       "layers": [{
        "chunks": [{
          "data": tileMap.data,  // Your tileMap data
          "height": tileMap.height,
          "width": tileMap.width,
          "x": 0,
          "y": 0
        }],
        "height": tileMap.height,
        "name": "Tile Layer 1",
        "opacity": 1,
        "startx": 0,
        "starty": 0,
        "type": "tilelayer",
        "visible": true,
        "width": tileMap.width,
        "x": 0,
        "y": 0
      }],
      */
    "nextlayerid": 2,
    "nextobjectid": 1,
    "orientation": "orthogonal",
    "renderorder": "right-down",
    "tiledversion": "1.10.2",
    "tileheight": 16,
    "tilesets": [{
      "columns": 0,
      "firstgid": 1,
      "grid": {
        "height": 1,
        "orientation": "orthogonal",
        "width": 1
      },
      "margin": 0,
      "name": "grass-land",
      "spacing": 0,
      "tilecount": 2,
      "tileheight": 16,
      "tiles": [
      // TODO: custom tile set mappings
      {
        "id": 0,
        "image": "tile-bush.png",
        "imageheight": 16,
        "imagewidth": 16
      }, {
        "id": 1,
        "image": "tile-grass.png",
        "imageheight": 16,
        "imagewidth": 16
      }, {
        "id": 2,
        "image": "tile-block.png",
        "imageheight": 16,
        "imagewidth": 16
      }, {
        "id": 3,
        "image": "tile-path-brown.png",
        "imageheight": 16,
        "imagewidth": 16
      }, {
        "id": 4,
        "image": "tile-path-green.png",
        "imageheight": 16,
        "imagewidth": 16
      }],
      "tilewidth": 16
    }],
    "tilewidth": 16,
    "type": "map",
    "version": "1.10",
    "width": tileMap.width
    // Add your tilesets and other necessary properties here
  };

  return tiledJSON;
}

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _MersenneTwister = _interopRequireDefault(require("./MersenneTwister19937.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); } // var Gen = require('../vendor/mersenne').MersenneTwister19937;
function Mersenne() {
  var gen = new _MersenneTwister["default"]();
  var seed = new Date().getTime() % 1000000000;
  this.currentSeed = seed;
  gen.init_genrand(seed);
  this.rand = function (max, min) {
    if (typeof max === 'undefined') {
      return gen.genrand_real2(); // Returns a floating-point number between 0 and 1
    }

    if (typeof min === 'undefined') {
      min = 0;
    }
    return Math.floor(gen.genrand_real2() * (max - min) + min);
  };
  this.seed = function (S) {
    if (typeof S != 'number') {
      throw new Error("seed(S) must take numeric argument; is " + _typeof(S));
    }
    this.currentSeed = S;
    gen.init_genrand(S);
  };
  this.seed_array = function (A) {
    if (_typeof(A) != 'object') {
      throw new Error("seed_array(A) must take array of numbers; is " + _typeof(A));
    }
    this.currentSeed = A;
    gen.init_by_array(A, A.length);
  };
}
var _default = exports["default"] = Mersenne;

},{"./MersenneTwister19937.js":9}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defaultOrthogonalMap = _interopRequireDefault(require("./maps/defaultOrthogonalMap.js"));
var _labyrinthos = _interopRequireDefault(require("../../../../Labyrinthos.js/lib/labyrinthos.js"));
var _getChunkFiles = _interopRequireDefault(require("./lib/getChunkFiles.js"));
var _loadChunk = _interopRequireDefault(require("./lib/loadChunk.js"));
var _calculateTilePosition = _interopRequireDefault(require("./lib/calculateTilePosition.js"));
var _generateRandomChunk = _interopRequireDefault(require("./lib/generateRandomChunk.js"));
var _generateRandomChunkWithPaths = _interopRequireDefault(require("./lib/generateRandomChunkWithPaths.js"));
var _generateChunkWithFractal = _interopRequireDefault(require("./lib/generateChunkWithFractal.js"));
var _randomTileFromDistribution = _interopRequireDefault(require("./lib/randomTileFromDistribution.js"));
var _createTile = _interopRequireDefault(require("./lib/createTile.js"));
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
var tileKinds = [{
  id: 0,
  kind: 'grass',
  weight: 10
}, {
  id: 1,
  kind: 'bush',
  weight: 2,
  body: true,
  isStatic: true,
  z: 0
}, {
  id: 2,
  kind: 'grass',
  weight: 63
}, {
  id: 3,
  kind: 'block',
  weight: 5,
  body: true,
  z: 0
}, {
  id: 4,
  kind: 'path-green',
  weight: 10
}, {
  id: 5,
  kind: 'path-brown',
  weight: 10
}];
var Tile = /*#__PURE__*/function () {
  function Tile() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$tileMap = _ref.tileMap,
      tileMap = _ref$tileMap === void 0 ? _defaultOrthogonalMap["default"] : _ref$tileMap,
      _ref$tiledServer = _ref.tiledServer,
      tiledServer = _ref$tiledServer === void 0 ? false : _ref$tiledServer,
      _ref$chunkUnitSize = _ref.chunkUnitSize,
      chunkUnitSize = _ref$chunkUnitSize === void 0 ? 8 : _ref$chunkUnitSize,
      _ref$tileSize = _ref.tileSize,
      tileSize = _ref$tileSize === void 0 ? 16 : _ref$tileSize,
      _ref$proceduralGenera = _ref.proceduralGenerateMissingChunks,
      proceduralGenerateMissingChunks = _ref$proceduralGenera === void 0 ? false : _ref$proceduralGenera,
      _ref$loadInitialChunk = _ref.loadInitialChunk,
      loadInitialChunk = _ref$loadInitialChunk === void 0 ? true : _ref$loadInitialChunk,
      _ref$loadDefaultTileM = _ref.loadDefaultTileMap,
      loadDefaultTileMap = _ref$loadDefaultTileM === void 0 ? true : _ref$loadDefaultTileM;
    _classCallCheck(this, Tile);
    this.id = Tile.id;

    // in debug mode we will add colors to each chunk
    this.debug = false;

    // set a default tile map
    this.tileMap = tileMap;
    this.tileKinds = tileKinds; // rename

    // TODO: configurable chunk size and tile size
    this.chunkUnitSize = chunkUnitSize;
    this.tileSize = tileSize;
    this.chunkPixelSize = this.chunkUnitSize * this.tileSize;
    this.loadingStates = {}; // Track the state of loadScript calls
    this.maxRetries = 3; // Set the maximum number of retries for a given URL

    // tiledServer is a boolean flag to indicate if we are using mantra-tiled-server
    // tile chunks will be loaded on demand based on the mantra-tiled-server specs
    this.tiledServer = tiledServer;
    this.loadDefaultTileMap = loadDefaultTileMap;

    // if true, will load tiles on demand based on mantra-tiled-server specs
    this.lazyLoadTiles = false;
    this.loadInitialChunk = loadInitialChunk;

    // if true, will generate random chunks for missing chunks not found by mantra-tiled-server
    this.proceduralGenerateMissingChunks = proceduralGenerateMissingChunks;

    // list of tile ids for random generation
    this.tileIds = [1, 2, 3];
    this.loadChunk = _loadChunk["default"].bind(this);
    this.calculateTilePosition = _calculateTilePosition["default"].bind(this);
    this.generateRandomChunk = _generateRandomChunk["default"].bind(this);
    this.generateRandomChunkWithPaths = _generateRandomChunkWithPaths["default"].bind(this);
    this.generateChunkWithFractal = _generateChunkWithFractal["default"].bind(this);
    this.randomTileFromDistribution = _randomTileFromDistribution["default"].bind(this);
    this.createTile = _createTile["default"].bind(this);
  }
  _createClass(Tile, [{
    key: "setOptions",
    value: function setOptions(TileConfig) {
      // console.log("SET NEW OPTIONS", TileConfig)
      this.tiledServer = TileConfig.tiledServer;
      this.proceduralGenerateMissingChunks = TileConfig.proceduralGenerateMissingChunks;
      //this.tileMap = TileConfig.tileMap;
      //this.loadInitialChunk = TileConfig.loadInitialChunk;
      //this.chunkUnitSize = TileConfig.chunkUnitSize;
      //this.tileSize = TileConfig.tileSize;
      //this.chunkPixelSize = TileConfig.chunkPixelSize;
      //this.debug = TileConfig.debug;
      //this.lazyLoadTiles = TileConfig.lazyLoadTiles;
      //this.tileIds = TileConfig.tileIds;
    }
  }, {
    key: "init",
    value: function init(game) {
      var _this = this;
      this.game = game;
      this.game.addSystem('tile', this);
      if (this.loadInitialChunk) {
        if (this.tiledServer) {
          this.game.loadScripts(['/tiled/chunks/chunk_x0_y0.js'], function () {
            // query the default tiled chunk location for chunk chunk_x0_y0
            // this file will exist in ./tiled/chunks/chunk_x0_y0.js
            // we can simply inject this remote .js file from the CDN into the client
            // and the game.data.chunks scope will be populated with the chunk data
            console.log('this.game.data.chunks.chunk_x0_y0', _this.game.data.chunks.chunk_x0_y0.data.length);
            _this.createLayer(_this.game.data.chunks.chunk_x0_y0, _this.tileSize, _this.tileSize);
          });
        } else if (this.proceduralGenerateMissingChunks) {
          // TODO: generator
        }
      } else {

        //setTimeout(() => this.createTileMapFromTiledJSON(defaultOrthogonalMap), 222);
        //setTimeout(() => this.createTileMapFromTiledJSON(mediumOrthogonalMap), 222);
        //setTimeout(() => this.createTileMapFromTiledJSON(largeOrthogonalMap), 222);
      }
      if (this.loadDefaultTileMap) {
        this.createTileMapFromTiledJSON(this.tileMap);
      }

      // only code path using file::upload 1/24/24 is tile.html Tiled server upload demo
      this.game.on('file::upload', function (data) {
        console.log('got new tile data', data);
        _this.createTileMapFromTiledJSON(data);
      });
    }
  }, {
    key: "createTileMapFromTiledJSON",
    value: function createTileMapFromTiledJSON(tiledJSON) {
      var _this2 = this;
      // TODO: remove this line
      if (typeof window !== 'undefined') {
        var overlay = document.getElementById('drag-and-drop-file-upload-overlay');
        // set hidden
        overlay.style.display = 'none';
      }
      tiledJSON.layers.forEach(function (layer) {
        if (layer.type === 'tilelayer') {
          if (layer.chunks) {
            layer.chunks.forEach(function (chunk) {
              _this2.createLayer(chunk, tiledJSON.tilewidth, tiledJSON.tileheight);
            });
          } else {
            _this2.createLayer(layer, tiledJSON.tilewidth, tiledJSON.tileheight);
          }
        }
      });
    }
  }, {
    key: "createLayer",
    value: function createLayer(layer, tileWidth, tileHeight) {
      var _this3 = this;
      layer.data.forEach(function (tile, index) {
        if (typeof tile === 'number') {
          // find id = tile in tileKinds
          var tileId = tile;
          var tileKind = tileKinds.find(function (tileKind) {
            return tileKind.id === tileId;
          });
          if (tileKind) {
            tile = tileKind;
          } else {
            tile = tileKinds[3];
          }
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
    key: "getTileImageURL",
    value: function getTileImageURL(tileId) {
      return "img/game/tiles/".concat(tileId, ".png");
    }
  }, {
    key: "handleLoadFailure",
    value: function handleLoadFailure(chunkPath, chunkKey) {
      console.log("Fallback for failed load:", chunkPath, chunkKey);
      // Call the procedural generation function
      if (this.proceduralGenerateMissingChunks) {
        // console.log('Generating random chunk', chunkKey)
        // let randomChunk = this.generateRandomChunk(chunkKey, tileKinds);
        var randomChunk;
        var chunkCoordinates = this.extractChunkCoordinates(chunkKey);
        console.log('chunkCoordinates', chunkCoordinates);
        var x = chunkCoordinates.x;
        var y = chunkCoordinates.y;
        var map = new _labyrinthos["default"].TileMap({
          x: x,
          y: y,
          width: 8,
          height: 8,
          tileWidth: 16,
          tileHeight: 16
        });
        map.fill(1);
        console.log('aaamap', chunkKey, map);
        //labyrinthos.mazes.RecursiveBacktrack(map, {});
        // labyrinthos.mazes.SpiralBacktrack(map, {});
        // labyrinthos .mazes.RecursiveDivision(map, {});
        // labyrinthos.terrains.DiamondSquare(map, {});
        // map.seed(4121);
        _labyrinthos["default"].terrains.FaultLine(map, {});
        map.scaleToTileRange(6);
        console.log('map', map);
        randomChunk = map;

        // console.log('randomChunk', chunkKey, randomChunk.data.length)
        this.game.data.chunks[chunkKey] = randomChunk;
        this.game.systems.tile.createLayer(this.game.data.chunks[chunkKey], this.tileSize, this.tileSize);
      }
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
      var _this4 = this;
      //generateMap(map, {});

      //console.log('map', map)
      // if (!this.tiledServer) return;
      // console.log('aaaaaaa', labyrinthos)
      var outputDir = '/tiled/chunks/'; // Set the base directory for the chunks
      var result = (0, _getChunkFiles["default"])(position, this.chunkUnitSize, outputDir, 2);
      // console.log("getChunkFiles result", position, result);

      // TODO: place check to see if we allow remote chunk loading
      result.forEach(function (chunkName) {
        // Extract the chunk key from the chunk file name
        var chunkKey = chunkName.replace('.js', '').replace(outputDir, '');
        // Load the chunk if it's not already loaded
        if (typeof _this4.game.data.chunks[chunkKey] === 'undefined') {
          // console.log("loadTilesForArea", position, this.chunkUnitSize);
          if (_this4.tiledServer) {
            var chunkPath = chunkName;
            _this4.loadChunk(chunkPath, chunkKey);
          } else if (_this4.proceduralGenerateMissingChunks) {
            _this4.handleLoadFailure(null, chunkKey); // Changed to handle procedural generation
          }
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

},{"../../../../Labyrinthos.js/lib/labyrinthos.js":3,"./lib/calculateTilePosition.js":13,"./lib/createTile.js":14,"./lib/generateChunkWithFractal.js":15,"./lib/generateRandomChunk.js":16,"./lib/generateRandomChunkWithPaths.js":17,"./lib/getChunkFiles.js":18,"./lib/loadChunk.js":19,"./lib/randomTileFromDistribution.js":20,"./maps/defaultOrthogonalMap.js":21}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = calculateTilePosition;
function calculateTilePosition(index, layer, tileWidth, tileHeight, tileId) {
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

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createTile;
function createTile(tile, x, y, z, tileWidth, tileHeight, color) {
  var tileId = tile.id;

  // TODO: better tile config by kind
  // for now

  if (typeof tile.z === 'number') {
    z = tile.z;
  } else {
    z = -16;
  }
  var isStatic;
  if (typeof tile.isStatic === 'boolean') {
    isStatic = tile.isStatic;
  }
  var scale = 1;
  var body = tile.body;
  var mass = tile.mass || 1;
  var _color;
  if (color && this.debug) {
    _color = color;
  }
  var _texture = "tile-".concat(tile.kind); // rename
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

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateChunkWithFractal;
function generateChunkWithFractal(chunkKey, tileKinds) {
  var fractalType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'mandelbrot';
  var chunkData = [];
  var chunkSize = this.chunkUnitSize;
  var maxIter = 100; // Max iterations for fractal calculation
  var fractalBounds = {
    xMin: -2,
    xMax: 1,
    yMin: -1.5,
    yMax: 1.5
  }; // Bounds for the fractal

  for (var i = 0; i < chunkSize * chunkSize; i++) {
    var x = i % chunkSize;
    var y = Math.floor(i / chunkSize);

    // Map chunk coordinates to fractal coordinates
    var fractalX = fractalBounds.xMin + x / chunkSize * (fractalBounds.xMax - fractalBounds.xMin);
    var fractalY = fractalBounds.yMin + y / chunkSize * (fractalBounds.yMax - fractalBounds.yMin);
    var tile = void 0;
    var iterations = mandelbrotIterations(fractalX, fractalY, maxIter);
    if (iterations === maxIter) {
      // Inside the set, pick a specific tile kind
      tile = {
        kind: 'path-brown'
      };
    } else {
      // Outside the set, choose randomly
      tile = this.randomTileFromDistribution(tileKinds, tileKinds.reduce(function (acc, kind) {
        return acc + kind.weight;
      }, 0));
    }
    chunkData.push(tile);
  }
  var randomIntColor = Math.floor(Math.random() * 16777215);
  return {
    data: chunkData,
    height: chunkSize,
    width: chunkSize,
    color: randomIntColor,
    x: this.extractChunkCoordinates(chunkKey).x,
    y: this.extractChunkCoordinates(chunkKey).y
  };
}
function mandelbrotIterations(x, y) {
  var maxIter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
  var real = x;
  var imag = y;
  var n = 0;
  while (real * real + imag * imag <= 4 && n < maxIter) {
    var tempReal = real * real - imag * imag + x;
    imag = 2 * real * imag + y;
    real = tempReal;
    n++;
  }
  return n;
}

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateRandomChunk;
function generateRandomChunk(chunkKey, tileKinds) {
  var chunkData = [];
  var totalWeight = tileKinds.reduce(function (acc, tileType) {
    return acc + tileType.weight;
  }, 0);
  for (var i = 0; i < this.chunkUnitSize * this.chunkUnitSize; i++) {
    var tile = this.randomTileFromDistribution(tileKinds, totalWeight);
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

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateRandomChunkWithPaths;
function generateRandomChunkWithPaths(chunkKey, tileKinds) {
  var chunkData = [];
  var totalWeight = tileKinds.reduce(function (acc, tileType) {
    return acc + tileType.weight;
  }, 0);

  // Determine if this chunk should have a path, and if so, get the pattern
  var hasPath = Math.random() < 0.5; // 50% chance to have a path
  var pathPattern = hasPath ? randomPathPattern(this.chunkUnitSize) : null;

  // Variables to control path color consistency
  var currentPathColor = Math.random() < 0.5 ? 'path-green' : 'path-brown'; // Initial path color
  var colorSwitchThreshold = 3; // Number of tiles before color switch
  var colorCounter = 0; // Counter for the current color

  for (var i = 0; i < this.chunkUnitSize * this.chunkUnitSize; i++) {
    var tile = void 0;
    if (hasPath && pathPattern.has(i)) {
      tile = {
        kind: currentPathColor
      };
      colorCounter++;
      // Switch color if the threshold is reached
      if (colorCounter >= colorSwitchThreshold) {
        currentPathColor = currentPathColor === 'path-green' ? 'path-brown' : 'path-green';
        colorCounter = 0; // Reset counter after switching
      }
    } else {
      tile = this.randomTileFromDistribution(tileKinds, totalWeight);
    }
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
function randomPathPattern(size) {
  // Example implementation: Create a simple straight horizontal path
  var pathSet = new Set();
  var row = Math.floor(Math.random() * size); // Random row for the path
  for (var i = 0; i < size; i++) {
    pathSet.add(row * size + i);
  }
  return pathSet;
}

},{}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadChunk;
function loadChunk(chunkPath, chunkKey) {
  var _this = this;
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
      if (_this.game.data.chunks[chunkKey]) {
        _this.game.systems.tile.createLayer(_this.game.data.chunks[chunkKey], _this.tileSize, _this.tileSize);
      } else {
        console.log("WARNING: chunk not found", chunkKey);
        _this.handleLoadFailure(chunkPath, chunkKey); // Handle the failure case
      }
    });
  } else if (state.attempts >= this.maxRetries) {
    // console.log("MAX RETRIES REACHED FOR", chunkPath);
    this.handleLoadFailure(chunkPath, chunkKey); // Handle the failure case
  }
}

},{}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = randomTileFromDistribution;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function randomTileFromDistribution(tileKinds, totalWeight) {
  var randomWeight = Math.random() * totalWeight;
  var weightSum = 0;
  var _iterator = _createForOfIteratorHelper(tileKinds),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var tileType = _step.value;
      weightSum += tileType.weight;
      if (randomWeight <= weightSum) {
        return tileType.id;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return tileKinds[tileKinds.length - 1].id; // Fallback in case of rounding errors
}

},{}],21:[function(require,module,exports){
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
    "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

},{}]},{},[12])(12)
});
