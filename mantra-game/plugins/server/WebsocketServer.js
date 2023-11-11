// WebsocketServer.js - Marak Squires 2023
import WebSocket, { WebSocketServer } from 'ws';
import { nanoid } from 'nanoid';
import { encode } from "@msgpack/msgpack";

import deltaCompression from '../snapshots/SnapShotManager/deltaCompression.js';
import deltaEncoding from '../snapshots/SnapShotManager/deltaEncoding.js';

import bbb from '../binary-bitstream-buffer/bbb.js';

let config = {};
config.deltaEncoding = true; // Toggle this to enable delta compression
config.deltaCompression = false; // Toggle this to enable delta compression
config.msgpack = false;
config.bbb = true;

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
    this.game.removeEntity(ws.playerEntityId);
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
        //console.log('ws.playerId', ws.playerId)

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

    // TODO: move this to broadcastAll
    this.server.clients.forEach(client => {
      count++;
      //console.log('client.readyState', count, client.readyState)
      if (client.playerEntityId && client.readyState === WebSocket.OPEN) {
        const lastProcessedInput = game.lastProcessedInput[client.playerEntityId];  // Get the lastProcessedInput for this client's player entity
        const playerSnapshot = game.getPlayerSnapshot(client.playerEntityId);
        if (playerSnapshot) {
          // TODO: Replace these calls with SnapshotManager calls
          // TODO: this should be call into some data encoding layer with config
          // TODO: refactor this large if / else statement with data encoder ( see SnapShotManager code )
          if (config.deltaEncoding) {
            let deltaEncodedSnapshot = deltaEncoding.encode(client.playerEntityId, playerSnapshot);
            if (deltaEncodedSnapshot) {


              if (config.deltaCompression) {
                let deltaCompressedSnapshot = deltaCompression.compress(deltaEncodedSnapshot);
                if (config.bbb) {
                  // TODO: add data encoding layer here
                  let bbbEncoded = encode({
                    action: 'gametick',
                    snapshot: deltaCompressedSnapshot,
                    lastProcessedInput: lastProcessedInput  // Include the lastProcessedInput in the message
                  });
                  client.send(msgPacked);
                } else {
                  console.log(deltaCompressedSnapshot)
                  client.send(JSON.stringify({
                    action: 'gametick',
                    snapshot: deltaCompressedSnapshot,
                    lastProcessedInput: lastProcessedInput  // Include the lastProcessedInput in the message
                  }));
                }


                /*
                if (config.msgpack) {
                  // TODO: add data encoding layer here
                  let msgPacked = encode({
                    action: 'gametick',
                    snapshot: deltaCompressedSnapshot,
                    lastProcessedInput: lastProcessedInput  // Include the lastProcessedInput in the message
                  });
                  client.send(msgPacked);
                } else {
                  client.send(JSON.stringify({
                    action: 'gametick',
                    snapshot: deltaCompressedSnapshot,
                    lastProcessedInput: lastProcessedInput  // Include the lastProcessedInput in the message
                  }));
                }
                */
              } else {
                if (config.bbb) {
                  // TODO: add data encoding layer here
                  let BBB = new bbb();
                  deltaEncodedSnapshot.state = deltaEncodedSnapshot.state.map((item) => {
                    delete item.owner;
                    return item;
                  })
                  let sendTo = {
                    action: 'gametick',
                    snapshot: deltaEncodedSnapshot,
                    lastProcessedInput: lastProcessedInput || 0  // Include the lastProcessedInput in the message
                  };

                  //console.log(JSON.stringify(sendTo, true, 2))
                  let bbbEncoded = BBB.encodeMessage(sendTo);
                  
                  client.send(bbbEncoded.byteArray);
                } else {
                  //console.log(deltaEncodedSnapshot)
                  client.send(JSON.stringify({
                    action: 'gametick',
                    snapshot: deltaEncodedSnapshot,
                    lastProcessedInput: lastProcessedInput  // Include the lastProcessedInput in the message
                  }));
                }
              }


            }
          } else {
            client.send(JSON.stringify({
              action: 'gametick',
              snapshot: playerSnapshot,
              lastProcessedInput: lastProcessedInput  // Include the lastProcessedInput in the message
            }));

          }

        }
      }
    });

  }

}

export default WebSocketServerClass;