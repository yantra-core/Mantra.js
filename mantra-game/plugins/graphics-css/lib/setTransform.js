export default function setTransform(entityElement, domX, domY, rotation, angle) {
  // Retrieve the last rotation value, default to 0 if not set
  let lastRotation = entityElement.dataset.rotation || 0;
  // Update rotation if provided
  if (rotation) {
    lastRotation = angle;
    entityElement.dataset.rotation = angle;
  }

  // Update the transform property
  let prevTransform = entityElement.style.transform;
  let newTransform = `translate(${truncateToPrecision(domX, 2)}px, ${truncateToPrecision(domY, 2)}px) rotate(${lastRotation}deg)`;

  // compare the new transform to the previous transform
  // if they are the same, don't update
  if (prevTransform === newTransform) {
    return;
  }
  // console.log('current pos', prevTransform, 'new pos', newTransform)
  entityElement.style.transform = newTransform;
}

function truncateToPrecision(value, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
}