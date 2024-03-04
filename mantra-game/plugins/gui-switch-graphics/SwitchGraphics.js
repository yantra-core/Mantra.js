// SwitchGraphics.js - Marak Squires 2024
class SwitchGraphics {
  static id = 'gui-switch-graphics';
  static containerId = 'switchgraphics-container';

  constructor(config = {}) {
    this.graphicsMode = config.graphicsMode || '2D';
    this.game = null;
    this.id = SwitchGraphics.id;
    this.button = null;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem(SwitchGraphics.id, this);
    if (!document.getElementById(SwitchGraphics.containerId)) {
      this.createUI();
    }
  }

  // TODO: implement build() method for SwitchGraphics() so it can be component in UI

  setMode() {
    const nextGraphicsMode = this.nextMode();
    this.graphicsMode = nextGraphicsMode;
    this.game.switchGraphics(this.lookupGraphicsPlugin(nextGraphicsMode));
    this.updateButtonLabel();
  }

  update() {
    const currentGraphicsId = this.game.graphics.length ? this.game.graphics[0].id : '';
    const expectedMode = currentGraphicsId === 'graphics-three' ? '3D' : '2D';

    if (this.graphicsMode !== expectedMode) {
      this.graphicsMode = expectedMode;
      this.updateButtonLabel();
    }
  }

  createUI() {
    const container = this.createContainer();
    this.button = this.createButton();
    container.appendChild(this.button);
    document.body.appendChild(container);
  }

  createContainer() {
    const container = document.createElement('div');
    container.id = SwitchGraphics.containerId;
    container.className = 'switchgraphics-container';
    container.style.cssText = `
      position: absolute;
      top: 40px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      padding-top: 10px;
      z-index: 11111;
    `;
    return container;
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

  updateButtonLabel() {
    if (this.button) {
      this.button.innerHTML = `Switch to ${this.nextMode()}`;
    }
  }

  nextMode() {
    return this.graphicsMode === '2D' ? '3D' : '2D';
  }

  lookupGraphicsPlugin(graphicsMode) {
    return graphicsMode === '2D' ? 'css' : 'three';
  }

  unload() {
    const container = document.getElementById(SwitchGraphics.containerId);
    if (container) {
      container.remove();
    }
  }
}

export default SwitchGraphics;
