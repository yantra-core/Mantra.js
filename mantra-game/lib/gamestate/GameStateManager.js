export default class GameStateManager {

  constructor(game, storage) {
    this.game = game;
    this.storage = storage;
    this.stateKey = 'gameState'; // Key for localStorage
  }

  // Serializes the current state of the game
  toJSON() {
    const currentState = this.game.data;
    return JSON.stringify(currentState);
  }

  // Deserializes and applies the given state to the game
  // TODO: better logic for applying state
  hydrate(stateString) {
    if (stateString) {
      const state = JSON.parse(stateString);
      if (state.plugins &&  state.plugins.length > 0) {
        state.plugins.forEach(({ pluginName, config }) => {
          this.game.use(pluginName, config);
        });
      }
    }
  }

  // Saves the current state to local storage
  saveState() {
    const serializedState = this.toJSON();
    this.storage.set(this.stateKey, serializedState);
  }

  // Loads and applies the state from local storage
  loadState() {
    const stateString = this.storage.get(this.stateKey);
    if (stateString) {
      this.hydrate(stateString);
    }
  }
}