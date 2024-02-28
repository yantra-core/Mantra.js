import * as monaco from '../../../vendor/monaco-editor/esm/vs/editor/editor.api.js';
import '../../../vendor/monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
// import '../../../vendor/monaco-editor/esm/vs/editor/standalone/browser/themes/vs-dark';

// Optionally, import features like languages, themes, etc. that you need
// For example, to import the JavaScript language service and VS Dark theme:
//import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution.js';
//import 'monaco-editor/esm/vs/editor/standalone/browser/themes/vs-dark.js';



export default function inflateMonaco(entityElement, entityData) {

  let game = this.game;

  if (!game.systems.monaco) {
    console.error('Monaco Editor system is not available.');
    return entityElement;
  }

  console.log('INFLATEING MONACO')

  function afterParentElementAppends(entityElement, entityData) {
    let editorElement = document.createElement('div');
    // Temporarily set a reasonable default size or use specific dimensions as needed
    // let game = this.game;
  
    console.log("ssuuuu", document.body.contains(entityElement));
    editorElement.style.width = entityData.size.width + 'px';
    editorElement.style.height = entityData.size.height + 'px';
    editorElement.style.display = 'block';
  
  
  
    entityElement.appendChild(editorElement);
  
    // Initialize Monaco Editor within the editorElement
    let editor = monaco.editor.create(editorElement, {
      value: entityData.meta && entityData.meta.code || '// Type your code here...',
      language: 'javascript', // Default to JavaScript if not specified
      theme: 'vs-dark', // Use the dark theme; you can choose other themes
      // Add more Monaco Editor options as needed
    });
  
    this.editor = editor;
    game.systems.monaco.editor = editor;
  
    // Store the editor instance in the entityData for future reference or manipulation
    entityData.meta.editorInstance = editor;
  
    // ResizeObserver to watch for size changes and adjust layout
    const resizeObserver = new ResizeObserver(entries => {
      console.log("RRRRResize", entries)
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        console.log('Resizing Monaco Editor to: ', width, height);
        editor.layout({ width, height });
      }
    });
  
  
    // Start observing the entityElement for size changes
    resizeObserver.observe(entityElement);
  
  
    editor.onDidBlurEditorWidget(() => {
      // Code to execute when the editor loses focus
      console.log('Editor has lost focus');
      game.data.camera.draggingAllowed = true;
      game.bindKeyboard();
    });
  
    /*
    editor.onDidFocusEditorWidget(() => {
      // Code to execute when the editor gains focus
      console.log('Editor has gained focus');
      game.data.camera.draggingAllowed = false;
      game.unbindKeyboard();
    });
    */
    const editorDomElement = editor.getDomNode();
  
    if (editorDomElement) {
      editorDomElement.addEventListener('click', () => {
        console.log('Editor was clicked');
        game.data.camera.draggingAllowed = false;
        game.unbindKeyboard();
        // Any additional logic you want to execute on click
      });
    }
  
    // editor.updateOptions({ mouseWheelScrollSensitivity: 0 });
  
    // After the editor is initialized, adjust its layout as needed
    // adjustEditorLayout(editor, editorElement);
    console.log('laying out size', entityData.size.width, entityData.size.height);
  
    setTimeout(() => {
      console.log('layoutagain', entityData.size.width, entityData.size.height);
      editor.layout({ width: entityData.size.width, height: entityData.size.height });
    }, 2000); // Adjust delay as needed; sometimes even a 0ms delay helps.
  
    console.log('initial layout', entityData.size.width, entityData.size.height);
    editor.layout({ width: entityData.size.width, height: entityData.size.height });
  
  }
  

  entityElement.afterParentElementAppends = afterParentElementAppends.bind(game);

  // ensure entityElement is correct size and visible
  entityElement.style.width = entityData.size.width + 'px';
  entityElement.style.height = entityData.size.height + 'px';
  entityElement.style.display = 'block';


  // Return the updated entity element with the Monaco Editor integrated
  return entityElement;
}

function adjustEditorLayout(editor, editorElement) {
  // Use the dimensions of the editorElement or calculate dimensions as needed
  const width = editorElement.offsetWidth; // Obtain the actual width of the editor container
  const height = editorElement.offsetHeight; // Obtain the actual height of the editor container

  // Use the `layout` method of the editor to set its size explicitly
  editor.layout({ width: width, height: height });
}