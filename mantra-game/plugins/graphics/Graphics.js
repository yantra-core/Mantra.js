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
      // console.log(graphicsInterface.name, "CREATING FOR ENT", ent)
      if (ent && ent.graphics && ent.graphics[graphicsInterface.name]) {
        // console.log("WILL NOT CREATE ALREADY EXISTING GRAPHIC", entityData.id, graphicsInterface.name, ent.graphics[graphicsInterface.name])
        return;
      }
      let graphic = graphicsInterface.createGraphic(entityData);
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