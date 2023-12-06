import gui from '../gui-editor/gui.js';

class GameEditor {

  static id = 'gui-game-editor';
  static async = true;

  constructor() {
    this.id = GameEditor.id;
  }

  init(game) {
    this.game = game;

    // Check if the entityView window already exists
    this.gameEditorView = document.getElementById('gameEditorView');

    gui.init(game);

    if (this.game && this.game.systems && this.game.systems['entity-input']) {
      // Remark: You may not have to disable inputs + remove events
      this.game.systems['entity-input'].disableInputs();
      this.game.systems['keyboard'].unbindAllEvents();
    }

    if (!this.gameEditorView) {
      // Use gui.window() to create the window
      this.gameEditorView = gui.window('gameEditorView', 'Game Editor', function(){
        self.game.systemsManager.removeSystem(GameEditor.id);
      })
    }

    this.folderExplorer = document.createElement('div');
    this.folderExplorer.id = 'folder-explorer';
    this.gameEditorView.appendChild(this.folderExplorer);
    // Check for cash
    if (typeof $ === 'undefined') {
      console.log('$ is not defined, attempting to load cash from vendor');
      game.loadScripts([
        '/vendor/cash.min.js'
      ], () => {
        console.log('All jQuery scripts loaded sequentially, proceeding with initialization');
        this.cashReady();
      });
    } else {
      this.cashReady();
    }
  }

  cashReady() {
    // alert('cash ready')
    let guiContent = $('.gui-content', this.gameEditorView);
    this.buildFolderStructure(this.game.gameConfig.entities, guiContent);
  }

  buildFolderStructure(entities, parentElement, parentPath = '') {
    const ul = $('<ul class="folder-structure">');
    $(parentElement).append(ul);

    for (const key in entities) {
      if (key === 'gameType') continue;

      const currentPath = parentPath ? `${parentPath}/${key}` : key;
      const entity = entities[key];
      const displayName = entity.name || key;
      const li = $('<li>');
      const textSpan = $('<span>').text(displayName);

      li.append(textSpan);
      ul.append(li);

      if (entity.gameType === 'folder') {
        textSpan.prepend('<i class="folder-icon"></i>'); // Placeholder for folder icon
        textSpan.addClass('folder-label');
        textSpan.on('click', () => this.toggleFolder(li)); // Click to toggle folder

        const subEntities = entity.members ? entity.members : entity;
        this.buildFolderStructure(subEntities, li, currentPath);
      } else if (entity.gameType === 'entity') {
        textSpan.prepend('<i class="entity-icon"></i>'); // Placeholder for entity icon
        textSpan.addClass('entity-label');
        textSpan.on('click', () => this.editEntity(entity));
      }
    }
  }

  toggleFolder(folderItem) {
    folderItem.children('ul').toggle(); // Toggle the visibility of the folder's contents
  }

  editEntity(entity) {
    // Implement entity editing logic
    console.log('Editing entity:', entity);
  }

}

export default GameEditor;