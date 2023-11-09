// Graphics.js
class Graphics {
  constructor() {
    this.name = 'graphics';
  }

  init(game) {
    this.game = game; // Store the reference to the game logic
    this.game.systemsManager.addSystem('graphics', this);
    this.game.createGraphic = this.createGraphic.bind(this);
    this.game.removeGraphic = this.removeGraphic.bind(this);
    this.game.updateGraphic = this.updateGraphic.bind(this);
  }

  update () {}

  createGraphic(entityData) {
    let game = this.game;
    game.graphics.forEach(function (graphicsInterface) {
      // don't recreate same graphic if already exists on interface
      let ent = game.getEntity(entityData.id);
      // console.log(graphicsInterface.name, "CREATING FOR ENT", ent)
      if (ent && ent.graphics && ent.graphics[graphicsInterface.name]) {
        // console.log("WILL NOT CREATE ALREADY EXISTING GRAPHIC", entityData.id, graphicsInterface.name, ent.graphics[graphicsInterface.name])
        return;
      }
      // TODO: createPolygon, createCircle, createRectangle, createTriangle
      // console.log('Graphics.createGraphic', entityData.position);

      let graphic = graphicsInterface.createGraphic(entityData);
      // Remark: TODO: make this into Graphic() class
      /*
      let graphic = {
        setPosition: function () {},
        destroy: function () {}
      }
      */
      // Setting a nested value
      if (graphic) {
        // console.log("CREATING AND SETTING GRAPHIC", entityData.id, graphicsInterface.name, graphic)
        game.components.graphics.set([entityData.id, graphicsInterface.name], graphic);
      } else {
        // console.log("ERROR CREATING GRAPHIC", entityData.id, graphicsInterface.name, graphic)
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

}

export default Graphics;