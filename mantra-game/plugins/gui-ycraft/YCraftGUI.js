import gui from '../gui-editor/gui.js';

class YCraftGUI {

  static id = 'gui-ycraft';

  constructor(config = {}) {
    this.id = YCraftGUI.id;
    this.logContainer = null;
    this.logTextArea = null;
    this.pingTestComplete = false;

    // TODO: move all this code to YCraftGUI.js
    this.etherspaceHost = 'http://192.168.1.80:8889/api/v1';
    //etherspaceHost = 'https://etherspace.ayyo.gg/api/v1';
    this.etherspaceEndpoint = this.etherspaceHost + '';

  }
  init(game) {
    this.game = game;
    // this.createDisplay();

    let self = this;
    // Call the function to create and append the HTML structure
    this.createContraptionViewer();

  }

  createContraptionViewer() {

    this.container = gui.window('entitiesView', 'YCraft Contraption Viewer', function () {
      game.systemsManager.removeSystem(EntitiesGUI.id);
    });
    this.container.style.top = '100px';
    this.container.style.left = '60px';

    // Create main container div
    var mainContainer = document.createElement('div');
    mainContainer.id = 'main-container';

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

    if (this.game.systems.ycraft && this.game.systems.ycraft.contraption) {
      textarea.value = this.game.systems.ycraft.contraptionSource;
    }

    // Append elements to main container
    mainContainer.appendChild(header);
    mainContainer.appendChild(section);
    mainContainer.appendChild(textarea);

    // get gui-content from inside this.container
    let guiContent = this.container.querySelector('.gui-content');
    // Append the main container to the body or another specific element
    guiContent.appendChild(mainContainer);
    // document.body.appendChild(mainContainer);

    this.createDisplay();
    this.adjustTextareaHeight(textarea);
    
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
      contraptionCode.value = data.code;
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

// Function to render dropdown select with contraptions
renderDropdown(contraptions) {
  let contraptionInterface = document.getElementById('contraption-interface');
  const selectElement = document.createElement('select');
  selectElement.id = 'contraption-select';

  // Create a label for the select element
  const label = document.createElement('label');
  label.setAttribute('for', 'contraption-select');
  label.textContent = 'Choose a Contraption:';

  contraptions.forEach(contraption => {
      const optionElement = document.createElement('option');
      optionElement.value = contraption.name; // Assuming each contraption has a name
      optionElement.textContent = contraption.name;
      selectElement.appendChild(optionElement);
  });

  // get display-contraption div
  let displayContraption = document.getElementById('display-contraption');

  // Append the label and then the select element
  displayContraption.appendChild(label);
  displayContraption.appendChild(selectElement);

  // Optionally, add an event listener for when the user selects a contraption
  selectElement.addEventListener('change', (event) => {
      const selectedContraptionName = event.target.value;
      console.log(`User selected contraption name: ${selectedContraptionName}`);
      // Additional code to handle the selection, like getting and loading the selected contraption
      this.getContraption(selectedContraptionName);
  });

  contraptionInterface.appendChild(displayContraption);
}


  async createDisplay() {

    let self = this;
    let game = this.game;

    const form = document.getElementById('save-contraption-form');
    const contraptionNameDisplay = document.getElementById('contraption-name-display');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const contraptionName = document.getElementById('contraption-name').value;
      // Implement the POST request to save the contraption
      saveContraption(contraptionName);
    });

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
    // Remove elements when the plugin is unloaded
    if (this.logContainer && this.logContainer.parentNode) {
      this.logContainer.parentNode.removeChild(this.logContainer);
    }
    this.logContainer = null;
    this.logTextArea = null;
  }
}

// Exporting the plugin class
export default YCraftGUI;
