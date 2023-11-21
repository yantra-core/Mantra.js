import express from 'express';
import path from 'path';
import { Game, plugins } from '../mantra-game/Game.js';
import WebsocketServer from '../mantra-game/plugins/server/WebsocketServer.js';


import Pong from '../mantra-worlds/Pong/Pong.js';
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

game.use(new plugins.Schema());

game.use(new plugins.Bullet());
game.use(new plugins.Block());

//game.use(new plugins.Border({ autoBorder: true }));

game.use(new WebsocketServer({
  protobuf: true,
  msgpack: false,
  deltaCompression: true,
  deltaEncoding: true,
  expressApp: app, // Pass the Express app instance
  staticContentPath: staticContentPath // Path to serve static HTML
}));

game.use(new plugins.Border({ autoBorder: false }));
// game.use(new Pong());
/*
// custom player join logic
game.on('player::joined', function (playerData) {
  console.log('a player has joined the server', playerData);
  let player = game.createEntity({
    type: 'PLAYER}',
    shape: 'rectangle',
    width: 500,
    height: 500,
    position: {
      x: 0,
      y: 0
    },
  });

  // make sure to let the game know that the player has been created
  game.emit('player::created', player);

});
*/

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