export default class LocalClient {
  constructor(playerId) {
    this.entityName = playerId; // Remark: localClient expects player name in constructor?
    this.started = false;         // TODO: This doesn't seem ideal, we may not know the player name at this point
    // window.currentPlayerId currently used for various local client scoped auth functions, will need to be replaced with a better solution
    window.currentPlayerId = playerId;
  }

  init (game) {
    this.game = game;
    this.game.isClient = true; // We may be able to remove this? It's currently not being used anywhere
    this.game.start = this.start.bind(this);
    this.game.stop = this.stop.bind(this);
    game.localGameLoopRunning = true;
    console.log('init the local client')
  }

  start () {

    let graphicsSystems = this.game.graphics.length;
    let graphicsReady = this.game.graphicsReady.length;

    let self = this;
    if (graphicsSystems > 0 && graphicsSystems !== graphicsReady) {
      setTimeout(function(){
        self.start();
      }, 10)
      return
    }

    this.game.localGameLoop(this.game, this.entityName);  // Start the local game loop when offline

    this.game.communicationClient = this;
    this.game.localGameLoopRunning = true;
  }
  stop () {
    this.game.localGameLoopRunning = false;
  }

  sendMessage(action, data) {
    if (action === 'player_input') {
      let entityInput = this.game.getSystem('entityInput');
      entityInput.handleInputs(this.entityName, data.controls);
    }
  }
}