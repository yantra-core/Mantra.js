// SwitchGraphics.js - Marak Squires 2023
class SwitchGraphics {
  static id = 'gui-switch-graphics';

  constructor(config = {}) {
    this.id = SwitchGraphics.id;
    this.graphicsMode = config.graphicsMode || '2D';
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem(this.id, this);
    this.createUI();
  }

  // TODO: make SwitchGraphics() a buildable entity
  build(entityData = {}) {
    /*
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }
    entityData.meta = entityData.meta || {};
    entityData.meta.disabled = entityData.disabled;
    return {
      type: 'BUTTON',
      body: false,
      text: entityData.text || 'Switch Graphics',
      position: entityData.position,
      ...entityData // Spread the rest of entityData to override defaults as necessary
    };
    */
  }

  setMode() {
    // Determine the next graphics mode
    const nextGraphicsMode = this.nextMode();
  
    // Update the graphics mode first
    this.graphicsMode = nextGraphicsMode;
    // this.game.data.camera.currentZoom = 2.5;
    this.game.switchGraphics(this.lookupGraphicsPlugin(this.graphicsMode));
    // Then update the button label to reflect the new mode
    this.updateButtonLabel(this.nextMode());
  }
  

  createUI() {
    const container = this.createContainer();
    const button = this.createButton();

    container.appendChild(button);
    document.body.appendChild(container);
  }

  createContainer() {
    const container = document.createElement('div');
    container.id = 'switchgraphics-container';
    container.className = 'switchgraphics-container';
    container.style.cssText = `
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      padding: 10px 0;
      z-index: 11111;
    `;

    return container;
  }

  lookupGraphicsPlugin(graphicsMode) {
    return graphicsMode === '2D' ? 'css' : 'three';
  }

  nextMode() {
    return this.graphicsMode === '2D' ? '3D' : '2D';
  }

  updateButtonLabel(nextGraphicsMode) {
    const button = document.querySelector('#switchgraphics-container button');
    button.innerHTML = `Switch to ${nextGraphicsMode}`;
  }

  createButton() {
    const button = document.createElement('button');
    button.innerHTML = `Switch to ${this.nextMode()}`;
    button.onclick = () => this.setMode();
    button.style.cssText = `
      padding: 10px 20px;
      cursor: pointer;
      font-size: 16px;
      border: none;
      border-radius: 5px;
      background-color: #4CAF50;
      color: white;
    `;

    return button;
  }

  unload() {
    const container = document.getElementById('switchgraphics-container');
    if (container) {
      container.remove();
    }
  }
}

export default SwitchGraphics;
