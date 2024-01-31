export default function loadChunk(chunkPath, chunkKey) {
  // console.log("load chunk", chunkPath, chunkKey)

  if (!this.loadingStates[chunkPath]) {
    this.loadingStates[chunkPath] = { attempts: 0, loading: false };
  }

  let state = this.loadingStates[chunkPath];

  if (!state.loading && state.attempts < this.maxRetries) {
    state.loading = true;
    state.attempts++;

    console.log("Attempting to load tile chunk", chunkPath);
    this.game.loadScripts([chunkPath], (err) => {
      // console.log("Loaded tile chunk", chunkKey);
      state.loading = false;

      if (this.game.data.chunks[chunkKey]) {
        this.game.systems.tile.createLayer(this.game.data.chunks[chunkKey], this.tileSize, this.tileSize);
      } else {
        // console.log("WARNING: chunk not found", chunkKey);
        this.handleLoadFailure(chunkPath, chunkKey); // Handle the failure case
      }
    });
  } else if (state.attempts >= this.maxRetries) {
    // console.log("MAX RETRIES REACHED FOR", chunkPath);
    this.handleLoadFailure(chunkPath, chunkKey); // Handle the failure case
  }
}