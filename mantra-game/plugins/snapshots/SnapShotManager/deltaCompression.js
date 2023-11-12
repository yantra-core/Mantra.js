// deltaCompression.js - Marak Squires 2023
import float2Int from './float2Int.js'; // Assuming float2Int.js is in the same directory


let playerStateCache = {};
let localPlayerStateCache = {};

const deltaCompression = {}; // deltaCompression module scope

// TODO: move this config to instance scope of SnapShotManager
let config = deltaCompression.config = {
  // Remark: We are currently performing float2Int encoding in the deltaCompression pipeline, not the deltaEncoding pipeline
  //         This is because both the server and client are already iterating over the state in the deltaCompression pipeline
  //         Where as the deltaEncoding pipeline is only used on the server
  float2Int: false // encode float values as integers
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

      let lastKnownState = playerStateCache[playerId].stateCache[state.id] || { position: { x: 0, y: 0 }, rotation: 0 };
      let clonedState = { ...state };

      if (typeof clonedState.position !== 'undefined') {
        let positionDelta = getPositionDelta(clonedState.position, lastKnownState.position);
        if (config.float2Int) {
          clonedState.position = {
            x: float2Int.encode(positionDelta.x),
            y: float2Int.encode(positionDelta.y)
          };
        } else {
          clonedState.position = { ...positionDelta };
        }
      }

      if (typeof clonedState.rotation !== 'undefined') {
        let rotationDelta = getRotationDelta(clonedState.rotation, lastKnownState.rotation);
        if (config.float2Int) {
          clonedState.rotation = float2Int.encode(rotationDelta);
        } else {
          clonedState.rotation = rotationDelta;
        }
      }

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
        accumulatedState = { id: state.id, position: { x: 0, y: 0 }, rotation: 0 };
      }

      // Apply updates from the current state
      Object.keys(state).forEach(prop => {
        if (prop === 'position' && state.position) {
          let positionDeltaX = config.float2Int ? float2Int.decode(state.position.x) : state.position.x;
          let positionDeltaY = config.float2Int ? float2Int.decode(state.position.y) : state.position.y;
          accumulatedState.position.x += positionDeltaX;
          accumulatedState.position.y += positionDeltaY;
        } else if (prop === 'rotation' && typeof state.rotation !== 'undefined') {
          let rotationDelta = config.float2Int ? float2Int.decode(state.rotation) : state.rotation;
          accumulatedState.rotation += rotationDelta;
        } else {
          // For all other properties, just copy/update them as is
          accumulatedState[prop] = state[prop];
        }
      });

      localPlayerStateCache[playerId].accumulatedStateCache[state.id] = accumulatedState;
      states.push(accumulatedState);
    });
    snapshot.state = states;
  }
  return snapshot;
};


const truncateToPrecision = (value, precision = 3) => {
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


export default deltaCompression;