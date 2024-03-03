let editor;
let loaded = false;

// get query string check for param text=true
let removeEmbed = false;
let removesSource = false;
let urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('source')) {
  removeEmbed = true;
}
if(urlParams.has('embed')) {
  removesSource = true;
}

function loadEditor(sourceUrl, extraWrap = false) {
  if (loaded) return;


  if (removeEmbed) {
    let iframe = document.querySelector('iframe');
 
    if (iframe) {
      iframe.remove();
    }
  }

  if (removesSource) {
    let codeEditor = document.querySelector('.code-editor');
    if (codeEditor) {
      codeEditor.remove();
    }
    return;
  }


  let jsSource = sourceUrl;
  //console.log('loading remote source', jsSource)
  fetchAndDisplayCode();
  function fetchAndDisplayCode() {
    fetch(jsSource)
      .then(response => response.text())
      .then(code => {
        let ogSource = code;
        // console.log(code)
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

let worldsScript = `
<script src="${mantraWorldsUrl}"></script>`;


if (extraWrap) {
  worldsScript = '';
}

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
  <script src="${mantraUrl}"></script>${worldsScript}
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
          // console.log('htmlTemplate', htmlTemplate)
          // set the styles
          codeEditor.style.width = '100%';
          // codeEditor.style.height = '30vh'; // Set initial height
          codeEditor.style.background = '#333';
          codeEditor.style.color = '#fff';
          codeEditor.style.overflow = 'auto';
          codeEditor.style.padding = '20px';
          codeEditor.style.boxSizing = 'border-box';
          codeEditor.style.fontFamily = 'monospace';

          // set background opacity
          codeEditor.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';


          if (removeEmbed) {
            codeEditor.style.margin = '0';
            codeEditor.style.padding = '10px';
            codeEditor.style.backgroundColor = '#1d1f21';

            document.body.style.padding = '0';
            document.body.style.margin = '0';
            document.body.style.backgroundColor = '#1d1f21';
          } else {
            codeEditor.style.border = '1px solid #888';
          }
          

          if (removeEmbed) {
            codeEditor.style.height = '100%';
          }

          // set position to bottom of page
          codeEditor.style.position = 'relative';
          //codeEditor.style.top = '0';
          //codeEditor.style.left = '0';
          codeEditor.style.resize = 'vertical';

          // add class="language-javascript" to code element
          codeEditor.querySelector('code').classList.add('language-javascript');

          // add class language-javascript
          // codeEditor.classList.add('language-javascript');


          let copyButton = createCopyButton(htmlTemplate, codeEditor);
          codeEditor.appendChild(copyButton);

          window.makeCopyButton = function () {
            let copyButton = createCopyButton(htmlTemplate, codeEditor);
            codeEditor.appendChild(copyButton);
          }

          // append at end of document
          document.body.appendChild(codeEditor);
        } else {
          // If code-editor exists, just update its content
          document.querySelector('.code-editor pre code').textContent = htmlTemplate;
        }
        Prism.highlightAll()

        if (removeEmbed) {
          // remove padding from <pre> element
          document.querySelector('.code-editor pre').style.padding = '0';
          document.querySelector('.code-editor pre').style.margin = '0';
        }


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

  // style a bit as button, rounded corners, etc
  copyButton.style.backgroundColor = '#007bff';
  copyButton.style.color = 'white';
  copyButton.style.border = 'none';
  copyButton.style.padding = '10px 20px';
  copyButton.style.borderRadius = '5px';
  copyButton.style.cursor = 'pointer';
  

  
  // Function to show a temporary message
  function showTemporaryMessage(message, duration = 3000) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.position = 'absolute';
    messageDiv.style.top = '10px';
    messageDiv.style.right = '10px';
    // set size same to button
    messageDiv.style.padding = '10px 20px';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.zIndex = '999';
    messageDiv.style.backgroundColor = '#b8daff';
    messageDiv.style.color = '#000';

    codeEditor.appendChild(messageDiv);

    setTimeout(() => {
      codeEditor.removeChild(messageDiv);
    }, duration);
  }

  // Copy to Clipboard functionality
  copyButton.addEventListener('click', function () {


    let scriptFromHTML = htmlTemplate.replace(/&lt;/g, '<').replace(/&gt;/g, '>');

    parent.postMessage({ action: 'copy', text: scriptFromHTML }, '*');

    if (navigator.clipboard) {
      navigator.clipboard.writeText(scriptFromHTML).then(() => {
        showTemporaryMessage('Code copied to clipboard!');
      }).catch(err => {
        console.error('Could not copy text: ', err);
        showTemporaryMessage('Failed to copy code.', 5000); // Show the error message longer
      });
    } else {
      console.error('Clipboard API not available');
      showTemporaryMessage('Clipboard API not available.', 5000);
    }
  });
  return copyButton;

}