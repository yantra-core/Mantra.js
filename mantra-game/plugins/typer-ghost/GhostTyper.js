// GhostTyper.js - Marak Squires 2023
class GhostTyper {

  static id = 'typer-ghost';

  constructor() {
    this.id = GhostTyper.id;
    this.typers = [];
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem(this.id, this);
  }

  createQueuedText(options) {
    const typer = new Typer(this.game, options.x, options.y, '', options.style, () => this.removeTyper(typer));
    this.typers.push(typer);
    return typer;
  }
  // Add text to the queue of a specific typer
  queueTextForTyper(typer, text, duration, removeDuration) {
    typer.queueText(text, duration, removeDuration);
  }

  // Start processing the queue for a specific typer
  startTyperQueue(typer) {
    typer.processQueue();
  }

  createText(options) {
    const typer = new Typer(this.game, options.x, options.y, options.text, options.style, options.duration, options.removeDuration, () => this.removeTyper(typer));
    this.typers.push(typer);
    return typer;
  }

  update() {
    // update gets called once per game tick at the games FPS rate
    this.typers.forEach(typer => {
      if (this.game.tick % typer.framesToWait === 0 && !typer.complete) {
        typer.type();
      }
    });
  }

  removeTyper(typerToRemove) {
    this.typers = this.typers.filter(typer => typer !== typerToRemove);
  }

}

class Typer {
  constructor(game, x, y, text = '', style, duration, removeDuration, onRemove) {
    this.game = game;
    this.text = '';
    this.ogText = text;
    this.duration = duration || 5000;
    this.removeDuration = removeDuration;
    this.style = style;
    this.typerText = this.createTextElement(x, y, style);
    this.framesToWait = Math.floor((duration || 5000) / (33.33 * text.length));
    this.frameCounter = 0;
    this.lastUpdate = 0;
    this.complete = false;
    this.removeTimer = null;
    this.textQueue = [];
    this.onRemove = onRemove;
  }

  queueText(text, duration, removeDuration) {
    this.textQueue.push({ text, duration, removeDuration });
  }

  // Method to start processing the queue
  processQueue() {
    if (this.textQueue.length > 0) {
      const { text, duration, removeDuration } = this.textQueue.shift();
      this.updateText(text, duration, removeDuration);
    }
  }

  createTextElement(x, y, style) {
    let cameraPosition = this.game.data.camera.position;
    let currentPlayer = this.game.getEntity(this.game.currentPlayerId);
    let element = document.createElement('div');
    Object.assign(element.style, style, {
      position: 'absolute',
      left: x + 'px',
      top: y + 'px'
    });
    document.body.appendChild(element);
    return element;
  }

  type() {
    if (this.text.length) {
      this.typerText.textContent += this.text[0];
      this.text = this.text.substr(1);
      this.isTyping = true;
    } else if (this.isTyping) {
      this.complete = true;
      this.isTyping = false;
      this.setRemoveTimer();
    }
  }

  setRemoveTimer() {
    if (this.removeDuration) {
      // Wait for removeDuration before processing the next queue item
      this.removeTimer = setTimeout(() => {
        this.typerText.textContent = '';
        this.processQueue();
      }, this.removeDuration);
    } else {
      // If there's no removeDuration, process the next item immediately
      this.processQueue();
    }
  }

  updateText(newText, newDuration, newRemoveDuration) {
    this.complete = false;
    this.text = newText;
    this.ogText = newText;
    this.duration = newDuration || this.duration;
    this.removeDuration = newRemoveDuration;
    this.framesToWait = Math.floor(this.duration / (33.33 * newText.length));
    this.typerText.textContent = '';
    this.isTyping = false;
  }
}


export default GhostTyper;

