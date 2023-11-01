export default class LocalClient {
  constructor(entityName) {
    this.entityName = entityName;
    this.started = false;
  }

  init (game) {
    this.game = game;
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