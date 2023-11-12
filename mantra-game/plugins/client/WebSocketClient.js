// WebSocketClient.js - Marak Squires 2023
import { decode, decodeAsync } from "@msgpack/msgpack";
import deltaCompression from "../snapshots/SnapShotManager/deltaCompression.js";
import interpolateSnapshot from './lib/interpolateSnapshot.js';
import bbb from '../binary-bitstream-buffer/bbb.js';
import BitBuffer from '../binary-bitstream-buffer/binary/BitBuffer.js';
let encoder = new TextEncoder();
let hzMS = 16.666; // TODO: config with Game.fps
let config = {};
config.msgpack = false;
config.deltaCompression = true;
config.bbb = true;

export default class WebSocketClient {
  constructor(entityName, isServerSideReconciliationEnabled) {
    this.name = 'WebSocketClient';
    this.listeners = {};
    this.entityName = entityName;
    this.isServerSideReconciliationEnabled = isServerSideReconciliationEnabled;
    this.pingIntervalId = null;
    this.rtt = undefined;
    this.rttMeasurements = [];
    this.snapshotSizeMeasurements = []; // Array to store snapshot sizes
    this.totalSnapshotSize = 0; // Total size of all snapshots
    this.snapshotCount = 0; // Number of snapshots received
    this.reportFrequency = 10; // for example, report every 10 game ticks
  }

  init(game) {
    this.game = game;
    //this.game.connect = this.connect.bind(this);
    //this.game.disconnect = this.disconnect.bind(this);
    this.game.systemsManager.addSystem('websocketClient', this);
  }

  connect(url) {

    let self = this;

    let graphicsSystems = this.game.graphics.length;
    let graphicsReady = this.game.graphicsReady.length;

    if (graphicsSystems > 0 && graphicsSystems !== graphicsReady) {
      console.log('graphics not ready, trying again in 200ms')
      console.log('graphics register', this.game.graphics)
      console.log('graphicsReady', this.game.graphicsReady)
      setTimeout(function () {
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

    // Start measuring RTT
    this.startRttMeasurement();

  }

  startRttMeasurement() {
    this.pingIntervalId = setInterval(() => {
      const start = Date.now();
      this.lastPingTime = Date.now();
      this.socket.send(JSON.stringify({ action: 'ping' }));
      this.on('pong', () => {
        const end = Date.now();
        const rtt = end - start;
        this.rttMeasurements.push(rtt);
        if (this.rttMeasurements.length > 10) { // Use the last 10 measurements to get an average
          this.rttMeasurements.shift(); // Remove the oldest measurement
        }
        this.rtt = this.rttMeasurements.reduce((a, b) => a + b, 0) / this.rttMeasurements.length;
        // Emit the 'pingtime' event with the current RTT
        this.game.emit('pingtime', this.rtt);
      });
    }, 1000); // Send a ping every 5 seconds
  }

  // Call this method when the WebSocket is closed
  stopRttMeasurement() {
    clearInterval(this.pingIntervalId);
  }

  startTicking() {
    // Calculate the interval to send ticks slightly faster than hzMS, accounting for RTT
    const tickInterval = Math.max(hzMS - (this.rtt || 100) / 2, 1); // Ensure the interval is never less than 1ms

    setInterval(() => {
      // Include the clientTickTime based on the current time and RTT
      const clientTickTime = Date.now() + this.rtt;
      const tickMessage = JSON.stringify({ action: 'gameTick', clientTickTime });
      this.socket.send(tickMessage);
    }, tickInterval);
  }

  disconnect() {
    this.socket.close();
    this.game.onlineGameLoopRunning = false;
    // clear snapshot size tracking
    this.totalSnapshotSize = 0;
    this.snapshotCount = 0;
    this.snapshotSizeMeasurements = [];
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

  async handleMessage(event) {
    let game = this.game;


    let data = event.data;

    // Track the size of the snapshot
    this.trackSnapshotSize(data);


    if (typeof event.data === 'string') {
      data = JSON.parse(event.data);
    }

    if (data.action === "assign_id") {
      window.currentPlayerId = data.playerId;
      this.entityName = data.playerId;
      return;

    }

    if (data.action === 'become_ticker') {
      this.startTicking(this.socket);
      return;
    }

    if (data.action === 'pong') {
      const end = Date.now();
      this.rtt = end - this.lastPingTime;
      if (this.listeners['pong']) {
        this.listeners['pong'](this.rtt);
      }
      return;
    }

    if (config.msgpack) {
      data = await decodeFromBlob(data);
    }

    if (config.bbb) {
      const byteArray = await decodeBlob(data);
      let receivedBuffer = new BitBuffer(byteArray.length * 8); // Create a new BitBuffer
      receivedBuffer.byteArray = byteArray; // Set the byteArray
      let BBB = new bbb();
      let bbbDecoded = BBB.decodeMessage(receivedBuffer);
      data = bbbDecoded;
    }

    if (config.deltaCompression) {
      // "player1" can be any string, as long as its consistent on the local client
      data.snapshot = deltaCompression.decompress('player1', data.snapshot);
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
    this.stopRttMeasurement();
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

  // This method tracks the size of each snapshot and calculates the average
  trackSnapshotSize(dataString) {
    // console.log(dataString)
    // In a browser environment, create a new Blob and get its size

    let size;

    if (typeof dataString === 'string') {
      let buffer = encoder.encode(dataString);
      size = buffer.byteLength;
      } else {
        size = dataString.size;
    }

    this.totalSnapshotSize += size;
    this.snapshotCount++;
    this.snapshotSizeMeasurements.push(size);

    // Emit the 'snapshotsize' event with the current average size
    if (this.snapshotCount > 0 && this.snapshotCount % this.reportFrequency === 0) {
      let averageSize = this.totalSnapshotSize / this.snapshotCount;
      this.game.emit('snapshotsize', averageSize);
    }
  }

}

async function decodeFromBlob(blob) {
  if (blob.stream) {
    // Blob#stream(): ReadableStream<Uint8Array> (recommended)
    return await decodeAsync(blob.stream());
  } else {
    // Blob#arrayBuffer(): Promise<ArrayBuffer> (if stream() is not available)
    return decode(await blob.arrayBuffer());
  }
}

function blobToArrayBuffer(blob) {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
  });
}

async function decodeBlob(blob) {
  const arrayBuffer = await blobToArrayBuffer(blob);
  const byteArray = new Uint8Array(arrayBuffer);
  // Now you can use this byteArray to reconstruct your BitBuffer
  return byteArray;
}
