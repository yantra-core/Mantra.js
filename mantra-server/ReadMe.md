# `@yantra-core/server`

### Mantra Server

see: `./server.js` file
Additional Documentation can be found here: https://github.com/yantra-core/mantra

```js
// Import Mantra
import { Game } from '@yantra-core/mantra'

// Initializing the Game
const game = new Game({});

// Use Plugins to customize the Game
game
  .use(new MatterPhysics())
  .use(new CollisionPlugin())
  .use(new EntityFactory())
  .use(new EntityInputPlugin())
  .use(new EntityMovementPlugin(new AsteroidsMovement()))
  .use(new BulletPlugin())
  .use(new WebSocketServer());

game.listen(8888);
console.log('WebSocket server started on port 8888');
```
  
  