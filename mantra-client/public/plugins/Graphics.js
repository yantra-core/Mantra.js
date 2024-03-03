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
        currentZoom: 1,
        minZoom: 0.1,
        maxZoom: 10,
        adaptiveZoom: true
      };
      if (this.game.isClient) {
        // Ensure the gameHolder div exists
        var gameHolder = document.getElementById('gameHolder');
        if (!gameHolder) {
          gameHolder = document.createElement('div');
          gameHolder.id = 'gameHolder';

          // always append as first element
          document.body.insertBefore(gameHolder, document.body.firstChild);

          // document.body.appendChild(gameHolder); // Append to the body or to a specific element as needed
        }

        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
      }

      game.flash = triggerItemPickupEffect;
      game.flashText = triggerAnimeTextEffect;
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
function triggerItemPickupEffect() {
  var effect = document.getElementById('itemPickupEffect');

  // Create the effect element if it doesn't exist
  if (!effect) {
    effect = document.createElement('div');
    effect.id = 'itemPickupEffect';
    document.body.appendChild(effect);

    // Apply initial styles
    Object.assign(effect.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      display: 'none',
      zIndex: '9999' // Ensure it's above other elements
    });
  }

  // Apply animation
  effect.style.display = 'block';
  effect.style.animation = 'glow 1s ease-out forwards';

  // Calculate shadow size relative to screen size
  var initialShadowSize = window.innerHeight * 0.25; // 45% from top and bottom for initial state
  var maxShadowSize = window.innerHeight * 0.5; // 90% from top and bottom for mid-animation state

  // Set up CSS animation keyframes if not already defined
  var styleSheet = document.getElementById('glowAnimation');
  if (!styleSheet) {
    styleSheet = document.createElement('style');
    styleSheet.id = 'glowAnimation';
    document.head.appendChild(styleSheet);
  }

  // TODO: config color
  var color = '#ccc';
  styleSheet.innerHTML = "\n    @keyframes glow {\n      0% {\n        box-shadow: 0 0 30px ".concat(initialShadowSize, "px ").concat(color, " inset;\n        opacity: 1;\n      }\n      50% {\n        box-shadow: 0 0 60px ").concat(maxShadowSize, "px ").concat(color, "  inset;\n        opacity: 1;\n      }\n      100% {\n        box-shadow: 0 0 30px ").concat(initialShadowSize, "px ").concat(color, "  inset;\n        opacity: 0;\n      }\n    }\n  ");

  // Reset the effect after it finishes
  setTimeout(function () {
    effect.style.display = 'none';
    effect.style.animation = 'none'; // Reset animation
  }, 2000); // Hide effect after 2 seconds
}

function triggerAnimeTextEffect(textMessage) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    styles: {
      color: '#FF0',
      // Custom style overrides
      fontSize: '12rem'
    },
    animations: [{
      name: 'panIn',
      duration: '3s',
      timingFunction: 'ease-out'
    }

    // { name: 'rotate', duration: '5s', timingFunction: 'linear', delay: 3, iterationCount: 'infinite' },
    // Add more animations as needed
    ],

    totalDuration: 4000 // Total duration to keep the effect visible
  };

  // return;
  var textEffect = document.getElementById('animeTextEffect');

  // Create the text effect element if it doesn't exist
  if (!textEffect) {
    textEffect = document.createElement('div');
    textEffect.id = 'animeTextEffect';
    document.body.appendChild(textEffect);

    // Set default styles
    textEffect.style = "\n      position: fixed;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      font-size: 12rem;\n      font-weight: bold;\n      color: #FF0;\n      text-shadow: 0 0 20px #FFF;\n      opacity: 0;\n      pointer-events: none;\n      z-index: 9999; // Ensure it's above other elements\n    ";
  }

  // Apply custom styles from options
  if (options && options.styles) {
    Object.assign(textEffect.style, options.styles);
  }

  // Set the text
  textEffect.textContent = textMessage;

  // Construct animation sequence based on options
  var animationSequence = '';
  if (options && options.animations) {
    options.animations.forEach(function (anim, index) {
      animationSequence += "".concat(anim.name, " ").concat(anim.duration, " ").concat(anim.timingFunction, " ").concat(anim.delay || 0, "s ").concat(anim.iterationCount || 'forwards');
      if (index < options.animations.length - 1) {
        animationSequence += ', ';
      }
    });
  }
  textEffect.style.display = 'block';
  textEffect.style.animation = animationSequence;

  // Set up CSS animation keyframes if not already defined
  var styleSheet = document.getElementById('textAnimation');
  if (!styleSheet) {
    styleSheet = document.createElement('style');
    styleSheet.id = 'textAnimation';
    document.head.appendChild(styleSheet);
  }
  var keyframes = "\n    @keyframes panIn {\n      0% { transform: translate(-50%, -150%) scale(0.5); opacity: 0; }\n      100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }\n    }\n    @keyframes panOut {\n      0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }\n      100% { transform: translate(-50%, 150%) scale(0.5); opacity: 0; }\n    }\n    @keyframes swipeRight {\n      0% { transform: translate(-50%, -50%) rotate(0deg); }\n      100% { transform: translate(50%, -50%) rotate(360deg); }\n    }\n    @keyframes rotate {\n      0% { transform: translate(-50%, -50%) rotate(0deg); }\n      100% { transform: translate(-50%, -50%) rotate(360deg); }\n    }\n  ";
  styleSheet.innerHTML = keyframes;

  // Reset the effect after some time
  setTimeout(function () {
    // perform fadeout opacity instead of hiding immediately
    // TODO: fadeout, better animation text management
    textEffect.style.display = 'none';
    textEffect.style.animation = 'none'; // Reset animation
  }, options.totalDuration || 8000); // Use totalDuration from options or default to 8 seconds
}

