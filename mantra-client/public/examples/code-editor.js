let editor;
let loaded = false;

function loadEditor(sourceUrl) {
  if (loaded) return;

  let jsSource = sourceUrl;
  console.log('loading remote source', jsSource)
  fetchAndDisplayCode();
  function fetchAndDisplayCode() {
    fetch(jsSource)
      .then(response => response.text())
      .then(code => {
        console.log(code)

        // Remove the very last line of the code example.
        code = code.trim().split('\n').slice(0, -1).join('\n');
        code = code.trim().split('\n').slice(0, -1).join('\n');


        // check to see if code-editor exists in DOM, if not create it
        if (!document.querySelector('.code-editor')) {
          const codeEditor = document.createElement('div');
          codeEditor.className = 'code-editor';
          codeEditor.innerHTML = `<pre><code>${code}</code></pre><div class="resize-handle"></div>`;

          // set the styles
          codeEditor.style.width = '100%';
          // codeEditor.style.height = '30vh'; // Set initial height
          codeEditor.style.background = '#333';
          codeEditor.style.color = '#fff';
          codeEditor.style.overflow = 'auto';
          codeEditor.style.padding = '20px';
          codeEditor.style.boxSizing = 'border-box';
          codeEditor.style.fontFamily = 'monospace';
          codeEditor.style.border = '1px solid #888';

          // set position to bottom of page
          codeEditor.style.position = 'relative';
          //codeEditor.style.top = '0';
          //codeEditor.style.left = '0';
          codeEditor.style.resize = 'vertical';

          // add class="language-javascript" to code element
          codeEditor.querySelector('code').classList.add('language-javascript');

          // add class language-javascript
          // codeEditor.classList.add('language-javascript');

          // set background opacity
          codeEditor.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';

          // append at end of document
          document.body.appendChild(codeEditor);
        } else {
          // If code-editor exists, just update its content
          document.querySelector('.code-editor pre code').textContent = code;
        }
        Prism.highlightAll()


        // Set the code example to the pre element
        //document.querySelector('.code-editor pre').textContent = code;
        // hide the code example
        // document.querySelector('.code-editor').style.display = 'none';
        // editor.setValue(code);

        // set the iframe src to bullet.html, sibling to this file
        // document.querySelector('#example-embed').src = './' + exampleName + '.html';

        // hide the search-container class
        // check that the search-container exists
        if (document.querySelector('.search-container')) {
          document.querySelector('.search-container').style.display = 'none';
        }

        // show code-editor
        document.querySelector('.code-editor').style.display = 'block';

      })
      .catch(error => {
        throw error;
        console.error('Error fetching the code example:', error);
      });
  }

}
