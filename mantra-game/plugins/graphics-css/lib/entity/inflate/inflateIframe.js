export default function inflateIframe(entityElement, entityData) {
  let iframe = document.createElement('iframe');

  if (entityData.meta && entityData.meta.src) {

    if ( entityData.meta.src === null) {
      // clear the iframe
      iframe.src = 'about:blank';
      // TODO: custom about:mantra page
    } else {
      iframe.src = entityData.meta.src || 'about:blank'; // Default src if none provided
    }
  }

  // Optional: Apply default and custom iframe styles
  applyIframeStyles(iframe, entityData);

  entityElement.appendChild(iframe);

  if (entityData.width) {
    iframe.style.width = `${entityData.width}px`;
  }

  if (entityData.height) {
    iframe.style.height = `${entityData.height}px`;
  }

  return entityElement;
}

function applyIframeStyles(iframe, entityData) {
  // Define default styles for the iframe
  iframe.style.border = "2px solid #999"; // Default border
  iframe.style.boxShadow = "0 0 8px 0 rgba(0, 0, 0, 0.1)"; // Soft shadow for a subtle effect
  iframe.style.transition = "all 0.3s ease-in-out"; // Smooth transition for hover effect

  // Define hover effect styles
  const hoverBorderStyle = "2px solid #fff"; // Border color for hover state
  const hoverBoxShadowStyle = "0 0 15px 5px rgba(0, 150, 255, 0.7)"; // Glowing effect for hover state

  // Add event listeners to change styles on hover
  iframe.addEventListener('mouseenter', () => {
    iframe.style.border = hoverBorderStyle;
    iframe.style.boxShadow = hoverBoxShadowStyle;
  });

  // Revert to default styles when not hovering
  iframe.addEventListener('mouseleave', () => {
    iframe.style.border = "2px solid #999";
    iframe.style.boxShadow = "0 0 8px 0 rgba(0, 0, 0, 0.1)";
  });

  // On any iframe message bubble the event to game.emit('iframeMessage')
  iframe.addEventListener('message', (event) => {
    //console.log("IFRAME GOT MESSAGE inflateIframe")
    game.emit('iframeMessage', event);
  });

}
