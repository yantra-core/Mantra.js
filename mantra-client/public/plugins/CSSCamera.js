(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).CSSCamera = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _setTransform = _interopRequireDefault(require("./lib/camera/setTransform.js"));
var _rotateCameraOverTime = _interopRequireDefault(require("./lib/camera/rotateCameraOverTime.js"));
var _updateCameraPosition = _interopRequireDefault(require("./lib/camera/updateCameraPosition.js"));
var _updateEntityPosition = _interopRequireDefault(require("./lib/camera/updateEntityPosition.js"));
var _mouseWheelZoom = _interopRequireDefault(require("./lib/camera/mouseWheelZoom.js"));
var _zoom = _interopRequireDefault(require("./lib/camera/zoom.js"));
var _cameraShake = _interopRequireDefault(require("./lib/camera/cameraShake.js"));
var _applyThrow = _interopRequireDefault(require("./lib/camera/applyThrow.js"));
var _update = _interopRequireDefault(require("./lib/camera/update.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // CSSCamera.js - Marak Squires 2023
// Camera Transform
// Camera Entity Position ( used for `follow` and `CSSGraphics` )
// Camera Zoom
// Camera effects
// main update loop for camera
var CSSCamera = /*#__PURE__*/function () {
  function CSSCamera(scene) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, CSSCamera);
    this.id = CSSCamera.id;
    this.scene = scene;
    this.config = config;
    this.follow = true;
    this.isDragging = false;
    this.dragInertia = {
      x: 0,
      y: 0
    };
    this.isThrowing = false;
    this.rotating = false;
    this.mouseWheelEnabled = true;
    this.mouseWheelZoom = _mouseWheelZoom["default"].bind(this);
    this.zoom = _zoom["default"].bind(this);
    this.setTransform = _setTransform["default"].bind(this);
    this.updateEntityPosition = _updateEntityPosition["default"].bind(this);
    this.cameraShake = _cameraShake["default"].bind(this);
  }
  _createClass(CSSCamera, [{
    key: "init",
    value: function init(game) {
      var _this = this;
      this.game = game;
      // this.resetCameraState();
      this.game.shakeCamera = _cameraShake["default"].bind(this); // for now
      game.zoom = this.zoom.bind(this);
      game.setZoom = this.zoom.bind(this); // TODO: legacy remove

      game.data.camera = {
        mode: 'follow',
        position: {
          x: 0,
          y: 0
        }
      };
      this.updateCameraPosition = _updateCameraPosition["default"].bind(this);
      this.applyThrow = _applyThrow["default"].bind(this);
      this.update = _update["default"].bind(this);
      this.scene.setTransform = this.setTransform.bind(this);
      this.scene.updateEntityPosition = this.updateEntityPosition.bind(this);

      // hoist rotateCamera to game
      game.rotateCamera = _rotateCameraOverTime["default"].bind(this);

      // sets auto-follow player when starting CSSGraphics ( for now )
      this.follow = true;
      this.game.systemsManager.addSystem('graphics-css-camera', this);
      var gameHolder = document.getElementById('gameHolder');
      if (!gameHolder) {
        gameHolder = document.createElement('div');
        gameHolder.id = 'gameHolder';
        document.body.appendChild(gameHolder); // Append to the body or to a specific element as needed
      }

      this.gameViewport = document.getElementById('gameHolder');
      this.gameViewport.style.transformOrigin = 'center center';
      this.initZoomControls();
      game.on('entityInput::handleInputs', function (entityId, data, sequenceNumber) {
        //console.log("CSSCamera.js", entityId, data, sequenceNumber)
        if (data.mouse) {
          // Update camera position based on drag deltas
          if (data.mouse.buttons.RIGHT) {
            _this.gameViewport.style.cursor = 'grabbing';
          }
          // console.log('Current Zoom', game.data.camera.currentZoom);
          data.mouse.dx = data.mouse.dx || 0;
          data.mouse.dy = data.mouse.dy || 0;
          var zoomFactor = 1 / game.data.camera.currentZoom || 4.5;
          var adjustedDx = data.mouse.dx * zoomFactor;
          var adjustedDy = data.mouse.dy * zoomFactor;
          //console.log('Adjusted Dx', adjustedDx, 'og', data.mouse.dx);
          _this.updateCameraPosition(-adjustedDx, -adjustedDy, data.mouse.isDragging);
        }
      });
    }
  }, {
    key: "resetCameraState",
    value: function resetCameraState() {
      // Reset other camera properties as needed
      this.game.viewportCenterXOffset = 0;
      this.game.viewportCenterYOffset = 0;
    }
  }, {
    key: "initZoomControls",
    value: function initZoomControls() {
      document.addEventListener('wheel', this.mouseWheelZoom, {
        passive: false
      });
      this.scene.mouseWheelEnabled = true;
    }

    // TODO: move rotateCamera and cancelThrow to common camera file
    // Method to rotate the camera
  }, {
    key: "rotateCamera",
    value: function rotateCamera(angle) {
      // Ensure the angle is a number and set a default if not
      if (typeof angle !== 'number') {
        console.error('Invalid angle for rotateCamera. Must be a number.');
        return;
      }
      // Update the CSS transform property to rotate the viewport
      this.gameViewport.style.transform = "rotate(".concat(angle, "deg)");
    }
  }, {
    key: "cancelThrow",
    value: function cancelThrow() {
      this.isThrowing = false;
      this.dragInertia = {
        x: 0,
        y: 0
      };
      // Reset cursor style back to default
      this.gameViewport.style.cursor = 'grab';
    }
  }, {
    key: "unload",
    value: function unload() {
      // remove event listeners
      document.removeEventListener('wheel', this.mouseWheelZoom);
    }
  }]);
  return CSSCamera;
}();
_defineProperty(CSSCamera, "id", 'css-camera');
var _default = exports["default"] = CSSCamera;

},{"./lib/camera/applyThrow.js":2,"./lib/camera/cameraShake.js":3,"./lib/camera/mouseWheelZoom.js":4,"./lib/camera/rotateCameraOverTime.js":5,"./lib/camera/setTransform.js":6,"./lib/camera/update.js":7,"./lib/camera/updateCameraPosition.js":8,"./lib/camera/updateEntityPosition.js":9,"./lib/camera/zoom.js":10}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = applyThrow;
// Apply the throw inertia to the camera
function applyThrow() {
  if (!this.isThrowing) return;
  var game = this.game;
  var decayFactor = 0.985; // Increase closer to 1 for longer throws

  game.viewportCenterXOffset += this.dragInertia.x;
  game.viewportCenterYOffset += this.dragInertia.y;

  // Decrease the inertia
  this.dragInertia.x *= decayFactor;
  this.dragInertia.y *= decayFactor;

  // Continue the animation if inertia is significant
  if (Math.abs(this.dragInertia.x) > 0.1 || Math.abs(this.dragInertia.y) > 0.1) {
    requestAnimationFrame(this.applyThrow.bind(this));
  } else {
    this.isThrowing = false;
    // console.log("1 STOPPED THROWING")
  }

  if (!this.isThrowing) {
    // Reset cursor style back to default at the end of a throw
    this.gameViewport.style.cursor = 'grab';
    //console.log("2 STOPPED THROWING")
  }
}

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = cameraShake;
// cameraShake.js - Marak Squires 2023
function cameraShake(_ref) {
  var _this = this;
  var _ref$initialIntensity = _ref.initialIntensity,
    initialIntensity = _ref$initialIntensity === void 0 ? 100 : _ref$initialIntensity,
    _ref$duration = _ref.duration,
    duration = _ref$duration === void 0 ? 777 : _ref$duration;
  var gameViewport = document.getElementById('gameHolder');
  if (!gameViewport) {
    console.log('Warning: could not find gameHolder div, cannot apply camera shake');
    return;
  }

  // Debounce mechanism
  if (gameViewport.dataset.isShaking === 'true') {
    console.log('Camera is already shaking. Ignoring additional shake requests.');
    return;
  }
  gameViewport.dataset.isShaking = 'true';

  // Capture the initial transform state before starting the shake effect
  var initialTransform = gameViewport.style.transform;
  var startTime = Date.now();
  var shake = function shake() {
    var elapsedTime = Date.now() - startTime;
    var remainingTime = duration - elapsedTime;
    if (remainingTime <= 0) {
      // Reset transform to the initial state after shaking completes
      gameViewport.style.transform = initialTransform;
      gameViewport.dataset.isShaking = 'false'; // Reset the debounce flag
      return;
    }

    // Gradually reduce the intensity
    var intensity = initialIntensity * (remainingTime / duration);

    // Smooth shake effect using sine function
    var x = intensity * Math.sin(elapsedTime / 100) * (Math.random() > 0.5 ? 1 : -1);
    var y = intensity * Math.cos(elapsedTime / 100) * (Math.random() > 0.5 ? 1 : -1);

    // Apply the shake effect on top of the initial transform
    gameViewport.style.transform = "".concat(initialTransform, " translate(").concat(x, "px, ").concat(y, "px)");

    // Apply a random force to each entity
    Object.keys(_this.game.data.ents._).forEach(function (eId) {
      var entity = _this.game.data.ents._[eId];
      // TODO: make more configurable / part of constructor config
      // TODO: add a shakeable flag to entities / add parameter for tracking "shakeability", etc
      if (entity.type === 'PARTICLE' || entity.type === 'STAR' || entity.type === 'HEXAPOD' || entity.type === 'DEMON') {
        var forceX = Math.random() * intensity - intensity / 2;
        var forceY = Math.random() * intensity - intensity / 2;
        forceX = forceX * 0.01;
        forceY = forceY * 0.01;
        game.applyForce(eId, {
          x: forceX,
          y: forceY
        });
      }
    });
    requestAnimationFrame(shake);
  };
  shake();
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = cssMouseWheelZoom;
function cssMouseWheelZoom(event) {
  if (!this.mouseWheelEnabled) {
    return;
  }

  // check that target is gameHolder, if not cancel
  // Remark: This should suffice for CSSGraphics, this is required for embedding or other page interactions
  //         outside of the Mantra Game
  if (event.target !== document.body) {
    return false;
  }
  var game = this.game;
  var scale = game.data.camera.currentZoom;

  // Zoom settings
  var zoomSettings = {
    intensity: 0.1,
    // Base zoom intensity
    minScale: 0.1,
    // Minimum scale limit
    logBase: 2 // Logarithmic base
  };

  // Prevent default scrolling behavior
  event.preventDefault();

  // Determine zoom direction
  var delta = event.wheelDelta ? event.wheelDelta : -event.detail;
  var direction = delta > 0 ? 1 : -1;

  // Applying logarithmic scale for smooth zoom
  var logScaledIntensity = zoomSettings.intensity * Math.log(scale + 1) / Math.log(zoomSettings.logBase);
  var newScale = Math.max(zoomSettings.minScale, scale + direction * logScaledIntensity);

  // Update scale
  this.zoom(newScale);
}

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = rotateCameraOverTime;
// Method to smoothly rotate the camera over a given duration using CSS transitions
function rotateCameraOverTime() {
  var _this = this;
  var targetAngle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 90;
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1100;
  if (typeof targetAngle !== 'number' || typeof duration !== 'number') {
    console.error('Invalid arguments for rotateCameraOverTime. Both targetAngle and duration must be numbers.');
    return;
  }
  if (this.rotating) {
    return;
  }
  this.rotating = true;
  this.game.data.camera.rotation = targetAngle;

  // Retrieve the current zoom level
  var currentZoom = this.game.data.camera.currentZoom;

  // Calculate the center of the screen
  var centerX = window.innerWidth / 2;
  var centerY = window.innerHeight / 2;

  // console.log('this.cameraPosition.y', this.game.data.camera.position.y)
  // TODO: camera center is still not correct when zoom scale is not 1
  // no need for X?
  // centerX = centerX / currentZoom;
  // centerY = centerY / currentZoom;
  // centerY = centerY + this.game.viewportCenterYOffset;
  // centerY = centerY +  this.game.data.camera.position.y / currentZoom;
  // Set the transition property on the gameViewport
  this.gameViewport.style.transition = "transform ".concat(duration, "ms");

  // Set transform-origin to the calculated center
  this.gameViewport.style.transformOrigin = "".concat(centerX, "px ").concat(centerY, "px");

  // Apply the combined scale (for zoom) and rotation
  this.gameViewport.style.transform = "scale(".concat(currentZoom, ") rotate(").concat(targetAngle, "deg)");

  // Reset the transition after the animation is complete
  setTimeout(function () {
    _this.gameViewport.style.transition = '';
    _this.rotating = false;
    _this.gameViewport.style.transformOrigin = '50% 50%';
    _this.gameViewport.style.transform = "scale(".concat(currentZoom, ") rotate(", 0, "deg)");
  }, duration);
}

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setTransform;
function setTransform(entityData, entityElement, domX, domY, rotation, angle) {
  // Retrieve the last rotation value, default to 0 if not set
  var lastRotation = entityElement.dataset.rotation || 0;

  // Check if the element has a background image
  var hasBackgroundImage = entityElement.style.backgroundImage && entityElement.style.backgroundImage !== 'none';

  // Update rotation if provided and no background image
  if (rotation /*&& !hasBackgroundImage*/) {
    lastRotation = angle;
    entityElement.dataset.rotation = angle;
  }

  // Update the transform property
  var newTransform = "translate(".concat(truncateToPrecision(domX, 2), "px, ").concat(truncateToPrecision(domY, 2), "px)");

  // Add rotation to the transform if no background image
  if (!hasBackgroundImage) {}
  if (entityData.type !== 'PLAYER') {
    newTransform += " rotate(".concat(lastRotation, "deg)");
  }

  // compare the new transform to the previous transform
  // if they are the same, don't update
  var prevTransform = entityElement.style.transform;
  if (prevTransform !== newTransform) {
    entityElement.style.transform = newTransform;
  }
}
function truncateToPrecision(value, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
}

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = update;
var _zoom = _interopRequireDefault(require("./zoom.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function update() {
  var game = this.game;
  var currentPlayer = this.game.getEntity(game.currentPlayerId);

  // Current zoom level
  var currentZoom = game.data.camera.currentZoom;

  // Get browser window dimensions
  var windowHeight = window.innerHeight;
  var windowWidth = window.innerWidth;
  var zoomFactor = this.game.data.camera.currentZoom;
  // console.log('zoomFactor', zoomFactor)

  if (typeof game.viewportCenterXOffset !== 'number') {
    game.viewportCenterXOffset = 0;
  }
  if (typeof game.viewportCenterYOffset !== 'number') {
    game.viewportCenterYOffset = 0;
  }

  // Update the camera position
  if (this.follow && currentPlayer && currentPlayer.position) {
    //this.scene.cameraPosition.x = this.scene.cameraPosition.x / zoomFactor;
    /*
    let newY = currentPlayer.position.y + game.viewportCenterYOffset;
    //newY = newY / zoomFactor;
    if (game.data.camera.mode === 'platform') {
      // locks camera to not exceed bottom of screen for platform mode
      if (newY < windowHeight * 0.35) {
        this.scene.cameraPosition.y = newY;
      } else {
        this.scene.cameraPosition.y = windowHeight * 0.35;
      }
    } else {
      this.scene.cameraPosition.y = newY;
    }
    */

    //
    // If following the player is enabled, the camera position is always the player position
    //
    if (this.follow) {
      this.scene.cameraPosition.x = currentPlayer.position.x;
      this.scene.cameraPosition.y = currentPlayer.position.y;
    }

    //
    // If there are any view port offsets from dragging or scrolling
    // Adjust the camera position by these offsets
    //
    if (typeof game.viewportCenterXOffset !== 'number') {
      game.viewportCenterXOffset = 0;
    }
    if (typeof game.viewportCenterYOffset !== 'number') {
      game.viewportCenterYOffset = 0;
    }
    this.scene.cameraPosition.x += game.viewportCenterXOffset;
    this.scene.cameraPosition.y += game.viewportCenterYOffset;

    //
    // Find the center of the screen
    //
    var centerX = window.innerWidth / 2;
    var centerY = window.innerHeight / 2;

    //
    // Create a new position to move the renderDiv in order to keep the camera centered
    // Based on current zoom settings
    //
    var adjustedPosition = {
      x: this.scene.cameraPosition.x - centerX,
      y: this.scene.cameraPosition.y - centerY
    };

    //
    // Apply the current zoom level to adjust the position
    //
    adjustedPosition.x *= this.game.data.camera.currentZoom;
    adjustedPosition.y *= this.game.data.camera.currentZoom;

    // Calculate the size of the visible area in the game's world space at the current zoom level
    var visibleWidth = window.innerWidth / this.game.data.camera.currentZoom;
    var visibleHeight = window.innerHeight / this.game.data.camera.currentZoom;

    // Determine the offsets needed to center the viewport on the player in the game's world space
    var offsetX = (window.innerWidth - visibleWidth) / 2;
    var offsetY = (window.innerHeight - visibleHeight) / 2;
    offsetX = offsetX * this.game.data.camera.currentZoom;
    offsetY = offsetY * this.game.data.camera.currentZoom;
    adjustedPosition.y += offsetY;
    if (this.scene.renderDiv) {
      setTransform(this.scene.renderDiv, -adjustedPosition.x, -adjustedPosition.y, this.game.data.camera.currentZoom, 0);
    }
  } else {
    // If not following a player, use the calculated offsets directly
    this.scene.cameraPosition.x = game.viewportCenterXOffset;
    this.scene.cameraPosition.y = game.viewportCenterYOffset;
  }

  // Update the camera's position in the game data
  this.game.data.camera.position = this.scene.cameraPosition;
}
function setTransform(container, offsetX, offsetY, zoom, rotation) {
  // Retrieve the last applied values from the container's dataset
  var lastOffsetX = parseFloat(container.dataset.lastOffsetX) || 0;
  var lastOffsetY = parseFloat(container.dataset.lastOffsetY) || 0;
  var lastZoom = parseFloat(container.dataset.lastZoom) || 1;
  var lastRotation = parseFloat(container.dataset.lastRotation) || 0;

  // Improved checks for NaN and finite numbers
  // We shouldn't get NaN at this stage; however it's better to not apply an invalid transform than to break the layout,
  // as subsequent calls may provide valid values. This issue came up in embed scenarios
  offsetX = Number.isFinite(offsetX) ? offsetX : lastOffsetX;
  offsetY = Number.isFinite(offsetY) ? offsetY : lastOffsetY;
  zoom = Number.isFinite(zoom) && zoom > 0 ? zoom : lastZoom; // Zoom should not be negative
  rotation = Number.isFinite(rotation) ? rotation : lastRotation;

  // Check if the new values differ from the last applied values
  if (offsetX !== lastOffsetX || offsetY !== lastOffsetY || zoom !== lastZoom || rotation !== lastRotation) {
    // Apply the new transform only if there's a change
    container.style.transform = "translate(".concat(offsetX, "px, ").concat(offsetY, "px) scale(").concat(zoom, ") rotate(").concat(rotation, "deg)");
    // Update the container's dataset with the new values
    container.dataset.lastOffsetX = offsetX.toString();
    container.dataset.lastOffsetY = offsetY.toString();
    container.dataset.lastZoom = zoom.toString();
    container.dataset.lastRotation = rotation.toString();
  }
}

},{"./zoom.js":10}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateCameraPosition;
// Method to update camera position based on drag
function updateCameraPosition(dx, dy, isDragging) {
  var game = this.game;

  // New throw is starting, cancel existing throw
  if (this.isDragging && !isDragging) {
    this.cancelThrow();
  }
  if (isDragging) {
    this.gameViewport.style.cursor = 'grabbing';
    this.isDragging = true;
    // this.follow = false;
    if (typeof dx === 'number') {
      game.viewportCenterXOffset += dx;
    }
    if (typeof dy === 'number') {
      game.viewportCenterYOffset += dy;
    }
  }
  if (this.isDragging && !isDragging && (dx !== 0 || dy !== 0)) {
    // console.log('THROWING', dx, dy)
    this.isThrowing = true;
    this.isDragging = false;
    if (Math.abs(dx) > 2) {
      this.dragInertia.x = dx * 1.6;
    }
    if (Math.abs(dy) > 2) {
      this.dragInertia.y = dy * 1.6;
    }
    requestAnimationFrame(this.applyThrow.bind(this));
  }
  if (!isDragging) {
    this.isDragging = false;
  }
}

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateEntityPosition;
function updateEntityPosition(entityElement, entityData) {
  var position = entityData.position;
  var rotation = entityData.rotation;
  var type = entityData.type;
  var width = entityData.width;
  var height = entityData.height;
  if (typeof entityData.radius === 'number') {
    width = entityData.radius;
    height = entityData.radius;
  }

  // Field of view (FoV) dimensions
  var fovWidth = window.outerWidth;
  var fovHeight = window.outerHeight;
  fovWidth = 600;
  fovHeight = 600;

  /* Remark: Removed 2/7/2024
            Entities are no longer transformed per camera
            Instead entities are transformed per game holder
            Camera will apply transforms to the game holder
     Reason: Performance, we don't need to transform every entity per camera
     let adjustedPosition = {
      x: position.x - (this.scene.cameraPosition.x -  window.innerWidth / 2),
      y: position.y - (this.scene.cameraPosition.y - window.outerHeight / 2)
    };
  */

  var adjustedPosition = {
    x: position.x,
    y: position.y
  };
  // Check if the entity is within the field of view
  // Remark: Field of View is disabled ( for now ), it *should* be working as expected,
  //         the current implementation will hide the entity, we should removeEntity() instead
  if (true || isWithinFieldOfView(game, position, this.cameraPosition, width, height, fovWidth, fovHeight)) {
    var domX = adjustedPosition.x - width / 2;
    var domY = adjustedPosition.y - height / 2;

    // Convert rotation to degrees
    var angle = rotation * (180 / Math.PI);

    // Apply transformation to the entity
    this.setTransform(entityData, entityElement, domX, domY, rotation, angle);
    entityElement.style.display = ''; // Make sure the element is visible
  } else {
    /*
    if (entityData.type !== 'BACKGROUND' || entityData.type !== 'building') {
      // Hide the entity if it's outside the field of view
      entityElement.style.display = 'none';
    }
    */
  }
  if (entityData.style && entityData.style.display === 'none') {
    entityElement.style.display = 'none';
  }
  return entityElement;
}
function isWithinFieldOfView(game, position, cameraPosition, width, height, fovWidth, fovHeight) {
  // Calculate the center position of the entity
  var entityCenterX = position.x + width / 2;
  var entityCenterY = position.y + height / 2;

  // Calculate the distance from the entity center to the camera position
  var distanceX = entityCenterX - cameraPosition.x;
  var distanceY = entityCenterY - cameraPosition.y + 100;

  // Calculate the maximum allowed distance for an entity to be within the FoV
  // This can be half of the FoV width or height, depending on how you define the FoV area
  var maxDistance = Math.min(fovWidth, fovHeight);
  var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  // console.log('distance', distance, maxDistance)
  // Check if the entity is within the distance
  return distance <= maxDistance;
}

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = zoom;
var minZoom = 0.1;
var maxZoom = 10;
function zoom(scale) {
  var transitionTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0s';
  if (scale < minZoom) {
    scale = minZoom;
  }
  if (scale > maxZoom) {
    scale = maxZoom;
  }
  this.game.data.camera.currentZoom = scale;
}

},{}]},{},[1])(1)
});
