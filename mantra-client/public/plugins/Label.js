(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Label = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// Label.js - Marak Squires 2024
var Label = exports["default"] = /*#__PURE__*/function () {
  function Label() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Label);
    this.id = Label.id;
    this.offset = config.offset || {
      x: 0,
      y: -20
    }; // Default offset above the entity
  }
  _createClass(Label, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.systemsManager.addSystem('label', this);
    }
  }, {
    key: "build",
    value: function build() {
      var _this = this;
      var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var text = entityData.text,
        _entityData$offset = entityData.offset,
        offset = _entityData$offset === void 0 ? this.offset : _entityData$offset,
        targetEntity = entityData.targetEntity;
      return {
        type: 'TEXT',
        body: false,
        // Labels typically don't have a physical body
        text: text || 'Label',
        // Default text if none provided
        size: {
          width: 220,
          height: 20
        },
        meta: {
          attachedEntityId: targetEntity,
          // Initially set if provided
          offset: offset
        },
        // This hook is called after the label entity itself is created
        afterCreateEntity: function afterCreateEntity(createdEntity) {
          if (!createdEntity.meta.attachedEntityId) {
            // If the label wasn't attached to an entity at creation, handle attachment here
            // For example, the label could be attached based on some game event
            // Use game.updateEntity() to update the attachedEntityId in the label's meta data
            //  alert('needs to auto-attache')
          } else {
            //  alert(createdEntity.meta.attachedEntityId)
          }
        },
        update: function update(entity) {
          if (entity.meta.attachedEntityId) {
            var attachedEntity = _this.game.getEntity(entity.meta.attachedEntityId);
            if (attachedEntity) {
              // Update the label's position based on the attached entity's position and the offset
              var newPosition = {
                x: attachedEntity.position.x + entity.meta.offset.x,
                y: attachedEntity.position.y + entity.meta.offset.y
              };

              // Use game.updateEntity() to ensure the position update is managed correctly
              _this.game.updateEntity(entity.id, {
                position: newPosition
              });
            }
          }
        }
      };
    }

    // Function to create a label and attach it to an entity
  }, {
    key: "createLabelForEntity",
    value: function createLabelForEntity(attachedEntityId, text, offset) {
      var labelData = {
        attachedEntityId: attachedEntityId,
        text: text,
        offset: offset || this.offset
      };

      // Create the Label entity
      var label = this.game.createEntity(this.build(labelData));

      // Optionally return the label entity for further manipulation or reference
      return label;
    }
  }]);
  return Label;
}();
_defineProperty(Label, "id", 'label');

},{}]},{},[1])(1)
});
