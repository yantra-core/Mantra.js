export default function inflateIframe(entityElement, entityData) {
  let iframe = document.createElement('iframe');

  if (entityData.meta && entityData.meta.src) {
    iframe.src = entityData.meta.src || 'about:blank'; // Default src if none provided
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
  // Define and apply default styles for iframe here
  // Similar to applySelectStyles function
}