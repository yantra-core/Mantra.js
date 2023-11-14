// WebsocketServer.js - Marak Squires 2023
import WebSocket, { WebSocketServer } from 'ws';
import { nanoid } from 'nanoid';
import { encode } from "@msgpack/msgpack";

import deltaCompression from '../snapshots/SnapShotManager/deltaCompression.js';
import deltaEncoding from '../snapshots/SnapShotManager/deltaEncoding.js';

import messageSchema from './messageSchema.js';
import bbb from '../binary-bitstream-buffer/lib/index.js';

let config = {};
config.deltaEncoding = true;       // only sends changed states and property values
config.deltaCompression = true;   // only send differences between int values
config.bbb = true;                 // see: @yantra-core/binary-bitstream-buffer
config.msgpack = false;            // `msgpack` not being used in favor of `bbb`


const FIXED_DT = 16.666; // 60 FPS
let accumulatedTime = 0;
let lastTimestamp;

class WebSocketServerClass {
  constructor(config = {}) {
    this.config = config;

    if (typeof config.player === 'undefined') {
      // TODO: move defaults elsewhere
      config.player = {
        friction: 0.1,
        frictionAir: 0.01,
        frictionStatic: 0.5
      };
    }

  }

  init(game) {
    this.game = game;
    console.log("calling websocket init");
    this.game.listen = this.listen.bind(this);
    this.lastTimestamp = Date.now();
    this.gameUpdate(); // start the game loop
  }

  listen(port) {
    this.server = new WebSocketServer({ port: port });
    this.server.on('connection', (ws) => this.handleConnection(ws));
    this.game.emit('listening', port);
  }

  handleConnection(ws) {
    const playerEntityId = 'player_' + nanoid(7);
    ws.playerEntityId = playerEntityId;

    console.log("PLAYER JOINED")
    let ent = this.game.createEntity({
      // id: playerEntityId,
      name: playerEntityId,
      type: 'PLAYER',
      friction: this.config.player.friction,  // Default friction
      frictionAir: this.config.player.frictionAir, // Default air friction
      frictionStatic: this.config.player.frictionStatic, // Default static friction

    });

    ws.playerId = ent.id;

    ws.send(JSON.stringify({
      action: 'assign_id',
      playerName: playerEntityId,
      playerId: ent.id
    }));

    ws.on('error', (error) => this.handleError(ws, error));
    ws.on('close', () => this.handleClose(ws));
    ws.on('message', (message) => this.handleMessage(ws, message));
  }

  handleError(ws, error) {
    console.error('WebSocket error:', error);
    this.game.removeEntity(ws.playerEntityId);
  }

  handleClose(ws) {
    console.log('WebSocket connection closed');
    deltaCompression.resetState(ws.playerId);
    this.game.removeEntity(ws.playerId);
  }

  handleMessage(ws, message) {
    // Existing switch-case logic goes here...
    let game = this.game;
    const parsedMessage = JSON.parse(message);
    //console.log('parsedMessage', parsedMessage)
    switch (parsedMessage.action) {
      case 'createEntity':
        game.createEntity(parsedMessage.entityId);
        game.addComponent(parsedMessage.entityId, 'position', { x: parsedMessage.x, y: parsedMessage.y });
        game.addComponent(parsedMessage.entityId, 'type', parsedMessage.type);
        ws.send(JSON.stringify({ status: 'Entity created' }));
        break;

      case 'ping':
        ws.send(JSON.stringify({ action: 'pong' }));
        break;

      case 'creator_json':
        let states = parsedMessage.json.state;
        // do a quick massage of the old api into new
        states = states.map((state) => {
          game.inflateEntity(state);
          return state;
        });
        console.log('creator_json', states)

        break;
      case 'set_config':
        console.log('set_config', parsedMessage)
        break;
      case 'moveEntity':
        game.systems.entityMovement.update(parsedMessage.entityId, parsedMessage.dx, parsedMessage.dy);
        ws.send(JSON.stringify({ status: 'Entity moved' }));
        break;

      case 'getEntity':
        const entity = game.getEntity(parsedMessage.entityId);
        ws.send(JSON.stringify({ entity }));
        break;

      case 'getEntities':
        const entities = game.getEntities();
        ws.send(JSON.stringify({ entities }));
        break;

      case 'player_input':
        let entityInputSystem = game.systemsManager.getSystem('entityInput');
        //console.log('ws.playerEntityId', ws.playerEntityId)
        entityInputSystem.handleInputs(ws.playerId, { controls: parsedMessage.controls, mouse: parsedMessage.mouse }, parsedMessage.sequenceNumber);
        break;

      case 'getSnapshot':
        // TODO: data encodings layer goes here
        const snapshot = game.getPlayerSnapshot(parsedMessage.entityId);

        if (snapshot) {
          ws.send(JSON.stringify({ snapshot }));
        }
        break;

      default:
        console.error('Unknown action:', parsedMessage);
        break;
    }

  }

