// CurrentFPS.js - Marak Squires 2023
class CurrentFPS {

  static id = 'gui-current-fps';

  constructor(config = {}) {
    this.id = CurrentFPS.id;
    this.currentFPS = null;
    this.displayElement = null;
  }

  init(game) {
    this.game = game;
    this.createDisplay();
    this.subscribeToFPSEvent();
  }

  createDisplay() {
    this.displayElement = document.createElement('div');
    this.displayElement.id = "fpsDisplay";
    this.displayElement.style.position = 'absolute';
    this.displayElement.style.top = '8px'; // Adjusted from SnapshotSize plugin for spacing
    this.displayElement.style.right = '10px';
    this.displayElement.style.zIndex = '8889';
    this.displayElement.style.padding = '5px';
    this.displayElement.style.border = '1px solid #ddd';
    this.displayElement.style.borderRadius = '4px';
    this.displayElement.style.backgroundColor = '#f8f8f8';
    this.displayElement.textContent = 'FPS: -';
    // hidden
    this.displayElement.style.display = 'none';
    document.body.appendChild(this.displayElement);
  }

  subscribeToFPSEvent() { 
    this.game.on('fps', (fps) => {
      // check if hidden, if so show
      if(this.displayElement.style.display === 'none') {
        this.displayElement.style.display = 'block';
      }
      this.currentFPS = truncateToPrecision(fps);
      this.displayFPS();
    });
  }

  displayFPS() {
    if(this.displayElement) {
      this.displayElement.textContent = `FPS: ${this.currentFPS}`;
      // Optional: Add logic to change color based on FPS quality
      if(this.currentFPS >= 50) {
        this.displayElement.style.color = 'green';
      } else if(this.currentFPS >= 30) {
        this.displayElement.style.color = 'orange';
      } else {
        this.displayElement.style.color = 'red';
      }
    }
  }

  unload() {
    if(this.displayElement && this.displayElement.parentNode) {
      this.displayElement.parentNode.removeChild(this.displayElement);
    }
    this.displayElement = null;
  }
}

const truncateToPrecision = (value, precision = 0) => { // FPS typically doesn't need decimals
  return Math.round(value);
};

export default CurrentFPS;
