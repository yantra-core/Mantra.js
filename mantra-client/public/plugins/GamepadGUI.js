(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).GamepadGUI = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ZoomSlider = _interopRequireDefault(require("./lib/ZoomSlider.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var keyMap = {
  'up': 'KeyW',
  'down': 'KeyS',
  'left': 'KeyA',
  'right': 'KeyD'
};
var GamepadGUI = /*#__PURE__*/function () {
  function GamepadGUI() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$useZoomSlider = _ref.useZoomSlider,
      useZoomSlider = _ref$useZoomSlider === void 0 ? true : _ref$useZoomSlider;
    _classCallCheck(this, GamepadGUI);
    this.id = GamepadGUI.id;
    this.hiding = false;
    this.moving = null;
    this.useZoomSlider = useZoomSlider;
    this.useZoomSlider = false;
    this.lastDirection = null; // Add this line
  }
  _createClass(GamepadGUI, [{
    key: "init",
    value: function init(game) {
      var _this = this;
      this.game = game;
      if (this.useZoomSlider) {
        this.zoomSlider = new _ZoomSlider["default"](game);
        // this.zoomSlider.setValue(game.data.camera.currentZoom);
        this.zoomSlider.setValue(4.5);

        // Remark: why is this needed for slider, but not for gamepad?
        game.on('game::ready', function () {
          _this.zoomSlider.slider.style.display = 'block';
        });
      }
      game.loadCSS('/plugins/GamepadGUI/gamepad.css');
      var controllerHolder = document.createElement('div');
      controllerHolder.style.position = 'fixed';
      controllerHolder.style.bottom = '0';
      //   touch-action: manipulation;

      controllerHolder.style.touchAction = 'manipulation';
      //   user-select: none;

      controllerHolder.style.userSelect = 'none';
      //controllerHolder.style.left = '0';

      controllerHolder.style.width = '100%';
      controllerHolder.style.height = '150px';
      controllerHolder.style.zIndex = '9999';
      this.createSNESGamepad(controllerHolder);
      document.body.appendChild(controllerHolder);

      // TODO: refactor DPAD to allow for continuous movement with mouse over, no click required
      var dpadArea = document.createElement('div');
      dpadArea.id = 'dpad-area';
      dpadArea.style.position = 'absolute';
      dpadArea.style.left = '2vmin'; // Adjust based on D-pad position
      dpadArea.style.bottom = '2.5vmin'; // Adjust based on D-pad position
      dpadArea.style.width = '35vmin'; // Match D-pad size
      dpadArea.style.height = '35vmin'; // Match D-pad size
      dpadArea.style.zIndex = '10000';
      // set color for debug
      //dpadArea.style.backgroundColor = 'yellow';
      controllerHolder.appendChild(dpadArea);
      var isPointerDown = false;
      dpadArea.addEventListener('pointerdown', function (ev) {
        isPointerDown = true;
        handleDpadInput(ev);
      });
      document.addEventListener('pointermove', function (ev) {
        if (isPointerDown) {
          handleDpadInput(ev);
        }
      });
      document.addEventListener('pointerup', function (ev) {
        isPointerDown = false;
        cancelDpadInput();
      });
      var that = this;
      function handleDpadInput(ev) {
        // Assume dpadArea is the element representing the D-pad area
        var dpadRect = dpadArea.getBoundingClientRect();
        var dpadCenterX = dpadRect.left + dpadRect.width / 2;
        var dpadCenterY = dpadRect.top + dpadRect.height / 2;
        var deltaX = ev.clientX - dpadCenterX;
        var deltaY = ev.clientY - dpadCenterY;

        // Determine the predominant direction based on the larger offset
        var direction;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          direction = deltaX > 0 ? 'right' : 'left';
        } else {
          direction = deltaY > 0 ? 'down' : 'up';
        }

        // Dispatch keydown events for the corresponding direction

        // document.dispatchEvent(new KeyboardEvent('keydown', { 'code': keyMap[direction] }));

        that.moving = direction;
        var newDirection = direction; // Store the new direction in a variable

        // Check if direction has changed
        if (that.lastDirection && that.lastDirection !== newDirection) {
          // Dispatch keyup event for the last direction
          document.dispatchEvent(new KeyboardEvent('keyup', {
            'code': keyMap[that.lastDirection]
          }));
        }

        // Update lastDirection
        that.lastDirection = newDirection;
        document.dispatchEvent(new KeyboardEvent('keydown', {
          'code': keyMap[newDirection]
        }));
      }
      function cancelDpadInput() {
        if (that.lastDirection) {
          document.dispatchEvent(new KeyboardEvent('keyup', {
            'code': keyMap[that.lastDirection]
          }));
          that.lastDirection = null; // Reset the last direction
        }
      }

      var controller = document.getElementById('snes-gamepad');
      controller.style.position = 'fixed';
      controller.style.left = '50%'; // Center horizontally
      controller.style.bottom = '0'; // Align at the bottom
      controller.style.transform = 'translateX(-50%)'; // Adjust for exact centering

      var select = document.getElementById('select');
      select.addEventListener('pointerdown', function (ev) {
        document.dispatchEvent(new KeyboardEvent('keydown', {
          'code': 'KeyU'
        }));
      });
      select.addEventListener('pointerup', function (ev) {
        document.dispatchEvent(new KeyboardEvent('keyup', {
          'code': 'KeyU'
        }));
      });

      // tooltip text for select
      select.title = 'Open Editor Menu';

      // hidden ( for now )
      graphics.style.display = 'none';
      graphics.addEventListener('pointerdown', function (ev) {
        // show graphics menu
        // get graphicsSelector element
        // TOGGLE GRAPHICS SETTINGS
        var current = game.graphics[0].constructor.name;
        if (current === 'BabylonGraphics') {
          game.switchGraphics('CSSGraphics');
        } else if (current === 'CSSGraphics') {
          game.switchGraphics('BabylonGraphics');
        }
        //document.dispatchEvent(new KeyboardEvent('keydown', { 'code': 'KeyG' }));
      });

      graphics.addEventListener('pointerup', function (ev) {
        //document.dispatchEvent(new KeyboardEvent('keyup', { 'code': 'KeyG' }));
      });
      var start = document.getElementById('start');
      start.title = 'Warp to World';
      start.addEventListener('pointerdown', function (ev) {
        document.dispatchEvent(new KeyboardEvent('keydown', {
          'code': 'KeyI'
        }));
        /*
          TODO: implement pause and rewind
          game.pause();
          game.rewind(500);
        */
      });

      start.addEventListener('pointerup', function (ev) {
        document.dispatchEvent(new KeyboardEvent('keyup', {
          'code': 'KeyI'
        }));
      });
      if (is_touch_enabled()) {
        // hide start and select buttons
        select.style.display = 'none';
        start.style.display = 'none';
      }

      // bind event for id dpad_up, dpad_down, etc
      var dpad_up = document.getElementById('up');
      var dpad_down = document.getElementById('down');
      var dpad_left = document.getElementById('left');
      var dpad_right = document.getElementById('right');
      var buttonY = document.getElementById('y');
      var buttonX = document.getElementById('x');
      buttonY.addEventListener('pointerdown', function (ev) {
        document.dispatchEvent(new KeyboardEvent('keydown', {
          'code': 'KeyK'
        }));
      });
      buttonY.addEventListener('pointerup', function (ev) {
        document.dispatchEvent(new KeyboardEvent('keyup', {
          'code': 'KeyK'
        }));
      });
      buttonX.addEventListener('pointerdown', function (ev) {
        document.dispatchEvent(new KeyboardEvent('keydown', {
          'code': 'KeyO'
        }));
      });
      buttonX.addEventListener('pointerup', function (ev) {
        document.dispatchEvent(new KeyboardEvent('keyup', {
          'code': 'KeyO'
        }));
      });
      var buttonB = document.getElementById('b');
      var buttonA = document.getElementById('a');
      buttonB.addEventListener('pointerdown', function (ev) {
        document.dispatchEvent(new KeyboardEvent('keydown', {
          'code': 'Space'
        }));
      });
      buttonB.addEventListener('pointerup', function (ev) {
        document.dispatchEvent(new KeyboardEvent('keyup', {
          'code': 'Space'
        }));
      });
      buttonA.addEventListener('pointerdown', function (ev) {
        document.dispatchEvent(new KeyboardEvent('keydown', {
          'code': 'KeyP'
        }));
      });
      buttonA.addEventListener('pointerup', function (ev) {
        document.dispatchEvent(new KeyboardEvent('keyup', {
          'code': 'KeyP'
        }));
      });
      if (false && !is_touch_enabled()) {
        var _controller = document.getElementById('snes-gamepad');
        var controllerHeight = _controller.offsetHeight;
        var slideOutPosition = '-' + controllerHeight + 'px'; // Negative value of the controller's height
        _controller.style.bottom = slideOutPosition; // Move the controller outside the viewport
        this.hiding = true;
      }
    }

    // Remark: Update is called once per game loop
  }, {
    key: "update",
    value: function update() {
      // TODO, send inputs
      // this.sendInputs();
    }

    // TODO: refactor this plugin to use sendInputs()
  }, {
    key: "sendInputs",
    value: function sendInputs() {
      // Check if all controls are false
      var allFalse = Object.keys(controls).every(function (key) {
        return !controls[key];
      });

      // Send controls if they are not all false or if the last controls were not all false
      if (!allFalse) {
        this.lastControlsAllFalse = allFalse;
        if (this.game.communicationClient) {
          this.game.communicationClient.sendMessage('player_input', {
            controls: controls
          });
        }
      }
    }

    /*
    let controls2 = {
      'DPAD_UP': yAxis < -deadzone, // Up
      'DPAD_DOWN': yAxis > deadzone,  // Down
      'DPAD_LEFT': xAxis < -deadzone, // Left
      'DPAD_RIGHT': xAxis > deadzone,  // Right
      // y button
      'BUTTON_Y': gamepad.buttons[1].pressed, // "Y" button
      // x button
      'BUTTON_X': gamepad.buttons[3].pressed, // "X" button
      // b button
      'BUTTON_B': gamepad.buttons[2].pressed, // "B" button
      // a button
      'BUTTON_A': gamepad.buttons[0].pressed, // "A" button
      // start button
      'BUTTON_START': gamepad.buttons[9].pressed, // "Start" button
      // select button
      'BUTTON_SELECT': gamepad.buttons[8].pressed, // "Select" button
      // left shoulder button
      'BUTTON_L1': gamepad.buttons[4].pressed, // "L1" button
      // right shoulder button
      'BUTTON_R1': gamepad.buttons[5].pressed, // "R1" button
      // left trigger button
      'BUTTON_L2': gamepad.buttons[6].pressed, // "L2" button
      // right trigger button
      'BUTTON_R2': gamepad.buttons[7].pressed, // "R2" button
      // left stick button
      'BUTTON_L3': gamepad.buttons[10].pressed, // "L3" button
      // right stick button
      'BUTTON_R3': gamepad.buttons[11].pressed, // "R3" button
    };
    */
  }, {
    key: "createSNESGamepad",
    value: function createSNESGamepad(parentElement) {
      var str = "\n  \n  \n<article id=\"snes-gamepad\" aria-label=\"SNES controller\">\n\n  <!-- removed ( for now )\n  <button id=\"l\" class=\"is3d\">Top left<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></button>\n  <button id=\"r\" class=\"is3d\">Top Right<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></button>\n  -->\n  \n  <!-- frame -->\n  <div class=\"face is3d\"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>\n  \n  <!-- Letters and Text -->\n  <h1>SUPER MANTRA</h1>\n  <p>CSS ENTERTAINMENT SYSTEM</p>\n  \n  <p class=\"letter letter-x\" aria-hidden=\"true\">X</p>\n  <p class=\"letter letter-y\" aria-hidden=\"true\">Y</p>\n  <p class=\"letter letter-a\" aria-hidden=\"true\">A</p>\n  <p class=\"letter letter-b\" aria-hidden=\"true\">B</p>\n  <p class=\"letter-start\" aria-hidden=\"true\">START</p>\n  <p class=\"letter-select\" aria-hidden=\"true\">SELECT</p>\n  \n  <!-- directional buttons + axis -->\n  <div class=\"axis is3d\"><div style=\"--z:1\"></div><div style=\"--z:2\"></div><div style=\"--z:3\"></div><div style=\"--z:4\"></div><div style=\"--z:5\"></div><div style=\"--z:6\"></div></div>\n  \n  <!-- Menu buttons (start/select) -->\n  <button id=\"select\" class=\"is3d\">Select<div style=\"--z:1\"></div><div style=\"--z:2\"></div><div style=\"--z:3\"></div><div style=\"--z:4\"></div></button>\n\n  <button id=\"graphics\" class=\"is3d\">Graphics<div style=\"--z:1\"></div><div style=\"--z:2\"></div><div style=\"--z:3\"></div><div style=\"--z:4\"></div></button>\n\n  <button id=\"start\" class=\"is3d\">Start<div style=\"--z:1\"></div><div style=\"--z:2\"></div><div style=\"--z:3\"></div><div style=\"--z:4\"></div></button>\n  <!-- Action buttons -->\n  <div class=\"buttons\">\n    <button id=\"x\" class=\"circle is3d\">x<div></div><div></div><div></div><div></div></button>\n    <button id=\"y\" class=\"circle is3d\">y<div></div><div></div><div></div><div></div></button>\n    <button id=\"a\" class=\"circle is3d\">a<div></div><div></div><div></div><div></div></button>\n    <button id=\"b\" class=\"circle is3d\">b<div></div><div></div><div></div><div></div></button>\n  </div>\n    \n</article>\n\n  \n    ";
      parentElement.innerHTML = str;
    }
  }, {
    key: "render",
    value: function render() {}
  }, {
    key: "destroy",
    value: function destroy() {}
  }]);
  return GamepadGUI;
}();
_defineProperty(GamepadGUI, "id", 'gui-gamepad');
var _default = exports["default"] = GamepadGUI;
function is_touch_enabled() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

