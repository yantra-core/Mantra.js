export default function dataView(node, indentLevel = 0) {

  this.createDataContainer = createDataContainer.bind(this);
  this.createNestedDataContainer = createNestedDataContainer.bind(this);

  // "With" context container for data
  let dataContainer = document.createElement('div');
  dataContainer.className = 'data-container';
  // Add with-container class
  dataContainer.classList.add('with-container');
  // dataContainer.classList.add('collapsed');

  // set data-path attribute to sutraPath
  dataContainer.setAttribute('data-path', node.sutraPath);

  // "With" context label
  let withLabel = document.createElement('label');
  withLabel.className = 'with-label';
  withLabel.innerHTML = `<span class="sutra-keyword">WITH</span>`;
  dataContainer.setAttribute('data-path', node.sutraPath);

  // Append the label directly to the data container
  dataContainer.appendChild(withLabel);

  // Create and append the data content to the data container
  let dataContent = this.createDataContainer(node, indentLevel);
  dataContainer.appendChild(dataContent);
  return dataContainer;

}

function createDataContainer(node, indentLevel) {
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

function createNestedDataContainer(nestedNode, indentLevel, path = '') {
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