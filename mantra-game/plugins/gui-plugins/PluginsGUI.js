class PluginsGUI {
  constructor(config = {}) {
    this.name = 'PluginsGUI';
  }

  init(game) {
    this.game = game;
    // console.log('All available plugins:', game.plugins);
    this.drawPluginTable();
  }

  drawPluginTable() {
    let game = this.game;
    let plugins = game.plugins;
    let loadedPlugins = game.loadedPlugins

    // remove the pluginContainer if it already exists
    let existingPluginContainer = document.querySelector('#pluginContainer');
    if (existingPluginContainer) {
      existingPluginContainer.remove();
    }

    let pluginContainer = document.createElement('div');
    pluginContainer.id = "pluginContainer";

    // Create an array of plugin names
    // let pluginNames = Object.keys(plugins);
    let pluginNames = [];
    for (let pluginName in plugins) {
      pluginNames.push(plugins[pluginName].name);
    }

    // Sort the plugin names alphabetically and then by activated status
    pluginNames.sort((a, b) => {
        let aActive = loadedPlugins.includes(a.toLowerCase());
        let bActive = loadedPlugins.includes(b.toLowerCase());

        if (aActive === bActive) {
            return a.localeCompare(b); // Alphabetical sort if both have the same active status
        }
        return aActive ? -1 : 1; // Active plugins come first
    });

    // Iterate through the sorted array
    pluginNames.forEach(pluginName => {
        let pluginCard = document.createElement('div');
        pluginCard.className = 'pluginCard';
        pluginCard.id = `card-${pluginName}`;

        let pluginNameElement = document.createElement('div');
        pluginNameElement.className = 'pluginName';
        pluginNameElement.textContent = pluginName;

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = loadedPlugins.includes(pluginName.toLowerCase());

        // Add click listener to the card, not the checkbox
        pluginCard.addEventListener('click', (e) => {
            if (e.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
                this.togglePlugin(checkbox, pluginName);
            }
        });

        pluginCard.appendChild(pluginNameElement);
        pluginCard.appendChild(checkbox);
        pluginContainer.appendChild(pluginCard);
    });


    let pluginView = document.createElement('div');
    pluginView.id = "pluginView";

    let closeButton = document.createElement('span');
    closeButton.id = "closeButton";
    closeButton.className = "closeButton";
    closeButton.textContent = 'X';
    closeButton.addEventListener('click', function () {
      pluginView.style.display = 'none';
    });

    pluginView.appendChild(closeButton);
    pluginView.appendChild(pluginContainer);
    document.body.appendChild(pluginView);
    this.subscribeToPluginUpdates();
  }

  togglePlugin(checkbox, pluginName) {
    if (checkbox.checked) {
      console.log('USING NEW PLUGIN', pluginName);
      let pluginInstance = new this.game.plugins[pluginName]();
      console.log('Plugin instance:', pluginInstance)
      this.game.use(pluginInstance);
    } else {
      console.log('REMOVING PLUGIN', pluginName);
      this.game.removeSystem(pluginName);
    }
  }

  subscribeToPluginUpdates() {
    this.game.on('pluginLoaded', (pluginName) => {
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


  destroy() {
    // Cleanup if needed
  }
}

export default PluginsGUI;
