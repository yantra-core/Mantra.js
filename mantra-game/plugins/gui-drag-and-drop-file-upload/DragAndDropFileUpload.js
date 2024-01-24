// DragAndDropFileUpload.js - Marak Squires 2024
class DragAndDropFileUpload {
  static id = 'drag-and-drop-file-upload';
  constructor(game) {
    this.game = game;
    this.id = DragAndDropFileUpload.id;
    this.dropArea = null;
    this.overlay = null;
  }

  init(game) {
    this.game = game;
    this.createDropArea();
    this.bindEvents();
  }

  createDropArea() {
    // Create overlay
    this.overlay = document.createElement('div');
    // id
    this.overlay.id = 'drag-and-drop-file-upload-overlay';
    this.overlay.style.position = 'fixed';
    this.overlay.style.top = '0';
    this.overlay.style.left = '0';
    this.overlay.style.width = '100%';
    this.overlay.style.height = '100%';
    //this.overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    this.overlay.style.backgroundColor = 'red';
    this.overlay.style.display = 'flex';
    this.overlay.style.justifyContent = 'center';
    this.overlay.style.alignItems = 'center';
    this.overlay.style.zIndex = '1000';
    this.overlay.style.visibility = 'block';

    // Create drop area
    this.dropArea = document.createElement('div');
    this.dropArea.style.width = '300px';
    this.dropArea.style.height = '200px';
    this.dropArea.style.border = '2px dashed #fff';
    this.dropArea.style.borderRadius = '10px';
    this.dropArea.style.display = 'flex';
    this.dropArea.style.justifyContent = 'center';
    this.dropArea.style.alignItems = 'center';
    this.dropArea.innerText = 'Drop files here';

    this.overlay.appendChild(this.dropArea);

    let gameHolder = document.getElementById('gameHolder');

    gameHolder.appendChild(this.overlay);
  }

  bindEvents() {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.overlay.addEventListener(eventName, (e) => this.preventDefaults(e), false);
    });

    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
      this.dropArea.addEventListener(eventName, () => this.highlight(), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      this.dropArea.addEventListener(eventName, () => this.unhighlight(), false);
    });

    // Handle dropped files
    this.dropArea.addEventListener('drop', (e) => this.handleDrop(e), false);
  }

  preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  highlight() {
    this.dropArea.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    this.overlay.style.visibility = 'visible';
  }

  unhighlight() {
    this.dropArea.style.backgroundColor = '';
    this.overlay.style.visibility = 'hidden';
  }

  handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;

    this.handleFiles(files);
  }

  handleFiles(files) {
    let game = this.game;
    // Process the files
    [...files].forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        let jsonData;
        try {
          jsonData = JSON.parse(text);
          console.log('Parsed JSON:', jsonData);
          // Here you can call your tile creation plugin and pass the jsonData
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
        if (jsonData) {
          game.emit('file::upload', jsonData)
        }

      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
      reader.readAsText(file); // Read the file as text
    });
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
