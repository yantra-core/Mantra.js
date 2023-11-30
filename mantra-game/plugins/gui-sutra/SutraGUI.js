// SutraGUI.js - Marak Squires 2023
import gui from '../gui-editor/gui.js';
import drawTable from './lib/drawTable.js';
import editor from './lib/editor.js';
import serializeFormToJSON from './util/serializeFormToJSON.js';
import testRules from './testRules.js';

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
    this.createConditionalForm = editor.createConditionalForm.bind(this);
    this.serializeFormToJSON = serializeFormToJSON.bind(this);
  }

  init(game) {
    this.game = game;
    if (this.game.systemsManager) {
      this.game.systemsManager.addSystem(this.id, this);
    }

    if (this.game.systems['entity-input']) {
      // Remark: You may not have to disable inputs + remove events
      // *just* removing events should be enough, this is OK for now
      this.game.systems['entity-input'].disableInputs();
      this.game.systems['keyboard'].unbindAllEvents();
      // add a global click handler to document that will delegate any clicks
      // that are not inside gui-windows to re-enable inputs
      document.addEventListener('click', (e) => {
        // check if the click was inside a gui-window
        let guiWindow = e.target.closest('.gui-container');
        if (!guiWindow) {
          // re-enable inputs
          this.game.systems['entity-input'].setInputsActive();
          this.game.systems['keyboard'].bindInputControls();
        } else {
          // disable inputs
          this.game.systems['entity-input'].disableInputs();
          this.game.systems['keyboard'].unbindAllEvents();
        }
      });

    }

    let rules = testRules(game);

    // gui.setTheme('light');

    rules.onAny(function (ev, data, node) {
      let sutraPath = node.sutraPath;
      let humanReadablePath = rules.getReadableSutraPath(sutraPath);
      document.querySelectorAll(`[data-path='${sutraPath}']`).forEach(node => {
        node.classList.add('highlighted-sutra-node');
        // remove collapsed class
        node.classList.remove('collapsed');
      });
      // Highlight the current element
      let parts = sutraPath.split('.');
      parts.forEach((part, i) => {
        let path = parts.slice(0, i + 1).join('.');
        document.querySelectorAll(`[data-path='${path}']`).forEach(node => {
          node.classList.add('highlighted-sutra-node');
          node.classList.remove('collapsed');
        });
      });
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

  showSutra() {
    this.redrawBehaviorTree();
  }

  viewJson() {
    let json = this.behavior.serializeToJson({
      includeSutraPath: false
    });
    console.log('json', json);
    // clear the #sutraTable
    let table = document.getElementById('sutraTable');
    table.innerHTML = '';
    // create a new div
    let jsonDiv = document.createElement('textarea');
    // set height and width to 100%
    jsonDiv.style.width = '95%';
    jsonDiv.style.height = '800px';
    jsonDiv.value = json;
    table.appendChild(jsonDiv);
  }

  viewSutraEnglish() {
    let english = this.behavior.exportToEnglish();
    // TODO: add Sutra's i18n support
    //let cn = this.behavior.exportToEnglish(0, 'zh');
    //let ja = this.behavior.exportToEnglish(0, 'ja');
    // clear the #sutraTable
    let table = document.getElementById('sutraTable');
    table.innerHTML = '';
    // create a new div
    let englishDiv = document.createElement('textarea');
    // set height and width to 100%
    englishDiv.style.width = '95%';
    englishDiv.style.height = '800px';
    englishDiv.value = english;
    table.appendChild(englishDiv);
  }

  getEmitters() {
    return this.game.emitters;
  }

  redrawBehaviorTree() {
    let json = this.behavior.serializeToJson();
    let container = document.getElementById('sutraTable');
    console.log('again', json)
    //let guiContent = container.querySelector('.gui-content');
    container.innerHTML = '';
    JSON.parse(json).tree.forEach(node => {
      console.log('nnnn', node)
      container.appendChild(this.createNodeElement(node, 0));
    });
  }

  drawBehaviorTree(json) {
    // get existing container
    let container = document.getElementById('sutraView');
    let table = document.getElementById('sutraTable');
    //let guiContent = container.querySelector('.gui-content');

    //let container = document.createElement('div');
    json.tree.forEach(node => {
      table.appendChild(this.createNodeElement(node, 1));
    });
    // Append this container to your GUI, adjust as needed
    //guiContent.appendChild(table);
    //container.appendChild(guiContent); // Example: appending to body
  }

  getAvailableActions() {
    let re = [];
    let emitters = this.getEmitters();
    if (!emitters) {
      return re;
    }
    return Object.keys(emitters);
  }

  createNodeElement(node, indentLevel, path = '') {
    // Create a form element instead of a div
    let formElement = document.createElement('form');
    formElement.className = 'node-element-form';
    // formElement.style.marginLeft = `${indentLevel * 10}px`;

    // Generate a unique path identifier for the node
    const nodeId = path ? `${path}-${node.action || node.if}` : (node.action || node.if);

    // Create a div to hold the node contents
    let contentDiv = document.createElement('div');
    contentDiv.className = 'node-element';

    // Append buttons to the contentDiv
    //const addRuleBtn = this.createAddRuleButton(node.sutraPath);
    //formElement.appendChild(addRuleBtn);
    formElement.appendChild(contentDiv);

    if (node.action) {
      // add new className to formElement, action-node-form
      formElement.classList.add('action-node-form');
      // formElement.classList.add('collapsible-content');
      this.appendActionElement(contentDiv, node, indentLevel);
    } else if (node.if) {
      this.appendConditionalElement(contentDiv, node, indentLevel);
    }

    return formElement;
  }

  saveSutra() {
    // get the #sutraTable
    let table = document.getElementById('sutraTable');
    
    console.log('saveSutra', this.serializeFormToJSON(table));
  }

  appendActionElement(element, node, indentLevel) {

    // "Then" clause container
    let actionSelectContainer = document.createElement('div');
    actionSelectContainer.className = 'action-select-container';
  
    // "Then" clause label with embedded select element
    let thenLabel = document.createElement('label');
    thenLabel.className = 'then-label';

    thenLabel.innerHTML = `<span class="sutra-keyword">Then</span>`;
    actionSelectContainer.setAttribute('data-path', node.sutraPath);

    let select = this.createActionSelect(node);
    // Append select element inside label element
    thenLabel.appendChild(select);
  
    // Append the label (with the select inside it) to the container
    actionSelectContainer.appendChild(thenLabel);
  
    // add click handler to actionSelectContainer so that it removes all "collapsed" classes,
    // from all nodes whose data-path matches the data-path of the actionSelectContainer
    actionSelectContainer.onclick = function () {
      let nodes = document.querySelectorAll(`[data-path='${node.sutraPath}']`);
      console.log('made a nodes query', nodes)
      // remove all collapsed classes from those nodes
      nodes.forEach(node => {
        // TODO: why toggle not working as expected?
        // node.classList.toggle('collapsed');
        node.classList.remove('collapsed');
      });
    }

    // Append the action select container to the main element
    element.appendChild(actionSelectContainer);
  
    if (node.data) {
      // "With" context container for data
      let dataContainer = document.createElement('div');
      dataContainer.className = 'data-container';
      // Add with-container class
      dataContainer.classList.add('with-container');
      dataContainer.classList.add('collapsed');

      // set data-path attribute to sutraPath
      dataContainer.setAttribute('data-path', node.sutraPath);
  
      // "With" context label
      let withLabel = document.createElement('label');
      withLabel.className = 'with-label';
      withLabel.innerHTML = `<span class="sutra-keyword">With</span>`;
      element.setAttribute('data-path', node.sutraPath);


      // Append the label directly to the data container
      dataContainer.appendChild(withLabel);
  
      // Create and append the data content to the data container
      let dataContent = this.createDataContainer(node, indentLevel);
      dataContainer.appendChild(dataContent);
  
      // Append the data container to the main element
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
    // console.log('creating a data container', node);
    let dataContainer = document.createElement('div');
    dataContainer.className = '';

    Object.keys(node.data).forEach(key => {
      let path = key;

      // Check if the value is an object and not null
      if (typeof node.data[key] === 'object' && node.data[key] !== null) {
        let nestedLabel = this.createLabel(key, indentLevel);
        dataContainer.appendChild(nestedLabel);

        let nestedContainer = this.createNestedDataContainer(node.data[key], indentLevel + 1, path);
        nestedContainer.dataset.key = key; // Optional: set a data attribute for the key
        dataContainer.appendChild(nestedContainer);
      } else {
        let inputGroup = this.createInputGroup(node, key, indentLevel, path);
        dataContainer.appendChild(inputGroup);
      }
    });

    return dataContainer;
  }

  createInputGroup(node, key, indentLevel, path) {
    let inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';

    let label = this.createLabel(key, indentLevel);
    let input = this.createInput(node, key, path);

    inputGroup.appendChild(label);
    inputGroup.appendChild(input);

    return inputGroup;
  }

  createNestedDataContainer(nestedNode, indentLevel, path = '') {
    let nestedDataContainer = document.createElement('div');
    nestedDataContainer.className = 'nested-data-container nested-level-' + indentLevel;

    Object.keys(nestedNode).forEach(nestedKey => {
      let nestedPath = path ? `${path}.${nestedKey}` : nestedKey;
      // console.log('nestedPath', nestedPath)
      if (typeof nestedNode[nestedKey] === 'object' && nestedNode[nestedKey] !== null) {
        let nestedLabel = this.createLabel(nestedKey, indentLevel);
        nestedDataContainer.appendChild(nestedLabel);

        let innerNestedContainer = this.createNestedDataContainer(nestedNode[nestedKey], indentLevel + 1, nestedPath);
        innerNestedContainer.dataset.key = nestedKey; // Optional
        nestedDataContainer.appendChild(innerNestedContainer);
      } else {
        let inputGroup = this.createInputGroup({ data: nestedNode }, nestedKey, indentLevel, nestedPath);
        nestedDataContainer.appendChild(inputGroup);
      }
    });

    return nestedDataContainer;
  }

  createLabel(key, indentLevel) {
    let label = document.createElement('label');
    label.textContent = key;
    label.className = 'param-label';
    // label.style.marginLeft = `${indentLevel * 20}px`;
    return label;
  }

  createInput(node, key, path = '') {

    let input = document.createElement('input');
    input.className = 'param-input';
    if (path.length) {
      input.name = path;
    } else {
      input.name = key;
    }
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
    let self = this;
    let condition = this.createConditionElement(node);
    element.appendChild(condition);


    if (node.then) {
      node.then.forEach(function (childNode) {
        element.appendChild(self.createNodeElement(childNode, indentLevel + 1))
      });
    }
    if (node.else) {
      let elseElement = this.createElseElement(node, indentLevel);
      element.appendChild(elseElement);
    }
  }

  createConditionElement(node) {
    let self = this;
    let conditionContainer = document.createElement('div');
    conditionContainer.className = 'condition-container';

    if (Array.isArray(node.if)) {
      node.if.forEach((cond, i) => {
        let condition = document.createElement('div');
        condition.className = 'condition';
        condition.innerHTML = `<span class="sutra-keyword">If</span> ${cond}`;
        // set data-path attribute to node.sutraPath
        condition.setAttribute('data-path', node.sutraPath);
        condition.onclick = function () {
          // condition.classList.toggle('collapsed');
          self.showConditionalsForm(node);
        }

        conditionContainer.appendChild(condition);

        const removeRuleBtn = self.createRemoveRuleButton(node.sutraPath);
        condition.appendChild(removeRuleBtn);

        // Add a visual separator, if desired
        /*
        if (node.if.indexOf(cond) !== node.if.length - 1) {
          let andSeparator = document.createElement('div');
          andSeparator.className = 'condition-separator';
          andSeparator.textContent = 'AND';
          conditionContainer.appendChild(andSeparator);
        }
        */
      });
    } else {
      let condition = document.createElement('div');
      condition.className = 'condition';
      // condition.textContent = `If: ${node.if}`;
      condition.innerHTML = `<span class="sutra-keyword">If</span> ${node.if}`;

      condition.setAttribute('data-path', node.sutraPath);

      condition.onclick = function () {
        // find the child node-element-form in condition
        let nodeElementForm = condition.parentElement.parentElement.querySelector('.node-element-form');
        // nodeElementForm.classList.toggle('collapsed');
        self.showConditionalsForm(node);
      }
      conditionContainer.appendChild(condition);

      const removeRuleBtn = self.createRemoveRuleButton(node.sutraPath);
      condition.appendChild(removeRuleBtn);

    }

    return conditionContainer;
  }

  createElseElement(node, indentLevel) {
    let elseElement = document.createElement('div');
    elseElement.className = 'else-branch';
    elseElement.innerHTML = `<span class="sutra-keyword">Else</span>`;
    node.else.forEach(childNode => elseElement.appendChild(this.createNodeElement(childNode, indentLevel + 1)));
    return elseElement;
  }

  saveConditional(conditionalName, form) {
    let json = this.serializeFormToJSON(form);
    console.log('jsonjsonjson', conditionalName, json)
    this.behavior.updateCondition(conditionalName, json); // Update Sutra instance
    this.redrawBehaviorTree(); // Redraw the tree to reflect changes
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

  handleRemoveRuleClick(sutraPath) {
    console.log('handleRemoveRuleClick', sutraPath);
    try {
      this.behavior.removeNode(sutraPath);
    } catch (err) {
      console.log(err);
    }
    /*
    let node = this.behavior.findNode(nodeId);
    console.log('node', node)
    if (node.action) {
      // Remove the action
      this.behavior.removeNode(node.sutraPath);
    } else if (node.if) {
      // Remove the conditional
      this.behavior.removeCondition(node.if);
    }
    */

    let json = this.behavior.serializeToJson();
    console.log('json', json);


    this.redrawBehaviorTree();
  }

  createAddRuleButton(nodeId) {
    let button = document.createElement('button');
    button.textContent = '+';
    button.className = 'rule-button rule-button-add';
    button.title = 'Add a new rule';
    button.setAttribute('data-id', nodeId);
    button.onclick = (e) => {
      this.handleAddRuleClick(e.target.getAttribute('data-id'));
      return false;
    };
    return button;
  }

  createRemoveRuleButton(nodeId) {
    let button = document.createElement('button');
    button.textContent = '-';
    button.className = 'rule-button rule-button-remove';
    button.title = 'Remove this rule';
    button.setAttribute('data-id', nodeId);
    button.onclick = (e) => {
      e.stopPropagation();
      this.handleRemoveRuleClick(e.target.getAttribute('data-id'));
    };
    return button;
  }

  update() {
    let game = this.game;
    this.bossHealth--;

    if (game.tick % 60 === 0) {
      // Clear previously highlighted elements
      document.querySelectorAll('.highlighted-sutra-node').forEach(node => {
        node.classList.remove('highlighted-sutra-node');
        // node.classList.add('collapsed');

      });
    }

    for (let [entityId, entity] of game.entities.entries()) {
      this.behavior.tick(entity, game.data);
    }
  }

  unload() {
    // remove all html elements
    this.sutraView.remove();
  }
}

export default SutraGUI;