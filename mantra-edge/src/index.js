import { Game } from '@yantra-core/mantra/Game.js';

import deltaEncoding from '@yantra-core/mantra/plugins/snapshots/SnapShotManager/deltaEncoding.js';


import EntityFactory from '@yantra-core/mantra/plugins/entity-factory/EntityFactory.js';
import EntityInput from '@yantra-core/mantra/plugins/entity-input/EntityInput.js';
import EntityMovement from '@yantra-core/mantra/plugins/entity-movement/EntityMovement.js';
import Lifetime from '@yantra-core/mantra/plugins/lifetime/Lifetime';
import BabylonRenderer from '@yantra-core/mantra/plugins/graphics-babylon/BabylonGraphics.js';
import MatterPhysics from '@yantra-core/mantra/plugins/physics-matter/MatterPhysics.js';

import Bullet from '@yantra-core/mantra/plugins/bullet/Bullet.js';
import Collision from '@yantra-core/mantra/plugins/collisions/Collisions.js';
import AsteroidsMovement from '@yantra-core/mantra/plugins/entity-movement/strategies/AsteroidsMovement.js';


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

    // let physicsMatter = new PhysicsMatter();


    // Initializing the systems
    this.gameLogic = new Game({});

    // Use Plugins to add systems to the game
    this.gameLogic
      .use(new MatterPhysics())
      .use(new Collision())
      .use(new EntityFactory())
      .use(new EntityInput())
      .use(new EntityMovement(new AsteroidsMovement()))
      .use(new Lifetime())
      .use(new Bullet())


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

    // Handle WebSocket close event
    websocket.addEventListener('close', event => {
      console.log('WebSocket is closed:', event);

      // Remove the player from the connected players list and from the game state
      delete this.connectedPlayers[playerEntityId];
      this.gameLogic.removeEntity(playerEntityId);  // You need to implement this method in Game.js
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

          break;

        case 'player_input':
          this.gameLogic.systems.entityInput.handleInputs(playerEntityId, message.controls);
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
        console.log('entities', entities)
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
