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

    let self = this;


    callback(null, true);
    this.game.emit('start');

    if (this.game.systems.xstate) {
      this.game.systems.xstate.sendEvent('START');
    }

    this.game.localGameLoopRunning = true;

    this.game.localGameLoop(this.game);  // Start the local game loop when offline

    this.game.communicationClient = this;
    
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