export default function createToolbar() {
  // const $toolbar = $('<div>', { id: 'editorToolbar', class: 'editor-toolbar' });

  // Create menus
  const $fileMenu = this.createMenu('File');
  // const $pluginsMenu = this.createMenu('Plugins', this.showPluginsGUI.bind(this));
  /*
  const $eventsMenu = this.createMenu('Events', this.showEventsInspector.bind(this));
  const $controlsMenu = this.createMenu('Controls', this.showControls.bind(this));
  const $entitiesMenu = this.createMenu('Entities', this.showEntities.bind(this));
  const $rulesMenu = this.createMenu('Rules', this.showRules.bind(this));
  */

  const $graphicsSelector = new GraphicsSelector(this);
  const $worldSelector = new WorldSelector(this.game);

  const toolbarMenu = new ToolbarMenu();
  this.toolbarMenu = toolbarMenu;

  // create image icon with source of ./vendor/feather/eye.svg
  let inspectorIcon = this.createIcon('search');
  inspectorIcon.src = './vendor/feather/search.svg';
  inspectorIcon.style.cursor = 'pointer';
  // adds helper tooltip
  inspectorIcon.title = 'Click to open Entity Inspector';
  // TODO: have this change values based on open / cloase state
  // . Click in-game on Entity to Inspect
  inspectorIcon.onclick = () => this.showInspector();
  // black background
  // invert color

  let worldIcon = this.createIcon('globe');
  let graphicsIcon = this.createIcon('tv');

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


  /*
  toolbarMenu.addItem('primary', {
    text: 'Inspector'
  });
  */

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


  // toolbarMenu.addItem('secondary', { text: 'Settings' });

  $graphicsSelector.selectBox.style.fontSize = '22px';
  $graphicsSelector.selectBox.style.cursor = 'pointer';
  $worldSelector.selectBox.style.fontSize = '22px';
  $worldSelector.selectBox.style.cursor = 'pointer';

  toolbarMenu.addElement('secondary', worldIcon);

  toolbarMenu.addElement('secondary',   $worldSelector.selectBox);
  toolbarMenu.addElement('secondary', graphicsIcon);
  toolbarMenu.addElement('secondary', $graphicsSelector.selectBox);

  // Append the toolbar to the body
  $('body').append(toolbarMenu.toolbar);
}
