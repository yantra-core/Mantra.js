// deltaCompression.js - Marak Squires 2023
import float2Int from './float2Int.js'; // Assuming float2Int.js is in the same directory

const DEFAULTS = {
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  rotation: 0,
  width: 0,
  height: 0,
  mass: 0,
  health: 0,
  lifetime: 0,
  maxSpeed: 0
};

let playerStateCache = {};
let localPlayerStateCache = {};

const deltaCompression = {}; // deltaCompression module scope

// this config could be part of instance scope in SnapshotManager
let config = deltaCompression.config = {
  // Remark: We are currently performing float2Int encoding in the deltaCompression pipeline, not the deltaEncoding pipeline
  //         This is because both the server and client are already iterating over the state in the deltaCompression pipeline
  //         Where as the deltaEncoding pipeline is only used on the server
  truncateFloats: true, // truncate float values to this precision
  truncateToPrecision: 3, // truncate float values to this precision
  floatProperties: ['width', 'height', 'mass', 'health', 'lifetime', 'maxSpeed'], // extend this array with other float property names
  float2Int: true // encode float values as integers
};

deltaCompression.resetState = function resetState(playerId) {
  if (playerStateCache[playerId]) {
    playerStateCache[playerId].stateCache = {};
    playerStateCache[playerId].accumulatedStateCache = {};
  }
  if (localPlayerStateCache[playerId]) {
    localPlayerStateCache[playerId].stateCache = {};
    localPlayerStateCache[playerId].accumulatedStateCache = {};
  }
};

deltaCompression.removeState = function removeState(playerId, id) {
  if (playerStateCache[playerId]) {
    delete playerStateCache[playerId].stateCache[id.toString()];
    delete playerStateCache[playerId].accumulatedStateCache[id.toString()];
  }
  if (localPlayerStateCache[playerId]) {
    delete localPlayerStateCache[playerId].stateCache[id.toString()];
    delete localPlayerStateCache[playerId].accumulatedStateCache[id.toString()];
  }
};

deltaCompression.compress = function compress(playerId, snapshot) {
  let _snapshot = null;

  if (!playerStateCache[playerId]) {
    playerStateCache[playerId] = { stateCache: {}, accumulatedStateCache: {} };
  }

  if (snapshot && snapshot.state) {
    _snapshot = { id: snapshot.id, state: [] };

    snapshot.state.forEach(function (state) {
      if (state.destroy) {
        delete playerStateCache[playerId].stateCache[state.id];
        return;
      }

      let lastKnownState = playerStateCache[playerId].stateCache[state.id] || DEFAULTS;
      let clonedState = { ...state };

      //
      // Position
      //
      if (typeof clonedState.position !== 'undefined') {
        let positionDelta = getPositionDelta(clonedState.position, lastKnownState.position);
        clonedState.position = {
          x: float2Int.encode(positionDelta.x),
          y: float2Int.encode(positionDelta.y)
        };
      }

      //
      // Velocity
      //
      if (typeof clonedState.velocity !== 'undefined') {
        let velocityDelta = getPositionDelta(clonedState.velocity, lastKnownState.velocity);
        clonedState.velocity = {
          x: float2Int.encode(velocityDelta.x),
          y: float2Int.encode(velocityDelta.y)
        };
      }

      if (typeof clonedState.rotation !== 'undefined') {
        let rotationDelta = getRotationDelta(clonedState.rotation, lastKnownState.rotation);
        clonedState.rotation = float2Int.encode(rotationDelta);
      }

      config.floatProperties.forEach(prop => {
        if (typeof clonedState[prop] !== 'undefined') {
          let delta = getDelta(clonedState[prop], lastKnownState[prop]);
          clonedState[prop] = float2Int.encode(delta);
        }
      });

      playerStateCache[playerId].stateCache[state.id] = { ...state };
      _snapshot.state.push(clonedState);
    });
  }
  return _snapshot;
};

deltaCompression.decompress = function decompress(playerId, snapshot) {
  if (!localPlayerStateCache[playerId]) {
    localPlayerStateCache[playerId] = { stateCache: {}, accumulatedStateCache: {} };
  }

  if (snapshot && snapshot.state) {
    let states = [];
    snapshot.state.forEach(function (state) {
      let accumulatedState = localPlayerStateCache[playerId].accumulatedStateCache[state.id];

      // Initialize accumulatedState if it's a new state
      if (!accumulatedState) {
        accumulatedState = { id: state.id, velocity: { x: 0, y: 0 }, position: { x: 0, y: 0 }, rotation: 0, width: 0, height: 0, mass: 0, health: 0, lifetime: 0, maxSpeed: 0 };
      }

      // Apply updates from the current state
      Object.keys(state).forEach(prop => {
        if (prop === 'position' && state.position) {
          let positionDeltaX = float2Int.decode(state.position.x);
          let positionDeltaY = float2Int.decode(state.position.y);
          accumulatedState.position.x += positionDeltaX;
          accumulatedState.position.y += positionDeltaY;
        } else if (prop === 'velocity' && state.velocity) {
          let velocityDeltaX = float2Int.decode(state.velocity.x);
          let velocityDeltaY = float2Int.decode(state.velocity.y);
          accumulatedState.velocity.x += velocityDeltaX;
          accumulatedState.velocity.y += velocityDeltaY;
        } else if (prop === 'rotation' && typeof state.rotation !== 'undefined') {
          let rotationDelta = float2Int.decode(state.rotation);
          accumulatedState.rotation += rotationDelta;
        } else {
          if (config.floatProperties.indexOf(prop) !== -1) {
            let delta;
            delta = float2Int.decode(state[prop])
            accumulatedState[prop] += delta;
          } else {
            // For all other properties, just copy/update them as is
            accumulatedState[prop] = state[prop];
          }

        }
      });

      localPlayerStateCache[playerId].accumulatedStateCache[state.id] = accumulatedState;
      states.push(accumulatedState);
    });
    snapshot.state = states;
  }
  return snapshot;
};


const truncateToPrecision = (value, precision = config.truncateToPrecision) => {
  if (!config.truncateFloats) {
    return value;
  }
  return Number(value.toFixed(precision));
};

const getPositionDelta = (currentState, lastKnownState) => {
  // If this is a new state, return zero deltas
  if (typeof lastKnownState === 'undefined') {
    return { x: 0, y: 0 };
  }

  let deltaX = currentState.x - lastKnownState.x;
  let deltaY = currentState.y - lastKnownState.y;

  return {
    x: truncateToPrecision(deltaX),
    y: truncateToPrecision(deltaY)
  };
};

const getRotationDelta = (currentRotation, lastKnownRotation) => {
  // If this is a new state, return zero delta
  if (typeof lastKnownRotation === 'undefined') {
    return 0;
  }

  let deltaRotation = currentRotation - lastKnownRotation;
  return truncateToPrecision(deltaRotation);
};

const getDelta = (currentValue, lastKnownValue) => {
  if (typeof lastKnownValue === 'undefined') {
    return currentValue;
  }
  let delta = currentValue - lastKnownValue;
  return truncateToPrecision(delta);
};

function initializeDefaultState(id) {
  let defaultState = { id: id };
  config.floatProperties.forEach(prop => {
    defaultState[prop] = 0; // Initialize all float properties with default value 0
  });
  return defaultState;
}

export default deltaCompression;