import createToolbar from './lib/createToolbar.js';

class Editor {

  static id = 'gui-editor';
  static async = true;

  constructor({ sourceCode, sutraEditor = false } = {}) {
    this.id = Editor.id;
    this.sourceCode = sourceCode;
    this.sutraEditor = sutraEditor;
    this.createToolbar = createToolbar.bind(this);
  }

  init(game) {
    this.game = game;
    // register the plugin with the game
    // this.game.systemsManager.addSystem(this.id, this);

    document.body.style.perspective = 'none';

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
    this.game.systemsManager.addSystem(this.id, this);

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

      // TODO: remove this code and move it into Mouse.js
      let toolbar = event.target.closest('.toolbar');

      if (this.game && this.game.systems && this.game.systems['entity-input']) {
        if (!toolbar) {
          console.log("toolbar not found")
          // re-enable inputs
          this.game.systems['entity-input'].setInputsActive();
          if (this.game.systems['keyboard']) {
            this.game.systems['keyboard'].bindInputControls();
          }
          if (this.game.systems['mouse']) {
            this.game.systems['mouse'].bindInputControls();
          }
        } else {
          console.log("toolbar found")
          // disable inputs
          this.game.systems['entity-input'].disableInputs();

          if (this.game.systems['keyboard']) {
            this.game.systems['keyboard'].unbindAllEvents();
          }
          if (this.game.systems['mouse']) {
            this.game.systems['mouse'].unbindAllEvents();
          }
          event.preventDefault();
          return false;
        }

      }


    });

    /*
 // add a global click handler to document that will delegate any clicks
    // that are not inside gui-windows to re-enable inputs
    document.addEventListener('click', (e) => {
      // check if the click was inside a gui-window
      let guiWindow = e.target.closest('.gui-container');
      if (this.game && this.game.systems && this.game.systems['entity-input'] && this.game.systems['keyboard']) {
        if (!guiWindow) {
          // re-enable inputs
          this.game.systems['entity-input'].setInputsActive();
          this.game.systems['keyboard'].bindInputControls();
        } else {
          // disable inputs
          this.game.systems['entity-input'].disableInputs();
          this.game.systems['keyboard'].unbindAllEvents();
        }

        // check to see if this is a class sutra-link, if so open the form editor
        if (e.target.classList.contains('sutra-link')) {
          let sutraPath = e.target.getAttribute('data-path');
          let node = this.behavior.findNode(sutraPath);
          // Remark: Editing / Viewing Conditionals is not yet supported
          //this.showConditionalsForm(node);
        }
      }
    });
    */



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
      /*
      game.once('plugin::loaded::gui-sutra', () => {
        game.systems['gui-sutra'].drawTable();
      });
      */
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