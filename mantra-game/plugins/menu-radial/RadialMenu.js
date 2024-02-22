export default class RadialMenu {
  static id = 'gui-radial-menu';

  constructor(config = {}) {
    this.id = RadialMenu.id;
    this.items = config.items || []; // Array of item names or objects with more properties
    let windowWidth = window.innerWidth;
    this.radius = config.radius || windowWidth / 6; // Use the provided radius or a fraction of the window width
    this.visible = false;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem(this.id, this);

    for (let i = 0; i < 6; i++) {
      this.items.push({
        name: `Item ${i}`,
        label: `Item ${i}`,
        image: '/img/game/tiles/tile-block.png',
        value: i,
        action: 'foo'
      });
    }

    // bind event to middle mouse button
    game.on('pointerDown', (context, event) => {
      console.log('pointerDown', context, event);
      if (context.buttons.MIDDLE) {
        this.toggle();
        event.preventDefault();
      }
    });

    this.createUI();
    this.showMenu(); // Initially show the menu
  }

  createUI() {
    this.angleIncrement = (2 * Math.PI) / this.items.length;

    const menuContainer = this.createMenuContainer();
    this.items.forEach((item, index) => {
      const itemElement = this.createMenuItem(item, index);
      menuContainer.appendChild(itemElement);
    });

    document.body.appendChild(menuContainer);
  }

  createMenuContainer() {
    const container = document.createElement('div');
    container.id = 'radial-menu-container';
    container.className = 'radial-menu-container';
    container.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      width: ${this.radius * 2}px;
      height: ${this.radius * 2}px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      transition: transform 0.5s;
    `;

    document.addEventListener('click', (event) => {
      if (!container.contains(event.target)) {
        this.hideMenu();
      }
    });

    return container;
  }

  createMenuItem(item, index) {
    const angle = this.angleIncrement * index;
    let x = Math.cos(angle) * this.radius + this.radius - (this.radius * 0.2);
    let y = Math.sin(angle) * this.radius + this.radius - (this.radius * 0.2);

    let menuItemSize = this.radius * 0.4;
    let minFontSize = 4;
    let labelFontSize = Math.max(minFontSize, Math.log(this.radius) * 0.4);
    labelFontSize = Math.round(labelFontSize);

    const menuItem = document.createElement('div');
    menuItem.className = 'radial-menu-item';
    menuItem.style.cssText = `
      position: absolute;
      top: ${y}px;
      left: ${x}px;
      width: ${menuItemSize}px;
      height: ${menuItemSize}px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    `;

    const itemImage = document.createElement('img');
    itemImage.src = item.image;
    itemImage.style.cssText = `
      width: 70%;
      height: auto;
      max-width: 100%;
      margin: auto;
    `;

    const itemLabel = document.createElement('div');
    itemLabel.textContent = item.label;
    itemLabel.style.cssText = `
      color: #FFFFFF;
      font-size: ${labelFontSize}px;
      text-align: center;
      overflow: hidden;
      height: 20%;
    `;

    menuItem.appendChild(itemImage);
    menuItem.appendChild(itemLabel);

    menuItem.onclick = () => {
      this.selectItem(item);
    };

    return menuItem;
  }

  selectItem(item) {
    console.log(`Item selected: ${item.name}`);
    this.hideMenu();
  }

  toggle() {
    console.log('hhtogglehhh' ,this.visible)
    if (this.visible) {
      this.hideMenu();
    } else {
      this.showMenu();
    }
  }

  hideMenu() {
    this.visible = false;
    this.spinClockWiseAndShrink();
  }

  showMenu() {
    this.visible = true;
    const menuContainer = document.getElementById('radial-menu-container');
    if (menuContainer) {
      this.spinCounterClockWiseAndExpand();
    }
  }

  spinClockWiseAndShrink() {
    const menuContainer = document.getElementById('radial-menu-container');
    if (menuContainer) {
      menuContainer.style.transform = 'translate(-50%, -50%) scale(0) rotate(360deg)';
    }
  }

  spinCounterClockWiseAndExpand() {
    const menuContainer = document.getElementById('radial-menu-container');
    if (menuContainer) {
      menuContainer.style.transform = 'translate(-50%, -50%) scale(1) rotate(-360deg)';
    }
  }
}
