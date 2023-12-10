// Nes.js - Marak Squires 2023
import gui from '../gui-editor/gui.js';

class Nes {
  static id = 'nes';

  constructor(config = {}) {
    this.id = Nes.id;
    // Other configurations can be added here if needed
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem(this.id, this);
    this.createNesEmulator();

    if (this.game && this.game.systems && this.game.systems['entity-input']) {
      // Remark: You may not have to disable inputs + remove events
      // *just* removing events should be enough, this is OK for now
      this.game.systems['entity-input'].disableInputs();
      this.game.systems['keyboard'].unbindAllEvents();
    }

    // add a global click handler to document that will delegate any clicks
    // that are not inside gui-windows to re-enable inputs
    document.addEventListener('click', (e) => {
      // check if the click was inside a gui-window
      let guiWindow = e.target.closest('.gui-container');
      if (this.game && this.game.systems && this.game.systems['entity-input'] && this.game.systems['keyboard']) {
        if (!guiWindow) {
          // re-enable inputs
          this.game.systems['entity-input'].setInputsActive();
          this.game.systems['keyboard'].bindInputControls();
        } else {
          // disable inputs
          this.game.systems['entity-input'].disableInputs();
          this.game.systems['keyboard'].unbindAllEvents();
        }
  
        // check to see if this is a class sutra-link, if so open the form editor
        if (e.target.classList.contains('sutra-link')) {
          let sutraPath = e.target.getAttribute('data-path');
          let node = this.behavior.findNode(sutraPath);
          this.showConditionalsForm(node);
        }
      }
    });

  }

  createNesEmulator() {
    // Use gui.window() to create the window
    this.nesView = gui.window('nesView', 'NES Emulator', () => {
      this.game.systemsManager.removeSystem(Nes.id);
    });

    // Create iframe for the NES emulator
    let iframe = document.createElement('iframe');
    iframe.id = 'nesIframe';
    iframe.style.width = '100%';  // Set iframe width
    iframe.style.height = '100%'; // Set iframe height
    iframe.src = './plugins/nes/vendor/SaltyNES.html'; // Set the source for the iframe

    // Append iframe to the GUI window
    let guiContent = this.nesView.querySelector('.gui-content');
    guiContent.appendChild(iframe);
    //document.body.appendChild(iframe);
  }

  unload() {
    if (this.nesView) {
      this.nesView.remove();
    }
  }
}

export default Nes;
