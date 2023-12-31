export default function setTransform(entityElement, domX, domY, rotation, angle) {
  // Retrieve the last rotation value, default to 0 if not set
  let lastRotation = entityElement.dataset.rotation || 0;
  
  // Check if the element has a background image
  // Remark: We could add more formalized support for spritesheets here
  // The check is performed in order to not rotate the images on sprites that animate
  const hasBackgroundImage = entityElement.style.backgroundImage && entityElement.style.backgroundImage !== 'none';

  // Update rotation if provided and no background image
  if (rotation && !hasBackgroundImage) {
      lastRotation = angle;
      entityElement.dataset.rotation = angle;
  }

  // Update the transform property
  let newTransform = `translate(${truncateToPrecision(domX, 2)}px, ${truncateToPrecision(domY, 2)}px)`;

  // Add rotation to the transform if no background image
  if (!hasBackgroundImage) {
      newTransform += ` rotate(${lastRotation}deg)`;
  }

  // compare the new transform to the previous transform
  // if they are the same, don't update
  const prevTransform = entityElement.style.transform;
  if (prevTransform !== newTransform) {
      entityElement.style.transform = newTransform;
  }
}

function truncateToPrecision(value, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
}
