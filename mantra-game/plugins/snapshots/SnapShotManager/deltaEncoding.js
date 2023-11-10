// deltaEncoding.js - Marak Squires 2023
import hasStateChanged from "./hasStateChanged.js";

//let stateCache = {};
let playerStateCache = {};

const deltaEncoding = {};

// TODO: auto-generate this list from the components
const componentsList = ['type', 'destroyed', 'position', 'velocity', 'mass', 'health', 'rotation', 'width', 'height', 'depth', 'radius', 'isSensor', 'lifetime', 'owner'];

deltaEncoding.encode = function encodeDelta(playerId, snapshot) {
  // console.log('playerStateCache', Object.keys(playerStateCache).length)
  // builds a differential snapshot state for a given snapshot
  // uses the existing stateCache to compare previous known states against the current snapshot
  const differentialSnapshotState = [];

  // for every state in the incoming snapshot
  snapshot.state.forEach(function (state) {

    // construct a delta state that represents the changes between the last known state and the current state
    const deltaState = { id: state.id };

    let hasChanges = false;

    // we may or may not have a lastKnownState for this id
    let lastKnownState = {};

    if (typeof playerStateCache[playerId] === 'undefined') {
      playerStateCache[playerId] = {};
    }

    // Check and load last known state if available
    if (typeof playerStateCache[playerId][state.id] !== 'undefined') {
      lastKnownState = playerStateCache[playerId][state.id];
    } 

    // keeps track of all the properties that have changed
    let changedProps = [];

    // the current state is the incoming state
    let currentState = state;

    // for every defined component in the componentsList
    for (const component of componentsList) {

      // get the current value from the current state
      const currentComponentValue = currentState[component];

      // get the last known value from the last known state
      const lastKnownComponentValue = lastKnownState[component];

      // if both the current and last known values are undefined, then there is no change
      if (typeof currentComponentValue === 'undefined' && typeof lastKnownComponentValue === 'undefined') {
        continue;
      }

      if (hasStateChanged(currentComponentValue, lastKnownComponentValue)) {
        switch (component) {
          case 'position':
            deltaState[component] = currentComponentValue; // Use absolute position in offline mode
            break;

            case 'velocity':
            //console.log('currentComponentValue', currentComponentValue, lastKnownComponentValue)

            deltaState[component] = currentComponentValue;

            break;

          case 'rotation':
            deltaState[component] = currentComponentValue; // Use absolute rotation in offline mode
            break;

          default:
            deltaState[component] = currentComponentValue;
            break;
        }
        hasChanges = true;
        changedProps.push({
          id: state.id,
          component,
          currentComponentValue,
          lastKnownComponentValue
        });
      }
    }

    deltaState.type = state.type;

    if (hasChanges) {
      differentialSnapshotState.push(deltaState);
    }

    // Update the player cache
    playerStateCache[playerId][state.id] = {
      ... playerStateCache[playerId][state.id],
      ...state
    };
  })

  // console.log('deltaEncodedSnapshotState', differentialSnapshotState)
  if (differentialSnapshotState.length > 0) {
    return {
      id: Date.now(),
      state: JSON.parse(JSON.stringify(differentialSnapshotState))
    };
  }

  return null;

}

deltaEncoding.decode = function decodeDelta(snapshot) {
  // Remark: This is intentionally empty, it's implied that the client
  // will be aware that only new updates are incoming at the property level.
  // In the future we could implement deltaEncoding.cache to represent
  // The currently world state as seen by the deltaEncoder
  return snapshot;
 }

export default deltaEncoding;