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
    this.serializeFormToJSON = serializeFormToJSON.bind(this);
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem(this.id, this);
    let rules = testRules();

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
    let json = this.behavior.serializeToJson();
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

    //let guiContent = container.querySelector('.gui-content');
    container.innerHTML = '';
    JSON.parse(json).tree.forEach(node => {
      container.appendChild(this.createNodeElement(node, 0));
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
    // Create a form element instead of a div
    let formElement = document.createElement('form');
    formElement.className = 'node-element-form';
    // formElement.style.marginLeft = `${indentLevel * 10}px`;

    // Generate a unique path identifier for the node
    const nodeId = path ? `${path}-${node.action || node.if}` : (node.action || node.if);

    // Create a div to hold the node contents
    let contentDiv = document.createElement('div');
    contentDiv.className = 'node-element';
    formElement.appendChild(contentDiv);

    if (node.action) {
      this.appendActionElement(contentDiv, node, indentLevel);
    } else if (node.if) {
      this.appendConditionalElement(contentDiv, node, indentLevel);
    }

    // Append buttons to the contentDiv
    const addRuleBtn = this.createAddRuleButton(node.sutraPath);
    const removeRuleBtn = this.createRemoveRuleButton(node.sutraPath);
    contentDiv.appendChild(addRuleBtn);
    contentDiv.appendChild(removeRuleBtn);

    // Create and append the Save button to the form, not the contentDiv
    const saveBtn = document.createElement('button');
    saveBtn.type = 'button'; // Ensure this button doesn't submit the form
    saveBtn.textContent = 'Save';
    saveBtn.className = 'save-button';
    saveBtn.addEventListener('click', (event) => {
      const serializedData = this.serializeFormToJSON(formElement);
      // console.log('Serialized Data:', serializedData);
      // must fetch live reference to tree as "node" is a copy at this point
      let originalNode = this.behavior.findNode(node.sutraPath);
      // now that we have the updated for data, we need to update the sutra action
      originalNode.data = serializedData;
    });

    formElement.appendChild(saveBtn);

    return formElement;
  }

  appendActionElement(element, node, indentLevel) {
    let actionSelectContainer = document.createElement('div');
    actionSelectContainer.className = 'action-select-container';

    // "Then" clause label
    let thenLabel = document.createElement('label');
    thenLabel.className = 'then-label';
    thenLabel.textContent = 'Then:';
    actionSelectContainer.appendChild(thenLabel);

    let select = this.createActionSelect(node);
    actionSelectContainer.appendChild(select);
    element.appendChild(actionSelectContainer);

    if (node.data) {
      // "With" context label for data container
      let dataContainer = document.createElement('div');
      dataContainer.className = 'data-container';

      let withLabel = document.createElement('label');
      withLabel.className = 'with-label';
      withLabel.textContent = 'With:';
      dataContainer.appendChild(withLabel);

      let dataContent = this.createDataContainer(node, indentLevel);
      dataContainer.appendChild(dataContent);

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
    console.log('creating a data container', node);
    let dataContainer = document.createElement('div');
    dataContainer.className = 'data-container';

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
      console.log('nestedPath', nestedPath)
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
    let conditionContainer = document.createElement('div');
    conditionContainer.className = 'condition-container';
  
    console.log('Condition node', node.if);
  
    if (Array.isArray(node.if)) {
      node.if.forEach((cond, i) => {
        let condition = document.createElement('div');
        condition.className = 'condition';

        if (i === 0) {
          condition.textContent = `If: ${cond}`;
        } else {
          condition.textContent = `${cond}`;
        }
        condition.onclick = () => this.showConditionalsForm(node);
        conditionContainer.appendChild(condition);
        
        // Add a visual separator, if desired
        if (node.if.indexOf(cond) !== node.if.length - 1) {
          let andSeparator = document.createElement('div');
          andSeparator.className = 'condition-separator';
          andSeparator.textContent = 'AND';
          conditionContainer.appendChild(andSeparator);
        }
      });
    } else {
      let condition = document.createElement('div');
      condition.className = 'condition';
      condition.textContent = `If: ${node.if}`;
      condition.onclick = () => this.showConditionalsForm(node);
      conditionContainer.appendChild(condition);
    }
    
    return conditionContainer;
  }
  
  createElseElement(node, indentLevel) {
    let elseElement = document.createElement('div');
    elseElement.className = 'else-branch';
    elseElement.textContent = 'Else';
    node.else.forEach(childNode => elseElement.appendChild(this.createNodeElement(childNode, indentLevel + 1)));
    return elseElement;
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

  handleRemoveRuleClick(nodeId) {
    console.log('handleRemoveRuleClick', nodeId);
    this.behavior.removeNode(nodeId);
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
    button.textContent = 'Add Rule';
    button.className = 'add-rule-btn';
    button.setAttribute('data-id', nodeId);
    button.onclick = (e) => {
      this.handleAddRuleClick(e.target.getAttribute('data-id'));
      return false;
    };
    return button;
  }

  createRemoveRuleButton(nodeId) {
    let button = document.createElement('button');
    button.textContent = 'Remove Rule';
    button.className = 'remove-rule-btn';
    button.setAttribute('data-id', nodeId);
    button.onclick = (e) => {
      this.handleRemoveRuleClick(e.target.getAttribute('data-id'));
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