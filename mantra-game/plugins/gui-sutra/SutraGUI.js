// SutraGUI.js - Marak Squires 2023
import gui from '../gui-editor/gui.js';
import drawTable from './lib/drawTable.js';

import dataView from './lib/editor/dataView.js';
import dataForm from './lib/editor/dataForm.js';
import actionForm from './lib/editor/actionForm.js';
import conditionalsForm from './lib/editor/conditionalsForm.js';
import conditionalForm from './lib/editor/conditionalForm.js';

import createLabel from './lib/editor/createLabel.js';
import editor from './lib/editor.js';

import serializeFormToJSON from './util/serializeFormToJSON.js';
// import testRules from './testRules.js';

class SutraGUI {
  static id = 'gui-sutra';

  constructor(config = {}) {
    this.id = SutraGUI.id;
    this.highlightedKeys = {};
    this.bossHealth = 100;
    this.drawTable = drawTable.bind(this);
    this.showFunctionEditor = editor.showFunctionEditor.bind(this);
    this.showObjectEditor = editor.showObjectEditor.bind(this);
    // this.conditionalsForm = conditionalsForm.bind(this);
    this.showConditionalsForm = conditionalsForm.bind(this);
    this.createConditional = editor.createConditional.bind(this);
    this.createConditionalForm = conditionalForm.bind(this);

    this.createLabel = createLabel.bind(this);
    this.dataView = dataView.bind(this);
    this.dataForm = dataForm.bind(this);
    this.showActionForm = actionForm.bind(this);
    this.onConditionalTypeChange = editor.onConditionalTypeChange.bind(this);
    this.serializeFormToJSON = serializeFormToJSON.bind(this);
    // this.sutra = sutra;
  }

  init(game) {
    this.game = game;
    if (this.game.systemsManager) {
      this.game.systemsManager.addSystem(this.id, this);
    }

    if (this.game && this.game.systems && this.game.systems['entity-input']) {
      // Remark: You may not have to disable inputs + remove events
      // *just* removing events should be enough, this is OK for now
      this.game.systems['entity-input'].disableInputs();
      this.game.systems['keyboard'].unbindAllEvents();
    }

    // add a global click handler to document that will delegate any clicks
    // that are not inside gui-windows to re-enable inputs
    document.addEventListener('click', (e) => {
      // check if the click was inside a gui-window
      let guiWindow = e.target.closest('.gui-container');
      if (this.game && this.game.systems && this.game.systems['entity-input'] && this.game.systems['keyboard']) {
        if (!guiWindow) {
          // re-enable inputs
          this.game.systems['entity-input'].setInputsActive();
          this.game.systems['keyboard'].bindInputControls();
        } else {
          // disable inputs
          this.game.systems['entity-input'].disableInputs();
          this.game.systems['keyboard'].unbindAllEvents();
        }

        // check to see if this is a class sutra-link, if so open the form editor
        if (e.target.classList.contains('sutra-link')) {
          let sutraPath = e.target.getAttribute('data-path');
          let node = this.behavior.findNode(sutraPath);
          // Remark: Editing / Viewing Conditionals is not yet supported
          //this.showConditionalsForm(node);
        }
      }
    });

    this.drawTable();

    if (this.game.rules) {
      this.setRules(this.game.rules);
    } else {
      // add message to indicate no sutra
      let container = document.getElementById('sutraTable');
      let message = document.createElement('div');
      message.className = 'sutra-message';
      message.textContent = 'No Sutra Rules have been defined yet.';

      let wrapper = document.createElement('div');
      // create a new div with link that calls Game.switchWorld('SutraWorld')
      let link = document.createElement('a');
      link.href = '#';
      link.textContent = 'Warp to Sutra Tree World for Tutorial';
      link.onclick = (e) => {
        e.preventDefault();
        this.game.switchWorld('SutraWorld');
      }
      wrapper.appendChild(link);
      wrapper.appendChild(link);

      container.appendChild(message);
      // container.appendChild(wrapper);      
    }

  }

  setRules(rules) {
    alert('setting rules')
    console.log('setting rules', rules)
    // let rules = testRules(game);

    // gui.setTheme('light');
    /*
    rules.onAny(function (ev, data, node) {
      let sutraPath = node.sutraPath;
      let humanReadablePath = rules.getReadableSutraPath(sutraPath);
      document.querySelectorAll(`[data-path='${sutraPath}']`).forEach(node => {
        node.classList.add('highlighted-sutra-node');
        // remove collapsed class
        //node.classList.remove('collapsed');
      });
      // Highlight the current element
      let parts = sutraPath.split('.');
      parts.forEach((part, i) => {
        let path = parts.slice(0, i + 1).join('.');
        document.querySelectorAll(`[data-path='${path}']`).forEach(node => {
          node.classList.add('highlighted-sutra-node');
          //node.classList.remove('collapsed');
        });
      });
    });
    */

    this.behavior = rules;

    this.drawTable();
    let json = rules.serializeToJson();
    this.drawBehaviorTree(JSON.parse(json));

  }

