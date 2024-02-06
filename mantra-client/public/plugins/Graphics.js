(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Graphics = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _updateSprite = _interopRequireDefault(require("./lib/updateSprite.js"));
var _getTexture = _interopRequireDefault(require("./lib/getTexture.js"));
var _LoadingCircle = _interopRequireDefault(require("./lib/LoadingCircle.js"));
var _switchGraphics = _interopRequireDefault(require("./lib/switchGraphics.js"));
var _pingPosition = _interopRequireDefault(require("./lib/pingPosition.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
    this.getTexture = _getTexture["default"].bind(this);
    this.switchGraphics = _switchGraphics["default"].bind(this);
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
      this.game.pingPosition = _pingPosition["default"].bind(this);
      this.game.data.camera = this.game.data.camera || {
        position: {
          x: 0,
          y: 0
        },
        minZoom: 0.1,
        maxZoom: 10
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
    value: function setBackground(style, effect) {
      var game = this.game;
      // assume style is CSS color, set body background
      document.body.style.background = style;
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

},{"./lib/LoadingCircle.js":2,"./lib/getTexture.js":3,"./lib/pingPosition.js":4,"./lib/switchGraphics.js":5,"./lib/updateSprite.js":6}],2:[function(require,module,exports){
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
      var rate = t.frameTags[spriteName].rate || 30;
      sprite.name = spriteName;
      var url = game.assetRoot + t.url;
      return {
        key: t.key,
        url: url,
        // asset: t.frameTags[spriteName],
        frames: t.frameTags[spriteName].frames,
        sprite: sprite,
        rate: rate,
        playing: config.playing
      };
    }

    // sprite name is an object, check for x / y positions with width / height
    if (_typeof(spriteName) === 'object') {
      // TODO: add check here for literal sprites unbound to a spritesheet
      var _sprite = {};
      _sprite.x = spriteName.x;
      _sprite.y = spriteName.y;
      _sprite.width = spriteName.width;
      _sprite.height = spriteName.height;
      _sprite.name = spriteName.name;
      var _url = game.assetRoot + t.url;
      return {
        key: t.key,
        url: _url,
        frames: [{
          x: _sprite.x,
          y: _sprite.y
        }],
        sprite: _sprite,
        rate: spriteName.rate || 30
      };
    }
  }
  if (t) {
    var _url2 = game.assetRoot + t.url;
    // console.log('returning url', url)
    return {
      key: t.key,
      url: _url2
    };
  }
  return config;
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = pingPosition;
function pingPosition(x, y) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  // Default configuration for the ripple, with added reverse option
  var config = {
    color: options.color || 'rgba(0, 150, 255, 0.7)',
    // Ripple color
    duration: options.duration || 1000,
    // Ripple effect duration in milliseconds
    size: options.size || 100,
    // Size of the ripple in pixels
    finalSize: options.finalSize || 300,
    // Final size of the ripple in pixels
    borderWidth: options.borderWidth || 2,
    // Border width of the ripple
    reverse: options.reverse || false // Reverse (implosion) effect
  };

  // Create the ripple element
  var ripple = document.createElement('div');
  ripple.style.position = 'fixed';
  ripple.style.border = "".concat(config.borderWidth, "px solid ").concat(config.color);
  ripple.style.borderRadius = '50%';
  ripple.style.pointerEvents = 'none'; // Ignore mouse events
  ripple.style.opacity = 1;
  ripple.style.transition = "all ".concat(config.duration, "ms ease-out");
  if (config.reverse) {
    // For reverse ripple, start from finalSize and shrink to size
    ripple.style.width = "".concat(config.finalSize, "px");
    ripple.style.height = "".concat(config.finalSize, "px");
    ripple.style.left = "".concat(x - config.finalSize / 2, "px");
    ripple.style.top = "".concat(y - config.finalSize / 2, "px");
  } else {
    // For normal ripple, start from size and expand to finalSize
    ripple.style.width = "".concat(config.size, "px");
    ripple.style.height = "".concat(config.size, "px");
    ripple.style.left = "".concat(x - config.size / 2, "px");
    ripple.style.top = "".concat(y - config.size / 2, "px");
  }
  document.body.appendChild(ripple);

  // Trigger the animation
  setTimeout(function () {
    if (config.reverse) {
      // For reverse ripple, shrink to size
      ripple.style.width = "".concat(config.size, "px");
      ripple.style.height = "".concat(config.size, "px");
      ripple.style.left = "".concat(x - config.size / 2, "px");
      ripple.style.top = "".concat(y - config.size / 2, "px");
    } else {
      // For normal ripple, expand to finalSize
      ripple.style.width = "".concat(config.finalSize, "px");
      ripple.style.height = "".concat(config.finalSize, "px");
      ripple.style.left = "".concat(x - config.finalSize / 2, "px");
      ripple.style.top = "".concat(y - config.finalSize / 2, "px");
    }
    ripple.style.opacity = 0;
  }, 0);

  // Remove the ripple after the animation
  setTimeout(function () {
    ripple.remove();
  }, config.duration);
}

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = switchGraphics;
function switchGraphics(graphicsInterfaceName, cb) {
  var _this = this;
  cb = cb || function noop() {};
  var game = this.game;
  var engines = {
    'BabylonGraphics': 'graphics-babylon',
    'PhaserGraphics': 'graphics-phaser',
    'CSSGraphics': 'graphics-css',
    'ThreeGraphics': 'graphics-three'
  };
  var graphicsInterfaceId = engines[graphicsInterfaceName];
  document.body.style.cursor = 'wait';
  // Check if the selected graphics mode is already registered
  if (typeof this.game.systems[graphicsInterfaceId] === 'undefined') {
    this.game.use(graphicsInterfaceName, {
      camera: this.game.data.camera
    });

    // Add event listeners for plugin ready events
    this.game.once("plugin::ready::".concat(graphicsInterfaceId), function () {
      // iterate through all existing graphics ( except this one ) and remove them
      _this.game.graphics.forEach(function (graphics) {
        if (graphics.id !== graphicsInterfaceId) {
          game.systemsManager.removeSystem(graphics.id);
        }
      });

      // redraw all graphics, not needed?
      // this was removed 2/6/2024 because the graphics pipeline should already understand to redraw
      // the ent graphics since entity.graphics will not have the required graphics object
      /*
      for (let [eId, state] of this.game.entities.entries()) {
        let ent = this.game.entities.get(eId);
        // console.log('rendering', ent)
        game.graphics.forEach(function (graphicsInterface) {
          if (graphicsInterface.inflateEntity) {
            // legacy api, remove soon
            graphicsInterface.inflateEntity(ent);
          } else {
            graphicsInterface.inflateGraphic(ent);
          }
        });
        // this.game.changedEntities.delete(eId);
      }
      */
      console.log("BABYLON READY");
      // Remark: cursor was immediately defaulting instead of wait, so moved it into BabylonGraphics.js itself
      // document.body.style.cursor = 'default';
      cb(null);
    });
  } else {
    document.body.style.cursor = 'default';
    cb(null);
  }
}

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateSprite;
function updateSprite(entityId, actions, SheetManager, anims) {
  var game = this.game;
  var currentActions = actions;

  // console.log('updateSprite', entityId, actions, SheetManager, anims)
  // console.log('currentInputs', currentInputs)
  // check to see if we have a player entity
  var playerEntity = game.getEntity(entityId);
  if (!playerEntity) {
    return;
  }
  var direction = null;
  if (!currentActions) {
    return;
  }
  if (!playerEntity.texture) {
    return;
  }
  var currentAction = currentActions[0];
  switch (currentAction) {
    case 'MOVE_LEFT':
      direction = 'Left';
      break;
    case 'MOVE_RIGHT':
      direction = 'Right';
      break;
    case 'PLAYER_UP':
      direction = 'Up';
      break;
    case 'PLAYER_DOWN':
      direction = 'Down';
      break;
    default:
      direction = null;
  }
  var spriteName = playerEntity.texture.sprite;
  var newSpriteName;
  if (!direction) {
    newSpriteName = spriteName;
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
  } else {
    /*
    game.updateEntity({
      id: entityId,
      texture: {
        frameIndex: 0,
        sheet: playerEntity.texture.sheet,
        sprite: newSpriteName,
        animationPlaying: false
      }
    })
    */
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

},{}]},{},[1])(1)
});
