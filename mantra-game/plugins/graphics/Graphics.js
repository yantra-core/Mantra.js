// Graphics.js - Marak Squires 2023
import updateSprite from "./lib/updateSprite.js";
import SpriteSheet from "./lib/SpriteSheet.js";
import handleInputs from "./lib/handleInputs.js";
import getTexture from "./lib/getTexture.js";
import LoadingCircle from "./lib/LoadingCircle.js";

class Graphics {
  static id = 'graphics';
  static removable = false;

  constructor() {
    this.id = Graphics.id;
    this.updateSprite = updateSprite.bind(this);
    this.handleInputs = handleInputs.bind(this);
    this.getTexture = getTexture.bind(this);
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
    // hoist SpriteSheet class to game scope
    this.game.SpriteSheet = SpriteSheet;

    this.game.data.camera = this.game.data.camera || {
      position: {
        x: 0,
        y: 0
      }
    };

    // Ensure the gameHolder div exists
    let gameHolder = document.getElementById('gameHolder');
    if (!gameHolder) {
      gameHolder = document.createElement('div');
      gameHolder.id = 'gameHolder';
      document.body.appendChild(gameHolder); // Append to the body or to a specific element as needed
    }

    // TODO: remove this preloader
    // Remark: Preload is not here, but is in Client?
    // Is that best place for it?

    // Bind event handlers for changing player sprite
    this.handleInputs();
    
  }

  // Remark: Putting preload in Graphics interface isn't exactly ideal
  // We could use this for preloading required graphics and waiting for them to load before starting the game
  // However; in most cases it's better to start Mantra and then preload in the Client before
  preload () {

    // TODO: move guy sprites to new Preloader / Animations subsystem
    // preload the guy sprites ( for now )
    let preload = ['guy-down-0', 'guy-down-1', 'guy-up-0', 'guy-up-1', 'guy-right-0', 'guy-right-1', 'guy-left-0', 'guy-left-1'];
    let preloaderDiv = document.createElement('div');
    preloaderDiv.id = 'preloader';
    gameHolder.appendChild(preloaderDiv);

    preload.forEach(function (spriteName) {
      let img = document.createElement('span');
      img.classList.add(spriteName);
      preloaderDiv.appendChild(img);
    });

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
      this.game.use(graphicsInterfaceName /*, { camera: this.game.data.camera }*/);

      // Add event listeners for plugin ready events
      this.game.once(`plugin::ready::${graphicsInterfaceId}`, () => {

        // iterate through all existing graphics ( except this one ) and remove them
        this.game.graphics.forEach(function (graphics) {
          if (graphics.id !== graphicsInterfaceId) {
            game.systemsManager.removeSystem(graphics.id);
          }
        });

        // redraw all graphics
        for (let [eId, state] of this.game.entities.entries()) {
          let ent = this.game.entities.get(eId);
          // console.log('rendering', ent)
          game.graphics.forEach(function (graphicsInterface) {
            graphicsInterface.inflateEntity(ent);
          });
          // this.game.changedEntities.delete(eId);
        }

        document.body.style.cursor = 'default';
        cb(null);
      });
    } else {
      document.body.style.cursor = 'default';
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