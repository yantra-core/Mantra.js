// WebsocketServer.js - Marak Squires 2023
import express from 'express';
import WebSocket, { WebSocketServer as WebSocketServerActual } from 'ws';
import http from 'http';
import { nanoid } from 'nanoid';
import { encode } from "@msgpack/msgpack";

import deltaCompression from '@yantra-core/snapshots/SnapShotManager/deltaCompression.js';
import deltaEncoding from '@yantra-core/snapshots/SnapShotManager/deltaEncoding.js';
import messageSchema from './messageSchema.js';

const FIXED_DT = 16.666; // 60 FPS
let accumulatedTime = 0;
let lastTimestamp;

class WebSocketServer {

  static id = 'server-websocket';

  constructor({
    protobuf = false,
    msgpack = false,
    deltaEncoding = true,
    deltaCompression = false,
    expressApp = null, // Accept an express app instance
    staticContentPath = null // Path to serve static content

  } = {}) {
    this.id = WebSocketServer.id;

    let config = {
      protobuf,
      msgpack,
      deltaEncoding,
      deltaCompression
    };

    // for convenience, separate from game.config scope
    this.config = config;

    console.log('websocket server', this.config)

    this.expressApp = expressApp;
    this.staticContentPath = staticContentPath;

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

    // Create an Express app if none is provided
    if (!this.expressApp) {
      this.expressApp = express();
      this.server = http.createServer(this.expressApp);
      // Serve static content if path is provided
      if (this.staticContentPath) {
        this.expressApp.use(express.static(this.staticContentPath));
      }
    } else {
      this.server = http.createServer(this.expressApp);
    }

    this.game.listen = this.listen.bind(this);


  }

  listen(port) {
    // Use the existing HTTP server for WebSocket
    this.wsServer = new WebSocketServerActual({ server: this.server });

    // Start listening on the provided port
    this.server.listen(port, () => {
      console.log(`HTTP and WebSocket server listening on port ${port}`);
      this.game.emit('listening', port);
    });

    this.wsServer.on('connection', (ws) => this.handleConnection(ws));
  }


  async handleConnection(ws) {

    const playerEntityId = 'player_' + nanoid(7);
    ws.playerEntityId = playerEntityId;

    this.game.createPlayer({
      id: playerEntityId,
      type: 'PLAYER',
    }).then((ent) => {
      ws.playerId = ent.id;
      ws.send(JSON.stringify({
        action: 'ASSIGN_ID',
        playerName: playerEntityId,
        playerId: ent.id
      }));
    });

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

      case 'PING':
        ws.send(JSON.stringify({ action: 'PONG' }));
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
        game.systems['entity-movement'].update(parsedMessage.entityId, parsedMessage.dx, parsedMessage.dy);
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
        let entityInputSystem = game.systemsManager.getSystem('entity-input');
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

    this.game.systems['entity-factory'].cleanupDestroyedEntities();

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
    if (!this.wsServer || !this.wsServer.clients) {
      console.error('no server');
      return;
    }

    // Usage in your server context
    this.wsServer.clients.forEach(client => {
      this.processClient(client, game, this.config);
    });
}


  sendSnapshot(client, snapshot, lastProcessedInput, encoder = null) {
    let message = {
      id: snapshot.id,
      action: 'GAMETICK',
      state: snapshot.state,
      lastProcessedInput: lastProcessedInput
    };
    if (encoder) {
      let encodedMessage = encoder.encode(messageSchema, message);
      client.send(encodedMessage);
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

    if (this.config.deltaEncoding) {
      let deltaEncodedSnapshot = deltaEncoding.encode(client.playerEntityId, snapshotToSend);
      if (!deltaEncodedSnapshot) {
        return;
      }
      snapshotToSend = deltaEncodedSnapshot;
    }

    if (this.config.deltaCompression) {
      snapshotToSend = deltaCompression.compress(client.playerId, snapshotToSend);
    }

    if (this.config.protobuf) {
      encoder = {
        encode: function (schema, message) {
          // Create a new message
          let _message = game.Message.fromObject(message); // or use .fromObject if conversion is necessary
          // Encode a message to an Uint8Array (browser) or Buffer (node)
          let buffer = game.Message.encode(_message).finish();
          return buffer;
        }
      };
    } else if (this.config.msgpack) {
      encoder = {
        encode: function (schema, message) {
          return encode(message);
        }
      }; // Assuming msgpack is a global encoder object
    }
    // console.log(JSON.stringify(snapshotToSend, true, 2))
    this.sendSnapshot(client, snapshotToSend, lastProcessedInput, encoder);
  }

}

export default WebSocketServer;