  gameUpdate() {
    const now = Date.now();
    const deltaTime = now - this.lastTimestamp;
    this.lastTimestamp = now;
    accumulatedTime += deltaTime;

    // Execute game logic updates based on the accumulated time
    while (accumulatedTime >= FIXED_DT) {
      this.game.gameTick();
      accumulatedTime -= FIXED_DT;
    }

    this.sendUpdates();

    // Calculate the time until the next game logic update
    let timeUntilNextUpdate = FIXED_DT - accumulatedTime;
    const timeSpent = Date.now() - now; // Time spent in current update
    // console.log('timeSpent', timeSpent)

    // Ensure we don't schedule with negative delay, should not happen unless frame drop
    timeUntilNextUpdate = Math.max(timeUntilNextUpdate - timeSpent, 0);
    //console.log('timeUntilNextUpdate', timeUntilNextUpdate)

    // Schedule next update after the remaining time until the next fixed time step
    setTimeout(() => this.gameUpdate(), timeUntilNextUpdate);
  }

  sendUpdates() {
    let game = this.game;
    // Send updated data to clients after all the updates
    // TODO: systems.ws.broadcastAll('gametick', game.getSnapshot()); // something like this
    //
    // Remark: We are missing data-compression plugin here, ecapsulate the encoding layers
    //
    // console.log('sendUpdates')
    let count = 0;
    if (!this.server || !this.server.clients) {
      console.error('no server')
      return;
    }

    // Usage in your server context
    this.server.clients.forEach(client => {
      this.processClient(client, game, config);
    });


  }

  sendSnapshot(client, snapshot, lastProcessedInput, encoder = null) {
    let message = {
      action: 'gametick',
      snapshot: snapshot,
      lastProcessedInput: lastProcessedInput
    };

    if (encoder) {
      let encodedMessage = bbb.encode(messageSchema, message);
      client.send(encodedMessage.byteArray || encodedMessage);
    } else {
      client.send(JSON.stringify(message));
    }
  }

  processClient(client, game, config) {
    if (!client.playerEntityId || client.readyState !== WebSocket.OPEN) return;

    const lastProcessedInput = game.lastProcessedInput[client.playerEntityId];
    const playerSnapshot = game.getPlayerSnapshot(client.playerEntityId);

    if (!playerSnapshot) return;

    let snapshotToSend = playerSnapshot;
    let encoder = null;

    if (config.deltaCompression) {
      snapshotToSend = deltaCompression.compress(client.playerId, snapshotToSend);
    }

    if (config.deltaEncoding) {
      let deltaEncodedSnapshot = deltaEncoding.encode(client.playerEntityId, snapshotToSend);
      if (!deltaEncodedSnapshot) return;
      snapshotToSend = deltaEncodedSnapshot;
    }

    if (config.bbb) {
      encoder = bbb.encode;
    } else if (config.msgpack) {
      encoder = msgpack; // Assuming msgpack is a global encoder object
    }
    // console.log(JSON.stringify(snapshotToSend, true, 2))
    this.sendSnapshot(client, snapshotToSend, lastProcessedInput, encoder);
  }

}

export default WebSocketServerClass;