// Client.js - Marak Squires 2023
// Mantra Client, connects to either local instance or remote websocket server
import LocalClient from "./LocalClient.js";
import WebSocketClient from "./WebSocketClient.js";

export default class Client {
  static id = 'client';
  static removable = false;

  constructor({ protobuf = false, msgpack = false, deltaEncoding = true, deltaCompression = false } = {}) {
    this.id = Client.id;
    // for convenience, separate fro game.config scope
    this.config = {
      protobuf,
      msgpack,
      deltaEncoding,
      deltaCompression
    };
  }

  init (game) {
    this.game = game;
    // Load all known client plugins
    // For now, this is just localClient and websocketClient
    // Remark: We load both of them to allow for switching of local / remote modes
    // We could change this to only load WebSocketClient if .connect() is called
    game.use(new LocalClient());
    game.use(new WebSocketClient({
      protobuf: this.config.protobuf,
      msgpack: this.config.msgpack,
      deltaCompression: this.config.deltaCompression,
      deltaEncoding: this.config.deltaEncoding
    }));
    game.systemsManager.addSystem('client', this);
  }

  start (callback) {
    let localClient = this.game.getSystem('localClient');
    localClient.start(callback);
  }

  stop () {
    console.log('Client.js plugin stopping game', this.game)
    // this.game.localGameLoopRunning = false;
    let localClient = this.game.getSystem('localClient');
    localClient.stop();
  }

  connect (url) {
    let websocketClient = this.game.getSystem('websocketClient');
    websocketClient.connect(url);
  }

  disconnect () {
    let websocketClient = this.game.getSystem('websocketClient');
    websocketClient.disconnect();
  }

  sendMessage(action, data) {
    let localClient = this.game.getSystem('localClient');
    localClient.sendMessage(action, data);
  }
}