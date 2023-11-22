class PluginsGUI {

  static id = 'gui-plugins';

  constructor(config = {}) {
    this.id = PluginsGUI.id;
  }

  init(game) {
    this.game = game;
    // console.log('All available plugins:', game.plugins);
    this.createPluginView();
    this.drawPluginTable();
    this.subscribeToPluginUpdates();
    this.game.addSystem(this.id, this);
  }

  createPluginView() {
    const pluginView = document.createElement('div');
    pluginView.id = 'pluginView';
    pluginView.addEventListener('click', () => this.togglePluginView());
    document.body.appendChild(pluginView);

    const toolbarHeader = document.createElement('div');
    toolbarHeader.className = 'toolbarHeader';
    toolbarHeader.textContent = 'Open Plugins ▲';
    const arrowIndicator = document.createElement('span');
    arrowIndicator.className = 'arrowIndicator';
    toolbarHeader.appendChild(arrowIndicator);
    pluginView.appendChild(toolbarHeader);

    const pluginContainer = document.createElement('div');
    pluginContainer.id = 'pluginContainer';
    pluginView.appendChild(pluginContainer);
  }


  drawPluginTable() {
    let game = this.game;
    let plugins = game.plugins;
    let loadedPlugins = game.loadedPlugins;

    let pluginContainer = document.querySelector('#pluginContainer');
    if (!pluginContainer) {
      pluginContainer = document.createElement('div');
      pluginContainer.id = "pluginContainer";
      document.body.appendChild(pluginContainer); // Append only if it doesn't exist
    }

    // Create a set for quick lookups
    let loadedPluginSet = new Set(loadedPlugins.map(name => name.toLowerCase()));

    let pluginEntries = Object.entries(plugins).sort((a, b) => {
      let [aName, aPlugin] = a;
      let [bName, bPlugin] = b;
      let aId = aPlugin.id.toLowerCase();
      let bId = bPlugin.id.toLowerCase();
      let aActive = loadedPluginSet.has(aId);
      let bActive = loadedPluginSet.has(bId);
    
      // Check for non-removable status
      let aNonRemovable = aPlugin.removable === false;
      let bNonRemovable = bPlugin.removable === false;
    
      // Sort non-removable plugins to the top
      if (aNonRemovable && !bNonRemovable) return -1;
      if (!aNonRemovable && bNonRemovable) return 1;
    
      // Then sort by active status
      if (aActive && !bActive) return -1;
      if (!aActive && bActive) return 1;
    
      // Finally, sort by ID
      return aId.localeCompare(bId);
    });
    

    pluginEntries.forEach(entry => {
      let [pluginName, plugin] = entry;
      let pluginId = plugin.id || pluginName;
      let pluginClass = this.game.plugins[pluginName];

      // check to see if the plug is not removable and not active
      // if so, do not show in list ( for now )
      if (pluginClass.removable === false && !loadedPluginSet.has(pluginId.toLowerCase())) {
        return;
      }

      let pluginCard = document.querySelector(`#card-${pluginId}`);

      if (!pluginCard) {
        // Create and append new plugin card
        pluginCard = this.createPluginCard(pluginName, pluginId, loadedPluginSet.has(pluginId.toLowerCase()));
        pluginContainer.appendChild(pluginCard);
      } else {
        // Update existing card if necessary
        let checkbox = pluginCard.querySelector('input');
        if (checkbox.checked !== loadedPluginSet.has(pluginId.toLowerCase())) {
          checkbox.checked = loadedPluginSet.has(pluginId.toLowerCase());
        }
      }
    });
  }

  createPluginCard(pluginName, pluginId, isChecked) {
    let game = this.game;
    let pluginClass = this.game.plugins[pluginName];
    let loadedPlugins = game.loadedPlugins;
    let pluginCard = document.createElement('div');

    pluginCard.className = 'pluginCard';
    pluginCard.id = `card-${pluginId}`;

    let pluginNameElement = document.createElement('div');
    pluginNameElement.className = 'pluginName';
    pluginNameElement.textContent = pluginName;

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = loadedPlugins.includes(pluginId.toLowerCase());

    if (pluginClass.removable === false) {
      // disable the checkbox
      checkbox.disabled = true;
      // add title indicating that live plugin reloading not available for this plugin
      let altText = 'Live plugin reloading not available for this plugin';
      pluginCard.title = altText;
      checkbox.title = altText;
    }


    pluginCard.addEventListener('click', (e) => {
      // Only toggle if the clicked element is not the checkbox
      if (e.target !== checkbox) {
        // check if the checkbox is disabled
        if (!checkbox.disabled) {
          checkbox.checked = !checkbox.checked;
          this.togglePlugin(checkbox, pluginName, pluginId);
        }
      }
      e.stopPropagation();
    });

    // Add an event listener to the checkbox
    checkbox.addEventListener('click', (e) => {
      e.stopPropagation(); // Stop the event from bubbling up to the pluginCard
      this.togglePlugin(checkbox, pluginName);
    });

    pluginCard.appendChild(pluginNameElement);
    pluginCard.appendChild(checkbox);
    //pluginContainer.appendChild(pluginCard);

    return pluginCard;
  }

  togglePlugin(checkbox, pluginName, pluginId) {
    if (checkbox.checked) {
      // check to see if the plugin is already loaded
      // if so, just call reload
      if (this.game._plugins[pluginId]) {
        this.game._plugins[pluginId].reload();
      } else {
        let pluginInstance = new this.game.plugins[pluginName]();
        this.game.use(pluginInstance);
      }
    } else {
      // this.game.removeSystem(this.game.plugins[pluginName].id);
      this.game.removePlugin(this.game.plugins[pluginName].id);
    }
  }

  subscribeToPluginUpdates() {
    this.game.on('plugin::loaded', (pluginName) => {
      // check the checkbox
      let checkbox = document.querySelector(`#card-${pluginName} input`);
      if (!checkbox) {
        // if the plugin has not yet been rendered, we need to render it
        // redraw the plugin table
        this.drawPluginTable();
      } else {
        checkbox.checked = true;
      }
    });
  }

  togglePluginView() {
    const pluginView = document.getElementById('pluginView');
    const arrowIndicator = document.querySelector('.arrowIndicator');
    const isExpanded = pluginView.classList.contains('expanded');
    const toolbarHeader = document.querySelector('.toolbarHeader');

    toolbarHeader.textContent = isExpanded ? 'Open Plugins ▲' : 'Close Plugins ▼';
    pluginView.classList.toggle('expanded', !isExpanded);
    
    //arrowIndicator.textContent = isExpanded ? '▲' : '▼'; // Change arrow direction
  }

  unload() {
    // Cleanup if needed
    // removes all elements that were created
    // console.log('unloading plugins gui');
    const pluginView = document.getElementById('pluginView');
    if (pluginView) {
      pluginView.remove();
    }
    // unbind all events
    // this.game.off('plugin::loaded');
  }
}

export default PluginsGUI;
