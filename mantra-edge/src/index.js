import { Game, plugins } from '../../mantra-game/Game.js';
import deltaEncoding from '@yantra-core/mantra/plugins/snapshots/SnapShotManager/deltaEncoding.js';
import deltaCompression from '@yantra-core/mantra/plugins/snapshots/SnapShotManager/deltaCompression.js';
import { encode } from "@msgpack/msgpack";

let config = {};
config.msgpack = true;
config.bbb = false;
config.protobuf = false; // see: https://github.com/protobufjs/protobuf.js/pull/1941
config.deltaCompression = true;   // only send differences between int values

// let lastMessageTime = 0;
const MAX_BUFFER_SIZE = 100;

// Worker code
export default {
  async fetch(request, env) {
    let url = new URL(request.url);
    let id = env.AYYO.idFromName('global');
    let game = env.AYYO.get(id);
    let response = await game.fetch(request);
    return response;
  }
};

// Define the Durable Object class for the Game
export class Ayyo {
  constructor(state, env) {
    this.env = env;
    this.connectedPlayers = {}; // Store connected players with their websockets
    this.tickBuffer = [];

    // Flag to track if the start-up code has been run
    this.startupExecuted = false;

    // Add a new property to track the time of the last processed tick
    this.lastProcessedTickTime = 0;
    // Initializing the systems
    this.gameLogic = new Game({
      isServer: true,
    });

    // Use Plugins to add systems to the game
    this.gameLogic
      // .use(new plugins.Schema())
      .use(new plugins.Bullet())
      .use(new plugins.Block({ MIN_BLOCK_SIZE: 200 }))
      .use(new plugins.Collision())
      .use(new plugins.Border({ autoBorder: false }))
  }

  async initialize() {
    if (!this.initializePromise) {
      this.initializePromise = Promise.resolve();  // You can add any async initialization here.
    }

    await this.initializePromise;
  }

  startGame() {
    this.gameLogic.systems.border.createBorder({
      height: 2000,
      width: 2000,
    });

    /* TODO: better data compression / client-side prediction     */

    // Your game start-up logic goes here
    this.gameLogic.createEntity({
      type: 'BLOCK',
      shape: 'rectangle',
      width: 500,
      height: 500,
      position: {
        x: -500,
        y: -500
      },
    });

  }

  async reset() {
    // Reset in-memory state
    this.state = { entities: {}, snapshots: [] };
    this.connectedPlayers = {};
    this.tickBuffer = [];
    this.lastProcessedTickTime = 0;


    // await this.initialize();
  }

