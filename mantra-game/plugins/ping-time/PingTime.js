// PingTime.js - Marak Squires 2023
class PingTime {

  static id = 'gui-ping-time';

  constructor(config = {}) {
    this.id = PingTime.id;
    this.pingTime = null;
    this.displayElement = null;
  }

  init(game) {
    this.game = game;
    this.createDisplay();
    this.subscribeToPingTimeEvent();
  }

  createDisplay() {
    this.displayElement = document.createElement('div');
    this.displayElement.id = "pingTimeDisplay";
    this.displayElement.style.position = 'absolute';
    this.displayElement.style.top = '8px';
    this.displayElement.style.right = '85px';
    this.displayElement.style.zIndex = '1000';
    this.displayElement.style.padding = '5px';
    this.displayElement.style.border = '1px solid #ddd';
    this.displayElement.style.borderRadius = '4px';
    this.displayElement.style.backgroundColor = '#f8f8f8';
    this.displayElement.textContent = 'Ping: - ms';
    // hide
    this.displayElement.style.display = 'none';
    document.body.appendChild(this.displayElement);
  }

  subscribeToPingTimeEvent() {
    this.game.on('pingtime', (pingTime) => {
        // check if hidden, if so show
        if(this.displayElement.style.display === 'none') {
        this.displayElement.style.display = 'block';
      }
      this.pingTime = truncateToPrecision(pingTime);
      this.displayPingTime();
    });
  }

  displayPingTime() {
    if(this.displayElement) {
      this.displayElement.textContent = `Ping: ${this.pingTime} ms`;
      // Optional: add logic to change color based on ping time quality
      if(this.pingTime < 100) {
        this.displayElement.style.color = 'green';
      } else if(this.pingTime < 200) {
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
  return Number(value.toFixed(precision));
};


export default PingTime;