  addNewRule() {
    // Open a form to create a new conditional
    this.showConditionalsForm();
  }

  showSutra() {
    // this.redrawBehaviorTree();
    let json = this.behavior.toJSON();
    this.redrawBehaviorTree(this.behavior);
  }

  viewJson() {
    let json = this.behavior.serializeToJson({
      includeSutraPath: false
    });
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

    this.adjustTextareaHeight(jsonDiv);
  }

  viewSutraEnglish() {
    let english = this.behavior.exportToEnglish();
    // replace all \n with <br>
    //english = english.replace(/\n/g, '<br>');
    // TODO: add Sutra's i18n support
    //let cn = this.behavior.exportToEnglish(0, 'zh');
    //let ja = this.behavior.exportToEnglish(0, 'ja');
    // clear the #sutraTable
    let table = document.getElementById('sutraTable');
    table.innerHTML = '';
    let pre = document.createElement('pre');
    let englishDiv = document.createElement('code');
    englishDiv.style.width = '95%';
    englishDiv.style.height = '800px';
    englishDiv.innerHTML = english;
    pre.appendChild(englishDiv);
    table.appendChild(pre);
  }

  getEmitters() {
    return this.game.emitters;
  }

  redrawBehaviorTree(json) {
    let container = document.getElementById('sutraView');

    let table = document.getElementById('sutraTable');
    table.innerHTML = '';
    //let guiContent = container.querySelector('.gui-content');
    json.tree.forEach(node => {
      table.appendChild(this.createNodeElement(node, 1));
    });
  }

  drawBehaviorTree(json) {
    // get existing container
    let container = document.getElementById('sutraView');
    let table = document.getElementById('sutraTable');
    //let guiContent = container.querySelector('.gui-content');
    if (json.tree.length === 0) {
      // add message to indicate no sutra
      // table.innerHTML = 'No Sutra Rules have been defined yet. Click "Add Rule" to begin.';
      return;
    }
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

  createNodeElement(node, indentLevel, path = '', keyword = 'IF') {
    let formElement = document.createElement('form');
    formElement.className = 'node-element-form';

    const nodeId = path ? `${path}-${node.action || node.if}` : (node.action || node.if);

    // Check if node.subtree is a string, indicating a subtree reference
    if (typeof node.subtree === 'string') {
      // Retrieve the subtree based on the reference
      let subtree = this.game.rules.getSubtree(node.subtree);

      // Check if subtree is an instance of Sutra and needs recursive rendering
      // Render each node in the subtree recursively
      subtree.tree.forEach(subNode => {
        let childFormElement = this.createNodeElement(subNode, indentLevel + 1, nodeId);
        formElement.appendChild(childFormElement);
      });
    }

    let contentDiv = document.createElement('div');
    contentDiv.className = 'node-element';
    formElement.appendChild(contentDiv);

    if (node.action) {
      formElement.classList.add('action-node-form');
      formElement.onclick = () => {
        this.showActionForm(node);
      }
      this.appendActionElement(contentDiv, node, indentLevel, keyword);
    } else if (node.if) {
      this.appendConditionalElement(contentDiv, node, indentLevel);
    }
    if (indentLevel !== 1) {
      formElement.classList.add('collapsible-content');
    }

    return formElement;
  }


  saveSutra() {
    // get the #sutraTable
    let table = document.getElementById('sutraTable');

    // console.log('saveSutra', this.serializeFormToJSON(table));
  }

  appendActionElement(element, node, indentLevel, keyword = 'THEN') {

    // "Then" clause container
    let actionSelectContainer = document.createElement('div');
    actionSelectContainer.className = 'action-select-container';

    // "Then" clause label with embedded select element
    let thenLabel = document.createElement('label');
    thenLabel.className = 'then-label';

    thenLabel.innerHTML = `<span class="sutra-keyword">${keyword}</span>`;
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
      // console.log('made a nodes query', nodes)
      // remove all collapsed classes from those nodes
      nodes.forEach(node => {
        // TODO: why toggle not working as expected?
        // node.classList.toggle('collapsed');
        // node.classList.remove('collapsed');
      });
    }

    // Append the action select container to the main element
    element.appendChild(actionSelectContainer);

    if (node.data) {


      let dataContainer = document.createElement('div');
      dataContainer.className = 'data-container';
      dataContainer.classList.add('with-container');
      dataContainer.setAttribute('data-path', node.sutraPath);

      let withLabel = document.createElement('label');
      withLabel.className = 'with-label';
      withLabel.innerHTML = `<a href="#" class="sutra-keyword">WITH</a>`;
      //dataContainer.appendChild(withLabel);

      actionSelectContainer.appendChild(withLabel);

      //let dataView = this.dataView(node, indentLevel);
      // Append the data container to the main element
      //element.appendChild(dataView);
    }
  }


