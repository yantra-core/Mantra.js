import gui from '../gui-editor/gui.js';
import pluginsList from './pluginsList.js';

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
    let game = this.game;
    // Create the window using gui.window
    this.container = gui.window('pluginsContainer', 'Plugins', function () {
      game.systemsManager.removeSystem(PluginsGUI.id);
    });
  
    // Create the table for plugins
    this.pluginTable = document.createElement('table');
    this.pluginTable.id = "pluginTable";
    this.pluginTable.className = "pluginTable";
    console.log("CREATINT TABLE", this.pluginTable)
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
    const game = this.game;
    // Ensure that pluginsList is an array
    const systemPlugins = Array.isArray(pluginsList) ? pluginsList : Object.keys(pluginsList);
    
    // Map to store the plugin name and its loaded status
    const pluginStatusMap = new Map();
  
    // Iterate over game._plugins to get the plugin names and their loaded status
    for (let p in game._plugins) {
      let pluginName = game._plugins[p].constructor.name;
      pluginStatusMap.set(pluginName, true); // true indicates the plugin is loaded
    }
  
    // Add system plugins to the map if not already present
    systemPlugins.forEach(pluginId => {
      if (!pluginStatusMap.has(pluginId)) {
        pluginStatusMap.set(pluginId, false); // false indicates the plugin is not loaded
      }
    });
    
    // Separate plugins into checked and unchecked
    const checkedPlugins = [];
    const uncheckedPlugins = [];
    const pluginList = document.createElement('ul');
    pluginList.className = "pluginList";
  
    pluginStatusMap.forEach((isChecked, pluginName) => {
      const listItem = document.createElement('li');
      listItem.className = "pluginItem";
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = isChecked;
      checkbox.id = `checkbox-${pluginName.replace(/\s+/g, '-')}`;
      checkbox.className = "pluginCheckbox";
  
      checkbox.addEventListener('change', () => {
        this.togglePlugin(checkbox, pluginName);
      });
  
      const label = document.createElement('label');
      label.setAttribute('for', checkbox.id);
      label.textContent = pluginName;
      label.className = "pluginLabel";
      listItem.appendChild(checkbox);
  
      listItem.appendChild(label);
      pluginList.appendChild(listItem);
    });
  
    // Replace the existing table with the newly created list
    this.pluginTable.replaceWith(pluginList);
    this.pluginTable = pluginList; // Update the reference to the new list
  
    // Append checked plugins first, then unchecked
    checkedPlugins.forEach(row => this.pluginTable.appendChild(row));
    uncheckedPlugins.forEach(row => this.pluginTable.appendChild(row));
  }

  togglePlugin(checkbox, pluginName, pluginId) {
    console.log('togglePlugin', checkbox, pluginName, pluginId)
    if (checkbox.checked) {
      // check to see if the plugin is already loaded
      // if so, just call reload
      if (this.game._plugins[pluginId]) {
        this.game._plugins[pluginId].reload();
      } else {
        // let pluginInstance = new this.game.plugins[pluginName]();
        this.game.use(pluginName);
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
    this.game.on('plugin::ready', (pluginName) => {
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
