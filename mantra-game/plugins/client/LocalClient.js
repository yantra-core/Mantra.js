// LocalClient.js - Marak Squires 2023
// LocalClient is a client that runs the game loop locally, without a server
export default class LocalClient {
  static id = 'client-local';
  constructor() {
    this.started = false;         // TODO: This doesn't seem ideal, we may not know the player name at this point
    this.id = LocalClient.id;
  }

  init (game) {
    this.game = game;
    this.game.isClient = true; // We may be able to remove this? It's currently not being used anywhere
    game.localGameLoopRunning = false;
    this.game.systemsManager.addSystem('localClient', this);
  }

  start (callback) {
    let game = this.game;
    if (typeof callback === 'undefined') {
      callback = function noop () {};
    }

    this.game.isOnline = false;

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

    this.game.localGameLoop(this.game);  // Start the local game loop when offline

    this.game.communicationClient = this;
    this.game.localGameLoopRunning = true;

    this.game.createPlayer({
      type: 'PLAYER'
    }).then(function (ent) {
      game.setPlayerId(ent.id);
    });

    callback(null, true);
    this.game.emit('start');
    
  }
  stop () {
    this.game.localGameLoopRunning = false;
  }

  sendMessage(action, data) {
    if (action === 'player_input') {
      if (!this.game.systems['entity-input']) {
        console.log('entity-input system not found, skipping player_input action to sendMessage');
        return;
      }
      let entityInput = this.game.getSystem('entity-input');
      entityInput.handleInputs(this.game.currentPlayerId, { controls:  data.controls, mouse: data.mouse });
    }
  }
}