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
  }

  createPluginView() {
    const pluginView = document.createElement('div');
    pluginView.id = 'pluginView';
    pluginView.addEventListener('click', () => this.togglePluginView());
    document.body.appendChild(pluginView);

    const toolbarHeader = document.createElement('div');
    toolbarHeader.className = 'toolbarHeader';
    toolbarHeader.textContent = 'Open Plugins';
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
    console.log('loadedPlugins', loadedPlugins)

    let loadedPluginSet = new Set(loadedPlugins.map(name => name.toLowerCase()));

    // Sort entries first by active status, then by ID
    let pluginEntries = Object.entries(plugins).sort((a, b) => {
      let [aName, aPlugin] = a;
      let [bName, bPlugin] = b;
      let aId = aPlugin.id.toLowerCase();
      let bId = bPlugin.id.toLowerCase();
      let aActive = loadedPluginSet.has(aId);
      let bActive = loadedPluginSet.has(bId);

      if (aActive && !bActive) return -1;
      if (!aActive && bActive) return 1;
      return aId.localeCompare(bId);
    });

    pluginEntries.forEach(entry => {
      let [pluginName, plugin] = entry;
      let pluginId = plugin.id || pluginName;
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
    let loadedPlugins = game.loadedPlugins;

    let pluginCard = document.createElement('div');

    pluginCard.className = 'pluginCard';
    pluginCard.id = `card-${pluginId}`;

    let pluginNameElement = document.createElement('div');
    pluginNameElement.className = 'pluginName';
    pluginNameElement.textContent = pluginName;
    //console.log('loadedPlugins', loadedPlugins)
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = loadedPlugins.includes(pluginId.toLowerCase());

    pluginCard.addEventListener('click', (e) => {
      console.log('clicked', e.target, checkbox);
      // Only toggle if the clicked element is not the checkbox
      if (e.target !== checkbox) {
        checkbox.checked = !checkbox.checked;
        this.togglePlugin(checkbox, pluginName);
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


  togglePlugin(checkbox, pluginName) {
    console.log('ppppp', pluginName)
    if (checkbox.checked) {
      console.log('USING NEW PLUGIN', pluginName);
      let pluginInstance = new this.game.plugins[pluginName]();
      console.log('Plugin instance:', pluginInstance)
      this.game.use(pluginInstance);
    } else {
      console.log('REMOVING PLUGIN', this.game.plugins[pluginName].id);
      // this.game.removeSystem(this.game.plugins[pluginName].id);
      this.game.removePlugin(this.game.plugins[pluginName].id);

    }
  }

  subscribeToPluginUpdates() {
    this.game.on('plugin::loaded', (pluginName) => {
      // check the checkbox
      console.log('pluginName', pluginName)
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
    pluginView.classList.toggle('expanded', !isExpanded);
    arrowIndicator.textContent = isExpanded ? '▲' : '▼'; // Change arrow direction
  }


  unload() {
    // Cleanup if needed
  }
}

export default PluginsGUI;
