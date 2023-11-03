# `@yantra-core/mantra`

## Introduction

Welcome to `@yantra-core/mantra` –  a versatile framework revolutionizing game development.

Everything in Mantra is a [Plugin](#plugins), including the Physics and Graphics pipelines.

Mantra currently supports Babylon.js, Phaser.js, and Matter.js. 3D Physics via wasm is [coming soon](#features)!

Mantra is designed for high-performance serverless physics and multiplayer environments while still making it easy to start up and quickly develop a local offline game.

### Core Features
- [X] **Entities, Components, Systems**: Enterprise-grade ECS for game development
- [X] **Modular Plugin System**: Facilitating easier extension and customization.
- [X] **Edge Computing Compatible**: Games can run in CloudFlare Workers environments.
- [X] **Offline Gameplay Support**: Fully functional gameplay in offline mode.

### Alpha Software Notice
As alpha software, `@yantra-core/mantra` is currently under active development. [Features](#Features) are being added and refined. Users should anticipate changes and potential instabilities. Your feedback and contributions at this stage are invaluable and will shape the future of this framework.

Come join the [AYYO Discord](https://discord.gg/bbyjf6MXC2) if you have any questions!

# Core Packages

  - `@yantra-core/mantra` - Core API + Plugins
  - `@yantra-core/server` - Self-hosted Websocket Server
  - `@yantra-core/edge`   - Run your authoritative server on Cloudflare Edge Workers
  - `@yantra-core/client` - Browser-based Mantra Client with offline support

## Creating your first Mantra Game

**Client**
```js
let game = new Game();

// Use Plugins to add systems to the game
game
  .use(new MatterPhysics())
  .use(new Collision())
  .use(new EntityFactory())
  .use(new EntityInput())
  .use(new EntityMovement(new AsteroidsMovement()))
  .use(new Bullet())

// Since this is the Client, we can add Keyboard and Graphics 
game
  .use(new Graphics())
  .use(new BabylonGraphics())
  .use(new Camera())
  .use(new StarField())
  .use(new KeyboardBrowser());

game.connect('ws://localhost:8888');
```

**Server**
```js
let game = new Game({ isServer: true });

// Use Plugins to add systems to the game
game
  .use(new MatterPhysics())
  .use(new Collision())
  .use(new EntityFactory())
  .use(new EntityInput())
  .use(new EntityMovement(new AsteroidsMovement()))
  .use(new Lifetime())
  .use(new Bullet())
  .use(new WebSocketServer());

game.listen(8888);
```
  
  
## Game API
### Entity API

```js
game.getEntity(entityId);
game.createEntity(entityData)
game.updateEntity(entityData)
game.destroyEntity(entityId)
```

### Component API

```js
game.getComponent(entityId, componentType)
game.addComponent(entityId, componentType, data)
```

### System API

```js
game.getSystem(systemName)
game.addSystem(systemName, system)
game.removeSystem(systemName)
```

### Collision API

```js
game.on('collisionStart', (event) => {})
game.on('collisionActive', (event) => {})
game.on('collisionEnd', (event) => {})
```

### Snapshot API

```js
game.getPlayerSnapshot(playerId)
game.getSnapshot(snapshotId)
```

### Plugins API

```js
game.use(pluginInstance)
```

<a name="plugins"></a>

| Plugin Name | Source |
| --- | --- |
| └ border | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/border) |
| └ browser-keyboard | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/browser-keyboard) |
| └ browser-mouse | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/browser-mouse) |
| └ bullet | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/bullet) |
| └ chat | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/chat) |
| └ client-local | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/client-local) |
| └ client-websocket | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/client-websocket) |
| └ collisions | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/collisions) |
| └ entity-factory | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/entity-factory) |
| └ entity-input | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/entity-input) |
| └ entity-movement | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/entity-movement) |
|         └ strategies | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/entity-movement/strategies) |
| └ graphics | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/graphics) |
|         └ camera | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/graphics/camera) |
| └ graphics-babylon | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/graphics-babylon) |
|         └ camera | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/graphics-babylon/camera) |
|                 └ controls-mouse | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/graphics-babylon/camera/controls-mouse) |
|         └ starfield | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/graphics-babylon/starfield) |
| └ graphics-css | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/graphics-css) |
| └ graphics-phaser | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/graphics-phaser) |
| └ lifetime | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/lifetime) |
| └ logger | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/logger) |
| └ physics-matter | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/physics-matter) |
| └ server-websocket | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/server-websocket) |
| └ snapshots | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/snapshots) |
|         └ SnapShotManager | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/snapshots/SnapShotManager) |
| └ world | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/world) |
|         └ pong | [📂](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/world/pong) |


<a name="features"></a>
## Mantra Feature Checklist

The following checklist outlines the planned features and their current status:

### Core Features
- [x] **Entity Management**: Creation, modification, and deletion of entities.
- [x] **Component System**: Flexible definition and management of entity properties.
- [x] **System-based Logic**: Framework for implementing custom game logic.
- [x] **Universal Plugin System** ( everything is a Plugin, all Systems are Plugins )
- [x] **Offline Support**
- [x] **Online Multiplayer Support**
- [x] **Edge Support**

### Multiplayer Netcode Support
- [x] **Snapshot Management**: For state synchronization and time-travel features.
- [X] **Predictive Client-Side Logic**: To minimize lag in client actions (in progress).
- [ ] **Snapshot Interpolation**: For smooth rendering of state changes in multiplayer.
- [ ] **Server Reconciliation**: Correcting client-side predictions with server data.
- [ ] **Lag Compensation**: Techniques to handle network latency in gameplay.
- [ ] **Time Travel**: Rewind entities to previous states
- [ ] **Enhanced Network Security**: Measures to secure game state and data transfer.

### Plugin System
- [X] **Everything is a Plugin**
- [ ] **All Plugin methods are event emitters**
- [ ] **All Plugin events have hooks**

## Mod Support

- [X] **Creator JSON API**: Manage game state remotely via JSON messages
- [ ] **Enhanced Event Hooks**: Wildcard splats, regex search, before/after/first/last
- [ ] **Custom Resource Packs**: Manage game pack resources via API

## Multicore Performance Optimizations

- [ ] **Spatially Based Zones**: Entities can Enter / Exit Game processes per zone
- [ ] **Infinite map size**: Never ending maps with infinite* coordinate space
- [ ] **Worker processes**: Run systems in separate processes
    - [ ] **Game Logic**
    - [ ] **Physics**
    - [ ] **Data Encoding**

### Graphics and Physics
- [x] **Pluggable Graphics**: Plug in any rendering engine.
  - [x] **HTML**: Simple HTML Game State debugger
  - [x] **Babylon.js**: 3D browser client. Supported.
  - [X] **Phaser 3**: 2D browser client. Experimental Support. 
  - [ ] **YourFavoriteGraphicsEngine**: You tell us!

- [x] **Pluggable Physics**: Compatibility with various physics engines.
  - [x] **Matter.js**: 2D Physics engine.
  - [ ] **PhysicsX.wasm**: 3d Physics engine
  - [ ] **Rapier.wasm**: 3d Physics engine
  - [ ] **YourFavoritePhysicsEngine.wasm**: You tell us!

### Data Compression and Optimization

- [X] **Delta Compression**: Transmit only the changes between the current and previous game states
- [X] **Delta Encoding**: Encoding integer changes rather than complete states
- [ ] **Float Precision Encoding**: Customizable float precision to balance between accuracy and data size
- [ ] **Binary Bitstream Encoding**: Utilizes binary format for data encoding to reduce the size and improve the performance of data transmission.