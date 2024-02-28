let storeOriginalInHiddenScriptTag = false;
let originalScriptCopyPrefix = 'mantra-code-src-';
let usePrism = true;

export default function inflateCode(entityElement, entityData) {
  let game = this.game;
  let graphic = entityData.graphics && entityData.graphics['graphics-css'];

  let pre, code, textarea;

  if (graphic) {
    // Use graphic if available
    console.log('graphicgraphicgraphicgraphic', graphic)
    code = graphic.querySelector('code');
    pre = graphic.querySelector('pre');
    let textarea = graphic.querySelector('textarea');

    graphic.innerHTML = ''; // Clear the graphic element

    [pre, code] = [document.createElement('pre'), document.createElement('code')];
    pre.appendChild(code);
    entityElement.appendChild(pre);


  } else {
    // Create elements if not provided
    [pre, code] = [document.createElement('pre'), document.createElement('code')];
    pre.appendChild(code);
    entityElement.appendChild(pre);
  }

  entityElement.style.overflow = 'auto';

  // remove all prism-live instances from document
  let prismLiveInstances = document.querySelectorAll('.prism-live');
  // alert(prismLiveInstances.length)
  prismLiveInstances.forEach((el) => {
    // el.remove();
  });

  // Ensure fetchSourceHandles is initialized
  this.fetchSourceHandles = this.fetchSourceHandles || {};

  const src = entityData.meta && entityData.meta.src;
  if (src) {
    code.textContent = `Loading... ${src}`; // Indicate loading
    fetchSourceCode.call(this, src, code, entityElement, game, entityData);
  } else {
    // code.textContent = entityData.meta?.code || ''; // Set default code
  }

  // applyCodeStyles(entityElement, pre, code, entityData);
  adjustStyles(pre, code, entityData);

  return entityElement;
}

// Check for cached content before fetching
function fetchSourceCode(src, codeElement, entityElement, game, entityData) {
  if (this.fetchSourceHandles[src]) {
    const cache = this.fetchSourceHandles[src];
    if (cache.content) {
      updateCodeElements(src, cache.content, codeElement, entityElement, game, entityData);
    } else if (cache.error) {
      handleFetchError(src, codeElement, cache.error);
    }
  } else {
    this.fetchSourceHandles[src] = fetch(src)
      .then(handleFetchResponse.bind(this, src, codeElement, entityElement, game, entityData))
      .catch(handleFetchError.bind(null, src, codeElement));
  }
  codeElement.setAttribute('data-src', src);
}

async function handleFetchResponse(src, codeElement, entityElement, game, entityData, response) {
  if (!response.ok) throw new Error('Network response was not ok');
  const content = await response.text();
  updateCodeElements(src, content, codeElement, entityElement, game, entityData);
  this.fetchSourceHandles[src] = { content }; // Cache content
}

function handleFetchError(src, codeElement, error) {
  console.error('Error fetching source code:', error);
  const errorMessage = '// Error fetching source code\n' + error;
  Array.from(document.querySelectorAll(`code[data-src="${src}"]`)).forEach(el => el.textContent = errorMessage);
  this.fetchSourceHandles[src] = { error: errorMessage }; // Cache error message
}

function updateCodeElements(src, content, codeElement, entityElement, game, entityData) {
  document.querySelectorAll(`code[data-src="${src}"]`).forEach(el => {

    let textarea = updateOrCreateTextarea(el, content, entityElement);

    if (usePrism) {
     function tryPrism () {
        if (window.Prism && window.Prism.Live) {
          let textarea = updateOrCreateTextarea(el, content, entityElement);
          new Prism.Live(textarea);
          attachTextareaEvents(textarea, game);
        } else {
          setTimeout(tryPrism, 100);
        }
      }
      tryPrism();
    } else {
      el.textContent = content;
    }
    if (game.systems.monaco?.editor) {
      game.systems.monaco.editor.setValue(content);
    }
    game.updateEntity(entityData.id, { meta: { code: content } });
  });
}

function updateOrCreateTextarea(el, content, entityElement) {
  let textarea = entityElement.querySelector('textarea');
  if (!textarea) {
    // alert('new area')
    textarea = document.createElement('textarea');
    textarea.setAttribute('spellcheck', 'false');
    textarea.className = 'language-javascript';
    textarea.fresh = true;
    textarea.style.overflow = 'hidden';
    el.parentNode.parentNode.appendChild(textarea);
    el.parentNode.style.display = 'none';
  } else {
    textarea.fresh = false;

  }
  textarea.value = content;
  return textarea;
}

function attachTextareaEvents(textarea, game) {
  textarea.addEventListener('mousedown', () => {
    game.data.camera.draggingAllowed = false;
    game.data.camera.mouseWheelZoomEnabled = false;
    console.log('mousedown')
    game.unbindKeyboard();
  });
  textarea.addEventListener('blur', () => {
    game.data.camera.draggingAllowed = true;
    game.data.camera.mouseWheelZoomEnabled = true;
    game.bindKeyboard();
  });
}

function adjustStyles(pre, code, entityData) {
  if (entityData.width) pre.style.width = `${entityData.width}px`;
  if (entityData.height) pre.style.height = `${entityData.height}px`;
  //if (entityData.color) code.style.color = convertColorToHex(entityData.color);
}

function convertColorToHex(color) {
  // Implement the color conversion logic here
}

function applyCodeStyles(entityElement, pre, code, entityData) {
  // Define and apply default styles for code element here
  // For example, setting a monospace font and a background color
  pre.style.display = 'block';
  pre.style.overflow = 'auto';
  pre.style.paddingLeft = '5px';
  pre.style.paddingRight = '5px';
  pre.style.margin = '0px';
  pre.style.backgroundColor = '#1E1E1E'; // Dark background for the code block

  entityElement.style.padding = '0px'; // Remove padding from the entity element
  entityElement.style.margin = '0px'; // Remove padding from the entity element

  code.style.fontFamily = 'monospace';
  code.style.fontSize = '14px';
  code.style.color = '#D4D4D4'; // Light color for the text for better contrast

  // entityElement.style.border = "2px solid #999"; // Default border
  entityElement.style.boxShadow = "0 0 8px 0 rgba(0, 0, 0, 0.1)"; // Soft shadow for a subtle effect
  entityElement.style.transition = "all 0.3s ease-in-out"; // Smooth transition for hover effect

  // Define hover effect styles
  const hoverBorderStyle = "2px solid #fff"; // Border color for hover state
  const hoverBoxShadowStyle = "0 0 15px 5px rgba(0, 150, 255, 0.7)"; // Glowing effect for hover state

  // Add event listeners to change styles on hover
  entityElement.addEventListener('mouseenter', () => {
    entityElement.style.border = hoverBorderStyle;
    entityElement.style.boxShadow = hoverBoxShadowStyle;
  });

  // Revert to default styles when not hovering
  entityElement.addEventListener('mouseleave', () => {
    entityElement.style.border = "2px solid #999";
    entityElement.style.boxShadow = "0 0 8px 0 rgba(0, 0, 0, 0.1)";
  });

  // Apply any custom styles from entityData if provided
  if (entityData.style) {
    Object.assign(pre.style, entityData.style.pre); // Apply styles to the <pre> element
    Object.assign(code.style, entityData.style.code); // Apply styles to the <code> element
  }
}

// TODO: similiar styles for applyCodeStyles
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
}