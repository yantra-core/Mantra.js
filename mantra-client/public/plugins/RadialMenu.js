(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).RadialMenu = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
var RadialMenu = exports["default"] = /*#__PURE__*/function () {
  function RadialMenu() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, RadialMenu);
    this.id = RadialMenu.id;
    this.items = config.items || []; // Array of item names or objects with more properties
    var windowWidth = window.innerWidth;
    this.radius = config.radius || windowWidth / 6; // Use the provided radius or a fraction of the window width
    this.visible = false;
  }
  _createClass(RadialMenu, [{
    key: "init",
    value: function init(game) {
      var _this = this;
      this.game = game;
      this.game.systemsManager.addSystem(this.id, this);
      for (var i = 0; i < 6; i++) {
        this.items.push({
          name: "Item ".concat(i),
          label: "Item ".concat(i),
          image: '/img/game/tiles/tile-block.png',
          value: i,
          action: 'foo'
        });
      }

      // bind event to middle mouse button
      game.on('pointerDown', function (context, event) {
        console.log('pointerDown', context, event);
        if (context.buttons.MIDDLE) {
          _this.toggle();
          event.preventDefault();
        }
      });
      this.createUI();
      this.showMenu(); // Initially show the menu
    }
  }, {
    key: "createUI",
    value: function createUI() {
      var _this2 = this;
      this.angleIncrement = 2 * Math.PI / this.items.length;
      var menuContainer = this.createMenuContainer();
      this.items.forEach(function (item, index) {
        var itemElement = _this2.createMenuItem(item, index);
        menuContainer.appendChild(itemElement);
      });
      document.body.appendChild(menuContainer);
    }
  }, {
    key: "createMenuContainer",
    value: function createMenuContainer() {
      var _this3 = this;
      var container = document.createElement('div');
      container.id = 'radial-menu-container';
      container.className = 'radial-menu-container';
      container.style.cssText = "\n      position: fixed;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%) scale(0);\n      width: ".concat(this.radius * 2, "px;\n      height: ").concat(this.radius * 2, "px;\n      border-radius: 50%;\n      background-color: rgba(0, 0, 0, 0.5);\n      z-index: 1000;\n      transition: transform 0.5s;\n    ");
      document.addEventListener('click', function (event) {
        if (!container.contains(event.target)) {
          _this3.hideMenu();
        }
      });
      return container;
    }
  }, {
    key: "createMenuItem",
    value: function createMenuItem(item, index) {
      var _this4 = this;
      var angle = this.angleIncrement * index;
      var x = Math.cos(angle) * this.radius + this.radius - this.radius * 0.2;
      var y = Math.sin(angle) * this.radius + this.radius - this.radius * 0.2;
      var menuItemSize = this.radius * 0.4;
      var minFontSize = 4;
      var labelFontSize = Math.max(minFontSize, Math.log(this.radius) * 0.4);
      labelFontSize = Math.round(labelFontSize);
      var menuItem = document.createElement('div');
      menuItem.className = 'radial-menu-item';
      menuItem.style.cssText = "\n      position: absolute;\n      top: ".concat(y, "px;\n      left: ").concat(x, "px;\n      width: ").concat(menuItemSize, "px;\n      height: ").concat(menuItemSize, "px;\n      border-radius: 50%;\n      background-color: rgba(0, 0, 0, 0.5);\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      cursor: pointer;\n    ");
      var itemImage = document.createElement('img');
      itemImage.src = item.image;
      itemImage.style.cssText = "\n      width: 70%;\n      height: auto;\n      max-width: 100%;\n      margin: auto;\n    ";
      var itemLabel = document.createElement('div');
      itemLabel.textContent = item.label;
      itemLabel.style.cssText = "\n      color: #FFFFFF;\n      font-size: ".concat(labelFontSize, "px;\n      text-align: center;\n      overflow: hidden;\n      height: 20%;\n    ");
      menuItem.appendChild(itemImage);
      menuItem.appendChild(itemLabel);
      menuItem.onclick = function () {
        _this4.selectItem(item);
      };
      return menuItem;
    }
  }, {
    key: "selectItem",
    value: function selectItem(item) {
      console.log("Item selected: ".concat(item.name));
      this.hideMenu();
    }
  }, {
    key: "toggle",
    value: function toggle() {
      console.log('hhtogglehhh', this.visible);
      if (this.visible) {
        this.hideMenu();
      } else {
        this.showMenu();
      }
    }
  }, {
    key: "hideMenu",
    value: function hideMenu() {
      this.visible = false;
      this.spinClockWiseAndShrink();
    }
  }, {
    key: "showMenu",
    value: function showMenu() {
      this.visible = true;
      var menuContainer = document.getElementById('radial-menu-container');
      if (menuContainer) {
        this.spinCounterClockWiseAndExpand();
      }
    }
  }, {
    key: "spinClockWiseAndShrink",
    value: function spinClockWiseAndShrink() {
      var menuContainer = document.getElementById('radial-menu-container');
      if (menuContainer) {
        menuContainer.style.transform = 'translate(-50%, -50%) scale(0) rotate(360deg)';
      }
    }
  }, {
    key: "spinCounterClockWiseAndExpand",
    value: function spinCounterClockWiseAndExpand() {
      var menuContainer = document.getElementById('radial-menu-container');
      if (menuContainer) {
        menuContainer.style.transform = 'translate(-50%, -50%) scale(1) rotate(-360deg)';
      }
    }
  }]);
  return RadialMenu;
}();
_defineProperty(RadialMenu, "id", 'gui-radial-menu');

},{}]},{},[1])(1)
});
