export default function loadPluginsFromConfig({ physics, graphics, collisions, keyboard, mouse, gamepad, lifetime }) {
  let plugins = this.plugins;
  let gameConfig = this.config

  this.use('Entity');

  if (physics === 'matter') {
    this.use('MatterPhysics');
    //this.use(new plugins.MatterPhysics());
  }

  if (physics === 'physx') {
    // this.use(new plugins.PhysXPhysics());
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
      //      this.use(new plugins.Keyboard(keyboard));
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

      // this.use(new plugins.Graphics()); // camera configs
      this.use('Graphics');

      if (graphics.includes('babylon')) {
        // this.use(new plugins.BabylonGraphics({camera: this.config.camera }));
        this.use('BabylonGraphics', { camera: this.config.camera });
      }
      if (graphics.includes('css')) {
        this.use(new plugins.CSSGraphics({ camera: this.config.camera }));
      }
      if (graphics.includes('phaser')) {
        // this.use(new plugins.PhaserGraphics({ camera: this.config.camera }));
        this.use('PhaserGraphics', { camera: this.config.camera });

      }
      if (graphics.includes('three')) {
        this.use(new plugins.ThreeGraphics({ camera: this.config.camera }));
      }
    }
  }
}