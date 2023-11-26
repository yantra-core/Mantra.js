/*

 getPlayerSnapshot() is for  gathering states from the game that interesting to player, 
 usually done through spatial index search for now, the geo spatial search is hard-coded to return this.bodyMap
 plus some additional netcode game logic for excluding certain entities from the snapshot

*/

// playerStateCache is not directly related to deltaCompression
// playerStateCache is used to track kinematic entities (bullets) for client-side prediction
// playerStateCache is legacy API and can be removed soon
let playerStateCache = {};
let playerSnapshotCounts = {};
let snapshotCount = 0;

let config = {
  clientSidePrediction: true
};

// TODO: auto-generate this list from the components
const componentsList = ['type', 'destroyed', 'position', 'velocity', 'mass', 'type', 'health', 'rotation', 'width', 'height', 'depth', 'radius', 'isSensor', 'lifetime', 'owner', 'color'];

const getPlayerSnapshot = function (playerId) {
  const differentialSnapshotState = [];
  let playerState = [];

  // TODO: this should be using a spatial search instead of just returning the entire world
  // use FIELD_OF_VIEW and RENDER_DISTANCE to limit the number of entities returned
  for (let [eId, state] of this.entities.entries()) { // TODO: this.bodyMap should be RBush search

    if (state.destroyed) {
      delete playerStateCache[playerId][state.id];
      if (state.type === 'PLAYER') {
        delete playerStateCache[playerId][state.id];
        delete playerStateCache[state.id];
      }
      // no need to further process this entity ( for now )
      // TODO: remove this push and continue to allow client-side prediction
      playerState.push(state);
      continue;
    }
    
    if (typeof playerStateCache[playerId] === 'undefined') {
      playerStateCache[playerId] = {};
    }

    if (config.clientSidePrediction) {
      // don't send send players their own bullets ( uncomment for client-side prediction )
      if (state.type === 'BULLET' && state.owner === playerId) {
        // console.log("will not send players their own bullets");
        // TODO: uncomment with client-side prediction
        // continue;
      }
    } 

    // bullets are kinematic, so we only send their initial state with velocity vector
    if (state.type === 'BULLET' && typeof playerStateCache[playerId] !== 'undefined' && typeof playerStateCache[playerId][state.id] !== 'undefined') {
      continue;
    }

    playerStateCache[playerId][state.id] = state;

    if (typeof playerSnapshotCounts[playerId] === 'undefined') {
      // TODO: playerSnapshotCounts is accumulating state, should be reset on player disconnect
      playerSnapshotCounts[playerId] = 0;
    }

    // TODO: move float truncation to separate function
    if (true) {
      if (typeof state.position !== 'undefined' && typeof state.position.x === 'number' && typeof state.position.y === 'number') {
        state.position.x = truncateToPrecision(state.position.x);
        state.position.y = truncateToPrecision(state.position.y);
        if (typeof state.position.z === 'number') {
          state.position.z = truncateToPrecision(state.position.z);
        }
      }

      if (typeof state.velocity !== 'undefined' && typeof state.velocity.x === 'number' && typeof state.velocity.y === 'number') {
        state.velocity.x = truncateToPrecision(state.velocity.x);
        state.velocity.y = truncateToPrecision(state.velocity.y);
        if (typeof state.velocity.z === 'number') {
          state.velocity.z = truncateToPrecision(state.velocity.z);
        }
      }

    }

    playerState.push(state);

  }

  playerSnapshotCounts[playerId]++;
  return {
    id: playerSnapshotCounts[playerId],
    ctime: Date.now(),
    state: playerState
  };

};

const truncateToPrecision = (value, precision = 3) => {
  return Number(value.toFixed(precision));
};


export default getPlayerSnapshot;