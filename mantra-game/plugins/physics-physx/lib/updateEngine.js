// Equivalent to Engine.update()
export default function updateEngine(engine) {

  let scene = this.scene;
  let hrtime = new Date().getTime();

  if (!scene) {
    return;
  }

  // Call pre-update listeners
  for (const listener of this.preUpdateListeners) {
    listener({ source: this });
  }

  var timeStep = Math.min(0.03, (hrtime - this.lastFrame));
  // console.log('timeStep', timeStep)
  scene.simulate(timeStep);
  scene.fetchResults(true);

  // Call post-update listeners
  for (const listener of this.postUpdateListeners) {
    listener({ source: this });
  }

  // Your additional logic for checking moved bodies, etc.
  this.checkForMovedBodies();


  this.lastFrame = hrtime;
}