import GraphicsSelector from './lib/GraphicsSelector.js';
import WorldSelector from './lib/WorldSelector.js';
import ToolbarMenu from './lib/ToolbarMenu.js';

class Editor {

  static id = 'gui-editor';
  static async = true;

  constructor({ sourceCode, sutraEditor = false } = {}) {
    this.id = Editor.id;
    this.sourceCode = sourceCode;
    this.sutraEditor = sutraEditor;
  }

  init(game) {
    this.game = game;
    // register the plugin with the game
    // this.game.systemsManager.addSystem(this.id, this);

    this.dropdownTimers = new Map(); // To manage delayed close timers

    // Check for jQuery
    if (typeof $ === 'undefined') {
      console.log('$ is not defined, attempting to load jQuery from vendor');
      game.loadScripts([
        '/vendor/jquery.min.js',
        '/worlds.mantra.js'
      ], () => {
        console.log('All jQuery scripts loaded sequentially, proceeding with initialization');
        this.jqueryReady();
      });
    } else {
      this.jqueryReady();
    }
    // game.use(new this.game.plugins.PluginsGUI());

  }

  jqueryReady() {
    this.createToolbar();
    this.setupGlobalClickListener();
    // this.createViewSourceModal();

  }

  createIcon (name) {
    let element = document.createElement('img');
    element.src = `./vendor/feather/${name}.svg`;
    element.classList.add('feather-icon');
    element.style.width = '36px';
    element.style.height = '36px';
    element.style.paddingTop = '5px';
    // element.style.marginRight = '10px';
    element.style.cursor = 'pointer';
    element.style.filter = 'invert(100%)';
    return element
  }

  createToolbar() {
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

  createMenu(menuTitle, onClickAction = null) {
    const $menu = $('<div>', { class: 'menu' });
    const $button = $('<button>').text(menuTitle);

    if (onClickAction) {
      $button.on('click', onClickAction);
    } else {
      const $dropdownContent = $('<div>', { class: 'dropdown-content' });
      $menu.append($dropdownContent);
      $button.on('click', () => {
        this.closeAllDropdowns();
        $dropdownContent.toggleClass('show');
      });

      // Handle mouseout event
      $dropdownContent.on('mouseout', () => {
        this.dropdownTimers.set($dropdownContent[0], setTimeout(() => {
          $dropdownContent.removeClass('show');
        }, 333));
      });

      // Cancel the timer if the mouse re-enters
      $dropdownContent.on('mouseover', () => {
        if (this.dropdownTimers.has($dropdownContent[0])) {
          clearTimeout(this.dropdownTimers.get($dropdownContent[0]));
          this.dropdownTimers.delete($dropdownContent[0]);
        }
      });
    }

    $menu.append($button);
    return $menu;
  }

  populateFileMenu($menu) {
    const $dropdownContent = $menu.find('.dropdown-content');

    const $viewSource = $('<a>', { href: '#', text: 'View Source' });
    $viewSource.on('click', () => this.showSourceCode()); // Add click handler
    $dropdownContent.append($viewSource);

    const $deployWorld = $('<a>', { href: 'https://yantra.gg/game-dev-quickstart/deploy-world', text: 'Deploy to Yantra Cloud', target: '_blank' });
    $dropdownContent.append($deployWorld);

    const $pluginsView = $('<a>', { href: '#', text: 'Plugins' });
    $pluginsView.on('click', () => this.showPluginsGUI()); // Add click handler
    $dropdownContent.append($pluginsView);

    const $aboutMantra = $('<a>', { href: 'https://github.com/yantra-core/mantra', text: 'About Mantra', target: '_blank' });
    $dropdownContent.append($aboutMantra);

  }

  populatePluginsMenu($menu) {
    const $dropdownContent = $menu.find('.dropdown-content');
    const $newItem = $('<a>', { href: '#', text: 'Plugins' });
    $dropdownContent.append($newItem);
    // Repeat for other Plugins menu items...
  }

  populateAboutMenu($menu) {
    const $dropdownContent = $menu.find('.dropdown-content');
    const $githubLink = $('<a>', { href: 'https://github.com/yantra-core/mantra', text: 'Mantra GitHub Repository' });
    $dropdownContent.append($githubLink);

    //const $yantraSDK = $('<a>', { href: 'https://github.com/yantra-core/', text: 'Yantra SDK' });
    //$dropdownContent.append($yantraSDK);

    const $yantraLink = $('<a>', { href: 'https://yantra.gg', text: 'Yantra Serverless Hosting' });
    $dropdownContent.append($yantraLink);
    // Repeat for other About menu items...
  }

  setupGlobalClickListener() {
    $(document).on('click', (event) => {
      if (!$(event.target).closest('.menu button').length) {
        this.closeAllDropdowns();
      }
    });
  }

  closeAllDropdowns() {
    $('.dropdown-content.show').each((index, dropdown) => {
      $(dropdown).removeClass('show');
      const timer = this.dropdownTimers.get(dropdown);
      if (timer) {
        clearTimeout(timer);
        this.dropdownTimers.delete(dropdown);
      }
    });
  }

  showCrafting () {
    let game = this.game;
    if (typeof game.systems['gui-ycraft'] === 'undefined') {
      game.use('YCraft');
      game.use('YCraftGUI');
    } else {
      this.game.systemsManager.removeSystem('gui-ycraft');
    }
  }

  showRules() {
    let game = this.game;
    if (typeof game.systems['gui-sutra'] === 'undefined') {
      game.once('plugin::loaded::gui-sutra', () => {
        game.systems['gui-sutra'].drawTable();
      });
      game.use('SutraGUI');

    } else {
      this.game.systemsManager.removeSystem('gui-sutra');
    }
  }

  showPluginsGUI() {
    let game = this.game;
    if (typeof game.systems['gui-plugins'] === 'undefined') {
      game.use('PluginsGUI');
    } else {
      this.game.systemsManager.removeSystem('gui-plugins');
    }
  }

  showEventsInspector() {
    let game = this.game;
    if (typeof game.systems['gui-event-inspector'] === 'undefined') {
      game.use('EventInspector');
    } else {
      this.game.systemsManager.removeSystem('gui-event-inspector');
    }
  }

  showControls() {
    let game = this.game;
    if (typeof game.systems['gui-controls'] === 'undefined') {
      game.once('plugin::ready::gui-controls', () => {
        alert('plugin::ready::gui-controls')
        this.game.systems['gui-controls'].drawTable();
      });
      game.use('ControlsGUI');

    } else {
      this.game.systemsManager.removeSystem('gui-controls');
    }
  }

  showInspector() {
    let game = this.game;
    if (typeof game.systems['gui-inspector'] === 'undefined') {
      game.use('Inspector');
    } else {
      this.game.systemsManager.removeSystem('gui-inspector');
    }
  }

  showEntities() {
    let game = this.game;
    if (typeof game.systems['gui-entities'] === 'undefined') {
      game.use('EntitiesGUI');
      // this.game.systems['gui-entities'].drawTable();
    } else {
      this.game.systemsManager.removeSystem('gui-entities');
    }
  }

  showSourceCode() {
    const sourceCode = document.documentElement.outerHTML;
    console.log(sourceCode)
    // open new link to github
    window.open(this.sourceCode, '_blank');
    //$('#sourceCode').text(sourceCode);
    //$('#sourceCodeModal').show();
  }

}

export default Editor;