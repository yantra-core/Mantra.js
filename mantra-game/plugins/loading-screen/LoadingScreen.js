import gui from '../gui-editor/gui.js';

class LoadingScreen {
  static id = 'loading-screen';

  constructor(config = {}) {
    this.id = LoadingScreen.id;
    this.createLoadingScreen();
    // this.setupCanvasAnimation();

  }

  init(game) {
    this.game = game;
    // hide loading screen
    this.loadingScreen.style.display = 'none';
  }

  createLoadingScreen() {
    // Create loading screen container
    this.loadingScreen = document.createElement('div');
    this.loadingScreen.id = 'loadingScreen';
    this.loadingScreen.style.position = 'fixed';
    this.loadingScreen.style.top = 0;
    this.loadingScreen.style.left = 0;
    this.loadingScreen.style.width = '100%';
    this.loadingScreen.style.height = '100%';
    this.loadingScreen.style.backgroundColor = 'black';
    this.loadingScreen.style.zIndex = 9999; // Ensure it's on top

    document.body.appendChild(this.loadingScreen);

    // Rainbow colors
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    let colorIndex = 0;

    let self = this;
    function updateColor () {
      self.loadingScreen.style.backgroundColor = colors[colorIndex];
      colorIndex = (colorIndex + 1) % colors.length;
    }
    // Change color every 500 milliseconds
    this.colorInterval = setInterval(() => {
      updateColor();
    }, 50);
    updateColor();

    //document.body.appendChild(this.loadingScreen);
    /*
    // Create a canvas element
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'loadingCanvas';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.loadingScreen.appendChild(this.canvas);
    */

  }

  setupCanvasAnimation() {
    // Check if canvas is supported
    if (this.canvas.getContext) {
      const ctx = this.canvas.getContext('2d');
      // Set up your canvas rainbow animation here
      // Once the canvas is ready, remove or fade out the CSS animation
      this.loadingScreen.classList.remove('css-loading-animation');
      // Implement the rainbow animation on the canvas
    }
  }

  unload() {
    clearInterval(this.colorInterval);

    // Remove the loading screen
    if (this.loadingScreen && this.loadingScreen.parentNode) {
      this.loadingScreen.parentNode.removeChild(this.loadingScreen);
    }
  }
}

export default LoadingScreen;
