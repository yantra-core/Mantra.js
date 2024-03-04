export default function switchGraphics(graphicsInterfaceName, cb) {
  cb = cb || function noop() { };
  console.log('switchGraphics ' + graphicsInterfaceName)
  let game = this.game;

  let previousCameras = {};

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

  // clone the camera object
  previousCameras[graphicsInterfaceId] = {
    currentZoom: game.data.camera.currentZoom,
    adaptiveZoom: game.data.camera.adaptiveZoom
  }

  // Check if the selected graphics mode is already registered
  if (typeof this.game.systems[graphicsInterfaceId] === 'undefined') {
    this.game.use(graphicsInterfaceName, { camera: this.game.data.camera }, () => {
      this.game.graphics.forEach(function (graphics) {
        if (graphics.id !== graphicsInterfaceId) {
          game.systemsManager.removeSystem(graphics.id);
        }
      });
      document.body.style.cursor = 'default';
    });
  } else {
    // invalid graphics interface, do nothing
    console.warn('Invalid graphics interface: ' + graphicsInterfaceName);
    document.body.style.cursor = 'default';
  }

  // check to see if there was a previous camera object
  if (previousCameras[graphicsInterfaceId]) {
    // restore the previous zoom
    game.data.camera.adaptiveZoom = previousCameras[graphicsInterfaceId].adaptiveZoom;
  } else {
    if (graphicsInterfaceId === 'three' || graphicsInterfaceName === 'ThreeGraphics') {
      // game.setZoom(3.5);
    }

  }

}