import gui from '../../../gui-editor/gui.js';

export default function showConditionalsForm (node) {
  // If the node is undefined, assume we are at tree root
  if (typeof node === 'undefined') {
    node = {
      sutraPath: 'tree',
      action: 'newConditional',
      if: 'newConditional',
      then: [{ action: 'newAction' }]
    };
  }

  let sutraFormView = document.getElementById('sutraFormView');
  if (!sutraFormView) {
    this.sutraFormView = gui.window('sutraFormView', 'Sutra Condition Editor', function () {
      let sutraFormView = document.getElementById('sutraFormView');
      if (sutraFormView) {
        sutraFormView.remove();
      }
    });
  }
  // not working?
  gui.bringToFront(this.sutraFormView);

  let guiContent = this.sutraFormView.querySelector('.gui-content');
  guiContent.innerHTML = ''; // Clear previous content

  let nodeInfo = document.createElement('div');
  nodeInfo.className = 'node-info';

  let ifLink = '';

  if (Array.isArray(node.if)) {
    node.if.forEach((conditionalName, index) => {
      // let conditional = this.behavior.getCondition(conditionalName);
      if (index > 0) {
        ifLink += `<strong class="sutra-keyword">AND</strong> <span="openCondition" class="sutra-link" data-path="${node.sutraPath}">${conditionalName}</span>`;
      } else {
        ifLink += `<span="openCondition" class="sutra-link" data-path="${node.sutraPath}">${conditionalName}</span>`;
      }
    });
  }
  else {
    ifLink = node.if;
  }

  let humanPath = this.behavior.getReadableSutraPath(node.sutraPath) || 'root';
  console.log('humanPath', humanPath)
  humanPath = humanPath.replace('and', '');
  humanPath = humanPath.split(' ');

  // for each item in humanPath create a span that has sutra-link class and sutra-path attribute
  let path = '';
  humanPath.forEach((item, index) => {
    if (index > 0) {
      path += ` <strong class="sutra-keyword">..</strong> <span="openCondition" class="sutra-link" data-path="${node.sutraPath}">${item}</span>`;
    } else {
      path += `<span="openCondition" class="sutra-link" data-path="${node.sutraPath}">${item}</span>`;
    }
  });


  // Create and append the 'Path' element
  let pathElement = document.createElement('div');
  pathElement.innerHTML = `<strong class="sutra-keyword">ROOT</strong> ${humanPath}`;
  nodeInfo.appendChild(pathElement);

  // Create and append the 'If' element
  let ifElement = document.createElement('div');
  ifElement.innerHTML = `<strong class="sutra-keyword">IF</strong> ${ifLink}`;
  nodeInfo.appendChild(ifElement);

  if (node.then && Array.isArray(node.then) && typeof node.then[0].action !== 'undefined') {
    // Create and append the 'Then' element
    let thenElement = document.createElement('div');
    thenElement.innerHTML = `<strong class="sutra-keyword">THEN</strong> ${node.then[0].action}`;
    // clicking on the Then element should up Action Editor
    thenElement.addEventListener('click', (e) => {
      e.preventDefault();
      this.showActionForm(node.then[0]);
    });
    nodeInfo.appendChild(thenElement);
  }

  /*
  if (typeof node.then[0].data !== 'undefined') {
    // add "WITH" header span
    let withElement = document.createElement('div');
    withElement.innerHTML = `<strong class="sutra-keyword">WITH</strong>`;
    nodeInfo.appendChild(withElement);
  }
  */

  // Append the entire node info to the GUI content
  guiContent.appendChild(nodeInfo);


  // Handle array of conditionals
  if (Array.isArray(node.if)) {
    node.if.forEach(conditionalName => {
      this.createConditionalForm(conditionalName, node);
    });
  } else {
    // get condition first
    let condition = this.behavior.getCondition(node.if);

    if (!condition) {
      console.log('condition not found', node.if);
      condition = {
        op: '==',
        property: 'type',
        value: 'block'
      }
    }

    if (Array.isArray(condition.conditions)) {
      condition.conditions.forEach((condName, index) => {
        let subCondition = this.behavior.getCondition(condName);
        this.createConditionalForm(condName, node);
      });
    } else {
      this.createConditionalForm(node.if, node);
    }
  }

  // add footer for adding new conditional / remove entire if condition
  // let button = addConditionButton(this, conode);

  let footer = document.createElement('div');
  footer.className = 'footer';
  footer.innerHTML = `<h3>Entire Condition Footer</h3>`;
  guiContent.appendChild(footer);

  gui.bringToFront(this.sutraFormView);
}