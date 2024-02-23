<h4 align="center">

![mantra-logo-smol](https://github.com/yantra-core/Mantra.js/assets/70011/3a10c09f-3d19-458a-b0c2-a8910420aee1)

  <a href="https://yantra.gg/mantra">Live Demos</a> •
  <a href="https://yantra.gg/mantra/examples">Examples Gallery</a> •
  <a href="#alpha-notice">v1 Alpha</a> •
  <a href="#contributing">Contributing</a>
  
  ![Build Status](https://github.com/yantra-core/mantra/actions/workflows/nodejs.yml/badge.svg)
</h4>



## Introduction

Welcome to `@yantra-core/mantra` –  a versatile Javascript game development framework

Mantra lets you focus on game logic and design without worrying about the complexities of physics simulation and high-performance netcode. 

You can start building a simple offline game in seconds using your favorite libraries, take this same game code, and effortlessly run it later as a high-performance authoritative game server in a serverless environment. 

# Mantra itself is very small and very fast

The [Mantra.js](https://yantra.gg/mantra.js) file is currently under `111kb` and will most likely get smaller. It's best to think of Mantra as the orchestrator for your game. You can import Mantra once and immediately begin adding new functionality dynamically. 

Let us help guide you on your game development journey, and we promise you will be saying Mantra every day.

# Get Started Now

## Examples Gallery

[https://yantra.gg/mantra/examples](https://yantra.gg/mantra/examples)


## Try Mantra Worlds ( ALPHA )

The best way to learn about Mantra.js is to play. Visit the Home World and start playing in fractions of a second.

[https://yantra.gg/mantra](https://yantra.gg/mantra)

#### Home World

https://yantra.gg/mantra/home

#### YCraft World

https://yantra.gg/mantra/ycraft

#### Platform World

https://yantra.gg/mantra/platform


## Super Simple Offline First

Mantra is designed to start a full-featured local game instance in seconds using a simple:

```html
<script src="https://yantra.gg/mantra.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', (event) => {
    let game = new MANTRA.Game();
    game.start();
  });
</script>
```

Embedding `mantra.js` and running one-line `game.start()` will be enough to a full-featured game instance with Editor and default settings.

You can just as easily copy the `mantra.js` file to your local system. No need to think about complex physics or netcode.

## Custom Game Logic with Sutra

### Write whatever works for you

`mantra` games can be customized in several intuitive ways. At the lowest levels, you can customize your games using JavaScript or TypeScript code, generally writing new Systems Plugins and working with the Event Emitter API.


### Sutra Behavioral Trees

![sutra-logo-smol](https://github.com/yantra-core/Mantra.js/assets/70011/8f2ca7f9-a422-4252-93e4-a7a1098216f9)

Using the [Sutra.js](https://github.com/yantra-core/Sutra.js) library `mantra` game logic can be created using JSON files or a Fluent JavaScript API. `sutra` supports `i18n` compatible exports to a human readable defintions like this:

### Examples

[https://yantra.gg/mantra/examples/behaviors](https://yantra.gg/mantra/examples/behaviors)

## Start Local Websocket Server

```bash
git clone https://github.com/yantra-core/mantra
cd mantra
docker build . -t mantra && docker run -p 80:80 mantra
```

^^^ This will start webserver on port `80` with demo clients

### Core Features
- [✅] **Entities, Components, Systems**: Enterprise-grade ECS for game development
- [✅] **Modular Plugin System**: Facilitating easier extension and customization
- [✅] **Edge Computing Compatible**: Games can run in CloudFlare Workers environments
- [✅] **Offline Gameplay Support**: Fully functional gameplay in offline mode

# 3D, 2.5D, 2D

Want to build a 3D, 2.5D, or 2D JavaScript game? 

We've got you covered! In Mantra, it's a one-line change to swap the graphics or physics.
##  Web Assembly + WebGPU
### NVIDIA PhysX 5.3.0 + Babylon.js

Mantra's default 3D graphics are rendered using Babylon.js with WebGPU support.

Mantra's default 3D physics are powered by NVIDA PhysX compiled to WebAssembly via EMScripten.

### Matter.js + Phaser 3

For 2D, Mantra has built-in support for Phaser 3 and Matter.js. It's possible to mix and match configuration options and easily add new Graphics plugins. You can render Mantra games [entirely in CSS](https://codepen.io/Marak-Squires/pen/abXpEve). You can even render the same Game through [multiple graphics pipelines](https://codepen.io/Marak-Squires/pen/eYxgaGz) at once if you need to.

**How is this even possible?**

## In Mantra, Everything is a Plugin!

Everything in Mantra is a [Plugin](#plugins), including the Physics and Graphics pipelines. You can use any of the Plugins from our growing collection to quicky extend your game.

Develop something cool? Publish and share your plugins with the [community](https://discord.gg/bbyjf6MXC2)!

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
  protobuf: false,         // boolean, toggles protobuf compressions
  msgpack:  false,         // boolean, toogles msgpack compressions
  deltaCompression: false, // boolean
  deltaEncoding: true      // boolean
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

<a name="plugins"></a>
## Plugin Directory

See: [https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins)

<a name="features"></a>
## Mantra Feature Checklist

The following checklist outlines the planned features and their current status:

### Core Features
- [✅] **Entity Management**: Creation, modification, and deletion of entities.
- [✅] **Component System**: Flexible definition and management of entity properties.
- [✅] **System-based Logic**: Framework for implementing custom game logic.
- [✅] **Universal Plugin System** ( everything is a Plugin, all Systems are Plugins )
- [✅] **Offline Support**
- [✅] **Online Multiplayer Support**
- [✅] **Edge Support**

### Multiplayer Netcode Support
- [✅] **Snapshot Management**: For state synchronization and time-travel features.
- [✅] **Predictive Client-Side Logic**: To minimize lag in client actions (in progress).
- [❌] **Snapshot Interpolation**: For smooth rendering of state changes in multiplayer.
- [❌] **Server Reconciliation**: Correcting client-side predictions with server data.
- [❌] **Lag Compensation**: Techniques to handle network latency in gameplay.
- [❌] **Time Travel**: Rewind entities to previous states
- [❌] **Enhanced Network Security**: Measures to secure game state and data transfer.

### Data Compression and Optimization

- [✅] **Delta Compression**: Transmit only the changes between the current and previous game states
- [✅] **Delta Encoding**: Encoding integer changes rather than complete states
- [✅] **Float Precision Encoding**: Customizable float precision to balance between accuracy and data size
- [✅] **Binary Bitstream Encoding**: Utilizes binary format for data encoding to reduce the size and improve the performance of data transmission.

### Plugin System
- [✅] **Everything is a Plugin**
- [✅] **Plugins can be loaded / unloaded in-game**
- [✅] **Plugins can be used as stand-alone apps**
- [❌] **Plugin code can be edited in-game**

## Mod Support

- [✅] **Creator JSON API**: Manage game state remotely via JSON messages
- [✅] **`xstate` Game Logic**: Manage game logic with [xstate](https://github.com/statelyai/xstate) machines

- [❌] **Enhanced Event Hooks**: Wildcard splats, regex search, before/after/first/last
- [❌] **Custom Resource Packs**: Manage game pack resources via API

## Multicore Performance Optimizations

- [❌] **Spatially Based Zones**: Entities can Enter / Exit Game processes per zone
- [❌] **Infinite map size**: Never ending maps with infinite* coordinate space
- [❌] **Worker processes**: Run systems in separate processes
    - [❌] **Game Logic**
    - [❌] **Physics**
    - [❌] **Data Encoding**

### Graphics and Physics
- [✅] **Pluggable Graphics**: Plug in any rendering engine.
  - [✅] **CSS**: Simple CSS browser client.
  - [✅] **Babylon.js**: 3D browser client.
  - [✅] **Phaser 3**: 2D browser client.
  - [✅] **THREE.js**: 2D browser client. Experimental Support. 
  - [❌] **YourFavoriteGraphicsEngine**: You tell us!

- [✅] **Pluggable Physics**: Compatibility with various physics engines.
  - [✅] **Matter.js**: 2D Physics
  - [✅] **PhysX.wasm**: 3D NVIDIA PhysX 5.30 Experimental Support. 
  - [❌] **Rapier.wasm**: 3d Physics
  - [❌] **YourFavoritePhysicsEngine.wasm**: You tell us!

<a name="alpha-notice"></a>
# Alpha Software Notice
As v1 alpha software, `@yantra-core/mantra` is currently under active development. [Features](#Features) are being added and refined. Users should anticipate changes and potential instabilities. Your feedback and contributions at this stage are invaluable and will shape the future of this framework.

Mantra follows an odd / even version release schedule for stable / unstable versions. v1 is considered unstabled. v2 will be considered stable.

<a name="contributing"></a>

## Read More

<a class="callToActionLink" href="https://yantra.gg/blog/build-games-with-mantra">Read More about Building Games with Mantra and Yantra</a>

<a href="https://yantra.gg/docs/">Additional Documentation</a>

## Contributing

If you have any issues using Mantra.js or wish to improve the Mantra.js please feel free to [Open An Issue](https://github.com/yantra-core/Mantra.js/issues) or [Open A Pull Request](https://github.com/yantra-core/Mantra.js/pulls)

Come join the [AYYO Discord](https://discord.gg/bbyjf6MXC2) if you have any questions!
