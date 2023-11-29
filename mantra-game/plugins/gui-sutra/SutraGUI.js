// SutraGUI.js - Marak Squires 2023
import gui from '../gui-editor/gui.js';
import sutra from '@yantra-core/sutra';

// import sutra from '../../../../sutra/index.js';
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
    this.showConditionalsForm = editor.showConditionalsForm.bind(this);
    this.createConditional = editor.createConditional.bind(this);
    this.onConditionalTypeChange = editor.onConditionalTypeChange.bind(this);
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem(this.id, this);

    let rules = new sutra.Sutra();


    rules.onAny(function (ev, data, node) {
      let sutraPath = node.sutraPath;

      // Highlight the current element
      let elementToHighlight = document.querySelector(`[data-id='${sutraPath}']`);
      // get the parent of this element
      if (elementToHighlight) {
        elementToHighlight.parentElement.classList.add('highlighted-sutra-node');
        elementToHighlight.parentElement.parentElement.classList.add('highlighted-sutra-node');
      }
    });


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

    // Example of a global condition function
    rules.addCondition('blockCountLessThan5', (entity, gameState) => {
      // gameState.blockCount should hold the current block count
      return gameState.blockCount < 5;
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
      game.systems.entity.inflateEntity(entity);
      //game.emit('entity::updateEntity', entity);
    });

    rules.on('entity::createEntity', (entity, node) => {
      // console.log('aaaa entity::createEntity', entity, node)
      game.systems.entity.createEntity(node.data);
      //game.emit('entity::createEntity', entity);
    });

    rules.addCondition('timerCompleted', entity => {
      // check if entities has timers and timer with name 'test-timer' is completed
      let timerDone = false;
      // TODO: remove this, should iterate and know timer names
      if (entity.timers && entity.timers.timers && entity.timers.timers['test-timer'] && entity.timers.timers['test-timer'].done) {
        timerDone = true;
        // set time done to false on origin timer
        entity.timers.timers['test-timer'].done = false;
      }

      return timerDone;
      //return entity.timerDone;
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

    // Modify the action for the spawner to include the new condition
    rules.addAction({
      if: 'isSpawner',
      then: [{
        if: 'timerCompleted',
        then: [{
          if: 'blockCountLessThan5',
          then: [{
            action: 'entity::createEntity',
            data: { type: 'BLOCK', height: 20, width: 20, position: { x: 0, y: 0 } }
          }]
        }]
      }]
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
    this.showConditionalsForm();
  }

  getEmitters() {
    return this.game.emitters;
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

  createNodeElement(node, indentLevel, path = '') {
    let element = document.createElement('div');
    element.className = 'node-element';
    element.style.marginLeft = `${indentLevel * 20}px`;

    // Generate a unique path identifier for the node
    const nodeId = path ? `${path}-${node.action || node.if}` : (node.action || node.if);

    if (node.action) {
      this.appendActionElement(element, node, indentLevel);
    } else if (node.if) {
      this.appendConditionalElement(element, node, indentLevel);
    }

    // Create the Add Rule button and append it to the element
    const addRuleBtn = this.createAddRuleButton(node.sutraPath);
    // hide the button by default
    addRuleBtn.style.display = 'none';
    element.appendChild(addRuleBtn);

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
    let conditional = this.behavior.getCondition(conditionalName); // Fetch the conditional's details

    let operators = this.behavior.getOperators(); // Fetch available operators

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

  handleAddRuleClick(nodeId) {
    console.log('handleAddRuleClick', nodeId)
    let node = this.behavior.findNode(nodeId);
    console.log('node', node)
    if (node.action) {
      // Add a new conditional
      this.showConditionalsForm(node);
    } else if (node.if) {
      // Add a new action
      this.showConditionalsForm(node);
      //this.showAddActionForm(nodeId);
    }
  }

  createAddRuleButton(nodeId) {
    let button = document.createElement('button');
    button.textContent = 'Add Rule';
    button.className = 'add-rule-btn';
    button.setAttribute('data-id', nodeId);
    button.onclick = (e) => {
      this.handleAddRuleClick(e.target.getAttribute('data-id'));
    };
    return button;
  }

  update() {
    let game = this.game;
    this.bossHealth--;

    if (game.tick % 70 === 0) {
      // Clear previously highlighted elements
      document.querySelectorAll('.highlighted-sutra-node').forEach(node => {
        node.classList.remove('highlighted-sutra-node');
      });
    }

    // for now, todo remove
    let blockCount = 0;
    for (let [entityId, entity] of game.entities.entries()) {
      if (entity.type === 'BLOCK') {
        blockCount++;
      }
    }
    
    const gameState = {
      blockCount: blockCount
    };

    //console.log('sending', gameState)

    for (let [entityId, entity] of game.entities.entries()) {
      this.behavior.tick(entity, gameState);
    }
  }

  unload() {
    // remove all html elements
    this.sutraView.remove();
  }
}

export default SutraGUI;