/*
game.on('entityInput::handleInputs', (entityId, input) => {
  if (input.controls && input.controls.J !== undefined) {
    if (input.controls.J === false) {
      console.log("FALSE")
    }
    // toggleModalOnKeyPress(input.controls.I);
  }
  if (input.controls && input.controls.K !== undefined) {
    if (input.controls.K === false) {
      // side down the controller
      //document.getElementById('snes-gamepad').style.display = 'block';
      
    } else {

      if (!this.hiding) {
        this.hiding = true;
        document.getElementById('snes-gamepad').style.display = 'none';
      } else {
        this.hiding = false;
        document.getElementById('snes-gamepad').style.display = 'block';
      }

    }
  }
});
*/

/*
let buttonL = document.getElementById('l');
let buttonR = document.getElementById('r');

buttonL.addEventListener('pointerdown', (ev) => {
 
 document.dispatchEvent(new KeyboardEvent('keydown', { 'code': 'KeyJ' }));
});
buttonL.addEventListener('pointerup', (ev) => {
 document.dispatchEvent(new KeyboardEvent('keyup', { 'code': 'KeyJ' }));
});
 
buttonR.addEventListener('pointerdown', (ev) => {
 let controller = document.getElementById('snes-gamepad');
 let controllerHeight = controller.offsetHeight;
 let slideOutPosition = '-' + controllerHeight + 'px'; // Position to slide out
 
 if (this.hiding) {
   // Slide in (show)
   controller.style.bottom = '0px';
   this.hiding = false;
 } else {
   // Slide out (hide)
   controller.style.bottom = slideOutPosition;
   this.hiding = true;
 }
});

   
buttonR.addEventListener('pointerup', (ev) => {
 //document.dispatchEvent(new KeyboardEvent('keydown', { 'code': 'KeyK' }));
});

*/

