// LocalClient.js - Marak Squires 2023
// LocalClient is a client that runs the game loop locally, without a server
export default class LocalClient {
  constructor(playerId) {
    this.entityName = playerId; // Remark: localClient expects player name in constructor?
    this.started = false;         // TODO: This doesn't seem ideal, we may not know the player name at this point
    // window.currentPlayerId currently used for various local client scoped auth functions, will need to be replaced with a better solution
    window.currentPlayerId = playerId;
    this.name = 'client-local';
  }

  init (game) {
    this.game = game;
    this.game.isClient = true; // We may be able to remove this? It's currently not being used anywhere
    game.localGameLoopRunning = false;
    this.game.systemsManager.addSystem('localClient', this);
  }

  start (callback) {

    if (typeof callback === 'undefined') {
      callback = function noop () {};
    }

    let graphicsSystems = this.game.graphics.length;
    let graphicsReady = this.game.graphicsReady.length;
    let physicsReady = this.game.physicsReady;

    let self = this;

    // Wait for all systems to be ready before starting the game loop
    // TODO: replace this with general 'ready' event
    if (!physicsReady || graphicsSystems > 0 && graphicsSystems !== graphicsReady) {
      setTimeout(function(){
        self.start(callback);
      }, 10)
      return
    }

    this.game.localGameLoop(this.game, this.entityName);  // Start the local game loop when offline

    this.game.communicationClient = this;
    this.game.localGameLoopRunning = true;
    callback(null, true);
    this.game.emit('start');
    
  }
  stop () {
    this.game.localGameLoopRunning = false;
  }

  sendMessage(action, data) {
    if (action === 'player_input') {
      let entityInput = this.game.getSystem('entityInput');
      entityInput.handleInputs(this.entityName, { controls:  data.controls, mouse: data.mouse });
    }
  }
}