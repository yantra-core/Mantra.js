import GraphicsSelector from './GraphicsSelector.js';
import WorldSelector from './WorldSelector.js';
import ToolbarMenu from './ToolbarMenu.js';

export default function createToolbar(game) {

  // Create menus
  const $fileMenu = this.createMenu('File');
  const toolbarMenu = new ToolbarMenu();
  this.toolbarMenu = toolbarMenu;

  let keyPressed = false;

  // TODO: this won't work if editor isn't already loaded
  // TODO: remove usage of entityInput event, use game.data.input instead?
  game.on('entityInput::handleInputs', (entityId, input) => {
    if (input.controls && input.controls.U !== undefined) {
      if (input.controls.U === true && !keyPressed) {
        keyPressed = true; // Set the flag when key is initially pressed
        // Toggle the toolbar based on its current state
        if (toolbarMenu.toggleStatus === 'open') {
          toolbarMenu.slideOutToolbar();
        } else {
          toolbarMenu.slideInToolbar();
        }
      } else if (input.controls.U === false) {
        keyPressed = false; // Reset the flag when key is released
      }
    }
  });

  // create image icon with source of ./vendor/feather/eye.svg
  // TODO: remove featherRoot from code, quick fix for now
  let featherRoot = this.game.assetRoot || 'https://yantra.gg';
  let inspectorIcon = this.createIcon('search');
  inspectorIcon.src = featherRoot + '/vendor/feather/search.svg';
  inspectorIcon.style.cursor = 'pointer';
  inspectorIcon.title = 'Click to open Entity Inspector';
  inspectorIcon.style.marginRight = '10px';
  inspectorIcon.style.marginLeft = '5px';
  //inspectorIcon.style.marginTop = '5px';
  inspectorIcon.style.width = '32px';
  inspectorIcon.style.height = '32px';
  inspectorIcon.style.bottom = '12px';
  inspectorIcon.style.left = '9px';
  inspectorIcon.style.position = 'relative';

  inspectorIcon.style.filter = 'invert(100%)';

  if (is_touch_enabled()) {
    // hide inspector icon on touch devices
    inspectorIcon.style.display = 'none';
  }

  // TODO: have this change values based on open / cloase state
  // . Click in-game on Entity to Inspect
  inspectorIcon.onclick = () => this.showInspector();

  // toolbarMenu.addElement('secondary', inspectorIcon);
  function openGithub() {
    window.open('https://github.com/yantra-core/Mantra.js', '_blank');
  }


  toolbarMenu.addItem('primary', {
    text: 'Mantra',
    icon: this.createIcon('slack'),
    onClick: () => openGithub()

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

  /*
  toolbarMenu.addItem('primary', {
    text: 'Crafting',
    hint: 'Manage Game Rules with YCraft',
    icon: this.createIcon('codesandbox'),
    onClick: () => this.showCrafting()
  });
  */

  toolbarMenu.addItem('primary', {
    text: 'Events ',
    hint: 'Manage Game Events',
    icon: this.createIcon('activity'),
    onClick: () => this.showEventsInspector()
  });

  /*
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
  graphicsSelectorLabel.innerText = 'Graphics';

  // add label to graphicsSelectorItem
  graphicsSelectorItem.appendChild(graphicsSelectorLabel);
  graphicsSelectorItem.onpointerdown = () => {

    // close world selector
    worldSelector.selectPicker.hideModal();

    // toggle select picker
    graphicsSelector.selectPicker.toggle();
  }

  graphicsSelectorItem.appendChild(graphicsSelector.selectBox);
  graphicsSelectorItem.title = 'Select Graphics Engine';
  */
  /*
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
  worldSelectorLabel.innerText = 'Worlds';

  // add label to worldSelectorItem
  worldSelectorItem.appendChild(worldSelectorLabel);

  worldSelectorItem.onpointerdown = () => {
    // hide world selector
    graphicsSelector.selectPicker.hideModal();
    // toggle select picker
    worldSelector.selectPicker.toggle();
  };

  worldSelectorItem.appendChild(worldSelector.selectBox);
  worldSelectorItem.title = 'Select World';
  */

  // Create a flex container for the selectors
  let selectorsContainer = document.createElement('div');
  selectorsContainer.style.display = 'flex'; // Enable Flexbox
  selectorsContainer.style.alignItems = 'center'; // Align items vertically in the center
  selectorsContainer.style.justifyContent = 'space-between'; // Space out items
  selectorsContainer.style.margin = '20px'; // Add some margin for aesthetics

  selectorsContainer.appendChild(inspectorIcon);
  //selectorsContainer.appendChild(graphicsSelectorItem);
  //selectorsContainer.appendChild(worldSelectorItem);
  toolbarMenu.addElement('secondary', selectorsContainer);
  
  if (game.worlds.length > 0) {
    let currentWorldName = game.worlds[0].constructor.name;
    // worldSelector.selectElement(currentWorldName);
  }

  // toolbarMenu.toolbar.style.display = 'none';
  toolbarMenu.slideOutToolbar()

  // Append the toolbar to the body
  $('body').append(toolbarMenu.toolbar);
}

// TODO: move this to a utils file
function is_touch_enabled() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}