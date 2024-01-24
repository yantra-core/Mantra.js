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

  update() {  // run once per game loop

    let tick = this.game.tick;

    if (tick % 3 !== 0) return;

    let currentPlayer = this.game.getCurrentPlayer();
    
    //
    // If there is a current player and the `Tile` plugin is loaded,
    // Check the players position and load the tiles for the area around the player
    //
    if (currentPlayer) {
      if (this.game.systems.tile) { // TODO: && this.game.systems.tile.active
        this.game.systems.tile.loadTilesForArea(currentPlayer.position);
      }
    }

    // if (tick % 30 !== 0) return;

    if (this.game.useFoV !== true) return;

    // get all items, plus a buffer of 1.1x the field of view
    let nearbyEntities = game.getPlayerFieldOfView(currentPlayer, this.game.data.fieldOfView * 1.1, false);

    // Check to see if any entities exists in the game world which are not in the field of view
    // If so, remove them from the game world
    for (let [eId, state] of this.game.entities.entries()) {
      if (game.useFoV && nearbyEntities.indexOf(eId) === -1) {
        let ent = this.game.entities.get(eId);
        if (ent) {
          game.removeEntity(eId, false);
        }
      }
    }

    // Check to see if any entities exist in the field of view ( RBush ) which are not in the game world
    // If so, add them to the game world
    nearbyEntities.forEach(eId => {
      if (eId) {
        let exists = this.game.getEntity(eId);
        if (!exists) {
          let entityData = this.game.deferredEntities[eId.toString()]
          if (entityData && entityData.destroyed !== true) {
            this.game.createEntity(entityData, true); // ignore create setup, goes straight to create
          }
        }
      }
    });

  }

  render() { }
  destroy() { }
}

export default RBush;