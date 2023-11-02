
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

  createGraphic(graphicData) {
    let game = this.game;

    // delegate the type of graphic to render to the graphics interface

    game.graphics.forEach(function (graphicsInterface) {
      // TODO: pipeline needs to assign mesh to correct scope

      // don't recreate same graphic if already exists on interface
      let ent = game.getEntity(graphicData.id);
      console.log(graphicsInterface.name, "CREATING FOR ENT", ent)
      if (ent && ent.graphics && ent.graphics[graphicsInterface.name]) {
        console.log("WILL NOT CREATE ALREADY EXISTING GRAPHIC", graphicData.id, graphicsInterface.name, ent.graphics[graphicsInterface.name])
        return;
      }

      // TODO: createPolygon, createCircle, createRectangle, createTriangle
      let graphic = graphicsInterface.createGraphic(graphicData);
      // Setting a nested value
      if (graphic) {
        console.log("CREATING AND SETTING GRAPHIC", graphicData.id, graphicsInterface.name, graphic)
        game.components.graphics.set([graphicData.id, graphicsInterface.name], graphic);
      } else {
        console.log("ERROR CREATING GRAPHIC", graphicData.id, graphicsInterface.name, graphic)
      }
    })
  }

  removeGraphic(entityId) {
    let game = this.game;
    game.graphics.forEach(function (graphicsInterface) {
      graphicsInterface.removeGraphic(entityId);
    });
  }

  updateGraphic(entityData) {
    let game = this.game;
    game.graphics.forEach(function (graphicsInterface) {
      graphicsInterface.updateGraphic(entityData);
    });
  }


}

export default Graphics;