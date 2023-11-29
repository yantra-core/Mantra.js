import gui from '../../gui-editor/gui.js';

export default function drawTable() {
  let game = this.game;
  let self = this;
  if (!game.systems['entity-input']) {
    console.log('entity-input system not found, skipping drawTable');
    return;
  }

  let table = document.createElement('div');
  table.id = "sutraTable";

  // Use gui.window() to create the window
  this.sutraView = gui.window('sutraView', 'Sutra Editor', function () {
    game.systemsManager.removeSystem(self.id);
  });

  // Add a "Show Sutra" button
  let showSutraButton = document.createElement('button');
  showSutraButton.textContent = 'Show Sutra';
  showSutraButton.onclick = () => this.showSutra();

  // Add a button to create new rules
  let addRuleButton = document.createElement('button');
  addRuleButton.textContent = 'Add Rule';
  addRuleButton.onclick = () => this.addNewRule();

  // Add view JSON button
  let viewJsonButton = document.createElement('button');
  viewJsonButton.textContent = 'JSON';
  viewJsonButton.onclick = () => this.viewJson();

  // Add "Read Sutra" button
  let readSutraButton = document.createElement('button');
  readSutraButton.textContent = 'Read Sutra';
  readSutraButton.onclick = () => this.viewSutraEnglish();

  let guiContent = this.sutraView.querySelector('.gui-content');

  guiContent.appendChild(table);
  guiContent.appendChild(showSutraButton);
  guiContent.appendChild(viewJsonButton);
  guiContent.appendChild(readSutraButton);
  guiContent.appendChild(addRuleButton);


  //this.sutraView.appendChild(addRuleButton);
  //this.sutraView.appendChild(table);
}