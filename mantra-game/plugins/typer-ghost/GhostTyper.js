// TODO: this needs to be a "kind" of text element entity and go through,
// inflateText() code path with type: 'TEXT', kind: 'ghost'
// this is required in order to get the text to adjust position based on camera movements
// could be tricky to integrate with CSSCamera vs other camera systems
// might do well to have game.data.camera.position scope updated regardless of camera system
// current behavior of ghost text is to be fixed to the screen
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

    // TEST CODE DO NOT REMOVE
    //let typerInstance = this.typers[0]; // Example: get the first typewriter instance
    //this.updateText(typerInstance, "Welcome to Mantra\n my friend.", 10000, 10000);
    // END TEST CODE
  }

  createText(options) {
    const { x, y, text, style, duration, removeDuration } = options;
    const typer = {
      text: text,
      ogText: text,
      duration: duration || 5000,
      removeDuration: removeDuration,
      style: style,
      typerText: this.createTextElement(x, y, style),
      framesToWait: Math.floor((duration || 5000) / (33.33 * text.length)),
      frameCounter: 0,
      lastUpdate: 0,
    };

    this.typers.push(typer);
  }

  createTextElement(x, y, style) {
    
    let cameraPosition = this.game.data.camera.position;
    let currentPlayer = this.game.getEntity(this.game.currentPlayerId);


    console.log("currentPlayercurrentPlayercurrentPlayer", currentPlayer)
    //console.log('CSSGRA', this.game.systems['graphics-css']);
    // alert(cameraPosition)
    let element = document.createElement('div');
    Object.assign(element.style, style, { position: 'absolute', left: `${x}px`, top: `${y}px` });
    document.body.appendChild(element);

    
    return element;
  }

  update() {
    // update gets called once per game tick at the games FPS rate
    this.typers.forEach(typer => {
      if (this.game.tick % typer.framesToWait === 0) {
        this.typeWriter(typer);
      }
    });
  }

  typeWriter(typer) {
    if (typer.text.length) {
      typer.typerText.textContent += typer.text[0];
      typer.text = typer.text.substr(1);
    } else {
      // remove from typers array
      this.typers = this.typers.filter(t => t !== typer);
      if (typer.removeDuration) {
        setTimeout(() => {
          typer.text = typer.ogText;
          typer.typerText.textContent = '';
        }, typer.removeDuration);
      }
    }
  }

  updateText(typer, newText, newDuration, removeDuration) {
    let now = new Date().getTime();
    if (now - typer.lastUpdate < 100) {
      console.log('ignoring update because it is too soon');
      return;
    }
    typer.lastUpdate = now;

    typer.text = newText;
    typer.ogText = newText;
    typer.duration = newDuration || typer.duration;
    typer.framesToWait = Math.floor(typer.duration / (33.33 * newText.length));
    typer.typerText.textContent = '';

    if (typeof removeDuration === 'number') {
      setTimeout(() => {
        typer.text = '';
        typer.typerText.textContent = '';
      }, removeDuration);
    }
  }
}

export default GhostTyper;
