// WebSocketClient.js - Marak Squires 2023
import interpolateSnapshot from './lib/interpolateSnapshot.js';
let hzMS = 16.666; // TODO: config with Game.fps

export default class WebSocketClient {
  constructor(entityName, isServerSideReconciliationEnabled) {
    this.listeners = {};
    this.entityName = entityName;
    this.isServerSideReconciliationEnabled = isServerSideReconciliationEnabled;
  }

  init(game) {
    this.game = game;
    this.game.connect = this.connect.bind(this);
    this.game.disconnect = this.disconnect.bind(this);
  }

  connect (url) {

    let self = this;

    let graphicsSystems = this.game.graphics.length;
    let graphicsReady = this.game.graphicsReady.length;

    if (graphicsSystems > 0 && graphicsSystems !== graphicsReady) {
      console.log('graphics not ready, trying again in 200ms')
      console.log('graphics register', this.game.graphics)
      console.log('graphicsReady', this.game.graphicsReady)
      setTimeout(function(){
        self.connect(url);
      }, 200)
      return
    } 

    this.inputBuffer = {};
    this.inputSequenceNumber = 0;
    this.latestSnapshot = null;
    this.previousSnapshot = null;

    this.game.communicationClient = this;
    this.game.onlineGameLoopRunning = true;
    this.socket = new WebSocket(url);
    this.socket.onopen = this.handleOpen.bind(this);
    this.socket.onmessage = this.handleMessage.bind(this);
    this.socket.onclose = this.handleClose.bind(this);
    this.socket.onerror = this.handleError.bind(this);
    this.game.onlineGameLoop(this.game);

  }
  
  disconnect () {
    this.socket.close();
    this.game.onlineGameLoopRunning = false;
  }

  sendMessage(action, data = {}) {
    if (action === 'player_input') {
      this.inputSequenceNumber++;
      this.inputBuffer[this.inputSequenceNumber] = data;
      let entityInput = this.game.getSystem('entityInput');
      //
      // TODO: switch flag config for isClientSidePredictionEnabled
      //
      // Remark: In order to enable client-side prediction we'll need to uncomment the following line:
      // Remark: Client-side prediction is close; however we were seeing some ghosting issues
      //         More unit tests and test coverage is required for: snapshots, interpolation, and prediction
      /*
      entityInput.handleInputs(this.entityName, {
        controls: data.controls,
        mouse: data.mouse
      }, this.inputSequenceNumber);
      */
      var message = JSON.stringify(Object.assign({ action: action, sequenceNumber: this.inputSequenceNumber }, data));
      this.socket.send(message);
    } else {
      var message = JSON.stringify(Object.assign({ action: action }, data));
      this.socket.send(message);
    }
  }

  handleOpen(event) {
    console.log('WebSocket is connected:', event);
  }

  handleMessage(event) {
    let game = this.game;
    let data = JSON.parse(event.data);

    if (data.action === "assign_id") {
      window.currentPlayerId = data.playerId;
      this.entityName = data.playerId;
    }

    if (data.action === 'become_ticker') {
      startTicking(this.socket);
    }

    if (data.action === "gametick") {

      this.game.previousSnapshot = this.game.latestSnapshot;
      this.game.latestSnapshot = data.snapshot;
      game.snapshotQueue.push(data.snapshot);

      // TODO: add config flag here for snapshot interpolation
      // let inter = interpolateSnapshot(1, this.game.previousSnapshot, this.game.latestSnapshot);
      // console.log(inter)

      if (this.isServerSideReconciliationEnabled && typeof data.lastProcessedInput !== 'undefined') {
        let lastProcessedInput = data.lastProcessedInput[this.entityName];

        if (lastProcessedInput < this.inputSequenceNumber) {
          for (let i = lastProcessedInput + 1; i <= this.inputSequenceNumber; i++) {
            let input = this.inputBuffer[i];
            let entityInput = this.game.getSystem('entityInput');
            entityInput.handleInputs(this.entityName, { controls: input.controls, mouse: input.controls }, i);
          }
        }
        // Clear the already processed inputs from the inputBuffer
        for (let i = 0; i <= lastProcessedInput; i++) {
          delete this.inputBuffer[i];
        }
      } else {
        // If server-side Server Side Reconciliation is disabled
        // do nothing
      }
      // Remark: we could have an update() function here to help manage snapshot state
      // We are currently using `previousSnapshot` and `latestSnapshot` in client.js loops
    }
  }

  handleClose(event) {
    console.log('WebSocket is closed:', event);
  }

  handleError(error) {
    console.error('WebSocket error:', error);
  }

  on(action, callback) {
    this.listeners[action] = callback;
  }

  getInterpolatedSnapshot(alpha) {
    // bind this scope to interpolateSnapshot
    return interpolateSnapshot.call(this, alpha);
  }
  
}

function startTicking(socket) {
  setInterval(function () {
    const tickMessage = JSON.stringify({ action: 'gameTick' });
    socket.send(tickMessage);
  }, hzMS);
}