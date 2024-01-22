// WebSocketClient.js - Marak Squires 2023
import { decode, decodeAsync } from "@msgpack/msgpack";
import deltaCompression from "../snapshot-manager/SnapshotManager/deltaCompression.js";
import interpolateSnapshot from './lib/interpolateSnapshot.js';
import messageSchema from "../server/messageSchema.js";
let encoder = new TextEncoder();
let hzMS = 16.666; // TODO: config with Game.fps
let config = {};
// default encoding is protobuf, turn this on to connect websocket server ( not cloudflare )
// cloudflare edge server requires msgpack due to: https://github.com/protobufjs/protobuf.js/pull/1941
// should be resolved soon, but for now we need to use msgpack

export default class WebSocketClient {
  static id = 'websocket-client';
  constructor({
    protobuf = false,
    msgpack = false,
    deltaCompression = false
  }) {

    this.id = WebSocketClient.id;

    // For convenience, separate from game.config scope
    this.config = {
      protobuf,
      msgpack,
      deltaCompression
    };

    console.log("WebSocketClient is using ClientConfig", this.config)
    this.listeners = {};
    this.connected = false;
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

  wsConnectionStringFromWindow () {
    let url;
    let host = window.location.hostname;
    let port = window.location.port;
    if (port == 7777) { // special case for dev mode, since we run separate client and server ports
      port = 8888;
    }
    // detect if browser is https or http
    let protocol = window.location.protocol;
    // create a new wsConnectionString using the host and port and protocol
    let wsConnectionString = `${protocol === 'https:' ? 'wss' : 'ws'}://${host}:${port}/websocket`;
    // assign the new url to the url variable
    url = wsConnectionString;
    return url;
  }

  connect(url) {

    // if no url is provided, construct a websocket connection string based on current url
    if (typeof url === 'undefined' && typeof window !== 'undefined') {
      url = this.wsConnectionStringFromWindow();
    }

    console.log('connecting to', url);
    let self = this;

    this.inputBuffer = {};
    this.inputSequenceNumber = 0;
    this.latestSnapshot = null;
    this.previousSnapshot = null;
    this.connected = true;
    this.game.communicationClient = this;
    this.game.onlineGameLoopRunning = true;
    this.socket = new WebSocket(url);
    this.socket.binaryType = 'arraybuffer';
    this.socket.onopen = this.handleOpen.bind(this);
    this.socket.onmessage = this.handleMessage.bind(this);
    this.socket.onclose = this.handleClose.bind(this);
    this.socket.onerror = this.handleError.bind(this);
    this.game.onlineGameLoop(this.game);

    this.game.emit('connected');
    // Start measuring RTT
    this.startRttMeasurement();

    // start a clock for cloudflare edge games, if we haven't much forward in gamestate, send a gametick event
    // to server in attempt to restart paused game
    /* TODO: add this as part of edge server ticker election in case of lockup
    setTimeout(function(){
      // check to see the gameTick count is above 3
      if (self.game.tick > 120) {
        console.log("GOT TICKS")
        // alert('got 120 ticks')
      }
    }, 5000)
    */

  }

  startRttMeasurement() {
    this.pingIntervalId = setInterval(() => {
      const start = Date.now();
      this.lastPingTime = Date.now();
      this.socket.send(JSON.stringify({ action: 'PING' }));
      this.on('PONG', () => {
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
      const tickMessage = JSON.stringify({ action: 'GAMETICK', clientTickTime });
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

    if (!this.connected) {
      console.error('not connected will not attempt to send message', action, data);
      return;
    }
    if (action === 'player_input') {

      // Do not send mouse events to server if no mouse buttons or keyboard controls are pressed
      if (typeof data.controls === 'undefined' && typeof data.mouse !== 'undefined' && data.mouse.LEFT == null && data.mouse.RIGHT == null && data.mouse.MIDDLE == null) {
        // Remark: This is a special case to ignore Mouse move events when no mouse buttons are pressed
        //         This is done for performance reasons, as we don't want to send too much data to the server
        //         ^^^ This line would need to be configurable in order to allow mouse position updates to be sent to the server
        return;
      }

      this.inputSequenceNumber++;
      this.inputBuffer[this.inputSequenceNumber] = data;
      let entityInput = this.game.getSystem('entity-input');
      //
      // TODO: switch flag config for isClientSidePredictionEnabled
      //
      // Remark: In order to enable client-side prediction we'll need to uncomment the following line:
      // Remark: Client-side prediction is close; however we were seeing some ghosting issues
      //         More unit tests and test coverage is required for: snapshots, interpolation, and prediction
      /*
        entityInput.handleInputs(this.playerId, {
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

    if (data.action === "ASSIGN_ID") {
      // in client mode will set the authorized player id
      game.setPlayerId(data.playerId);
      this.playerId = data.playerId;
      return;
    }

    if (data.action === 'BECOME_TICKER') {
      this.startTicking(this.socket);
      return;
    }

    if (data.action === 'PONG') {
      const end = Date.now();
      this.rtt = end - this.lastPingTime;
      if (this.listeners['PONG']) {
        this.listeners['PONG'](this.rtt);
      }
      return;
    }

    if (this.config.msgpack) {
      data = decode(data);
    }

    /*
    if (config.bbb) {
      const byteArray = await decodeBlob(data);
      let receivedBuffer = new BitBuffer(byteArray.length * 8); // Create a new BitBuffer
      receivedBuffer.byteArray = byteArray; // Set the byteArray
      let bbbDecoded = bbb.decode(messageSchema, receivedBuffer);
      data = bbbDecoded;
    }
    */

    if (this.config.protobuf) {
      // data is current blog, needs to be converted to buffer?
      let uint8Array = new Uint8Array(data);
      var message = game.Message.decode(uint8Array);
      // Convert the message back to a plain object
      var object = game.Message.toObject(message, {
        longs: String,
        enums: String,
        bytes: String,
        // see ConversionOptions
      });
      data = object;
    }

    if (this.config.deltaCompression) {
      // "player1" can be any string, as long as its consistent on the local client
      data = deltaCompression.decompress('player1', data);
    }

    if (data.action === "GAMETICK") {
      this.game.previousSnapshot = this.game.latestSnapshot;
      this.game.latestSnapshot = data;
      game.snapshotQueue.push(data);
      // TODO: add config flag here for snapshot interpolation
      // let inter = interpolateSnapshot(1, this.game.previousSnapshot, this.game.latestSnapshot);
      // console.log(inter)
      if (this.isServerSideReconciliationEnabled && typeof data.lastProcessedInput !== 'undefined') {
        let lastProcessedInput = data.lastProcessedInput[this.playerId];

        if (lastProcessedInput < this.inputSequenceNumber) {
          for (let i = lastProcessedInput + 1; i <= this.inputSequenceNumber; i++) {
            let input = this.inputBuffer[i];
            let entityInput = this.game.getSystem('entity-input');
            entityInput.handleInputs(this.game.currentPlayerId, { controls: input.controls, mouse: input.controls }, i);
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
  trackSnapshotSize(data) {

    // if data is string convert to blob
    // in most cases message with be binary blob already
    if (typeof data === 'string') {
      data = encoder.encode(data);
    }

    let uint8Array = new Uint8Array(data);
    let size = uint8Array.length;
    // console.log(dataString)
    // In a browser environment, create a new Blob and get its size


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
