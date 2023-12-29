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
  constructor(game, x, y, text, style, duration, removeDuration, onRemove) {
    this.game = game;
    this.text = text;
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
    this.onRemove = onRemove;
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
    } else {
      this.complete = true;
      this.setRemoveTimer();
    }
  }

  setRemoveTimer() {
    if (this.removeDuration) {
      clearTimeout(this.removeTimer);
      this.removeTimer = setTimeout(() => {
        this.text = this.ogText;
        this.typerText.textContent = '';
        this.complete = false;
        if (this.onRemove) {
          this.onRemove();
        }
      }, this.removeDuration);
    }
  }

  updateText(newText, newDuration, newRemoveDuration) {
    let now = new Date().getTime();
    if (now - this.lastUpdate < 100) {
      // console.log('ignoring update because it is too soon');
      return;
    }
    this.lastUpdate = now;
    this.complete = false;
    this.text = newText;
    this.ogText = newText;
    this.duration = newDuration || this.duration;
    this.framesToWait = Math.floor(this.duration / (33.33 * newText.length));
    this.typerText.textContent = '';
    if (typeof newRemoveDuration === 'number') {
      this.removeDuration = newRemoveDuration;
      this.setRemoveTimer();
    }
  }
}


export default GhostTyper;

