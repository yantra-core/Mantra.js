// PhaserCamera.js - Marak Squires 2023
class PhaserCamera {

  static id = 'phaser-camera';

  constructor(scene, config = {}) {
    this.id = PhaserCamera.id;
    this.scene = scene;
    this.camera = scene.cameras.main;
    this.config = config;
    this.zoom = {
      maxZoom: 2.222,
      minZoom: 0.22,
      current: 1,
      tweening: false
    };

    // Adjust zoom limits for non-desktop devices
    if (!scene.game.device.os.desktop) {
      this.zoom.maxZoom = 3.333;
      this.zoom.minZoom = 0.33;
    }

    this.initZoomControls();
  }

  init(game) {
  }

  initZoomControls() {
    this.scene.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      // Your existing wheel zoom logic
      // Use this.zoom and this.camera instead of global variables
      // console.log('wheel', pointer, gameObjects, deltaX, deltaY, deltaZ)


      let currentZoom = zoom.current;

      // Determine the zoom factor based on the wheel event.
      const zoomFactor = deltaY < 0 ? 1.5 : 0.6;  // Adjust these numbers to your preference

      // Calculate the target zoom level.
      currentZoom *= zoomFactor;

      // Clamp the zoom level to reasonable limits (e.g., between 0.2 to 2)
      currentZoom = Math.min(Math.max(currentZoom, zoom.minZoom), zoom.maxZoom);
      // Use zoom.tweenTo for smoother zoom transitions
      zoom.tweenTo(this.scene, currentZoom, 666);  // 1000 ms duration for the tween


    });

    // Other initializations as needed
  }

  tweenToZoom(targetZoom, duration = 1000, callback) {
    // Your existing tweenTo logic
    // Use this.zoom and this.camera
  }

  zoomIn(amount = 0.01) {
    zoom.zoomIn(this.scene, amount);
  }

  zoomOut(amount = 0.01) {
    zoom.zoomOut(this.scene, amount);
  }

  setZoom(absoluteAmount) {
    zoom.set(this.scene, absoluteAmount);
  }

  startFollowing(player) {
  }
}

export default PhaserCamera;



const zoom = {};

zoom.maxZoom = 2.222;
zoom.minZoom = 0.22;
zoom.current = 1;

zoom.tweening = false;

zoom.init = function (mainScene) {

  // if mobile change max and min zoom values
  if (!mainScene.game.device.os.desktop) {
    zoom.maxZoom = 3.333;
    zoom.minZoom = 0.33;
  }

};

let currentZoomTween = null;
let zoomTweenDelay = 333;
let lastZoomTweenTime = 0;
zoom.tweenTo = function (mainScene, targetZoom, duration, callback) {
  if (typeof duration === 'undefined') {
    duration = 1000; // default duration to 1 second
  }
  let now = new Date().getTime();
  if (zoom.tweening && typeof currentZoomTween !== 'undefined') {
    // cancel the current tween

    if (now - lastZoomTweenTime > zoomTweenDelay) {
      // console.log('zoom tween delay', now - lastZoomTweenTime)
      currentZoomTween.stop();
    }
  }
  zoom.tweening = true;
  lastZoomTweenTime = new Date().getTime();
  targetZoom = Math.max(Math.min(targetZoom, zoom.maxZoom), zoom.minZoom); // clamp the targetZoom to min/max bounds
  currentZoomTween = mainScene.tweens.add({
    targets: mainScene.cameras.main,
    zoom: targetZoom,
    duration: duration,
    ease: 'Sine.easeInOut', // you can use any easing function provided by Phaser
    onUpdate: function (tween) {
      zoom.current = tween.getValue();
    },
    onComplete: function () {
      zoom.tweening = false;
      if (typeof callback === 'function') {
        callback();
      }
    }
  });
};

zoom.zoomIn = function (mainScene, amount) {
  if (typeof amount === 'undefined') {
    amount = 0.01;
  }
  if (zoom.tweening) {
    return;
  }
  const scaleFactor = 1 / (mainScene.cameras.main.zoom * 2);
  amount *= scaleFactor;
  if (mainScene.cameras.main.zoom >= zoom.maxZoom) {
    return;
  }
  mainScene.cameras.main.zoom += amount;
  mainScene.game.G.currentZoom = mainScene.cameras.main.zoom;
};

zoom.zoomOut = function (mainScene, amount) {
  if (typeof amount === 'undefined') {
    amount = -0.01;
  }
  if (zoom.tweening) {
    return;
  }
  const scaleFactor = (mainScene.cameras.main.zoom - zoom.minZoom) / (zoom.maxZoom - zoom.minZoom);
  amount *= scaleFactor;
  if (mainScene.cameras.main.zoom <= zoom.minZoom) {
    return;
  }
  mainScene.cameras.main.zoom += amount;
  mainScene.game.G.currentZoom = mainScene.cameras.main.zoom;
};

zoom.set = function (mainScene, absoluteAmount) {
  if (zoom.tweening) {
    return;
  }
  if (absoluteAmount > zoom.maxZoom) {
    absoluteAmount = zoom.maxZoom;
  }
  if (absoluteAmount < zoom.minZoom) {
    absoluteAmount = zoom.minZoom;
  }
  mainScene.cameras.main.zoom = absoluteAmount;
  mainScene.game.G.currentZoom = mainScene.cameras.main.zoom;
  zoom.current = absoluteAmount;
};