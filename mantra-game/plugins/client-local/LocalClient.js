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
    game.localGameLoop(game, this.entityName);  // Start the local game loop when offline
  }

  start () {
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