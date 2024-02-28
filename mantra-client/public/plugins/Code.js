(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Code = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _inflateCode = _interopRequireDefault(require("./lib/inflateCode.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // Code.js - Marak Squires 2024
// This plugin is designed to create and manage code block entities within the game environment.
var Code = exports["default"] = /*#__PURE__*/function () {
  function Code() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Code);
    this.id = Code.id;
    // Set default code styling here, if needed
    this.defaultStyle = config.defaultStyle || {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#D4D4D4',
      backgroundColor: '#1E1E1E',
      padding: '10px',
      borderRadius: '5px'
      // Add more default styling as needed
    };

    this.inflate = _inflateCode["default"].bind(this);
  }
  _createClass(Code, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.systemsManager.addSystem('code', this);
    }
  }, {
    key: "build",
    value: function build() {
      var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (typeof entityData.position === 'undefined') {
        entityData.position = {
          x: 0,
          y: 0
        };
      }

      // Apply default styling to the code entity
      var style = _objectSpread(_objectSpread({}, this.defaultStyle), entityData.style);
      entityData.meta = entityData.meta || {};
      if (typeof entityData.code !== 'undefined') {
        entityData.meta.code = entityData.code;
      }
      if (typeof entityData.src !== 'undefined') {
        entityData.meta.src = entityData.src;
      }
      if (typeof entityData.language !== 'undefined') {
        entityData.meta.language = entityData.language;
      } else {
        entityData.meta.language = 'javascript'; // Default language for syntax highlighting
      }

      return _objectSpread({
        type: 'CODE',
        body: false,
        // Assuming 'body' is used similarly to 'textarea' for physical representation
        text: entityData.text || '',
        // Default code text if none provided
        position: entityData.position,
        style: style
      }, entityData);
    }
  }, {
    key: "create",
    value: function create() {
      var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (typeof entityData.position === 'undefined') {
        entityData.position = {
          x: 0,
          y: 0
        };
      }

      // Create the Code entity
      var codeEntity = this.game.createEntity(this.build(entityData));

      // Additional setup for the code entity can be added here
    }
  }]);
  return Code;
}();
_defineProperty(Code, "id", 'code');

},{"./lib/inflateCode.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateCode;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var storeOriginalInHiddenScriptTag = false;
var originalScriptCopyPrefix = 'mantra-code-src-';
var usePrism = true;
function inflateCode(entityElement, entityData) {
  var game = this.game;
  var graphic = entityData.graphics && entityData.graphics['graphics-css'];
  var pre, code, textarea;
  if (graphic) {
    // Use graphic if available
    console.log('graphicgraphicgraphicgraphic', graphic);
    code = graphic.querySelector('code');
    pre = graphic.querySelector('pre');
    var _textarea = graphic.querySelector('textarea');
    graphic.innerHTML = ''; // Clear the graphic element
    var _ref = [document.createElement('pre'), document.createElement('code')];
    pre = _ref[0];
    code = _ref[1];
    pre.appendChild(code);
    entityElement.appendChild(pre);
  } else {
    // Create elements if not provided
    var _ref2 = [document.createElement('pre'), document.createElement('code')];
    pre = _ref2[0];
    code = _ref2[1];
    pre.appendChild(code);
    entityElement.appendChild(pre);
  }
  entityElement.style.overflow = 'auto';

  // remove all prism-live instances from document
  var prismLiveInstances = document.querySelectorAll('.prism-live');
  // alert(prismLiveInstances.length)
  prismLiveInstances.forEach(function (el) {
    // el.remove();
  });

  // Ensure fetchSourceHandles is initialized
  this.fetchSourceHandles = this.fetchSourceHandles || {};
  var src = entityData.meta && entityData.meta.src;
  if (src) {
    code.textContent = "Loading... ".concat(src); // Indicate loading
    fetchSourceCode.call(this, src, code, entityElement, game, entityData);
  } else {
    // code.textContent = entityData.meta?.code || ''; // Set default code
  }

  // applyCodeStyles(entityElement, pre, code, entityData);
  adjustStyles(pre, code, entityData);
  return entityElement;
}
function fetchSourceCode(src, codeElement, entityElement, game, entityData) {
  if (!this.fetchSourceHandles[src]) {
    this.fetchSourceHandles[src] = fetch(src).then(handleFetchResponse.bind(this, src, codeElement, entityElement, game, entityData))["catch"](handleFetchError.bind(null, src, codeElement));
  }
  codeElement.setAttribute('data-src', src);
}
function handleFetchResponse(_x, _x2, _x3, _x4, _x5, _x6) {
  return _handleFetchResponse.apply(this, arguments);
}
function _handleFetchResponse() {
  _handleFetchResponse = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(src, codeElement, entityElement, game, entityData, response) {
    var content;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (response.ok) {
            _context.next = 2;
            break;
          }
          throw new Error('Network response was not ok');
        case 2:
          _context.next = 4;
          return response.text();
        case 4:
          content = _context.sent;
          updateCodeElements(src, content, codeElement, entityElement, game, entityData);
          this.fetchSourceHandles[src] = {
            content: content
          }; // Cache content
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return _handleFetchResponse.apply(this, arguments);
}
function handleFetchError(src, codeElement, error) {
  console.error('Error fetching source code:', error);
  var errorMessage = '// Error fetching source code\n' + error;
  Array.from(document.querySelectorAll("code[data-src=\"".concat(src, "\"]"))).forEach(function (el) {
    return el.textContent = errorMessage;
  });
  this.fetchSourceHandles[src] = {
    error: errorMessage
  }; // Cache error message
}

function updateCodeElements(src, content, codeElement, entityElement, game, entityData) {
  document.querySelectorAll("code[data-src=\"".concat(src, "\"]")).forEach(function (el) {
    var _game$systems$monaco;
    console.log('elel', el);
    if (window.Prism && window.Prism.Live) {
      var textarea = updateOrCreateTextarea(el, content, entityElement);
      if (textarea.fresh) {
        console.log("textareatextarea", textarea);
        new Prism.Live(textarea);
        console.log('nnnnn');
        attachTextareaEvents(textarea, game);
      }
    } else {
      el.textContent = content;
    }
    if ((_game$systems$monaco = game.systems.monaco) !== null && _game$systems$monaco !== void 0 && _game$systems$monaco.editor) {
      game.systems.monaco.editor.setValue(content);
    }
    game.updateEntity(entityData.id, {
      meta: {
        code: content
      }
    });
  });
}
function updateOrCreateTextarea(el, content, entityElement) {
  var textarea = entityElement.querySelector('textarea');
  if (!textarea) {
    // alert('new area')
    textarea = document.createElement('textarea');
    textarea.setAttribute('spellcheck', 'false');
    textarea.className = 'language-javascript';
    textarea.fresh = true;
    textarea.style.overflow = 'hidden';
    el.parentNode.parentNode.appendChild(textarea);
    el.parentNode.style.display = 'none';
  } else {
    textarea.fresh = false;
  }
  textarea.value = content;
  return textarea;
}
function attachTextareaEvents(textarea, game) {
  console.log('bind');
  textarea.addEventListener('mousedown', function () {
    game.data.camera.draggingAllowed = false;
    game.data.camera.mouseWheelZoomEnabled = false;
    console.log('mousedown');
    game.unbindKeyboard();
  });
  textarea.addEventListener('blur', function () {
    game.data.camera.draggingAllowed = true;
    game.data.camera.mouseWheelZoomEnabled = true;
    game.bindKeyboard();
  });
}
function adjustStyles(pre, code, entityData) {
  if (entityData.width) pre.style.width = "".concat(entityData.width, "px");
  if (entityData.height) pre.style.height = "".concat(entityData.height, "px");
  //if (entityData.color) code.style.color = convertColorToHex(entityData.color);
}

function convertColorToHex(color) {
  // Implement the color conversion logic here
}
function applyCodeStyles(entityElement, pre, code, entityData) {
  // Define and apply default styles for code element here
  // For example, setting a monospace font and a background color
  pre.style.display = 'block';
  pre.style.overflow = 'auto';
  pre.style.paddingLeft = '5px';
  pre.style.paddingRight = '5px';
  pre.style.margin = '0px';
  pre.style.backgroundColor = '#1E1E1E'; // Dark background for the code block

  entityElement.style.padding = '0px'; // Remove padding from the entity element
  entityElement.style.margin = '0px'; // Remove padding from the entity element

  code.style.fontFamily = 'monospace';
  code.style.fontSize = '14px';
  code.style.color = '#D4D4D4'; // Light color for the text for better contrast

  // entityElement.style.border = "2px solid #999"; // Default border
  entityElement.style.boxShadow = "0 0 8px 0 rgba(0, 0, 0, 0.1)"; // Soft shadow for a subtle effect
  entityElement.style.transition = "all 0.3s ease-in-out"; // Smooth transition for hover effect

  // Define hover effect styles
  var hoverBorderStyle = "2px solid #fff"; // Border color for hover state
  var hoverBoxShadowStyle = "0 0 15px 5px rgba(0, 150, 255, 0.7)"; // Glowing effect for hover state

  // Add event listeners to change styles on hover
  entityElement.addEventListener('mouseenter', function () {
    entityElement.style.border = hoverBorderStyle;
    entityElement.style.boxShadow = hoverBoxShadowStyle;
  });

  // Revert to default styles when not hovering
  entityElement.addEventListener('mouseleave', function () {
    entityElement.style.border = "2px solid #999";
    entityElement.style.boxShadow = "0 0 8px 0 rgba(0, 0, 0, 0.1)";
  });

  // Apply any custom styles from entityData if provided
  if (entityData.style) {
    Object.assign(pre.style, entityData.style.pre); // Apply styles to the <pre> element
    Object.assign(code.style, entityData.style.code); // Apply styles to the <code> element
  }
}

// TODO: similiar styles for applyCodeStyles
function applyIframeStyles(iframe, entityData) {
  // Define default styles for the iframe
  iframe.style.border = "2px solid #999"; // Default border
  iframe.style.boxShadow = "0 0 8px 0 rgba(0, 0, 0, 0.1)"; // Soft shadow for a subtle effect
  iframe.style.transition = "all 0.3s ease-in-out"; // Smooth transition for hover effect

  // Define hover effect styles
  var hoverBorderStyle = "2px solid #fff"; // Border color for hover state
  var hoverBoxShadowStyle = "0 0 15px 5px rgba(0, 150, 255, 0.7)"; // Glowing effect for hover state

  // Add event listeners to change styles on hover
  iframe.addEventListener('mouseenter', function () {
    iframe.style.border = hoverBorderStyle;
    iframe.style.boxShadow = hoverBoxShadowStyle;
  });

  // Revert to default styles when not hovering
  iframe.addEventListener('mouseleave', function () {
    iframe.style.border = "2px solid #999";
    iframe.style.boxShadow = "0 0 8px 0 rgba(0, 0, 0, 0.1)";
  });
}

},{}]},{},[1])(1)
});
