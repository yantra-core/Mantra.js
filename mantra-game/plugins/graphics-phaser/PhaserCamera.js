// PhaserCamera.js - Marak Squires 2023
class PhaserCamera {

  static id = 'phaser-camera';

  constructor(scene, config = {}) {
    this.id = PhaserCamera.id;
    this.scene = scene;
    this.camera = scene.cameras.main;
    this.config = config;
    /*
    this.zoom = {
      maxZoom: 2.222,
      minZoom: 0.1,
      current: 1,
      tweening: false
    };
    */
    this.follow = true;
    this.isDragging = false;
    this.dragInertia = { x: 0, y: 0 };
    this.isThrowing = false;
    this.initZoomControls();
  }

  init(game) {
    this.game = game;
    // hoists and overrides
    this.game.setZoom = this.setZoom.bind(this);
    this.game.systemsManager.addSystem('graphics-phaser-camera', this);
    this.scene.input.on('pointerdown', this.onPointerDown.bind(this));
    this.scene.input.on('pointermove', this.onPointerMove.bind(this));
    this.scene.input.on('pointerup', this.onPointerUp.bind(this));
  }

  // update() is called each game tick, we may want to implement render() here instead for RAF
  update() {
    let camera = this.scene.cameras.main;
    let player = this.game.getEntity(this.game.currentPlayerId);
    // let graphics = this.game.components.graphics.get(this.game.currentPlayerId);
    if (camera && player && player.graphics && player.graphics['graphics-phaser']) {

      if (this.follow && !this.isDragging && !this.isThrowing) {
        camera.centerOn(player.position.x, player.position.y);
      }
      this.followingPlayer = true; // Set the flag to true
    }
  }

  onPointerDown(pointer) {
    if (pointer.rightButtonDown()) {
      this.isDragging = true;
      this.follow = false;
      this.lastPointerPosition = { x: pointer.x, y: pointer.y };
    }
  }

  onPointerMove(pointer) {
    if (this.isDragging) {
      const dx = pointer.x - this.lastPointerPosition.x;
      const dy = pointer.y - this.lastPointerPosition.y;
      this.camera.scrollX -= dx / this.camera.zoom;
      this.camera.scrollY -= dy / this.camera.zoom;
      this.lastPointerPosition = { x: pointer.x, y: pointer.y };
    }
  }

  onPointerUp(pointer) {
    if (this.isDragging) {
      /* TODO: implement inertial throwing
      const dx = pointer.x - this.lastPointerPosition.x;
      const dy = pointer.y - this.lastPointerPosition.y;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        this.isThrowing = true;
        this.dragInertia.x = dx;
        this.dragInertia.y = dy;
        this.scene.time.addEvent({ delay: 0, callback: this.applyThrow, callbackScope: this, loop: true });
      }
      */
      this.isDragging = false;
    }
  }

  initZoomControls() {
    this.scene.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
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
  }

  applyThrow() {
    if (!this.isThrowing) return;

    const decayFactor = 0.95; // Adjust for desired inertia effect
    this.camera.scrollX -= this.dragInertia.x / this.camera.zoom;
    this.camera.scrollY -= this.dragInertia.y / this.camera.zoom;

    this.dragInertia.x *= decayFactor;
    this.dragInertia.y *= decayFactor;

    if (Math.abs(this.dragInertia.x) < 0.1 && Math.abs(this.dragInertia.y) < 0.1) {
      this.isThrowing = false;
      this.scene.time.removeAllEvents();
    }
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

// TODO: refactor this code into above class
const zoom = {};

zoom.maxZoom = 16;
zoom.minZoom = 0.05;
zoom.current = 0.1;

zoom.tweening = false;

zoom.init = function (mainScene) {

  // if mobile change max and min zoom values
  /*
  if (!mainScene.game.device.os.desktop) {
    zoom.maxZoom = 3.333;
    zoom.minZoom = 0.33;
  }
  */

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
  // mainScene.game.G.currentZoom = mainScene.cameras.main.zoom;
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