(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).SnapshotManager = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/*

 getPlayerSnapshot() is for  gathering states from the game that interesting to player, 
 usually done through spatial index search for now, the geo spatial search is hard-coded to return this.bodyMap
 plus some additional netcode game logic for excluding certain entities from the snapshot

*/

// playerStateCache is not directly related to deltaCompression
// playerStateCache is used to track kinematic entities (bullets) for client-side prediction
// playerStateCache is legacy API and can be removed soon
var playerStateCache = {};
var playerSnapshotCounts = {};
var snapshotCount = 0;
var config = {
  clientSidePrediction: true
};

// TODO: auto-generate this list from the components
var componentsList = ['type', 'destroyed', 'position', 'velocity', 'mass', 'type', 'health', 'rotation', 'width', 'height', 'depth', 'radius', 'isSensor', 'lifetime', 'owner', 'color'];
var getPlayerSnapshot = function getPlayerSnapshot(playerId) {
  var differentialSnapshotState = [];
  var playerState = [];

  // TODO: this should be using a spatial search instead of just returning the entire world
  // use FIELD_OF_VIEW and RENDER_DISTANCE to limit the number of entities returned
  var _iterator = _createForOfIteratorHelper(this.entities.entries()),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
        eId = _step$value[0],
        state = _step$value[1];
      // TODO: this.bodyMap should be RBush search

      if (state.destroyed) {
        delete playerStateCache[playerId][state.id];
        if (state.type === 'PLAYER') {
          delete playerStateCache[playerId][state.id];
          delete playerStateCache[state.id];
        }
        // no need to further process this entity ( for now )
        // TODO: remove this push and continue to allow client-side prediction
        playerState.push(state);
        continue;
      }
      if (typeof playerStateCache[playerId] === 'undefined') {
        playerStateCache[playerId] = {};
      }
      if (config.clientSidePrediction) {
        // don't send send players their own bullets ( uncomment for client-side prediction )
        if (state.type === 'BULLET' && state.owner === playerId) {
          // console.log("will not send players their own bullets");
          // TODO: uncomment with client-side prediction
          // continue;
        }
      }

      // bullets are kinematic, so we only send their initial state with velocity vector
      if (state.type === 'BULLET' && typeof playerStateCache[playerId] !== 'undefined' && typeof playerStateCache[playerId][state.id] !== 'undefined') {
        continue;
      }
      playerStateCache[playerId][state.id] = state;
      if (typeof playerSnapshotCounts[playerId] === 'undefined') {
        // TODO: playerSnapshotCounts is accumulating state, should be reset on player disconnect
        playerSnapshotCounts[playerId] = 0;
      }

      // TODO: move float truncation to separate function
      if (true) {
        if (typeof state.position !== 'undefined' && typeof state.position.x === 'number' && typeof state.position.y === 'number') {
          state.position.x = truncateToPrecision(state.position.x);
          state.position.y = truncateToPrecision(state.position.y);
          if (typeof state.position.z === 'number') {
            state.position.z = truncateToPrecision(state.position.z);
          }
        }
        if (typeof state.velocity !== 'undefined' && typeof state.velocity.x === 'number' && typeof state.velocity.y === 'number') {
          state.velocity.x = truncateToPrecision(state.velocity.x);
          state.velocity.y = truncateToPrecision(state.velocity.y);
          if (typeof state.velocity.z === 'number') {
            state.velocity.z = truncateToPrecision(state.velocity.z);
          }
        }
      }
      playerState.push(state);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  playerSnapshotCounts[playerId]++;
  return {
    id: playerSnapshotCounts[playerId],
    ctime: Date.now(),
    state: playerState
  };
};
var truncateToPrecision = function truncateToPrecision(value) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  return Number(value.toFixed(precision));
};
var _default = exports["default"] = getPlayerSnapshot;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _getPlayerSnapshot2 = _interopRequireDefault(require("./SnapShotManager/getPlayerSnapshot.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var SnapshotManager = /*#__PURE__*/function () {
  function SnapshotManager() {
    _classCallCheck(this, SnapshotManager);
    this.snapshotCount = 0;
    this.snapshotBuffer = [];
    this.id = SnapshotManager.id;
  }
  _createClass(SnapshotManager, [{
    key: "init",
    value: function init(game) {
      game.lastProcessedInput = {};
      this.game = game;
      // hoist snapshotManager to game instance
      this.game.snapshotManager = this;
      // Bind some methods to parent Game scope for convenience
      // The most useful and common System methods are expected to be bound to Game
      // This allows developers to customcraft a clean Game API based on their needs
      // this.getPlayerSnapshot = getPlayerSnapshot.bind(this);
      this.game.saveSnapshot = this.saveSnapshot.bind(this);
      this.game.getSnapshot = this.getSnapshot.bind(this);
      this.game.getPlayerSnapshot = _getPlayerSnapshot2["default"];
    }
  }, {
    key: "saveSnapshot",
    value: function saveSnapshot(entities, lastProcessedInput) {
      this.snapshotCount++;
      var snapshotId = this.snapshotCount;
      var snapshotState = Object.values(entities);
      var snapshot = {
        state: snapshotState,
        lastProcessedInput: _objectSpread({}, lastProcessedInput)
      };
      this.snapshotBuffer.push({
        snapshotId: snapshotId,
        snapshot: snapshot
      });
      while (this.snapshotBuffer.length > 10) {
        // Keep the last 10 snapshots
        this.snapshotBuffer.shift();
      }
    }
  }, {
    key: "getSnapshot",
    value: function getSnapshot(snapshotId) {
      var found = this.snapshotBuffer.find(function (snapshotObj) {
        return snapshotObj.snapshotId === snapshotId;
      });
      return found ? found.snapshot : null;
    }
  }, {
    key: "getPlayerSnapshot",
    value: function getPlayerSnapshot(entityId) {
      _getPlayerSnapshot2["default"].bind(this.game)(entityId);
    }
  }]);
  return SnapshotManager;
}();
_defineProperty(SnapshotManager, "id", 'snapshot-manager');
var _default = exports["default"] = SnapshotManager;
/*

class CompositeEncoder {
  constructor(encoders = []) {
    this.encoders = encoders;
  }

  addEncoder(encoder) {
    this.encoders.push(encoder);
  }

  encode(data) {
    return this.encoders.reduce((encodedData, encoder) => encoder.encode(encodedData), data);
  }
}

class CompositeDecoder {
  constructor(decoders = []) {
    this.decoders = decoders;
  }

  addDecoder(decoder) {
    this.decoders.push(decoder);
  }

  decode(data) {
    // Note: Decoding should typically be in reverse order of encoding
    return this.decoders.reduceRight((decodedData, decoder) => decoder.decode(decodedData), data);
  }
}


import MsgPackEncoder from '../shared/encoding/MsgPackEncoder.js'; // Hypothetical MsgPack encoders
import MsgPackDecoder from '../shared/encoding/MsgPackDecoder.js';

//...

constructor() {
  this.snapshotBuffer = [];

  // Create a composite encoder and decoder with all necessary steps
  this.encoder = new CompositeEncoder([
    new DeltaEncoder(),
    new DeltaCompressor(),
    new MsgPackEncoder() // Added as the final encoding step
  ]);

  this.decoder = new CompositeDecoder([
    new MsgPackDecoder(), // Added as the first decoding step
    new DeltaCompressor(), // Assuming this can also decode, or provide a DeltaDecompressor if needed
    new DeltaEncoder() // Assuming this can also decode, or provide a DeltaDecoder if needed
  ]);
}

saveSnapshot(entities, lastProcessedInput) {
  // ...
  const encodedState = this.encoder.encode(rawSnapshotState);
  // ...
}

getDecodedSnapshot(snapshotId) {
  const snapshot = this.getSnapshot(snapshotId);
  if (snapshot) {
    return this.decoder.decode(snapshot.state);
  }
  return null;
}

*/

},{"./SnapShotManager/getPlayerSnapshot.js":1}]},{},[2])(2)
});
