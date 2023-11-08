# `@yantra-core/mantra` -  [v1 Alpha](#alpha-notice)

![Build Status](https://github.com/yantra-core/mantra/actions/workflows/nodejs.yml/badge.svg)

## Introduction

Welcome to `@yantra-core/mantra` –  a versatile Javascript game development framework

Mantra lets you focus on game logic and design without worrying about the complexities of physics simulation and high-performance netcode. 

You can start building a simple offline game in seconds using your favorite libraries, take this same game code, and effortlessly run it later as a high-performance authoritative game server in a serverless environment. 

Let us help guide you on your game development journey, and we promise you will be saying Mantra every day.

Want to skip ahead? We have interactive CodePens available with default configurations here:


## Demos

[Open CodePen](https://codepen.io/Marak-Squires/pen/abXpVQM) - Matter.js + Babylon.js

[Open CodePen](https://codepen.io/Marak-Squires/pen/GRzrypr) - Matter.js + Phaser 3

[Open CodePen](https://codepen.io/Marak-Squires/pen/abXpEve) - Matter.js + CSS Graphics

[Open CodePen](https://codepen.io/Marak-Squires/pen/yLZgpeR) - NVIDIA PhysX 5.3.0 + Babylon.js ( Experimental )

[Open CodePen](https://codepen.io/Marak-Squires/pen/eYxgaGz) - RenderPlex - Babylon.js + Phaser 3


You can view any of these examples in your browser and begin modifying the game code immediately.

### Core Features
- ✅ **Entities, Components, Systems**: Enterprise-grade ECS for game development
- ✅ **Modular Plugin System**: Facilitating easier extension and customization
- ✅ **Edge Computing Compatible**: Games can run in CloudFlare Workers environments
- ✅ **Offline Gameplay Support**: Fully functional gameplay in offline mode

# 3D,  2D,  2.5D

Want to build a 3D, 2D or 2.5D JavaScript game? We've got you covered! In Mantra, it's a one-line change to swap the graphics or physics.
##  Web Assembly + WebGPU
### NVIDIA PhysX 5.3.0 + Babylon.js

Mantra's default 3D graphics are rendered using WebGPU and Babylon.js. Mantra's default 3D physics are powered by NVIDA PhysX compiled via EMScripten

### Matter.js + Phaser 3

For 2D, Mantra has built-in support for Phaser 3 and Matter.js. It's possible to mix and match configuration options and easily add new Graphics plugins. You can render Mantra games [entirely in CSS](https://codepen.io/Marak-Squires/pen/abXpEve). You can even render the same Game through [multiple graphics pipelines](https://codepen.io/Marak-Squires/pen/eYxgaGz) at once if you need to.

**How is this even possible?**

## In Mantra, Everything is a Plugin!

Everything in Mantra is a [Plugin](#plugins), including the Physics and Graphics pipelines. You can use any of our community Plugins from our growing collection to quicky extend your game. Develop something cool? Publish and share your plugins with the [community](https://discord.gg/bbyjf6MXC2)!

## Offline First

Mantra is designed to start a full-featured local game instance immediately without any heavy dependency tree. This offline-first approach lets you quickly build your game without thinking about netcode, allowing you to connect your game's logic to Mantra's high-performance networking code when needed.

## Serverless Physics

Mantra is architectured from the ground up to work within Serverless environments like [CloudFlare Workers](https://github.com/yantra-core/mantra/tree/master/mantra-edge) or [Hathora](https://hathora.dev). This unique architecture places Mantra at the forefront of Serverless Physics game engines.

Are you still learning about [Serverless Physics](https://yantra.gg)? No worries! Mantra can also run on any standard hosting environment.

# Core Packages

  - `@yantra-core/mantra` - Core API + Plugins
  - `@yantra-core/server` - Self-hosted Websocket Server
  - `@yantra-core/edge`   - Run your authoritative server on Cloudflare Edge Workers
  - `@yantra-core/client` - Browser-based Mantra Client with offline support

## API

### new Game(options)

Returns a new game instance. `options` defaults to:

```js
{
  physics: 'matter',       // enum, 'physx', 'matter'
  graphics: ['babylon'],   // array enum, 'babylon', 'phaser', 'css'
  camera: 'center',        // enum, 'follow', 'center'
  keyboard: true,          // boolean or `Keyboard` config object
  mouse: true,             // boolean or `Mouse` config object
  collisions: false,       // boolean, toggles global entity collisions
  lifetime: true,          // boolean, enables `lifetime` property
  width: 1600,             // number
  height: 900,             // number
}

```

### Start Local Game

```js
let game = new Game();
game.start(); // starts local game instance
```

### Connect to Remote Game

```js
let game = new Game();
game.connect('ws://localhost:8888'); // connects to a mantra-server instance at port 8888
```

### Server
```js
let game = new Game({ isServer: true });
game.listen(8888); // starts a listening WebSocket server on port 8888
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
## Plugin Directory

See: [https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins)

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
- [X] **All Plugin methods are event emitters**
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

<a name="alpha-notice"></a>
# Alpha Software Notice
As v1 alpha software, `@yantra-core/mantra` is currently under active development. [Features](#Features) are being added and refined. Users should anticipate changes and potential instabilities. Your feedback and contributions at this stage are invaluable and will shape the future of this framework.

Mantra follows an odd / even version release schedule for stable / unstable versions. v1 is considered unstabled. v2 will be considered stable.

Come join the [AYYO Discord](https://discord.gg/bbyjf6MXC2) if you have any questions!
