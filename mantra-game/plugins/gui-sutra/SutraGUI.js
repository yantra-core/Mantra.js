// SutraGUI.js - Marak Squires 2023
import gui from '../gui-editor/gui.js';
import sutra from '@yantra-core/sutra';

//import sutra from '../../../../sutra/index.js';

import drawTable from './lib/drawTable.js';
import editor from './lib/editor.js';

class SutraGUI {
  static id = 'gui-sutra';

  constructor(config = {}) {
    this.id = SutraGUI.id;
    this.highlightedKeys = {};
    this.bossHealth = 100;
    this.drawTable = drawTable.bind(this);
    this.showFunctionEditor = editor.showFunctionEditor.bind(this);
    this.showObjectEditor = editor.showObjectEditor.bind(this);
    this.showAddConditionalForm = editor.showAddConditionalForm.bind(this);
    this.createConditional = editor.createConditional.bind(this);
    this.onConditionalTypeChange = editor.onConditionalTypeChange.bind(this);
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem(this.id, this);

    let rules = new sutra.Sutra();

    // use custom function for condition
    rules.addCondition('isBoss', (entity) => entity.type === 'BOSS');
    rules.addCondition('isSpawner', (entity) => entity.type === 'SPAWNER');

    /*
    // could also be written as:
    sutra.addCondition('isBoss', {
      operator: 'equals',
      property: 'type',
      value: 'BOSS'
    });
    */

    // use standard Sutra DSL for condition
    rules.addCondition('isHealthLow', {
      op: 'lessThan',
      property: 'health',
      value: 50
    });

    /*
    rules.addCondition('isDead', {
      op: 'lte',
      property: 'health',
      value: 0
    });
    */

    rules.on('entity::updateEntity', (entity) => {
      // console.log('entity::updateEntity', entity)
      //game.systems.entity.inflateEntity(entity);
      game.emit('entity::updateEntity', entity);
    });

    rules.addAction({
      if: 'isBoss',
      then: [{
        if: 'isHealthLow',
        then: [{
          action: 'entity::updateEntity',
          data: { color: 0xff0000, speed: 5 } // Example with multiple properties
        }]
      }]
    });

    rules.addAction({
      if: 'isSpawner',
      then: [{
        if: 'timers::done',
        then: [{
          action: 'entity::createEntity',
          data: { type: 'BOSS', height: 555, width: 222 }
        }]
      }]
    });
    
    rules.addCondition('timers::done', (entity, timerName) => {
      return entity.timers.checkTimer(timerName);
    });

    // Composite AND condition
    rules.addCondition('isBossAndHealthLow', {
      op: 'and',
      conditions: ['isBoss', 'isHealthLow']
    });
  
    rules.addAction({
      if: 'isBossAndHealthLow',
      then: [{ action: 'testAction' }]
    });

    let json = rules.serializeToJson();
    console.log('json', json);
    this.drawTable();
    this.drawBehaviorTree(JSON.parse(json));

    this.behavior = rules;
  }

  addNewRule() {
    // Open a form to create a new conditional
    this.showAddConditionalForm();
  }

  redrawBehaviorTree() {
    let json = this.behavior.serializeToJson();
    console.log('json', json)
    let container = document.getElementById('sutraTable');

    let guiContent = container.querySelector('.gui-content');
  

    guiContent.innerHTML = '';
    alert('redraw')
    JSON.parse(json).tree.forEach(node => {
      guiContent.appendChild(this.createNodeElement(node, 0));
    });
  }

  getEmitters() {
    return this.game.emitters;
  }

  drawBehaviorTree(json) {
    // get existing container
    let container = document.getElementById('sutraView');
    let table = document.getElementById('sutraTable');
    let guiContent = container.querySelector('.gui-content');

    //let container = document.createElement('div');
    json.tree.forEach(node => {
      table.appendChild(this.createNodeElement(node, 1));
    });
    // Append this container to your GUI, adjust as needed
    guiContent.appendChild(table);
    container.appendChild(guiContent); // Example: appending to body
  }

  getAvailableActions() {
    return Object.keys(this.getEmitters());
  }

  createNodeElement(node, indentLevel) {
    let element = document.createElement('div');
    element.className = 'node-element';
    element.style.marginLeft = `${indentLevel * 20}px`;

    if (node.action) {
      this.appendActionElement(element, node, indentLevel);
    } else if (node.if) {
      this.appendConditionalElement(element, node, indentLevel);
    }
    return element;
  }

