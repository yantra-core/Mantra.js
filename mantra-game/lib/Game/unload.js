export default function unload(game) {
  return async function unload(pluginInstanceOrId, options = {}, cb) {

    if (typeof cb === 'undefined') {
      cb = function noop() { };
    }

    console.log('Unloading plugin', pluginInstanceOrId);

    let scene = this.data.scenes[pluginInstanceOrId];

    if (scene) {
      // iterate all ents and remove them if scene matches
      let ents = this.data.ents._;
      let sceneEnts = Object.keys(ents).forEach((entId) => {
        game.removeEntity(Number(entId));
      });
    }

    // attempt to remove the system if it exists
    game.removeSystem(pluginInstanceOrId);

  };
}