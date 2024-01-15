export default function inflateText(entityElement, entityData) {
  let depthChart = this.depthChart;
  // TODO: check if chat bubble already exists, if so just update it
  // Create a container for the chat bubble
  
  entityElement.innerText = entityData.text;

  if (entityData.style) {
    // apply styles
    for (let key in entityData.style) {
      entityElement.style[key] = entityData.style[key];
    }
  }

  if (entityData.color) {
    entityElement.style.color = entityData.color;
  }

  /* Remark: No need to bind each entity to a pointerdown event for CSSGraphics, we can delegate
  // console.log('inflateBox', entityData.type, entityElement.style.zIndex)
  chatBubble.addEventListener('pointerdown', (ev) => {
    //console.log(ev.target, entityData.id, entityData.type, entityData)
    // get the full ent from the game
    let ent = game.getEntity(entityData.id);
    game.emit('pointerDown', ent, ev);
  });
  */

  // console.log('appending new text element')
  // Append the chat bubble to the container
  // entityElement.appendChild(chatBubble);
  // Update the position of the chat bubble container
  //this.updateEntityElementPosition(entityElement, entityData);

  return entityElement;
}