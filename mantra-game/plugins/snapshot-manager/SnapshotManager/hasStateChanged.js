
const hasStateChanged = (currentState, lastKnownState) => {
  if (typeof currentState === 'undefined' || typeof lastKnownState === 'undefined') {
    return true;
  }
  if (typeof currentState !== 'object' || typeof lastKnownState !== 'object') {
    return currentState !== lastKnownState;
  }

  if (currentState === null && lastKnownState === null) {
    return false;
  }
  const currentKeys = Object.keys(currentState);
  const lastKnownKeys = Object.keys(lastKnownState);
  if (currentKeys.length !== lastKnownKeys.length) {
    return true;
  }
  for (let i = 0; i < currentKeys.length; i++) {
    const key = currentKeys[i];
    if (!lastKnownState.hasOwnProperty(key) || hasStateChanged(currentState[key], lastKnownState[key])) {
      return true;
    }
  }
  return false;
}

export default hasStateChanged;