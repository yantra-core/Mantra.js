(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SUTRAS = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = blackHoleSutra;
// blackHoleSutra.js - Custom Sutra for Black Hole Entity
function blackHoleSutra(game) {
  // Create the Black Hole entity
  var blackHole = game.createEntity({
    type: 'BLACK_HOLE',
    texture: 'blackHoleTexture',
    radius: 20,
    // Define the radius of the black hole
    position: {
      x: game.worldCenter.x,
      y: game.worldCenter.y
    },
    mass: 1000 // A large mass to simulate strong gravity
  });
  var rules = game.createSutra();

  // Define the gravitational constant
  var GRAVITATIONAL_CONSTANT = 0.05; // Adjust as needed for gameplay

  // Rule for gravitational pull
  rules.onEveryTick(function (gameState) {
    gameState.ents.forEach(function (entity) {
      if (entity.type !== 'BLACK_HOLE') {
        applyGravity(blackHole, entity, GRAVITATIONAL_CONSTANT);
      }
    });
  });

  // Function to apply gravitational force
  function applyGravity(body1, body2, gravity) {
    var distance = Vector.sub(body2.position, body1.position);
    var magnitude = Vector.magnitude(distance);
    if (magnitude < 0.5) {
      return;
    }
    distance = Vector.normalize(distance);
    var force = gravity * body1.mass * body2.mass / (magnitude * magnitude);
    var maxForce = 1;
    force = Math.min(force, maxForce);
    Matter.Body.applyForce(body2, body2.position, Vector.mult(distance, -force));
  }
  return rules;
}

// Vector operations can be reused or imported from your existing code

},{}],2:[function(require,module,exports){
"use strict";

var SUTRAS = require('./index.js');
console.log('SUTRAS', SUTRAS);
module.exports = SUTRAS["default"];

},{"./index.js":7}],3:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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
    // update entity size by 11%
    game.updateEntity({
      id: hexapod.id,
      width: hexapod.width * 1.1,
      height: hexapod.height * 1.1
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

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _demon = _interopRequireDefault(require("./demon.js"));
var _gameOfLife = _interopRequireDefault(require("./game-of-life.js"));
var _note = _interopRequireDefault(require("./note.js"));
var _fire = _interopRequireDefault(require("./fire.js"));
var _blackhole = _interopRequireDefault(require("./blackhole.js"));
var _hexapod = _interopRequireDefault(require("./hexapod.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Sutras = {};
Sutras.demon = _demon["default"];
Sutras.blackhole = _blackhole["default"];
Sutras.fire = _fire["default"];
Sutras.gameOfLife = _gameOfLife["default"];
Sutras.note = _note["default"];
Sutras.hexapod = _hexapod["default"];
var _default = exports["default"] = Sutras;

},{"./blackhole.js":1,"./demon.js":3,"./fire.js":4,"./game-of-life.js":5,"./hexapod.js":6,"./note.js":8}],8:[function(require,module,exports){
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
