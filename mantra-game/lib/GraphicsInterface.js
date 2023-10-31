// RendererInterface.js
class RendererInterface {
  init() {
    throw new Error("init method not implemented.");
  }

  render(entities) {
    throw new Error("render method not implemented.");
  }

  createEntity(entity, data) {
    throw new Error("updateEntity method not implemented.");
  }

  destroyEntity(entityId) {
    throw new Error("destroyEntity method not implemented.");
  }

  updateEntity(entity, data) {
    throw new Error("updateEntity method not implemented.");
  }
}

export default RendererInterface;