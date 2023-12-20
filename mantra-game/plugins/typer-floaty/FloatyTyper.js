// FloatyTyper.js - Marak Squires 2023
class FloatyTyper {
  static id = 'floaty-typer';

  constructor(config = {}) {
    this.id = FloatyTyper.id;
    this.typingArea = null;
  }

  init(game) {
    this.game = game;
    let that = this;
    this.game.systemsManager.addSystem(this.id, this);
    this.createTypingArea();
    this.game.on('playNote', function (note, duration, now) {
      that.scheduleFloatingChar(note, now);
    });
    // Optionally we can attach key listeners directly here
    // It will be better that we hook into the Mantra Event System instead
    // this.attachKeyListener();

    this.noteOrder = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    this.noteColors = {
      'C': '#FF0000', // Red
      'D': '#FFA500', // Orange
      'E': '#FFFF00', // Yellow
      'F': '#008000', // Green
      'G': '#0000FF', // Blue
      'A': '#4B0082', // Indigo
      'B': '#EE82EE'  // Violet
    };



  }

  createTypingArea() {
    // Create and style the typing area
    this.typingArea = document.createElement('div');
    this.typingArea.id = 'typingArea';
    this.typingArea.style.position = 'absolute';
    this.typingArea.style.bottom = '0px';

    this.typingArea.style.width = '100%';
    this.typingArea.style.height = '200px';
    this.typingArea.style.border = '1px solid black';

    document.body.appendChild(this.typingArea);
  }

  attachKeyListener() {
    document.addEventListener('keypress', (event) => {
      let char = event.key;
      this.createFloatingChar(char);
    });
  }

  scheduleFloatingChar(char, delay) {
    setTimeout(() => {
      this.createFloatingChar(char);
    }, delay * 600); // Convert delay to milliseconds
  }

  getNotePosition(note) {
    // Define the order of the notes on a keyboard
    const noteIndex = this.noteOrder.indexOf(note.charAt(0).toUpperCase());
    if (noteIndex === -1) return Math.random() * 100; // Default if note not found

    // Divide the screen into sections based on the number of notes
    const sectionWidth = 100 / this.noteOrder.length;
    // Calculate position with some random variation
    return sectionWidth * noteIndex + (Math.random() - 0.5) * sectionWidth;
  }

  createFloatingChar(char) {

    // Use the first letter of the note to determine its position
    let position = this.getNotePosition(char);

    let charElement = document.createElement('span');
    charElement.classList.add('char');
    // let notationChar = "" + char;
    //charElement.textContent = '\uE1D5'; // Example for a quarter note
    // charElement.textContent = notationChar;
    charElement.textContent = char;


    charElement.style.fontSize = '64px';
    charElement.style.fontWeight = 'bold';
    charElement.style.color = this.noteColors[char.charAt(0)];
    charElement.style.position = 'absolute';
    charElement.style.bottom = '0';
    charElement.style.opacity = '1';
    charElement.style.transition = 'all 2s ease-out';
    // charElement.style.fontFamily = 'Bravura'; //
    // font-family: 'Bravura', sans-serif

    // adds padding to left
    position = position + 10;
    charElement.style.left = `${position}%`;

    //charElement.style.left = `${Math.random() * 100}%`;

    this.typingArea.appendChild(charElement);

    // Animate
    setTimeout(() => {
      charElement.style.bottom = '100%';
      charElement.style.opacity = '0';
    }, 10);

    // Remove element after animation
    setTimeout(() => {
      charElement.remove();
    }, 20000);
  }

  unload() {
    if (this.typingArea) {
      this.typingArea.remove();
    }
    document.removeEventListener('keypress', this.createFloatingChar);
  }
}

export default FloatyTyper;
