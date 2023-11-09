import { Game, plugins } from '../../mantra-game/Game.js';
import deltaEncoding from '@yantra-core/mantra/plugins/snapshots/SnapShotManager/deltaEncoding.js';

// let lastMessageTime = 0;

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
    this.state = { entities: {}, snapshots: [] };
    this.env = env;
    this.connectedPlayers = {}; // Store connected players with their websockets
    this.tickBuffer = [];
    // Add a new property to track the time of the last processed tick
    this.lastProcessedTickTime = 0;
    // Initializing the systems
    this.gameLogic = new Game({
      isServer: true,
      loadDefaultPlugins: false
    });

    // Use Plugins to add systems to the game
    this.gameLogic
      .use(new plugins.MatterPhysics())
      .use(new plugins.Collision())
      .use(new plugins.EntityFactory())
      .use(new plugins.EntityInput())
      .use(new plugins.EntityMovement())
      //.use(new plugins.Lifetime())
      .use(new plugins.Bullet())


  }

  async initialize() {
    if (!this.initializePromise) {
      this.initializePromise = Promise.resolve();  // You can add any async initialization here.
    }
    await this.initializePromise;
  }

  async handleSession(websocket) {
    websocket.accept();

    // Generate a unique player ID for this connection
    // remark: replace with global entity counter that is INT
    const playerEntityId = 'player_' + Math.random().toString(36).substr(2, 9);
    console.log('handleSession', playerEntityId)
    // Store the connected player with its WebSocket
    this.connectedPlayers[playerEntityId] = websocket;

    // Create the player entity in the game logic
    try {
      // Create a new player with a unique ID
      this.gameLogic.createEntity({
        id: playerEntityId,
        type: 'PLAYER',
      });
      // this.gameLogic.systems.playerCreation.createPlayer(playerEntityId);
    } catch (err) {
      console.log("ERROR", err)
    }

    try {
      websocket.send(JSON.stringify({
        action: 'assign_id',
        playerId: playerEntityId
      }));
    } catch (err) {
      console.log(err)

    }

    // Check if a new ticker needs to be elected
    if (!this.tickerId) {
      this.electNewTicker(playerEntityId);
    }

    // Handle WebSocket close event
    websocket.addEventListener('close', event => {
      console.log('WebSocket is closed:', event);

      // Remove the player from the connected players list and from the game state
      delete this.connectedPlayers[playerEntityId];
      this.gameLogic.removeEntity(playerEntityId);  // You need to implement this method in Game.js


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
          //let now = Date.now();
          //let diff = now - lastMessageTime;
          //lastMessageTime = now;
          // console.log('gameTick', diff, 'ms since last message');

          this.bufferGameTick(message, playerEntityId);

          if (this.tickerId !== playerEntityId) {
            console.log('will not accept gameTick from', playerEntityId, 'because', this.tickerId, 'is the current ticker');
            return;
          }
          break;

        case 'player_input':
          this.gameLogic.systems.entityInput.handleInputs(playerEntityId, { controls: message.controls });
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

    // Check if the tick is too early
    if (tickTime > now) {
      // Add to the buffer
      this.tickBuffer.push({ tickTime, playerId });
      // Sort the buffer by tick time
      this.tickBuffer.sort((a, b) => a.tickTime - b.tickTime);
    } else {
      // Process immediately if it's time to do so
      this.processGameTick();
    }
  }

  // Call this method to process the buffered game ticks
  processGameTicks() {
    const now = Date.now();

    // Process ticks that are due
    while (this.tickBuffer.length > 0 && this.tickBuffer[0].tickTime <= now) {
      const tickInfo = this.tickBuffer.shift();
      this.lastProcessedTickTime = tickInfo.tickTime; // Update the last processed tick time
      this.processGameTick(tickInfo.playerId);
    }

    // Send updates after processing game ticks
    this.sendUpdatesToAllClients();
  }
  processGameTick(playerId) {
    // Process the game tick for the player
    this.gameLogic.gameTick();
    // Send updates to all clients, etc.


    this.gameLogic.gameTick();
    Object.keys(this.connectedPlayers).forEach(playerId => {
      const playerSnapshot = this.gameLogic.getPlayerSnapshot(playerId);
      const lastProcessedInput = this.gameLogic.lastProcessedInput[playerId];  // Get the lastProcessedInput for this client's player entity

      // Include the lastProcessedInput in the message

      if (playerSnapshot) {
        try {
          let deltaEncoded = deltaEncoding.encode(playerId, playerSnapshot);
          if (deltaEncoded) {
            const ws = this.connectedPlayers[playerId];
            // console.log(JSON.stringify(playerSnapshot, true, 2))
            ws.send(JSON.stringify({ action: 'gametick', snapshot: deltaEncoded, lastProcessedInput: lastProcessedInput }));
          }

        } catch (err) {
          console.log(err)
        }
      }
    });
    this.gameLogic.removedEntities.clear(); // TODO: move this to Game.js

  }

  // Call this method regularly to process the buffered ticks
  async processBufferedTicks() {
    await this.initialize();
    this.processGameTicks();
  }

  async fetch(request) {
    await this.initialize();  // Ensure initialization is complete before handling the request

    const url = new URL(request.url);
    switch (url.pathname) {
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
            ws.send(JSON.stringify({ action: 'gametick', snapshot: playerSnapshot }));
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
