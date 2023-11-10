export default function loadPluginsFromConfig({ physics, graphics, collisions, keyboard, mouse, gamepad, lifetime }) {
  let plugins = this.plugins;
  this.use(new plugins.EntityFactory())

  if (physics === 'matter') {
    this.use(new plugins.MatterPhysics());
  }

  if (physics === 'physx') {
    this.use(new plugins.PhysXPhysics());
  }

  if (collisions) {
    this.use(new plugins.Collision());
  }

  this.use(new plugins.EntityInput());
  this.use(new plugins.EntityMovement());

  if (lifetime) {
    this.use(new plugins.Lifetime());
  }

  if (!this.isServer) {

    if (keyboard) {
      this.use(new plugins.Keyboard(keyboard));
    }

    if (mouse) {
      this.use(new plugins.Mouse());
    }

    if (gamepad) {
      this.use(new plugins.Gamepad());
    }

    // TODO: move to Graphics.loadFromConfig() ?
    if (graphics) {
      if (typeof graphics === 'string') {
        graphics = [graphics];
      }

      // Ensure the gameHolder div exists
      // TODO: move to graphics.init()
      let gameHolder = document.getElementById('gameHolder');
      if (!gameHolder) {
        gameHolder = document.createElement('div');
        gameHolder.id = 'gameHolder';
        document.body.appendChild(gameHolder); // Append to the body or to a specific element as needed
      }

      this.use(new plugins.Graphics()); // camera configs
      if (graphics.includes('babylon')) {
        this.use(new plugins.BabylonGraphics({camera: this.config.camera }));
      }
      if (graphics.includes('css')) {
        this.use(new plugins.CSSGraphics({ camera: this.config.camera }));
      }
      if (graphics.includes('phaser')) {
        this.use(new plugins.PhaserGraphics({ camera: this.config.camera }));
      }
      if (graphics.includes('three')) {
        this.use(new plugins.ThreeGraphics({ camera: this.config.camera }));
      }
    }
  }
}