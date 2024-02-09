// Graphics.js - Marak Squires 2023
import updateSprite from "./lib/updateSprite.js";
import getTexture from "./lib/getTexture.js";
import LoadingCircle from "./lib/LoadingCircle.js";
import switchGraphics from "./lib/switchGraphics.js";
import pingPosition from "./lib/pingPosition.js";

class Graphics {
  static id = 'graphics';
  static removable = false;

  constructor() {
    this.id = Graphics.id;
    this.updateSprite = updateSprite.bind(this);
    this.getTexture = getTexture.bind(this);
    this.switchGraphics = switchGraphics.bind(this);
    this.LoadingCircle = LoadingCircle;
  }

  init(game) {
    this.game = game; // Store the reference to the game logic
    this.game.systemsManager.addSystem('graphics', this);
    this.game.createGraphic = this.createGraphic.bind(this);
    this.game.removeGraphic = this.removeGraphic.bind(this);
    this.game.updateGraphic = this.updateGraphic.bind(this);
    this.game.getTexture = this.getTexture.bind(this);
    this.game.updateSprite = this.updateSprite.bind(this);
    this.game.switchGraphics = this.switchGraphics.bind(this);
    this.game.setBackground = this.setBackground.bind(this);
    this.game.pingPosition = pingPosition.bind(this);

    this.game.data.camera = this.game.data.camera || {
      position: {
        x: 0,
        y: 0
      },
      currentZoom: 1,
      minZoom: 0.1,
      maxZoom: 10,
    };

    if (this.game.isClient) {
      // Ensure the gameHolder div exists
      let gameHolder = document.getElementById('gameHolder');
      if (!gameHolder) {
        gameHolder = document.createElement('div');
        gameHolder.id = 'gameHolder';
        document.body.appendChild(gameHolder); // Append to the body or to a specific element as needed
      }

      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera

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
      if (ent && ent.graphics && ent.graphics[graphicsInterface.id]) {
        return;
      }
      let graphic = graphicsInterface.createGraphic(entityData);
      if (graphic) {
        game.components.graphics.set([entityData.id, graphicsInterface.id], graphic);
      } else {
      }
    });
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

  setBackground(style, effect) {
    let game = this.game;
    // assume style is CSS color, set body background
    document.body.style.background = style;
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