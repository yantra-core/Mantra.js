import { Game, plugins } from '../mantra-game/Game.js';

// Server
import WebsocketServer from '../mantra-game/plugins/server/WebsocketServer.js';

// Initializing the Game
const game = new Game({
  isServer: true
});
game.use(new plugins.Bullet());
game.use(new plugins.Block());

game.use(new plugins.Collision());

//game.use(new plugins.Border({ autoBorder: true }));


game.use(new WebsocketServer());

game.createEntity({
  type: 'BLOCK',
  shape: 'rectangle',
  width: 500,
  height: 500,
  position: {
    x: 500,
    y: -500
  },
});

game.createEntity({
  type: 'BLOCK',
  shape: 'rectangle',
  width: 500,
  height: 500,
  position: {
    x: -500,
    y: -500
  },
});


game.use(new plugins.Border({ autoBorder: false }));

game.systems.border.createBorder({
  height: 4000,
  width: 4000,
});

game.listen(8888);
console.log('WebSocket server started on port 8888');