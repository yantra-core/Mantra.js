(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SUTRAS = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = blackHoleSutra;
// blackhole.js - Marak Squires 2023
function blackHoleSutra(game, context) {
  var rules = game.createSutra();

  // Remark: Note namspace of sutraname::methodname
  //         Mantra runs a single Sutra tree which all entities are bound to
  //         This requires a unique namespace for each Sutra
  rules.on('blackhole::create', function () {
    var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      position: {
        x: 0,
        y: 0
      }
    };
    // Create the Black Hole entity
    var blackHole = game.createEntity({
      type: 'BLACK_HOLE',
      texture: 'fire',
      isStatic: true,
      isSensor: true,
      width: 4,
      height: 4,
      //radius: 20,
      position: {
        x: entityData.position.x,
        y: entityData.position.y
      },
      mass: 100
    });
  });

  // Define the gravitational constant
  var GRAVITATIONAL_CONSTANT = 0.01; // Adjust as needed for gameplay

  rules.addCondition('gravityTick', function (entity, gameState) {
    return gameState.tick % 5 === 0;
  });
  rules["if"]('gravityTick').then('applyGravity');
  rules.on('applyGravity', function (entityData, node, gameState) {
    // check if this running locally on a context or globally on all BLACK_HOLE entities
    if (typeof context !== 'undefined') {
      Object.keys(gameState.ents._).forEach(function (eId) {
        var entity = gameState.ents._[eId];
        if (entity.type !== 'BLACK_HOLE') {
          applyGravity(context, entity, GRAVITATIONAL_CONSTANT, gameState);
        }
      });
      return;
    }
    if (gameState.ents.BLACK_HOLE) {
      gameState.ents.BLACK_HOLE.forEach(function (blackHole) {
        Object.keys(gameState.ents._).forEach(function (eId) {
          var entity = gameState.ents._[eId];
          if (entity.type !== 'BLACK_HOLE') {
            applyGravity(blackHole, entity, GRAVITATIONAL_CONSTANT, gameState);
          }
        });
      });
    }
  });
  rules["if"]('entTouchedBlackhole').then('blackHoleCollision');
  rules.addCondition('entTouchedBlackhole', function (entity, gameState) {
    // check if this running locally on a context or globally on all BLACK_HOLE entities
    if (typeof context !== 'undefined') {
      return entity.type === 'COLLISION' && entity.kind === 'START' && entity[context.type];
    } else {
      return entity.type === 'COLLISION' && entity.kind === 'START' && entity.BLACK_HOLE;
    }
  });
  rules.on('blackHoleCollision', function (collision, node, gameState) {
    var pendingDestroy = collision.bodyA;
    var blackHole = collision.bodyB;
    if (collision.bodyA.type === 'BLACK_HOLE') {
      pendingDestroy = collision.bodyB;
      blackHole = collision.bodyA;
    }
    if (typeof context !== 'undefined') {
      if (collision.bodyA.type === context.type) {
        pendingDestroy = collision.bodyB;
      } else {
        pendingDestroy = collision.bodyA;
      }
      blackHole = context;
    }
    if (pendingDestroy && blackHole) {
      // here we have pendingDestroy.position, pendingDestroy.velocity, and blackHole.position
      // game.playSpatialSound(pendingDestroy, blackHole);
      // increase size of black hole
      // console.log(blackHole.height, blackHole.width)
      /*
      game.updateEntity({
        id: blackHole.id,
        height: blackHole.height + 0.1,
        width: blackHole.width + 0.1,
        // radius: blackHole.radius + 0.1,
      });
      */
    }
    game.removeEntity(pendingDestroy.id);
  });

  // Function to apply gravitational force
  function applyGravity(body1, body2, gravity, gameState) {
    var distance = Vector.sub(body2.position, body1.position);
    var magnitude = Vector.magnitude(distance);
    if (magnitude < 0.5) {
      // This prevents extreme forces at very close distances
      return;
    }
    distance = Vector.normalize(distance);
    var force = gravity * body1.mass * body2.mass / (magnitude * magnitude);
    var maxForce = 1; // Prevents excessively large forces
    force = Math.min(force, maxForce);

    // Apply the force towards the black hole
    // TODO: add config flag for repulsion in addition to attraction
    var repulsion = false;
    if (typeof gameState.repulsion !== 'undefined') {
      repulsion = gameState.repulsion;
    }
    var sign = repulsion ? 1 : -1;
    game.applyForce(body2.id, {
      x: sign * distance.x * force,
      y: sign * distance.y * force
    });
  }
  return rules;
}

