// Graphics.js
class Graphics {
  static id = 'graphics';
  static removable = false;

  constructor() {
    this.id = Graphics.id;
  }

  init(game) {
    this.game = game; // Store the reference to the game logic
    this.game.systemsManager.addSystem('graphics', this);
    this.game.createGraphic = this.createGraphic.bind(this);
    this.game.removeGraphic = this.removeGraphic.bind(this);
    this.game.updateGraphic = this.updateGraphic.bind(this);

    // Ensure the gameHolder div exists
    let gameHolder = document.getElementById('gameHolder');
    if (!gameHolder) {
      gameHolder = document.createElement('div');
      gameHolder.id = 'gameHolder';
      document.body.appendChild(gameHolder); // Append to the body or to a specific element as needed
    }

  }

  update() { }

  // Remark: Graphics.createGraphic() currently isn't used as each Graphics Interface is responsible for creating its own graphics
  //         By iterating through game.entities Map in the interfaces .render() method
  createGraphic(entityData) {
    let game = this.game;
    game.graphics.forEach(function (graphicsInterface) {
      // don't recreate same graphic if already exists on interface
      let ent = game.getEntity(entityData.id);
      // console.log(graphicsInterface.id, "CREATING FOR ENT", ent)
      if (ent && ent.graphics && ent.graphics[graphicsInterface.id]) {
        // console.log("WILL NOT CREATE ALREADY EXISTING GRAPHIC", entityData.id, graphicsInterface.id, ent.graphics[graphicsInterface.id])
        return;
      }
      let graphic = graphicsInterface.createGraphic(entityData);
      if (graphic) {
        // console.log("CREATING AND SETTING GRAPHIC", entityData.id, graphicsInterface.id, graphic)
        game.components.graphics.set([entityData.id, graphicsInterface.id], graphic);
      } else {
        // console.log("ERROR CREATING GRAPHIC", entityData.id, graphicsInterface.id, graphic)
      }
    });
  }

  switchGraphics(graphicsInterfaceName, cb) {
    cb = cb || function noop() { };

    let game = this.game;

    let engines = {
      'BabylonGraphics': 'graphics-babylon',
      'PhaserGraphics': 'graphics-phaser',
      'CSSGraphics': 'graphics-css'
    };

    let graphicsInterfaceId = engines[graphicsInterfaceName];

    document.body.style.cursor = 'wait';
    // Check if the selected graphics mode is already registered
    if (typeof this.game.systems[graphicsInterfaceId] === 'undefined') {
      this.game.use(graphicsInterfaceName, { camera: 'follow' });

      // Add event listeners for plugin ready events
      this.game.once(`plugin::ready::${graphicsInterfaceId}`, () => {

        // iterate through all existing graphics ( except this one ) and remove them
        this.game.graphics.forEach(function (graphics) {
          if (graphics.id !== graphicsInterfaceId) {
            game.systemsManager.removeSystem(graphics.id);
          }
        });

        document.body.style.cursor = 'default';
        cb(null);
      });
    } else {
      cb(null);
    }

  }

  removeGraphic(entityId) {
    let game = this.game;
    game.graphics.forEach(function (graphicsInterface) {
      graphicsInterface.removeGraphic(entityId);
    });
  }

  updateGraphic(entityData, alpha) {
    let game = this.game;
    game.graphics.forEach(function (graphicsInterface) {
      graphicsInterface.updateGraphic(entityData, alpha);
    });
  }

}

export default Graphics;


/*


function downloadCanvasAsImage(canvasElement, filename) {
    // Ensure a filename is provided
    filename = filename || 'canvas_image.png';

    // Create an image URL from the canvas
    const imageURL = canvasElement.toDataURL("image/png").replace("image/png", "image/octet-stream");

    // Create a temporary link element and trigger the download
    let downloadLink = document.createElement('a');
    downloadLink.href = imageURL;
    downloadLink.download = filename;

    // Append the link to the body, click it, and then remove it
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}


*/