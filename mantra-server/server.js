import { Game } from '@yantra-core/mantra';
import Bullet from '@yantra-core/mantra/plugins/bullet/Bullet.js';
import PongMovement from '@yantra-core/mantra/plugins/entity-movement/strategies/PongMovement.js';
import AsteroidsMovement from '@yantra-core/mantra/plugins/entity-movement/strategies/AsteroidsMovement.js';
import FroggerMovement from '@yantra-core/mantra/plugins/entity-movement/strategies/FroggerMovement.js';
import PacManMovement from '@yantra-core/mantra/plugins/entity-movement/strategies/PacManMovement.js';
import WebSocketServer from '@yantra-core/mantra/plugins/server-websocket/WebSocketServer.js';
import Border from '@yantra-core/mantra/plugins/border/Border.js';

// Initializing the Game
const game = new Game({
  isClient : false,
  isServer: true
});

// Use Plugins to add Systems to the Game
game
//  .use(new Lifetime())
  .use(new Bullet())
  .use(new Border())
  .use(new WebSocketServer({}));

game.listen(8888);
console.log('WebSocket server started on port 8888');