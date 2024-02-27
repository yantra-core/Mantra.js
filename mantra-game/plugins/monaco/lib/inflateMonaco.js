import * as monaco from '../../../vendor/monaco-editor/esm/vs/editor/editor.api.js';
import '../../../vendor/monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
// import '../../../vendor/monaco-editor/esm/vs/editor/standalone/browser/themes/vs-dark';

// Optionally, import features like languages, themes, etc. that you need
// For example, to import the JavaScript language service and VS Dark theme:
//import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution.js';
//import 'monaco-editor/esm/vs/editor/standalone/browser/themes/vs-dark.js';

export default function inflateMonaco(entityElement, entityData) {
  if (!this.game.systems.monaco) {
    console.error('Monaco Editor system is not available.');
    return entityElement;
  }

  let editorElement = document.createElement('div');
  // Temporarily set a reasonable default size or use specific dimensions as needed
  entityElement.appendChild(editorElement);

  // Initialize Monaco Editor within the editorElement
  let editor = monaco.editor.create(editorElement, {
    value: entityData.meta && entityData.meta.code || '// Type your code here...',
    language: 'javascript', // Default to JavaScript if not specified
    theme: 'vs-dark', // Use the dark theme; you can choose other themes
    // Add more Monaco Editor options as needed
  });

  this.editor = editor;

  // Store the editor instance in the entityData for future reference or manipulation
  entityData.meta.editorInstance = editor;

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
  editor.layout({ width: entityData.size.width, height: entityData.size.height });
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
