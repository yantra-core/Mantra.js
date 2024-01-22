// RBush.js - Mantra Game Plugin - Marak Squires 2024
// RBush.js - see: https://github.com/mourner/rbush
import * as RBushModule from 'rbush';

class RBush {
  static id = 'rbush';
  
  constructor() {
    this.id = RBush.id;
  }

  init(game) {
    this.game = game;
    this.tree = new RBushModule.default();
    this.game.systemsManager.addSystem('rbush', this);
  }

  addEntity(entity) {
    const spatialData = this._extractSpatialData(entity);
    this.tree.insert(spatialData);
  }

  updateEntity(entity) {
    const spatialData = this._extractSpatialData(entity);
    this.tree.remove(spatialData, (a, b) => a.id === b.id);
    this.tree.insert(spatialData);
  }

  removeEntity(entity) {
    const spatialData = this._extractSpatialData(entity);
    this.tree.remove(spatialData, (a, b) => a.id === b.id);
  }

  search(query, mergeData = false) {
    // Query should be an object with {minX, minY, maxX, maxY}

    if (mergeData) {
      return this.tree.search(query).map(item => this.game.getEntity(item.id));
    } else {
      return this.tree.search(query).map(item => item.id);
    }

  }

  all() {
    return this.tree.all();
    //     return this.tree.all().map(item => this.game.getEntity(item.id));
  }

  _extractSpatialData(entity) {
    const { id, position, width, height } = entity;
    return {
      id,
      minX: position.x,
      minY: position.y,
      maxX: position.x + width,
      maxY: position.y + height
    };
  }

  update() { }
  render() { }
  destroy() { }
}

export default RBush;