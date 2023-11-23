class YantraGUI {

  static id = 'gui-yantra';

  constructor(config = {}) {
    this.id = YantraGUI.id;
    this.logContainer = null;
    this.logTextArea = null;
    this.pingTestComplete = false;
  }
  init(game) {
    this.game = game;
    this.createDisplay();

    let self = this;

    game.on('server::discovery::polling', function (data) {
      self.updateLog(data.message);
    });

    game.on('server::discovery::best-server', function (data) {
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
    });

    game.on('server::discovery::start', function (data) {
      self.updateLog(data.message);
    });

    game.on('server::discovery::message', function (data) {
      self.updateLog(data.message);
    });

    game.on('server::discovery::completed', function (data) {
      self.pingTestComplete = true;
    });


    game.on('server::discovery::pingtest', function (data) {

      const region = data.region;
      const latency = data.latency;

      let latencyClass = 'ping-good';
      if (latency > 100 && latency <= 200) {
        latencyClass = 'ping-moderate';
      } else if (latency > 200) {
        latencyClass = 'ping-poor';
      }

      const regionElement = document.querySelector(`#pingResults .ping-region[data-region="${region}"]`);
      if (regionElement) {
        regionElement.className = `ping-region ${latencyClass}`;
        regionElement.textContent = `${region}: ${latency} ms`;
      }

      self.sortPingResults();
    });
  }

  createDisplay() {

     // Event listener to close the modal when clicking outside of it
  window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('pingModal')) {
      document.getElementById('pingModal').style.display = 'none';
    }
  });

  // Event listener to close the modal on any key press after ping test results
  window.addEventListener('keydown', function() {
    if (self.pingTestComplete) { // assuming pingTestComplete is a boolean flag
      document.getElementById('pingModal').style.display = 'none';
    }
  });

    // Create a container for the two-column layout
    const columnsContainer = document.createElement('div');
    this.applyStyles(columnsContainer, {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%'
    });

    // Create container for ping results (left column)
    const pingResults = document.createElement('div');
    pingResults.id = 'pingResults';
    pingResults.className = 'ping-results-container';
    this.applyStyles(pingResults, {
      width: '50%',
      marginRight: '10px' // Add some spacing between columns
    });

    // Create a header for the modal which includes the title and close button
    const modalHeader = document.createElement('div');
    this.applyStyles(modalHeader, {
      display: 'flex',
      justifyContent: 'space-between', // Space out title and close button
      alignItems: 'center', // Align items vertically
      width: '100%'
    });

    // Create and style the ping test modal
    const pingModal = document.createElement('div');
    pingModal.id = 'pingModal';
    pingModal.className = 'modal';
    this.applyStyles(pingModal, {
      /* Add necessary styles for modal */
    });

    // Create modal content container
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    this.applyStyles(modalContent, {
      /* Add necessary styles for modal content */
    });
    // Create and style the close button (now part of the header)
    const closeButton = document.createElement('span');
    closeButton.className = 'close-button';
    closeButton.textContent = '×';
    this.applyStyles(closeButton, {
      cursor: 'pointer',
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#aaa'
    });

    // Add title
    const title = document.createElement('h2');
    title.textContent = 'Yantra Server Discovery';

    // Add event listener to close button
    // const closeButton = document.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
      document.getElementById('pingModal').style.display = 'none';
    });


    // Create and add title to the header
    modalHeader.appendChild(title);

    // Add the close button to the header
    modalHeader.appendChild(closeButton);

    // Append the header to the modal content
    modalContent.prepend(modalHeader);

    // Append elements
    //modalContent.appendChild(closeButton);
    //modalContent.appendChild(title);
    modalContent.appendChild(pingResults);
    pingModal.appendChild(modalContent);
    document.body.appendChild(pingModal);

    // Initialize regions with a pending state
    window.YANTRA.serverDiscovery.regionList.forEach(regionInfo => {
      const regionElement = document.createElement('div');
      regionElement.className = 'ping-region ping-pending';
      regionElement.setAttribute('data-region', regionInfo.region);
      regionElement.textContent = `${regionInfo.region}: Pending...`;
      document.getElementById('pingResults').appendChild(regionElement);
    });




    // Create container for log text (right column)
    this.logTextArea = document.createElement('textarea');
    this.logTextArea.id = 'yantraLogTextArea';
    this.logTextArea.readOnly = true;
    this.applyStyles(this.logTextArea, {
      width: '50%',
      height: '400px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '10px',
      boxSizing: 'border-box',
      overflowY: 'scroll'
    });



    // Append elements to the columns container
    columnsContainer.appendChild(pingResults);
    columnsContainer.appendChild(this.logTextArea);

    // Append columns container to the modal content
    modalContent.appendChild(columnsContainer);

    // Append elements to the log container and then to the body
    //this.logContainer.appendChild(this.logTextArea);
    //document.body.appendChild(this.logContainer);
  }

  applyStyles(element, styles) {
    for (const [key, value] of Object.entries(styles)) {
      element.style[key] = value;
    }
  }
  updateLog(message) {
    this.logTextArea.value += message + '\n';
    this.logTextArea.scrollTop = this.logTextArea.scrollHeight;
  }

  sortPingResults() {
    const pingResultsContainer = document.getElementById('pingResults');
    const regions = Array.from(pingResultsContainer.children);
  
    regions.sort((a, b) => {
      const latencyA = parseInt(a.textContent.split(': ')[1]);
      const latencyB = parseInt(b.textContent.split(': ')[1]);
      return latencyA - latencyB;
    });
  
    // Re-append the sorted regions to the container
    regions.forEach(region => pingResultsContainer.appendChild(region));
  }
  

  unload() {
    // Remove elements when the plugin is unloaded
    if (this.logContainer && this.logContainer.parentNode) {
      this.logContainer.parentNode.removeChild(this.logContainer);
    }
    this.logContainer = null;
    this.logTextArea = null;
  }
}

// Exporting the plugin class
export default YantraGUI;
