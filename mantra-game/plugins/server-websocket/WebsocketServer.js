import WebSocket, { WebSocketServer } from 'ws';
import { nanoid } from 'nanoid';

import deltaCompression from '../snapshots/SnapShotManager/deltaCompression.js';
import deltaEncoding from '../snapshots/SnapShotManager/deltaEncoding.js';

let config = {};
config.deltaCompression = false; // Toggle this to enable delta compression

config.deltaEncoding = true; // Toggle this to enable delta compression

const FIXED_DT = 40; // 25 FPS
let accumulatedTime = 0;
let lastTimestamp;

class WebSocketServerClass {
  constructor(config) {
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
    setInterval(this.gameUpdate.bind(this), FIXED_DT);
  }

  listen (port) {
    this.server = new WebSocketServer({ port: port });
    this.server.on('connection', (ws) => this.handleConnection(ws));
  }

  handleConnection(ws) {
    const playerEntityId = 'player_' + nanoid(7);
    ws.playerEntityId = playerEntityId;
    
    this.game.createEntity({
      id: playerEntityId,
      type: 'PLAYER',
      friction: this.config.player.friction,  // Default friction
      frictionAir: this.config.player.frictionAir, // Default air friction
      frictionStatic: this.config.player.frictionStatic, // Default static friction
  
    });

    ws.send(JSON.stringify({
      action: 'assign_id',
      playerId: playerEntityId
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
        entityInputSystem.handleInputs(ws.playerEntityId, parsedMessage.controls, parsedMessage.sequenceNumber);
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
    let game = this.game;
    let self = this;

    if (typeof lastTimestamp === 'undefined') {
      lastTimestamp = Date.now();
    }
    const now = Date.now();
    const deltaTime = now - lastTimestamp;
    accumulatedTime += deltaTime;

    while (accumulatedTime >= FIXED_DT) {
      game.gameTick();
      accumulatedTime -= FIXED_DT;
    }

    // Send updated data to clients after all the updates
    // TODO: systems.ws.broadcastAll('gametick', game.getSnapshot()); // something like this
    //
    // Remark: We are missing data-compression plugin here, ecapsulate the encoding layers
    //
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
          // TODO: data encoding layers go here...
          // TODO: this should be call into some data encoding layer with config
          if (config.deltaEncoding) {
            //let deltaCompressedSnapshot = deltaCompression.compress(playerSnapshot);
            // let deltaEncodedSnapshot = deltaEncoding.encode(client.playerEntityId, deltaCompressedSnapshot);
            let deltaEncodedSnapshot = deltaEncoding.encode(client.playerEntityId, playerSnapshot);
            if (deltaEncodedSnapshot) {
              client.send(JSON.stringify({
                action: 'gametick',
                snapshot: deltaEncodedSnapshot,
                lastProcessedInput: lastProcessedInput  // Include the lastProcessedInput in the message
              }));
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

    game.removedEntities.clear(); // TODO: move this to Game.js
    // Clear the lastProcessedInput for all entities
    this.lastProcessedInput = {};
    lastTimestamp = now;

  }

}

export default WebSocketServerClass;