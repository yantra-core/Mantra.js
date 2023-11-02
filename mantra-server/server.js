import { nanoid } from 'nanoid';
import { Game } from '@yantra-core/mantra';

import EntityFactory from '@yantra-core/mantra/plugins/entity-factory/EntityFactory.js';
import EntityInput from '@yantra-core/mantra/plugins/entity-input/EntityInput.js';
import EntityMovement from '@yantra-core/mantra/plugins/entity-movement/EntityMovement.js';

import BabylonRenderer from '@yantra-core/mantra/plugins/graphics-babylon/BabylonGraphics.js';
import MatterPhysics from '@yantra-core/mantra/plugins/physics-matter/MatterPhysics.js';

import Bullet from '@yantra-core/mantra/plugins/bullet/Bullet.js';
import Collision from '@yantra-core/mantra/plugins/collisions/Collisions.js';
import PongMovement from '@yantra-core/mantra/plugins/entity-movement/strategies/PongMovement.js';
import AsteroidsMovement from '@yantra-core/mantra/plugins/entity-movement/strategies/AsteroidsMovement.js';
import FroggerMovement from '@yantra-core/mantra/plugins/entity-movement/strategies/FroggerMovement.js';
import PacManMovement from '@yantra-core/mantra/plugins/entity-movement/strategies/PacManMovement.js';
import WebSocketServer from '@yantra-core/mantra/plugins/server-websocket/WebSocketServer.js';
import Lifetime from '@yantra-core/mantra/plugins/lifetime/Lifetime.js';
import Border from '@yantra-core/mantra/plugins/border/Border.js';

// Initializing the Game
const game = new Game({
  isClient : false
});

// Use Plugins to add Systems to the Game
game
  .use(new MatterPhysics())
  .use(new Collision())
  .use(new EntityFactory())
  .use(new EntityInput())
  .use(new EntityMovement(new AsteroidsMovement()))
  .use(new Lifetime())
  .use(new Bullet())
  .use(new Border())
  .use(new WebSocketServer({}));

game.listen(8888);
console.log('WebSocket server started on port 8888');