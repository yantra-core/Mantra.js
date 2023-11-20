// GraphicsInterface.js - Marak Squires 2023
class GraphicInterface {
  init() {
    throw new Error("init method not implemented.");
  }

  // called by the client as many times as possible using requestAnimationFrame
  render(game) {
    throw new Error("render method not implemented.");
  }

  // called once per game tick, using fixed time step
  update(entities) {
    throw new Error("update method not implemented.");
  }

  // used to inflate entity data from the server
  // the entityData may represent an: update, create, or destroy event
  inflateGraphic(entityData) {
    throw new Error("inflateGraphic method not implemented.");
  }

  // create a new graphic object
  createGraphic(entity, data) {
    throw new Error("createGraphic method not implemented.");
  }

  // remove the graphic object
  removeGraphic(entityId) {
    throw new Error("removeGraphic method not implemented.");
  }

  // remove the graphics object
  updateGraphic(entity, data) {
    throw new Error("updateGraphic method not implemented.");
  }
}

export default GraphicInterface;