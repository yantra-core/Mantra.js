let storeOriginalInHiddenScriptTag = false;
let originalScriptCopyPrefix = 'mantra-code-src-';

// TODO: Move this to Code.js Plugin inflate()
export default function inflateCode(entityElement, entityData) {

  let graphic = entityData.graphics && entityData.graphics['graphics-css'];

  let pre, code

  if (graphic) {
    // graphic is top level DOM, all other elements are children
    pre = graphic.querySelectorAll('pre')[0];
    code = graphic.querySelectorAll('code')[0];
  } else {
    pre = document.createElement('pre');
    code = document.createElement('code');
    pre.appendChild(code);
    entityElement.appendChild(pre);
  }

  // add class "language-javascript" to the code element
  let codeHighlightClassName = 'language-' + entityData.meta.language;
  codeHighlightClassName = 'language-javascript'; // TODO: remove this line
  code.classList.add(codeHighlightClassName);

  // Initialize fetchSourceHandles if it doesn't exist
  this.fetchSourceHandles = this.fetchSourceHandles || {};

  const src = entityData.meta && entityData.meta.src;
  if (src) {
    // Set initial content to indicate loading
    code.textContent = `Loading... ${src}`;

    if (!this.fetchSourceHandles[src]) {

      // Create a mutex and start fetching the content
      this.fetchSourceHandles[src] = fetch(src)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then(content => {
          // Update the code element directly once the content is fetched
          Array.from(document.querySelectorAll(`code[data-src="${src}"]`)).forEach((el) => {
            let html = Prism.highlight(content, Prism.languages.javascript, 'javascript');
            el.innerHTML = html;
          });

          //
          // Will save the original source code in a hidden script tag,
          // useful for debugging, could be used if others required such functionality
          if (storeOriginalInHiddenScriptTag) {
            let name = 'shared';
            let domId = originalScriptCopyPrefix + name;

            if (typeof entityData.name !== 'undefined') {
              domId = entityData.name;
            }

            // check if exists
            let script = document.getElementById(domId);

            // if not create
            if (!script) {
              script = document.createElement('script');
              script.id = domId;
              script.type = 'text/plain';
              document.body.appendChild(script);
            }
            script.textContent = content;
          }

          // update the meta.code property on the ECS
          // console.log('updating entity', entityData.id, { meta: { code: content } })
          game.updateEntity(entityData.id, { meta: { code: content } })
          // Store the fetched content for future use, replacing the promise
          this.fetchSourceHandles[src] = { content };
        })
        .catch(error => {
          console.error('Error fetching source code:', error);
          // Update all code elements with the error message
          Array.from(document.querySelectorAll(`code[data-src="${src}"]`)).forEach((el) => {
            el.textContent = '// Error fetching source code \n' + error;
          });
          // Store the error message for future use, replacing the promise
          this.fetchSourceHandles[src] = { error: '// Error fetching source code' };
          throw error;
        });
    }

    // Mark the code element with a data attribute for future updates
    code.setAttribute('data-src', src);
  } else {
    // Set default code text if none provided and no src is specified
    code.textContent = entityData.meta && entityData.meta.code || '';
  }

  applyCodeStyles(entityElement, pre, code, entityData);

  // Additional style adjustments
  if (entityData.width) {
    pre.style.width = `${entityData.width}px`;
  }

  if (entityData.height) {
    pre.style.height = `${entityData.height}px`;
  }

  if (entityData.color) {
    code.style.color = convertColorToHex(entityData.color);
  }

  return entityElement;
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
