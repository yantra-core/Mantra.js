
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
            el.textContent = content;
            Prism.highlightAll();
          });

          // Store the fetched content for future use, replacing the promise
          this.fetchSourceHandles[src] = { content };
        })
        .catch(error => {
          console.error('Error fetching source code:', error);
          // Update all code elements with the error message
          Array.from(document.querySelectorAll(`code[data-src="${src}"]`)).forEach((el) => {
            el.textContent = '// Error fetching source code';
          });
          // Store the error message for future use, replacing the promise
          this.fetchSourceHandles[src] = { error: '// Error fetching source code' };
        });
    }

    // Mark the code element with a data attribute for future updates
    code.setAttribute('data-src', src);
  } else {
    // Set default code text if none provided and no src is specified
    code.textContent = entityData.meta && entityData.meta.code || '';
  }

  applyCodeStyles(pre, code, entityData);

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

function applyCodeStyles(pre, code, entityData) {
  // Define and apply default styles for code element here
  // For example, setting a monospace font and a background color
  pre.style.display = 'block';
  pre.style.overflow = 'auto';
  pre.style.padding = '5px';
  pre.style.backgroundColor = '#1E1E1E'; // Dark background for the code block

  code.style.fontFamily = 'monospace';
  code.style.fontSize = '14px';
  code.style.color = '#D4D4D4'; // Light color for the text for better contrast

  // Apply any custom styles from entityData if provided
  if (entityData.style) {
    Object.assign(pre.style, entityData.style.pre); // Apply styles to the <pre> element
    Object.assign(code.style, entityData.style.code); // Apply styles to the <code> element
  }
}
