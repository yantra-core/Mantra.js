export default async function switchGraphics(graphicsInterfaceName, cb) {
  cb = cb || function noop() { };

  let game = this.game;

  let engines = {
    'BabylonGraphics': 'graphics-babylon',
    // 'PhaserGraphics': 'graphics-phaser',
    'CSSGraphics': 'graphics-css',
    'ThreeGraphics': 'graphics-three',
  };

  let mappings = {
    'babylon': 'BabylonGraphics',
    'css': 'CSSGraphics',
    'three': 'ThreeGraphics'
  };

  graphicsInterfaceName = mappings[graphicsInterfaceName] || graphicsInterfaceName;

  let graphicsInterfaceId = engines[graphicsInterfaceName];
  document.body.style.cursor = 'wait';
  // Check if the selected graphics mode is already registered
  if (typeof this.game.systems[graphicsInterfaceId] === 'undefined') {
    await this.game.use(graphicsInterfaceName, { camera: this.game.data.camera });
    this.game.graphics.forEach(function (graphics) {
      if (graphics.id !== graphicsInterfaceId) {
        game.systemsManager.removeSystem(graphics.id);
      }
    });
    document.body.style.cursor = 'default';
  } else {
    // invalid graphics interface, do nothing
    console.warn('Invalid graphics interface: ' + graphicsInterfaceName);
    document.body.style.cursor = 'default';
  }

}