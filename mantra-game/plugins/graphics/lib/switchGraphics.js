export default function switchGraphics(graphicsInterfaceName, cb) {
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
    this.game.use(graphicsInterfaceName, { camera: this.game.data.camera });
    // Add event listeners for plugin ready events
    this.game.once(`plugin::ready::${graphicsInterfaceId}`, () => {
      // iterate through all existing graphics ( except this one ) and remove them
      this.game.graphics.forEach(function (graphics) {
        if (graphics.id !== graphicsInterfaceId) {
          game.systemsManager.removeSystem(graphics.id);
        }
      });

      // redraw all graphics, not needed?
      // this was removed 2/6/2024 because the graphics pipeline should already understand to redraw
      // the ent graphics since entity.graphics will not have the required graphics object
      /*
      for (let [eId, state] of this.game.entities.entries()) {
        let ent = this.game.entities.get(eId);
        // console.log('rendering', ent)
        game.graphics.forEach(function (graphicsInterface) {
          if (graphicsInterface.inflateEntity) {
            // legacy api, remove soon
            graphicsInterface.inflateEntity(ent);
          } else {
            graphicsInterface.inflateGraphic(ent);
          }
        });
        // this.game.changedEntities.delete(eId);
      }
      */

      // Remark: cursor was immediately defaulting instead of wait, so moved it into BabylonGraphics.js itself
      // document.body.style.cursor = 'default';
      cb(null);
    });
  } else {
    document.body.style.cursor = 'default';
    cb(null);
  }

}
