import gui from '../gui-editor/gui.js';

class PluginsGUI {
  static id = 'gui-plugins';

  constructor(config = {}) {
    this.id = PluginsGUI.id;
  }

  init(game) {
    this.game = game;
    this.createPluginView();
    this.drawPluginTable();
    this.subscribeToPluginUpdates();
    this.game.addSystem(this.id, this);
  }

  createPluginView() {
    // Create the window using gui.window
    this.container = gui.window('pluginsContainer', 'Plugins', function () {
      game.systemsManager.removeSystem(PluginsGUI.id);
    });
  
    // Create the table for plugins
    this.pluginTable = document.createElement('table');
    this.pluginTable.id = "pluginTable";
    this.pluginTable.className = "pluginTable";
  
    let headerRow = this.pluginTable.createTHead().insertRow();
    let headerName = document.createElement('th');
    let headerStatus = document.createElement('th');
    headerName.textContent = 'Plugin Name';
    headerStatus.textContent = 'Status';
  
    headerRow.appendChild(headerName);
    headerRow.appendChild(headerStatus);
  
    // Append the table to the container's gui-content
    let guiContent = this.container.querySelector('.gui-content');
    guiContent.appendChild(this.pluginTable);
  

    console.log('appending', guiContent, 'to', this.container, 'with', this.pluginTable, 'inside');
    this.container.appendChild(guiContent);

  }
  
  drawPluginTable() {

    let plugins = this.game.plugins;
    let loadedPlugins = new Set(this.game.loadedPlugins.map(name => name.toLowerCase()));

    // Remove all previous rows except the header
    while (this.pluginTable.rows.length > 1) {
      this.pluginTable.deleteRow(1);
    }

    Object.entries(plugins).forEach(([pluginName, plugin]) => {
      let row = this.pluginTable.insertRow();
      let cellName = row.insertCell();
      let cellStatus = row.insertCell();
      let pluginId = plugins[pluginName].id;

      cellName.textContent = pluginName;

      let checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      console.log("CHECKING IF LOADED", pluginId, loadedPlugins.has(pluginId))
      console.log('lll', loadedPlugins);

      // check if plugin is in system, not if it been loaded once
      let checkSystem = this.game.systems[pluginId];

      checkbox.checked = loadedPlugins.has(pluginId);
      checkbox.disabled = plugin.removable === false;

      checkbox.addEventListener('change', () => {
        this.togglePlugin(checkbox, pluginName, pluginId);
      });

      cellStatus.appendChild(checkbox);
    });
  }

  togglePlugin(checkbox, pluginName, pluginId) {
    console.log('togglePlugin', checkbox, pluginName, pluginId)
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
      this.game.removePlugin(pluginId);
    }
  }

  subscribeToPluginUpdates() {
    // Update the plugin table when plugins are loaded or unloaded
    this.game.on('plugin::loaded', (pluginName) => {
      this.drawPluginTable();
    });
    this.game.on('plugin::unloaded', (pluginName) => {
      this.drawPluginTable();
    });
  }
  

  unload() {
    // Remove the window from the DOM
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}

export default PluginsGUI;
