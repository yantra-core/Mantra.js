class Editor {

  static id = 'gui-editor';

  constructor({ sourceCode } = {}) {
    this.id = Editor.id;
    this.sourceCode = sourceCode;
  }

  init(game) {
    this.game = game;
    this.dropdownTimers = new Map(); // To manage delayed close timers

    // Check for jQuery
    if (typeof $ === 'undefined') {
      console.log('$ is not defined, attempting to load jQuery from vendor');
      game.loadScripts([
        '/vendor/jquery.min.js'
      ], () => {
        console.log('All jQuery scripts loaded sequentially, proceeding with initialization');
        this.jqueryReady();
      });
    } else {
      this.jqueryReady();
    }
    game.use(new this.game.plugins.PluginsGUI());

  }

  jqueryReady() {
    this.createToolbar();
    this.setupGlobalClickListener();
    // this.createViewSourceModal();

  }

  createToolbar() {
    const $toolbar = $('<div>', { id: 'editorToolbar', class: 'editor-toolbar' });

    // Create menus
    const $fileMenu = this.createMenu('File');
    const $pluginsMenu = this.createMenu('Plugins', this.showPluginsGUI.bind(this));
    const $eventsMenu = this.createMenu('Events', this.showEventsInspector.bind(this));
    const $controlsMenu = this.createMenu('Controls', this.showControls.bind(this));
    const $inspectorMenu = this.createMenu('Inspector', this.showInspector.bind(this));
    // const $aboutMenu = this.createMenu('About');
    // TODO: add optional xstate menu for editing / viewing state machines

    // Populate menus
    this.populateFileMenu($fileMenu);
    this.populatePluginsMenu($pluginsMenu);

    // TODO: about links
    //this.populateAboutMenu($aboutMenu);

    // Append menus to the toolbar
    $toolbar.append($fileMenu, $pluginsMenu, $eventsMenu, $controlsMenu, $inspectorMenu);

    // Append the toolbar to the body
    $('body').append($toolbar);
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

  showPluginsGUI() {
    let game = this.game;
    if (typeof game.systems['gui-plugins'] === 'undefined') {
      game.use(new this.game.plugins.PluginsGUI());
    }
    // Functionality to show plugins GUI
    if (this.game.systems['gui-plugins']) {
      this.game.systems['gui-plugins'].togglePluginView();
    }
  }

  showEventsInspector() {
    let game = this.game;
    console.log('showEventsInspector', game.systems['gui-event-inspector'])
    if (typeof game.systems['gui-event-inspector'] === 'undefined') {
      game.use(new this.game.plugins.EventInspector());
    } else {
      this.game.systemsManager.removeSystem('gui-event-inspector');
    }
  }

  showControls() {
    let game = this.game;
    if (typeof game.systems['gui-controls'] === 'undefined') {
      game.use(new this.game.plugins.ControlsGUI());
      this.game.systems['gui-controls'].drawTable();
    } else {
      this.game.systemsManager.removeSystem('gui-controls');
    }
  }

  showInspector () {
    let game = this.game;
    console.log('showInspector', game.systems['gui-inspector'])
    if (typeof game.systems['gui-inspector'] === 'undefined') {
      game.use(new this.game.plugins.Inspector());
    } else {
      this.game.systemsManager.removeSystem('gui-inspector');
    }
  }

  createViewSourceModal() {
    // Create modal structure
    const $modal = $('<div>', { id: 'sourceCodeModal', class: 'modal' });
    const $modalContent = $('<div>', { class: 'modal-content' });
    const $closeSpan = $('<span>', { class: 'close', text: '×' });
    const $sourcePre = $('<pre>', { id: 'sourceCode' });

    $modalContent.append($closeSpan, $sourcePre);
    $modal.append($modalContent);

    // Append the modal to the body
    $('body').append($modal);

    // Close event
    $closeSpan.on('click', () => $modal.hide());
    $(window).on('click', (event) => {
      if ($(event.target).is($modal)) {
        $modal.hide();
      }
    });
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