// TODO: implement haptic feedback for buttons ( if available )
function triggerHapticFeedback() {
  if (navigator.vibrate) {
    // Vibration in milliseconds
    // This is a simple vibration; you can also create patterns
    navigator.vibrate(50);
    game.playNote('C4', 0.8);
  } else {
    // play low frequency tone
    game.playNote('C4');
  }
}

},{"./lib/ZoomSlider.js":2}],2:[function(require,module,exports){
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
var ZoomSlider = exports["default"] = /*#__PURE__*/function () {
  function ZoomSlider(game) {
    _classCallCheck(this, ZoomSlider);
    this.game = game;
    this.minZoom = 0.1; // Minimum zoom level
    this.maxZoom = 10; // Maximum zoom level
    this.slider = this.createSlider();
    this.addEventListeners();
  }
  _createClass(ZoomSlider, [{
    key: "createSlider",
    value: function createSlider() {
      var slider = document.createElement('input');
      slider.id = 'zoomSlider';
      slider.type = 'range';
      slider.min = this.logTransform(this.minZoom);
      slider.max = this.logTransform(this.maxZoom);
      slider.step = 'any';
      slider.value = this.logTransform(1); // Default zoom level, in logarithmic scale

      /*
      slider.style.width = '300px';
      slider.style.margin = '10px';
      */
      slider.style.display = 'none';
      slider.style.zIndex = 9000;
      document.body.appendChild(slider);
      return slider;
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      var _this = this;
      this.slider.addEventListener('input', function (event) {
        _this.handleSliderChange(event);
      });
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      this.slider.value = this.logTransform(value);
    }
  }, {
    key: "handleSliderChange",
    value: function handleSliderChange(event) {
      var logValue = parseFloat(event.target.value);
      var zoomValue = this.inverseLogTransform(logValue);
      this.game.setZoom(zoomValue);
    }
  }, {
    key: "logTransform",
    value: function logTransform(value) {
      // Convert linear scale value to logarithmic scale
      return Math.log(value / this.minZoom) / Math.log(this.maxZoom / this.minZoom);
    }
  }, {
    key: "inverseLogTransform",
    value: function inverseLogTransform(value) {
      // Convert logarithmic scale value back to linear scale
      return this.minZoom * Math.pow(this.maxZoom / this.minZoom, value);
    }
  }]);
  return ZoomSlider;
}();

},{}]},{},[1])(1)
});
