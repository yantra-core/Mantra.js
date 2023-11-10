// Client.js - Marak Squires 2023
// Mantra Client, connects to either local instance or remote websocket server
import LocalClient from "./LocalClient.js";
import WebSocketClient from "./WebSocketClient.js";

export default class Client {
  constructor(playerId) {
    this.name = 'Client';
    this.entityName = playerId; // Remark: localClient expects player name in constructor?
  }

  init (game) {
    this.game = game;
    // Load all known client plugins
    // For now, this is just localClient and websocketClient
    game.use(new LocalClient(this.entityName));
    game.use(new WebSocketClient(this.entityName)); // does websocket require entityName? will server assign it?
    game.systemsManager.addSystem('client', this);
  }

  start (callback) {
    let localClient = this.game.getSystem('localClient');
    localClient.start(callback);
  }

  stop () {
    this.game.localGameLoopRunning = false;
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