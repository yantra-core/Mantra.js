import gui from '../../../gui-editor/gui.js';

export default function showActionForm(node) {

  /*
  // If the node is undefined, assume we are at tree root
  if (typeof node === 'undefined') {
    node = {
      sutraPath: 'tree',
      action: 'newConditional'
    };
  }
  */

  console.log('node', node);

  let sutraActionEditor = document.getElementById('sutraActionEditor');
  if (!sutraActionEditor) {
    this.sutraActionEditor = gui.window('sutraActionEditor', 'Sutra Action Editor', function () {
      let sutraActionEditor = document.getElementById('sutraActionEditor');
      if (sutraActionEditor) {
        sutraActionEditor.remove();
      }
    });
  }
  // not working?
  gui.bringToFront(this.sutraActionEditor);

  let guiContent = this.sutraActionEditor.querySelector('.gui-content');
  guiContent.innerHTML = ''; // Clear previous content


  // "Then" clause container
  let actionSelectContainer = document.createElement('div');
  actionSelectContainer.className = 'action-select-container';

  // "Then" clause label with embedded select element
  let thenLabel = document.createElement('label');
  thenLabel.className = 'then-label';

  thenLabel.innerHTML = `<span class="sutra-keyword">THEN</span>`;
  actionSelectContainer.setAttribute('data-path', node.sutraPath);

  let select = this.createActionSelect(node);
  // Append select element inside label element
  thenLabel.appendChild(select);

  // Append the label (with the select inside it) to the container
  actionSelectContainer.appendChild(thenLabel);



  let nodeInfo = document.createElement('div');
  nodeInfo.className = 'node-info';

  let ifLink = '';

  if (Array.isArray(node.if)) {
    node.if.forEach((conditionalName, index) => {
      // let conditional = this.behavior.getCondition(conditionalName);
      if (index > 0) {
        ifLink += ` <strong class="sutra-keyword">AND</strong> <span="openCondition" class="sutra-link" data-path="${node.sutraPath}">${conditionalName}</span>`;
      } else {
        ifLink += `<span="openCondition" class="sutra-link" data-path="${node.sutraPath}">${conditionalName}</span>`;
      }
    });
  }
  else {
    ifLink = node.if;
  }

  let humanPath = this.behavior.getReadableSutraPath(node.sutraPath) || 'root';

  humanPath = humanPath.replace('and', '<strong class="sutra-keyword">..</strong>');
  // Create and append the 'Path' element
  let pathElement = document.createElement('div');
  pathElement.innerHTML = `<strong class="sutra-keyword">PATH</strong> ${humanPath}`;
  nodeInfo.appendChild(pathElement);


  // Append the entire node info to the GUI content
  guiContent.appendChild(nodeInfo);

  // Append the entire container to the GUI content
  guiContent.appendChild(actionSelectContainer);

  //  this.appendActionElement(guiContent, node);

  let formContainer = this.dataForm(node);
  guiContent.appendChild(formContainer);

}