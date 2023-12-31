// SnapshotSize.js - Marak Squires 2023
import bytes from './vendor/bytes/bytes.js';
class SnapshotSize {

  static id = 'gui-snapshot-size';

  constructor(config = {}) {
    this.averageSnapshotSize = null;
    this.displayElement = null;
    this.id = SnapshotSize.id;
  }

  init(game) {
    this.game = game;
    this.createDisplay();
    this.subscribeToSnapshotSizeEvent();
  }

  createDisplay() {
    this.displayElement = document.createElement('div');
    this.displayElement.id = "snapshotSizeDisplay";
    this.displayElement.style.position = 'absolute';
    this.displayElement.style.top = '8px';
    this.displayElement.style.right = '350px';
    this.displayElement.style.padding = '5px';
    this.displayElement.style.zIndex = '1000';
    this.displayElement.style.border = '1px solid #ddd';
    this.displayElement.style.borderRadius = '4px';
    this.displayElement.style.backgroundColor = '#f8f8f8';
    this.displayElement.textContent = 'Snapshot Size: - bytes';
    // hide
    this.displayElement.style.display = 'none';
    document.body.appendChild(this.displayElement);
  }

  subscribeToSnapshotSizeEvent() {
    this.game.on('snapshotsize', (size) => {
        // check if hidden, if so show
        if(this.displayElement.style.display === 'none') {
        this.displayElement.style.display = 'block';
      }
      this.averageSnapshotSize = truncateToPrecision(size);
      this.displaySnapshotSize();
    });
  }

  displaySnapshotSize() {
    if(this.displayElement) {
      this.displayElement.textContent = `Snapshot Size: ${bytes(this.averageSnapshotSize)}`;
      // Optional: Add logic to change color based on snapshot size
      if(this.averageSnapshotSize < 1024) {
        this.displayElement.style.color = 'green';
      } else if(this.averageSnapshotSize < 2048) {
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

const truncateToPrecision = (value, precision = 2) => {
  // Adjust the precision based on the value size if needed
  let factor = (value < 1) ? 100 : (value < 1024) ? 10 : 1;
  return Math.round(value * factor) / factor;
};

export default SnapshotSize;
