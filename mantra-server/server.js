import express from 'express';
import path from 'path';
import { Game } from '../mantra-game/Game.js';
import plugins from '../mantra-game/plugins.js';
// TODO: mantra dependency
//import WebsocketServer from '@yantra-core/server-websocket';
import WebsocketServer from '../mantra-game/plugins/server/WebsocketServer.js';
import DefaultTwoDimensionalInputStrategy from '../mantra-game/plugins/entity-input/strategies/2D/Default2DInputStrategy.js';
import Home from '../mantra-worlds/Home/Home.js';

import { fileURLToPath, pathToFileURL } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app and serve static HTML content
const app = express();

const staticContentPath = path.join(__dirname, '/../mantra-client/public'); // Define the path to your static content
console.log('server staticContentPath', staticContentPath)
app.use(express.static(staticContentPath));

// Initializing the Game
const game = new Game({
  isServer: true
});


game.use(new plugins.MatterPhysics());
game.use(new plugins.SnapshotManager());
game.use(new plugins.Entity());
game.use(new plugins.EntityInput());
game.use(new plugins.EntityMovement());
game.use(new plugins.Keyboard({}));
game.use(new plugins.Gamepad({}));

game.use(new DefaultTwoDimensionalInputStrategy());
game.use(new plugins.Sutra({}));


game.use(new plugins.Schema());
game.use(new plugins.Bullet());
game.use(new plugins.Block());

// game.use(new Home());

//game.use(new plugins.Border({ autoBorder: true }));
game.use(new WebsocketServer({
  protobuf: false,
  msgpack: false,
  deltaCompression: true,
  deltaEncoding: true,
  expressApp: app, // Pass the Express app instance
  staticContentPath: staticContentPath // Path to serve static HTML
}));

game.use(new plugins.Border({ autoBorder: false }));

game.on('listening', function (port) {

  game.systems.border.createBorder({
    height: 4000,
    width: 4000,
  });

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

})

const port = process.env.PRODUCTION_PORT || 8888;

game.listen(port);

console.log(`WebSocket server started on port ${port}`);