import { Game, plugins } from '../mantra-game/Game.js';

// Server
import WebsocketServer from '../mantra-game/plugins/server/WebsocketServer.js';

// Initializing the Game
const game = new Game({
  isServer: true
});

game.use(new plugins.Bullet());

game.use(new WebsocketServer());

game.listen(8888);
console.log('WebSocket server started on port 8888');