export default function unload(game) {
  return async function unload(pluginInstanceOrId, options = {}, cb) {

    if (typeof cb === 'undefined') {
      cb = function noop() { };
    }

    console.log('Unloading plugin', pluginInstanceOrId);

    // TODO: do not store entire scene reference in data, only store the id
    // TOOD: store scene references on game.scenes scope
    let scene = this.data.scenes[pluginInstanceOrId];

    if (scene) {
      // iterate all ents and remove them if scene matches
      let ents = this.data.ents._;
      let sceneEnts = Object.keys(ents).forEach((entId) => {
        game.removeEntity(Number(entId));
      });
    }

    delete game.data.scenes[pluginInstanceOrId];

    // attempt to remove the system if it exists
    game.removeSystem(pluginInstanceOrId);

  };
}