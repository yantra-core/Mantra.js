import LoadingScreen from "../plugins/loading-screen/LoadingScreen.js";

export default function loadPluginsFromConfig({ physics, graphics, collisions, keyboard, mouse, gamepad, lifetime }) {
  let plugins = this.plugins;
  let gameConfig = this.config

  if (!this.isServer) {
    this.use(new LoadingScreen());
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
    }

    // TODO: move to Graphics.loadFromConfig() ?
    if (graphics) {
      if (typeof graphics === 'string') {
        graphics = [graphics];
      }

      this.use('Graphics');

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