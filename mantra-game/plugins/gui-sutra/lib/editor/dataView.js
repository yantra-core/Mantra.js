export default function dataView(node, indentLevel = 0) {
  this.createDataContainer = createDataContainer.bind(this);
  this.createNestedDataContainer = createNestedDataContainer.bind(this);
  this.createLabel = createLabel.bind(this);
  this.createValueDisplay = createValueDisplay.bind(this);

  let dataContainer = document.createElement('div');
  dataContainer.className = 'data-container';
  dataContainer.classList.add('with-container');
  dataContainer.setAttribute('data-path', node.sutraPath);

  let withLabel = document.createElement('label');
  withLabel.className = 'with-label';
  withLabel.innerHTML = `<span class="sutra-keyword">WITH</span>`;
  dataContainer.appendChild(withLabel);

  let dataContent = this.createDataContainer(node, indentLevel);
  dataContainer.appendChild(dataContent);
  return dataContainer;
}

function createDataContainer(node, indentLevel) {
  let dataContainer = document.createElement('div');
  dataContainer.className = '';

  Object.keys(node.data).forEach(key => {
    let path = key;
    if (typeof node.data[key] === 'object' && node.data[key] !== null) {
      let nestedLabel = this.createLabel(key, indentLevel);
      dataContainer.appendChild(nestedLabel);
      let nestedContainer = this.createNestedDataContainer(node.data[key], indentLevel + 1, path);
      dataContainer.appendChild(nestedContainer);
    } else {
      let valueDisplay = this.createValueDisplay(key, node.data[key], indentLevel, path);
      dataContainer.appendChild(valueDisplay);
    }
  });
  return dataContainer;
}

function createNestedDataContainer(nestedNode, indentLevel, path = '') {
  let nestedDataContainer = document.createElement('div');
  nestedDataContainer.className = 'nested-data-container nested-level-' + indentLevel;

  Object.keys(nestedNode).forEach(nestedKey => {
    let nestedPath = path ? `${path}.${nestedKey}` : nestedKey;
    if (typeof nestedNode[nestedKey] === 'object' && nestedNode[nestedKey] !== null) {
      let nestedLabel = this.createLabel(nestedKey, indentLevel);
      nestedDataContainer.appendChild(nestedLabel);

      let innerNestedContainer = this.createNestedDataContainer(nestedNode[nestedKey], indentLevel + 1, nestedPath);
      nestedDataContainer.appendChild(innerNestedContainer);
    } else {
      let valueDisplay = this.createValueDisplay(nestedKey, nestedNode[nestedKey], indentLevel, nestedPath);
      nestedDataContainer.appendChild(valueDisplay);
    }
  });

  return nestedDataContainer;
}

function createLabel(key, indentLevel) {
  let label = document.createElement('label');
  label.className = 'data-label';
  label.innerText = key;
  console.log("CRETING LABEL", key, indentLevel)
  label.style.paddingLeft = `${indentLevel * 20}px`; // Indentation for nesting
  return label;
}

function createValueDisplay(key, value, indentLevel, path) {
  let valueDisplayWrapper = document.createElement('div');
  valueDisplayWrapper.className = 'data-value-wrapper';
  valueDisplayWrapper.style.paddingLeft = `${indentLevel * 20}px`;

  let label = document.createElement('label');
  label.className = 'data-key';
  label.innerText = key + ':';
  valueDisplayWrapper.appendChild(label);

  let valueDisplay = document.createElement('div');
  valueDisplay.className = 'data-value';
  valueDisplay.innerText = value;
  valueDisplayWrapper.appendChild(valueDisplay);

  valueDisplayWrapper.setAttribute('data-path', path);
  return valueDisplayWrapper;
}