// Remark: This PhysicsInterface file should should be in the mantra-game package and referenced as a dependency
class PhysicsInterface {
  constructor() {
    if (this.constructor === PhysicsInterface) {
      throw new Error('Abstract class cannot be instantiated');
    }
  }

  // Equivalent to Engine.create()
  createEngine(options) {
    throw new Error('Method "createEngine" must be implemented');
  }

  // Equivalent to World.add()
  addToWorld(engine, body) {
    throw new Error('Method "addToWorld" must be implemented');
  }

  // Equivalent to World.remove()
  removeFromWorld(engine, body) {
    throw new Error('Method "removeFromWorld" must be implemented');
  }

  // Equivalent to Engine.update()
  updateEngine(engine, delta) {
    throw new Error('Method "updateEngine" must be implemented');
  }

  // Equivalent to Bodies.rectangle()
  createRectangle(x, y, width, height, options) {
    throw new Error('Method "createRectangle" must be implemented');
  }

  // Equivalent to Body.applyForce()
  applyForceToBody(body, position, force) {
    throw new Error('Method "applyForceToBody" must be implemented');
  }

  // Custom method to get a body's position
  getBodyPosition(body) {
    throw new Error('Method "getBodyPosition" must be implemented');
  }

  // Custom method to get a body's velocity
  getBodyVelocity(body) {
    throw new Error('Method "getBodyVelocity" must be implemented');
  }

  onBeforeUpdate(engine, callback) {
    throw new Error('Method "onBeforeUpdate" must be implemented');
  }

  setPosition(body, position) {
    throw new Error('Method "setPosition" must be implemented');
  }

  setVelocity(body, velocity) {
    throw new Error('Method "setVelocity" must be implemented');
  }

  collisionStart(engine, callback) {
    throw new Error('Method "onCollision" must be implemented');
  }

}


export default PhysicsInterface;