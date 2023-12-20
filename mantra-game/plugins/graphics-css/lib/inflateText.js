
export default function inflateText(entityElement, entityData) {
  let depthChart = this.depthChart;
  // TODO: check if chat bubble already exists, if so just update it
  // Create a container for the chat bubble
  entityElement.className = 'chat-bubble-container';
  entityElement.style.position = 'absolute';


  // Create the chat bubble itself
  const chatBubble = document.createElement('div');
  chatBubble.className = 'chat-bubble';
  chatBubble.style.position = 'absolute';
  chatBubble.style.border = '1px solid #000';
  chatBubble.style.borderRadius = '10px';
  // chatBubble.style.padding = '10px';
  // set padding to left and right
  chatBubble.style.paddingLeft = '10px';
  chatBubble.style.paddingRight = '10px';
  chatBubble.style.background = '#fff';
  // chatBubble.style.maxWidth = '200px';
  //chatBubble.style.width = `${entityData.width}px`;
  //chatBubble.style.height = `${entityData.height}px`;
  chatBubble.innerText = entityData.text || '';

  // set default depth based on type
  // console.log(entityData.type, entityData.name, depthChart.indexOf(entityData.type))
  chatBubble.style.zIndex = depthChart.indexOf(entityData.type);
  
  // console.log('appending new text element')
  // Append the chat bubble to the container
  entityElement.appendChild(chatBubble);
  // Update the position of the chat bubble container
  //this.updateEntityElementPosition(entityElement, entityData);

  return entityElement;
}