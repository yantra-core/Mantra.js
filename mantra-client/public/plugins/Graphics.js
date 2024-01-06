(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Graphics = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _updateSprite = _interopRequireDefault(require("./lib/updateSprite.js"));
var _handleInputs = _interopRequireDefault(require("./lib/handleInputs.js"));
var _getTexture = _interopRequireDefault(require("./lib/getTexture.js"));
var _LoadingCircle = _interopRequireDefault(require("./lib/LoadingCircle.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // Graphics.js - Marak Squires 2023
var Graphics = /*#__PURE__*/function () {
  function Graphics() {
    _classCallCheck(this, Graphics);
    this.id = Graphics.id;
    this.updateSprite = _updateSprite["default"].bind(this);
    this.handleInputs = _handleInputs["default"].bind(this);
    this.getTexture = _getTexture["default"].bind(this);
    this.LoadingCircle = _LoadingCircle["default"];
  }
  _createClass(Graphics, [{
    key: "init",
    value: function init(game) {
      this.game = game; // Store the reference to the game logic
      this.game.systemsManager.addSystem('graphics', this);
      this.game.createGraphic = this.createGraphic.bind(this);
      this.game.removeGraphic = this.removeGraphic.bind(this);
      this.game.updateGraphic = this.updateGraphic.bind(this);
      this.game.getTexture = this.getTexture.bind(this);
      this.game.updateSprite = this.updateSprite.bind(this);
      this.game.switchGraphics = this.switchGraphics.bind(this);
      this.game.setBackground = this.setBackground.bind(this);
      this.game.data.camera = this.game.data.camera || {
        position: {
          x: 0,
          y: 0
        }
      };

      // Ensure the gameHolder div exists
      var gameHolder = document.getElementById('gameHolder');
      if (!gameHolder) {
        gameHolder = document.createElement('div');
        gameHolder.id = 'gameHolder';
        document.body.appendChild(gameHolder); // Append to the body or to a specific element as needed
      }

      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera

      // Bind event handlers for changing player sprite
      this.handleInputs();
    }
  }, {
    key: "preload",
    value: function preload() {}
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
        if (ent && ent.graphics && ent.graphics[graphicsInterface.id]) {
          return;
        }
        var graphic = graphicsInterface.createGraphic(entityData);
        if (graphic) {
          game.components.graphics.set([entityData.id, graphicsInterface.id], graphic);
        } else {}
      });
    }
  }, {
    key: "switchGraphics",
    value: function switchGraphics(graphicsInterfaceName, cb) {
      var _this = this;
      cb = cb || function noop() {};
      var game = this.game;
      var engines = {
        'BabylonGraphics': 'graphics-babylon',
        'PhaserGraphics': 'graphics-phaser',
        'CSSGraphics': 'graphics-css'
      };
      var graphicsInterfaceId = engines[graphicsInterfaceName];
      document.body.style.cursor = 'wait';
      // Check if the selected graphics mode is already registered
      if (typeof this.game.systems[graphicsInterfaceId] === 'undefined') {
        this.game.use(graphicsInterfaceName /*, { camera: this.game.data.camera }*/);

        // Add event listeners for plugin ready events
        this.game.once("plugin::ready::".concat(graphicsInterfaceId), function () {
          // iterate through all existing graphics ( except this one ) and remove them
          _this.game.graphics.forEach(function (graphics) {
            if (graphics.id !== graphicsInterfaceId) {
              game.systemsManager.removeSystem(graphics.id);
            }
          });

          // redraw all graphics
          var _iterator = _createForOfIteratorHelper(_this.game.entities.entries()),
            _step;
          try {
            var _loop = function _loop() {
              var _step$value = _slicedToArray(_step.value, 2),
                eId = _step$value[0],
                state = _step$value[1];
              var ent = _this.game.entities.get(eId);
              // console.log('rendering', ent)
              game.graphics.forEach(function (graphicsInterface) {
                graphicsInterface.inflateEntity(ent);
              });
              // this.game.changedEntities.delete(eId);
            };
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              _loop();
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          document.body.style.cursor = 'default';
          cb(null);
        });
      } else {
        document.body.style.cursor = 'default';
        cb(null);
      }
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
  }, {
    key: "setBackground",
    value: function setBackground(style) {
      var game = this.game;

      // assume style is CSS color, set body background
      document.body.style.background = style;
      /*
      // TODO
      game.graphics.forEach(function (graphicsInterface) {
        graphicsInterface.setBackground(style);
      })
      */
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

},{"./lib/LoadingCircle.js":2,"./lib/getTexture.js":3,"./lib/handleInputs.js":4,"./lib/updateSprite.js":5}],2:[function(require,module,exports){
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
var LoadingCircle = exports["default"] = /*#__PURE__*/function () {
  function LoadingCircle(waitTime) {
    _classCallCheck(this, LoadingCircle);
    this.waitTime = waitTime; // Total wait time in milliseconds
    this.elapsedTime = 0; // Time elapsed

    this.visible = false;
    this.done = false;

    // Create the circle container
    this.container = document.createElement('div');
    this.container.style.width = '100px';
    this.container.style.height = '100px';
    this.container.style.position = 'absolute';
    this.container.style.display = 'none';
    this.container.style.alignItems = 'center';
    this.container.style.justifyContent = 'center';
    this.container.style.borderRadius = '50%';

    // Create the circle element with CSS
    this.circle = document.createElement('div');
    this.circle.style.width = '100%';
    this.circle.style.height = '100%';
    this.circle.style.borderRadius = '50%';
    this.circle.style.backgroundImage = "conic-gradient(blue 0% 0%, transparent 0% 100%)";
    this.circle.style.border = 'solid';
    this.circle.style.borderWidth = '3px';
    this.circle.style.borderColor = 'white';

    // Create the countdown text
    this.countdownText = document.createElement('div');
    this.countdownText.style.position = 'absolute';
    this.countdownText.style.color = 'white';
    // bold
    this.countdownText.style.fontWeight = 'bold';
    this.countdownText.style.fontSize = '32px monospace';
    this.countdownText.innerText = (this.waitTime / 1000).toString();

    // Append elements
    this.container.appendChild(this.circle);
    this.container.appendChild(this.countdownText);
    document.body.appendChild(this.container);

    // Timer-based control
    this.interval = null;
  }
  _createClass(LoadingCircle, [{
    key: "setPosition",
    value: function setPosition(x, y) {
      this.container.style.left = "".concat(x, "px");
      this.container.style.top = "".concat(y, "px");
    }
  }, {
    key: "update",
    value: function update(newDuration) {
      this.waitTime = newDuration;
      this.countdownText.innerText = (this.waitTime / 1000).toString();
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;
      this.visible = true;
      this.container.style.display = 'flex';
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.elapsedTime = 0;
      this.interval = setInterval(function () {
        return _this.tick(100);
      }, 100);
    }
  }, {
    key: "tick",
    value: function tick(delta) {
      if (this.done) {
        //console.log('LoadingCircle.tick already done. Skipping...');
        return;
      }
      if (!this.visible) {
        this.visible = true;
        this.container.style.display = 'flex';
      }
      this.elapsedTime += delta;
      // let progress = this.elapsedTime / this.waitTime;
      var remainingTime = Math.ceil((this.waitTime - this.elapsedTime) / 1000);
      var progress = this.elapsedTime / this.waitTime;
      var angle = progress * 360; // Calculate the angle for the gradient

      this.circle.style.backgroundImage = "conic-gradient(\n      red, \n      orange, \n      yellow, \n      green, \n      blue, \n      indigo, \n      violet, \n      transparent, \n      transparent ".concat(angle, "deg,\n      grey )");

      // this.circle.style.backgroundImage = `conic-gradient(grey ${progress * 100}% 0%, transparent 0% 100%)`;
      this.countdownText.innerText = remainingTime.toString();
      // console.log('LoadingCircle.tick', this.elapsedTime, this.waitTime, progress, remainingTime)
      if (this.elapsedTime >= this.waitTime) {
        this.complete();
      }
    }
  }, {
    key: "complete",
    value: function complete() {
      // console.log("LoadingCircle.complete")
      this.done = true;
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
      this.emitCompleteEvent();
      // this.container.remove();
    }
  }, {
    key: "remove",
    value: function remove() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
      this.container.remove();
    }
  }, {
    key: "emitCompleteEvent",
    value: function emitCompleteEvent() {
      var event = new CustomEvent('loadingComplete', {
        detail: {
          completed: true
        }
      });
      this.container.dispatchEvent(event);
    }
  }]);
  return LoadingCircle;
}();

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getTexture;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function getTexture(config) {
  var game = this.game;
  // returns the texture url for a given key
  // if no key is found, checks if the key is a url and returns it
  // this is useful in allowing parent APIs to still use urls as textures and bypass preloading
  // as to not require preloading of all textures

  var t;
  var assetName = config;

  // console.log('getTexture', config);

  if (_typeof(assetName) === 'object') {
    // could be sprite sheet
    assetName = config.sheet;
  }
  t = game.preloader.getItem(assetName);
  if (config && typeof config.sprite !== 'undefined') {
    var spriteName = config.sprite;
    var frameIndex = 0;
    if (typeof config.frame === 'number') {
      frameIndex = config.frame;
    }

    // check to see if frameName is present in spritesheet
    if (t && t.frameTags && t.frameTags[spriteName]) {
      var sprite = t.frameTags[spriteName].frames[frameIndex];
      // t.frame = frame;
      return {
        key: t.key,
        url: t.url,
        // asset: t.frameTags[spriteName],
        frames: t.frameTags[spriteName].frames,
        sprite: sprite
      };
    }
  }
  if (t) {
    return {
      key: t.key,
      url: t.url
    };
  }
  return config;
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = cssHandleInputs;
// no longer being used?
function cssHandleInputs() {
  var game = this.game;
  //
  // Updates the player sprite based on the current input
  // Remark: Input and Movement are handled in EntityInput and EntityMovement plugins
  //
  // Spritesheet dimensions
  var spritesheetWidth = 672;
  var spritesheetHeight = 672;
  var cellSize = 48; // Size of each cell in the spritesheet
  var spriteSize = {
    width: 16,
    height: 16
  }; // Actual size of the sprite

  game.on('entityInput::handleInputs', function (entityId, data, sequenceNumber) {
    // throw new Error('line')
    var player = game.getEntity(entityId);
    if (data && player) {
      if (data.controls) {
        game.updateSprite(entityId, data);
      }
    }
  });
}

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateSprite;
function updateSprite(entityId, data, SheetManager, anims) {
  var game = this.game;
  var currentInputs = data.controls;

  // console.log('currentInputs', currentInputs)
  // check to see if we have a player entity
  var playerEntity = game.getEntity(entityId);
  if (!playerEntity) {
    return;
  }
  var direction = null;
  if (currentInputs) {
    if (currentInputs.W) {
      direction = 'Up';
    } else if (currentInputs.A) {
      direction = 'Left';
    } else if (currentInputs.S) {
      direction = 'Down';
    } else if (currentInputs.D) {
      direction = 'Right';
    }
    if (!playerEntity.texture) {
      return;
    }
    var spriteName = playerEntity.texture.sprite;
    var newSpriteName;
    if (!direction) {
      //newSpriteName = 'playerDown';
      // uncomment to re-enable animation
      //return;
    } else {
      newSpriteName = 'player' + direction;
    }

    //console.log('updateSprite', newSpriteName ,direction, entityId, playerEntity, data);

    // check to see if sprite is already set, if so, do not double set
    if (spriteName !== newSpriteName) {
      // if the new sprite name doesn't match, update immediate
      game.updateEntity({
        id: entityId,
        texture: {
          frameIndex: 0,
          sheet: playerEntity.texture.sheet,
          sprite: newSpriteName,
          animationPlaying: true
        }
      });
      return;
    }
    // console.log('updating sprite', spriteName, newSpriteName, 'on', entityId, 'to', newSpriteName)
    /*
      // check to see if controls are all false, if so animationPlaying should be false
      let allFalse = true;
      // console.log('currentInputs', currentInputs)
      for (let key in currentInputs) {
        //console.log(key, currentInputs[key])
        if (currentInputs[key] === true) {
          allFalse = false;
          break;
        }
      }
       //console.log('allFalse', allFalse, currentInputs)
      game.updateEntity({
        id: entityId,
        texture: {
          sheet: playerEntity.texture.sheet,
          sprite: newSpriteName,
          animationPlaying: true
        }
      })
    }
    */
  }
}

},{}]},{},[1])(1)
});
