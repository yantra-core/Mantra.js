// Client.js - Marak Squires 2023
// Mantra Client, connects to either local instance or remote websocket server
import LocalClient from "./LocalClient.js";
import WebSocketClient from "./WebSocketClient.js";
import Preloader from "./lib/Preloader.js";
import defaultAssets from './defaultAssets.js';

export default class Client {
  static id = 'client';
  static removable = false;

  constructor({ protobuf = false, msgpack = false, deltaEncoding = true, deltaCompression = false } = {}) {
    this.id = Client.id;
    // for convenience, separate fro game.config scope
    this.config = {
      protobuf,
      msgpack,
      deltaEncoding,
      deltaCompression
    };

    this.started = false;
    this.preloading = false;

  }

  init(game) {
    this.game = game;

    // Load all known client plugins
    // For now, this is just localClient and websocketClient
    // Remark: We load both of them to allow for switching of local / remote modes
    // We could change this to only load WebSocketClient if .connect() is called
    game.use(new LocalClient());
    game.use(new WebSocketClient({
      protobuf: this.config.protobuf,
      msgpack: this.config.msgpack,
      deltaCompression: this.config.deltaCompression,
      deltaEncoding: this.config.deltaEncoding
    }));

    if (!game.isServer) {
      const preloader = new Preloader(game);
      // hoist preloader to game scope
      game.preloader = preloader;

      // for all game.queuedAssets Set, add to preloader
      for (let key in game.queuedAssets) {
        let path = game.queuedAssets[key];
        preloader.addAsset(path, 'image', key);
      }
      game.queuedAssets = {}; // for now

      //game.on('progress', progress => console.log(`Loading progress: ${progress * 100}%`));
      //game.on('assetsLoaded', () => console.log('All assets loaded!'));

      // load default assets
      for (let key in defaultAssets) { // TODO: configurable assets

        let asset = defaultAssets[key];
        if (typeof asset === 'string') {
          preloader.addAsset(asset, 'image', key);
          continue;
        }

        if (asset.type === 'spritesheet') {
          preloader.addAsset(asset.url, 'spritesheet', key, asset);
          continue;
        }

        // preloader.addAsset(defaultAssets[key], 'image', key);
      }

      this.preloading = true;
      // todo: create two preloadsers
      // 1 for required assets to start game
      // 2 for lazy loaded assets

      let that = this;
      // load main mantra.CSS ( required for game to start ) ( for now )
      // Remark: Actual CSS required for Mantra.js proper should be almost none
      // All CSS from current Mantra.css should be split into separate CSS files per Plugin
      // and loaded async in the plugin.init() methods
      console.log('Loading Mantra.css file...')
      game.loadCSS('/mantra.css', function(err, d){
        console.log("mantra.css loaded!");
        preloader.loadAll().then(() => {
          console.log("All assets loaded", preloader)
          that.preloading = false;
          /* for dev testing
          setTimeout(function(){
            that.preloading = false;
          }, 5000)
          */
          // console.log(preloader.getItem('player'))
        });
      });
    } else {
      this.preloading = false;
    }


    game.systemsManager.addSystem('client', this);
  }

  start(callback) {
    if (this.preloading) {
      // console.log('Client.js waiting for preloading to finish')
      setTimeout(() => {
        this.start(callback);
      }, 4);
      return;
    }
    let localClient = this.game.getSystem('localClient');
    localClient.start(callback);
    this.started = true;
  }

  stop() {
    console.log('Client.js plugin stopping game', this.game)
    this.started = false;
    let localClient = this.game.getSystem('localClient');
    localClient.stop();
  }

  // remote methods here to allow for switching between local / remote modes
  connect(url) {
    let websocketClient = this.game.getSystem('websocketClient');
    websocketClient.connect(url);
  }

  disconnect() {
    let websocketClient = this.game.getSystem('websocketClient');
    websocketClient.disconnect();
  }

  sendMessage(action, data) {
    let localClient = this.game.getSystem('localClient');
    localClient.sendMessage(action, data);
  }
}