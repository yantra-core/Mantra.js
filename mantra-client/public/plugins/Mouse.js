(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Mouse = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// Mouse.js - Marak Squires 2023
// TODO: Split this file into multiple functions
var inputsBound = false;
var Mouse = exports["default"] = /*#__PURE__*/function () {
  function Mouse(communicationClient) {
    _classCallCheck(this, Mouse);
    this.id = Mouse.id;
    // this.communicationClient = communicationClient;
    // this.game = this.communicationClient.game;
    this.mousePosition = {
      x: 0,
      y: 0
    };
    this.disableContextMenu = true;
    this.isDragging = false;
    this.dragStartPosition = {
      x: 0,
      y: 0
    };
    this.inputsBound = false;
    // Stores current values of mouse buttons
    this.mouseButtons = {
      LEFT: null,
      RIGHT: null,
      MIDDLE: null
    };

    // Configurable mouse button mappings
    this.buttonMappings = {
      LEFT: 0,
      // Default to the standard left button index
      MIDDLE: 1,
      // Default to the standard middle button index
      RIGHT: 2 // Default to the standard right button index
    };

    this.tagAllowsDefaultEvent = ['BUTTON', 'INPUT', 'TEXTAREA', 'SELECT', 'CODE', 'PRE', 'A', 'H3'];
    this.tagPreventsGameEvent = ['SELECT', 'BUTTON', 'LABEL', 'INPUT'];

    // Window() / gui.js related, ensures UI windows captures clicks
    this.disallowedPointerDownTags = ['H3'];
    this.disallowedPointerDownClasses = ['gui-container'];
    this.activeTouches = {}; // Store active touches
    // TODO: support 3+ touches
    this.firstTouchId = null; // Track the first touch for movement
    this.secondTouchId = null; // Track the second touch for firing
    this.endedFirstTouch = false;
    this.endedSecondTouch = false;
    this.boundHandleMouseMove = this.handleMouseMove.bind(this);
    this.boundHandleMouseDown = this.handleMouseDown.bind(this);
    this.boundHandleMouseUp = this.handleMouseUp.bind(this);
    this.boundHandleMouseOut = this.handleMouseOut.bind(this);
    this.boundHandleMouseOver = this.handleMouseOver.bind(this);
    this.boundHandlePointerDown = this.handlePointerDown.bind(this);
    this.boundHandlePointerMove = this.handlePointerMove.bind(this);
    this.boundHandlePointerUp = this.handlePointerUp.bind(this);
    this.boundHandleWindowBlur = this.handleWindowBlur.bind(this);
    this.boundHandleMouseLeave = this.handleMouseLeave.bind(this);
  }
  _createClass(Mouse, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.id = Mouse.id;
      game.config.mouseMovementButton = 'LEFT';
      game.config.mouseActionButton = 'RIGHT';
      this.bindInputControls();
      this.game.systemsManager.addSystem(this.id, this);
    }

    // Method to update button mappings
  }, {
    key: "setButtonMapping",
    value: function setButtonMapping(button, newMapping) {
      if (this.buttonMappings.hasOwnProperty(button)) {
        this.buttonMappings[button] = newMapping;
      } else {
        console.error("Invalid button: ".concat(button));
      }
    }

    // Method to get the current mapping for a button
  }, {
    key: "getButtonMapping",
    value: function getButtonMapping(button) {
      return this.buttonMappings[button] || null;
    }

    // Common function to generate mouse context with world coordinates
    // TODO: we'll need implement createMouseContext and entity detection per Graphics adapter
  }, {
    key: "createMouseContext",
    value: function createMouseContext(event) {
      var clientX = event.clientX,
        clientY = event.clientY;
      var canvas = event.target instanceof HTMLCanvasElement ? event.target : null;
      var canvasPosition = canvas ? this.getCanvasPosition(canvas, clientX, clientY) : null;
      var worldPosition = this.getWorldPosition(clientX, clientY);
      var targetElement = event.target;
      var mantraId = null;
      while (targetElement && targetElement !== document.body) {
        if (targetElement.getAttribute && targetElement.getAttribute('mantra-id')) {
          mantraId = targetElement.getAttribute('mantra-id');
          break; // Mantra ID found, break the loop
        }

        targetElement = targetElement.parentNode; // Move up to the parent node
      }

      this.updateSelectedEntity(mantraId, event.target);
      var context = {
        mousePosition: {
          x: clientX,
          y: clientY
        },
        canvasPosition: canvasPosition,
        worldPosition: worldPosition,
        event: event,
        entityId: this.game.selectedEntityId || null,
        isDragging: this.isDragging,
        dragStartPosition: this.dragStartPosition,
        buttons: this.mouseButtons,
        firstTouchId: this.firstTouchId,
        secondTouchId: this.secondTouchId,
        activeTouchCount: Object.keys(this.activeTouches).length,
        activeTouches: this.activeTouches,
        target: null,
        owner: null
      };

      // Assign the target and owner entities if they exist
      if (this.game.data && this.game.data.ents && this.game.data.ents._) {
        context.target = this.game.data.ents._[this.game.selectedEntityId] || null;
        context.owner = this.game.data.ents._[this.game.currentPlayerId] || null;
      }

      // Alias for worldPosition for developer convenience
      context.position = context.worldPosition;
      // Legacy API / developer helper
      context.x = context.position.x;
      context.y = context.position.y;
      return context;
    }
  }, {
    key: "getCanvasPosition",
    value: function getCanvasPosition(canvas, clientX, clientY) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }
  }, {
    key: "getWorldPosition",
    value: function getWorldPosition(clientX, clientY) {
      var _this$game$data$camer = this.game.data.camera,
        offsetX = _this$game$data$camer.offsetX,
        offsetY = _this$game$data$camer.offsetY,
        currentZoom = _this$game$data$camer.currentZoom,
        position = _this$game$data$camer.position;
      return {
        x: (clientX - window.innerWidth / 2 + offsetX) / currentZoom + position.x,
        y: (clientY - window.innerHeight / 2 + offsetY) / currentZoom + position.y
      };
    }
  }, {
    key: "updateSelectedEntity",
    value: function updateSelectedEntity(mantraId, target) {
      if (mantraId) {
        this.game.selectedEntityId = mantraId;
      } else if (target.tagName !== 'BODY') {
        this.game.selectedEntityId = null;
      }
    }

    // Method to handle window blur event
  }, {
    key: "handleWindowBlur",
    value: function handleWindowBlur() {
      // Reset pointer states
      this.isDragging = false;
      this.activeTouches = {};
      this.firstTouchId = null;
      this.secondTouchId = null;
      this.endedFirstTouch = false;
      this.endedSecondTouch = false;

      // Reset mouse buttons states
      this.mouseButtons = {
        LEFT: null,
        RIGHT: null,
        MIDDLE: null
      };

      // update the game with the new mouse state ( all off )
      this.sendMouseData();
    }
  }, {
    key: "handleMouseLeave",
    value: function handleMouseLeave() {
      // Reset pointer states
      this.isDragging = false;
      this.activeTouches = {};
      this.firstTouchId = null;
      this.secondTouchId = null;
      this.endedFirstTouch = false;
      this.endedSecondTouch = false;

      // Reset mouse buttons states
      this.mouseButtons = {
        LEFT: null,
        RIGHT: null,
        MIDDLE: null
      };

      // update the game with the new mouse state ( all off )
      this.sendMouseData();
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(event) {
      var game = this.game;
      var target = event.target;

      // only update if single firsTouch id
      if (this.firstTouchId) {
        if (event.pointerId === this.firstTouchId && !this.secondTouchId) {
          //if (event.pointerId === this.firstTouchId || (!this.firstTouchId && event.pointerType === 'mouse')) {
          this.mousePosition = {
            x: event.clientX,
            y: event.clientY
          };
        }
      } else {
        this.mousePosition = {
          x: event.clientX,
          y: event.clientY
        };
      }
      if (event.target instanceof HTMLCanvasElement) {
        var canvas = event.target;
        var rect = canvas.getBoundingClientRect();
        this.canvasPosition = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        };
      } else {
        // if not a canvas, set relative position to null or keep the previous position
        this.canvasPosition = null;
      }

      // If dragging, calculate the delta and send drag data
      if (this.isDragging) {
        var dx = this.mousePosition.x - this.dragStartPosition.x;
        var dy = this.mousePosition.y - this.dragStartPosition.y;
        this.dx = dx;
        this.dy = dy;

        // Update the drag start position for the next movement
        this.dragStartPosition = {
          x: this.mousePosition.x,
          y: this.mousePosition.y
        };
      }
      this.sendMouseData();

      // get the reference to this ent, check for pointerdown event
      if (this.game.data && this.game.data.ents && this.game.data.ents._) {
        var ent = this.game.data.ents._[this.game.selectedEntityId];
        if (ent && ent.pointermove) {
          var _context = ent;
          ent.pointermove(ent, event);
        }
      }
      var context = this.createMouseContext(event);
      context.x = context.position.x; // legacy API expects world position at root x and y
      context.y = context.position.y; // can remove these mappings later
      this.game.emit('pointerMove', context, event);
    }
  }, {
    key: "updateMouseButtons",
    value: function updateMouseButtons(event, isDown) {
      var buttonType;
      switch (event.button) {
        case this.buttonMappings.LEFT:
          buttonType = 'LEFT';
          break;
        case this.buttonMappings.MIDDLE:
          buttonType = 'MIDDLE';
          break;
        case this.buttonMappings.RIGHT:
          buttonType = 'RIGHT';
          break;
        default:
          console.error("Unknown button index: ".concat(event.button));
          return;
      }
      if (buttonType) {
        this.mouseButtons[buttonType] = isDown;
      }
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(event) {
      var target = event.target;
      var game = this.game;
      var preventDefault = false;
      this.updateMouseButtons(event, true);

      // middle mouse button
      if (event.button === this.buttonMappings.MIDDLE) {
        //
        // Do not allow Game related mouse down events on certain classes such as UI elements
        //
        // if the tag ( like the H3 window header is disallowed, return early and not allow dragging
        if (this.disallowedPointerDownTags.includes(target.tagName)) {
          return;
        }
        // if the class is disallowed, return early and not allow dragging ( gui-content )
        if (this.disallowedPointerDownClasses.some(function (className) {
          return target.classList.contains(className);
        })) {
          return;
        }

        //
        // This is a two finger drag event, do not process as single mouse pointer event
        //
        if (this.firstTouchId && this.secondTouchId) {
          // prevent default right click menu
          event.preventDefault();
          return;
        }
        this.isDragging = true;
        this.dragStartPosition = {
          x: event.clientX,
          y: event.clientY
        };
        // TODO: set cursor to grabbing
        // document.body.style.cursor = 'grabbing';

        // If LEFT mouse button is mapped to camera drag, prevent default event for inputs and other
        // elements the user may still wish to interact with
        // Remark: We seem to have an issue preventing default on PRE and CODE elements
        // TODO: Allow prevent default on PRE and CODE elements
        // check to see if target element is interactive ( such as button / input / textarea / etc )
        if (!this.tagAllowsDefaultEvent.includes(target.tagName)) {
          // console.log('allowing default event', target)
          preventDefault = false;
        } else {
          //console.log('preventing default', target)
          // this will enable things like <a> links to work and <textarea> to gain focus
          preventDefault = true;
        }
      }
      if (this.tagPreventsGameEvent.includes(target.tagName)) {
        preventDefault = true;
      }
      var context = this.createMouseContext(event);

      //
      // If the target that was clicked has a pointerdown event, call it
      // Is important this happens before preventDefault check,
      // as the element such as Select or Button may have a pointerdown event bound from ECS
      if (context.target && context.target.pointerdown) {
        context.target.pointerdown(context, event);
      }

      // if prevent, return before game emits global game pointerdown event
      if (preventDefault) {
        // event.stopPropagation(); // TODO: do we need to stop propagation?
        // event.preventDefault();  // TODO: is preventDefault needed here?
        // we return such that no game events are emitted
        return;
      }
      this.game.emit('pointerDown', context, event);

      // check to see if game is running in iframe, if soo broadcast the event with context
      // check if in iframe
      if (window.parent !== window) {
        // TODO: make this a config option
        // send the message to the iframe
        window.parent.postMessage({
          type: 'pointerDown',
          context: {
            entityId: this.game.selectedEntityId,
            position: context.position,
            buttons: this.mouseButtons
          }
        }, '*');
      }
      this.sendMouseData(event);
    }
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp(event) {
      this.updateMouseButtons(event, false);
      if (event.button === this.buttonMappings.MIDDLE) {
        this.isDragging = false;
        // prevent default right click menu
        event.preventDefault();
      }

      // get the reference to this ent, check for pointerdown event
      var ent = this.game.data.ents._[this.game.selectedEntityId];
      if (ent && ent.pointerup) {
        var _context2 = ent;
        ent.pointerup(ent, event);
      }
      var context = this.createMouseContext(event);
      context.endedFirstTouch = this.endedFirstTouch;
      context.endedSecondTouch = this.endedSecondTouch;
      this.game.emit('pointerUp', context, event);
      this.sendMouseData(event);
    }
  }, {
    key: "handleMouseOut",
    value: function handleMouseOut(event) {
      // TODO: refactor all mouse event handling into common function that can
      // create the world position and other context data we need to pass forward to ECS
      var target = event.target;
      var game = this.game;
      if (target && target.getAttribute) {
        var mantraId = target.getAttribute('mantra-id');
        if (mantraId) {
          this.game.selectedEntityId = mantraId;
          if (this.game.data && this.game.data.ents) {
            // get the reference to this ent, check for pointerout event
            var ent = this.game.data.ents._[mantraId];
            if (ent && ent.pointerout) {
              var context = ent;
              ent.pointerout(ent, event);
            }
          }
        }
      }
      this.game.emit('pointerOut', event);
    }
  }, {
    key: "handleMouseOver",
    value: function handleMouseOver(event) {
      var target = event.target;
      this.game.emit('pointerOver', this.game.selectedEntityId || {}, event);
      this.sendMouseData(event);
    }
  }, {
    key: "handlePointerDown",
    value: function handlePointerDown(event) {
      // Add the new touch to the active touches
      this.activeTouches[event.pointerId] = {
        x: event.clientX,
        y: event.clientY
      };

      // Assign first and second touches if not already assigned
      if (this.firstTouchId === null) {
        this.firstTouchId = event.pointerId;
        // First touch logic (e.g., movement)
      } else if (this.secondTouchId === null) {
        this.secondTouchId = event.pointerId;
        // alert('second')
        // Second touch logic (e.g., firing)
      }
      // once we have done special processing, call the regular mantra mouse event
      this.handleMouseDown(event);
    }
  }, {
    key: "handlePointerMove",
    value: function handlePointerMove(event) {
      if (this.activeTouches[event.pointerId]) {
        // Update touch position
        this.activeTouches[event.pointerId] = {
          x: event.clientX,
          y: event.clientY
        };

        // Movement or other continuous actions based on pointerId
        if (event.pointerId === this.firstTouchId) {
          // Movement logic
        } else if (event.pointerId === this.secondTouchId) {
          // Firing logic
        }
      }
      // once we have done special processing, call the regular mantra mouse event
      this.handleMouseMove(event);
    }
  }, {
    key: "handlePointerUp",
    value: function handlePointerUp(event) {
      // Determine if this pointerId matches first or second touch identifiers
      this.endedFirstTouch = event.pointerId === this.firstTouchId;
      this.endedSecondTouch = event.pointerId === this.secondTouchId;

      // Remove the touch from active touches
      delete this.activeTouches[event.pointerId];

      // Reset first or second touch ID if they are lifted
      if (event.pointerId === this.firstTouchId) {
        this.firstTouchId = null;
      } else if (event.pointerId === this.secondTouchId) {
        this.secondTouchId = null;
      }

      // once we have done special processing, call the regular mantra mouse event
      this.handleMouseUp(event);
    }
  }, {
    key: "sendMouseData",
    value: function sendMouseData(event) {
      var mouseData = {
        position: this.mousePosition,
        // absolute position
        canvasPosition: this.canvasPosition,
        // relative position to any canvas
        buttons: this.mouseButtons,
        isDragging: this.isDragging,
        dragStartPosition: this.dragStartPosition,
        dx: this.dx,
        dy: this.dy,
        event: event,
        worldPosition: {
          x: (this.mousePosition.x - window.innerWidth / 2 + this.game.data.camera.offsetX) / this.game.data.camera.currentZoom + this.game.data.camera.position.x,
          y: (this.mousePosition.y - window.innerHeight / 2 + this.game.data.camera.offsetY) / this.game.data.camera.currentZoom + this.game.data.camera.position.y
        }
      };
      // this.game.data.mouse = this.game.data.mouse || {};
      this.game.data.mouse = mouseData;
      if (this.game.communicationClient) {
        this.game.communicationClient.sendMessage('player_input', {
          mouse: mouseData
        });
      }
    }
  }, {
    key: "preventMultiTouchDefault",
    value: function preventMultiTouchDefault(event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    }
  }, {
    key: "preventGestureDefault",
    value: function preventGestureDefault(event) {
      event.preventDefault();
    }
  }, {
    key: "bindInputControls",
    value: function bindInputControls() {
      if (inputsBound === true) {
        return;
      }
      inputsBound = true;
      var game = this.game;
      if (game.isTouchDevice()) {
        document.addEventListener('pointerover', this.boundHandleMouseOver);
        document.addEventListener('pointerout', this.boundHandleMouseOut);
        document.addEventListener('pointermove', this.boundHandlePointerMove);
        document.addEventListener('pointerdown', this.boundHandlePointerDown);
        document.addEventListener('pointerup', this.boundHandlePointerUp);

        // Prevent default on non-pointer events to handle multi-touch zoom
        document.addEventListener('touchstart', this.preventMultiTouchDefault, {
          passive: false
        });
        document.addEventListener('touchmove', this.preventMultiTouchDefault, {
          passive: false
        });
        document.addEventListener('gesturestart', this.preventGestureDefault, {
          passive: false
        });
      } else {
        document.addEventListener('mouseover', this.boundHandleMouseOver);
        document.addEventListener('mouseout', this.boundHandleMouseOut);
        document.addEventListener('mousemove', this.boundHandleMouseMove);
        document.addEventListener('mousedown', this.boundHandleMouseDown);
        document.addEventListener('mouseup', this.boundHandleMouseUp);
      }

      // window / tab has lost focused
      window.addEventListener('blur', this.boundHandleWindowBlur);
      // mouse leaves window, window may still have focus
      document.body.addEventListener('mouseleave', this.boundHandleMouseLeave);

      // TODO: could be a config option
      // TODO: this should be able to bind / unbind based on user actions, defaultMouseMovement
      //       the default behavior should be such that right click and wheel works unless bound explicitly
      if (this.disableContextMenu) {
        document.addEventListener('contextmenu', function (event) {
          // Handle internal Mantra events first before prevent default to disable browser right click menu
          //let context = this.createMouseContext(event); 
          //this.game.emit('ecsInternalEvent', context); 
          // Prevent the default context menu from appearing
          event.preventDefault();
        });
      }
      var initialDistance = null; // Store the initial distance between two touches
      var currentZoom = 1; // Assuming 1 is your game's initial zoom level

      // Helper function to calculate the distance between two points
      function getDistance(touch1, touch2) {
        var dx = touch1.pageX - touch2.pageX;
        var dy = touch1.pageY - touch2.pageY;
        return Math.sqrt(dx * dx + dy * dy);
      }

      // Helper function to clamp the zoom level within the specified range
      function clampZoom(zoomLevel) {
        return Math.max(0.5, Math.min(zoomLevel, 3.5));
      }
      document.addEventListener('touchstart', function (event) {
        if (event.touches.length === 2) {
          // Initialize the initial distance between the two fingers
          initialDistance = getDistance(event.touches[0], event.touches[1]);
        }
      }, {
        passive: false
      });
      document.addEventListener('touchmove', function (event) {
        if (event.touches.length > 1) {
          // Calculate the new distance between the two touches
          var newDistance = getDistance(event.touches[0], event.touches[1]);
          if (initialDistance !== null) {
            // Calculate the zoom factor based on the change in distance
            var zoomFactor = newDistance / initialDistance;

            // Apply the zoom factor to the current zoom level
            var newZoomLevel = currentZoom * zoomFactor;

            // Clamp the new zoom level to ensure it's within the specified range
            newZoomLevel = clampZoom(newZoomLevel);

            // Update the game's zoom level
            //game.zoom(newZoomLevel);
            //game.flashText(newZoomLevel.toFixed(1)); // Display the new zoom level for debugging

            // Update the current zoom level for the next calculation
            //currentZoom = newZoomLevel;

            // Update the initial distance for the next move event
            initialDistance = newDistance;
          }
          event.preventDefault(); // Prevent default pinch-to-zoom behavior
        }
      }, {
        passive: false
      });
      document.addEventListener('touchend', function (event) {
        // Reset the initial distance when one or both fingers are lifted
        initialDistance = null;
      }, {
        passive: false
      });
      document.addEventListener('gesturestart', function (event) {
        event.preventDefault();
      }, {
        passive: false
      });
    }
  }, {
    key: "unbindAllEvents",
    value: function unbindAllEvents() {
      var game = this.game;
      if (game.isTouchDevice()) {
        // unbind all events
        document.removeEventListener('pointerover', this.boundHandleMouseOver);
        document.removeEventListener('pointerout', this.boundHandleMouseOut);
        document.removeEventListener('pointermove', this.boundHandlePointerMove);
        document.removeEventListener('pointerdown', this.boundHandlePointerDown);
        document.removeEventListener('pointerup', this.boundHandlePointerUp);
      } else {
        // unbind all events
        document.removeEventListener('mouseover', this.boundHandleMouseOver);
        document.removeEventListener('mouseout', this.boundHandleMouseOut);
        document.removeEventListener('mousemove', this.boundHandleMouseMove);
        document.removeEventListener('mousedown', this.boundHandleMouseDown);
        document.removeEventListener('mouseup', this.boundHandleMouseUp);
      }
      window.removeEventListener('blur', this.boundHandleWindowBlur);
      window.removeEventListener('mouseleave', this.boundHandleMouseLeave);
    }
  }, {
    key: "unload",
    value: function unload() {
      this.unbindAllEvents();
    }
  }]);
  return Mouse;
}();
_defineProperty(Mouse, "id", 'mouse');

},{}]},{},[1])(1)
});
