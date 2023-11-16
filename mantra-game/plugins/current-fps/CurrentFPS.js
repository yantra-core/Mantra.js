// CurrentFPS.js - Marak Squires 2023
class CurrentFPS {

  static id = 'current-fps';

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
    this.displayElement.style.top = '90px'; // Adjusted from SnapshotSize plugin for spacing
    this.displayElement.style.right = '10px';
    this.displayElement.style.padding = '5px';
    this.displayElement.style.border = '1px solid #ddd';
    this.displayElement.style.borderRadius = '4px';
    this.displayElement.style.backgroundColor = '#f8f8f8';
    this.displayElement.textContent = 'FPS: -';
    document.body.appendChild(this.displayElement);
  }

  subscribeToFPSEvent() {
    this.game.on('fps', (fps) => {
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

  destroy() {
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
