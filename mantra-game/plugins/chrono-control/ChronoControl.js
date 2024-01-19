import Plugin from '../../Plugin.js';
class ChronoControl extends Plugin {
  static id = 'chrono-control';
  
  constructor(game) {
    super(game);
    this.game = game;
    this.id = ChronoControl.id;
    this.gameStates = []; // Array to store game states
    this.maxStates = 1000; // Maximum number of states to store
    this.isPaused = false; // Flag to indicate if the game is paused
 
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem(this.id, this);
  }

  // Called every game loop

  update() {

    if (this.isPaused) return; // Skip updates if the game is paused

    // Clone and store the current game data
    let currentGameState = this.game.data;

    // Add the cloned state to the gameStates array
    this.gameStates.push(currentGameState);

    // Ensure the gameStates array does not exceed maxStates
    if (this.gameStates.length > this.maxStates) {
      this.gameStates.shift(); // Remove the oldest state
    }
  }

  // Starts the game loop
  start() {
    let game = this.game;
    console.log('ChronoControl starting game', game)
    game.start();
  }

  // Stops the game loop
  stop() {
    let game = this.game;
    console.log('ChronoControl stopping game', game)    
    game.stop();
  }

 
  pause() {
    this.isPaused = true;
    this.game.paused = true;
    console.log('Game paused');
  }

  resume() {
    this.isPaused = false;
    this.game.paused = false;
    console.log('Game resumed');
  }

  // Sets the game's frames per second
  setFPS(fps) {
    // Implementation for setting FPS
  }

  // Rewinds the game by a specified amount
  rewind(ticks) {
    // Implementation for rewinding the game
    // console.log('rewind', ticks)
    /*
    TODO: Have update() loop handle rewinding
    let snapshots = this.gameStates;
    snapshots.forEach(function (state) {
      for (let eId in state.ents._) {
        let ent = state.ents._[eId];
        let shallowEnt = {
          id: ent.id,
          type: ent.type,
          position: ent.position,
          rotation: ent.rotation,
          width: ent.width,
          height: ent.height,
        };
        // console.log('shallowEnt', shallowEnt)
        game.inflateEntity(shallowEnt);
      }
    });
    */
  }

  // Fast forwards the game by a specified amount
  fastForward(time) {
    // Implementation for fast-forwarding the game
  }

  // Method to handle any cleanup or resource management
  dispose() {
    // Cleanup resources here
  }
}

export default ChronoControl;