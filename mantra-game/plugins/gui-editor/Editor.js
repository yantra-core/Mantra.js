class Editor {

  static id = 'gui-editor';

  constructor() {
    this.id = Editor.id;
  }

  init(game) {
    this.game = game;
    this.dropdownTimers = new Map(); // To manage delayed close timers

    // Check for jQuery
    if (typeof $ === 'undefined') {
      console.log('$ is not defined, attempting to load jQuery from vendor');
      game.loadScripts(['/vendor/jquery.min.js'], () => {
        console.log('All jQuery scripts loaded sequentially, proceeding with initialization');
        this.jqueryReady();
      });
    } else {
      this.jqueryReady();
    }
  }

  jqueryReady() {
    this.createToolbar();
    this.setupGlobalClickListener();
  }

  createToolbar() {
    const $toolbar = $('<div>', { id: 'editorToolbar', class: 'editor-toolbar' });

    // Create menus
    const $fileMenu = this.createMenu('File');
    const $pluginsMenu = this.createMenu('Plugins', this.showPluginsGUI.bind(this));
    const $aboutMenu = this.createMenu('About');

    // Populate menus
    this.populateFileMenu($fileMenu);
    this.populatePluginsMenu($pluginsMenu);
    this.populateAboutMenu($aboutMenu);

    // Append menus to the toolbar
    $toolbar.append($fileMenu, $pluginsMenu, $aboutMenu);

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
    const $newItem = $('<a>', { href: '#', text: 'Deploy to Yantra Cloud' });
    $dropdownContent.append($newItem);

    const $viewSource = $('<a>', { href: '#', text: 'View Source' });
    $dropdownContent.append($viewSource);

    const $aboutMantra = $('<a>', { href: '#', text: 'About Mantra' });
    $dropdownContent.append($aboutMantra);

    // Repeat for other File menu items...
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
    // Functionality to show plugins GUI
    console.log('tttt', this.game)
    if (this.game.systems['gui-plugins']) {
      this.game.systems['gui-plugins'].togglePluginView();
    }
  }
}

export default Editor;