let stateCache = {};
let accumulatedStateCache = {};

const deltaCompression = {};

deltaCompression.removeState = function removeState(id) {
  delete stateCache[id];
  delete accumulatedStateCache[id];
}

deltaCompression.accumulatedStateCache = accumulatedStateCache;

deltaCompression.compress = function decompressDeltas(snapshot) {
  let _snapshot = null;

  if (snapshot && snapshot.state) {
    _snapshot = { id: snapshot.id, state: [] };

    // For each incoming snapshot state
    snapshot.state.forEach(function (state) {
      // If the state is marked for destruction, remove it from the stateCache
      if (state.destroy) {
        delete stateCache[state.id];
        return;
      }

      // Get the last known state for this id
      let lastKnownState = stateCache[state.id];

      // If this is a new state, initialize lastKnownState with zeros
      if (typeof lastKnownState === 'undefined') {
        lastKnownState = { position: { x: 0, y: 0 }, rotation: 0 };
      }

      // Clone the state to avoid mutating the original state object
      let clonedState = { ...state };

      // Delta encode the position if it exists in the state
      if (typeof clonedState.position !== 'undefined') {
        clonedState.position = getPositionDelta(clonedState.position, lastKnownState.position);
      }

      // Delta encode the rotation if it exists in the state
      if (typeof clonedState.rotation !== 'undefined') {
        clonedState.rotation = getRotationDelta(clonedState.rotation, lastKnownState.rotation);
      }

      // Update the stateCache with the original state values, not the deltas
      stateCache[state.id] = { ...state };

      _snapshot.state.push(clonedState);
    });
  }
  return _snapshot;
};

deltaCompression.decompress = function compressDeltas(snapshot) {

  if (snapshot && snapshot.state) {
    let states = [];
    snapshot.state.forEach(function (state) {
      let accumulatedState = accumulatedStateCache[state.id];

      if (typeof accumulatedState === 'undefined') {
        accumulatedState = { ...state };
      } else {
        // Reverse the delta encoding for position if it exists in the state
        if (state.position) {
          accumulatedState.position.x += state.position.x;
          accumulatedState.position.y += state.position.y;
        }

        // Reverse the delta encoding for rotation if it exists in the state
        if (typeof state.rotation !== 'undefined') {
          accumulatedState.rotation += state.rotation;
        }
      }

      accumulatedStateCache[state.id] = accumulatedState;

      // Update the state with the accumulated values
      states.push(accumulatedState);

    });
    snapshot.state = states;
  }
  return snapshot;
}

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