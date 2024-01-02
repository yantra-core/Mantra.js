export default class LoadingCircle {
  constructor(waitTime) {
    this.waitTime = waitTime; // Total wait time in milliseconds
    this.elapsedTime = 0; // Time elapsed

    this.visible = false;
    this.done = false;

    // Create the circle container
    this.container = document.createElement('div');
    this.container.style.width = '100px';
    this.container.style.height = '100px';
    this.container.style.position = 'absolute';
    this.container.style.display = 'none';
    this.container.style.alignItems = 'center';
    this.container.style.justifyContent = 'center';
    this.container.style.borderRadius = '50%';

    // Create the circle element with CSS
    this.circle = document.createElement('div');
    this.circle.style.width = '100%';
    this.circle.style.height = '100%';
    this.circle.style.borderRadius = '50%';
    this.circle.style.backgroundImage = `conic-gradient(blue 0% 0%, transparent 0% 100%)`;

    // Create the countdown text
    this.countdownText = document.createElement('div');
    this.countdownText.style.position = 'absolute';
    this.countdownText.style.color = 'black';
    this.countdownText.innerText = (this.waitTime / 1000).toString();

    // Append elements
    this.container.appendChild(this.circle);
    this.container.appendChild(this.countdownText);
    document.body.appendChild(this.container);

    // Timer-based control
    this.interval = null;
  }

  setPosition(x, y) {
    this.container.style.left = `${x}px`;
    this.container.style.top = `${y}px`;
  }

  update(newDuration) {
    this.waitTime = newDuration;
    this.countdownText.innerText = (this.waitTime / 1000).toString();
  }

  start() {
    this.visible = true;
    this.container.style.display = 'flex';
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.elapsedTime = 0;
    this.interval = setInterval(() => this.tick(100), 100);
  }

  tick(delta) {
    if (this.done) {
      //console.log('LoadingCircle.tick already done. Skipping...');
      return;
    }
    if (!this.visible) {
      this.visible = true;
      this.container.style.display = 'flex';
    }
    this.elapsedTime += delta;
    let progress = this.elapsedTime / this.waitTime;
    let remainingTime = Math.ceil((this.waitTime - this.elapsedTime) / 1000);

    this.circle.style.backgroundImage = `conic-gradient(blue ${progress * 100}% 0%, transparent 0% 100%)`;
    this.countdownText.innerText = remainingTime.toString();
    // console.log('LoadingCircle.tick', this.elapsedTime, this.waitTime, progress, remainingTime)
    if (this.elapsedTime >= this.waitTime) {
      this.complete();
    }
  }

  complete() {
    // console.log("LoadingCircle.complete")
    this.done = true;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.emitCompleteEvent();
    // this.container.remove();
  }

  remove () {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.container.remove();
  }

  emitCompleteEvent() {
    const event = new CustomEvent('loadingComplete', { detail: { completed: true } });
    this.container.dispatchEvent(event);
  }
}
