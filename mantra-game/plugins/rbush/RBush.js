// RBush.js - Mantra Game Plugin - Marak Squires 2024
// RBush.js - see: https://github.com/mourner/rbush
import * as RBushModule from 'rbush';

class RBush {
  static id = 'rbush';

  constructor() {
    this.id = RBush.id;
    this.idToNodeMap = new Map(); // Map to track IDs to RBush nodes
  }

  init(game) {
    this.game = game;
    this.tree = new RBushModule.default();
    this.game.systemsManager.addSystem('rbush', this);
  }

  addEntity(entity) {
    const spatialData = this._extractSpatialData(entity);
    this.tree.insert(spatialData);
    this.idToNodeMap.set(entity.id.toString(), spatialData);
  }

  updateEntity(entity) {
    const entityIdString = entity.id.toString();
    const oldSpatialData = this.idToNodeMap.get(entityIdString);
    // Directly remove the old node if it exists
    if (oldSpatialData) {
      this.tree.remove(oldSpatialData); // RBush's remove expects the exact node reference
      this.idToNodeMap.delete(entityIdString); // Remove the old entry from the map
    }
    // Insert the updated entity and update the map
    const newSpatialData = this._extractSpatialData(entity);
    this.tree.insert(newSpatialData);
    this.idToNodeMap.set(entityIdString, newSpatialData);
  }

  removeEntity(entity) {
    const spatialData = this.idToNodeMap.get(entity.id.toString());
    if (spatialData) {
      this.tree.remove(spatialData);
      this.idToNodeMap.delete(entity.id.toString());
    }
  }

  search(query, mergeData = false) {
    let that = this;
    if (mergeData) {
      return this.tree.search(query).filter(function (item) {
        let entRef = that.game.data.ents._[item.id.toString()];
        if (entRef && entRef !== null && entRef.destroyed !== true) {
          return that.game.data.ents._[item.id.toString()];
        }
        return false;
      });
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
    // Remark: 3/4/2024 - This code ( referencing Tile plugin ), should not directly exist in the RBush plugin
    //                    Instead, we should have the Tile plugin register a hook into the lifecycle for RBush.update
    //                    This way, the RBush plugin encapusulation is maintained and the Tile plugin reference can be removed
    if (currentPlayer) {
      if (this.game.systems.tile) { // TODO: && this.game.systems.tile.active
        this.game.systems.tile.loadTilesForArea(currentPlayer.position);
      }
    }

    // if (tick % 30 !== 0) return;

    if (this.game.config.useFoV !== true) return;

    // get all items, plus a buffer of 1.1x the field of view
    let nearbyEntities = game.getPlayerFieldOfView(currentPlayer, this.game.data.fieldOfView * 1.1, false);

    // Check to see if any entities exists in the game world which are not in the field of view
    // If so, remove them from the game world
    for (let [eId, state] of this.game.entities.entries()) {
      if (game.config.useFoV && nearbyEntities.indexOf(eId) === -1) {
        let ent = this.game.entities.get(eId);
        if (ent && ent.type !== 'BOOMERANG') { // TODO: remove this reference, use a flag
          // TODO: we can perform conditional checks for certain types of plugins to not be removed
          //       do not remove entity that originate from ui-component plugin
          //       we can check the plugin instance to see if it is a UI component
          game.removeEntity(eId, false);
        }
      }
    }

    // Check to see if any entities exist in the field of view ( RBush ) which are not in the game world
    // If so, add them to the game world
    nearbyEntities.forEach(eId => {
      if (eId) {
        let exists = this.game.data.ents._[eId.toString()];
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