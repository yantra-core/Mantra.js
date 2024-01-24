// DragAndDropFileUpload.js - Marak Squires 2024
class DragAndDropFileUpload {
  static id = 'drag-and-drop-file-upload';
  constructor(game) {
    this.game = game;
    this.id = DragAndDropFileUpload.id;
    this.dropArea = null;
    this.defaultDataButton = null;
    this.overlay = null;
  }

  init(game) {
    this.game = game;
    this.createOverlay();

    this.createDropArea();
    this.createDefaultDataButton();

    this.createOptionsSection();

    this.bindEvents();
  }

  createOverlay() {
    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.id = 'drag-and-drop-file-upload-overlay';
    this.setStyle(this.overlay, {
      position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
      backgroundColor: 'red', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center', zIndex: '1000',
      visibility: 'block', padding: '20px'
    });

    let gameHolder = document.getElementById('gameHolder');
    gameHolder.appendChild(this.overlay);
  }


  createDropArea() {
    // Create drop area container
    const dropAreaContainer = document.createElement('div');
    this.setStyle(dropAreaContainer, {
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    });

    // Create drop area
    this.dropArea = document.createElement('div');
    this.setStyle(this.dropArea, {
      width: '300px', height: '200px', border: '2px dashed #fff', borderRadius: '10px',
      display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px'
    });
    this.dropArea.innerText = 'Drop Tiled .tmj file here';

    dropAreaContainer.appendChild(this.dropArea);
    this.overlay.appendChild(dropAreaContainer);
  }

  createDefaultDataButton() {
    // Create Load Default Data button
    this.defaultDataButton = document.createElement('button');
    this.setStyle(this.defaultDataButton, {
      width: '300px', height: '200px', border: '2px solid #fff',
      borderRadius: '5px', backgroundColor: '#444', color: '#fff', fontSize: '24px',
      cursor: 'pointer'
    });
    this.defaultDataButton.innerText = 'Load Default Tiled Data';
    this.defaultDataButton.onclick = () => this.loadDefaultData();

    // Append to the drop area container
    const dropAreaContainer = this.overlay.children[0]; // Assuming it's the first child
    dropAreaContainer.appendChild(this.defaultDataButton);
  }

  setStyle(element, styles) {
    for (let property in styles) {
      element.style[property] = styles[property];
    }
  }

  createOptionsSection() {
    // Create options section container
    this.optionsSection = document.createElement('div');
    this.setStyle(this.optionsSection, {
      marginTop: '20px', padding: '10px', border: '2px solid #fff', borderRadius: '5px',
      backgroundColor: '#222', color: '#fff'
    });

    // Create tiledServer checkbox
    this.tiledServerCheckbox = this.createCheckboxOption('tiledServer', 'Use Serverless Tiled Chunks');

    // Create proceduralGenerateMissingChunks checkbox
    this.proceduralGenerateCheckbox = this.createCheckboxOption('proceduralGenerateMissingChunks', 'Procedural Generate Missing Chunks');

    this.optionsSection.appendChild(this.tiledServerCheckbox.container);
    this.optionsSection.appendChild(this.proceduralGenerateCheckbox.container);


    this.overlay.appendChild(this.optionsSection);
  }

  createCheckboxOption(id, label) {
    let container = document.createElement('div');
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;
    checkbox.name = id;
    checkbox.value = id;
    // set size to bigger
    checkbox.style.width = '24px';
    checkbox.style.height = '24px';

    // set to checked by default
    checkbox.checked = true;

    let labelElement = document.createElement('label');
    labelElement.htmlFor = id;
    labelElement.innerText = label;
    labelElement.style.marginLeft = '8px';

    container.appendChild(checkbox);
    container.appendChild(labelElement);

    return { container, checkbox };
  }

  getCheckboxValues() {
    return {
      tiledServer: this.tiledServerCheckbox.checkbox.checked,
      proceduralGenerateMissingChunks: this.proceduralGenerateCheckbox.checkbox.checked
    };
  }

  bindEvents() {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.overlay.addEventListener(eventName, (e) => this.preventDefaults(e), false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      this.dropArea.addEventListener(eventName, () => this.highlight(), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      this.dropArea.addEventListener(eventName, () => this.unhighlight(), false);
    });

    this.dropArea.addEventListener('drop', (e) => this.handleDrop(e), false);
  }

  preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  highlight() {
    this.dropArea.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
  }

  unhighlight() {
    this.dropArea.style.backgroundColor = '';
  }

  handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;
    this.handleFiles(files);
  }

  handleFiles(files) {
    let game = this.game;

    let tilePluginOptions = this.getCheckboxValues();
    if (game.systems.tile) {
      game.systems.tile.setOptions(tilePluginOptions);
    }

    [...files].forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        let jsonData;
        try {
          jsonData = JSON.parse(text);
          console.log('Parsed JSON:', jsonData);
          if (jsonData) {
            game.emit('file::upload', jsonData);
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
        // hide overlay
        this.overlay.style.visibility = 'hidden';
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);

      };
      reader.readAsText(file);
    });
  }

  loadDefaultData() {
    // Custom function to load default map data
    // Placeholder for now, can be filled out later
    console.log('Loading default map data...');
    if (this.game.systems.tile) {

      let tilePluginOptions = this.getCheckboxValues();
      this.game.systems.tile.setOptions(tilePluginOptions);

      this.game.systems.tile.createTileMapFromTiledJSON(this.game.systems.tile.tileMap); // for now
      this.overlay.style.visibility = 'hidden';
    }
  }

  update() {
    // Update logic if necessary
  }

  render() {
    // Render logic if necessary
  }

  destroy() {
    // Cleanup
    this.overlay.remove();
  }
}

export default DragAndDropFileUpload;
