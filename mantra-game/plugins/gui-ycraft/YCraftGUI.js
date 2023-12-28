import gui from '../gui-editor/gui.js';

class YCraftGUI {

  static id = 'gui-ycraft';

  constructor(config = {}) {
    this.id = YCraftGUI.id;
    this.logContainer = null;
    this.logTextArea = null;
    this.pingTestComplete = false;

    // TODO: move all this code to YCraftGUI.js
    //this.etherspaceHost = 'http://192.168.1.80:8889/api/v1';
    this.etherspaceHost = 'https://etherspace.ayyo.gg/api/v1';
    this.etherspaceEndpoint = this.etherspaceHost + '';

  }
  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem(this.id, this);
    // this.createDisplay();

    let self = this;
    // Call the function to create and append the HTML structure
    this.createContraptionViewer();

  }

  createContraptionViewer() {
    let game = this.game;
    // check for existing contraptionsView
    let contraptionsView = document.getElementById('contraptionsView');
    if (contraptionsView) {
      // TODO: contraptionsView.remove()
      // Remark: Requires we have cash $ with closest parent
      contraptionsView.display = 'block';
    }
    // create empty div
    this.container = document.createElement('div');
    this.container.id = 'contraptionsView';
    this.container = document.createElement('div');
    this.container.style.display = 'flex';
    this.container.style.flexDirection = 'row';
    this.container.style.alignItems = 'center';

    // this.container.style.width = '300px';
    this.container.style.height = '100%';

    // check to see if game.systems.editor exists
    // TODO: remove this code and cross-plugin check
    let that = this;
    function attemptEditorAppend() {
      if (game.systems && game.systems['gui-editor']) {
        let toolBarComponent = game.systems['gui-editor'].toolbarMenu;
        if (toolBarComponent) {
          toolBarComponent.addElement('primary', that.container);
        }
        _createContraptionViewer();
      } else {
        setTimeout(attemptEditorAppend, 3)
      }
    }

    // check to see if #contraption-select exists
    let contraptionSelect = document.getElementById('contraption-select');
    if (!contraptionSelect) {
      // attemptEditorAppend();
    }


    function _createContraptionViewer() {
      /*
      this.container = gui.window('contraptionsView', 'YCraft Contraption Viewer', function () {
        game.systemsManager.removeSystem(YCraftGUI.id);
        let contraptionsView = document.getElementById('contraptionsView');
        if (contraptionsView) {
          contraptionsView.remove();
        }
      });
      */

      // check to see if the container exists
      /*
      let existingContainer = document.getElementById('ycraft-main-container');

      if (existingContainer) {
        return;
      }
      */
      // Create main container div
      var mainContainer = document.createElement('div');
      mainContainer.id = 'ycraft-main-container';

      // Create header and title
      var header = document.createElement('header');

      /*
      var h1 = document.createElement('h1');
      h1.textContent = 'YCraft Contraption Viewer';
      header.appendChild(h1);
      */

      // Create contraption interface section
      var section = document.createElement('section');
      section.id = 'contraption-interface';

      // Create display contraption div
      var displayContraption = document.createElement('div');
      displayContraption.id = 'display-contraption';
      /*
      var h3 = document.createElement('h3');
      h3.innerHTML = 'Contraption Name: <span id="contraption-name-display"></span>';
      displayContraption.appendChild(h3);
      */

      // Create form for saving contraption
      var saveForm = document.createElement('form');
      saveForm.id = 'save-contraption-form';
      var label = document.createElement('label');
      label.setAttribute('for', 'contraption-name');
      label.textContent = 'Contraption Name:';
      var input = document.createElement('input');
      input.type = 'text';
      input.id = 'contraption-name';
      input.placeholder = 'Enter contraption name';
      input.required = true;
      var saveButton = document.createElement('button');
      saveButton.type = 'submit';
      saveButton.textContent = 'Save Contraption';
      //saveForm.appendChild(label);
      //saveForm.appendChild(input);
      //saveForm.appendChild(saveButton);

      // Create form for running contraption
      var runForm = document.createElement('form');
      runForm.id = 'run-contraption-form';
      var runButton = document.createElement('button');
      runButton.type = 'submit';
      runButton.textContent = 'Run Contraption';
      runForm.appendChild(runButton);

      // Append forms to section
      section.appendChild(displayContraption);
      section.appendChild(saveForm);
      // section.appendChild(runForm);

      // Create textarea for contraption code
      var textarea = document.createElement('textarea');
      textarea.id = 'contraption-code';
      textarea.rows = 10;
      textarea.cols = 50;
      textarea.placeholder = 'Enter contraption code here';
      textarea.style.display = 'none';
      if (that.game.systems.ycraft && that.game.systems.ycraft.contraption) {
        textarea.value = that.game.systems.ycraft.contraptionSource;
      }

      // Append elements to main container
      mainContainer.appendChild(header);
      mainContainer.appendChild(section);
      //mainContainer.appendChild(textarea);
      // get gui-content from inside this.container
      //let guiContent = this.container.querySelector('.gui-content');
      // Append the main container to the body or another specific element
      //guiContent.appendChild(mainContainer);
      that.container.appendChild(mainContainer);
      // document.body.appendChild(mainContainer);

      that.createDisplay();
      that.adjustTextareaHeight(textarea);
    }


  }

  updateSelectDropdown(name) {
    let contraptionSelect = document.getElementById('contraption-select');
    if (contraptionSelect) {
      contraptionSelect.value = name;
    } else {
      // Add the new option to the select dropdown
      let selectElement = document.createElement('select');
      selectElement.id = 'contraption-select';
      let optionElement = document.createElement('option');
      optionElement.value = name; // Assuming each contraption has a name
      optionElement.textContent = name;
      selectElement.appendChild(optionElement);
      selectElement.value = name;
    }
  }

  async getContraption(contraptionId) {

    let self = this;
    let game = this.game;
    const contraptionNameDisplay = document.getElementById('contraption-name-display');

    // Implement GET request to fetch contraption
    const response = await fetch(`${this.etherspaceEndpoint}/contraption/${contraptionId}`);
    const data = await response.json();

    if (contraptionNameDisplay) {
      if (data) {
        contraptionNameDisplay.textContent = data.name; // Update display with fetched name
      } else {
        contraptionNameDisplay.textContent = 'Could not find: ' + contraptionId;
      }
    }

    let displayContraption = document.getElementById('display-contraption');
    if (displayContraption) {
      displayContraption.style.display = 'block';
    }

    // Set contraption-code textarea value to fetched code
    let contraptionCode = document.getElementById('contraption-code');
    if (contraptionCode) {
      let code = data.code;
      // Trims whitespace from top of file
      let lines = code.split('\n');
      // remove the first lines of whitespace until we find no empty lines
      // Done to clean up imported examples if they have extra whitespace at top
      while (lines[0] === '') {
        lines.shift();
      }
      code = lines.join('\n')
      contraptionCode.value = code;
    }

    // Update input contraption-name with new name
    let contraptionName = document.getElementById('contraption-name');
    if (contraptionName) {
      contraptionName.value = data.name;
    }

    // Update the select dropdown
    this.updateSelectDropdown(data.name);

    // Clear all PARTS from Mantra
    if (game.systems.ycraft) {
      game.systems.ycraft.clearAllParts();
    }

    // For now autorun
    let autoRunCode = true;
    if (autoRunCode) {
      setTimeout(() => {
        // runContraption(data.code);
        self.runContraptionModule(data.code);
      }, 200);
    }
  }

  setContraption(contraption, source) {
    this.contraption = contraption;
    // for now, could be better scoped as array of contraptions
    // this.game.contraption = contraption;
    // redraw view if available
    this.createContraptionViewer(contraption);
  }

  // Function to render dropdown select with contraptions
  renderDropdown(contraptions) {
    let contraptionInterface = document.getElementById('contraption-interface');
    const selectElement = document.createElement('select');
    selectElement.id = 'contraption-select';

    // Create a label for the select element
    const label = document.createElement('label');
    label.setAttribute('for', 'contraption-select');
    label.textContent = 'Contraption: ';

    contraptions.forEach(contraption => {
      const optionElement = document.createElement('option');
      optionElement.value = contraption.name; // Assuming each contraption has a name
      optionElement.textContent = contraption.name;
      selectElement.appendChild(optionElement);
    });

    // get display-contraption div
    let displayContraption = document.getElementById('display-contraption');

    // Append the label and then the select element
    if (displayContraption) {
      // displayContraption.appendChild(label);
      displayContraption.appendChild(selectElement);

    }

    // Optionally, add an event listener for when the user selects a contraption
    selectElement.addEventListener('change', (event) => {
      const selectedContraptionName = event.target.value;
      console.log(`User selected contraption name: ${selectedContraptionName}`);
      // Additional code to handle the selection, like getting and loading the selected contraption
      this.getContraption(selectedContraptionName);
    });

    // contraptionInterface.appendChild(displayContraption);
  }


  async createDisplay() {

    let self = this;
    let game = this.game;

    const form = document.getElementById('save-contraption-form');
    const contraptionNameDisplay = document.getElementById('contraption-name-display');

    if (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        const contraptionName = document.getElementById('contraption-name').value;
        // Implement the POST request to save the contraption
        saveContraption(contraptionName);
      });
    }

    /*
    const runContraptionForm = document.getElementById('run-contraption-form');
    runContraptionForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const contraptionCode = document.getElementById('contraption-code').value;
      runContraption(contraptionCode);
    });
    */

    // Define your endpoint and user ID
    const userId = 'Marak'; // Replace with the actual user ID

    // Call the function with the user ID
    await self.fetchContraptionsForUser(userId);

    //let contraptionName = 'button-relay-light';
    //contraptionName = 'rover-light';
    // contraptionName = 'all-examples-composite';
    // Could auto-load a contraption at start
    // for now, we will load allExamples from memory
    // await self.getContraption(contraptionName);

    // Set the contraption to the YCraft system
    //let allExamples = RS.allExamples();
    //game.systems.ycraft.setContraption(allExamples);



    // getContraption('button-actuator-light');
    //getContraption('button-amplify-wire-light');
  }

  async saveContraption(name) {

    // get the code from the textarea
    let contraptionCode = document.getElementById('contraption-code').value;
    // Assuming roverLightSystem is a variable that holds the contraption code
    const payload = {
      name: name,
      code: contraptionCode || '' // This should be defined in your scope
    };

    try {
      const response = await fetch(`${this.etherspaceEndpoint}/api/v1/contraption/${name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        contraptionNameDisplay.textContent = `Saved: ${data.name}`;
      } else {
        contraptionNameDisplay.textContent = `Error saving contraption: ${data.message}`;
      }
    } catch (error) {
      contraptionNameDisplay.textContent = `Network error: ${error.message}`;
    }

    let displayContraption = document.getElementById('display-contraption');
    if (displayContraption) {
      displayContraption.style.display = 'block';
    }
  }

  // Function to fetch contraptions for a given user
  async fetchContraptionsForUser(userId) {
    try {
      const response = await fetch(`${this.etherspaceEndpoint}/contraptions/${userId}`);
      const contraptions = await response.json();
      // Call function to render dropdown with fetched contraptions
      this.renderDropdown(contraptions);
    } catch (error) {
      console.error('Error fetching contraptions:', error);
      // Handle any errors, such as by displaying a message to the user
    }
  }

  async runContraptionModule(code) {

    let game = this.game;
    try {

      console.log('About to run code', code)

      // Create a new blob with the fetched code
      const blob = new Blob([code], { type: 'application/javascript' });

      // Create a URL for the blob
      const url = URL.createObjectURL(blob);

      // Dynamically import the blob as a module
      const module = await import(url);

      // Assuming the module exports a function named 'default'
      const contraption = module.default();

      // Assuming the system name is declared globally in the code
      let systemName = module.default.name;
      window[systemName] = contraption;

      // Set the contraption to the YCraft system
      if (window[systemName]) {
        game.systems.ycraft.setContraption(window[systemName]);
      }

      if (contraption.start) {
        // contraption.start();
      }

      // Clean up by revoking the blob URL
      URL.revokeObjectURL(url);

      console.log('Contraption loaded and executed');
    } catch (error) {
      console.error('Error running contraption:', error);
    }
  }

  adjustTextareaHeight(textarea) {
    textarea.style.height = 'auto'; // Reset height to recalculate
    textarea.style.height = textarea.scrollHeight + 'px'; // Set new height
  }

  unload() {

    let contraptionInterface = document.getElementById('contraption-interface');
    if (contraptionInterface) {
      contraptionInterface.remove();
    }

    // Remove elements when the plugin is unloaded
    if (this.logContainer && this.logContainer.parentNode) {
      this.logContainer.parentNode.removeChild(this.logContainer);
    }
    // Removes contraptionsView from editor menu
    let contraptionsView = document.getElementById('contraptionsView');
    if (contraptionsView) {
      contraptionsView.display = 'hidden';
      // TODO: 
      //       contraptionsView.remove();


    }

    this.logContainer = null;
    this.logTextArea = null;
  }

}

// Exporting the plugin class
export default YCraftGUI;