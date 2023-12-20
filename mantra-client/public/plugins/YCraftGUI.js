(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).YCraftGUI = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// TODO:
// Allow option to set window as background
// Allow option for simple 4x4 grid for windows
// Default mode is to place 2x2 vertical on left side first,
// then 2x2 vertical on right side
// Then for 3, its top left, bottom left, top right, with bottom right empty
// For 4 each is 1x1, the entire window is filled at 4x4
// Repeat same logic in units of 4 for 8, 12, 16, etc
// Max windows is 64

// TODO: all windows should have footers with a toolbar ( empty for now )
// TODO: windows should have option to run "skinless" with no header or footer, no traffic lights

//import lightTheme from "./themes/light.js";
//import darkTheme from "./themes/dark.js";
// gui.js - Marak Squires 2023
var gui = {
  /*
  setTheme: function (name) {
    if (name === 'light') {
      this.theme(lightTheme);
    } else if (name === 'dark') {
      this.theme(darkTheme);
    } else {
      console.log(`Theme ${name} not found, defaulting to light theme`);
      this.theme(lightTheme);
    }
  },
  theme: function (theme) {
    // theme is an object gui-elements and cssObjects
    // for each gui element type in the theme
    // find *all* nodes that match the type
    // iterate over each node and apply the cssObject
    console.log('setting theme', theme)
    for (let type in theme) {
      let cssObject = theme[type];
      let nodes = document.querySelectorAll(`.${type}`);
      console.log('ffff', nodes)
      nodes.forEach(node => {
        this.skin(node, cssObject);
      });
    }
  },
  skin: function(guiElement, cssObject) {
    // guiElement is a DOM element
    // cssObject is an object with css properties
    for (let property in cssObject) {
      // update the live node style
      guiElement.style[property] = cssObject[property];
      // update the style sheet for all future nodes
      // this will override any inline styles
      let styleSheet = document.styleSheets[0];
      let selector = `.${guiElement.className}`;
      let rule = `${property}: ${cssObject[property]}`;
      let index = styleSheet.cssRules.length;
      styleSheet.insertRule(`${selector} { ${rule} }`, index);
     }
  },
  */
  elementList: ['gui-container', 'gui-content', 'gui-header', 'gui-header-title', 'traffic-light', 'close', 'minimize', 'maximize', 'resizeHandle', 'gui-window-footer'],
  window: function window(id) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Window';
    var close = arguments.length > 2 ? arguments[2] : undefined;
    var pluginInstance = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var self = this;
    if (typeof close === 'undefined') {
      close = function close() {
        console.log("WARNING: No close function provided for window with id: " + id + ", defaulting to remove()");
        document.getElementById(id).remove();
      };
    }
    // Create container
    var container = document.createElement('div');
    container.id = id;
    container.className = 'gui-container';

    // Create the content of the container
    var content = document.createElement('div');
    content.className = 'gui-content';

    // Create a draggable header
    var guiHeader = document.createElement('div');
    guiHeader.className = 'gui-header';

    // create a utility gear icon in header that will call game.systems['gui-plugin-explorer'].drawPluginForm(pluginName)
    if (false && pluginInstance) {
      var gearIcon = document.createElement('i');
      gearIcon.className = 'fas fa-cog';
      gearIcon.style["float"] = 'right';
      gearIcon.style.cursor = 'pointer';
      gearIcon.style.top = '20px';
      gearIcon.style.right = '20px';
      gearIcon.style.fontSize = '50px';
      gearIcon.innerHTML = "FFF";
      gearIcon.onclick = function () {
        console.log(pluginInstance);
        game.systems['gui-plugin-explorer'].drawPluginForm(pluginInstance, game._plugins[pluginInstance.id]);
      };
      guiHeader.appendChild(gearIcon);
    }

    // Traffic light container
    var trafficLightContainer = document.createElement('div');
    trafficLightContainer.className = 'traffic-light-container';

    // Add traffic light buttons
    var closeButton = document.createElement('div');
    var minimizeButton = document.createElement('div');
    var maximizeButton = document.createElement('div');
    closeButton.className = 'traffic-light close';
    minimizeButton.className = 'traffic-light minimize';
    maximizeButton.className = 'traffic-light maximize';
    minimizeButton.onclick = function () {
      return close();
    };
    closeButton.onclick = function () {
      return close();
    };
    maximizeButton.onclick = function () {
      self.maxWindow(container);
    };
    trafficLightContainer.appendChild(closeButton);
    trafficLightContainer.appendChild(minimizeButton);
    trafficLightContainer.appendChild(maximizeButton);
    guiHeader.appendChild(trafficLightContainer);

    // create h3 for title
    var guiHeaderTitle = document.createElement('h3');
    guiHeaderTitle.textContent = title;

    // add "double click" event to h3 to maximize window
    guiHeaderTitle.ondblclick = function () {
      self.maxWindow(container);
    };
    guiHeader.appendChild(guiHeaderTitle);
    container.appendChild(guiHeader);
    container.appendChild(content);

    // Add resize handle
    var resizeHandle = document.createElement('div');
    resizeHandle.className = 'resizeHandle';
    container.appendChild(resizeHandle);

    // Append the container to the document body
    document.body.appendChild(container);

    // Initialize dragging and resizing
    this.initializeDrag(guiHeader, container);
    this.initializeResize(resizeHandle, container);

    // Add event listener for click to manage z-index
    container.addEventListener('click', function () {
      // Bring the clicked container to the front
      gui.bringToFront(container);
    });
    return container;
  },
  maxWindow: function maxWindow(container) {
    if (container.style.width === '100vw') {
      container.style.width = '50%';
      container.style.height = '50%';
      // set position to center

      if (typeof container.lastTop !== 'undefined') {
        container.style.top = container.lastTop;
        container.style.left = container.lastLeft;
      } else {
        container.style.top = '20%';
        container.style.left = '20%';
      }
    } else {
      // store the exact last position on container itself
      // use special property
      container.lastTop = container.style.top;
      container.lastLeft = container.style.left;
      container.style.width = '100vw';
      container.style.height = '90%';
      // set position to top left
      container.style.top = '50px';
      container.style.left = '0px';
    }
  },
  initializeResize: function initializeResize(resizeHandle, container) {
    var _this = this;
    resizeHandle.addEventListener('mousedown', function (e) {
      e.preventDefault();
      gui.bringToFront(container);
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResize);
    });
    var resize = function resize(e) {
      // Set new width and height of the container
      _this.container.style.width = e.clientX - _this.container.offsetLeft + 'px';
      _this.container.style.height = e.clientY - _this.container.offsetTop + 'px';
    };
    var stopResize = function stopResize() {
      window.removeEventListener('mousemove', resize);
    };
  },
  initializeDrag: function initializeDrag(dragElement, container) {
    var offsetX = 0,
      offsetY = 0,
      mouseX = 0,
      mouseY = 0;
    dragElement.onmousedown = dragMouseDown;
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      gui.bringToFront(container);
      // Get the mouse cursor position at startup
      mouseX = e.clientX;
      mouseY = e.clientY;
      document.onmouseup = closeDragElement;
      // Call a function whenever the cursor moves
      document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // Calculate the new cursor position
      offsetX = mouseX - e.clientX;
      offsetY = mouseY - e.clientY;
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Set the element's new position
      dragElement.parentElement.style.top = dragElement.parentElement.offsetTop - offsetY + "px";
      dragElement.parentElement.style.left = dragElement.parentElement.offsetLeft - offsetX + "px";
    }
    function closeDragElement() {
      // Stop moving when mouse button is released
      document.onmouseup = null;
      document.onmousemove = null;
    }
  },
  bringToFront: function bringToFront(clickedContainer) {
    // Get all gui-containers
    var containers = document.querySelectorAll('.gui-container');

    // Set z-index of all containers to 1
    containers.forEach(function (container) {
      container.style.zIndex = '1';
    });

    // Set z-index of the clicked container to 10
    clickedContainer.style.zIndex = '10';
  }
};
gui.init = function (game) {
  if (typeof document === 'undefined') {
    console.log('gui-plugin: document not found, skipping initialization');
    return;
  }
  // add a global click handler to document that will delegate any clicks
  // that are not inside gui-windows to re-enable inputs
  document.addEventListener('click', function (e) {
    // check if the click was inside a gui-window
    var guiWindow = e.target.closest('.gui-container');
    if (game && game.systems && game.systems['entity-input'] && game.systems['keyboard']) {
      if (!guiWindow) {
        // re-enable inputs
        game.systems['entity-input'].setInputsActive();
        game.systems['keyboard'].bindInputControls();
      } else {
        // disable inputs
        game.systems['entity-input'].disableInputs();
        game.systems['keyboard'].unbindAllEvents();
      }
    }
  });

  // bind the ESC key
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      // get all gui-containers
      var containers = document.querySelectorAll('.gui-container');

      // TODO: unload the plugin instead of removing the container
      // remove the last one
      var lastContainer = containers[containers.length - 1];
      if (lastContainer) {
        lastContainer.remove();
      }
    }
  });
};
var _default = exports["default"] = gui;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _gui = _interopRequireDefault(require("../gui-editor/gui.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var YCraftGUI = /*#__PURE__*/function () {
  function YCraftGUI() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, YCraftGUI);
    this.id = YCraftGUI.id;
    this.logContainer = null;
    this.logTextArea = null;
    this.pingTestComplete = false;

    // TODO: move all this code to YCraftGUI.js
    this.etherspaceHost = 'http://192.168.1.80:8889/api/v1';
    //etherspaceHost = 'https://etherspace.ayyo.gg/api/v1';
    this.etherspaceEndpoint = this.etherspaceHost + '';
  }
  _createClass(YCraftGUI, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      // this.createDisplay();

      var self = this;
      // Call the function to create and append the HTML structure
      this.createContraptionViewer();
    }
  }, {
    key: "createContraptionViewer",
    value: function createContraptionViewer() {
      this.container = _gui["default"].window('entitiesView', 'YCraft Contraption Viewer', function () {
        game.systemsManager.removeSystem(EntitiesGUI.id);
      });
      this.container.style.top = '100px';
      this.container.style.left = '60px';

      // Create main container div
      var mainContainer = document.createElement('div');
      mainContainer.id = 'main-container';

      // Create header and title
      var header = document.createElement('header');

      /*
      var h1 = document.createElement('h1');
      h1.textContent = 'YCraft Contraption Viewer';
      header.appendChild(h1);
      */

      // Create contraption interface section
      var section = document.createElement('section');
      section.id = 'contraption-interface';

      // Create display contraption div
      var displayContraption = document.createElement('div');
      displayContraption.id = 'display-contraption';
      /*
      var h3 = document.createElement('h3');
      h3.innerHTML = 'Contraption Name: <span id="contraption-name-display"></span>';
      displayContraption.appendChild(h3);
      */

      // Create form for saving contraption
      var saveForm = document.createElement('form');
      saveForm.id = 'save-contraption-form';
      var label = document.createElement('label');
      label.setAttribute('for', 'contraption-name');
      label.textContent = 'Contraption Name:';
      var input = document.createElement('input');
      input.type = 'text';
      input.id = 'contraption-name';
      input.placeholder = 'Enter contraption name';
      input.required = true;
      var saveButton = document.createElement('button');
      saveButton.type = 'submit';
      saveButton.textContent = 'Save Contraption';
      //saveForm.appendChild(label);
      //saveForm.appendChild(input);
      //saveForm.appendChild(saveButton);

      // Create form for running contraption
      var runForm = document.createElement('form');
      runForm.id = 'run-contraption-form';
      var runButton = document.createElement('button');
      runButton.type = 'submit';
      runButton.textContent = 'Run Contraption';
      runForm.appendChild(runButton);

      // Append forms to section
      section.appendChild(displayContraption);
      section.appendChild(saveForm);
      // section.appendChild(runForm);

      // Create textarea for contraption code
      var textarea = document.createElement('textarea');
      textarea.id = 'contraption-code';
      textarea.rows = 10;
      textarea.cols = 50;
      textarea.placeholder = 'Enter contraption code here';
      if (this.game.systems.ycraft && this.game.systems.ycraft.contraption) {
        textarea.value = this.game.systems.ycraft.contraptionSource;
      }

      // Append elements to main container
      mainContainer.appendChild(header);
      mainContainer.appendChild(section);
      mainContainer.appendChild(textarea);

      // get gui-content from inside this.container
      var guiContent = this.container.querySelector('.gui-content');
      // Append the main container to the body or another specific element
      guiContent.appendChild(mainContainer);
      // document.body.appendChild(mainContainer);

      this.createDisplay();
      this.adjustTextareaHeight(textarea);
    }
  }, {
    key: "updateSelectDropdown",
    value: function updateSelectDropdown(name) {
      var contraptionSelect = document.getElementById('contraption-select');
      if (contraptionSelect) {
        contraptionSelect.value = name;
      } else {
        // Add the new option to the select dropdown
        var selectElement = document.createElement('select');
        selectElement.id = 'contraption-select';
        var optionElement = document.createElement('option');
        optionElement.value = name; // Assuming each contraption has a name
        optionElement.textContent = name;
        selectElement.appendChild(optionElement);
        selectElement.value = name;
      }
    }
  }, {
    key: "getContraption",
    value: function () {
      var _getContraption = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(contraptionId) {
        var self, game, contraptionNameDisplay, response, data, displayContraption, contraptionCode, contraptionName, autoRunCode;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              self = this;
              game = this.game;
              contraptionNameDisplay = document.getElementById('contraption-name-display'); // Implement GET request to fetch contraption
              _context.next = 5;
              return fetch("".concat(this.etherspaceEndpoint, "/contraption/").concat(contraptionId));
            case 5:
              response = _context.sent;
              _context.next = 8;
              return response.json();
            case 8:
              data = _context.sent;
              if (contraptionNameDisplay) {
                if (data) {
                  contraptionNameDisplay.textContent = data.name; // Update display with fetched name
                } else {
                  contraptionNameDisplay.textContent = 'Could not find: ' + contraptionId;
                }
              }
              displayContraption = document.getElementById('display-contraption');
              if (displayContraption) {
                displayContraption.style.display = 'block';
              }

              // Set contraption-code textarea value to fetched code
              contraptionCode = document.getElementById('contraption-code');
              if (contraptionCode) {
                contraptionCode.value = data.code;
              }

              // Update input contraption-name with new name
              contraptionName = document.getElementById('contraption-name');
              if (contraptionName) {
                contraptionName.value = data.name;
              }

              // Update the select dropdown
              this.updateSelectDropdown(data.name);

              // Clear all PARTS from Mantra
              if (game.systems.ycraft) {
                game.systems.ycraft.clearAllParts();
              }

              // For now autorun
              autoRunCode = true;
              if (autoRunCode) {
                setTimeout(function () {
                  // runContraption(data.code);
                  self.runContraptionModule(data.code);
                }, 200);
              }
            case 20:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function getContraption(_x) {
        return _getContraption.apply(this, arguments);
      }
      return getContraption;
    }() // Function to render dropdown select with contraptions
  }, {
    key: "renderDropdown",
    value: function renderDropdown(contraptions) {
      var _this = this;
      var contraptionInterface = document.getElementById('contraption-interface');
      var selectElement = document.createElement('select');
      selectElement.id = 'contraption-select';

      // Create a label for the select element
      var label = document.createElement('label');
      label.setAttribute('for', 'contraption-select');
      label.textContent = 'Choose a Contraption:';
      contraptions.forEach(function (contraption) {
        var optionElement = document.createElement('option');
        optionElement.value = contraption.name; // Assuming each contraption has a name
        optionElement.textContent = contraption.name;
        selectElement.appendChild(optionElement);
      });

      // get display-contraption div
      var displayContraption = document.getElementById('display-contraption');

      // Append the label and then the select element
      displayContraption.appendChild(label);
      displayContraption.appendChild(selectElement);

      // Optionally, add an event listener for when the user selects a contraption
      selectElement.addEventListener('change', function (event) {
        var selectedContraptionName = event.target.value;
        console.log("User selected contraption name: ".concat(selectedContraptionName));
        // Additional code to handle the selection, like getting and loading the selected contraption
        _this.getContraption(selectedContraptionName);
      });
      contraptionInterface.appendChild(displayContraption);
    }
  }, {
    key: "createDisplay",
    value: function () {
      var _createDisplay = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var self, game, form, contraptionNameDisplay, userId;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              self = this;
              game = this.game;
              form = document.getElementById('save-contraption-form');
              contraptionNameDisplay = document.getElementById('contraption-name-display');
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                var contraptionName = document.getElementById('contraption-name').value;
                // Implement the POST request to save the contraption
                saveContraption(contraptionName);
              });

              /*
              const runContraptionForm = document.getElementById('run-contraption-form');
              runContraptionForm.addEventListener('submit', function (event) {
                event.preventDefault();
                const contraptionCode = document.getElementById('contraption-code').value;
                runContraption(contraptionCode);
              });
              */

              // Define your endpoint and user ID
              userId = 'Marak'; // Replace with the actual user ID
              // Call the function with the user ID
              _context2.next = 8;
              return self.fetchContraptionsForUser(userId);
            case 8:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function createDisplay() {
        return _createDisplay.apply(this, arguments);
      }
      return createDisplay;
    }()
  }, {
    key: "saveContraption",
    value: function () {
      var _saveContraption = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(name) {
        var contraptionCode, payload, response, data, displayContraption;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              // get the code from the textarea
              contraptionCode = document.getElementById('contraption-code').value; // Assuming roverLightSystem is a variable that holds the contraption code
              payload = {
                name: name,
                code: contraptionCode || '' // This should be defined in your scope
              };
              _context3.prev = 2;
              _context3.next = 5;
              return fetch("".concat(this.etherspaceEndpoint, "/api/v1/contraption/").concat(name), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
              });
            case 5:
              response = _context3.sent;
              _context3.next = 8;
              return response.json();
            case 8:
              data = _context3.sent;
              if (response.ok) {
                contraptionNameDisplay.textContent = "Saved: ".concat(data.name);
              } else {
                contraptionNameDisplay.textContent = "Error saving contraption: ".concat(data.message);
              }
              _context3.next = 15;
              break;
            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](2);
              contraptionNameDisplay.textContent = "Network error: ".concat(_context3.t0.message);
            case 15:
              displayContraption = document.getElementById('display-contraption');
              if (displayContraption) {
                displayContraption.style.display = 'block';
              }
            case 17:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[2, 12]]);
      }));
      function saveContraption(_x2) {
        return _saveContraption.apply(this, arguments);
      }
      return saveContraption;
    }() // Function to fetch contraptions for a given user
  }, {
    key: "fetchContraptionsForUser",
    value: function () {
      var _fetchContraptionsForUser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(userId) {
        var response, contraptions;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return fetch("".concat(this.etherspaceEndpoint, "/contraptions/").concat(userId));
            case 3:
              response = _context4.sent;
              _context4.next = 6;
              return response.json();
            case 6:
              contraptions = _context4.sent;
              // Call function to render dropdown with fetched contraptions
              this.renderDropdown(contraptions);
              _context4.next = 13;
              break;
            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](0);
              console.error('Error fetching contraptions:', _context4.t0);
              // Handle any errors, such as by displaying a message to the user
            case 13:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[0, 10]]);
      }));
      function fetchContraptionsForUser(_x3) {
        return _fetchContraptionsForUser.apply(this, arguments);
      }
      return fetchContraptionsForUser;
    }()
  }, {
    key: "runContraptionModule",
    value: function () {
      var _runContraptionModule = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(code) {
        var game, blob, url, module, contraption, systemName;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              game = this.game;
              _context5.prev = 1;
              console.log('About to run code', code);

              // Create a new blob with the fetched code
              blob = new Blob([code], {
                type: 'application/javascript'
              }); // Create a URL for the blob
              url = URL.createObjectURL(blob); // Dynamically import the blob as a module
              _context5.next = 7;
              return function (specifier) {
                return new Promise(function (r) {
                  return r("".concat(specifier));
                }).then(function (s) {
                  return _interopRequireWildcard(require(s));
                });
              }(url);
            case 7:
              module = _context5.sent;
              // Assuming the module exports a function named 'default'
              contraption = module["default"](); // Assuming the system name is declared globally in the code
              systemName = module["default"].name;
              window[systemName] = contraption;

              // Set the contraption to the YCraft system
              if (window[systemName]) {
                game.systems.ycraft.setContraption(window[systemName]);
              }
              if (contraption.start) {
                // contraption.start();
              }

              // Clean up by revoking the blob URL
              URL.revokeObjectURL(url);
              console.log('Contraption loaded and executed');
              _context5.next = 20;
              break;
            case 17:
              _context5.prev = 17;
              _context5.t0 = _context5["catch"](1);
              console.error('Error running contraption:', _context5.t0);
            case 20:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this, [[1, 17]]);
      }));
      function runContraptionModule(_x4) {
        return _runContraptionModule.apply(this, arguments);
      }
      return runContraptionModule;
    }()
  }, {
    key: "adjustTextareaHeight",
    value: function adjustTextareaHeight(textarea) {
      textarea.style.height = 'auto'; // Reset height to recalculate
      textarea.style.height = textarea.scrollHeight + 'px'; // Set new height
    }
  }, {
    key: "unload",
    value: function unload() {
      // Remove elements when the plugin is unloaded
      if (this.logContainer && this.logContainer.parentNode) {
        this.logContainer.parentNode.removeChild(this.logContainer);
      }
      this.logContainer = null;
      this.logTextArea = null;
    }
  }]);
  return YCraftGUI;
}(); // Exporting the plugin class
_defineProperty(YCraftGUI, "id", 'gui-ycraft');
var _default = exports["default"] = YCraftGUI;

},{"../gui-editor/gui.js":1}]},{},[2])(2)
});