// Basic vector operations
var Vector = {
  add: function add(v1, v2) {
    return {
      x: v1.x + v2.x,
      y: v1.y + v2.y
    };
  },
  sub: function sub(v1, v2) {
    return {
      x: v1.x - v2.x,
      y: v1.y - v2.y
    };
  },
  mult: function mult(v, factor) {
    return {
      x: v.x * factor,
      y: v.y * factor
    };
  },
  div: function div(v, factor) {
    return {
      x: v.x / factor,
      y: v.y / factor
    };
  },
  magnitude: function magnitude(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  },
  normalize: function normalize(v) {
    var mag = Vector.magnitude(v);
    return mag > 0 ? Vector.div(v, mag) : {
      x: 0,
      y: 0
    };
  }
};

},{}],2:[function(require,module,exports){
"use strict";

var SUTRAS = require('./index.js');
console.log('SUTRAS', SUTRAS);
module.exports = SUTRAS["default"];

},{"./index.js":8}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = demon;
function demon(game) {
  game.createEntity({
    type: 'DEMON',
    texture: 'demon',
    //texture: 'fire',
    //color: 0xff0000,
    width: 8,
    height: 8,
    depth: 64,
    position: {
      x: -60,
      y: -60,
      z: 32
    }
  });
  game.createEntity({
    type: 'DEMON',
    texture: 'demon',
    //texture: 'fire',
    //color: 0xff0000,
    width: 8,
    height: 8,
    depth: 64,
    position: {
      x: 64,
      y: -60,
      z: 32
    }
  });
  var rules = game.createSutra();
  rules.addCondition('entityTouchedDemon', function (entity, gameState) {
    console.log('entityTouchedDemon check', entity);
    if (entity.type === 'COLLISION' && entity.kind === 'START') {
      if (typeof entity.DEMON !== 'undefined') {
        return true;
      }
    }
  });

  /*
  rules.on('entityTouchedDemon', function (collision) {
    //let demonEntity = collision.bodyA.type === 'DEMON' ? collision.bodyA : collision.bodyB;
    // Define the scale factor for how much bigger the demon should get
    const scaleFactor = 2.1; // For example, 10% bigger
    // Increase the size of the demon
    game.updateEntity({
      id: demonEntity.id,
      width: demonEntity.width * scaleFactor,
      height: demonEntity.height * scaleFactor,
      depth: demonEntity.depth * scaleFactor
    });
  });
  */

  return rules;
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = fire;
function fire(game) {
  game.createEntity({
    type: 'FIRE',
    texture: {
      sheet: 'loz_spritesheet',
      sprite: 'fire'
      // frame: 0 // TODO: support single frame / bypass animation of array
    },
    //texture: 'fire',
    //color: 0xff0000,
    width: 16,
    height: 16,
    depth: 64,
    isStatic: true,
    position: {
      x: -80,
      y: -60,
      z: 32
    }
  });
  game.createEntity({
    type: 'FIRE',
    texture: {
      sheet: 'loz_spritesheet',
      sprite: 'fire'
      // frame: 0 // TODO: support single frame / bypass animation of array
    },
    //texture: 'fire',
    //color: 0xff0000,
    width: 16,
    height: 16,
    depth: 64,
    isStatic: true,
    position: {
      x: 80,
      y: -60,
      z: 32
    }
  });
  var rules = game.createSutra();
  rules.addCondition('entityTouchedFire', function (entity, gameState) {
    if (entity.type === 'COLLISION' && entity.kind === 'START') {
      if (entity.bodyA.type === 'FIRE') {
        return true;
      }
      if (entity.bodyB.type === 'FIRE') {
        return true;
      }
    }
  });
  rules["if"]('entityTouchedFire').then('playNote', {
    note: 'F#4'
  }).then('damageEntity');
  rules.on('damageEntity', function (collision) {
    var ent;
    if (collision.bodyA.type === 'FIRE') {
      ent = collision.bodyB;
    } else {
      ent = collision.bodyA;
    }
    // create a copy of the entity previous texture
    // TODO: remove the createDefaultPlayer() call here
    //       and instead have a game.on('player::death') event
    //       listening in parent Sutra
    var texture = ent.texture;
    game.removeEntity(ent.id);
    if (ent.type === 'PLAYER') {
      game.currentPlayerId = null;
      game.createDefaultPlayer({
        texture: texture
      });
    }
  });

  // TODO: move pointerDown event into Sutra
  game.on('pointerDown', function (entity, ev) {
    if (entity.type === 'FIRE') {
      game.playNote('G4');
    }
  });
  return rules;
}

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = fountSutra;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// fount.js - Marak Squires 2023
// Sutra for Generating Units
function fountSutra(game, context) {
  var sprayConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var rules = game.createSutra();

  // Default configuration for the Fount
  var settings = _objectSpread({
    unitType: 'PARTICLE',
    // Type of unit to generate
    collisionActive: false,
    // Whether or not the unit will emit collisionActive actives ( performance hit )
    texture: 'pixel',
    // Texture for the unit
    color: 0x00ff00,
    // Color of the unit
    unitSize: {
      width: 4,
      height: 4
    },
    // Size of the unit
    sprayAngle: Math.PI / 8,
    // Angle of the spray arc (in radians)
    sprayWidth: Math.PI / 4,
    // Width of the spray arc (in radians)
    forceMagnitude: 0.5
  }, sprayConfig);

  // Function to create a unit
  function createUnit(position) {
    var rgbColor = settings.color;
    // convert from int to rgb
    rgbColor = [rgbColor >> 16 & 255, rgbColor >> 8 & 255, rgbColor & 255];
    var rgbColorString = "rgba(".concat(rgbColor.join(','), ", 0.5)"); // Adjust opacity as needed
    return game.createEntity({
      type: settings.unitType,
      collisionActive: false,
      collisionEnd: false,
      collisionStart: false,
      // texture: settings.texture,
      height: settings.unitSize.height,
      color: settings.color,
      width: settings.unitSize.width,
      position: position,
      friction: 0.05,
      frictionAir: 0.005,
      frictionStatic: 0.25,
      style: {
        backgroundColor: rgbColorString
      },
      isSensor: true
    });
  }
  function applySprayForce(unit) {
    var baseAngle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : settings.sprayAngle;
    var angleOffset = (Math.random() - 0.5) * settings.sprayWidth; // Random offset within a specified width
    var angle = baseAngle + angleOffset;
    var force = {
      x: settings.forceMagnitude * Math.cos(angle),
      y: settings.forceMagnitude * Math.sin(angle)
    };
    game.applyForce(unit.id, force);
  }

  // Rule for generating and spraying units
  rules["if"]('fountTick').then('fountSpray');
  rules.addCondition('fountTick', function (entity, gameState) {
    return entity.name === context.name && gameState.tick % 10 === 0;
  });
  rules.on('fountSpray', function (context, node, gameState) {
    // Determine the position of the fount (can be context-dependent)
    var fountPosition = typeof context !== 'undefined' ? context.position : {
      x: 0,
      y: 0
    };
    // Create a unit and apply force
    var unit = createUnit(fountPosition);
    applySprayForce(unit);
  });
  return rules;
}

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = gameOfLife;
function gameOfLife(game) {
  var GRID_SIZE = 150; // Define the size of the grid
  var CELL_SIZE = 5; // Size of each cell

  // Initialize grid cells
  for (var x = 0; x < GRID_SIZE; x += CELL_SIZE) {
    for (var y = 0; y < GRID_SIZE; y += CELL_SIZE) {
      game.createEntity({
        type: 'LIFE_CELL',
        //health: Math.random() < 0.5 ? 1 : 2, // 1 is alive, 2 is dead
        health: 2,
        position: {
          x: x,
          y: y
        },
        body: false,
        width: CELL_SIZE,
        height: CELL_SIZE
      });
    }
  }
  function initializeGlider(x, y, cellSize, game) {
    game.createEntity({
      type: 'LIFE_CELL',
      width: cellSize,
      height: cellSize,
      body: false,
      health: 1,
      position: {
        x: x,
        y: y
      }
    });
    game.createEntity({
      type: 'LIFE_CELL',
      width: cellSize,
      height: cellSize,
      body: false,
      health: 1,
      position: {
        x: x + cellSize,
        y: y
      }
    });
    game.createEntity({
      type: 'LIFE_CELL',
      width: cellSize,
      height: cellSize,
      body: false,
      health: 1,
      position: {
        x: x + 2 * cellSize,
        y: y
      }
    });
    game.createEntity({
      type: 'LIFE_CELL',
      width: cellSize,
      height: cellSize,
      body: false,
      health: 1,
      position: {
        x: x + 2 * cellSize,
        y: y - cellSize
      }
    });
    game.createEntity({
      type: 'LIFE_CELL',
      width: cellSize,
      height: cellSize,
      body: false,
      health: 1,
      position: {
        x: x + cellSize,
        y: y - 2 * cellSize
      }
    });
  }
  initializeGlider(100, 100, CELL_SIZE, game);
  var rules = game.createSutra();

  // Rule for updating cell state
  rules["if"]('updateCellState').then('transitionCellState');
  rules.addCondition('updateCellState', function (entity, gameState) {
    return entity.type === 'LIFE_CELL' && gameState.tick % 10 === 0; // Update every 2 ticks
  });
  rules.on('transitionCellState', function (entity, node, gameState) {
    var neighbors = getNeighbors(entity, node, gameState); // Function to get neighboring cells
    var aliveNeighbors = neighbors.filter(function (neighbor) {
      return neighbor.health === 1;
    }).length;

    // console.log(neighbors, aliveNeighbors)
    // Game of Life rules
    if (entity.health === 1 && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
      //entity.state = 'dead';
      entity.health = 0;
    } else if (entity.health === 2 && aliveNeighbors === 3) {
      entity.health = 1;
      //entity.state = 'alive';
    }

    // Update entity in the game
    game.updateEntity({
      id: entity.id,
      health: entity.health,
      style: {
        backgroundColor: entity.health === 1 ? 'green' : 'black'
      }
    });
  });
  return rules;
}
function getNeighbors(cell, node, gameState) {
  var gridSize = 150; // Define the size of the grid
  var cellSize = 5; // Assuming each cell has a fixed size

  var neighbors = [];
  var neighborOffsets = [{
    x: -cellSize,
    y: -cellSize
  }, {
    x: 0,
    y: -cellSize
  }, {
    x: cellSize,
    y: -cellSize
  }, {
    x: -cellSize,
    y: 0
  }, /* Current Cell */{
    x: cellSize,
    y: 0
  }, {
    x: -cellSize,
    y: cellSize
  }, {
    x: 0,
    y: cellSize
  }, {
    x: cellSize,
    y: cellSize
  }];
  gameState.ents.LIFE_CELL.forEach(function (otherCell) {
    for (var _i = 0, _neighborOffsets = neighborOffsets; _i < _neighborOffsets.length; _i++) {
      var offset = _neighborOffsets[_i];
      var wrappedX = (cell.position.x + offset.x + gridSize) % gridSize;
      var wrappedY = (cell.position.y + offset.y + gridSize) % gridSize;
      if (otherCell.position.x === wrappedX && otherCell.position.y === wrappedY) {
        neighbors.push(otherCell);
        break; // Found neighbor, no need to check other offsets
      }
    }
  });
  return neighbors;
}

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = hexapod;
// hexapod.js - Marak Squires 2023
function hexapod(game) {
  // create 22 hexapods
  // start at 0,0 and make them in a circle with radius 80
  var numberOfHexapods = 22;
  var radius = 80;
  for (var i = 0; i < numberOfHexapods; i++) {
    // Calculate the angle for each hexapod
    var angle = i / numberOfHexapods * 2 * Math.PI;

    // Convert polar coordinates (angle, radius) to Cartesian coordinates (x, y)
    var x = radius * Math.cos(angle);
    var y = radius * Math.sin(angle);
    game.createEntity({
      type: 'HEXAPOD',
      texture: 'demon',
      width: 8,
      height: 8,
      position: {
        x: x,
        y: y
      }
    });
  }
  var rules = game.createSutra();

  // Define constant values for different forces and parameters
  var ALIGNMENT_FORCE = 0.1;
  var COHESION_FORCE = 0.4;
  var SEPARATION_FORCE = 0.81;
  var PERCEPTION_RADIUS = 1500;
  var FIELD_OF_VIEW = 1500;

  // hexapods grow on bullet hit
  rules["if"]('bulletHitHexapod').then('hexapodGrow');
  rules.addCondition('bulletHitHexapod', function (entity, gameState) {
    return entity.type === 'COLLISION' && entity.kind === 'START' && entity.HEXAPOD && entity.BULLET;
  });
  rules.on('hexapodGrow', function (collision) {
    var hexapod = collision.HEXAPOD;
    var style;
    // at a certain size, invert the colors
    if (hexapod.width > 16) {
      style = {
        // Define the animation name and duration
        animation: 'pulse-invert 5s',
        // Initial filter style
        filter: 'invert(90%)'
      };
    }
    // update entity size by 11%
    game.updateEntity({
      id: hexapod.id,
      width: hexapod.width * 1.1,
      height: hexapod.height * 1.1,
      style: style
    });
  });

  // hexpods think each tick
  rules["if"]('hexapodTick').then('hexapodThink');
  rules.addCondition('hexapodTick', function (entity, gameState) {
    return entity.type === 'HEXAPOD' && gameState.tick % 1 === 0;
  });
  rules.on('hexapodThink', function (entity, node, gameState) {
    var hexapod = entity;
    var hexapods = gameState.ents.HEXAPOD;
    var alignment = {
      x: 0,
      y: 0
    };
    var cohesion = {
      x: 0,
      y: 0
    };
    var separation = {
      x: 0,
      y: 0
    };
    var planetAvoidance = {
      x: 0,
      y: 0
    };

    // Target movement implementation
    var targetForce = {
      x: 0,
      y: 0
    };
    if (typeof gameState.currentPlayer !== 'undefined') {
      if (gameState.currentPlayer) {
        var target = gameState.currentPlayer.position;
        var targetDirection = Vector.sub(target, hexapod.position);
        targetForce = Vector.mult(Vector.normalize(targetDirection), COHESION_FORCE);
      }
    }

    // Process each hexapod in the field of view
    hexapods.forEach(function (otherHexapod) {
      if (otherHexapod.id !== hexapod.id) {
        var d = Vector.magnitude(Vector.sub(hexapod.position, otherHexapod.position));

        // Alignment
        if (d < PERCEPTION_RADIUS) {
          alignment = Vector.add(alignment, otherHexapod.velocity);
        }

        // Cohesion
        if (d < PERCEPTION_RADIUS) {
          cohesion = Vector.add(cohesion, otherHexapod.position);
        }

        // Separation
        if (d < hexapod.width + otherHexapod.width) {
          var diff = Vector.sub(hexapod.position, otherHexapod.position);
          separation = Vector.add(separation, Vector.div(diff, d * d)); // Weight by distance
        }
      }
    });

    // Average out alignment, cohesion, and separation
    if (hexapods.length > 1) {
      alignment = Vector.div(alignment, hexapods.length - 1);
      cohesion = Vector.div(cohesion, hexapods.length - 1);
      cohesion = Vector.sub(cohesion, hexapod.position);
      separation = Vector.div(separation, hexapods.length - 1);
    }
    alignment = Vector.mult(Vector.normalize(alignment), ALIGNMENT_FORCE);
    cohesion = Vector.mult(Vector.normalize(cohesion), COHESION_FORCE);
    separation = Vector.mult(Vector.normalize(separation), SEPARATION_FORCE);

    // Apply forces
    var force = Vector.add(Vector.add(Vector.add(alignment, cohesion), separation), targetForce);
    // Update hexapod position
    var newPosition = Vector.add(hexapod.position, Vector.mult(force, 1));
    newPosition.z = 1; // for now
    game.updateEntity({
      id: hexapod.id,
      position: newPosition
    });
  });
  return rules;
}

// Basic vector operations
var Vector = {
  add: function add(v1, v2) {
    return {
      x: v1.x + v2.x,
      y: v1.y + v2.y
    };
  },
  sub: function sub(v1, v2) {
    return {
      x: v1.x - v2.x,
      y: v1.y - v2.y
    };
  },
  mult: function mult(v, factor) {
    return {
      x: v.x * factor,
      y: v.y * factor
    };
  },
  div: function div(v, factor) {
    return {
      x: v.x / factor,
      y: v.y / factor
    };
  },
  magnitude: function magnitude(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  },
  normalize: function normalize(v) {
    var mag = Vector.magnitude(v);
    return mag > 0 ? Vector.div(v, mag) : {
      x: 0,
      y: 0
    };
  }
};

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _demon = _interopRequireDefault(require("./demon.js"));
var _fount = _interopRequireDefault(require("./fount.js"));
var _gameOfLife = _interopRequireDefault(require("./game-of-life.js"));
var _note = _interopRequireDefault(require("./note.js"));
var _fire = _interopRequireDefault(require("./fire.js"));
var _blackhole = _interopRequireDefault(require("./blackhole.js"));
var _hexapod = _interopRequireDefault(require("./hexapod.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Sutras = {};
Sutras.demon = _demon["default"];
Sutras.fount = _fount["default"];
Sutras.blackhole = _blackhole["default"];
Sutras.fire = _fire["default"];
Sutras.gameOfLife = _gameOfLife["default"];
Sutras.note = _note["default"];
Sutras.hexapod = _hexapod["default"];
var _default = exports["default"] = Sutras;

},{"./blackhole.js":1,"./demon.js":3,"./fire.js":4,"./fount.js":5,"./game-of-life.js":6,"./hexapod.js":7,"./note.js":9}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = note;
function note(game) {
  // if touch note play sound
  game.createEntity({
    type: 'NOTE',
    color: 0xccff00,
    width: 32,
    height: 32,
    depth: 16,
    isStatic: true,
    position: {
      x: 0,
      y: 0,
      z: 1
    }
  });
  var rules = game.createSutra();
  rules.addCondition('entityTouchedNote', function (entity, gameState) {
    if (entity.type === 'COLLISION' && entity.kind === 'START') {
      if (entity.bodyA.type === 'NOTE') {
        return true;
      }
      if (entity.bodyB.type === 'NOTE') {
        return true;
      }
    }
  });

  // TODO: move these events into a Sutra
  game.on('pointerDown', function (entity) {
    if (entity.type === 'NOTE') {
      game.playNote(entity.kind);
    }
    if (entity.type === 'DRUM') {
      game.playDrum(entity.kind);
    }
  });
}

},{}]},{},[2])(2)
});
