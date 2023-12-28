
export default function switchWorlds (selectedWorld) {
  let game = this;
  // check to see if game.worlds has any entries
  // if so, unload them if they have an unload method
  if (game.worlds.length > 0) {
    game.worlds.forEach((world, i) => {
      if (world.unload) {
        // alert(`Unloading ${world.id}`);
        console.log(world.id, 'world.unload', world.unload)
        // remove the world from the game.worlds array
        game.worlds.splice(i, 1);
        world.unload();
      }
    });
  }

  game.systems.entity.clearAllEntities(false);
  let worldName = 'XState';
  worldName = 'Sutra';
  worldName = selectedWorld;

  let worldClass = WORLDS.worlds[worldName];

  if (!worldClass) {
    console.error(`World ${worldName} not found`);
    return;
  }

  let worldInstance = new worldClass();

  /*
  game.once('plugin::loaded::' + worldInstance.id, function () {
    // that.hideLoadingSpinner();
  });
  */

  game.use(worldInstance);

  // USER INTENT: Change world
  // persist this intention to the local storage
  // so that it can be restored on next page load
  game.storage.set('world', selectedWorld);
}
