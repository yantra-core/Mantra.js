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
      this.gameEditorView = gui.window('gameEditorView', 'Game Editor', function () {
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
    this.createGameSettingsFolder(guiContent);
    this.createGameSettingsForm(this.game.gameConfig.settings, guiContent);
    this.createEntitiesFolder(guiContent);
    this.buildEntityFolders(this.game.gameConfig.entities, guiContent);
   }

  createEntitiesFolder(parentElement) {
    const entitiesFolder = $('<div>', { class: 'entities-folder' }).appendTo(parentElement);
    const folderLabel = $('<span>', { text: 'Entities'}).appendTo(entitiesFolder);
    folderLabel.addClass('folder-label');
    folderLabel.prepend('<i class="folder-icon"></i>Entities');
    folderLabel.on('click', () => $('.folder-structure').toggle());
  }

  buildEntityFolders(entities, parentElement, parentPath = '') {
    // Make the entities list initially hidden
    const ul = $('<ul class="folder-structure">').hide();
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
        this.buildEntityFolders(subEntities, li, currentPath);
      } else if (entity.gameType === 'entity') {
        textSpan.prepend('<i class="entity-icon"></i>'); // Placeholder for entity icon
        textSpan.addClass('entity-label');
        textSpan.on('click', () => this.editEntity(entity));
      }
    }
  }

  createGameSettingsFolder(parentElement) {
    const gameSettingsFolder = $('<div>').prependTo(parentElement);
    gameSettingsFolder.addClass('game-settings-folder');
    const folderLabel = $('<span>').appendTo(gameSettingsFolder);
    folderLabel.addClass('folder-label')
    folderLabel.html('Game Settings');
    folderLabel.prepend('<i class="folder-icon"></i>');
    folderLabel.on('click', () => $('#game-settings-form').toggle());
  }

  createGameSettingsForm(gameConfigSettings, parentElement) {

    const form = $('<form>').attr({ id: 'game-settings-form', class: 'game-settings-form' }).appendTo(parentElement).hide();
    const settings = Object.keys(gameConfigSettings);
    settings.forEach(setting => {
      const fieldContainer = $('<div>').addClass('form-field').appendTo(form);

      $('<label>')
        .attr({ for: 'game-' + setting })
        .text(setting)
        .appendTo(fieldContainer);

      $('<input>')
        .attr({
          type: 'text',
          id: 'game-' + setting,
          name: setting,
          value: gameConfigSettings[setting],
          class: 'game-input'
        })
        .appendTo(fieldContainer);
    });

    //$('<button>').text('Save Settings').attr({ type: 'submit' }).appendTo(form);
    // save button disabled ( for now )
    //$('button[type="submit"]').prop('disabled', true);

    form.on('submit', (e) => {
      e.preventDefault();
      this.saveGameSettings();
    });
  }

  toggleFolder(folderItem) {
    folderItem.children('ul').toggle(); // Toggle the visibility of the folder's contents
  }

  saveGameSettings() {
    let updatedSettings = {};
    $('#game-settings-form .game-input').each(function () {
      let input = $(this);
      updatedSettings[input.attr('name')] = input.val();
    });
    // TODO: Update the game settings in the game's data structure
    console.log('Updated Game Settings: ', updatedSettings);
  }

  editEntity(entity) {
    // Implement entity editing logic
    if (!game.systems['gui-entity-editor']) {
      game.use('EntityEditor');
    }
    this.game.systems['gui-entity-editor'].setEntity(entity);
  }

}

export default GameEditor;