  async handleSession(websocket) {
    websocket.accept();

    // Run the start-up code if it hasn't been executed yet
    if (!this.startupExecuted) {
      this.startGame();
      this.startupExecuted = true; // Set the flag to true
    }

    // Generate a unique player ID for this connection
    // remark: replace with global entity counter that is INT
    //const playerEntityId = 'player_' + Math.random().toString(36).substr(2, 9);
    let playerEntityId;
    const playerName = 'player_' + Math.random().toString(36).substr(2, 9);
    let ent;
    // Create the player entity in the game logic
    try {
      // Create a new player with a unique ID
      ent = this.gameLogic.createEntity({
        name: playerName,
        type: 'PLAYER',
      });
      // this.gameLogic.systems.playerCreation.createPlayer(playerEntityId);
    } catch (err) {
      console.log("ERROR", err)
    }


    playerEntityId = ent.id;
    // Store the connected player with its WebSocket
    this.connectedPlayers[playerEntityId] = websocket;


    try {
      websocket.send(JSON.stringify({
        action: 'assign_id',
        playerName: playerName,
        playerId: ent.id

      }));
    } catch (err) {
      console.log(err)

    }

    // Check if a new ticker needs to be elected
    if (!this.tickerId) {
      // console.log("ELECT NEW TICKER", playerEntityId)
      this.electNewTicker(playerEntityId);
    }

    // Handle WebSocket close event
    websocket.addEventListener('close', event => {
      console.log('WebSocket is closed:', event);

      // Remove the player from the connected players list and from the game state
      delete this.connectedPlayers[playerEntityId];
      this.gameLogic.removeEntity(playerEntityId);  // You need to implement this method in Game.js

      if (config.deltaCompression) {
        deltaCompression.resetState(playerEntityId);
      }

      if (playerEntityId === this.tickerId) {
        this.tickerId = null; // Clear the tickerId
        this.electNewTicker(Object.keys(this.connectedPlayers)[0]); // Elect a new ticker
      }

    });


    websocket.addEventListener('error', error => {
      console.error('WebSocket encountered an error:', error);
    });

    // Handle incoming WebSocket messages
    websocket.addEventListener('message', async event => {
      // this never happens even though we are sending messages
      // console.log('WebSocket message received:', event.data);
      const message = JSON.parse(event.data);
      // Perform the requested action based on the "action" property of the message
      switch (message.action) {
        case 'gameTick':
          // console.log('got game tick')
          this.bufferGameTick(message, playerEntityId);

          if (this.tickerId !== playerEntityId) {
            console.log('will not accept gameTick from', playerEntityId, 'because', this.tickerId, 'is the current ticker');
            return;
          }
          break;

        case 'player_input':
          // console.log('ahhhh', playerEntityId, message.controls)
          this.gameLogic.systems.entityInput.handleInputs(playerEntityId, { controls: message.controls });
          break;

        case 'ping':
          websocket.send(JSON.stringify({ action: 'pong' }));
          break;

        case 'createEntity':
          this.gameLogic.createEntity(message.entityId);
          this.gameLogic.addComponent(message.entityId, 'position', { x: message.x, y: message.y });
          this.gameLogic.addComponent(message.entityId, 'type', message.type);
          websocket.send(JSON.stringify({ status: 'Entity created' }));
          break;
        case 'moveEntity':
          this.gameLogic.update(message.entityId, message.dx, message.dy);
          websocket.send(JSON.stringify({ status: 'Entity moved' }));
          break;
        case 'getEntity':
          console.log('case getEntity')
          const entity = this.gameLogic.getEntity(message.entityId);
          console.log("sendinb back to route", entity);
          websocket.send(JSON.stringify({ entity }));
          break;
        case 'getEntities':
          const entities = this.gameLogic.getEntities();
          console.log("getEntities", entities)
          // never making it to client?
          websocket.send(JSON.stringify({ entities }));
          break;
        case 'getSnapshot':
          const snapshot = this.gameLogic.getSnapshot();
          console.log('got back snapshot', snapshot);
          websocket.send(JSON.stringify({ snapshot }));
          break;
        default:
          console.error('Unknown action:', event);
      }
    });

    // Handle WebSocket close event
    websocket.addEventListener('close', event => {
      console.log('WebSocket is closed:', event);
    });
  }

  // Elect a new ticker when a player connects or when the current ticker disconnects
  electNewTicker(newTickerId) {
    this.tickerId = newTickerId;
    // console.log("electNewTicker", this.connectedPlayers, newTickerId)
    const tickerWs = this.connectedPlayers[newTickerId];
    if (tickerWs) {
      tickerWs.send(JSON.stringify({
        action: 'become_ticker'
      }));
    }
  }

  bufferGameTick(message, playerId) {
    const now = Date.now();
    const tickTime = message.clientTickTime; // Assuming client sends this

    // Add to the buffer
    this.tickBuffer.push({ tickTime, playerId, message });

    // Sort the buffer by tick time
    this.tickBuffer.sort((a, b) => a.tickTime - b.tickTime);

    // Process ticks if it's time to do so
    this.processBufferedTicks();
  }

  processBufferedTicks() {
    const now = Date.now();

    // Process ticks
    while (this.tickBuffer.length > 0 && this.tickBuffer[0].tickTime <= now) {
      const { playerId, message } = this.tickBuffer.shift();
      this.processGameTick(playerId, message);
    }

    // Check for buffer overflow and handle it
    if (this.tickBuffer.length > MAX_BUFFER_SIZE) {
      console.log("WARNING, tick buffer is overflowing. MAX_BUFFER_SIZE has capped buffer growth.");
      console.log('This is an indication that the client is sending the wrong amount of ticks per second.');
      // Drop the oldest ticks to prevent buffer overflow
      this.tickBuffer.splice(0, this.tickBuffer.length - MAX_BUFFER_SIZE);
    }
  }

  processGameTick(playerId, message) {
    // playerId and message here represent the incoming gameTick clock source
    // they aren't currently used inside the Game.gameTick() metho

    // Process the game tick logic here
    this.gameLogic.gameTick();

    // Send updates to clients
    try  {
      this.sendPlayerSnapshots();
    } catch (err) {
      console.log('ERROR this.sendPlayerSnapshots()')
      console.log(err.message);

    }
  }

