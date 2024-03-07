import LoadingScreen from "../plugins/loading-screen/LoadingScreen.js";
import GhostTyper from "../plugins/typer-ghost/GhostTyper.js";
import Physics from "../plugins/physics/Physics.js";
import FlashMessage from "../plugins/message-flash/FlashMessage.js";
// default player movement, this could be also be set in defaultGameStart.js
// import movement from './defaultPlayerMovement.js';


export default function loadPluginsFromConfig({ physics, graphics, collisions, keyboard, mouse, gamepad, virtualGamepad, editor, sutra, ghostTyper, lifetime, markup, defaultMovement = true }) {

  let plugins = this.plugins;
  let gameConfig = this.config

  //
  // Iterate through `GameConfig.plugins` array and load plugins
  // Three separate formats are supported to load plugins:
  //   1. string name of plugin (e.g. 'Bullet')
  //   2. instance of plugin (e.g. new Bullet())
  //   3. object with `name` and `config` properties (e.g. { name: 'Bullet', config: { cool: true } })
  if (plugins.length) {
    console.log('The following plugins will be loaded from `GameConfig`', plugins)
    plugins.forEach(pluginy => {
      if (typeof pluginy === 'string') {
        // console.log('using plugin as string name', pluginy)
        this.use(pluginy);
        return;
      }

      if (typeof pluginy === 'object' && pluginy.id && typeof pluginy.init === 'function') {
        //console.log('found compatible plugin class instance as object', pluginy)
        this.use(pluginy);
        return;
      }

      if (typeof pluginy === 'object' && pluginy.name && typeof pluginy.config === 'object') {
        // console.log('found plugin as config object', pluginy)
        this.use(pluginy.name, pluginy.object);
        return;
      }

    });
  }

  if (gameConfig.showLoadingScreen && !this.isServer) {
    if (!this.systems['loading-screen']) {
      this.use(new LoadingScreen({
        minLoadTime: gameConfig.minLoadTime
      }));
    }
  }

  if (!this.systems['message-flash'] && !this.isServer) {
    this.use(new FlashMessage());
    // check if gameroot does not contain yantra.gg string,
    // if so game.flashText() the value
    if (!this.isServer && this.config.warnNonYantraGameRoot) {
      if (this.gameRoot && this.gameRoot.indexOf('yantra.gg') === -1) {
        this.flashMessage('GameRoot is not yantra.gg, this may cause issues with loading assets and scripts');
      }
    }
  }

  this.use('Entity');

  if (physics === 'matter') {
    this.use('MatterPhysics');
  }

  if (physics === 'physx') {
    this.use('PhysXPhysics');
  }

  // Remark: Removed 2/13/2024, no longer loading movement by default
  // this.use('EntityInput');
  // this.use('EntityMovement');

  this.use('SnapshotManager');

  if (lifetime) {
    this.use('Lifetime');
  }

  if (!this.isServer) {

    let clientConfig = {
      protobuf: gameConfig.protobuf,
      deltaCompression: gameConfig.deltaCompression,
      msgpack: gameConfig.msgpack
    };
    this.use('Client', clientConfig);

    if (editor) {
      this.use('Editor');
    }

    if (keyboard) {
      this.use('Keyboard');
    }

    if (mouse) {
      this.use('Mouse');
    }

    if (gamepad) {
      this.use('Gamepad');
    }

    if (virtualGamepad) {
      this.use('GamepadGUI', gamepad);
    }

    if (markup) {
      this.use('Markup');
    }

    if (sutra) {
      this.use('Sutra', {
        defaultMovement: defaultMovement // TODO: remove, no mutation from using plugins!
      });
    }

    if (defaultMovement) {
      if (this.systems.sutra) {
        this.systems.sutra.bindDefaultMovementSutra(mode);
      }
    }

    this.use('GhostTyper');

    // Physics is imported directly in Main mantra package ( for now )
    this.use(new Physics());

    // TODO: move to Graphics.loadFromConfig() ?
    if (graphics) {

      this.use('Graphics');

      // check to see if user has specified a graphics engine in local storage
      let storedGraphics = this.storage.get('graphics');
      if (storedGraphics) {
        //this.use(storedGraphics, { camera: this.config.camera });
        //return;
      }

      if (typeof graphics === 'string') {
        graphics = [graphics];
      }
      if (graphics.includes('ascii')) {
        this.use('ASCIIGraphics', { camera: this.config.camera });
      }
      if (graphics.includes('babylon')) {
        this.use('BabylonGraphics', { camera: this.config.camera });
      }
      if (graphics.includes('css')) {
        this.use('CSSGraphics', { camera: this.config.camera });
      }
      if (graphics.includes('css3D')) {
        this.use('CSS3DGraphics', { camera: this.config.camera });
      }
      if (graphics.includes('phaser')) {
        this.use('PhaserGraphics', { camera: this.config.camera });
      }
      if (graphics.includes('three')) {
        this.use('ThreeGraphics', { camera: this.config.camera });
      }
    }
  }

}