// gui-entities.js
import gui from '../gui-editor/gui.js';

class EntitiesGUI {
  static id = 'gui-entities';

  constructor(config = {}) {
    this.id = EntitiesGUI.id;
    this.eventCounts = {}; // Object to keep track of event counts
    this.renderAtTick = 60; // each 60 ticks, update the table
    this.sortBy = { column: 1, isAscending: false }; // Add sortBy state

    this.dynamicColumns = config.dynamicColumns || false; // Configurable flag for dynamic columns
    this.defaultProperties = ['id', 'type', 'name']; // Default properties to display
    this.knownProperties = new Set(this.defaultProperties);
    this.previousEntityStates = {}; // ...rest of the properties

  }
  init(game) {
    this.game = game;
    this.knownProperties = new Set(['id', 'type', 'name']); // Initialize with basic properties
    this.createGlobalEventTable();
    this.game.systemsManager.addSystem(this.id, this);
  }

  update() {
    console.log('EntitiesGUI update', this.game.tick);

    for (let entityId in this.game.components.creationTime.data) {
      let entity = this.game.getEntity(entityId);
      console.log('ent', entity);

      /*
      // Check if entity state has changed since last update
      if (this.hasEntityChanged(entityId, entity)) {
        this.updateRowForEntity(entityId, entity);
        this.previousEntityStates[entityId] = { ...entity }; // Update the stored state
      }
      */

      if (entity.destroyed) {
        // Remove the row from the table
        let row = this.entitiesTable.querySelector(`tr[data-id='${entityId}']`);
        if (row) {
          row.parentNode.removeChild(row);
        }
        continue;
      }

      // check to see if row exists by id
      let row = this.entitiesTable.querySelector(`tr[data-id='${entityId}']`);
      if (!row) {
        // create row
      this.updateRowForEntity(entityId, entity);
      }

    }
  }

  hasEntityChanged(entityId, entity) {
    const previousState = this.previousEntityStates[entityId];
    if (!previousState) return true; // If no previous state, consider changed

    // Compare current entity state with previous state
    return JSON.stringify(entity) !== JSON.stringify(previousState);
  }

  createGlobalEventTable() {
    let game = this.game;
    this.container = gui.window('emittersContainer', 'Entities', function () {
      game.systemsManager.removeSystem(EntitiesGUI.id);
    });

    this.entitiesTable = document.createElement('table');
    this.entitiesTable.id = "entitiesTable";
    this.entitiesTable.className = 'entities-table'; // Add class for styling

    // Create Header
    this.headerRow = this.entitiesTable.createTHead().insertRow();
    this.updateTableHeaders(Array.from(this.knownProperties));

    this.container.appendChild(this.entitiesTable);
  }


  updateTableHeaders(properties) {
    this.headerRow.innerHTML = ''; // Clear existing headers
    properties.forEach(prop => {
      let header = document.createElement('th');
      header.textContent = prop;
      this.headerRow.appendChild(header);
    });
  }

  updateRowForEntity(entityId, entity) {
    if (this.dynamicColumns) {
      // Update known properties if dynamic columns are enabled
      Object.keys(entity).forEach(prop => this.knownProperties.add(prop));
    }

    // Update headers if new properties are detected and dynamic columns are enabled
    if (this.dynamicColumns && this.headerRow.cells.length < this.knownProperties.size) {
      this.updateTableHeaders(Array.from(this.knownProperties));
    }

    let row = this.entitiesTable.querySelector(`tr[data-id='${entityId}']`);
    if (!row) {
      row = this.entitiesTable.insertRow();
      row.setAttribute('data-id', entityId);
    }

    // Clear existing cells
    row.innerHTML = '';

    // Determine which properties to display
    const propertiesToShow = this.dynamicColumns ? Array.from(this.knownProperties) : this.defaultProperties;

    // Add new cells based on current entity properties
    propertiesToShow.forEach(prop => {
      let cell = row.insertCell();
      let value = entity[prop];
      // ... handle special cases like 'graphics' as before
      cell.textContent = value || ''; // Handle undefined properties
    });
  }

  setSortBy(columnIndex) {
    // console.log('setSortBy', columnIndex, this.sortBy.column, this.sortBy.isAscending);
    if (this.sortBy.column === columnIndex) {
      this.sortBy.isAscending = !this.sortBy.isAscending; // Toggle sort order
    } else {
      this.sortBy = { column: columnIndex, isAscending: true };
    }
    this.updateGlobalEventTable();
  }

  openEntityInEditor(entity) {
    // Remark: we have a separate plugin for the editor
    console.log('openEntityInEditor', entity);
  }

  toggleView() {
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
  }

}


export default EntitiesGUI;