//triggerAnimeTextEffect('test text yo')
// Example usage:
/*
triggerAnimeTextEffect('Level Cleared!', {
  styles: {
    color: '#FFF', // Custom style overrides
    fontSize: '10rem',
  },
  animations: [
    { name: 'panIn', duration: '3s', timingFunction: 'ease-out' },
    // { name: 'rotate', duration: '5s', timingFunction: 'linear', delay: 3, iterationCount: 'infinite' },
    // Add more animations as needed
  ],
  totalDuration: 8000 // Total duration to keep the effect visible
});
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
    assetName = config.sheet || config.model;
  }

  // console.log('getting texture', config, assetName)

  t = game.preloader.getItem(assetName);
  if (typeof t === 'undefined') {
    return null;
  }
  var url = game.assetRoot + t.url;
  if (t.loadedModel) {
    return {
      url: url,
      key: t.key,
      model: t.loadedModel
    };
  }
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
function pingPosition(x, y, z) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
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

  // scale size based on current this.game.data.camera.currentZoom
  var scale = this.game.data.camera.currentZoom;
  config.size *= scale;
  config.finalSize *= scale;

  // adjust based on the current this.game.data.camera.position
  //x += this.game.data.camera.offsetX;
  //y += this.game.data.camera.offsetY;

  // Create the ripple element
  var ripple = document.createElement('div');
  ripple.style.position = 'fixed';
  ripple.style.border = "".concat(config.borderWidth, "px solid ").concat(config.color);
  ripple.style.borderRadius = '50%';
  ripple.style.pointerEvents = 'none'; // Ignore mouse events
  ripple.style.opacity = 1;
  ripple.style.transition = "all ".concat(config.duration, "ms ease-out");
  ripple.style.zIndex = z;
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
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function switchGraphics(_x, _x2) {
  return _switchGraphics.apply(this, arguments);
}
function _switchGraphics() {
  _switchGraphics = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(graphicsInterfaceName, cb) {
    var game, previousCameras, engines, mappings, graphicsInterfaceId;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          cb = cb || function noop() {};
          game = this.game;
          previousCameras = {};
          engines = {
            'BabylonGraphics': 'graphics-babylon',
            // 'PhaserGraphics': 'graphics-phaser',
            'CSSGraphics': 'graphics-css',
            'ThreeGraphics': 'graphics-three'
          };
          mappings = {
            'babylon': 'BabylonGraphics',
            'css': 'CSSGraphics',
            'three': 'ThreeGraphics'
          };
          graphicsInterfaceName = mappings[graphicsInterfaceName] || graphicsInterfaceName;
          graphicsInterfaceId = engines[graphicsInterfaceName];
          document.body.style.cursor = 'wait';

          // clone the camera object
          previousCameras[graphicsInterfaceId] = {
            currentZoom: game.data.camera.currentZoom,
            adaptiveZoom: game.data.camera.adaptiveZoom
          };

          // Check if the selected graphics mode is already registered
          if (!(typeof this.game.systems[graphicsInterfaceId] === 'undefined')) {
            _context.next = 16;
            break;
          }
          _context.next = 12;
          return this.game.use(graphicsInterfaceName, {
            camera: this.game.data.camera
          });
        case 12:
          this.game.graphics.forEach(function (graphics) {
            if (graphics.id !== graphicsInterfaceId) {
              game.systemsManager.removeSystem(graphics.id);
            }
          });
          document.body.style.cursor = 'default';
          _context.next = 18;
          break;
        case 16:
          // invalid graphics interface, do nothing
          console.warn('Invalid graphics interface: ' + graphicsInterfaceName);
          document.body.style.cursor = 'default';
        case 18:
          // check to see if there was a previous camera object
          if (previousCameras[graphicsInterfaceId]) {
            // restore the previous zoom
            game.data.camera.adaptiveZoom = previousCameras[graphicsInterfaceId].adaptiveZoom;
          } else {
            if (graphicsInterfaceId === 'three' || graphicsInterfaceName === 'ThreeGraphics') {
              // game.setZoom(3.5);
            }
          }
        case 19:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return _switchGraphics.apply(this, arguments);
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
