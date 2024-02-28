// inflateLink.js
export default function inflateLink(entityElement, entityData) {
  // Create the link element
  let link = document.createElement('a');

  if (entityData.text) {
    link.innerHTML = entityData.text;
  }

  if (entityData.meta.target) {
    link.target = entityData.meta.target;
  }

  if (entityData.meta.href) {
    link.href = entityData.meta.href;
  }

  // Apply styles and append the link to the entityElement
  applyLinkStyles(link, entityData);
  entityElement.appendChild(link);

  // Set width, height, and color if provided
  if (entityData.width) {
    entityElement.style.width = `${entityData.width}px`;
    link.style.width = '100%';
  }

  if (entityData.height) {
    entityElement.style.height = `${entityData.height}px`;
    link.style.height = '100%';
  }

  if (entityData.color) {
    entityElement.style.color = convertColorToHex(entityData.color);
  }

  return entityElement;
}

const defaultLinkStyles = {
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
  color: 'blue', // Default link color
  transition: 'color 0.4s ease',
};

function applyLinkStyles(link, entityData) {
  Object.assign(link.style, defaultLinkStyles, entityData.style);
}

function convertColorToHex(color) {
  return typeof color === 'number' ? `#${color.toString(16)}` : color;
}