  sendPlayerSnapshots() {

    Object.keys(this.connectedPlayers).forEach(playerId => {

      const playerSnapshot = this.gameLogic.getPlayerSnapshot(playerId);
      const lastProcessedInput = this.gameLogic.lastProcessedInput[playerId];

      if (playerSnapshot) {
        try {


          let deltaEncoded = deltaEncoding.encode(playerId, playerSnapshot);
          if (deltaEncoded) {
            let newSnapshot;

            if (config.deltaCompression) {
              newSnapshot = deltaCompression.compress(playerId, deltaEncoded);
            } else {
              newSnapshot = playerSnapshot;
            }

            if (config.protobuf) {
                // Create a new message
                let _message = this.gameLogic.Message.fromObject({ id: newSnapshot.id, action: 'GAMETICK', state: newSnapshot.state, lastProcessedInput: lastProcessedInput }); // or use .fromObject if conversion is necessary
                // Encode a message to an Uint8Array (browser) or Buffer (node)
                let buffer = game.Message.encode(_message).finish();
                const ws = this.connectedPlayers[playerId];
                ws.send(buffer);
            } else if (config.bbb) {
              let BBB = new bbb();
              // TODO: add data encoding layer here
              let bbbEncoded = BBB.encodeMessage({ id: newSnapshot.id, action: 'GAMETICK', state: newSnapshot.state, lastProcessedInput: lastProcessedInput });

              const ws = this.connectedPlayers[playerId];
              ws.send(bbbEncoded.byteArray);
            } else if (config.msgpack) {
              const ws = this.connectedPlayers[playerId];
              let msg = { id: newSnapshot.id, action: 'GAMETICK', state: newSnapshot.state, lastProcessedInput: lastProcessedInput };
              let buffer = encode(msg);
              ws.send(buffer);

            }
            else {
              const ws = this.connectedPlayers[playerId];
              ws.send(JSON.stringify({ id: newSnapshot.id, action: 'GAMETICK', state: newSnapshot.state, lastProcessedInput: lastProcessedInput }));
            }


          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  }

  async fetch(request) {
    await this.initialize();  // Ensure initialization is complete before handling the request

    const url = new URL(request.url);
    switch (url.pathname) {
      case '/reset':
        await this.reset();
        return new Response('Game state reset', { status: 200 });
        break;
      case '/websocket':
        if (request.headers.get("Upgrade") != "websocket") {
          return new Response("Expected websocket", { status: 406 });
        }
        let pair = new WebSocketPair();
        try {
          this.handleSession(pair[1]);
        } catch (err) {
          console.log('this.handleSession(pair[1])', err);
          throw err;
        }
        return new Response(null, { status: 101, webSocket: pair[0] });
      case '/gameTick':
        // used only for dev testing
        this.gameLogic.gameTick();
        Object.keys(this.connectedPlayers).forEach(playerId => {
          const playerSnapshot = this.gameLogic.getPlayerSnapshot(playerId);
          if (playerSnapshot) {
            const ws = this.connectedPlayers[playerId];
            ws.send(JSON.stringify({ action: 'GAMETICK', state: playerSnapshot.state }));
          }
        });
        return new Response('Game ticked', { status: 200 });
      case '/createEntity':
        const { entityId, type, x, y } = await request.json();
        this.gameLogic.createEntity(entityId, type, x, y);
        return new Response('Entity created', { status: 200 });
      case '/moveEntity':
        const { entityId: entityIdMove, dx, dy } = await request.json();
        this.gameLogic.update(entityIdMove, dx, dy);
        return new Response('Entity moved', { status: 200 });
      case '/getEntity':
        const entityIdGet = url.searchParams.get('entityId');
        const entity = this.gameLogic.getEntity(entityIdGet);
        return new Response(JSON.stringify(entity), {
          headers: { 'Content-Type': 'application/json' },
        });
      case '/getEntities':
        const entities = this.gameLogic.getEntities();
        return new Response(JSON.stringify(entities), {
          headers: { 'Content-Type': 'application/json' },
        });
      case '/getSnapshot':
        const index = +url.searchParams.get('index');
        const snapshot = this.gameLogic.getSnapshot(index);
        return new Response(JSON.stringify(snapshot), {
          headers: { 'Content-Type': 'application/json' },
        });
      default:
        return new Response('Not found', { status: 404 });
    }
  }
}
