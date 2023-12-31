import LoadingScreen from "../plugins/loading-screen/LoadingScreen.js";
import GhostTyper from "../plugins/typer-ghost/GhostTyper.js";

export default function loadPluginsFromConfig({ physics, graphics, collisions, keyboard, mouse, gamepad, sutra, ghostTyper, lifetime }) {
  let plugins = this.plugins;
  let gameConfig = this.config

  if (gameConfig.showLoadingScreen && !this.isServer) {
    this.use(new LoadingScreen({
      minLoadTime: gameConfig.minLoadTime
    }));
  }

  this.use('Entity');

  if (physics === 'matter') {
    this.use('MatterPhysics');
  }

  if (physics === 'physx') {
    this.use('PhysXPhysics');
  }

  this.use('EntityInput');
  this.use('EntityMovement');
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

    if (keyboard) {
      this.use('Keyboard');
    }

    if (mouse) {
      this.use('Mouse');
    }

    if (gamepad) {
      this.use('Gamepad');
      this.use('GamepadGUI');
    }

    if (sutra) {
      this.use('Sutra');
    }

    this.use('GhostTyper');

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

      if (graphics.includes('babylon')) {
        this.use('BabylonGraphics', { camera: this.config.camera });
      }
      if (graphics.includes('css')) {
        this.use('CSSGraphics', { camera: this.config.camera });
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