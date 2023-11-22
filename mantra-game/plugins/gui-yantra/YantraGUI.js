class YantraGUI {

  static id = 'gui-yantra';

  constructor(config = {}) {
    this.id = YantraGUI.id;
    this.logContainer = null;
    this.logTextArea = null;
    this.metadataContainer = null;
  }

  init(game) {
    this.game = game;
    this.createDisplay();
    // Subscribe to relevant events or game updates
    let self = this;
    game.on('server::discovery::polling', function(data){
      console.log('server::discovery', data);
      self.updateLog(data.message);
    });
    game.on('server::discovery::best-server', function(data){
      console.log('server::discovery::best-server', data);
      console.log('data', data)
      let bestServer = data.data[0];
      let filteredData = {
        region: bestServer.region,
        activePlayers: bestServer.activePlayers,
        processId: bestServer.processId,
        hostId: bestServer.hostId,
        mode: bestServer.mode,
        settings: bestServer.settings
      };
      self.updateLog(JSON.stringify(filteredData, true, 2));
      setTimeout(function(){
        // hide the logContainer
        self.logContainer.style.display = 'none';
      }, 4444)
      // self.updateMetadata(data.data);
    });

  }

  createDisplay() {
    // Create and style the log container
    this.logContainer = document.createElement('div');
    this.logContainer.id = 'logContainer';
    this.applyStyles(this.logContainer, {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '20px',
      positon: 'absolute',
      top: '100px',
      left: '0'
    });

    // Create and style the log text area
    this.logTextArea = document.createElement('textarea');
    this.logTextArea.id = 'yantraLogTextArea';
    this.logTextArea.readOnly = true;
    this.applyStyles(this.logTextArea, {
      width: '60%',
      height: '400px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '10px',
      boxSizing: 'border-box',
      overflowY: 'scroll'
    });

    // Create and style the metadata container
    /*
    this.metadataContainer = document.createElement('div');
    this.metadataContainer.id = 'yantraMetadataContainer';
    this.applyStyles(this.metadataContainer, {
      width: '35%',
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '10px',
      boxSizing: 'border-box'
    });
    */

    // Append elements to the log container and then to the body
    this.logContainer.appendChild(this.logTextArea);
    // this.logContainer.appendChild(this.metadataContainer);
    document.body.appendChild(this.logContainer);
  }

  applyStyles(element, styles) {
    for (const [key, value] of Object.entries(styles)) {
      element.style[key] = value;
    }
  }

  updateLog(message) {
    console.log('updating log', message);
    this.logTextArea.value += message + '\n';
    this.logTextArea.scrollTop = this.logTextArea.scrollHeight;
  }

  updateMetadata(metadata) {
    // Clear existing metadata
    this.metadataContainer.innerHTML = '';

    // Add new metadata
    for (const [key, value] of Object.entries(metadata)) {
      const p = document.createElement('p');
      p.textContent = `${key}: ${value}`;
      this.metadataContainer.appendChild(p);
    }
  }

  unload() {
    // Remove elements when the plugin is unloaded
    if(this.logContainer && this.logContainer.parentNode) {
      this.logContainer.parentNode.removeChild(this.logContainer);
    }
    this.logContainer = null;
    this.logTextArea = null;
    this.metadataContainer = null;
  }
}

// Exporting the plugin class
export default YantraGUI;
