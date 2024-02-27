export default function updateGraphic(entityData) {
  let game = this.game;
  // TODO: move this to common 3D-2.5D transform function(s)
  if (typeof entityData.rotation !== 'undefined' && entityData.rotation !== null) {
    if (typeof entityData.rotation === 'object') {
      // transform 3d to 2.5d
      entityData.rotation = entityData.rotation.x; // might not be best to mutate entityData
    } else {
      entityData.rotation = entityData.rotation;
    }
  }

  const entityElement = document.getElementById(`entity-${entityData.id}`);
  if (entityElement) {
    // Update the entity color
    // TODO: remove this refactor all code to inflate* paths
    if (typeof entityData.color !== 'undefined' && entityData.color !== null && entityData.type !== 'TEXT') {
      // entityData.color is int number here we need a hex
      let hexColor = '#' + entityData.color.toString(16);
      // update the background color
      entityElement.style.background = hexColor;
    }

    if (typeof entityData.position.z === 'number') {
      entityElement.style.zIndex = entityData.position.z;
    }

    if (entityData.type === 'TEXT' && typeof entityData.text !== 'undefined' && entityData.text !== null) {
      // check that text has changed
      if (entityElement.innerHTML !== entityData.text) {
        entityElement.innerHTML = entityData.text;
      }
      // return this.inflateText(entityData);
    }

    if (typeof entityData.width !== 'undefined') {
      entityElement.style.width = entityData.width + 'px';
    }

    if (typeof entityData.height !== 'undefined') {
      entityElement.style.height = entityData.height + 'px';
    }

    if (typeof entityData.radius !== 'number') {
    } else {
      // Multiply the radius by 2 to get the diameter for CSS
      let diameter = entityData.radius * 2;
      entityElement.style.width = diameter + 'px';
      entityElement.style.height = diameter + 'px';
    }

    // Size is new API, remove direct refs at ent root to height and width and radius
    if (typeof entityData.size === 'object') {
      if (typeof entityData.size.width !== 'undefined') {
        entityElement.style.width = entityData.size.width + 'px';
      }

      if (typeof entityData.size.height !== 'undefined') {
        entityElement.style.height = entityData.size.height + 'px';
      }

    }

    if (entityData.style) {
      Object.keys(entityData.style).forEach((key) => {
        entityElement.style[key] = entityData.style[key];
      });
    }

    if (entityData.type === 'IFRAME') {
      let iframe = entityElement.querySelector('iframe');
      // check to see if iframe src matches entityData.meta.src
      if (iframe && iframe.src !== entityData.meta.src) {

        if ( entityData.meta.src === null) {
          // clear the iframe
          iframe.src = 'about:blank';
          // TODO: custom about:mantra page
        } else {
          iframe.src = entityData.meta.src || 'about:blank'; // Default src if none provided
        }

      }
    }

    if (entityData.type === 'CODE') {
      // Query entityElement for the first code tag that has a 'data-src' attribute matching entityData.meta.src
      let codeElement = entityElement.querySelector(`code[data-src="${entityData.meta.src}"]`);
      //console.log('entityElement', entityElement);

      if (codeElement) {
      } else {
        console.log("No code element with matching data-src found.", entityData.meta.src);
        if (this.game.systems.code) {
          this.game.systems.code.inflate(entityElement, entityData);
        }
      }

    }

    return this.updateEntityPosition(entityElement, entityData);

  } else {
    // If the entity element does not exist, create it
    return this.createGraphic(entityData);
  }
}