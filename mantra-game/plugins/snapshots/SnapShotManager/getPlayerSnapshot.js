/*

 getPlayerSnapshot() is for  gathering states from the game that interesting to player, 
 usually done through spatial index search for now, the geo spatial search is hard-coded to return this.bodyMap
 plus some additional netcode game logic for excluding certain entities from the snapshot

*/
let playerStateCache = {};
let playerSnapshotCounts = {};
let snapshotCount = 0;


let config = {
  clientSidePrediction: true
};

const getPlayerSnapshot = function (playerId) {
  const differentialSnapshotState = [];
  let playerState = [];
  const componentsList = ['type', 'destroyed', 'position', 'velocity', 'mass', 'type', 'health', 'rotation', 'width', 'height', 'radius'];

  // console.log('getPlayerSnapshot, this.removedEntities', this.removedEntities);

  for (const eId of this.removedEntities) { // TODO: spatially zone removed entities
    // console.log('pushing removed to clientattempt to destroy', eId)
    playerState.push({
      id: eId,
      destroyed: true
    })
  }

  // TODO: this should be using a spatial search instead of just returning the entire world
  // use FIELD_OF_VIEW and RENDER_DISTANCE to limit the number of entities returned
  for (const eId in this.bodyMap) { // TODO: this.bodyMap should be RBush search

    let body = this.bodyMap[eId];
    let state = this.getEntity(eId);

    if (state.destroyed) {
      delete playerStateCache[playerId][state.id];
      if (state.type === 'PLAYER') {
        delete playerStateCache[playerId][state.id];
        delete playerStateCache[state.id];
      }
      continue;
    }
    
    if (typeof playerStateCache[playerId] === 'undefined') {
      playerStateCache[playerId] = {};
    }

    if (config.clientSidePrediction) {
      // don't send send players their own bullets ( uncomment for client-side prediction )
      if (state.type === 'BULLET' && state.owner === playerId) {
        // console.log("will not send players their own bullets");
        continue;
      }
    }

    // bullets are kinematic, so we only send their initial state with velocity vector
    if (state.type === 'BULLET' && typeof playerStateCache[playerId] !== 'undefined' && typeof playerStateCache[playerId][state.id] !== 'undefined') {
      continue;
    }

    playerStateCache[playerId][state.id] = state;

    if (typeof playerSnapshotCounts[playerId] === 'undefined') {
      playerSnapshotCounts[playerId] = 0;
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

export default getPlayerSnapshot;