
export default async function switchWorlds (selectedWorld) {
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

  game.systems.entity.removeAllEntities(true);
  let worldName = 'XState';
  worldName = 'Sutra';
  worldName = selectedWorld;

  // TODO: remove global WORLDS reference for server
  let worldClass = WORLDS.worlds[worldName];

  if (!worldClass) {
    console.error(`World ${worldName} not found`);
    return;
  }

  let worldInstance = new worldClass();
 
  game.once('plugin::loaded::' + worldInstance.id, function () {
    // alert('loaded')
    // call init?
    //worldInstance.init(game);
  });

  // needs to wait at least 1 tick of game loop to ensure entities are cleared
  // TODO: add Game.scheduleEvent(tickCount) method
  //       this will allow us to schedule events to occur at a specific tick in the future
  //       See: Timers.js file for example
  setTimeout(() => {
  }, 400);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  if (worldInstance.preload) {
    // remark: is this not already handled????
    // not needed?
    //await worldInstance.preload(game);
    // required ( for now should be automated? )
    //await game.preloader.loadAll();
  }
  game.use(worldInstance);

  // USER INTENT: Change world
  // persist this intention to the local storage
  // so that it can be restored on next page load
  game.storage.set('world', selectedWorld);
}
