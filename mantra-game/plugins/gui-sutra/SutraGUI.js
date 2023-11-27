// SutraGUI.js - Marak Squires 2023
import gui from '../gui-editor/gui.js';
import Sutra from '@yantra-core/sutra';
class SutraGUI {
  static id = 'gui-controls';

  constructor(config = {}) {
    this.id = SutraGUI.id;
    this.highlightedKeys = {};
    this.bossHealth = 100;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem(this.id, this);

    // this.drawTable();
    let sutra = new Sutra();

    // use custom function for condition
    sutra.addCondition('isBoss', (entity) => entity.type === 'BOSS');
  
    /*
    // could also be written as:
    sutra.addCondition('isBoss', {
      operator: 'equals',
      property: 'type',
      value: 'BOSS'
    });
    */
    
    // use standard Sutra DSL for condition
    sutra.addCondition('isHealthLow', {
      op: 'lessThan',
      property: 'health',
      value: 50
    });
  
    let bossHealthLowDetected = false;
  
    sutra.on('entity::update', (entity) => {
      console.log('entity::update', entity)
      game.emit('entity::update', entity);
    });
  
    sutra.addAction({
      if: 'isBoss',
      then: [{
        if: 'isHealthLow',
        then: [{ 
          action: 'entity::update', 
          data: { color: 0xff0000, speed: 5 } // Example with multiple properties
        }]
      }]
    });
    

    // Example tick call with mock data

    let json = sutra.serializeToJson();
    console.log('json', json);
    this.drawTable();
    this.drawBehaviorTree(JSON.parse(json));

    this.behavior = sutra;
  }

  drawTable() {
    let game = this.game;

    if (!game.systems['entity-input']) {
      console.log('entity-input system not found, skipping drawTable');
      return;
    }

    let entityInputSystem = game.systemsManager.getSystem('entity-input');
    let controls = entityInputSystem.controlMappings;

    let table = document.createElement('table');
    table.id = "sutraTable";

    for (let key in controls) {
      let row = table.insertRow();
      row.id = `row-${key}`;
      let cellKey = row.insertCell();
      let cellAction = row.insertCell();
      cellKey.textContent = key;
      cellAction.textContent = controls[key];
    }

    // Use gui.window() to create the window
    this.sutraView = gui.window('sutraView', 'Sutra Editor', function () {
      game.systemsManager.removeSystem(SutraGUI.id);
    });
    this.sutraView.appendChild(table);
  }

  getEmitters() {
    return this.game.emitters;
  }

  drawBehaviorTree(json) {
    let emitters = this.getEmitters();
    // object with keys as event names
    console.log('emitters', emitters)
    // get existing container
    let container = document.getElementById('sutraView');
    //let container = document.createElement('div');
    json.tree.forEach(node => {
      container.appendChild(this.createNodeElement(node, 0));
    });
    // Append this container to your GUI, adjust as needed
    document.body.appendChild(container); // Example: appending to body
  }

  createNodeElement(node, indentLevel) {
    let element = document.createElement('div');
    element.style.paddingLeft = `${indentLevel * 20}px`; // Indentation

    if (node.action) {
      // Create a dropdown for action selection
      let select = document.createElement('select');
      Object.keys(this.getEmitters()).forEach(emitter => {
        let option = document.createElement('option');
        option.value = emitter;
        option.text = emitter;
        select.appendChild(option);
        // TODO: needs better solution, this wasnt working
        if (node.action === emitter) {
          option.selected = true;
        }
      });
      // TODO: we also want to provide a form that send send / show a form with the data that is sent
      element.appendChild(select);
      // Add parameters display if any
      if (node.parameters) {
        Object.keys(node.parameters).forEach(key => {
          let param = document.createElement('div');
          param.style.paddingLeft = `${(indentLevel + 1) * 20}px`;
          param.textContent = `${key}: ${node.parameters[key]}`;
          element.appendChild(param);
        });
      }
    } else if (node.if) {
      element.textContent = `If: ${node.if}`;
      // Recursively handle 'then' and 'else'
      if (node.then) {
        node.then.forEach(childNode => element.appendChild(this.createNodeElement(childNode, indentLevel + 1)));
      }
      if (node.else) {
        let elseElement = document.createElement('div');
        elseElement.textContent = 'Else';
        elseElement.style.paddingLeft = `${indentLevel * 20}px`;
        node.else.forEach(childNode => elseElement.appendChild(this.createNodeElement(childNode, indentLevel + 1)));
        element.appendChild(elseElement);
      }
    }

    return element;
  }

  update() {
    console.log('running sutra tick')
    this.bossHealth--;
    for (let [entityId, entity] of game.entities.entries()) {
      // iterate through game entities
      // console.log('entity', entity)
      if (entity.type === 'BOSS') {
        console.log('boss found', entity.id, entity.health)
      }
      this.behavior.tick(entity);
    }

  }

  unload() {
    // remove all html elements
    this.sutraView.remove();
  }
}

export default SutraGUI;