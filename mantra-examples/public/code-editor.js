let editor;
let loaded = false;

function loadEditor(sourceUrl, extraWrap = false) {
  if (loaded) return;

  let jsSource = sourceUrl;
  console.log('loading remote source', jsSource)
  fetchAndDisplayCode();
  function fetchAndDisplayCode() {
    fetch(jsSource)
      .then(response => response.text())
      .then(code => {
        let ogSource = code;
        console.log(code)
        // alert(ogSource)

        // Remove the very last line of the code example.
        code = code.trim().split('\n').slice(0, -1).join('\n');
        code = code.trim().split('\n').slice(0, -1).join('\n');

        if (extraWrap) {
          // remove lines 2-4
          //code = code.split('\n').slice(4).join('\n');
          code = code.split('\n').slice(4).join('\n');
          // remove the last line
          //alert(code)
          //code = code.trim().split('\n').slice(0, -1).join('\n');
        }

        let sourceUrl = 'https://yantra.gg/mantra/examples' + jsSource.replace('.', '');
        let mantraUrl = 'https://yantra.gg/mantra.js';
        let mantraWorldsUrl = 'https://yantra.gg/worlds.mantra.js';

let body = `<body>
<script>
${code}</script>
</body>`;

        if (extraWrap) {
          body = code + `
</body>`;
        }

        let htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mantra.js Gallery Page - ${jsSource.replace('.js', '').replace('./', '').replace('-', ' ')}</title>
  <script src="${mantraUrl}"></script>
  <script src="${mantraWorldsUrl}"></script>
</head>
${body}
</html>`;

        // sanitize the htmlTemplate
        htmlTemplate = htmlTemplate.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        // check to see if code-editor exists in DOM, if not create it
        if (!document.querySelector('.code-editor')) {
          const codeEditor = document.createElement('div');
          codeEditor.className = 'code-editor';
          codeEditor.innerHTML = `<pre><code>${htmlTemplate}</code></pre><div class="resize-handle"></div>`;
          console.log('htmlTemplate', htmlTemplate)
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

          let copyButton = createCopyButton(htmlTemplate, codeEditor);
          codeEditor.appendChild(copyButton);


          // append at end of document
          document.body.appendChild(codeEditor);
        } else {
          // If code-editor exists, just update its content
          document.querySelector('.code-editor pre code').textContent = htmlTemplate;
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

function createCopyButton (htmlTemplate, codeEditor) {

  // Create a "Copy to Clipboard" button
  const copyButton = document.createElement('button');
  copyButton.textContent = 'Copy to Clipboard';
  copyButton.style.position = 'absolute';
  copyButton.style.top = '10px';
  copyButton.style.right = '10px';
  copyButton.style.zIndex = '10'; // Ensure button is clickable and visible

  
  // Function to show a temporary message
  function showTemporaryMessage(message, duration = 3000) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.position = 'absolute';
    messageDiv.style.bottom = '10px';
    messageDiv.style.right = '10px';
    messageDiv.style.backgroundColor = '#f8f9fa';
    messageDiv.style.border = '1px solid #ccc';
    messageDiv.style.padding = '5px';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.zIndex = '10';

    codeEditor.appendChild(messageDiv);

    setTimeout(() => {
      codeEditor.removeChild(messageDiv);
    }, duration);
  }

  // Copy to Clipboard functionality
  copyButton.addEventListener('click', function () {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(htmlTemplate).then(() => {
        //showTemporaryMessage('Code copied to clipboard!');
      }).catch(err => {
        console.error('Could not copy text: ', err);
        //showTemporaryMessage('Failed to copy code.', 5000); // Show the error message longer
      });
    } else {
      console.error('Clipboard API not available');
      showTemporaryMessage('Clipboard not supported.', 5000);
    }
  });
  return copyButton;

}