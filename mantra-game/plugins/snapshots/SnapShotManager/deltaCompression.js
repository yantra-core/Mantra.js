let playerStateCache = {};

let localPlayerStateCache = {};

const deltaCompression = {};

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
        clonedState.position = getPositionDelta(clonedState.position, lastKnownState.position);
      }

      if (typeof clonedState.rotation !== 'undefined') {
        clonedState.rotation = getRotationDelta(clonedState.rotation, lastKnownState.rotation);
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

      if (typeof accumulatedState !== 'undefined') {
        if (state.position) {
          accumulatedState.position.x += state.position.x;
          accumulatedState.position.y += state.position.y;
        }
  
        if (typeof state.rotation !== 'undefined') {
          accumulatedState.rotation += state.rotation;
        }
    
      } else {
        accumulatedState = { ...state };

      }
      
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
  let deltaX = 0;
  let deltaY = 0;

  // Check if lastKnownState is defined and has properties x and y
  if (lastKnownState && typeof lastKnownState.x !== 'undefined') {
    deltaX = currentState.x - lastKnownState.x;
  } else {
    deltaX = currentState.x;
  }

  if (lastKnownState && typeof lastKnownState.y !== 'undefined') {
    deltaY = currentState.y - lastKnownState.y;
  } else {
    deltaY = currentState.y;
  }

  return {
    x: truncateToPrecision(deltaX),
    y: truncateToPrecision(deltaY)
  };
};

const getRotationDelta = (currentRotation, lastKnownRotation) => {
  let deltaRotation = 0;

  if (typeof lastKnownRotation !== 'undefined') {
    deltaRotation = currentRotation - lastKnownRotation;
  }

  return truncateToPrecision(deltaRotation);
};

export default deltaCompression;