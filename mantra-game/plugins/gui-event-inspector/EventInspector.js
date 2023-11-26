// gui-event-inspector.js
import gui from '../gui-editor/gui.js';

class GuiEventInspector {
  static id = 'gui-event-inspector';

  constructor(config = {}) {
    this.id = GuiEventInspector.id;
    this.eventCounts = {}; // Object to keep track of event counts
    this.renderAtTick = 60; // each 60 ticks, update the table
    this.listener = null; // To keep track of the onAny listener
    this.hasDrawn = false;
  }

  init(game) {
    this.game = game;
    this.createGlobalEventTable();
    this.listenToAllEvents();
    // register the plugin as System
    this.game.systemsManager.addSystem(this.id, this);
  }

  listenToAllEvents() {
    // Store the listener for later removal
    this.listener = (eventName, ...args) => {
      // check to see if eventName contains gui-event-inspector, if so ignore
      if (eventName.includes('gui-event-inspector')) {
        return;
      }
      this.eventCounts[eventName] = (this.eventCounts[eventName] || 0) + 1;


      if (!this.hasDrawn || this.game.tick % this.renderAtTick === 0) {
        this.hasDrawn = true;
        this.updateGlobalEventTable();
      }
    };
    this.game.onAny(this.listener);
  }

  createGlobalEventTable() {
    let game = this.game;
    this.container = gui.window('emittersContainer', 'Event Inspector', function(){
      game.systemsManager.removeSystem(GuiEventInspector.id);
    });

    // Create and append the table to the container
    this.eventTable = document.createElement('table');
    this.eventTable.id = "eventTable";
    this.eventTable.innerHTML = '<tr><th>Event</th><th>Count</th></tr>'; // Initial table header
    this.container.appendChild(this.eventTable);
  }

  updateGlobalEventTable() {
    // Sort the events by count and update the table
    let sortedEvents = Object.entries(this.eventCounts).sort((a, b) => b[1] - a[1]);

    // Remove old rows and add new sorted rows
    this.eventTable.innerHTML = '<tr><th>Event</th><th>Count</th></tr>'; // Reset table header
    sortedEvents.forEach(([eventName, count]) => {
      let row = this.eventTable.insertRow();
      row.addEventListener('click', () => this.loadMethodCode(eventName));

      let cellEvent = row.insertCell();
      let cellCount = row.insertCell();
      cellEvent.textContent = eventName;
      cellCount.textContent = count;
    });
  }

  loadMethodCode(eventName) {
    console.log(`Loading code for method: ${eventName}`);
    // get actual source code from the emitter
    /*
    let emitter = this.game.emitters[eventName];
    console.log(emitter)
    let sourceCode = JSON.stringify(emitter, null, 2);
    console.log(sourceCode);
    // Add logic to load the code editor plugin with the code for eventName
    */
  }

  toggleView () {
    if (this.container.style.display === 'none') {
      this.container.style.display = 'block';
    } else {
      this.container.style.display = 'none';
    }
  }

  unload() {
    // Remove the onAny listener
    if (this.listener) {
      this.game.offAny(this.listener);
      this.listener = null;
    }

    // Remove the container from the DOM
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this.hasDrawn = false;
  }

}


export default GuiEventInspector;
