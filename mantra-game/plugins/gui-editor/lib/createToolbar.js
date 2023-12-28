import GraphicsSelector from './GraphicsSelector.js';
import WorldSelector from './WorldSelector.js';
import ToolbarMenu from './ToolbarMenu.js';

export default function createToolbar(game) {

  // Create menus
  const $fileMenu = this.createMenu('File');

  const toolbarMenu = new ToolbarMenu();
  this.toolbarMenu = toolbarMenu;

  game.on('entityInput::handleInputs', (entityId, input) => {
    if (input.controls && input.controls.U) {
      console.log('entityInput::handleInputs', entityId, input)
      if (toolbarMenu.toggleStatus === 'open') {
        toolbarMenu.slideOutToolbar();
      } else {
        toolbarMenu.slideInToolbar();
      }
    }
  }); 
  
  // create image icon with source of ./vendor/feather/eye.svg
  // TODO: remove featherRoot from code, quick fix for now
  let featherRoot = 'https://yantra.gg';
  let inspectorIcon = this.createIcon('search');
  inspectorIcon.src = featherRoot + '/vendor/feather/search.svg';
  inspectorIcon.style.cursor = 'pointer';
  inspectorIcon.title = 'Click to open Entity Inspector';
  inspectorIcon.style.marginRight = '10px';
  inspectorIcon.style.marginLeft = '10px';
  inspectorIcon.style.marginTop = '10px';
  inspectorIcon.style.marginBottom = '10px';
  inspectorIcon.style.filter = 'invert(100%)';
  
  // TODO: have this change values based on open / cloase state
  // . Click in-game on Entity to Inspect
  inspectorIcon.onclick = () => this.showInspector();

  toolbarMenu.addElement('secondary', inspectorIcon);

  toolbarMenu.addItem('primary', {
    text: 'Mantra',
    icon: this.createIcon('slack'),
    /*
    subItems: [
      { text: 'View Source', onClick: () => this.showSourceCode() },
      { text: 'About Mantra', onClick: () => alert('Open Mantra Github') },
      { text: 'Deploy World to Yantra', onClick: () => alert('Open Yantra') }
    ]
    */
  });

  toolbarMenu.addItem('primary', {
    text: 'Entities',
    hint: 'Manage Game Entities',
    icon: this.createIcon('box'),
    onClick: () => this.showEntities()
  });

  toolbarMenu.addItem('primary', {
    text: 'Rules',
    hint: 'Manage Game Rules with Sutra',
    icon: this.createIcon('pocket'),
    onClick: () => this.showRules()
  });

  toolbarMenu.addItem('primary', {
    text: 'Crafting',
    hint: 'Manage Game Rules with YCraft',
    icon: this.createIcon('codesandbox'),
    onClick: () => this.showCrafting()
  });

  toolbarMenu.addItem('primary', {
    text: 'Events ',
    hint: 'Manage Game Events',
    icon: this.createIcon('activity'),
    onClick: () => this.showEventsInspector()
  });

  let worldIcon = this.createIcon('globe');
  worldIcon.style.marginTop = '0px';
  worldIcon.style.paddingTop = '0px';
  worldIcon.style.position = 'relative';
  worldIcon.style.top = '10px';

  let graphicsIcon = this.createIcon('tv');
  graphicsIcon.style.marginTop = '0px';
  graphicsIcon.style.paddingTop = '0px';
  graphicsIcon.style.position = 'relative';
  graphicsIcon.style.top = '10px';

  // toolbarMenu.addItem('secondary', { text: 'Settings' });
  const graphicsSelector = new GraphicsSelector(this);
  graphicsSelector.selectBox.style.fontSize = '22px';
  graphicsSelector.selectBox.style.cursor = 'pointer';
  graphicsSelector.selectBox.style.margin = '20px';


  // create item holder for graphicsSelector
  let graphicsSelectorItem = document.createElement('div');
  graphicsSelectorItem.appendChild(graphicsIcon);

  // create text label element to show current graphics engine
  let graphicsSelectorLabel = document.createElement('span');
  graphicsSelectorLabel.style.fontSize = '22px';
  graphicsSelectorLabel.style.marginRight = '10px';
  graphicsSelectorLabel.style.marginLeft = '10px';
  graphicsSelectorLabel.style.marginTop = '10px';
  graphicsSelectorLabel.style.marginBottom = '10px';
  graphicsSelectorLabel.style.cursor = 'pointer';

  // set value to foo
  graphicsSelectorLabel.innerText = 'Switch Graphics';

  // add label to graphicsSelectorItem
  graphicsSelectorItem.appendChild(graphicsSelectorLabel);
  graphicsSelectorItem.onpointerdown = () => {
    // toggle select picker
    graphicsSelector.selectPicker.toggle();
  }

  graphicsSelectorItem.appendChild(graphicsSelector.selectBox);
  graphicsSelectorItem.title = 'Select Graphics Engine';

  const worldSelector = new WorldSelector(this.game);
  worldSelector.selectBox.style.fontSize = '22px';
  worldSelector.selectBox.style.cursor = 'pointer';
  worldSelector.selectBox.style.margin = '20px';

  let worldSelectorItem = document.createElement('div');
  worldSelectorItem.appendChild(worldIcon);

  // create text label element to show current world
  let worldSelectorLabel = document.createElement('span');
  worldSelectorLabel.style.fontSize = '22px';
  worldSelectorLabel.style.marginRight = '10px';
  worldSelectorLabel.style.marginLeft = '10px';
  worldSelectorLabel.style.marginTop = '10px';
  worldSelectorLabel.style.marginBottom = '10px';
  worldSelectorLabel.style.cursor = 'pointer';

  // set value to foo
  worldSelectorLabel.innerText = 'Switch Worlds';

  // add label to worldSelectorItem
  worldSelectorItem.appendChild(worldSelectorLabel);
  

  worldSelectorItem.onpointerdown = () => {
    // toggle select picker

    worldSelector.selectPicker.toggle();
  };

  worldSelectorItem.appendChild(worldSelector.selectBox);
  worldSelectorItem.title = 'Select World';
  /*
  worldSelectorItem.onmousedown = () => {
    worldSelector.selectBox.click();
  };
  */

  toolbarMenu.addElement('secondary', worldSelectorItem);
  toolbarMenu.addElement('secondary', graphicsSelectorItem);

  if (game.worlds.length > 0) {
    let currentWorldName = game.worlds[0].constructor.name;
    worldSelector.selectElement(currentWorldName);
  }

  if (is_touch_enabled()) {
    toolbarMenu.toolbar.style.display = 'none';
  }
  // Append the toolbar to the body
  $('body').append(toolbarMenu.toolbar);
}

// TODO: move this to a utils file
function is_touch_enabled() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}