  createActionSelect(node) {
    let select = document.createElement('select');
    select.className = 'action-select';

    let actions = this.getAvailableActions();

    // Check if node.action is in the list of actions
    if (node.action && !actions.includes(node.action)) {
      actions.push(node.action); // Add it to the list if not present
    }

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

  createInputGroup(node, key, indentLevel, path) {
    let inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';

    let label = this.createLabel(key, indentLevel);
    let input = this.createInput(node, key, path);

    inputGroup.appendChild(label);
    inputGroup.appendChild(input);

    return inputGroup;
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
        element.appendChild(self.createNodeElement(childNode, indentLevel + 1, '', 'THEN'))
      });
    }
    if (node.else) {
      let elseElement = this.createElseElement(node, indentLevel);
      element.appendChild(elseElement);
    }
  }

  createConditionElement(node) {
    let self = this;
    let keyword = "IF";
    let conditionContainer = document.createElement('div');
    conditionContainer.className = 'condition-container';

    // check to see if node.sutraPath is anywhere at first level of tree[0]
    // could be tree[1] or tree[2] etc.
    let isFirstLevel = false;
    // check to see if has one "[" then it is first level
    // TODO: better way to handle this
    if (node.sutraPath.split('[').length === 2) {
      isFirstLevel = true;
    }

    if (!isFirstLevel) {
      // Add a visual separator, if desired
      /*
      let ifSeparator = document.createElement('div');
      ifSeparator.className = 'condition-separator';
      ifSeparator.textContent = 'IF';
      conditionContainer.appendChild(ifSeparator);
      */
      keyword = "AND";

    }

    if (Array.isArray(node.if)) {
      node.if.forEach((cond, i) => {
        let condition = document.createElement('div');
        condition.className = 'condition';
        condition.innerHTML = `<span class="sutra-keyword">${keyword}</span> ${cond}`;
        // set data-path attribute to node.sutraPath
        condition.setAttribute('data-path', node.sutraPath);
        condition.onclick = function () {
          // Remark: Editing / Viewing Conditionals is not yet supported
          // self.showConditionalsForm(node);
        }

        conditionContainer.appendChild(condition);

        //const removeRuleBtn = self.createRemoveRuleButton(node.sutraPath);
        //condition.appendChild(removeRuleBtn);

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
      condition.innerHTML = `<span class="sutra-keyword">${keyword}</span> ${node.if}`;

      condition.setAttribute('data-path', node.sutraPath);

      condition.onclick = function () {
        // find the child node-element-form in condition
        let nodeElementForm = condition.parentElement.parentElement.querySelector('.node-element-form');
        // nodeElementForm.classList.toggle('collapsed');
        // Remark: Editing / Viewing Conditionals is not yet supported
        // self.showConditionalsForm(node);
      }
      conditionContainer.appendChild(condition);

      //const removeRuleBtn = self.createRemoveRuleButton(node.sutraPath);
      //condition.appendChild(removeRuleBtn);

    }

    // clicking the form element will toggle collapsed class
    conditionContainer.onclick = (e) => {
      let target = e.target;
      let container = target.parentElement;
      let allCollapsibleContent = conditionContainer.parentElement.querySelectorAll('.node-element-form');
      allCollapsibleContent.forEach(collapsibleContent => {
        collapsibleContent.classList.toggle('collapsible-content');
      });
    }

    return conditionContainer;
  }

  createElseElement(node, indentLevel) {
    let keyword = "ELSE";

    let elseElement = document.createElement('div');
    elseElement.className = 'else-branch';
    node.else.forEach(childNode => elseElement.appendChild(this.createNodeElement(childNode, indentLevel + 1, '', 'ELSE')));
    return elseElement;
  }

  saveConditional(conditionalName, form) {
    let json = this.serializeFormToJSON(form);
    console.log('SutraGui.saveConditional() called', conditionalName, json)
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
    if (game.tick % 60 === 0) {
      // Clear previously highlighted elements
      document.querySelectorAll('.highlighted-sutra-node').forEach(node => {
        node.classList.remove('highlighted-sutra-node');
        // node.classList.add('collapsed');

      });
    }
  }

  unload() {
    // remove all html elements
    this.sutraView.remove();
  }

  adjustTextareaHeight(textarea) {
    textarea.style.height = 'auto'; // Reset height to recalculate
    textarea.style.height = textarea.scrollHeight + 'px'; // Set new height
  }

}

export default SutraGUI;