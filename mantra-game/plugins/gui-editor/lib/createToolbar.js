import GraphicsSelector from './GraphicsSelector.js';
import WorldSelector from './WorldSelector.js';
import ToolbarMenu from './ToolbarMenu.js';

export default function createToolbar() {

  // Create menus
  const $fileMenu = this.createMenu('File');

  const toolbarMenu = new ToolbarMenu();
  this.toolbarMenu = toolbarMenu;

  // create image icon with source of ./vendor/feather/eye.svg
  let inspectorIcon = this.createIcon('search');
  inspectorIcon.src = './vendor/feather/search.svg';
  inspectorIcon.style.cursor = 'pointer';
  inspectorIcon.title = 'Click to open Entity Inspector';
  inspectorIcon.style.width = '36px';
  inspectorIcon.style.height = '36px';
  inspectorIcon.style.paddingTop = '24px';
  inspectorIcon.style.marginRight = '30px';
  inspectorIcon.style.marginLeft = '10px';
  // TODO: have this change values based on open / cloase state
  // . Click in-game on Entity to Inspect
  inspectorIcon.onclick = () => this.showInspector();

  toolbarMenu.addElement('secondary', inspectorIcon);

  toolbarMenu.addItem('primary', {
    text: 'Mantra',
    icon: this.createIcon('slack'),
    subItems: [
      { text: 'View Source', onClick: () => this.showSourceCode() },
      { text: 'About Mantra', onClick: () => alert('Open Mantra Github') },
      { text: 'Deploy World to Yantra', onClick: () => alert('Open Yantra') }
    ]
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
  // graphicsSelectorItem.appendChild(graphicsIcon);
  graphicsSelectorItem.appendChild(graphicsSelector.selectBox);
  graphicsSelectorItem.title = 'Select Graphics Engine';

  const worldSelector = new WorldSelector(this.game);
  worldSelector.selectBox.style.fontSize = '22px';
  worldSelector.selectBox.style.cursor = 'pointer';
  worldSelector.selectBox.style.margin = '20px';


  let worldSelectorItem = document.createElement('div');
  // worldSelectorItem.appendChild(worldIcon);
  worldSelectorItem.appendChild(worldSelector.selectBox);
  worldSelectorItem.title = 'Select World';
  /*
  worldSelectorItem.onmousedown = () => {
    worldSelector.selectBox.click();
  };
  */

  toolbarMenu.addElement('secondary', worldSelectorItem);
  toolbarMenu.addElement('secondary', graphicsSelectorItem);

  // Append the toolbar to the body
  $('body').append(toolbarMenu.toolbar);
}