  appendActionElement(element, node, indentLevel) {
    let select = this.createActionSelect(node);
    element.appendChild(select);

    if (node.data) {
      let dataContainer = this.createDataContainer(node, indentLevel);
      element.appendChild(dataContainer);
    }
  }

  createActionSelect(node) {
    let select = document.createElement('select');
    select.className = 'action-select';
    let actions = this.getAvailableActions();
    actions.forEach(action => {
      let option = document.createElement('option');
      option.value = action;
      option.text = action;
      if (node.action === action) {
        option.selected = true;
      }
      console.log('nnnnn', node.action)
      select.appendChild(option);
    });
    return select;
  }

  createDataContainer(node, indentLevel) {
    let dataContainer = document.createElement('div');
    dataContainer.className = 'data-container';
    Object.keys(node.data).forEach(key => {
      let label = this.createLabel(key, indentLevel);
      let input = this.createInput(node, key);
      dataContainer.appendChild(label);
      dataContainer.appendChild(input);
    });
    return dataContainer;
  }

  createLabel(key, indentLevel) {
    let label = document.createElement('label');
    label.textContent = key;
    label.className = 'param-label';
    label.style.marginLeft = `${indentLevel * 20}px`;
    return label;
  }

  createInput(node, key) {
    let input = document.createElement('input');
    input.className = 'param-input';
    input.setAttribute('data-action', node.action);
    input.setAttribute('data-key', key);
    input.setAttribute('data-id', node.data.id); // Assuming node.action can serve as a unique ID
    input.value = node.data[key];
    input.onchange = (e) => {
      node.data[key] = e.target.value;
    };
    return input;
  }

  appendConditionalElement(element, node, indentLevel) {
    let condition = this.createConditionElement(node);
    element.appendChild(condition);

    if (node.then) {
      node.then.forEach(childNode => element.appendChild(this.createNodeElement(childNode, indentLevel + 1)));
    }
    if (node.else) {
      let elseElement = this.createElseElement(node, indentLevel);
      element.appendChild(elseElement);
    }
  }

  createConditionElement(node) {
    let condition = document.createElement('div');
    condition.className = 'condition';
    condition.textContent = `If: ${node.if}`;
    condition.onclick = () => this.editConditional(node.if);
    return condition;
  }

  createElseElement(node, indentLevel) {
    let elseElement = document.createElement('div');
    elseElement.className = 'else-branch';
    elseElement.textContent = 'Else';
    node.else.forEach(childNode => elseElement.appendChild(this.createNodeElement(childNode, indentLevel + 1)));
    return elseElement;
  }

  editConditional(conditionalName) {
    console.log('editConditional', conditionalName)
    let conditional = this.behavior.getCondition(conditionalName); // Fetch the conditional's details
    console.log("found conditional", typeof conditional, conditional);
  
    let operators = this.behavior.getOperators(); // Fetch available operators
    console.log('found operators', operators);
  
    let editorContainer = document.getElementById('editorContainer'); // Editor container

    if (!editorContainer) {
      editorContainer = document.createElement('div');
      editorContainer.id = 'editorContainer';
      this.sutraView.appendChild(editorContainer);
      //document.body.appendChild(editorContainer);
    }

    if (typeof conditional === 'function') {
      this.showFunctionEditor(conditionalName, conditional);
    } else if (typeof conditional === 'object') {
      this.showObjectEditor(conditionalName, conditional, operators);
    } else {
      console.log('Unknown conditional type');
    }
  }
  
  saveConditional(conditionalName, form) {
    const formData = new FormData(form);
    let updatedConditional = {};
  
    for (let [key, value] of formData.entries()) {
      updatedConditional[key] = value;
    }
  
    this.behavior.updateCondition(conditionalName, updatedConditional); // Update Sutra instance
    this.redrawBehaviorTree(); // Redraw the tree to reflect changes
  }
  
  showConditionalEditor(conditional) {
    // Implement the UI logic to show and edit the details of the conditional
    // This could be a form with inputs for the conditional's properties
  }

  update() {
    let game = this.game;
    this.bossHealth--;
    for (let [entityId, entity] of game.entities.entries()) {
      // iterate through game entities
      // console.log('entity', entity)
      if (entity.type === 'BOSS') {
        // console.log('boss found', entity.id, entity.health)
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