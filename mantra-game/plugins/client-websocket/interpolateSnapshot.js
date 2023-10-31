
function iterpolateSnapshot(alpha, previousSnapshot, latestSnapshot) {
  alpha = 1;
  if (!previousSnapshot || !latestSnapshot) {
    return latestSnapshot;
  }


  // Assuming both snapshots are arrays of state objects
  let interpolatedSnapshot = [];

  for (let i = 0; i < latestSnapshot.state.length; i++) {
    let currentState = latestSnapshot.state[i];

    // Find corresponding state in previousSnapshot by matching some unique identifier (e.g., id)
    let prevState = previousSnapshot.state.find(state => state.id === currentState.id);

    if (!prevState) {
      // You might choose to handle this differently, e.g., by using currentState directly
      continue; // Skip this state if it wasn't present in the previous snapshot
    }

    let interpolatedState = {
      id: currentState.id, // or prevState.id, since they should be the same
      position: {
        x: 0,
        y: 0
      },
      rotation: 0
    };

    // Interpolate position.x and position.y
    if (prevState.position && currentState.position) {
      interpolatedState.position.x = prevState.position.x + (currentState.position.x - prevState.position.x) * alpha;
      interpolatedState.position.y = prevState.position.y + (currentState.position.y - prevState.position.y) * alpha;
    }

    // Interpolate rotation
    if (typeof prevState.rotation !== 'undefined' && typeof currentState.rotation !== 'undefined') {
      interpolatedState.rotation = prevState.rotation + (currentState.rotation - prevState.rotation) * alpha;
    }

    interpolatedSnapshot.push(interpolatedState);
  }

  return {
    state: interpolatedSnapshot
  };
}

export default iterpolateSnapshot;